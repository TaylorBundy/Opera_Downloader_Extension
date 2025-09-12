const urlObj = new URL (window.location.toString());
const domain = urlObj.hostname;
const fullUrl = urlObj.href;
let logo;
let selector;
let tiempo = null;
let elTiempo = null;
let resolverTiempo;
let tiempoListo = new Promise(resolve => resolverTiempo = resolve);
let urlRecibida = null;
let nombreRecibido = null;
let enlace;
let limpio;
let enlaces;
let cantidadInicial = null;
let totalImagenes = null;
const img = new Image();

if (domain.includes('pornhub')) {
    logo = document.querySelector("#headerContainer > div:nth-child(1) > div > div > a > img").src;    
} else if (domain.includes('redgifs')) {
    logo = document.querySelector("#root > div > div.topNav > a > img").src;    
} else if (domain.includes('manyvids')) {
  logo = "https://logos.manyvids.com/icon_public/favicon-32x32.png?v=4";
} else if (domain.includes('twpornstars')) {
    logo = "https://www.twpornstars.com/favicon.ico";    
} else if (domain.includes('fapello')) {
  logo = "https://fapello.com/assets/images/logo.png";
}