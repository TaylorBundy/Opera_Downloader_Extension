const urlObj = new URL (window.location.toString());
const domain = urlObj.hostname;
const fullUrl = urlObj.href;
let logo;
let logo1;
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
let totalVideos = null;
let intentos = null;
let Directorio = null;
let carpeta = null;
let userId;
let host;
let estilo;
let totalBotones;
const img = new Image();
var data2 = new Date();
data2.setTime(data2.getTime() + 365 * 24 * 60 * 60 * 1000);
var expira = data2.toUTCString();
let nombre_cookie = '';
let valorCookie = '';
let idpostt;

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
} else if (domain.includes('fansly')) {
  logo = "https://fansly.com/assets/images/fansly_dark_v3.webp";
  logo1 = "https://fansly.com/assets/images/fansly_light_v3.webp";
  idpostt = "https://fansly.com/post/";
} else if (domain.includes('x.com')) {
  logo = "https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png";
} else if (domain.includes('pornpics')) {
  logo = "https://static.pornpics.com/style/img/logo.svg";
}