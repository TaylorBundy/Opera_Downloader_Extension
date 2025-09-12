// chrome.runtime.onMessage.addListener((msg) => {
//   if (msg.action === "procesar_url") {
//     // if (urlRecibida === null) {
//     //   urlRecibida = msg.url;
//     // } else {
//     //   urlRecibida = null;
//     //   urlRecibida = msg.url;
//     // }
//     urlRecibida = msg.url;
//     let nomTemp = urlRecibida.split("?")[0];
//     nombreRecibido = nomTemp.substring(nomTemp.lastIndexOf("/") + 1)
//     console.log("URL recibida:", urlRecibida);
//     console.log("NOMBRE recibido:", nombreRecibido);

//     // Si ya cargó el IIFE, puedes llamar directamente a tu función
//     if (typeof window.procesarUrl === "function") {
//       window.procesarUrl(urlRecibida);
//     }
//   }
// });

if (!window.listenerProcesarUrl) {
  window.listenerProcesarUrl = true;

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "procesar_url") {
      urlRecibida = msg.url;
      const nomTemp = urlRecibida.split("?")[0];
      nombreRecibido = nomTemp.substring(nomTemp.lastIndexOf("/") + 1);

      console.log("URL recibida:", urlRecibida);
      console.log("NOMBRE recibido:", nombreRecibido);

      if (typeof window.procesarUrl === "function") {
        window.procesarUrl(urlRecibida);
      }
    }
  });
}

// function procesarImagenes(){
//   const todos = document.querySelectorAll("#content > div");
//   console.log(todos);

// }

// // Observar cambios en el DOM para el scroll infinito
// const observer = new MutationObserver(() => {
//   procesarImagenes();
// });

// observer.observe(document.body, { childList: true, subtree: true });

// Observador para scroll infinito / nuevas imágenes
// const observer = new MutationObserver((mutations) => {
//   for (const mutation of mutations) {
//     if (mutation.addedNodes.length) {
//       mutation.addedNodes.forEach((node) => {
//         console.log(node);
//         if (node.tagName === "IMG") {
//           console.log(node);
//           //crearBoton(node);
//         } else if (node.querySelectorAll) {
//           //const imgs = node.querySelectorAll("img");
//           const todos = document.querySelectorAll("#content > div");
//           console.log(todos);
//           crearBotonFlotantePorImagen(todos);
//           //imgs.forEach(crearBoton);
//         }
//       });
//     }
//   }
// });

