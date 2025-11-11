// Al inicio de popup.js

// --- Al cargar la página ---
  // Revisar si el dominio está deshabilitado ANTES de arrancar
  // chrome.storage.local.get({ disabledDomains: [] }, ({ disabledDomains }) => {
  //   const domain = location.hostname;
  
  //   if (disabledDomains.includes(domain)) {
  //     console.log("🚫 Extensión desactivada en", domain);
  //     estado = false;
  //     return; // no iniciar nada
  //   } else {
  //     console.log("✅ Extensión activa en", domain);
  //     estado = true;
  //   }
  
  //   console.log("✅ Extensión activa en", domain);
  //   //iniciarExtension();
  // });

  
  

  function obtenerEstadoExtension(url, name, callback) {
    chrome.cookies.get({ url: url, name: name }, (cookie) => {
      if (!cookie) {
        callback(true); // por defecto activo
        return;
      }
      try {
        const datos = JSON.parse(cookie.value);
        callback(datos.activo);
      } catch (e) {
        console.error("Error parseando cookie:", e);
        callback(true);
      }
    });
  }

  // // Leer estado y reflejar en toggle
  // const COOKIE_NAME2 = "estado_extension_" + domain;
  // chrome.cookies.get({ url: fullUrl, name: COOKIE_NAME2 }, (cookie) => {
  //   if (!cookie) {
  //     callback(true); // por defecto activo
  //     return;
  //   }
  //   try {
  //     const datos = JSON.parse(cookie.value);
  //     console.log(datos.activo);
  //     callback(datos.activo);
  //   } catch (e) {
  //     console.error("Error parseando cookie:", e);
  //     callback(true);
  //   }
  // });

// if (domain.includes('pornhub.com')) {
//   if (fullUrl.includes('/gifs/') || fullUrl.includes('/gif')) {
//     muestra = true;
//   } else if (fullUrl.includes('pornstar') || fullUrl.includes('channels')
//   && !fullUrl.includes('gifs') && !fullUrl.includes('gif')){
//     muestra = false;
//   }
// } else if (domain.includes('redgifs.com')) {
//   if (fullUrl.includes('/users') || fullUrl.includes('/watch')) {
//     muestra = true;
//   } else if (fullUrl.includes('redgifs.com') || fullUrl.includes('channels')
//   && !fullUrl.includes('/users') && !fullUrl.includes('/watch')){
//     muestra = false;
//   }
// }

// function siCumple() {
//   const isMatch = DOMAINS.some(site => url.includes(site));

// }

// function checkUrl(fullUrl) {
//   const domain = Object.keys(DOMAIN_RULES).find(d => fullUrl.includes(d));
//   if (!domain) return null; // No hay reglas para este dominio

//   for (const rule of DOMAIN_RULES[domain]) {
//     // Condición de "incluye"
//     const includesMatch = rule.include?.some(part => fullUrl.includes(part));

//     // Condición de "excluye" (si existe)
//     const excludesMatch = rule.exclude?.some(part => fullUrl.includes(part)) || false;

//     if (includesMatch && !excludesMatch) {
//       return rule.result;
//     }
//   }

//   return null; // No coincide con ninguna regla
// }
let userId1;
let idFoto1;
let estadoGene = true;

