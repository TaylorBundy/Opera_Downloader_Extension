// Función auxiliar para extraer nombre limpio
// const obtenerNombre = (src, opciones = {}) => {
//     let limpio = src.split("?")[0]; // quitar parámetros
//     if (opciones.remover) {
//       opciones.remover.forEach(r => limpio = limpio.replace(r, ""));
//     }
//     return limpio.substring(limpio.lastIndexOf("/") + 1);
//   };

function esperarElemento(selector, callback) {
    const elem = document.querySelector(selector);
    if (elem) return callback(elem);
  
    const observer = new MutationObserver(() => {
      const elem = document.querySelector(selector);
      if (elem) {
        observer.disconnect();
        callback(elem);
      }
    });
    console.log(elem);
  
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // let logo;
  // let selector;
  //   if (domain.includes('fansly')) {
  //       logo = "https://fansly.com/assets/images/fansly_dark_v3.webp";
  //   } else if (domain.includes('redgifs')) {
  //       logo = document.querySelector("#root > div > div.topNav > a > img").src;
  //   } else if (domain.includes('twpornstars')) {
  //       logo = "https://www.twpornstars.com/favicon.ico";
  //   }

  function crearBotonFlotante(contenedor, mensaje) {
    if (document.getElementById("mi-boton-flotante")) return;
  
    const boton = document.createElement("button");
    boton.id = "mi-boton-flotante";
    boton.style.display = "inline-grid";
    boton.style.width = "100px";
    boton.style.position = "absolute";    
    boton.style.padding = "5px 5px";
    boton.style.background = "rgb(29 242 65)";
    boton.style.color = "#fff";
    boton.style.border = "none";
    boton.style.borderRadius = "8px";
    boton.style.zIndex = "9999";
    boton.style.cursor = "pointer";
    boton.style.top = "0";    
    boton.innerHTML = '<img src="' + logo + '" style="width:100%;vertical-align:middle;opacity:0.8;margin:0">';
    boton.onmouseover = function() {boton.title = `${mensaje}`;};
    const texto = document.createElement("span");
    texto.innerHTML = "⬇ Descargar";
    texto.id = "texto_id";
    texto.style.textAlign = "center";
  
    boton.onclick = () => {
      chrome.runtime.sendMessage({ action: "inject_main_script-fansly" });
      console.log('linea 65 fansly');
    };
    boton.appendChild(texto);    
  
    contenedor.appendChild(boton);
    if (fullUrl.includes('/media')) {
        boton.style.position = "fixed";
        boton.style.width =  "150px"
        boton.style.height =  "50px"
        boton.style.top = "0";
        boton.style.bottom = "0";
        boton.style.left = "0";
        //boton.style.right = "0";
        boton.style.margin = "auto";
        boton.style.alignItems = "center";
        boton.style.justifyItems = "center";        
        boton.innerHTML = `
          <img src="${logo}" style="width:50%;vertical-align:middle;opacity:0.7;margin:0">
          <span id="texto_id" style="display:block;text-align:center;color: var(--blue-1);">\u{1F4CB} Listar Videos</span>
        `;
        contenedor.appendChild(boton);
    }
  }

  setTimeout(() => {
    const url = window.location.toString();
    const nombreTemporal = obtenerNombre(url);
    const nombre = nombreTemporal.split("#")[0];
    let mensaje;
    
    if (fullUrl.includes('fansly.com/post')) {        
        selector = "body > app-root > div > div.site-wrapper.nav-bar-visible.nav-bar-mobile-visible.nav-bar-top-mobile-hidden > div > app-post-route > div.page-content > div > div > app-post > div > div.feed-item-preview.single-preview";
        mensaje = `Click para descargar: ${urlObj}.!`;
    } else if (fullUrl.includes('media')) {
        //selector = "body > app-root > div > div.site-wrapper.nav-bar-visible.nav-bar-mobile-visible.nav-bar-top-visible.scrolling-down > div > app-profile-route > div > div > div > div.tab-nav-wrapper > div.flex-row.width-100.margin-top-1.margin-bottom-1 > div > div.blue-1-hover-only.dark-blue-1.pointer.margin-right-2.flex-row > div.flex-1.margin-left-2.semi-bold"
        selector = "body > app-root > div > div.site-wrapper.nav-bar-visible.nav-bar-mobile-visible.nav-bar-top-visible.scrolling-down > div > app-profile-route > div > div > div > div.tab-nav-wrapper > div.flex-row.width-100.margin-top-1.margin-bottom-1 > div";
        mensaje = `Click listar todos los videos.!`;
    }
    //const contenedor = document.querySelector(
        //"#root > div > div.Wrapper > div > div.skyWrapper > div.middle > div > div > div"
        //`#gif_${nombre}`
        //selector
    //);
    //if (contenedor) {
      esperarElemento( selector,
        (contenedor) => {
          crearBotonFlotante(contenedor, mensaje);
        }
      );
    //}
    // if (contenedor) {
    //   crearBotonFlotante(contenedor);
    // } else {
    //   console.warn("No se encontró el contenedor todavía.");
    // }
  }, 5000); // espera 5 segundos
//}
  
 