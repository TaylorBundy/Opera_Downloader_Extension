// Escuchar mensajes del popup para activar/desactivar en vivo
// funciones.js (content script)
// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   if (msg.action === "iniciarCuentaRegresiva") {
//     try {
//       console.log("Iniciando cuenta regresiva con:", msg);
//       const elemento = document.getElementById("contador"); // o el ID real donde se renderiza
//       if (!elemento) {
//         console.warn("No se encontró el elemento para la cuenta regresiva");
//         return;
//       }
//       iniciarCuentaRegresiva(
//         elemento,
//         msg.msTotales,
//         msg.mensaje,
//         msg.mensaje2,
//         msg.domain,
//         () => {
//           console.log("✅ Cuenta regresiva finalizada");
//         }
//       );
//       sendResponse({ ok: true });
//     } catch (e) {
//       console.error("Error al iniciar cuenta regresiva:", e);
//       sendResponse({ ok: false, error: e.message });
//     }
//   }
// });

function cuentaVeces(mensaje, contador) {
  //contador ++;
  console.log(`Funcion: ${mensaje} - Ejecutada: ${contador}`);
}

//Funcion para verificar si existe algo mas al final de la url BASE
function tieneExtra(algo) {
  const url = new URL(algo);
  return url.pathname !== "/" || url.search !== "" || url.hash !== "";
}

const obtenerNombre = (src, opciones = {}) => {
  limpio = src.split("?")[0]; // quitar parámetros
  if (opciones.remover) {
    opciones.remover.forEach((r) => (limpio = limpio.replace(r, "")));
  }
  return limpio.substring(limpio.lastIndexOf("/") + 1);
};

function guardarDescargado(nombre) {
  const key = "videos_descargados";

  let lista = JSON.parse(localStorage.getItem(key)) || [];

  if (!lista.includes(nombre)) {
    lista.push(nombre);
    localStorage.setItem(key, JSON.stringify(lista));
  }
}

function yaDescargado(nombre) {
  const key = "videos_descargados";
  let lista = JSON.parse(localStorage.getItem(key)) || [];
  return lista.includes(nombre);
}
async function descargarVideo2(url, nombre = "video.mp4") {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  const blob = await res.blob();

  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombre;

  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  URL.revokeObjectURL(enlace.href);
}

async function descargarVideo3(url, nombre = "video.mp4") {
  const segundosIniciales = 6;
  let segundos = segundosIniciales;

  // Crear modal
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        font-family: Arial, sans-serif;
    `;

  const contenido = document.createElement("div");
  contenido.style.cssText = `
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        color: black;
        width: 90%;
        box-shadow: 0 4px 15px rgba(0,0,0,.3);
    `;

  const texto = document.createElement("div");
  texto.style.fontSize = "16px";

  contenido.appendChild(texto);
  modal.appendChild(contenido);
  document.body.appendChild(modal);

  const actualizarTexto = () => {
    //texto.innerHTML = `
    //<b>La descarga de:</b><br>
    //${nombre}<br><br>
    //<b>Comienza en: ${segundos} segundo${segundos !== 1 ? "s" : ""}</b>
    //`;
    texto.innerHTML = `La descarga de: ${nombre}<br>${url} comienza en ${segundos} segundos...`;
  };

  actualizarTexto();

  await new Promise((resolve) => {
    const intervalo = setInterval(() => {
      segundos--;

      if (segundos <= 0) {
        clearInterval(intervalo);
        modal.remove();
        resolve();
        return;
      }

      actualizarTexto();
    }, 1000);
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  const blob = await res.blob();

  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombre;

  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  URL.revokeObjectURL(enlace.href);
}

async function descargarVideoFuncionando(url, nombre = "video.mp4") {
  //console.log(idDelBoton);
  // Modal
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        font-family: Arial, sans-serif;
    `;

  const contenido = document.createElement("div");
  contenido.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 12px;
        width: 350px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,.3);
        color: black;
    `;

  const imagenContainer = document.createElement("div");
  imagenContainer.style.position = "relative";
  imagenContainer.style.display = "flex";
  imagenContainer.style.justifyContent = "center";
  imagenContainer.style.backgroundColor = backgroundColor;
  imagenContainer.style.borderRadius = "12px";
  imagenContainer.style.padding = "5px";

  const imagen = document.createElement("img");
  imagen.src = `${logo}`;
  //imagen.style.position = "absolute";
  //imagen.style.backgroundColor = backgroundColor;
  imagenContainer.appendChild(imagen);

  const titulo = document.createElement("div");
  titulo.style.cssText = `
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        word-break: break-word;
    `;
  titulo.textContent = `📥 Descargando: ${nombre}`;

  const porcentajeTexto = document.createElement("div");
  porcentajeTexto.style.cssText = `
        font-size: 20px;
        margin-bottom: 10px;
    `;
  porcentajeTexto.textContent = "0%";

  const barra = document.createElement("div");
  barra.style.cssText = `
        width: 100%;
        height: 20px;
        background: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    `;

  const progreso = document.createElement("div");
  progreso.style.cssText = `
        width: 0%;
        height: 100%;
        background: #4caf50;
        transition: width .2s;
    `;

  barra.appendChild(progreso);

  const detalle = document.createElement("div");
  detalle.style.cssText = `
        font-size: 12px;
        color: #666;
    `;

  contenido.append(imagenContainer, titulo, porcentajeTexto, barra, detalle);

  modal.appendChild(contenido);
  document.body.appendChild(modal);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    const total = Number(res.headers.get("content-length"));

    // Si no hay Content-Length
    if (!total) {
      porcentajeTexto.textContent = "Descargando...";
      detalle.textContent = "No se puede calcular el progreso.";
    }

    const reader = res.body.getReader();
    const chunks = [];
    let descargado = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      descargado += value.length;

      if (total) {
        const porcentaje = ((descargado / total) * 100).toFixed(1);

        porcentajeTexto.textContent = `${porcentaje}%`;

        progreso.style.width = `${porcentaje}%`;

        detalle.textContent = `${(descargado / 1024 / 1024).toFixed(2)} MB / ${(total / 1024 / 1024).toFixed(2)} MB`;
      }
    }

    const blob = new Blob(chunks);

    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombre;

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(enlace.href);

    porcentajeTexto.textContent = "100%";
    progreso.style.width = "100%";
    detalle.textContent = "Descarga completada";

    setTimeout(() => modal.remove(), 1000);
  } catch (error) {
    modal.remove();
    throw error;
  }
}

async function descargarImagen(url, nombre = "imagen") {
  //console.log("URL:", url);

  // ========================================
  // Modal
  // ========================================

  const modal = document.createElement("div");

  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    font-family: Arial, sans-serif;
  `;

  const contenido = document.createElement("div");

  contenido.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 370px;
    max-width: 90vw;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,.3);
    color: black;
  `;

  // ========================================
  // Preview
  // ========================================

  const previewContainer = document.createElement("div");

  previewContainer.style.cssText = `
    width: 100%;
    min-height: 120px;
    max-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${backgroundColor};
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
  `;

  const preview = document.createElement("img");

  preview.src = url;

  preview.style.cssText = `
    max-width: 100%;
    max-height: 330px;
    object-fit: contain;
    display: block;
  `;

  previewContainer.appendChild(preview);

  // ========================================
  // Título
  // ========================================

  const titulo = document.createElement("div");

  titulo.style.cssText = `
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    word-break: break-word;
  `;

  titulo.textContent = nombre;

  // ========================================
  // Estado
  // ========================================

  const estado = document.createElement("div");

  estado.style.cssText = `
    font-size: 13px;
    color: #666;
    margin-bottom: 15px;
  `;

  estado.textContent = "Vista previa";

  // ========================================
  // Botón descargar
  // ========================================

  const botonDescargar = document.createElement("button");

  botonDescargar.textContent = "📥 Descargar";

  botonDescargar.style.cssText = `
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #4caf50;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 8px;
  `;

  // ========================================
  // Botón cerrar
  // ========================================

  const botonCerrar = document.createElement("button");

  botonCerrar.textContent = "Cancelar";

  botonCerrar.style.cssText = `
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #e53935;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  `;

  // ========================================
  // Agregar
  // ========================================

  contenido.append(
    previewContainer,
    titulo,
    estado,
    botonDescargar,
    botonCerrar,
  );

  modal.appendChild(contenido);

  document.body.appendChild(modal);

  // ========================================
  // Verificar que la imagen cargó
  // ========================================

  preview.onload = () => {
    estado.textContent = "Vista previa lista";
  };

  preview.onerror = () => {
    estado.textContent = "❌ No se pudo cargar la imagen";

    botonDescargar.disabled = true;

    botonDescargar.style.opacity = "0.5";
    botonDescargar.style.cursor = "default";
  };

  // ========================================
  // Cerrar
  // ========================================

  botonCerrar.onclick = () => {
    modal.remove();
  };

  // ========================================
  // Descargar
  // ========================================

  botonDescargar.onclick = async () => {
    botonDescargar.disabled = true;

    botonDescargar.style.opacity = "0.6";

    estado.textContent = "📥 Descargando...";

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const blob = await res.blob();

      // ====================================
      // Detectar extensión
      // ====================================

      if (!/\.[a-z0-9]+$/i.test(nombre)) {
        const extensiones = {
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "image/webp": ".webp",
          "image/gif": ".gif",
          "image/avif": ".avif",
          "image/bmp": ".bmp",
          "image/svg+xml": ".svg",
        };

        nombre += extensiones[blob.type] || ".jpg";
      }

      // ====================================
      // Crear descarga
      // ====================================

      const blobUrl = URL.createObjectURL(blob);

      const enlace = document.createElement("a");

      enlace.href = blobUrl;

      enlace.download = nombre;

      document.body.appendChild(enlace);

      enlace.click();

      enlace.remove();

      URL.revokeObjectURL(blobUrl);

      estado.textContent = "✅ Descarga completada";

      botonDescargar.remove();

      setTimeout(() => {
        modal.remove();
      }, 1200);
    } catch (error) {
      console.error("Error descargando imagen:", error);

      estado.textContent = "❌ No se pudo descargar la imagen";

      botonDescargar.disabled = false;

      botonDescargar.style.opacity = "1";
    }
  };
}

