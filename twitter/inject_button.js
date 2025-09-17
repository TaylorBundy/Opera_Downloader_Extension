// Función auxiliar para extraer nombre limpio
const obtenerNombre = (src, opciones = {}) => {
  let limpio = src.split("?")[0]; // quitar parámetros
  if (opciones.remover) {
    opciones.remover.forEach(r => limpio = limpio.replace(r, ""));
  }
  return limpio.substring(limpio.lastIndexOf("/") + 1);
};

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
  boton.style.margin = "auto";
  boton.style.justifyItems = "center";
  boton.innerHTML = '<img src="' + logo + '" style="width:20%;vertical-align:middle;opacity:0.8;margin:0">';
  boton.onmouseover = function() {boton.title = `${mensaje}`;};
  const texto = document.createElement("span");
  texto.innerHTML = "⬇ Descargar";
  texto.id = "texto_id";
  texto.style.textAlign = "center";
  texto.style.fontSize = "12px";

  boton.onclick = () => {
    //abrir_xdownloader
    chrome.runtime.sendMessage({ action: "inject_main_script-twitter", url: window.location.href });
  };
  boton.appendChild(texto);

  contenedor.appendChild(boton);
}

setTimeout(() => {
  const url = window.location.toString();
  const nombreTemporal = obtenerNombre(url);
  const nombre = nombreTemporal.split("#")[0];
  let mensaje;

  if (fullUrl.includes('x.com/post')) {
      //selector = "body > app-root > div > div.site-wrapper.nav-bar-visible.nav-bar-mobile-visible.nav-bar-top-mobile-hidden > div > app-post-route > div.page-content > div > div > app-post > div > div.feed-item-preview.single-preview";
      //mensaje = `Click para descargar: ${urlObj}.!`;
  } else if (fullUrl.includes('status')) {
      selector = "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article";
      mensaje = `Click para descargar: ${urlObj}.!`;
  }
    esperarElemento( selector,
      (contenedor) => {
        crearBotonFlotante(contenedor, mensaje);
      }
    );
}, 5000); // espera 5 segundos

