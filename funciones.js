// Sobrescribimos console.log para guardar también en storage
(function() {
    const originalLog = console.log;
    console.log = function(...args) {
      // Mostramos en la consola como siempre
      originalLog.apply(console, args);
  
      // Guardamos en storage
      let logs = JSON.parse(localStorage.getItem("misLogs") || "[]");
      logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : a.toString()).join(" "));
      localStorage.setItem("misLogs", JSON.stringify(logs));
    };
  })();

const obtenerNombre = (src, opciones = {}) => {
    limpio = src.split("?")[0]; // quitar parámetros
    if (opciones.remover) {
      opciones.remover.forEach(r => limpio = limpio.replace(r, ""));
    }
    return limpio.substring(limpio.lastIndexOf("/") + 1);
  };

function crearBotonFlotante(contenedor, urlImg) {
    if (document.getElementById("mi-boton-flotante")) return;

    const boton = document.createElement("button");
    boton.id = "mi-boton-flotante";
    boton.style.display = "inline-grid";
    boton.style.width = "100px";
    boton.textContent = "⬇ Descargar";
    boton.style.position = "absolute";    
    boton.style.padding = "5px 5px";
    boton.style.background = "#1DA1F2";
    boton.style.color = "#fff";
    boton.style.border = "none";
    boton.style.borderRadius = "8px";
    boton.style.zIndex = "9999";
    boton.style.cursor = "pointer";    
    boton.innerHTML = '<img src="' + logo + '" style="width:100%;vertical-align:middle;opacity:0.5;margin:0"> ⬇ Descargar';
    //boton.onmouseover = function() {boton.title = `Click para descargar: ${urlObj}.!`;};
    boton.onmouseover = function() {boton.title = `Click para descargar: ${urlImg}.!`;};
  
    boton.onclick = () => {
        //alert(`ando linea 30: ${urlImg}`);
      chrome.runtime.sendMessage({ action: "inject_main_script", url: "" });
      boton.remove();
    };    
    contenedor.appendChild(boton);
    if (domain.includes('pornhub')) {
        boton.style.left = "0";
        contenedor.appendChild(boton);        
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
    } else if (fullUrl.includes('fapello.com/content')) {
      boton.style.left = "0";
      boton.style.right = "0";
      boton.style.margin = "auto";
    }
  }

function crearBotonFlotantePorImagen(contenedor) {
    contenedor.forEach((img, index) => {
        if (fullUrl.includes('fapello')) {
            selector = document.querySelector(`#content > div:nth-child(${index +1}) > a > div > img`)?.src;
        } else if (fullUrl.includes('twpornstars.com')) {
            selector = document.querySelector(`body > div.block.block-thumbs.js-thumbs > div:nth-child(${index + 1}) > div.thumb__inner > a`)?.href;
        } else if (fullUrl.includes('pornhub.com/gifs/')) {
            selector = img.href;
            //const linkssss = img.querySelector("video");
            //selector = img.querySelector("video").dataset.webm;
            console.log(selector);
        }
        // Evita inyectar varias veces en la misma imagen
        if (img.parentElement.querySelector(".mi-boton-flotante")) return;
        if (img.dataset.botonCreado) return;
        img.dataset.botonCreado = "true";
        const nodos = selector;
        const contenedor2 = img;      
        contenedor2.style.position = "relative";
        
        const boton = document.createElement("button");      
        boton.id = `mi-boton-flotante-${index}`;
        boton.style.display = "inline-grid";
        boton.style.width = "100px";
        boton.textContent = "⬇ Descargar";
        boton.style.position = "absolute";    
        boton.style.padding = "2px";
        boton.style.background = "#1DA1F2";
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
        boton.innerHTML = '<img src="' + logo + '" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto"> ⬇ Descargar';      
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
            //} else if (fullUrl.includes('pornhub.com/gifs/')) {
                //enlace = img.querySelector("video").dataset.webm;
                //enlace = urlImagen;
                //alert(`enlace linea 118: ${enlace}`);
                //chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
            } else {
                enlace = urlImagen;
                chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
                //alert(`enlace linea 124: ${enlace}`);
            }
        });
        
        contenedor2.appendChild(boton);      
        if (fullUrl.includes('pornhub.com/gif/')) {
            boton.style.left = "0";
        } else if (fullUrl.includes('pornhub.com/gifs/')) {
            boton.style.top = "5px";
            boton.style.margin = "0";
            boton.style.height = "fit-content";
            boton.innerHTML = '<img src="' + logo + '" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto; position:relative"> ⬇ Descargar';
        } else if (domain.includes('redgifs')) {
            contenedor2.appendChild(boton);
        } else if (fullUrl.includes('twpornstars.com') && fullUrl.includes('/videos')) {
            boton.style.width = "fit-content";
            boton.style.height = "fit-content";
            boton.style.left = "5px";
            boton.style.top = "5px";
            boton.style.margin = "";
            boton.style.justifyItems = "center";
            boton.innerHTML = '<img src="' + logo + '" style="vertical-align:middle;opacity:0.5;margin:0"> ⬇ Descargar';
        } else if (fullUrl.includes('twpornstars.com') && !fullUrl.includes('/videos')) {
            boton.style.left = "0";
            boton.style.top = "0";
            boton.style.justifyItems = "center";
            boton.style.justifyContent = "center";          
            boton.innerHTML = '<img src="' + logo + '" style="width:50%;vertical-align:middle;opacity:0.5;margin:0"> ⬇ Descargar';
            contenedor2.appendChild(boton);
        } else if (fullUrl.includes('fapello.com') && !fullUrl.includes('fapello.com/content')) {
            //boton.style.top = "80%";
        } else if (fullUrl.includes('fapello.com/content')) {
            //
        }
    });
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

const descargarArchivoSimple = (url, nombre) => {
    console.log('linea 202 descargarArchivosimple');
    let segundos = 5;
  
    const modal = document.createElement("div");
    modal.style = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: white; padding: 20px;
      border: 2px solid black; border-radius: 10px;
      font-size: 18px; text-align: center;
      color: black; z-index: 9999;
    `;
  
    const mensaje = document.createElement("p");
    mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
    modal.appendChild(mensaje);
    document.body.appendChild(modal);
  
    const intervalo = setInterval(() => {
      segundos--;
      if (segundos > 0) {
        mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
      } else {
        clearInterval(intervalo);
        // Crear enlace y descargar
        const link = document.createElement("a");
        link.href = url;
        link.download = nombre;
        document.body.appendChild(link);
        link.click();
        link.remove();
  
        mensaje.textContent = "Descarga iniciada...";
        setTimeout(() => modal.remove(), 2000);
      }
    }, 1000);
  };
  