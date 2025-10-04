// Función auxiliar para extraer nombre limpio
// const obtenerNombre = (src, opciones = {}) => {
//   let limpio = src.split("?")[0]; // quitar parámetros
//   if (opciones.remover) {
//     opciones.remover.forEach(r => limpio = limpio.replace(r, ""));
//   }
//   return limpio.substring(limpio.lastIndexOf("/") + 1);
// };

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
  //console.log(elem);
  observer.observe(document.body, { childList: true, subtree: true });
}

function crearBotonFlotante(contenedor, mensaje) {
  if (document.getElementById("mi-boton-flotante")) return;

  const boton = document.createElement("button");
  boton.id = "mi-boton-flotante";
  boton.style.display = "inline-grid";
  boton.style.width = "100px";
  boton.style.position = "absolute";
  boton.style.padding = "5px 5px";
  boton.style.background = "rgb(29, 155, 240)";
  boton.style.color = "#fff";
  boton.style.border = "none";
  boton.style.borderRadius = "8px";
  boton.style.zIndex = "9999";
  boton.style.cursor = "pointer";
  boton.style.left = "0";
  boton.style.right = "0";
  boton.style.top = "5px";
  boton.style.margin = "auto";
  boton.style.justifyItems = "center";
  boton.innerHTML = '<img src="' + logo + '" style="width:20%;vertical-align:middle;opacity:0.8;margin:0">';
  boton.style.opacity = "0.8";
  boton.onmouseover = function() {boton.title = `${mensaje}`;};
  const texto = document.createElement("span");
  texto.innerHTML = "📥 Descargar";
  texto.id = "texto_id";
  texto.style.textAlign = "center";
  texto.style.fontSize = "12px";

  boton.onclick = () => {
    //abrir_xdownloader
    chrome.runtime.sendMessage({ action: "inject_main_script-twitter", url: window.location.href });
    boton.remove();
  };
  boton.appendChild(texto);

  contenedor.appendChild(boton);
}

// setTimeout(() => {
//   const url = window.location.toString();
//   const nombreTemporal = obtenerNombre(url);
//   const nombre = nombreTemporal.split("#")[0];
//   let mensaje;

//   if (fullUrl.includes('x.com/post')) {
//       //selector = "body > app-root > div > div.site-wrapper.nav-bar-visible.nav-bar-mobile-visible.nav-bar-top-mobile-hidden > div > app-post-route > div.page-content > div > div > app-post > div > div.feed-item-preview.single-preview";
//       //mensaje = `Click para descargar: ${urlObj}.!`;
//   } else if (fullUrl.includes('x.com/home')) {
//     return;
//   } else if (fullUrl.includes('status')) {
//     //console.log(fullUrl);
//       selector = "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article";
//       mensaje = `Click para descargar: ${urlObj}.!`;
//   }
//     esperarElemento( selector,
//       (contenedor) => {
//         crearBotonFlotante(contenedor, mensaje);
//       }
//     );
// }, 5000); // espera 5 segundos

// Seleccionamos solo el media del visor maximizado
// const OVERLAY_SELECTORS = 'div[role="dialog"] video, div[role="dialog"] img';

// function getUniqueSelector(el) {
//   if (!el) return '';
//   if (el.id) return `#${CSS.escape(el.id)}`;
//   const path = [];
//   let node = el;
//   while (node && node.nodeType === 1 && node.tagName.toLowerCase() !== 'html') {
//     let sel = node.tagName.toLowerCase();
//     if (node.classList.length) {
//       sel += '.' + Array.from(node.classList).map(c => CSS.escape(c)).join('.');
//     }
//     const parent = node.parentNode;
//     if (parent) {
//       const siblings = parent.querySelectorAll(sel);
//       if (siblings.length > 1) {
//         const idx = Array.from(parent.children).indexOf(node) + 1;
//         sel = `${node.tagName.toLowerCase()}:nth-child(${idx})`;
//       }
//     }
//     path.unshift(sel);
//     node = node.parentNode;
//   }
//   return path.join(' > ');
// }

let observer = null;