const getToken = async () => {
  const res = await fetch("https://api.redgifs.com/v2/auth/temporary");
  const data = await res.json();
  return data.token;
};
// Funcion para redgifs
const obtieneredgifs = async (src) => {
  try {
    const token = await getToken();
    const response = await fetch(src, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
        //"authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1OjMzOjc0OjdkOjViOjc4Ojc2OmY0OmU3OjVmOjM4OjQ2OjE1OjRkOmE4OjBmIiwidHlwIjoiSldUIn0.eyJhdF9oYXNoIjoiQzNMSkdPYkc3RG5MQnVxSEJBWkMzQSIsImF1ZCI6WyJlMDZjMzRkYWM3NjU0ODIxYmNiMzdlMDM5M2I1NDM1MCJdLCJhdXRoX3RpbWUiOjE3NTM4NTQzNTYsImF6cCI6ImUwNmMzNGRhYzc2NTQ4MjFiY2IzN2UwMzkzYjU0MzUwIiwiZW1haWwiOiJtYXJ0b25iYXJib3NhQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJleHAiOjE3NTU3NTM0NzksImZhbWlseV9uYW1lIjoiIiwiZ2l2ZW5fbmFtZSI6IiIsImlhdCI6MTc1NTc0OTg3OSwiaXNzIjoiaHR0cHM6Ly9hdXRoMi5yZWRnaWZzLmNvbSIsImp0aSI6ImVhY2VmYmE2LTUxNzUtNDhmZi1iMjdmLTZjZDU3Yjc2Yjg1OCIsIm5hbWUiOiIiLCJvcmdfY29kZXMiOlsib3JnXzJmZGZmYjExMzEyIl0sInByZWZlcnJlZF91c2VybmFtZSI6InRheWxvcmJ1bmR5IiwicmF0IjoxNzUzODU0MzU2LCJzdWIiOiJrcF80ZTY0ZGViODY0ODA0ZGQ3YmYwMTcwMGVjM2Y3ZDc3NCIsInVwZGF0ZWRfYXQiOjEuNzUzODU0MzU2ZSswOX0.oaGDnexzxWNwQN3Pv7eVC3KVqkx1K9t4ty2pYxgScRyjf0PH_vHrQNCXKI5e3dEn_yRwctNWDxaq1Wl3_qA7wDWYiMKY9vpaUMEz6q2yPU2c2oS0GIF4_UH6wlKTfXeW-iUAWS4MCegI4J3WSWd_Y5Y2Jly22CWu-7o5KYFdbwBC0Gxfpc4oW_YQABvg_K_mW-cPTWI05paVMHFX2RIaUd-R1AqePDEUCOZSinUW-446NyfYidOo64UAvgURleSZlT_HeBvlynCPUQrmpPv961vip-Ff7QUHfJ70lJ4IhSaZdr8gTaXGtPAHbs9eKOYrf_hgDEAgHcSvDaV4HyKIzQ",
        "authorization": `Bearer ${token}`,
        "sec-ch-ua": "\"Opera\";v=\"95\", \"Chromium\";v=\"109\", \"Not;A=Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://www.redgifs.com/",
        "Referrer-Policy": "strict-origin"
      },
      "body": null,
      "method": "GET"
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const datoss = await response.json();
    return datoss.gif.urls.hd;
    } catch(error) {
    // Capturamos errores durante la solicitud
    console.error('Error durante la solicitud:', error);
  }
};

let URL_ESPECIFICA = null;

if (/fapello\.com/.test(fullUrl)) {
  const local = new URL(fullUrl);
  const partido = local.pathname.split("/");
  if (partido.length >= 3 && partido.length < 5) {
    userId1 = fullUrl.split("/")[3];
  } else if (partido.length > 5) {
    userId1 = fullUrl.split("/")[6];
  } else {
    userId1 = null;
  }
  if (partido.length === 4) {
    idFoto1 = fullUrl.split("/")[4];
  } else if (partido.length > 5) {
    idFoto1 = fullUrl.split("/")[8];
  } else {
    idFoto1 = null;
  }
  host = fullUrl;
} else if (/redgifs\.com/.test(fullUrl)) {
  if (fullUrl.includes('redgifs.com')) {
    URL_ESPECIFICA = fullUrl;
    if (!estadoGene) {
      retraso = 1500;
    } else {
      retraso = 5500;
    }
  }
  // //setTimeout(() => {
  //   const link2 = fullUrl.split("/watch/")[1].split("#")[0];
  //   const link1 = "https://api.redgifs.com/v2/gifs/" + link2 + "?views=yes&users=yes&niches=yes";
  //   obtieneredgifs(link1).then(urlssss => {
  //     console.log(urlssss);
  //     host = urlssss;
  //     //CallChrome(host, urlssss, `${nombre}${extension}`);
  //   });
  // //}, 1000);
  // const nombreTemporal = fullUrl.substring(fullUrl.lastIndexOf("/") +1);
  // nombre = nombreTemporal.split("#")[0];
  // //enlace = `https://media.redgifs.com/${nombre}.mp4`;
  // //host = GetHosts(fullUrl);
  // console.log(extension);
  host = fullUrl;
} else if (/pornhub\.com/.test(fullUrl)) {
  host = GetHosts(fullUrl);
} else if (/twpornstars\.com/.test(fullUrl)) {
  host = GetHosts(fullUrl);
} else if (/manyvids\.com/.test(fullUrl)) {
  host = GetHosts(fullUrl);
} else if (/youtube\.com/.test(fullUrl)) {
  //host = GetHosts(fullUrl);
  URL_ESPECIFICA = fullUrl;
  retraso = 5000;
  host = fullUrl;
  COOKIE_NAME = "estado_extension_" + domain;
  (async () => {
    const estado1 = await obtenerEstado(null, location.hostname, location.href);
    //console.log("Estado recibido:", estado1);
    if (estado1.activo) {
      //console.log("✅ La extensión está activa");
      //chrome.runtime.sendMessage({ action: "popupClosed" });
      estadoGene = true;
    } else {
      //console.log("🚫 La extensión está desactivada");
      estadoGene = false;
    }
  })();
  //obtenerEstadoExtension(fullUrl, COOKIE_NAME, (activo) => {
    //toggle.checked = activo;
    // if (!activo) {
    //   console.log("Extensión desactivada según cookie, no se inyectarán botones.");
    //   //estado = false;
    // } else {
    //   console.log("Extensión activa, se procede con la inyección de botones.");
    //   //estado = true;
    // }
    //console.log(activo);
  //});
}