async function descargarVideo(url, nombre = "video.mp4") {
  // Modal
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        font-family: Arial, sans-serif;
    `;

  const contenido = document.createElement("div");
  contenido.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 12px;
        width: 370px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,.3);
        color: black;
    `;

  const imagenContainer = document.createElement("div");
  imagenContainer.style.position = "relative";
  imagenContainer.style.display = "flex";
  imagenContainer.style.justifyContent = "center";
  imagenContainer.style.backgroundColor = backgroundColor;
  imagenContainer.style.borderRadius = "12px";
  imagenContainer.style.padding = "5px";

  const imagen = document.createElement("img");
  imagen.src = logo;
  imagenContainer.appendChild(imagen);

  const titulo = document.createElement("div");
  titulo.style.cssText = `
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        word-break: break-word;
    `;
  titulo.textContent = `📥 Descargando: ${nombre}`; //`⬇ Descargando: ${nombre}`;

  const porcentajeTexto = document.createElement("div");
  porcentajeTexto.style.cssText = `
        font-size: 20px;
        margin-bottom: 10px;
    `;
  porcentajeTexto.textContent = "0%";

  const barra = document.createElement("div");
  barra.style.cssText = `
        width: 100%;
        height: 20px;
        background: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    `;

  const progreso = document.createElement("div");
  progreso.style.cssText = `
        width: 0%;
        height: 100%;
        background: #4caf50;
        transition: width .2s;
    `;

  barra.appendChild(progreso);

  const detalle = document.createElement("div");
  detalle.style.cssText = `
        font-size: 12px;
        color: #666;
        margin-top: 8px;
    `;

  const velocidadTexto = document.createElement("div");
  velocidadTexto.style.cssText = `
        font-size: 12px;
        color: #666;
        margin-top: 4px;
    `;
  velocidadTexto.textContent = "Velocidad: 0 KB/s";

  contenido.append(
    imagenContainer,
    titulo,
    porcentajeTexto,
    barra,
    detalle,
    velocidadTexto,
  );

  modal.appendChild(contenido);
  document.body.appendChild(modal);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    const total = Number(res.headers.get("content-length"));

    if (!total) {
      porcentajeTexto.textContent = "Descargando...";
      detalle.textContent = "No se puede calcular el progreso.";
    }

    const reader = res.body.getReader();
    const chunks = [];

    let descargado = 0;

    // Variables para calcular velocidad
    let ultimoTiempo = performance.now();
    let ultimoDescargado = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      descargado += value.length;

      // ===== Calcular velocidad =====
      const ahora = performance.now();
      const tiempo = (ahora - ultimoTiempo) / 1000;

      if (tiempo >= 0.5) {
        const bytesIntervalo = descargado - ultimoDescargado;
        const velocidad = bytesIntervalo / tiempo;

        let textoVelocidad;

        if (velocidad >= 1024 * 1024) {
          textoVelocidad = `${(velocidad / 1024 / 1024).toFixed(2)} MB/s`;
        } else if (velocidad >= 1024) {
          textoVelocidad = `${(velocidad / 1024).toFixed(2)} KB/s`;
        } else {
          textoVelocidad = `${velocidad.toFixed(0)} B/s`;
        }

        velocidadTexto.textContent = `Velocidad: ${textoVelocidad}`;

        ultimoTiempo = ahora;
        ultimoDescargado = descargado;

        // Tiempo restante (ETA)
        if (total && velocidad > 0) {
          const restante = total - descargado;
          const segundos = restante / velocidad;

          let eta;

          if (segundos >= 3600) {
            eta = `${Math.floor(segundos / 3600)}h ${Math.floor((segundos % 3600) / 60)}m`;
          } else if (segundos >= 60) {
            eta = `${Math.floor(segundos / 60)}m ${Math.floor(segundos % 60)}s`;
          } else {
            eta = `${Math.ceil(segundos)} s`;
          }

          detalle.textContent = `${(descargado / 1024 / 1024).toFixed(2)} MB / ${(total / 1024 / 1024).toFixed(2)} MB • ETA: ${eta}`;
        }
      }

      // ===== Progreso =====
      if (total) {
        const porcentaje = ((descargado / total) * 100).toFixed(1);

        porcentajeTexto.textContent = `${porcentaje}%`;
        progreso.style.width = `${porcentaje}%`;
      }
    }

    const blob = new Blob(chunks);

    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombre;

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(enlace.href);

    porcentajeTexto.textContent = "100%";
    progreso.style.width = "100%";
    detalle.textContent = "Descarga completada";
    velocidadTexto.textContent = "Velocidad: 0 KB/s";

    setTimeout(() => modal.remove(), 1000);
  } catch (error) {
    modal.remove();
    throw error;
  }
}

function crearNombreFlotante(contenedor, urlImg, retrasos) {
  if (contenedor.dataset.nombreCreado) return;
  if (fullUrl.includes("redgifs")) {
    const sup = contenedor.querySelector("video");

    //console.log(nombreVid);
    //const iden = document.querySelectorAll(`${contenedor} > p`);
    //console.log(iden);
    //if (document.getElementById(`nom${nombreVid}`)) return;
    //const iden = document.querySelectorAll("#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > p");
    if (document.getElementById(`nom-${idBoto}`)) return;
    const nomVid = document.createElement("p");
    contenedor.dataset.nombreCreado = "true";
    nomVid.id = `nom-${idBoto}`;

    nomVid.style.display = "inline-grid";
    nomVid.style.position = "absolute";
    nomVid.style.color = "#fff";
    nomVid.style.zIndex = "9999";
    nomVid.textContent = nombreVid;
    nomVid.title = nombreVid;
    nomVid.style.left = "0";
    nomVid.style.right = "0";
    //nomVid.style.top = "50px";
    nomVid.style.bottom = "0";
    nomVid.style.margin = "auto";
    nomVid.style.textAlign = "center";
    nomVid.style.padding = "5px 5px";
    nomVid.style.borderRadius = "8px";
    nomVid.style.background = "rgb(7 112 177)";
    nomVid.style.width = "fit-content";
    nomVid.style.fontSize = "10px";
    nomVid.style.fontWeight = "bold";
    nomVid.style.wordBreak = "break-word";
    nomVid.style.opacity = "0.5";
    setTimeout(() => {
      contenedor.appendChild(nomVid);
      //const iden = document.querySelectorAll(`${contenedor} > p`);
      //console.log(iden);
      //if (sup.className.includes("isLoaded")) {
      //console.log(contenedor);
      //console.log(sup);
      //nomVid.style.top = "50px";
      //nomVid.style.bottom = "unset";
      //}
      esperarElementos(".isLoaded", (tiles) => {
        tiles.forEach((tile) => {
          const sup1 = tile.closest("video");
          //console.log(sup1);
          if (sup1.className.includes("isLoaded")) {
            //console.log(contenedor);
            //console.log(sup1);
            nomVid.style.top = "50px";
            nomVid.style.bottom = "unset";
          }
          //const contenedor = tile.closest(".Player-Video");
          //console.log(contenedor);
          //selector = contenedor;
        });
        //console.log("Tiles detectados:", tiles.length);
        //const modal = document.querySelector(".Player-OverLayer, .Modal, .videoWrapper, .isLoaded");
        //selector = e.target;
        //const contenedor = tiles.closest(".Player-Video");
        //console.log(contenedor);
        //console.log(tiles.offsetParent);
        //crearBotonFlotante(selector, losLink);
        //crearNombreFlotante(selector, losLink);
        //crearBotones();
      });
    }, 500);
  }
}

