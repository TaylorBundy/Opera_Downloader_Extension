const urlObj = new URL (window.location.toString());
const domain = urlObj.hostname;
const fullUrl = urlObj.href;
let ContadorFunciones = 0;
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
let nuevoValor = null;
let intentos = null;
let intentos1 = null;
let Directorio = null;
let carpeta = null;
let userId;
let idFoto;
let host;
let estilo;
let totalBotones;
let botonIndividual;
let idBoto;
let idUrl;
let salteados = null;
let mensajeTodos;
let mensajeUno;
const img = new Image();
var data2 = new Date();
data2.setTime(data2.getTime() + 365 * 24 * 60 * 60 * 1000);
var expira = data2.toUTCString();
let nombre_cookie = '';
let valorCookie = '';
let idpostt;
let observerActivo = false;
//let muestra = false;
let cargarMasBtn;
let todos;
let todos1;
let todos2;
let nombre = null;
let segundos = null;
let mensaje = null;
let mensaje2 = null;
let extension = null;
let TiempoCuentaRegresiva = null;
let retraso = null;
let demoraBtn = null;
let estado = null;
let COOKIE_NAME = null;
let COOKIE_URL = null;
//console.log(estado);

const DOMAINS = [
  "redgifs.com",
  "pornhub.com",
  "twpornstars.com",
  "manyvids.com",
  "fapello.com",
  "fansly.com",
  "x.com",
  "pornpics.com",
  "loyalfans.com"
];

// // Reglas dinámicas para cada dominio
// const DOMAIN_RULES = {
//   "pornhub.com": [
//     { include: ["/gifs", "/gif"], result: true },
//     { include: ["pornhub.com", "channels"], exclude: ["gifs", "gif"], result: false }
//   ],
//   "x.com": [
//     { include: ["/status", "/gif"], result: true },
//     { include: ["x.com", "home"], exclude: ["status", "gif"], result: false }
//   ],
//   "fapello.com": [
//     { include: [`/`], result: true },
//     //{ include: [`/${idFoto}`], result: true },
//     { include: ["fapello.com"], exclude: [`/${idFoto}`], result: false }
//   ],
//   "redgifs.com": [
//     { include: ["/watch"], result: true },
//     { include: ["redgifs.com", "channels", `/users/${userId}`], exclude: ["/watch"], result: false }
//   ]
// };


if (domain.includes('pornhub')) {
    //logo = document.querySelector("#headerContainer > div:nth-child(1) > div > div > a > img").src;
    logo = "https://ei.phncdn.com/pics/logos/10211.png?cache=2025091603";
    logo1 = "https://ei.phncdn.com/www-static/images/pornhub_logo_straight.svg?cache=2025092305";
    userId = fullUrl.split('/')[4];
    cargarMasBtn = document.querySelector('#moreDataBtn');
    //todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
    todos = "#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li";
    todos1 = document.querySelectorAll("#profileContent > div > section > div > div.profileVids.gifsOutterWrapperProfile > div.gifsWrapperProfile.clearfix > ul > li");
    todos2 = document.querySelectorAll("body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li");
} else if (domain.includes('redgifs')) {
    //logo = document.querySelector("#root > div > div.topNav > a > img").src;
    logo = "https://www.redgifs.com/static/logo-full-red-C9X7m0yF.svg";
    //todos = document.querySelectorAll("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > a");
    todos = "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > a";
    host = fullUrl;
} else if (domain.includes('manyvids')) {
  logo = "https://logos.manyvids.com/icon_public/favicon-32x32.png?v=4";
} else if (domain.includes('twpornstars')) {
    logo = "https://www.twpornstars.com/favicon.ico";
    todos = document.querySelectorAll("body > div.block.block-thumbs.js-thumbs > div.thumb > div.thumb__inner");
} else if (domain.includes('fapello')) {
  logo = "https://fapello.com/assets/images/logo.png";
  todos = document.querySelectorAll("#content > div");
  const local = new URL(fullUrl);
  const partido = local.pathname.split("/");
  if (partido.length >= 3) {
    userId = fullUrl.split("/")[3];
  } else {
    userId = null;
  }
  if (partido.length === 4) {
    idFoto = fullUrl.split("/")[4];
  } else {
    idFoto = null;
  }
  // userId = fullUrl.split("/")[3];
  // const local = new URL(fullUrl);
  // const partido = local.pathname.split("/");
  // console.log(partido.length);
  // if (partido.length === 4) {
  //   idFoto = fullUrl.split("/")[4];
  // } else {
  //   idFoto = null;
  // }
  // console.log(idFoto);
  // console.log(userId);
} else if (domain.includes('fansly')) {
  logo = "https://fansly.com/assets/images/fansly_dark_v3.webp";
  logo1 = "https://fansly.com/assets/images/fansly_light_v3.webp";
  idpostt = "https://fansly.com/post/";
} else if (domain.includes('x.com')) {
  logo = "https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png";
} else if (domain.includes('pornpics')) {
  logo = "https://static.pornpics.com/style/img/logo.svg";
  todos = document.querySelectorAll("#tiles > li");
} else if (domain.includes('loyalfans')) {
  logo = "https://cdn-static.loyalfans.com/assets/images/loyalfans-light.svg";
  logo1 = "https://cdn-static.loyalfans.com/assets/images/loyalfans.svg";
} else if (domain.includes('youtube')) {
  logo = "https://www.youtube.com/s/desktop/c90d512c/img/favicon_32x32.png";
  logo1 = "https://www.gstatic.com/youtube/img/branding/favicon/favicon_192x192_v2.png";
}