function iniciarExtension() {
  console.log("🚀 Iniciando extensión en", location.hostname);

  setTimeout(() => {
    const url = window.location.toString();
    const nombreTemporal = obtenerNombre(url);
    const nombre = nombreTemporal.split("#")[0];
    let mensaje;
  
    if (fullUrl.includes('x.com/post')) {
        //selector = "body > app-root > div > div.site-wrapper.nav-bar-visible.nav-bar-mobile-visible.nav-bar-top-mobile-hidden > div > app-post-route > div.page-content > div > div > app-post > div > div.feed-item-preview.single-preview";
        //mensaje = `Click para descargar: ${urlObj}.!`;
    } else if (fullUrl.includes('x.com/home')) {
      return;
    } else if (fullUrl.includes('status')) {
      //console.log(fullUrl);
        selector = "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article";
        mensaje = `Click para descargar: ${urlObj}.!`;
    }
      esperarElemento( selector,
        (contenedor) => {
          crearBotonFlotante(contenedor, mensaje);
        }
      );
  }, 3000); // espera 5 segundos

  // --- Observador para detectar media maximizado ---
  const OVERLAY_SELECTORS = 'div[role="dialog"] video, div[role="dialog"] img';

  observer = new MutationObserver(() => {
    const media = document.querySelector(OVERLAY_SELECTORS);
    if (media && !media.__seen) {
      media.__seen = true;

      // 🔹 Padre directo
      const padre = media.parentElement?.parentElement;

      // 🔹 Construir mensaje
      const u = window.location.href;
      const parts = u.split("/");
      let without = null;
      if (parts.includes('video')) {
        without = parts.slice(0, parts.indexOf("video")).join("/");  
      } else if (parts.includes('photo')) {
        without = parts.slice(0, parts.indexOf("photo")).join("/");  
      }
      const baseUrl = without;
      const mensaje = `Click para descargar: ${baseUrl}.!`;

      // 🔹 Contenedor donde meter el botón
      const contenedor = document.querySelector(
        "#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-17gur6a.r-1pi2tsx.r-13qz1uu > div > div.css-175oi2r.r-16y2uox.r-1wbh5a2 > div.css-175oi2r.r-1pi2tsx.r-11yh6sk.r-buy8e9.r-13qz1uu > div.css-175oi2r.r-13awgt0.r-184en5c > div > div > div"
      );

      if (contenedor) {
        crearBotonFlotante(contenedor, mensaje);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log("👀 Observando aparición de media maximizado...");
}

// 🔹 Desactivar extensión
function desactivarExtension() {
  document.querySelectorAll("#mi-boton-flotante").forEach(b => b.remove());
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

// Observar cuando aparece el visor de imagen/video
// const observer = new MutationObserver(() => {
//   const media = document.querySelector(OVERLAY_SELECTORS);
//   if (media && !media.__seen) {
//     media.__seen = true;

//     // 🔹 Padre directo
//     const padre = media.parentElement?.parentElement;

//     // 🔹 O un ancestro más arriba (ejemplo: todo el bloque del visor)
//     //const contenedor = media.closest('div[role="dialog"]');

//     //const selectorPadre = getUniqueSelector(padre);
//     //const selectorContenedor = getUniqueSelector(contenedor);

//     //const abuelo = getAncestor(media, 2);
//     const abuelo = media.parentElement?.parentElement;
//     const u = window.location.href;
//     const parts = u.split("/");
//     let without = null;
//     if (parts.includes('video')) {
//       without = parts.slice(0, parts.indexOf("video")).join("/");  
//     } else if (parts.includes('photo')){
//       without = parts.slice(0, parts.indexOf("photo")).join("/");  
//     }
//     const baseUrl = without;
//     mensaje = `Click para descargar: ${baseUrl}.!`;
//     //const lolo = document.querySelector(selectorPadre);
//     const lolo = document.querySelector("#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-17gur6a.r-1pi2tsx.r-13qz1uu > div > div.css-175oi2r.r-16y2uox.r-1wbh5a2 > div.css-175oi2r.r-1pi2tsx.r-11yh6sk.r-buy8e9.r-13qz1uu > div.css-175oi2r.r-13awgt0.r-184en5c > div > div > div");
//     crearBotonFlotante(lolo, mensaje);

//     // ejemplo: copiar selector al portapapeles
//     //navigator.clipboard.writeText(abuelo).then(() => {
//       //console.log("✅ Selector copiado al portapapeles");
//     //});
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

//console.log("🔍 Observando aparición de media maximizado...");

// function getAncestor(el, niveles = 1) {
//   let nodo = el;
//   for (let i = 0; i < niveles; i++) {
//     if (!nodo) return null;
//     nodo = nodo.parentElement;
//   }
//   return nodo;
// }

// --- Al cargar la página ---
  // Revisar si el dominio está deshabilitado ANTES de arrancar
  (async () => {
    const activo = await window.verificarEstadoExtension();
  
    if (activo) {
      console.log("✅ Extensión activa");
      iniciarExtension(); // tu lógica normal
    } else {
      console.log("⛔ Extensión desactivada, no hago nada");
    }
  })();