function crearBotonFlotante(contenedor, urlImg, retrasos) {
  //console.log(contenedor);
  if (document.getElementById("mi-boton-flotante")) return;
  if (contenedor.dataset.botonCreado) return;
  if (yaDescargado(urlImg)) return;
  const boton = document.createElement("button");
  //const nomVid  = document.createElement("p");
  if (fullUrl.includes("loyalfans")) {
    if (mensajeTodos === "Todos") {
      boton.id = `mi-boton-flotante-${idBoto}`;
      if (document.getElementById(`mi-boton-flotante-${idBoto}`)) return;
    }
    if (mensajeUno === "Uno") {
      boton.id = "mi-boton-flotante";
    }
    //} else if (fullUrl.includes("redgifs.com/users/")) {
    //console.log(urlImg.split("/").pop());
    //const Titulos = document.querySelectorAll("#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > img");
    //const elNom = Titulos[idBoto]?.src;
    //console.log(elNom);
    //const nombreX = elNom.split('/').pop().replace('-mobile.jpg', '');
    //nombreFinal = urlImg.split("/").pop().replace(".mp4", "");
  } else if (fullUrl.includes("redgifs")) {
    //console.log(contenedor);
    contenedor.dataset.botonCreado = "true";
    boton.id = `mi-boton-flotante-${idBoto}`;
    //nomVid.id = `nom${nombreVid}`;
    if (document.getElementById(`mi-boton-flotante-${idBoto}`)) return;
  } else {
    boton.id = "mi-boton-flotante";
  }
  boton.style.display = "inline-grid";
  //nomVid.style.display = "inline-grid";
  boton.style.width = "100px";
  boton.textContent = "📥 Descargar";
  boton.style.position = "absolute";
  //nomVid.style.position = "absolute";
  //nomVid.style.color = "#fff";
  //nomVid.style.zIndex = "9999";
  boton.style.padding = "5px 5px";
  //boton.style.background = "#1DA1F2";
  boton.style.background = "rgb(7 112 177)";
  boton.style.color = "#fff";
  boton.style.border = "none";
  boton.style.borderRadius = "8px";
  boton.style.zIndex = "9999";
  boton.style.cursor = "pointer";
  //boton.innerHTML = '<img src="' + logo + '" style="width:100%;vertical-align:middle;opacity:0.5;margin:0"> 📥 Descargar';
  boton.innerHTML = `<img src="${logo}" style="width:100%;vertical-align:middle;opacity:0.5;margin:0"> 📥 Descargar`;
  boton.onmouseover = function () {
    boton.title = `Click para descargar: ${urlImg}.!`;
  };
  boton.dataset.url = urlImg;

  boton.onclick = () => {
    if (fullUrl.includes("loyalfans")) {
      if (mensajeTodos === "Todos") {
        //const todos = document.querySelectorAll("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div");
        (async () => {
          //console.log(userId);
          //console.log(boton.id);
          //console.log(idBoto);
          idBoto = boton.id.split("-")[3];
          const urlFetch = `https://www.loyalfans.com/api/v2/social/videos/${userId}?ngsw-bypass=true`;
          enlace = await obtieneLinkLoyalFans(urlFetch, idBoto);
          //console.log(enlace);
          chrome.runtime.sendMessage({
            action: "inject_main_script",
            url: enlace,
          });
        })();
      }
      if (mensajeUno === "Uno") {
        chrome.runtime.sendMessage({
          action: "inject_main_script",
          url: urlImg,
        });
      }
    } else if (
      fullUrl.includes("twpornstars.com") &&
      !fullUrl.includes("/videos")
    ) {
      (async () => {
        enlace = urlImg; //await ObtenemosLinkTwpornstar(urlImagen);
        nombreFinal = urlImg.split("/").pop().replace(".jpg", "");
        await descargarImagen(enlace, nombreFinal);
        // chrome.runtime.sendMessage({
        //   action: "inject_main_script",
        //   url: enlace,
        // });
      })();
    } else if (domain.includes("redgifs")) {
      if (fullUrl.includes("redgifs.com/watch")) {
        if (extension === ".jpg") {
          chrome.runtime.sendMessage({
            action: "inject_main_script",
            url: urlImg,
          });
        } else {
          enlace = urlImg;
          guardarDescargado(enlace);
          chrome.runtime.sendMessage({
            action: "inject_main_script",
            url: enlace,
          });
          //console.log("hola");
        }
      } else {
        enlace = urlImg;
        guardarDescargado(enlace);
        //console.log(nombreFinal);
        (async () => {
          nombreFinal = urlImg.split("/").pop().replace(".mp4", "");
          idDelBoton = boton.id;
          //const nombrew = urlImagen.match(/\/([^\/]+)\.mp4/i)?.[1];
          await descargarVideo(enlace, `${nombreFinal}.mp4`);
        })();
        //chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
        contenedor.dataset.botonCreado = "false";
        //alert(`enlace linea 124: ${enlace}`);
      }
    } else if (fullUrl.includes("pornhub.com/gif")) {
      (async () => {
        const nombrew2 = urlImg.match(/\/([^\/]+)\.mp4/i)?.[1];
        //const elTexto = document.querySelector("#gifImageSection > div.gifTitle > h1").textContent;
        const titulo = document.querySelector("title").textContent;
        const nono = titulo
          .split("|")[0]
          .replace(/\b(Gif|Porno|Porn)\b/gi, "")
          .replace(/\s+/g, " ")
          .trim();
        //console.log(nono);
        const nombrew = `${nombrew2} - ${nono}`;
        await descargarVideo(urlImg, `${nombrew}.mp4`);
      })();
    } else if (fullUrl.includes("pornhub.com/view_video")) {
      const nombrew22 = document.querySelector(
        ".title-container > h1 > span",
      ).textContent;
      navigator.clipboard.writeText(`${fullUrl}.-.${nombrew22}`);
      window.open("https://downix.org", "_blank");
    } else if (fullUrl.includes("porn4fans.com/video")) {
      (async () => {
        const noombre = document.querySelector(
          "body > div.wrapper.AR > main > div.section.player > div > div > div.video-holder.trailer-wrap > div.video-info > div.video-title > h1",
        );
        await descargarVideo(urlImg, `${noombre.textContent}.mp4`);
      })();
    } else if (fullUrl.includes("viralxxxporn.com/es/video")) {
      (async () => {
        const noombre = document.querySelector(
          "body > div.vx-wrapper > main > div:nth-child(6) > div > div > div:nth-child(1) > div.vx-player-tools > div:nth-child(1) > h1",
        );
        await descargarVideo(urlImg, `${noombre.textContent}.mp4`);
      })();
    } else if (fullUrl.includes("onlyfans")) {
      if (fullUrl.includes(`/${userId}`)) {
        (async () => {
          const nombreee = document.querySelector(
            "div.b-post__content.js-post__content.m-type-post.m-post-has-media.m-post-has-text > div.b-post__text.m-break-word > div > div > div > div > p",
          ).textContent;
          await descargarVideo(urlImg, `${nombreee}.mp4`);
        })();
      }
    } else {
      chrome.runtime.sendMessage({ action: "inject_main_script", url: urlImg });
    }
    boton.remove();
  };
  contenedor.appendChild(boton);
  //contenedor.appendChild(nomVid);
  if (domain.includes("pornhub")) {
    boton.style.left = "0";
    boton.style.margin = "5px";
    boton.style.background = "rgb(7 112 177 / 57%)";
    boton.style.color = "rgb(255, 144, 0)";
    boton.innerHTML = `<img src="${logo}" style="width:100%;vertical-align:middle;opacity:0.8;margin:0"> 📥 Descargar`;
  } else if (domain.includes("onlyfans")) {
    boton.innerHTML = `<img src="${logo}" style="width:50%;vertical-align:middle;opacity:0.8;margin:auto"> 📥 Descargar`;
    boton.style.justifyContent = "center";
    boton.style.background = "#0770b182";
  } else if (domain.includes("porn4fans")) {
    boton.style.background = "#131313";
    boton.style.display = "unset";
    boton.innerHTML = `<img src="${logo}" style="width:100%; position:relative; vertical-align:middle;opacity:0.8;margin:0"> 📥 Descargar`;
  } else if (domain.includes("viralxxxporn")) {
    boton.style.background = "#3b1a2f";
    boton.style.display = "unset";
    boton.style.left = "5px";
    boton.style.top = "5px";
    boton.innerHTML = `<img src="${logo}" style="width:100%; position:relative; vertical-align:middle;opacity:0.8;margin:0"> 📥 Descargar`;
  } else if (domain.includes("redgifs")) {
    boton.style.left = "0";
    boton.style.right = "0";
    boton.style.margin = "auto";
    //nomVid.textContent = nombreVid;
    //nomVid.style.left = "0";
    //nomVid.style.right = "0";
    //nomVid.style.top = "50px";
    //nomVid.style.margin = "auto";
    //nomVid.style.textAlign = "center";
    //nomVid.style.padding = "5px 5px";
    //nomVid.style.borderRadius = "8px";
    //nomVid.style.background = "rgb(7 112 177)";
    //nomVid.style.width = "fit-content";
    //nomVid.style.fontSize = "14px";
    //nomVid.style.fontWeight = "bold";
    //nomVid.style.wordBreak = "break-word";
    //nomVid.style.opacity = "0.5";
    setTimeout(() => {
      //contenedor.appendChild(//nomVid);
    }, 1000);
    if (fullUrl.includes("redgifs.com/watch/")) {
      boton.style.top = "0";
      //} else if (domain.includes('redgifs')) {

      ////nomVid.textContent = nombreVid;
    }
  } else if (
    fullUrl.includes("twpornstars.com") &&
    !fullUrl.includes("/videos")
  ) {
    boton.style.fontSize = "12px";
    boton.style.left = "0";
    boton.style.top = "0";
    boton.style.justifyItems = "center";
    boton.style.justifyContent = "center";
    boton.innerHTML =
      '<img src="' +
      logo +
      '" style="width:50%;vertical-align:middle;opacity:0.5;margin:0">📥 Descargar';
  } else if (domain.includes("twpornstars")) {
    boton.style.width = "fit-content";
    boton.style.height = "fit-content";
    boton.style.left = "5px";
    boton.style.top = "5px";
    boton.style.margin = "";
    boton.style.justifyItems = "center";
    // boton.style.left = "0";
    // boton.style.top = "0";
    // boton.style.justifyItems = "center";
    // boton.style.justifyContent = "center";
    // boton.innerHTML =
    //   '<img src="' +
    //   logo +
    //   '" style="width:50%;vertical-align:middle;opacity:0.5;margin:0">📥 Descargar';
    boton.innerHTML =
      '<img src="' +
      logo +
      '" style="vertical-align:middle;opacity:0.5;margin:0"> 📥 Descargar';
    contenedor.appendChild(boton);
  } else if (fullUrl.includes("manyvids.com/Video")) {
    boton.style.justifyItems = "center";
    boton.style.left = "0";
    boton.innerHTML =
      '<img src="' +
      logo +
      '" style="vertical-align:middle;opacity:0.5;margin:0">📥 Descargar';
  } else if (
    fullUrl.includes("fapello.com") &&
    !fullUrl.includes("fapello.com/content")
  ) {
    boton.style.left = "150px";
    boton.style.right = "0";
    boton.style.margin = "auto";
    //agregarDatosFap(fullUrl, userId, userId, idFoto, urlImg);
    // Llamar a la función del background
    chrome.runtime.sendMessage(
      {
        action: "agregarParametro",
        payload: {
          url: fullUrl,
          name: userId,
          id: userId,
          foto: idFoto,
          URL: urlImg,
        },
      },
      (response) => {
        console.log("Respuesta del background:", response);
      },
    );
  } else if (
    fullUrl.includes("fapello.com/content") ||
    fullUrl.includes("cdni.pornpics.com")
  ) {
    boton.style.left = "0";
    boton.style.right = "0";
    boton.style.margin = "auto";
  } else if (fullUrl.includes("loyalfans")) {
    if (mensajeTodos === "Todos") {
      //boton.id = `mi-boton-flotante-${idBoto}`;
      boton.style.zIndex = "10";
      boton.style.left = "0";
      boton.style.right = "0";
      boton.style.bottom = "0";
      boton.style.margin = "auto";
      contenedor.style.position = "relative";
    }
  }
}

