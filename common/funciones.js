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
      opciones.remover.forEach(r => limpio = limpio.replace(r, ""));
    }
    return limpio.substring(limpio.lastIndexOf("/") + 1);
  };

function crearBotonFlotante(contenedor, urlImg, retrasos) {
  
    if (document.getElementById("mi-boton-flotante")) return;
    const boton = document.createElement("button");
    if (fullUrl.includes('loyalfans')) {
      if (mensajeTodos === 'Todos') {
        boton.id = `mi-boton-flotante-${idBoto}`;
        if (document.getElementById(`mi-boton-flotante-${idBoto}`)) return;
      }
      if (mensajeUno === 'Uno') {
        boton.id = "mi-boton-flotante";
      }
    } else {
      boton.id = "mi-boton-flotante";
    }
    boton.style.display = "inline-grid";
    boton.style.width = "100px";
    boton.textContent = "⬇ Descargar";
    boton.style.position = "absolute";    
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
    boton.onmouseover = function() {boton.title = `Click para descargar: ${urlImg}.!`;};
    boton.dataset.url = urlImg;
  
    boton.onclick = () => {
      if (fullUrl.includes('loyalfans')) {
        if (mensajeTodos === 'Todos') {
          //const todos = document.querySelectorAll("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div");
          (async () => {
            //console.log(userId);
            console.log(boton.id);
            //console.log(idBoto);
            idBoto = boton.id.split('-')[3];
            const urlFetch = `https://www.loyalfans.com/api/v2/social/videos/${userId}?ngsw-bypass=true`;
            enlace = await obtieneLinkLoyalFans(urlFetch, idBoto);
            console.log(enlace);
            chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
          })();
        }
        if (mensajeUno === 'Uno') {
          chrome.runtime.sendMessage({ action: "inject_main_script", url: urlImg });
        }
      } else if (domain.includes('redgifs')) {
        if (fullUrl.includes('redgifs.com/watch')) {
          if (extension === '.jpg') {
            chrome.runtime.sendMessage({ action: "inject_main_script", url: urlImg });
          } else {
            chrome.runtime.sendMessage({ action: "inject_main_script" });
          }
        }
      } else {
        chrome.runtime.sendMessage({ action: "inject_main_script" });
      }
      boton.remove();
    };    
    contenedor.appendChild(boton);
    if (domain.includes('pornhub')) {
        boton.style.left = "0";
        boton.style.margin = "5px";
        boton.style.background = "rgb(7 112 177 / 57%)";
        boton.style.color = "rgb(255, 144, 0)";
        boton.innerHTML = `<img src="${logo}" style="width:100%;vertical-align:middle;opacity:0.8;margin:0"> 📥 Descargar`;
    } else if (domain.includes('redgifs')) {
        contenedor.appendChild(boton);
    } else if (domain.includes('twpornstars')) {
        boton.style.left = "0";
        boton.style.top = "0";
        boton.style.justifyItems = "center";
        boton.style.justifyContent = "center";        
        boton.innerHTML = '<img src="' + logo + '" style="width:50%;vertical-align:middle;opacity:0.5;margin:0"> ⬇ Descargar';
        contenedor.appendChild(boton);
    } else if (fullUrl.includes('manyvids.com/Video')) {
        boton.style.justifyItems = "center";
        boton.style.left = "0";
        boton.innerHTML = '<img src="' + logo + '" style="vertical-align:middle;opacity:0.5;margin:0"> ⬇ Descargar';
    } else if (fullUrl.includes('fapello.com') && !fullUrl.includes('fapello.com/content')) {      
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
            URL: urlImg
          }
        },
        (response) => {
          console.log("Respuesta del background:", response);
        }
      );
    } else if (fullUrl.includes('fapello.com/content') || fullUrl.includes('cdni.pornpics.com')) {
      boton.style.left = "0";
      boton.style.right = "0";
      boton.style.margin = "auto";
    } else if (fullUrl.includes('loyalfans')) {
      if (mensajeTodos === 'Todos') {
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

function crearBotonFlotantePorImagen(contenedor) {
    contenedor.forEach((img, index) => {
        if (fullUrl.includes('fapello')) {
            selector = document.querySelector(`#content > div:nth-child(${index +1}) > a > div > img`)?.src;
        } else if (fullUrl.includes('twpornstars.com')) {
            selector = document.querySelector(`body > div.block.block-thumbs.js-thumbs > div:nth-child(${index + 1}) > div.thumb__inner > a`)?.href;
        } else if (fullUrl.includes('pornhub.com/gifs/')) {
            const linkssss = document.querySelectorAll(`body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li > a`);
            selector = linkssss[index]?.querySelector('video').dataset.webm;
        } else if (fullUrl.includes(`pornhub.com/model/${userId}/gifs/video`) || fullUrl.includes(`pornhub.com/pornstar/${userId}/gifs/video`)) {
          //console.log(userId);
          //console.log(index);
          const linkssss = document.querySelectorAll(`#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li > a`);
          let nummmm = linkssss[index]?.href.split('/')[4];
          const str = '0' + nummmm;
          const partes = str.match(/.{1,3}/g);
          const ellink = `https://el.phncdn.com/pics/gifs/${partes[0]}/${partes[1]}/${partes[2]}/${nummmm}a.webm`;
          selector = ellink;
         } else if (fullUrl.includes('pornhub.com/pornstar/') || fullUrl.includes('pornhub.com/model/')) {
            //console.log(index);
            //console.log(userId);
            document.querySelector("#profileContent > div > section > div > div.profileVids.gifsOutterWrapperProfile > div.gifsWrapperProfile.clearfix")
            const linkssss = document.querySelectorAll(`#profileContent > div > section > div > div.profileVids.gifsOutterWrapperProfile > div.gifsWrapperProfile.clearfix > ul > li > a`);
            let nummmm = linkssss[index]?.href.split('/')[4];
            const str = '0' + nummmm;
            const partes = str.match(/.{1,3}/g);
            const ellink = `https://el.phncdn.com/pics/gifs/${partes[0]}/${partes[1]}/${partes[2]}/${nummmm}a.webm`;
            selector = ellink;
            
        } else if (fullUrl.includes('redgifs.com/users')) {
          selector = img?.href;
        } else if (fullUrl.includes('pornpics.com/galleries')) {
          const linkssss = document.querySelectorAll(`#tiles > li`);
          selector = linkssss[index]?.querySelector('a')?.href;
        } else if (fullUrl.includes('loyalfans')) {
          const linkssss = document.querySelectorAll(`body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div`);
          selector = linkssss[index]?.querySelector('div > img')?.src;
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
        if (fullUrl.includes('pornpics.com/galleries')) {
          contenedor2.style.position = "";
        } else {
          contenedor2.style.position = "relative";
        }
        
        const boton = document.createElement("button");
        boton.id = `mi-boton-flotante-${index}`;
        boton.style.display = "inline-grid";
        boton.style.width = "100px";
        boton.textContent = "⬇ Descargar";
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
        boton.onmouseover = function() {boton.title = `Click para descargar: ${enlacesLimpios}.!`;};
        boton.dataset.url = enlacesLimpios;
        
        boton.addEventListener("click", (e) => {
            e.stopPropagation();
            const urlImagen = e.currentTarget.dataset.url;
            e.currentTarget.remove();
            if (fullUrl.includes('twpornstars.com')) {
                (async () => {
                    enlace = await ObtenemosLinkTwpornstar(urlImagen);
                    chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
                })();
            } else if (fullUrl.includes('loyalfans.com')) {
              (async () => {
                //console.log(userId);
                const urlFetch = `https://www.loyalfans.com/api/v2/social/videos/${userId}?ngsw-bypass=true`;
                enlace = await obtieneLinkLoyalFans(urlFetch, index);
                //console.log(enlace);
                chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
              })();
            } else {
                enlace = urlImagen;
                chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
                //alert(`enlace linea 124: ${enlace}`);
            }
        });
        
        if (fullUrl.includes('redgifs.com/users')) {
          const nuevoDiv = document.createElement('div');
          nuevoDiv.style.position = "relative";
          nuevoDiv.classList.add(`mi-contenedor-${index}`);
          const contenedorRedgifs = document.querySelector('.tileFeed');          
          nuevoDiv.appendChild(img);
          nuevoDiv.prepend(boton);
          contenedorRedgifs.appendChild(nuevoDiv);
        } else {
          contenedor2.appendChild(boton);
        }
        if (fullUrl.includes('pornhub.com/gif/')) {
            //boton.style.left = "0";
            boton.style.margin = "5px";
        } else if (fullUrl.includes('pornhub.com/gifs/')) {
            boton.style.top = "5px";
            boton.style.margin = "0";
            boton.style.height = "fit-content";
            boton.innerHTML = '<img src="' + logo1 + '" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto; position:relative"> 📥 Descargar';
        } else if (fullUrl.includes('pornhub.com/model/') || fullUrl.includes('pornhub.com/pornstar/')) {
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
          boton.innerHTML = '<img src="' + logo + '" style="width:80%;vertical-align:middle;opacity:0.8;margin:auto; position:relative"> 📥 Descargar';
        } else if (domain.includes('redgifs')) {
          if (fullUrl.includes('redgifs.com/users')) {
            boton.style.bottom = "";
          }
            //contenedor2.appendChild(boton);
        } else if (fullUrl.includes('twpornstars.com') && fullUrl.includes('/videos')) {
            boton.style.width = "fit-content";
            boton.style.height = "fit-content";
            boton.style.left = "5px";
            boton.style.top = "5px";
            boton.style.margin = "";
            boton.style.justifyItems = "center";
            boton.innerHTML = '<img src="' + logo + '" style="vertical-align:middle;opacity:0.5;margin:0"> 📥 Descargar';
        } else if (fullUrl.includes('twpornstars.com') && !fullUrl.includes('/videos')) {
            boton.style.left = "0";
            boton.style.top = "0";
            boton.style.justifyItems = "center";
            boton.style.justifyContent = "center";          
            boton.innerHTML = '<img src="' + logo + '" style="width:50%;vertical-align:middle;opacity:0.5;margin:0"> 📥 Descargar';
            //contenedor2.appendChild(boton);
        } else if (fullUrl.includes('fapello.com') && !fullUrl.includes('fapello.com/content')) {
            //boton.style.top = "80%";
        } else if (fullUrl.includes('fapello.com/content')) {
            //
        } else if (fullUrl.includes('pornpics.com/galleries')) {
          boton.style.opacity = "0.9";
          boton.style.background = "rgb(7 112 177)";
          boton.style.color = "#e00083";
          boton.style.fontWeight = "bold";
          boton.style.fontSize = "";
          boton.style.justifyItems = "center"
          boton.innerHTML = `<img src="${logo}" style="width:80%;vertical-align:middle;opacity:1;margin:0"> 📥 Descargar`;
        } else if (fullUrl.includes('loyalfans')) {
          boton.style.zIndex = "10";
          boton.innerHTML = `<img src="${logo1}" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto"> 📥 Descargar`;
        }
    });
    ContadorFunciones++;
    cuentaVeces('Funcion crearbotonximagen', ContadorFunciones);
  }

async function ObtenemosLinkTwpornstar (enlace){
    try {
        const respuesta = await fetch(enlace, {
        method: 'GET',
        headers: {
            'User-Agent': 'MiAgente/1.0', // algunos sitios requieren un agente válido
        }
        });
    
        if (!respuesta.ok) throw new Error('Error al cargar la página');
        const html = await respuesta.text();
    
        // Crear un DOM temporal para buscar enlaces
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
    
        // Ejemplo: buscar un enlace <video> o <source>
        const enlaceVideo = doc.querySelector('video source')?.src;
    
        console.log('Enlace encontrado:', enlaceVideo);
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
  console.log(nombre);
  console.log(urlssss);
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
              url: location.href
            });
          }, 500);

          mensaje.textContent = "Solicitud enviada ✔";
          setTimeout(() => modal.remove(), 1500);
        }
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
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc2xfdTI0X2FybXI4XzA4LmxveWFsZmFucy5pbnRlcm5hbDoxMDA4MS9hcGkvdjIvYXV0aC9sb2dpbiIsImlhdCI6MTc1ODIwNzY4NiwiZXhwIjoxNzU4Mjk0MDg2LCJuYmYiOjE3NTgyMDc2ODYsImp0aSI6IkxCRXlLcGRpd3NaWmJrYk4iLCJzdWIiOiIzNTQ5MzQ2IiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.LA1AjR2DR2gSvzA8841gg3poXgmblwpH8A0-Uuf46HE",
        "content-type": "application/json",
        "sec-ch-ua": "\"Opera\";v=\"95\", \"Chromium\";v=\"109\", \"Not;A=Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-api-version": "3.4.4",
        "x-xsrf-token": "eyJpdiI6InNwSUFydFhoNWdZYjdrSjMxODN2N1E9PSIsInZhbHVlIjoiUFZJekt3UCtoWktwKzZMOGdMbTVHUDAwRldCNmV2N25Edmc1OEcyVWlIU1JydkJ1Mzgxd2Q1WWliU2szTHhmRHlUTnducWxvc2o5MXEwU0hHNXNKNkFyVk1ScVRKRXNYeUdyZGVuNk02UTlrcFR1TUswZll1akJyaEFDRTMrTTEiLCJtYWMiOiJkY2U5N2NiYzUwNGU5NzI1NDQxYzRkNDQyZTA0NjE0OGI1NTUzMDdmMWQzYWNmOTkwNjg1YTNlZjkyODBlMDhkIiwidGFnIjoiIn0="
      },
      "referrer": `https://www.loyalfans.com/${userId}/videos`,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,//"{\"limit\":15}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const datoss = await response.json();
    const urrrll = datoss.videos[id].video_object.video_url;
    return urrrll;
    } catch(error) {
    // Capturamos errores durante la solicitud
    console.error('Error durante la solicitud:', error);
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
  const domain = Object.keys(rules).find(d => fullUrl.includes(d));
  if (!domain) return null;

  for (const rule of rules[domain]) {
    const includesMatch = rule.include?.some(part => fullUrl.includes(part));
    const excludesMatch = rule.exclude?.some(part => fullUrl.includes(part)) || false;
    if (includesMatch && !excludesMatch) {
      return rule.result;
    }
  }
  return null;
};

function GetHosts(url) {
  if (domain.includes('redgifs')) {
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
  } else if (domain.includes('pornhub')) {
    if (fullUrl.includes('/gif')) {
      const nummmm = fullUrl.split('/')[4];
      const str = '0' + nummmm;
      const partes = str.match(/.{1,3}/g);
      enlace = `https://el.phncdn.com/pics/gifs/${partes[0]}/${partes[1]}/${partes[2]}/${nummmm}a.webm`;
    }
  }
  return enlace;
};

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

function iniciarCuentaRegresiva(elemento, msTotales, mensaje, mensaje2, estado, domain, onFinish) {
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
};

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
    console.log("Iniciando cuenta regresiva con:", msg);
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
      }
    );

    sendResponse({ ok: true });
  }
});