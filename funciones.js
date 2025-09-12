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
            //selector = `#content > div:nth-child(${index +1}) > a > div > img`;
            selector = document.querySelector(`#content > div:nth-child(${index +1}) > a > div > img`)?.src;
            //const nodos = document.querySelector(selector).src;
        } else if (fullUrl.includes('twpornstars.com')) {
            //selector = `body > div.block.block-thumbs.js-thumbs > div:nth-child(${index + 1}) > div.thumb__inner > a`;
            selector = document.querySelector(`body > div.block.block-thumbs.js-thumbs > div:nth-child(${index + 1}) > div.thumb__inner > a`)?.href;
            //(async () => {
            //enlace = ObtenemosLinkTwpornstar(selector);
                    // .then((enlace2) => {
                    // console.log('URL obtenida:', enlace2);
                    // enlace = enlace2;
                    // })
                    // .catch((error) => {
                    // console.error('Hubo un error:', error);
                    // });
                //})();
            //const nodos = document.querySelector(selector).href;
        } else if (fullUrl.includes('pornhub.com/gifs/')) {
            //console.log(img);
            //selector = document.querySelector(`body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li:nth-child(${index}) > a`)?.href;
            //console.log(index);
            selector = img.href;
            
            //index +=2;
        }
        //console.log(selector);
        // Evita inyectar varias veces en la misma imagen
        if (img.parentElement.querySelector(".mi-boton-flotante")) return;
        if (img.dataset.botonCreado) return;
        img.dataset.botonCreado = "true";
        const nodos = selector;
        //console.log(nodos);
        const contenedor2 = img;      
        contenedor2.style.position = "relative";
        
        const boton = document.createElement("button");      
        //boton.id = `mi-boton-flotante`;
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
        //enlaces = nodos?.src;
        enlaces = nodos;
        limpio = enlaces?.replace(/_300px(?=\.[a-z]+$)/i, "");
        const enlacesLimpios = limpio;
        boton.innerHTML = '<img src="' + logo + '" style="width:80%;vertical-align:middle;opacity:0.5;margin:auto"> ⬇ Descargar';      
        boton.onmouseover = function() {boton.title = `Click para descargar: ${enlacesLimpios}.!`;};
        boton.dataset.url = enlacesLimpios;
        
        
        //   boton.onclick = () => {        
        //     chrome.runtime.sendMessage({ action: "inject_main_script", url: enlaces });
        //   };
        
        boton.addEventListener("click", (e) => {
            // `e.currentTarget` es el botón que se hizo clic
            //console.log(e.currentTarget.id);
            //const botonpre = document.getElementById(`${e.currentTarget.id}`);
            //console.log(e.currentTarget.dataset.url);
            //console.log(botonpre);
            //botonpre.remove();
            e.stopPropagation();
            const urlImagen = e.currentTarget.dataset.url;
            e.currentTarget.remove();
            if (fullUrl.includes('twpornstars.com')) {
                (async () => {
                    enlace = await ObtenemosLinkTwpornstar(urlImagen);
                    chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
                    // .then((enlace2) => {
                    // console.log('URL obtenida:', enlace2);
                    // enlace = enlace2;
                    // })
                    // .catch((error) => {
                    // console.error('Hubo un error:', error);
                    // });
                })();
                //enlace = ObtenemosLinkTwpornstar(urlImagen);
                // enlace = ObtenemosLinkTwpornstar(urlImagen)
                //     .then((enlace2) => {
                //     console.log('URL obtenida:', enlace2);
                //     enlace = enlace2;
                //     })
                //     .catch((error) => {
                //     console.error('Hubo un error:', error);
                //     });
                // console.log(enlace);
                // return
            } else {
                enlace = urlImagen;
                chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
            }
            //console.log(enlace);
            
            //chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
            
            //chrome.runtime.sendMessage({ action: "inject_main_script", url: urlImagen });
            //const urlImagen = e.currentTarget.dataset.url;
            //console.log("Descargando URL:", urlImagen);
        });
        
        contenedor2.appendChild(boton);      
        if (fullUrl.includes('pornhub.com/gif/')) {
            boton.style.left = "0";
            //contenedor2.appendChild(boton);
        } else if (fullUrl.includes('pornhub.com/gifs/')) {
            //boton.style.marginLeft = "auto";
            //boton.style.marginRight = "auto";
            //boton.style.left = "0px";
            //boton.style.right = "0px";
            boton.style.top = "5px";
            boton.style.margin = "0";
            boton.style.height = "fit-content";
            //boton.style.margin = "";
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
            //contenedor2.style.position = "";
        } else if (fullUrl.includes('twpornstars.com') && !fullUrl.includes('/videos')) {
        //} else if (domain.includes('twpornstars')) {
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