// Reglas dinámicas para cada dominio
const DOMAIN_RULES1 = {
  "pornhub.com": [
    { include: ["/model", "/pornstar", "/gifs", "/video", "/gif"], result: true },
    { include: ["pornhub.com", "channels"], exclude: ["/model", "/pornstar", "/gifs", "/video", "/gif"], result: false }
  ],
  "x.com": [
    { include: ["/status", "/gif"], result: true },
    { include: ["x.com", "home"], exclude: ["status", "gif"], result: false }
  ],
  "fapello.com": [
    { include: [`/${idFoto1}`, `/${userId1}_0${idFoto1}`], result: true },
    //{ include: [`/${idFoto}`], result: true },
    { include: ["fapello.com"], exclude: [`/${idFoto1}`, `/${userId1}_0${idFoto1}`], result: false }
  ],
  "youtube.com": [
    { include: [`/watch`], result: true },
    //{ include: [`/${idFoto}`], result: true },
    { include: ["youtube.com"], exclude: [`/watch`], result: false }
  ],
  "twpornstars.com": [
    { include: ["/videos","/p"], result: true },
    //{ include: [`/${idFoto}`], result: true },
    { include: ["twpornstars.com"], exclude: ["/videos", "/p"], result: false }
  ],
  "redgifs.com": [
    { include: ["/users","/watch"], result: true },
    { include: ["redgifs.com", "channels", `/users/${userId}`], exclude: ["/users", "/watch"], result: false }
  ]
};

// let muestra;
// if (fullUrl.includes('redgifs.com/watch')) {
//   setTimeout(() => {
//     muestra = checkUrl(fullUrl, DOMAIN_RULES1);
//   }, 5000);
// } else {
//   muestra = checkUrl(fullUrl, DOMAIN_RULES1);
// }
const muestra = checkUrl(fullUrl, DOMAIN_RULES1);
// if (muestra === true) {
//   // Mostrar algo
// } else if (muestra === false) {
//   // Ocultar algo
// } else {
//   // No aplica ninguna regla
// }