const obtieneTwitter = async (src, refer) => {
  try {
    //const token = await getToken();
    const response = await fetch(src, {
      headers: {
        accept: "*/*",
        "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
        authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Opera";v="133", "Chromium";v="149", "Not)A;Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-transaction-id":
          "OVC3zIpjYhWK5YgVj9Ar+ooK4Pq2vGKc/b0RcKD8phMdDoV8RIoFUNXOHxuwPbM5ael5tz/Rd9mro2eWzZ2w2glnh0MeOg",
        "x-csrf-token":
          "e6b250bd724fdce3a90a527ee656fdedac7421a90f0740e5100a4e93155f429ccfec1323baacdad7e745f4025f73f8710cdaea7bdd1f769583fb73d57871a63156e5659a769d2d933d6ba6ebc09a2af3",
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "es",
        cookie:
          'guest_id_marketing=v1%3A179127159700384310; guest_id_ads=v1%3A179127159700384310; guest_id=v1%3A179127159700384310; __cuid=8fa43bf1-34dc-43f3-8a34-9f8b70fcee8c; __cuid=8fa43bf1-34dc-43f3-8a34-9f8b70fcee8c; g_state={"i_l":0,"i_ll":1791271613687,"i_b":"O65S1Qq/1MnnZK37mBieYTOVPxYB9HF7rQNfPRn0bZs","i_e":{"enable_itp_optimization":24},"i_et":1791271613687}; twid=u%3D1675697010622582784; auth_token=a74d1daed954b5551f78a4bfe492470b7e35fc1c; ct0=e6b250bd724fdce3a90a527ee656fdedac7421a90f0740e5100a4e93155f429ccfec1323baacdad7e745f4025f73f8710cdaea7bdd1f769583fb73d57871a63156e5659a769d2d933d6ba6ebc09a2af3; lang=es; personalization_id="v1_EBg64yLV5XdiQ/rNnM4+tA=="; cf_clearance=bfQWHA04uqYnzFkvUqwKo7CDARuD6le6.6SxS9mAcoA-1792910375-1.2.1.1-Y6_y7iUs0UrbEqoqVgPSjdhRvDHyphjCGyPeUDDVAQG6AqOQjmKXCNVQIQpxPdzCWG1M1ds4GoIF8mGjBjYjh6GXf02p7ygzrH9fuFKIP9UIWs5ibWdC98ROnn7ZQetqyinlwK2P49t0qGJBaVRguuZ7coa9teehpo3QQPIQuPjvqIdgrDIq.weExRrjOwHo1IOBMGfKcDZgv2xjvmDTjWzOQCAd1Lj7dwVvgfvQx4ojSg5CMcltTWMMMUecbEd6Bp24JQdZcbxG_c0ffF63BUVv.GCKZqRblNRMuWByzYGyQlnJLr6AodkB7ADlsMXy.iHcm7WPTxwIIvzxyHkmVGH6T4YrCHRNNozrQ2k7D2Y; __cf_bm=zXzFaeq6UKW5OqsH_e4hwgbrFsxQCE6_7f0NTSBltpU-1792910375.966505-1.0.1.1-p_29Q7b0og2aQmEu1HofZpv4F60T6JTdnTOwXU3OImQ9YyKc_FIBBMfxnTQfvGeJ26yFldVseYWirYGgfx4aUqZY89zBORkPvgYlZpPyT8CTD4V2kR2BLw_yH0v_sumu',
        Referer: "https://x.com/SacanaDuTT/status/2095478421392421157/video/1",
      },
      body: null,
      method: "GET",
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const datoss = await response.json();
    const variantes =
      datoss.data.threaded_conversation_with_injections_v2.instructions[1]
        .entries[0].content.itemContent.tweet_results.result.legacy
        .extended_entities.media[0].video_info.variants;
    //console.log(variantes.at(-1).url);
    // console.log(
    //   datoss.data.threaded_conversation_with_injections_v2.instructions[1]
    //     .entries[0].content.itemContent.tweet_results.result.legacy
    //     .extended_entities.media[0].video_info.variants[3],
    // );
    //elputoUrl = variantes.at(-1).url;
    return variantes.at(-1).url;
  } catch (error) {
    // Capturamos errores durante la solicitud
    console.error("Error durante la solicitud:", error);
  }
};

function crearBotonFlotantePorImagen(contenedor) {
  //console.log(contenedor);
  contenedor.forEach((img, index) => {
    //console.log(index);
    if (fullUrl.includes("fapello")) {
      selector = document.querySelector(
        `#content > div:nth-child(${index + 1}) > a > div > img`,
      )?.src;
    } else if (fullUrl.includes("twpornstars.com")) {
      //console.log(img);
      selector = document.querySelector(
        `body > div.block.block-thumbs.js-thumbs > div:nth-child(${index + 1}) > div.thumb__inner > a`,
      )?.href;
    } else if (
      fullUrl.includes(`=media`) &&
      !fullUrl.includes(`x.com/${userId}/media`)
    ) {
      enlaces = [
        ...document.querySelectorAll('li > div > div > div > a[href*="video"]'),
      ].map((a) => a.href);

      //console.log(enlaces);
      userId = enlaces
        .map((url) => url.match(/\/status\/(\d+)/)?.[1])
        .filter(Boolean);
      selector = enlaces[index];
    } else if (fullUrl.includes(`x.com/${userId}/media`)) {
      // const urls = [
      //   ...document.querySelectorAll('li > div > div > div > a[href*="video"]'),
      // ].map((a) => a.href);
      // document.querySelectorAll('div[data-testid="User-Name"] > div > div > div:nth-child(3)')
      const urls = [
        ...document.querySelectorAll(
          'div[data-testid="User-Name"] > div > div > div:nth-child(3) > a',
        ),
      ].map((a) => a.href);
      //console.log(urls);
      selector = urls[index];
    } else if (fullUrl.includes("pornhub.com/gifs/")) {
      const linkssss = document.querySelectorAll(
        `body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li > a`,
      );
      selector = linkssss[index]?.querySelector("video").dataset.mp4;
    } else if (
      fullUrl.includes(`pornhub.com/model/${userId}/gifs/video`) ||
      fullUrl.includes(`pornhub.com/pornstar/${userId}/gifs/video`)
    ) {
      //console.log(userId);
      //console.log(index);
      const linkssss = document.querySelectorAll(
        `#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li > a`,
      );
      const hihi = linkssss[index]?.querySelector(`img`)?.dataset?.gifUrl;
      //console.log(hihi);
      //console.log(linkssss[index]?.querySelector("img").dataset.gifUrl);
      let nummmm = linkssss[index]?.href.split("/")[4];
      const str = "0" + nummmm;
      const partes = str.match(/.{1,3}/g);
      //const ellink = `https://el.phncdn.com/pics/gifs/${partes[0]}/${partes[1]}/${partes[2]}/${nummmm}a.webm`;
      //const ellink = `https://el2.phncdn.com/pics/gifs/${partes[0]}/${partes[1]}/${partes[2]}/${nummmm}a.mp4`;
      const ellink = hihi.replace(".gif", ".mp4");
      selector = ellink;
    } else if (
      fullUrl.includes("pornhub.com/pornstar/") ||
      fullUrl.includes("pornhub.com/model/")
    ) {
      //console.log(index);
      //console.log(userId);
      document.querySelector(
        "#profileContent > div > section > div > div.profileVids.gifsOutterWrapperProfile > div.gifsWrapperProfile.clearfix",
      );
      const linkssss = document.querySelectorAll(
        `#profileContent > div > section > div > div.profileVids.gifsOutterWrapperProfile > div.gifsWrapperProfile.clearfix > ul > li > a`,
      );
      let nummmm = linkssss[index]?.href.split("/")[4];
      const str = "0" + nummmm;
      const partes = str.match(/.{1,3}/g);
      const ellink = `https://el.phncdn.com/pics/gifs/${partes[0]}/${partes[1]}/${partes[2]}/${nummmm}a.webm`;
      selector = ellink;
    } else if (fullUrl.includes("redgifs.com/users")) {
      //const listaDo = document.querySelectorAll(todos);
      //const nummmm = listaDo[index]?;
      //listaDo.forEach((r, index) => {
      //console.log(r.dataset.feedItemId);
      //});
      const Titulos = document.querySelectorAll(
        "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > img",
      );
      const elNom = Titulos[index]?.src;
      //console.log(elNom);
      const nombreX = elNom.split("/").pop().replace("-mobile.jpg", "");
      nombreFinal = nombreX;
      //console.log(nombreX);
      //const losLink = `https://media.redgifs.com/${img.dataset.feedItemId}.mp4`;
      const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
      selector = losLink;
      //selector = img?.href;
      //console.log(img);
    } else if (fullUrl.includes("pornpics.com/es/galleries")) {
      const linkssss = document.querySelectorAll(`#tiles > li`);
      selector = linkssss[index]?.querySelector("a")?.href;
      console.log(selector);
    } else if (fullUrl.includes(`onlyfans.com/${userId}/videos`)) {
      const linkssss = document.querySelectorAll(
        ".vue-recycle-scroller__item-wrapper > div > .dynamic-scroller-item > a",
      );
      selector = linkssss[index]?.href;
    } else if (fullUrl.includes("loyalfans")) {
      const linkssss = document.querySelectorAll(
        `body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div`,
      );
      selector = linkssss[index]?.querySelector("div > img")?.src;
      //console.log('selector linea 99: ' + selector);
      //console.log(linkssss);
    }
    //console.log(selector);
    // Evita inyectar varias veces en la misma imagen
    //if (img.parentElement.querySelector(".mi-boton-flotante")) return;
    if (img.parentElement.querySelector(`.mi-boton-flotante-${index}`)) return;
    if (img.dataset.botonCreado) return;
    img.dataset.botonCreado = "true";
    const nodos = selector;
    const contenedor2 = img;
    if (fullUrl.includes("pornpics.com/es/galleries")) {
      contenedor2.style.position = "";
    } else {
      contenedor2.style.position = "relative";
    }

    const boton = document.createElement("button");
    boton.id = `mi-boton-flotante-${index}`;
    boton.style.display = "inline-grid";
    boton.style.width = "100px";
    boton.textContent = "📥 Descargar";
    boton.style.position = "absolute";
    boton.style.padding = "2px";
    //boton.style.background = "#1DA1F2";
    boton.style.background = "rgb(7 112 177)";
    boton.style.color = "#fff";
    boton.style.border = "none";
    boton.style.borderRadius = "8px";
    boton.style.zIndex = "9999";
    boton.style.cursor = "pointer";
    boton.style.left = "0";
    boton.style.right = "0";
    boton.style.bottom = "0";
    boton.style.margin = "auto";
    boton.style.fontSize = "10px";
    enlaces = nodos;
    limpio = enlaces?.replace(/_300px(?=\.[a-z]+$)/i, "");
    const enlacesLimpios = limpio;
    //boton.innerHTML = '<img src="' + logo + '" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto"> 📥 Descargar';
    boton.innerHTML = `<img src="${logo}" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto"> 📥 Descargar`;
    boton.onmouseover = function () {
      boton.title = `Click para descargar: ${enlacesLimpios}.!`;
    };
    boton.dataset.url = enlacesLimpios;

    boton.addEventListener("click", (e) => {
      e.stopPropagation();
      const urlImagen = e.currentTarget.dataset.url;
      e.currentTarget.remove();
      if (fullUrl.includes("twpornstars.com")) {
        (async () => {
          enlace = await ObtenemosLinkTwpornstar(urlImagen);
          chrome.runtime.sendMessage({
            action: "inject_main_script",
            url: enlace,
          });
        })();
        } else if (fullUrl.includes(`pornpics.com/es/galleries`)) {
        (async () => {
        enlace = urlImagen; //await ObtenemosLinkTwpornstar(urlImagen);
        nombreFinal = urlImagen.split("/").pop().replace(".jpg", "");
        await descargarImagen(enlace, nombreFinal);
        // chrome.runtime.sendMessage({
        //   action: "inject_main_script",
        //   url: enlace,
        // });
      })();
      } else if (fullUrl.includes(`x.com/${userId}/media`)) {
        // (async () => {
        //   await navigator.clipboard.writeText(urlImagen);
        //   //abrir_xdownloader
        //   //chrome.runtime.sendMessage({ action: "inject_main_script-twitter", url: window.location.href });
        //   chrome.runtime.sendMessage({
        //     action: "inject_main_script-twitter",
        //     url: enlaces,
        //   });
        // })();
        const tata = boton.dataset.url;
        const ids = tata.match(/\/status\/(\d+)/)?.[1];
        (async () => {
          try {
            const variables = {
              focalTweetId: ids,
              rankingMode: "Relevance",
              includePromotedContent: true,
              withCommunity: true,
              withQuickPromoteEligibilityTweetFields: true,
              withBirdwatchNotes: true,
              withVoice: true,
            };

            const url = new URL(
              "https://x.com/i/api/graphql/gJoREC4Bspo4kJ0ax9C3sQ/TweetDetail",
            );

            url.searchParams.set("variables", JSON.stringify(variables));

            // Mantener las features que ya utiliza tu extensión
            url.searchParams.set(
              "features",
              JSON.stringify({
                rweb_video_screen_enabled: false,
                rweb_cashtags_enabled: true,
                profile_label_improvements_pcf_label_in_post_enabled: true,
                responsive_web_profile_redirect_enabled: true,
                rweb_tipjar_consumption_enabled: false,
                verified_phone_label_enabled: false,
                creator_subscriptions_tweet_preview_api_enabled: true,
                responsive_web_graphql_timeline_navigation_enabled: true,
                premium_content_api_read_enabled: false,
                communities_web_enable_tweet_community_results_fetch: true,
                c9s_tweet_anatomy_moderator_badge_enabled: true,
                responsive_web_grok_analyze_button_fetch_trends_enabled: false,
                responsive_web_grok_analyze_post_followups_enabled: true,
                rweb_cashtags_composer_attachment_enabled: true,
                responsive_web_jetfuel_frame: true,
                rweb_sports_post_context_enabled: true,
                responsive_web_grok_share_attachment_enabled: true,
                responsive_web_grok_annotations_enabled: true,
                articles_preview_enabled: true,
                responsive_web_edit_tweet_api_enabled: true,
                view_counts_everywhere_api_enabled: true,
                longform_notetweets_consumption_enabled: true,
                responsive_web_twitter_article_tweet_consumption_enabled: true,
              }),
            );

            url.searchParams.set(
              "fieldToggles",
              JSON.stringify({
                withPayments: false,
                withDmBlocks: false,
                withArticleRichContentState: true,
                withArticlePlainText: false,
                withArticleSummaryText: true,
                withArticleVoiceOver: true,
                withGrokAnalyze: false,
                withDisallowedReplyControls: false,
              }),
            );

            // Tu función existente consulta el endpoint de X
            const enlaceVideo = await obtieneTwitter(
              url.toString(),
              typeof refer !== "undefined" ? refer : undefined,
            );

            if (!enlaceVideo) {
              console.warn("No se encontró un enlace multimedia");
              return;
            }

            console.log("Enlace obtenido:", enlaceVideo);
            const nombrew = enlaceVideo
              .split("/")
              .pop()
              .replace(/\?tag=\d+$/, "");
            await descargarVideo(enlaceVideo, nombrew);

            // // Buscar primero el contenedor del visor
            // const contenedor =
            //   media.closest('div[aria-label="Video insertado"]') ||
            //   document.querySelector('div[aria-label="Video insertado"]') ||
            //   media.parentElement?.parentElement;

            // if (!contenedor) {
            //   console.warn("No se encontró el contenedor para el botón");
            //   return;
            // }

            // // Evitar duplicar el botón
            // if (contenedor.querySelector(".boton-descarga-multisitio")) {
            //   return;
            // }

            // const mensaje = `Click para descargar: ${enlaceVideo}`;

            // crearBotonFlotante(contenedor, mensaje, enlaceVideo);

            // Si crearBotonFlotante permite configurar clases,
            // asignale "boton-descarga-multisitio" al botón creado.
          } catch (error) {
            console.error("Error procesando el multimedia de X:", error);
            media.__seen = false;
          }
        })();
      } else if (
        fullUrl.includes(`=media`) &&
        !fullUrl.includes(`x.com/${userId}/media`)
      ) {
        const tata = boton.dataset.url;
        const ids = tata.match(/\/status\/(\d+)/)?.[1];
        //console.log(ids);
        (async () => {
          try {
            const variables = {
              focalTweetId: ids,
              rankingMode: "Relevance",
              includePromotedContent: true,
              withCommunity: true,
              withQuickPromoteEligibilityTweetFields: true,
              withBirdwatchNotes: true,
              withVoice: true,
            };

            const url = new URL(
              "https://x.com/i/api/graphql/gJoREC4Bspo4kJ0ax9C3sQ/TweetDetail",
            );

            url.searchParams.set("variables", JSON.stringify(variables));

            // Mantener las features que ya utiliza tu extensión
            url.searchParams.set(
              "features",
              JSON.stringify({
                rweb_video_screen_enabled: false,
                rweb_cashtags_enabled: true,
                profile_label_improvements_pcf_label_in_post_enabled: true,
                responsive_web_profile_redirect_enabled: true,
                rweb_tipjar_consumption_enabled: false,
                verified_phone_label_enabled: false,
                creator_subscriptions_tweet_preview_api_enabled: true,
                responsive_web_graphql_timeline_navigation_enabled: true,
                premium_content_api_read_enabled: false,
                communities_web_enable_tweet_community_results_fetch: true,
                c9s_tweet_anatomy_moderator_badge_enabled: true,
                responsive_web_grok_analyze_button_fetch_trends_enabled: false,
                responsive_web_grok_analyze_post_followups_enabled: true,
                rweb_cashtags_composer_attachment_enabled: true,
                responsive_web_jetfuel_frame: true,
                rweb_sports_post_context_enabled: true,
                responsive_web_grok_share_attachment_enabled: true,
                responsive_web_grok_annotations_enabled: true,
                articles_preview_enabled: true,
                responsive_web_edit_tweet_api_enabled: true,
                view_counts_everywhere_api_enabled: true,
                longform_notetweets_consumption_enabled: true,
                responsive_web_twitter_article_tweet_consumption_enabled: true,
              }),
            );

            url.searchParams.set(
              "fieldToggles",
              JSON.stringify({
                withPayments: false,
                withDmBlocks: false,
                withArticleRichContentState: true,
                withArticlePlainText: false,
                withArticleSummaryText: true,
                withArticleVoiceOver: true,
                withGrokAnalyze: false,
                withDisallowedReplyControls: false,
              }),
            );

            // Tu función existente consulta el endpoint de X
            const enlaceVideo = await obtieneTwitter(
              url.toString(),
              typeof refer !== "undefined" ? refer : undefined,
            );

            if (!enlaceVideo) {
              console.warn("No se encontró un enlace multimedia");
              return;
            }

            console.log("Enlace obtenido:", enlaceVideo);
            const nombrew = enlaceVideo
              .split("/")
              .pop()
              .replace(/\?tag=\d+$/, "");
            await descargarVideo(enlaceVideo, nombrew);

            // // Buscar primero el contenedor del visor
            // const contenedor =
            //   media.closest('div[aria-label="Video insertado"]') ||
            //   document.querySelector('div[aria-label="Video insertado"]') ||
            //   media.parentElement?.parentElement;

            // if (!contenedor) {
            //   console.warn("No se encontró el contenedor para el botón");
            //   return;
            // }

            // // Evitar duplicar el botón
            // if (contenedor.querySelector(".boton-descarga-multisitio")) {
            //   return;
            // }

            // const mensaje = `Click para descargar: ${enlaceVideo}`;

            // crearBotonFlotante(contenedor, mensaje, enlaceVideo);

            // Si crearBotonFlotante permite configurar clases,
            // asignale "boton-descarga-multisitio" al botón creado.
          } catch (error) {
            console.error("Error procesando el multimedia de X:", error);
            media.__seen = false;
          }
        })();
      } else if (fullUrl.includes("redgifs.com/users/")) {
        //console.log(nombreFinal);
        (async () => {
          //const nombrew = urlImagen.match(/\/([^\/]+)\.mp4/i)?.[1];
          await descargarVideo(urlImagen, `${nombreFinal}.mp4`);
        })();
      } else if (fullUrl.includes("loyalfans.com")) {
        (async () => {
          //console.log(userId);
          const urlFetch = `https://www.loyalfans.com/api/v2/social/videos/${userId}?ngsw-bypass=true`;
          enlace = await obtieneLinkLoyalFans(urlFetch, index);
          //console.log(enlace);
          chrome.runtime.sendMessage({
            action: "inject_main_script",
            url: enlace,
          });
        })();
      } else if (fullUrl.includes(`onlyfans.com/${userId}/videos`)) {
        // const nombrew22 = document.querySelector(
        //   ".title-container > h1 > span",
        // ).textContent;
        // navigator.clipboard.writeText(fullUrl);
        window.open(`${enlacesLimpios}`, "_blank");
      } else if (
        fullUrl.includes(`pornhub.com/model/${userId}/gifs/video`) ||
        fullUrl.includes(`pornhub.com/pornstar/${userId}/gifs/video`)
      ) {
        (async () => {
          const nombrew = urlImagen.match(/\/([^\/]+)\.mp4/i)?.[1];
          await descargarVideo(urlImagen, nombrew);
        })();
      } else if (fullUrl.includes("pornhub.com/gifs/")) {
        (async () => {
          const eltuti = document.querySelectorAll(
            "body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li > a > .title",
          );
          //console.log(eltuti[index].textContent);
          const nombreTemp = eltuti[index].textContent;
          const nombreTemp1 = urlImagen.match(/\/([^\/]+)\.mp4/i)?.[1];
          const nombrew = `${nombreTemp1} - ${nombreTemp}`;
          //eltuti.forEach((img) => {
          //const nombrew = urlImagen.match(/\/([^\/]+)\.mp4/i)?.[1];
          await descargarVideo(urlImagen, `${nombrew}.mp4`);
        })();
      } else {
        enlace = urlImagen;
        chrome.runtime.sendMessage({
          action: "inject_main_script",
          url: enlace,
        });
        //alert(`enlace linea 124: ${enlace}`);
      }
    });

    if (fullUrl.includes("redgifs.com/usersssss")) {
      const nuevoDiv = document.createElement("div");
      nuevoDiv.style.position = "relative";
      nuevoDiv.classList.add(`mi-contenedor-${index}`);
      const contenedorRedgifs = document.querySelector(".tileFeed");
      nuevoDiv.appendChild(img);
      nuevoDiv.prepend(boton);
      contenedorRedgifs.appendChild(nuevoDiv);
      // } else if (fullUrl.includes(`onlyfans.com/${userId}/videos`)) {
      //   const nuevoDiv = document.createElement("div");
      //   nuevoDiv.style.position = "relative";
      //   nuevoDiv.classList.add(`mi-contenedor-${index}`);
      //   const contenedorRedgifs = document.querySelector(
      //     ".vue-recycle-scroller__item-wrapper > div > .dynamic-scroller-item",
      //   );
      //nuevoDiv.appendChild(img);
      //nuevoDiv.prepend(boton);
      //contenedor2.appendChild(nuevoDiv);
      //contenedorRedgifs.appendChild(nuevoDiv);
    } else {
      //console.log(contenedor2);
      contenedor2.prepend(boton);
    }
    if (fullUrl.includes("pornhub.com/gif/")) {
      //boton.style.left = "0";
      boton.style.margin = "5px";
    } else if (fullUrl.includes("pornhub.com/gifs/")) {
      boton.style.top = "5px";
      boton.style.margin = "0";
      boton.style.height = "fit-content";
      boton.innerHTML =
        '<img src="' +
        logo1 +
        '" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto; position:relative"> 📥 Descargar';
    } else if (fullUrl.includes(`x.com/${userId}/media`)) {
      boton.style.top = "40px";
      boton.style.right = "10px";
      boton.style.left = "unset";
      boton.style.bottom = "unset";
      boton.style.fontSize = "";
      boton.style.fontWeigth = "bold";
      boton.innerHTML =
        '<img src="' +
        logo +
        '" style="width:20%;vertical-align:middle;opacity:0.8;margin:auto"> 📥 Descargar';
    } else if (fullUrl.includes(`x.com/search`)) {
      boton.style.right = "10px";
      boton.style.left = "unset";
      boton.style.bottom = "8px";
      boton.style.fontSize = "";
      boton.style.fontWeigth = "bold";
      boton.innerHTML =
        '<img src="' +
        logo +
        '" style="width:30%;vertical-align:middle;opacity:0.8;margin:auto"> 📥 Descargar';
    } else if (domain.includes("onlyfans")) {
      boton.innerHTML = `<img src="${logo}" style="width:50%;vertical-align:middle;opacity:0.8;margin:auto"> 📥 Descargar`;
      boton.style.justifyContent = "center";
      boton.style.background = "#0770b182";
      boton.style.zIndex = "99";
    } else if (
      fullUrl.includes("pornhub.com/model/") ||
      fullUrl.includes("pornhub.com/pornstar/")
    ) {
      //boton.style.width = "70px";
      boton.style.width = "45%";
      boton.style.left = "";
      boton.style.bottom = "";
      boton.style.margin = "2px";
      boton.style.color = "#ff9000";
      //boton.style.background = "rgb(0 0 0 / 43%)";
      boton.style.background = "rgb(0 0 0 / 65%)";
      boton.style.borderRadius = "5px";
      boton.style.fontSize = "12px";
      boton.innerHTML =
        '<img src="' +
        logo +
        '" style="width:80%;vertical-align:middle;opacity:0.8;margin:auto; position:relative"> 📥 Descargar';
    } else if (domain.includes("redgifs")) {
      if (fullUrl.includes("redgifs.com/users")) {
        boton.style.bottom = "";
      }
      //contenedor2.appendChild(boton);
    } else if (
      fullUrl.includes("twpornstars.com") &&
      fullUrl.includes("/videos")
    ) {
      boton.style.width = "fit-content";
      boton.style.height = "fit-content";
      boton.style.left = "5px";
      boton.style.top = "5px";
      boton.style.margin = "";
      boton.style.justifyItems = "center";
      boton.innerHTML =
        '<img src="' +
        logo +
        '" style="vertical-align:middle;opacity:0.5;margin:0"> 📥 Descargar';
    } else if (
      fullUrl.includes("twpornstars.com") &&
      !fullUrl.includes("/videos")
    ) {
      boton.style.left = "0";
      boton.style.top = "0";
      boton.style.justifyItems = "center";
      boton.style.justifyContent = "center";
      boton.innerHTML =
        '<img src="' +
        logo +
        '" style="width:50%;vertical-align:middle;opacity:0.5;margin:0"> 📥 Descargar';
      //contenedor2.appendChild(boton);
    } else if (
      fullUrl.includes("fapello.com") &&
      !fullUrl.includes("fapello.com/content")
    ) {
      //boton.style.top = "80%";
    } else if (fullUrl.includes("fapello.com/content")) {
      //
    } else if (fullUrl.includes("pornpics.com/es/galleries")) {
      boton.style.opacity = "0.9";
      boton.style.background = "rgb(7 112 177)";
      boton.style.color = "#e00083";
      boton.style.fontWeight = "bold";
      boton.style.fontSize = "";
      boton.style.justifyItems = "center";
      boton.style.bottom = "5px";
      boton.innerHTML = `<img src="${logo}" style="width:80%;vertical-align:middle;opacity:1;margin:0"> 📥 Descargar`;
    } else if (fullUrl.includes("loyalfans")) {
      boton.style.zIndex = "10";
      boton.innerHTML = `<img src="${logo1}" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto"> 📥 Descargar`;
    }
  });
  ContadorFunciones++;
  cuentaVeces("Funcion crearbotonximagen", ContadorFunciones);
}

async function ObtenemosLinkTwpornstar(enlace) {
  //console.log(enlace);
  try {
    const respuesta = await fetch(enlace, {
      method: "GET",
      headers: {
        "User-Agent": "MiAgente/1.0", // algunos sitios requieren un agente válido
      },
    });

    if (!respuesta.ok) throw new Error("Error al cargar la página");
    const html = await respuesta.text();

    // Crear un DOM temporal para buscar enlaces
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Ejemplo: buscar un enlace <video> o <source>
    const enlaceVideo = doc.querySelector("video source")?.src;

    //console.log('Enlace encontrado:', enlaceVideo);
    return enlaceVideo;
  } catch (err) {
    console.error(err);
  }
}

// const descargarArchivoSimple = (url, nombre) => {
//     //console.log('linea 202 descargarArchivosimple');
//     let segundos = 5;

//     const modal = document.createElement("div");
//     modal.style = `
//       position: fixed; top: 50%; left: 50%;
//       transform: translate(-50%, -50%);
//       background: white; padding: 20px;
//       border: 2px solid black; border-radius: 10px;
//       font-size: 18px; text-align: center;
//       color: black; z-index: 9999;
//     `;

//     const mensaje = document.createElement("p");
//     mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
//     modal.appendChild(mensaje);
//     document.body.appendChild(modal);

//     const intervalo = setInterval(() => {
//       segundos--;
//       if (segundos > 0) {
//         mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
//       } else {
//         clearInterval(intervalo);
//         // Crear enlace y descargar
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = nombre;
//         document.body.appendChild(link);
//         link.click();
//         link.remove();

//         mensaje.textContent = "Descarga iniciada...";
//         setTimeout(() => modal.remove(), 2000);
//       }
//     }, 1000);
//   };

// let datos = new Map();
// function CallChrome2 (host, urlssss, nombre) {
//   chrome.runtime.sendMessage({
//     action: "descargar",
//     url: urlssss,
//     nombre: nombre
//   }, function (response) {
//     //console.log(response);
//     let id = response.id;
//     let nom = response.nombre;
//     let ulti = response.last;
//     datos.set(id, { id, nom, ulti });
//     //console.log(Array.from(datos.values()));
//     setTimeout(() => {
//       chrome.runtime.sendMessage({ action:"updateCookie", cookieName: "lastdir", cookieValue: ulti, url: location.href });
//     }, 500); // medio segundo de retraso para asegurar que se registre
//   });
// }

// Funcion para descargar archivos
// const descargarArchivo3 = async (url, nombre) => {
//   try {
//     let segundos = 5;
//     let intervalo;
//     let descargando = false;

//     // Crear modal
//     const modal = document.createElement("div");
//     modal.style = `
//       position: fixed; top: 50%; left: 50%;
//       transform: translate(-50%, -50%);
//       background: white; padding: 20px;
//       border: 2px solid black; border-radius: 10px;
//       font-size: 18px; text-align: center;
//       color: black;
//       z-index: 9999;
//     `;

//     const mensaje = document.createElement("p");
//     mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;

//     const btnAceptar = document.createElement("button");
//     btnAceptar.textContent = "Aceptar";
//     btnAceptar.style.margin = "5px";

//     const btnEsperar = document.createElement("button");
//     btnEsperar.textContent = "Esperar";
//     btnEsperar.style.margin = "5px";

//     const btnCancelar = document.createElement("button");
//     btnCancelar.textContent = "Cancelar";
//     btnCancelar.style.margin = "5px";
//     btnCancelar.style.background = "red";
//     btnCancelar.style.color = "white";

//     modal.appendChild(mensaje);
//     modal.appendChild(btnAceptar);
//     modal.appendChild(btnEsperar);
//     modal.appendChild(btnCancelar);
//     document.body.appendChild(modal);

//     // Función de descarga
//     const iniciarDescarga = async () => {
//       if (descargando) return;
//       descargando = true;
//       clearInterval(intervalo);
//       mensaje.textContent = "Descargando...";
//       btnAceptar.disabled = true;
//       btnEsperar.disabled = true;
//       btnCancelar.disabled = true;

//       try {
//         const respuesta = await fetch(url);
//         const blob = await respuesta.blob();
//         const blobUrl = URL.createObjectURL(blob);

//         const link = Object.assign(document.createElement("a"), {
//           href: blobUrl,
//           download: nombre
//         });

//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//         URL.revokeObjectURL(blobUrl);

//         mensaje.textContent = "Descarga completa ?";
//       } catch (err) {
//         mensaje.textContent = "Error en la descarga ?";
//         console.error(err);
//       }

//       setTimeout(() => modal.remove(), 2000);
//     };

//     // Eventos de botones
//     btnAceptar.onclick = iniciarDescarga;
//     btnEsperar.onclick = () => {
//       clearInterval(intervalo);
//       modal.remove();
//       iniciarDescarga();
//     };
//     btnCancelar.onclick = () => {
//       clearInterval(intervalo);
//       limpiarListener();
//       modal.remove();
//     };

//     // Activar Enter para aceptar
//     const teclaEnterListener = (e) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         btnAceptar.click();
//       }
//     };
//     document.addEventListener("keydown", teclaEnterListener);

//     // Limpiar listener al cerrar modal
//     const limpiarListener = () => {
//       document.removeEventListener("keydown", teclaEnterListener);
//     };
//     btnAceptar.addEventListener("click", limpiarListener);
//     btnEsperar.addEventListener("click", limpiarListener);
//     btnCancelar.addEventListener("click", limpiarListener);

//     // Cuenta regresiva
//     intervalo = setInterval(() => {
//       segundos--;
//       if (segundos > 0) {
//         mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
//       } else {
//         clearInterval(intervalo);
//         iniciarDescarga();
//       }
//     }, 1000);

//   } catch (err) {
//     console.error("Error al descargar:", err);
//   }
// };

const CallChrome = (host, urlssss, nombre) => {
  //console.log(nombre);
  //console.log(urlssss);
  //const descargarArchivo = (urlssss, nombre) => {
  try {
    let segundos = 5;
    let intervalo;

    // Crear modal
    const modal = document.createElement("div");
    modal.style = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: white; padding: 20px;
      border: 2px solid black; border-radius: 10px;
      font-size: 18px; text-align: center;
      color: black;
      z-index: 9999;
    `;

    const mensaje = document.createElement("p");
    mensaje.textContent = `La descarga de: ${nombre} - ${urlssss} comienza en ${segundos} segundos...`;

    const btnAceptar = document.createElement("button");
    btnAceptar.textContent = "Aceptar";
    btnAceptar.style.margin = "5px";

    // const btnEsperar = document.createElement("button");
    // btnEsperar.textContent = "Esperar";
    // btnEsperar.style.margin = "5px";

    const btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancelar";
    btnCancelar.style.margin = "5px";
    btnCancelar.style.background = "red";
    btnCancelar.style.color = "white";

    modal.appendChild(mensaje);
    modal.appendChild(btnAceptar);
    //modal.appendChild(btnEsperar);
    modal.appendChild(btnCancelar);
    document.body.appendChild(modal);

    // Lanza la descarga vía mensaje a la extensión
    const iniciarDescarga = () => {
      clearInterval(intervalo);
      mensaje.textContent = "Enviando a la extensión...";
      btnAceptar.disabled = true;
      //btnEsperar.disabled = true;
      btnCancelar.disabled = true;

      chrome.runtime.sendMessage(
        { action: "descargar", url: urlssss, nombre: nombre },
        function (response) {
          //console.log(response);
          let id = response.id;
          let nom = response.nombre;
          let ulti = response.last;

          //datos.set(id, { id, nom, ulti });
          //console.log(Array.from(datos.values()));

          setTimeout(() => {
            chrome.runtime.sendMessage({
              action: "updateCookie",
              cookieName: "lastdir",
              cookieValue: ulti,
              url: location.href,
            });
          }, 500);

          mensaje.textContent = "Solicitud enviada ✔";
          setTimeout(() => modal.remove(), 1500);
        },
      );
    };

    // Eventos de botones
    //btnAceptar.onclick = iniciarDescarga;
    btnAceptar.onclick = () => {
      clearInterval(intervalo);
      modal.remove();
      iniciarDescarga();
    };
    // btnEsperar.onclick = () => {
    //   clearInterval(intervalo);
    //   modal.remove();
    //   iniciarDescarga();
    // };
    btnCancelar.onclick = () => {
      clearInterval(intervalo);
      limpiarListener();
      modal.remove();
    };

    // Activar Enter para aceptar
    const teclaEnterListener = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        btnAceptar.click();
      }
    };
    document.addEventListener("keydown", teclaEnterListener);

    const limpiarListener = () => {
      document.removeEventListener("keydown", teclaEnterListener);
    };
    btnAceptar.addEventListener("click", limpiarListener);
    //btnEsperar.addEventListener("click", limpiarListener);
    btnCancelar.addEventListener("click", limpiarListener);

    // Cuenta regresiva de 5 segundos
    intervalo = setInterval(() => {
      segundos--;
      if (segundos > 0) {
        mensaje.textContent = `La descarga de: ${nombre} - ${urlssss} comienza en ${segundos} segundos...`;
      } else {
        clearInterval(intervalo);
        iniciarDescarga();
      }
    }, 1000);
  } catch (err) {
    console.error("Error al iniciar descarga:", err);
  }
};

// Función para obtener link de LoyalFans
const obtieneLinkLoyalFans = async (src, id) => {
  try {
    const response = await fetch(src, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc2xfdTI0X2FybXI4XzA4LmxveWFsZmFucy5pbnRlcm5hbDoxMDA4MS9hcGkvdjIvYXV0aC9sb2dpbiIsImlhdCI6MTc1ODIwNzY4NiwiZXhwIjoxNzU4Mjk0MDg2LCJuYmYiOjE3NTgyMDc2ODYsImp0aSI6IkxCRXlLcGRpd3NaWmJrYk4iLCJzdWIiOiIzNTQ5MzQ2IiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.LA1AjR2DR2gSvzA8841gg3poXgmblwpH8A0-Uuf46HE",
        "content-type": "application/json",
        "sec-ch-ua": '"Opera";v="95", "Chromium";v="109", "Not;A=Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-api-version": "3.4.4",
        "x-xsrf-token":
          "eyJpdiI6InNwSUFydFhoNWdZYjdrSjMxODN2N1E9PSIsInZhbHVlIjoiUFZJekt3UCtoWktwKzZMOGdMbTVHUDAwRldCNmV2N25Edmc1OEcyVWlIU1JydkJ1Mzgxd2Q1WWliU2szTHhmRHlUTnducWxvc2o5MXEwU0hHNXNKNkFyVk1ScVRKRXNYeUdyZGVuNk02UTlrcFR1TUswZll1akJyaEFDRTMrTTEiLCJtYWMiOiJkY2U5N2NiYzUwNGU5NzI1NDQxYzRkNDQyZTA0NjE0OGI1NTUzMDdmMWQzYWNmOTkwNjg1YTNlZjkyODBlMDhkIiwidGFnIjoiIn0=",
      },
      referrer: `https://www.loyalfans.com/${userId}/videos`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null, //"{\"limit\":15}",
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const datoss = await response.json();
    const urrrll = datoss.videos[id].video_object.video_url;
    return urrrll;
  } catch (error) {
    // Capturamos errores durante la solicitud
    console.error("Error durante la solicitud:", error);
  }
};

// function checkUrl(fullUrl, rules) {
//   const domain = Object.keys(DOMAIN_RULES).find(d => fullUrl.includes(d));
//   if (!domain) return null; // No hay reglas para este dominio

//   for (const rule of DOMAIN_RULES[domain]) {
//     // Condición de "incluye"
//     const includesMatch = rule.include?.some(part => fullUrl.includes(part));

//     // Condición de "excluye" (si existe)
//     const excludesMatch = rule.exclude?.some(part => fullUrl.includes(part)) || false;

//     if (includesMatch && !excludesMatch) {
//       console.log(rule.result);
//       return rule.result;
//     }
//   }

//   return null; // No coincide con ninguna regla
// }

function checkUrl(fullUrl, rules) {
  const domain = Object.keys(rules).find((d) => fullUrl.includes(d));
  if (!domain) return null;

  for (const rule of rules[domain]) {
    const includesMatch = rule.include?.some((part) => fullUrl.includes(part));
    const excludesMatch =
      rule.exclude?.some((part) => fullUrl.includes(part)) || false;
    if (includesMatch && !excludesMatch) {
      return rule.result;
    }
  }
  return null;
}

function GetHosts(url) {
  if (domain.includes("redgifs")) {
    // const link2 = fullUrl.split("/watch/")[1].split("#")[0];
    // const link1 = "https://api.redgifs.com/v2/gifs/" + link2 + "?views=yes&users=yes&niches=yes";
    // obtieneredgifs(link1).then(urlssss => {
    //   console.log(urlssss);
    //   enlace = urlssss;
    //   //CallChrome(host, urlssss, `${nombre}${extension}`);
    //   return enlace;
    // });
    //const nombreTemporal = obtenerNombre(url);
    //nombre = nombreTemporal.split("#")[0];
    //enlace = `https://media.redgifs.com/${nombre}.mp4`;
  } else if (domain.includes("pornhub")) {
    if (fullUrl.includes("/gif")) {
      const nummmm = fullUrl.split("/")[4];
      const str = "0" + nummmm;
      const partes = str.match(/.{1,3}/g);
      enlace = `https://el.phncdn.com/pics/gifs/${partes[0]}/${partes[1]}/${partes[2]}/${nummmm}a.webm`;
    }
  }
  return enlace;
}

// function cuentaRegresiva(segundos, mensaje, elemento) {
//   segundos = segundos;
//   const intervalo = setInterval(() => {
//     segundos -= 100;
//     if (segundos > 0) {
//       texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!<br>Tiempo estimado para cargar botones: 2.5segundos.<br>Tiempo restante: ${segundos / 1000}'`;
//     } else {
//       texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!<br>Botones cargados.!'`;
//       clearInterval(intervalo);
//     }
//   }, 100);
// };

function iniciarCuentaRegresiva(
  elemento,
  msTotales,
  mensaje,
  mensaje2,
  estado,
  domain,
  onFinish,
) {
  let restante = msTotales;
  //console.log(mensaje, mensaje2, domain, msTotales, restante);

  const actualizarMensaje = (restanteMs) => {
    // Si todavía hay tiempo, mostramos el restante en segundos
    if (restanteMs > 0) {
      if (estado === true) {
        return `${mensaje}<br>
                Tiempo estimado para cargar botones: ${(msTotales / 1000).toFixed(1)} segundos.<br>
                Tiempo restante: ${(restanteMs / 1000).toFixed(1)} segundos.'`;
      } else {
        return `${mensaje}<br>
                <!-- Tiempo estimado para cargar botones: ${(msTotales / 1000).toFixed(1)} segundos.<br> -->
                Tiempo restante: ${(restanteMs / 1000).toFixed(1)} segundos.'`;
      }
    }
    // Cuando termina
    return `${mensaje}<br>
            ${mensaje2}`;
  };

  // Mostrar el primer mensaje
  elemento.innerHTML = actualizarMensaje(restante);

  const intervalo = setInterval(() => {
    restante -= 100;
    if (restante > 0) {
      elemento.innerHTML = actualizarMensaje(restante);
    } else {
      elemento.innerHTML = actualizarMensaje(0);
      clearInterval(intervalo);
      if (typeof onFinish === "function") {
        elTiempo = 1500;
        onFinish(); // Llamamos al callback
      }
    }
  }, 100);
}

// function obtenerEstadoExtension(url, name, callback) {
//   chrome.cookies.get({ url: url, name: name }, (cookie) => {
//     if (!cookie) {
//       callback(true); // por defecto activo
//       return;
//     }
//     try {
//       const datos = JSON.parse(cookie.value);
//       callback(datos.activo);
//     } catch (e) {
//       console.error("Error parseando cookie:", e);
//       callback(true);
//     }
//   });
// }
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "iniciarCuentaRegresiva") {
    //console.log("Iniciando cuenta regresiva con:", msg);
    const elemento = document.getElementById(msg.idElemento);
    if (!elemento) {
      console.warn("⚠️ No se encontró #contador para mostrar el progreso.");
      sendResponse({ ok: false, reason: "No se encontró elemento contador" });
      return;
    }

    iniciarCuentaRegresiva(
      elemento,
      msg.msTotales,
      msg.mensaje,
      msg.mensaje2,
      msg.domain,
      () => {
        console.log("⏱ Cuenta regresiva finalizada correctamente");
      },
    );

    sendResponse({ ok: true });
  }
});