(() => {
  const url = location.href;
  let elemento, nombre, mensaje, gif;
  const filtrados = [];
  const id = [];
  const infor = [];
  // const urlObj = new URL (window.location.toString());
  // const domain = urlObj.hostname;
  // const fullUrl = urlObj.href;
  //enlace = urlRecibida;

  // Función auxiliar para extraer nombre limpio
  // const obtenerNombre2 = (src, opciones = {}) => {
  //   let limpio = src.split("?")[0]; // quitar parámetros
  //   if (opciones.remover) {
  //     opciones.remover.forEach(r => limpio = limpio.replace(r, ""));
  //   }
  //   return limpio.substring(limpio.lastIndexOf("/") + 1);
  // };
  // Funcion para imprimir desde donde se esta ejecutando el codigo
  const imprime = (src) => {
    if (src.includes('phncdn.com')) {
      mensaje = 'desde pornhub';
    } else if (src.includes('pbs.twimg.com') || src.includes('x.com')) {
      mensaje = 'desde twitter';
    } else if (src.includes('video.twimg.com')) {
      mensaje = 'desde twpornstars';
    } else if (src.includes('redgifs.com')) {
      mensaje = 'desde redgifs';
    } else if (src.includes('pornpics.com')) {
      mensaje = 'desde pornpics';
    } else if (src.includes('manyvids.com')) {
      mensaje = 'desde manyvids';
    } else if (src.includes('fapello.com')) {
      mensaje = 'desde fapello';
    }
    console.log(mensaje);
  };
  // Funcion para descargar archivos
  const descargarArchivo = async (url, nombre) => {  
    try {
      let segundos = 5;
      let intervalo;
      let descargando = false;
  
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
      mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
  
      const btnAceptar = document.createElement("button");
      btnAceptar.textContent = "Aceptar";
      btnAceptar.style.margin = "5px";
  
      const btnEsperar = document.createElement("button");
      btnEsperar.textContent = "Esperar";
      btnEsperar.style.margin = "5px";
  
      const btnCancelar = document.createElement("button");
      btnCancelar.textContent = "Cancelar";
      btnCancelar.style.margin = "5px";
      btnCancelar.style.background = "red";
      btnCancelar.style.color = "white";
  
      modal.appendChild(mensaje);
      modal.appendChild(btnAceptar);
      modal.appendChild(btnEsperar);
      modal.appendChild(btnCancelar);
      document.body.appendChild(modal);
  
      // Función de descarga
      const iniciarDescarga = async () => {
        if (descargando) return;
        descargando = true;
        clearInterval(intervalo);
        mensaje.textContent = "Descargando...";
        btnAceptar.disabled = true;
        btnEsperar.disabled = true;
        btnCancelar.disabled = true;
  
        try {
          const respuesta = await fetch(url);          
          const blob = await respuesta.blob();
          const blobUrl = URL.createObjectURL(blob);
  
          const link = Object.assign(document.createElement("a"), {
            href: blobUrl,
            download: nombre
          });
  
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(blobUrl);
  
          mensaje.textContent = "Descarga completa ?";
        } catch (err) {
          mensaje.textContent = "Error en la descarga ?";
          console.error(err);
        }
  
        setTimeout(() => modal.remove(), 2000);
      };
  
      // Eventos de botones
      btnAceptar.onclick = iniciarDescarga;
      btnEsperar.onclick = () => {
        clearInterval(intervalo);
        modal.remove();
        iniciarDescarga();
      };
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
      
      // Limpiar listener al cerrar modal
      const limpiarListener = () => {
        document.removeEventListener("keydown", teclaEnterListener);
      };
      btnAceptar.addEventListener("click", limpiarListener);
      btnEsperar.addEventListener("click", limpiarListener);
      btnCancelar.addEventListener("click", limpiarListener);
  
      // Cuenta regresiva
      intervalo = setInterval(() => {
        segundos--;
        if (segundos > 0) {
          mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
        } else {
          clearInterval(intervalo);
          iniciarDescarga();
        }
      }, 1000);
  
    } catch (err) {
      console.error("Error al descargar:", err);
    }
  };
  // Funcion que obtiene el token temporal de redgifs
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
  // Funcion para obtener twitter
  const obtienetwitter = async (src, refer, idn) => {
    try {
      const response = await fetch(src, {
        "headers": {
          "accept": "*/*",
          "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
          "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
          "content-type": "application/json",
          "sec-ch-ua": "\"Opera\";v=\"95\", \"Chromium\";v=\"109\", \"Not;A=Brand\";v=\"24\"",
          "sec-ch-ua-arch": "\"x86\"",
          "sec-ch-ua-bitness": "\"64\"",
          "sec-ch-ua-full-version": "\"109.0.5414.149\"",
          "sec-ch-ua-full-version-list": "\"Not_A Brand\";v=\"99.0.0.0\", \"Opera\";v=\"109.0.5414.149\", \"Chromium\";v=\"109.0.5414.149\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": "",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-ch-ua-platform-version": "\"0.3.0\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-client-transaction-id": "ATxbzDg8MuCq4QKoh2Xnl42iOhaS4q5S4QOe326FzHu+O6C6Ltkc5LLypxOUcIQUUtRPVgVfJWPIBYGFEwKymT972f7KAg",
          "x-csrf-token": "b14576f5ef7c0ee04e646c69d54050028a561a3eb5b615894c8f4d72d03398ebeb8f6050b9925c7759c1216763d43e7fcc2d4cb87c5188986b77611283c504fcee99506f17f553ff6849cba0c5af1425",
          "x-twitter-active-user": "yes",
          "x-twitter-auth-type": "OAuth2Session",
          "x-twitter-client-language": "es",
          "x-xp-forwarded-for": "3be126c826e04aff3ca997cb698e576e68118a26265551763840848d839fbfedbd08315e66a18798dfffb2a41897376a904fdaddd61d867bf544c600af1e66700f58ced7dc05d2c575773db71a05d5f8f72a80b3ecc918bc6ccff1c83f9640bd35c1e6ba646fa75d5eeb578591a3edea738a42b3123607cc02d41701916a7cd1b9f8f222b24eccde81d21c45b373577717457a37d570251b775e9b1826e33cb0efb9a8a49d91aeac1b98fa9af67859178e25afa3aa6045b352e0e86e25c6395ce436331603225d4b2935f0a33742838d2f578e539907f5eb773515e7aa6287f0aa4063ca8bbf0026a16ecac9d4cb7493af0a7da0d885181b5ec05d1404cc105dd17ee88657135a",
          "cookie": "__cuid=610fb8b474884f33b3a355ce808ea764; g_state={\"i_l\":0}; personalization_id=\"v1_hFOfWMb2kRgiGx6lt/IhAQ==\"; kdt=dBPNUoqr5HBbnnvs6vMUs3Q1fopgkbXe57aM6YRB; night_mode=2; lang=es; cf_clearance=MvoYxgY6KXfN7PUWw63pDMkWVBvf0r9SXbSUQ2UWtwo-1755653097-1.2.1.1-ilVrYmYrPGJU3cHA6ATHS49GNTUhgC2dm_koBHYq_GNMNW.K4JsyhGjXViMI.IJwrCrarxLmS2QKmXXXv0N8rJf.qqGxqRWbJli9w5n7JbTXWyCiFDQBwrG_gUYuQBpGAeuv6ObcPtUYq5watrK7clMxcLZQbz89jCByOy64p3lVg2OzsM353qIniRbGyjiBmepHsRRnykOG4y6F3Pdznh3pBd0jb26UIDnjokdE8fI; dnt=1; auth_multi=\"1548537639707578370:adb7cec2235bb728bf9094310a77e28f05ed8ca3\"; auth_token=db5a3b1ae812e169916953bf3ce7f485f9e3d3b0; guest_id_ads=v1%3A175565329147778654; guest_id_marketing=v1%3A175565329147778654; guest_id=v1%3A175565329147778654; twid=u%3D1675697010622582784; ct0=b14576f5ef7c0ee04e646c69d54050028a561a3eb5b615894c8f4d72d03398ebeb8f6050b9925c7759c1216763d43e7fcc2d4cb87c5188986b77611283c504fcee99506f17f553ff6849cba0c5af1425; __cf_bm=__QDzj.57tgcq7Di_u7lRLmp6gN7Doyq116xreN5lpI-1755754948-1.0.1.1-MacQw6ZKyeVax7iMIoP5TC06mzrTMclQ0y3zS.OwF4OE9SjSDiM1b_loalc7RiNBERPW7a3TjAhgdGwApTaL6CEzLTxuJv_w6KXqsu5fEJA",
          //"Referer": "https://x.com/Camileprosa__/status/1958201459314463217",
          "Referer": `${refer}`,
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const datoss = await response.json();
      const lolo = datoss.data.threaded_conversation_with_injections_v2.instructions[1].entries[0].content.itemContent.tweet_results.result.legacy.entities.media[idn].video_info.variants[3];
      return lolo.url;
      } catch(error) {
      // Capturamos errores durante la solicitud
      console.error('Error durante la solicitud:', error);
    }
  };
  // Funcion que descarga erome desde proxy local
  function descargar(url) {
    window.location.href = "http://localhost:5000/descargar?url=" + encodeURIComponent(url);
  };
  // Funcion para descargar desde fansly
  const fansly = async (src, conte) => {
    try {      
      const response = await fetch(src, {
        "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
    "authorization": "NzQxMzMyMzYyMjEzNzMyMzUyOjE6MjoyYzkwYzMwYzE0ZGIxM2Q0ZWNiOTE5ZmZkN2RmMjA",
    "fansly-client-check": "1eee9393a262d1",
    "fansly-client-id": "741332220559499264",
    "fansly-client-ts": "1756221971122",
    "fansly-session-id": "741332362213732352",
    "sec-ch-ua": "\"Opera\";v=\"95\", \"Chromium\";v=\"109\", \"Not;A=Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://fansly.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
        const datoss = await response.json();
        const respuesta = datoss.response.aggregationData;
        const respuesta2 = datoss.response;        
        const { filtrados } = obtenerContents(respuesta.posts, conte); 
        const url2 = "https://apiv3.fansly.com/api/v1/post?ids=" + id + "&ngsw-bypass=true";       
      return { filtrados, id, infor };      
      } catch(error) {
      // Capturamos errores durante la solicitud
      console.error('Error durante la solicitud:', error);
    }
  };
  // Funicion para fansly
  const fansly2 = async (src) => {
    try {            
      //return fetch(src, {
      const response = await fetch(src, {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
          "authorization": "NzQxMzMyMzYyMjEzNzMyMzUyOjE6MjoyYzkwYzMwYzE0ZGIxM2Q0ZWNiOTE5ZmZkN2RmMjA",
          "fansly-client-check": "4cd1a71475f65",
          "fansly-client-id": "741332220559499264",
          "fansly-client-ts": "1756230193312",
          "fansly-session-id": "741332362213732352",
          "sec-ch-ua": "\"Opera\";v=\"95\", \"Chromium\";v=\"109\", \"Not;A=Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
          },
          "referrer": "https://fansly.com/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
        })
        if (!response.ok) throw new Error(`Error ${response.status}`); 
        const json = await response.json();
        return json; // ✅ acá devuelve el JSON
    //.then(r => r.json())    
      } catch(error) {
      // Capturamos errores durante la solicitud
      console.error('Error durante la solicitud:', error);
    }
  };
  //Funcion para obtener datos del content de fansly
  function obtenerContents(posts, filtro) {
    for (const post of posts) {
      if (post.content && post.content.includes(filtro)) {
        filtrados.push(post.content);      
        id.push(post.id);
        infor.push(post.content, post.id);
      }
    }
    return { filtrados, id, infor };
  };
  // Comprobamos que pagina estamos ejecutando para ejecutar la funcion correcta

  
  if (/cdni\.pornpics\.com|nudostar\.com\/content/.test(url)) {
    elemento = document.querySelector("img");
    enlace = elemento?.src;
    nombre = obtenerNombre(enlace);
    //console.log(nombre);
  } else if (/fapello\.com\/content\.jpg/.test(url)) {
    elemento = document.querySelector("img");
    enlace = elemento?.src;
    nombre = obtenerNombre(enlace);    
  } else if (/fapello\.com/.test(url)) {    
    if (fullUrl.match(/\d/)) {
      elemento = document.querySelector("#wrapper > div.main_content > div > div:nth-child(2) > div > div:nth-child(2) > a > img") || document.querySelector("img");
      enlace = elemento?.src;
      nombre = obtenerNombre(enlace);      
    } else {
      window.procesarUrl = (urlre) => {
        enlace = urlre;
        nombre = nombreRecibido;
        if (descargarArchivo(enlace, nombre)) {
          urlRecibida = null;
        }
      };
    }
  } else if (/media\.redgifs\.com/.test(url)) {
    elemento = document.querySelector("source") || document.querySelector("img");
    enlace = elemento?.src;
    nombre = obtenerNombre(enlace, { remover: ["-large"] });
  } else if (/redgifs\.com\/watch/.test(url)) {
    const link2 = url.split("/watch/")[1].split("#")[0];
    link1 = "https://api.redgifs.com/v2/gifs/" + link2 + "?views=yes&users=yes&niches=yes";
    nombre = link2;
    enlace = url;
    obtieneredgifs(link1).then(urlssss => {
      descargarArchivo(urlssss, nombre);
    });
  } else if (/x\.com/.test(url)) {
    const hayImagen = document.querySelector('img') !== null;
    const hayVideo = document.querySelector('source') !== null;
    ids = url.substring(url.lastIndexOf("/") +1);    
    if (url.includes('photo/')) {
      ids = ids -1;
      //ids = ids -1;
      elemento = document.querySelectorAll('img')[ids];
      enlace = elemento?.src;
      nombre = obtenerNombre(enlace, { remover: [":large"] });
    } else if (url.includes('video/')) {      
      ids = ids -1;
      // Usando expresión regular
      const match = url.match(/status\/(\d+)/);
      if (match) {
        const tweetId = match[1];
        nombre = tweetId;
      }
      //console.log(`nombre: ${nombre}`);
      //console.log(`ids: ${ids}`);
      link1 = "https://x.com/i/api/graphql/iFEr5AcP121Og4wx9Yqo3w/TweetDetail?variables=%7B%22focalTweetId%22%3A%22" + nombre + "%22%2C%22with_rux_injections%22%3Afalse%2C%22rankingMode%22%3A%22Relevance%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%7D&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22payments_enabled%22%3Afalse%2C%22rweb_xchat_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_imagine_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_community_note_auto_translation_is_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticleRichContentState%22%3Atrue%2C%22withArticlePlainText%22%3Afalse%2C%22withGrokAnalyze%22%3Afalse%2C%22withDisallowedReplyControls%22%3Afalse%7D";
       obtienetwitter(link1, url, ids).then(urlssss => {
         nombre = obtenerNombre(urlssss);
         descargarArchivo(urlssss, nombre);
       });
    } else {
      function ObtenerEnlaces(id, ids, url) {        
        const link1 = "https://x.com/i/api/graphql/iFEr5AcP121Og4wx9Yqo3w/TweetDetail?variables=%7B%22focalTweetId%22%3A%22" + ids + "%22%2C%22with_rux_injections%22%3Afalse%2C%22rankingMode%22%3A%22Relevance%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%7D&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22payments_enabled%22%3Afalse%2C%22rweb_xchat_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_imagine_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_community_note_auto_translation_is_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticleRichContentState%22%3Atrue%2C%22withArticlePlainText%22%3Afalse%2C%22withGrokAnalyze%22%3Afalse%2C%22withDisallowedReplyControls%22%3Afalse%7D";
        obtienetwitter(link1, url, id).then(urlssss => {
          nombre = obtenerNombre(urlssss);
          descargarArchivo(urlssss, nombre);
        });
      }
      if (hayVideo && url.includes('status/' + ids)) {        
        const todo = document.querySelector("#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article");
        const boton = document.querySelector('button[aria-label="Pausar"]');
        const TotalVideos = todo.querySelectorAll('video');                
        let cantidad = null;      
        
        if (TotalVideos.length > 1) {
          // Caso varios videos en el tweet
          if (boton) {
            TotalVideos.forEach((video, index) => {
              if (!video.paused) {
                console.log(`El video que se está reproduciendo es el número: ${index}`);
                cantidad = index;
              }
            });
          }
        } else if (TotalVideos.length === 1) {
          // Caso solo un video
          console.log("Hay un solo video en la página, lo descargo directamente.");
          cantidad = 0;
        }        
        ObtenerEnlaces(cantidad, ids, url);
      } else {
        alert('Debe reproducir al menos una vez los videos para poder descargarlos.!');
      }
    }
  } else if (/pbs\.twimg\.com/.test(url)) {
    elemento = document.querySelector("img");
    enlace = elemento?.src;
    nombre = obtenerNombre(enlace, { remover: [":large"] });
  } else if (/.loyalfans\.com/.test(url)) {
    const nuevo = document.querySelector("body > img");
    elemento = nuevo;
    enlace = elemento?.src;
    nombre = obtenerNombre(enlace);
  } else if (/.fansly\.com/.test(url)) {
    const conte= document.getElementsByClassName("post-text-container")[2].childNodes[0].textContent;
    const url = "https://apiv3.fansly.com/api/v1/mediaoffers/location?locationId=785320313247244288&locationType=1002&accountId=716078512095633408&mediaType=2&before=807884108381315073&after=0&limit=30&offset=0&ngsw-bypass=true";
    const url1 = "https://apiv3.fansly.com/api/v1/mediaoffers/location?locationId=785320313247244288&locationType=1002&accountId=716078512095633408&mediaType=2&before=800845418148671488&after=0&limit=30&offset=0&ngsw-bypass=true";
    function fannn () {
      fansly(url1, conte).then((urlssss) => {
          const url2 = "https://apiv3.fansly.com/api/v1/post?ids=" + id + "&ngsw-bypass=true";
          (async () => {
              const data = await fansly2(url2);
              const response = data.response;
            const media = response.accountMedia[0];
            const direccion = media.preview.locations[0];
            enlace = direccion.location;
            nombre = obtenerNombre(enlace);
            descargarArchivo(enlace, nombre);
            })();
          });
    }
    fannn();
  } else if (/erome\.com/.test(url)) {
    if (url.includes('s204.erome.com')) {
      elemento = document.querySelector("img");
      enlace = elemento?.src;
      nombre = obtenerNombre(enlace);
    } else if (url.includes('es.erome.com/a/')) {
      const hayVideo = document.querySelector('source') !== null;
      const contador = document.getElementById("lg-counter");
      const idss = contador.querySelector("#lg-counter-current").textContent;
      let ids = document.getElementsByClassName("media-group")[idss-1];
      const imgs = ids.querySelector("img").src;
      descargar(imgs);
    }
  } else if (/video\.twimg\.com|twpornstars\.com|el\.phncdn\.com|packaged-media\.redd\.it/.test(url)) {
    if (/twpornstars.com|twpornstars.com\/videos/.test(fullUrl)) {
    //if (fullUrl.includes('twpornstars.com') && fullUrl.includes('/videos')) {
      if (fullUrl.match(/\d/) && !fullUrl.includes("?page=")) {
        elemento = document.querySelector("source");
        enlace = elemento?.src;
        console.log('estamos aca linea 544');
        nombre = obtenerNombre(enlace);
        console.log('estamos aca linea 546');
      } else {
        window.procesarUrl = (urlre) => {
          enlace = urlre;
          nombre = nombreRecibido;
          if (descargarArchivo(enlace, nombre)) {
            urlRecibida = null;
          }
        };
      }
    } else {
      elemento = document.querySelector("source");
      enlace = elemento?.src;
      console.log('estamos aca linea 544');
      nombre = obtenerNombre(enlace);
      console.log('estamos aca linea 546');
    }
  } else if (/manyvids\.com/.test(url)) {
    const hayImagen = document.querySelector('video') !== null;
    const hayVideo = document.querySelector('source') !== null;
    if (hayVideo) {
     elemento = document.querySelector('source');
    } else {
      elemento = document.querySelector('video');
    }
    enlace = elemento?.src;
    nombre = url.substring(url.lastIndexOf("/") +1);
  } else if (/es\.pornhub\.com\/gif/.test(url)) {
    elemento = document.querySelectorAll("video")[4]?.children[0];
    enlace = elemento?.src;
    nombre = obtenerNombre(enlace);
  } else {
    console.log("Página no reconocida");
    return;
  }
  
  // const elboton = document.querySelector("#mi-boton-flotante");
  // elboton.onclick = function() {
  //   // `this` se refiere al botón que se hizo clic
  //   this.remove();

  //   // Si quieres hacer algo con la URL asociada
  //   //const urlImagen = this.dataset.url;
  //   //console.log("Descargando URL:", urlImagen);
  //   //chrome.runtime.sendMessage({ action: "descargar_imagen", url: urlImagen });
  // };
  //elboton.remove();
  // Dependiendo de que pagina, ejecuta cierta funcion para descargar
  if (enlace && nombre) {    
    imprime(enlace);
    if (enlace.includes('video.twimg.com') || enlace.includes('el.phncdn.com') || enlace.includes('manyvids.com') || enlace.includes('pbs.twimg')){
      descargarArchivo(enlace, nombre);
    } else if (enlace.includes('fapello.com/content/')) {      
      descargarArchivo(enlace, nombre);
    } else if (enlace.includes('redgifs.com/watch')) {
      return;
    } else {
      const link = Object.assign(document.createElement("a"), {
        href: enlace,
        download: nombre
      });
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } else {
    console.warn("No se encontró recurso válido.");
  }
})();