// if (location.hostname === "es.pornhub.com" || location.pathname.includes("channels")
//   || location.pathname.includes("pornstar")) {
if (muestra === false) {
  // No ejecutar el resto del script
  console.log(`Popup deshabilitado en: ${fullUrl}`);
} else {
  // Tu código normal aquí
  //console.log(`Popup habilitado en: ${fullUrl}`);
  (() => {
    if (document.getElementById("mi-popup-extension")) return;

    // URL específica donde querés retrasar la aparición
    //URL_ESPECIFICA = "https://www.pornhub.com/model/scarlet-benz/gifs";
    const RETRASO_MS = retraso; // 3 segundos

    const crearPopup = () => {
      const popup = document.createElement("div");
      popup.id = "mi-popup-extension";
      popup.style.position = "fixed";
      popup.style.width = "40%";
      popup.style.display = "flex";
      popup.style.bottom = "20px";
      popup.style.right = "20px";
      popup.style.padding = "10px 15px";
      popup.style.background = "#333";
      popup.style.color = "#fff";
      popup.style.borderRadius = "8px";
      popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      popup.style.zIndex = "9999";
      popup.style.fontSize = "14px";
      popup.style.wordBreak = "word-break";
      popup.style.alignItems = "center";
      const img = document.createElement("img");
      img.id = "popupImg";
      img.style.position = "absolute";
      img.style.height = "100%";
      img.style.padding = "10px 15px";
      img.style.background = "#333";
      img.style.color = "#fff";
      img.style.borderRadius = "8px";  
      img.style.zIndex = "8";
      img.style.fontSize = "14px";
      img.src = logo;
      img.style.opacity = "0.2";
      img.style.right = "0";
      const texto  = document.createElement("span");
      texto.id = "contador";
      //texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!'`;
      // texto.innerHTML = `✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>
      //   listo para descargar: (<span style="color: red;font-weight: bold">${host}</span>).<br>
      //   Si no aparece el botón de descarga, presione: "<span style="color: red;font-weight: bold">Ctrl+Shift+H</span>".!`;
      //segundos = 0;
      //mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!<br>Tiempo estimado para cargar botones: ${segundos} segundos.<br>Tiempo restante: ${segundos / 1000}'`;
      texto.style.zIndex = "9";
      texto.style.textAlign = "left";
      popup.appendChild(img);
      popup.appendChild(texto);
      popup.insertBefore(img, texto);

      if (domain.includes('manyvids')) {
        //
      } else if (domain.includes('youtube')) {
        img.src = logo1;
        img.style.height = "90%";
        img.style.background = "";
        img.style.padding = "5px";
        segundos = 2000;
        if (!estadoGene) {
          texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!'`;
          mensaje = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!'`;
          mensaje2 = `Temporalmente deshabilitado.!'`;
        } else {
          texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en:<br>lista para descargar (${domain}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+V".!'`;
          mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+V".!'`;
          mensaje2 = `Boton cargado.!'`;
        }
      } else if (domain.includes('pornhub')) {
        img.style.height = "90%";
        img.style.padding = "5px";
        if (estadoGene) {
          segundos = 2000;
          if (/pornhub\.com\/.*\/gifs\/?$/.test(fullUrl)) {
            //segundos = 2500;
            texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!<br>Tiempo estimado para cargar botones: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
            mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!'`;
            mensaje2 = `Botones cargados.!'`;
          } else if (/pornhub\.com\/.*\/gifs\/video/.test(fullUrl)) {
            //segundos = 3500;
            texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!<br>Tiempo estimado para cargar botones: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
            mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!'`;
            mensaje2 = `Botones cargados.!'`;
          } else {
            //segundos = 1000;
            texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!<br>Tiempo estimado para cargar boton: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
            mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!'`;
            mensaje2 = `Boton cargado.!'`;
          }
        } else {
          segundos = 10000;
          //texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!'`;
          //mensaje = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!'`;
          //mensaje2 = `Temporalmente deshabilitado.!'`;
          texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!<br>Tiempo restante: ${(segundos / 1000).toFixed(1)} segundos.'`;
          mensaje = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!'`;
          mensaje2 = `Temporalmente deshabilitado.!'`;
          // if (/pornhub\.com\/.*\/gifs\/?$/.test(fullUrl)) {
          //   //segundos = 2500;
          //   texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!<br>Tiempo estimado para cargar botones: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
          //   mensaje = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!'`;
          //   mensaje2 = `Botones cargados.!'`;
          // } else if (/pornhub\.com\/.*\/gifs\/video/.test(fullUrl)) {
          //   //segundos = 3500;
          //   texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!<br>Tiempo estimado para cargar botones: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
          //   mensaje = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!'`;
          //   mensaje2 = `Botones cargados.!'`;
          // } else {
          //   //segundos = 1000;
          //   texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!<br>Tiempo estimado para cargar boton: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
          //   mensaje = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!'`;
          //   mensaje2 = `Boton cargado.!'`;
          // }
        }
        popup.style.lineHeight = "1.5";
        TiempoCuentaRegresiva = 1000;
      } else if (domain.includes('twpornstars')) {
        img.style.padding = "0";
                  texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!<br>Tiempo estimado para cargar boton: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
          mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!'`;
          mensaje2 = `Boton cargado.!'`;
      } else if (domain.includes('redgifs')) {
        if (!estadoGene) {
          segundos = 10000;
          texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!<br>Tiempo restante: ${(segundos / 1000).toFixed(1)} segundos.'`;
          mensaje = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!'`;
          mensaje2 = `Temporalmente deshabilitado.!'`;
          //mensaje2 = `Tiempo restante: ${(segundos / 1000).toFixed(1)} segundos.'`;
        } else {
          segundos = 2500;
          texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!<br>Tiempo estimado para cargar boton: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
          mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!'`;
          mensaje2 = `Boton cargado.!'`;
        }
        TiempoCuentaRegresiva = 1500;
        // if (fullUrl.includes('redgifs.com/watch')) {
        //   //segundos = 2500;
        //   //const link2 = fullUrl.split("/watch/")[1].split("#")[0];
        //   //const link1 = "https://api.redgifs.com/v2/gifs/" + link2 + "?views=yes&users=yes&niches=yes";
        //   // obtieneredgifs(link1).then(urlssss => {
        //   //   console.log(urlssss);
        //   //   host = urlssss;
        //   //   //CallChrome(host, urlssss, `${nombre}${extension}`);
        //   //   //segundos = 3000;
        //   //   texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!<br>Tiempo estimado para cargar boton: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
        //   //   mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${host}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!'`;
        //   //   mensaje2 = `Boton cargado.!'`;
        //   // });
        //   // segundos = 3000;
          
        //   TiempoCuentaRegresiva = 1500;
        // } else if (fullUrl.includes('redgifs.com/users')) {
        //   segundos = 5000;
        //   texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!<br>Tiempo estimado para cargar botones: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
        //   mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>para descargar haga click en algun boton de descarga.<br>Si no aparece ningún boton de descarga, recargue la pagina.!'`;
        //   mensaje2 = `Botones cargados.!'`;
        //   TiempoCuentaRegresiva = 1500;
        // }
        
        popup.style.width = "fit-content";
        popup.style.lineHeight = "1.5";
        img.style.height = "90%";
      } else if (domain.includes('fapello')) {
        texto.innerHTML = `✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>
          listo para descargar: (<span style="color: red;font-weight: bold">${host}</span>).<br>
          Si no aparece el botón de descarga, presione: "<span style="color: red;font-weight: bold">Ctrl+Shift+H</span>".!`;
        img.style.height = "90%";
        img.style.padding = "0px";
        popup.style.color = "rgb(190 24 93)";
        popup.style.background = "#efeeee";
        img.style.color = "";
        img.style.background = "";
        texto.style.lineHeight = "1.5";
      } else if (domain.includes('loyalfans')) {
        img.style.height = "80%";
        img.style.padding = "10px";
      }

      document.body.appendChild(popup);
      //segundos = 2500;
      const texto1 = document.getElementById("contador"); // tu elemento
      setTimeout(() => {
        //texto.innerHTML = mensaje;
        //iniciarCuentaRegresiva(texto1, segundos, mensaje, mensaje2, domain);
        iniciarCuentaRegresiva(texto1, segundos, mensaje, mensaje2, estadoGene, domain, () => {
          //console.log("✅ La cuenta regresiva llegó a 0.");
          setTimeout(() => {
            popup.remove();
            if (domain.includes('youtube')) {
              if (estadoGene) {
                //console.log(`estado: ${estadoGene}`);
                //chrome.runtime.sendMessage({ action: "popupClosed" });
              }
            } else {
              chrome.runtime.sendMessage({ action: "popupClosed" });
            }
            // (async () => {
            //   const estado1 = await obtenerEstado(null, location.hostname, location.href);
            //   console.log("Estado recibido:", estado1);
            //   if (estado1.activo) {
            //     console.log("✅ La extensión está activa");
            //     chrome.runtime.sendMessage({ action: "popupClosed" });
            //   } else {
            //     console.log("🚫 La extensión está desactivada");
            //   }
            // })();
            
            // console.log(estado);
            // if (domain.includes('youtube')) {
            //   if (estado) {
            //     chrome.runtime.sendMessage({ action: "popupClosed" });
            //   }
            // }
          }, elTiempo);
          // Aquí podés ejecutar el código que necesites al finalizar
        });
      }, TiempoCuentaRegresiva);

    };
    // Si la URL coincide, mostrar con retraso, sino mostrar inmediatamente
    if (fullUrl === URL_ESPECIFICA) {
      setTimeout(crearPopup, RETRASO_MS);
    } else {
      crearPopup();
    }
    // Hacer que desaparezca después de 5 segundos
    setTimeout(() => {
      //popup.remove();
    }, 8000);
  })();
}

function obtenerEstado(tabId, host, url) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        action: "getState",
        tabId,
        host,
        url
      },
      (response) => {
        resolve(response.estado); // devolvemos solo el objeto estado
      }
    );
  });
}

// document.addEventListener("DOMContentLoaded", async () => {
//   console.log("🟢 popup.js cargado");

//   const estado1 = await obtenerEstado(null, location.hostname, location.href);
//   const estado2 = estado1.activo;

//   console.log("🔍 Estado obtenido:", estado2);

//   // ✅ Ahora que terminó, ejecutás lo que sigue:
//   // if (estado) {
//   //   iniciarExtension();
//   // } else {
//   //   detenerExtension();
//   // }
// });
(async () => {
  const activo = await window.verificarEstadoExtension();

  if (activo) {
    console.log("✅ Extensión activa");
    //iniciarExtension(); // tu lógica normal
    estadoGene = true;
    //await BuscaContenedores();
  } else {
    estadoGene = false;
    console.log("⛔ Extensión desactivada, no hago nada");
    return;
  }
})();