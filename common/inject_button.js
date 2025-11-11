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
    observer.observe(document.body, { childList: true, subtree: true });
  }

function procesarImagenes(){
  if (cantidadInicial > 1) {    
    totalImagenes = document.querySelector("#wrapper > div.main_content > div > div.flex.lg\\:flex-row.flex-col.items-center.lg\\:py-8.lg\\:space-x-8 > div.lg\\:w\\/8\\/12.flex-1.flex.flex-col.lg\\:items-start.items-center > div.divide-gray-300.divide-transparent.divide-x.grid.grid-cols-2.lg\\:text-left.lg\\:text-lg.mt-3.text-center.w-full.dark\\:text-gray-100 > div:nth-child(1)");
    totalImagenes = totalImagenes.textContent.replace(" Media", "").trim();
    if (totalImagenes >= 200) {
      totalImagenes = 200;
    }
    const todos = document.querySelectorAll("#content > div");
    if (todos.length >= cantidadInicial && todos.length < totalImagenes){
      crearBotonFlotantePorImagen(todos);
    } else {
      observer.disconnect();
    }
  } else {
    observer.disconnect();
  }
}


function procesarVideos() {
  //todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
  setTimeout(() => {
    //const todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
    todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
    //const cargarMasBtn = document.querySelector('#moreDataBtn'); // selector real
    estilo = cargarMasBtn.getAttribute('style');
    totalVideos = document.querySelector("#profileContent > div > section > div > div.profileVids > div.section_header.separated.first > div.float-left > div")?.textContent;
    const numero = parseInt(totalVideos.match(/\d+/)[0], 10);
    totalVideos = numero;
    const todosBotones = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li > button");
    todosBotones.forEach((botones, index) => {
      totalBotones = index + 1;
    });
    if (cantidadInicial == null) {
      cantidadInicial = todos.length;
    } else if (cantidadInicial > 1) {
      if (todos.length >= cantidadInicial && todos.length < totalVideos){
        crearBotonFlotantePorImagen(todos);
      } else if (todos.length > totalBotones) {
        crearBotonFlotantePorImagen(todos);
      } else if (totalBotones < totalVideos && todos.length === totalVideos) {
        crearBotonFlotantePorImagen(todos);
      } else {
        observer.disconnect();
      }
      if (estilo === 'display: none;') {
        observer.disconnect();
      }
    }
  }, 2000);
}

function hola (){
  if (fullUrl.includes('/videos')) {
    const todos = document.querySelectorAll("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div");
    const arr = Array.from(todos);
    const filtrados = arr.filter(el => !el.textContent.includes("Suscribirse"));
    salteados = arr.length - filtrados.length;
    todos.forEach((botones, index) => {
      idUrl = index;
    });
    //const numeroVideos = document.querySelector('.main-content > div:nth-child(4) > a:nth-child(3)');
    //totalVideos = numeroVideos.textContent.replace(" vídeos", "").trim();
    enlace = fullUrl;
    //console.log(filtrados.length);
    //console.log(`cantidad filtrados linea 184: ${filtrados.length}`);
    const todosBotones = document.querySelectorAll("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div > button");
    todosBotones.forEach((botones, index) => {
      totalBotones = index + 1;
      //idBoto = index;
    });
    //
    const agregaBoton = () => {
      arr.forEach((el, index) => {
        if (!el.textContent.includes("Suscribirse")) {
          //indicesValidos.push(index); // Guardás el índice original
          //injectarBoton(el);          // Llamás a tu función solo para los válidos
          idBoto = index;
          mensajeTodos = 'Todos';
          //(async () => {
            //enlace = await obtieneLinkLoyalFans(urlFetch, index);
            //console.log(enlace);
            crearBotonFlotante(el, enlace);
            //chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
          //})();
          //crearBotonFlotante(el, enlace);
        }
      });
    }
    
    //console.log(`total videos linea 202: ${totalVideos}`);
    //cantidadInicial = filtrados.length;
    if (cantidadInicial === null || cantidadInicial === 0) {
      const numeroVideos = document.querySelector('.main-content > div:nth-child(4) > a:nth-child(3)');
      totalVideos = numeroVideos.textContent.replace(" vídeos", "").trim();
      tiempo = 2000;
      resolverTiempo(tiempo);
      //console.log(`cantidad inicial linea 196: ${cantidadInicial}`);
    } else {
      if (totalVideos > cantidadInicial && cantidadInicial + filtrados.length < totalVideos) {
        agregaBoton();
        console.log(`agregamos boton porque totalvideos es mayor a la inicial linea 211: ${cantidadInicial}`);
      } else if (totalBotones + salteados < totalVideos) {
        agregaBoton();
        console.log(`agregamos boton porque totalvideos es mayor a la totalbotones + salteados linea 223: ${cantidadInicial}`);
      } else if (totalBotones + salteados === totalVideos) {
        observer1.disconnect();
        console.log(`Ciclo terminado, porque botones + salteados igual a todos videos observer desconectado linea 226.`);
      } else  if (cantidadInicial + filtrados.length === totalVideos){
        observer1.disconnect();
        console.log(`Ciclo terminado, observer desconectado linea 233.`);
      }
    }
    //console.log(`cantidad inicial linea 198: ${cantidadInicial}`);
  }
}

// Observar cambios en el DOM para el scroll infinito
const observer = new MutationObserver(() => {
  if (domain.includes('fapello')) {
    procesarImagenes();
  }
  // if (domain.includes(`pornhub`)) {
  //   if (fullUrl.includes(`${userId}/gifs/video`)) {
  //     const cargarMasBtn = document.querySelector('#moreDataBtn'); // selector real
  //     cargarMasBtn.addEventListener('click', procesarVideos);
  //     //procesarVideos();
  //   }
  // }
  if (domain.includes('pornhub')) {
    if (estadoGene) {
      if (fullUrl.includes(`${userId}/gifs/video`)) {
        //const cargarMasBtn = document.querySelector('#moreDataBtn');
        //setTimeout(() => {
          if (cargarMasBtn) {
            // Evitar múltiples registros en scroll infinito:
            if (!cargarMasBtn.dataset.listenerAdded) {
                cargarMasBtn.addEventListener('click', procesarVideos);
                cargarMasBtn.dataset.listenerAdded = "true";
            }
          }
        //}, 5000);
      }
    }
  }
  if (domain.includes(`loyalfans`)) {
    if (fullUrl.includes(`${userId}/videos`)) {
      //verificarOverlayLoyalFans();
    }
  }
});

const observer1 = new MutationObserver(() => {
  if (domain.includes(`loyalfans`)) {
    if (fullUrl.includes(`${userId}/videos`)) {
      //procesarVideosloyalFans();
      hola();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
observer1.observe(document.body, { childList: true, subtree: true });
//console.log(`estado observer: ${observerActivo}`);
//observerActivo = true;
setTimeout(() => {
  observer1.disconnect();
  console.log('Observer detenido automáticamente después de 7.5minutos');
}, 450000);


if (domain.includes('pornhub')) {
    setTimeout(() => {
      tiempo = 1000;
      if (fullUrl.includes('pornhub.com/gifs/')) {
        //tiempo = 3000;
      } else if (fullUrl.includes(`pornhub.com/model/${userId}/gifs/video`) || fullUrl.includes(`pornhub.com/pornstar/${userId}/gifs/video`)) {
        selector = document.querySelector('.gifsWrapperProfile');
        if (selector) {
          //tiempo = 3500;
          resolverTiempo(tiempo);
        }
      } else if (fullUrl.includes(`pornhub.com/model/${userId}/gifs`) || fullUrl.includes(`pornhub.com/pornstar/${userId}/gifs`)) {
        selector = document.querySelector('.gifsWrapperProfile.clearfix');
        if (selector) {
          //tiempo = 2500;
          resolverTiempo(tiempo);
        }
      } else {
        selector = document.querySelector("#js-playWebM");
        if (selector) {
          enlace = document.querySelector('#gifWebmPlayer > source').src;
          //tiempo = 1000;
          resolverTiempo(tiempo);
        } else {
          //tiempo = 5000;
          return;
        }
      }
    }, 1000);
} else if (domain.includes('redgifs')) {
    setTimeout(() => {
        selector = document.querySelector('video[class="isLoaded"]');
        //console.log(selector);
        if (selector) {
          tiempo = 1000;
          resolverTiempo(tiempo);
        } else if (intentos < 3) {
          selector = document.querySelector('video[class="isLoaded"]');
          tiempo = 1500;
          resolverTiempo(tiempo);
          intentos += 1;
        } else {
          setTimeout( () => {
            resolverTiempo(tiempo)
          }, 300);
          tiempo = 5000;
        }
    }, 1000);
} else if (domain.includes('manyvids')) {
  setTimeout(() => {
    selector = document.querySelector("#mv-video-player-vid-5791941 > div.rmp-content > video");
    if (selector) {
      tiempo = 2000;
      resolverTiempo(tiempo);
    } else if (intentos < 3) {
      selector = document.querySelector("#mv-video-player-vid-5791941 > div.rmp-content > video");
      tiempo = 2000;
      resolverTiempo(tiempo);
      intentos += 1;
    } else {
      tiempo = 3000;
    }
  }, 2000);
} else if (domain.includes('twpornstars') || domain.includes('pornpics')) {
  tiempo = 2000;
  if (domain.includes('twpornstars')) {
    selector = document.querySelector("body > div.block.block-thumbs.js-thumbs > div.thumb > div.thumb__inner");
    if (selector) {
      tiempo = 1000;
      resolverTiempo(tiempo);
    } else if (intentos < 3 ) {
      tiempo = 2000;
      resolverTiempo(tiempo);
      intentos += 1;
    }
  } else if (domain.includes('pornpics')) {
    tiempo = 3000;
  }
} else if (domain.includes('fapello')) {  
  //userId = fullUrl.split("/")[3];
  const local = new URL(fullUrl);
  const partido = local.pathname.split("/");
  if (fullUrl.includes('fapello.com') && !fullUrl.includes('fapello.com/content')) {
    if (partido.length === 4) {
    //if (fullUrl.match(/\d/) && !userId.match(/\d/)) {
      selector = document.querySelector("#wrapper > div.main_content > div > div:nth-child(2) > div > div:nth-child(2) > a > img");
      img.src = selector.src;
      img.onload = () => {
        tiempo = 1500;
        enlace = img.src;
      };
      img.onerror = () => {
        console.error('Error al cargar la imagen');
      };
    } else if (partido.length === 3){
      tiempo = 2000;
    }
  } else if (fullUrl.includes('fapello.com/content')) {
      selector = document.querySelector("body > img");
      img.src = selector.src;
      img.onload = () => {
        tiempo = 1000;
      };
      img.onerror = () => {
        console.error('Error al cargar la imagen');
      };
  }
} else if (domain.includes('loyalfans')) {
  userId = fullUrl.split('/')[3];
  //console.log(userId);
  if (fullUrl.includes('/videos')) {
    //totalVideos = 0;
    //totalVideos = document.querySelector("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > div.media-filters.ng-star-inserted > a.active.ng-star-inserted");
    //totalVideos = totalVideos.textContent.replace(" vídeos", "").trim();
    //console.log(totalVideos);
    //setTimeout(() => {      
      (async function buscacon (){
        //const valorTiempo = await esperarTiempo();
        setTimeout(() => {
          const principal = document.querySelector('.main-content');
          if (principal) {
            console.log(`sisisisi main-content despues de: ${intentos}`);
            setTimeout(() => {
              selector = document.querySelector("div.grid-videos");
              //const numeroVideos = document.querySelector("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > div.media-filters.ng-star-inserted > a.active.ng-star-inserted");
              //totalVideos = numeroVideos.textContent.replace(" vídeos", "").trim();
              tiempo = 3000;
              resolverTiempo(tiempo);
              //console.log(`total videos linea 277: ${totalVideos}`);
            }, 3000);
            // if (principal.hasChildNodes()) {
            //   console.log('tiene childs');
            // } else {
            //   console.log('no tiene childs');
            // }
          } else if (intentos < 5) {
            console.log(`aun no, intentando nuevamente: ${intentos + 1}`);
            intentos += 1;
            //tiempo = 6000;
            //resolverTiempo(tiempo);
            buscacon();
            //resolverTiempo(tiempo);
          }
        }, 5000);
      })();
    
      // selector = document.querySelector("div.grid-videos");
      // if (selector) {
      //   tiempo = 2000;
      //   resolverTiempo(tiempo);
      // } else {
      //   if (!selector) {
      //     selector = document.querySelector("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos");
      //     tiempo = 5000;
      //     resolverTiempo(tiempo);
      //   } else if (intentos < 3) {
      //     selector = document.querySelector("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos");
      //     tiempo = 5000;
      //     resolverTiempo(tiempo);
      //     intentos += 1;
      //     console.warn(`No se encontró el contenedor despues de ${intentos} intentos.`);
      //   }
      // }
    //}, 300);
  }
}
// Función que devuelve una Promise que se resuelve cuando tiempo tiene valor
function esperarTiempo() {
  return new Promise(resolve => {
    const check = setInterval(() => {
      if (tiempo !== null) {
        clearInterval(check);
        resolve(tiempo);
      }
    }, 50); // revisa cada 50ms
  });
}

const inicio = performance.now();
let encontrados = 0;
let totalEsperado = 40;

const observer2 = new MutationObserver((mutations, obs) => {
  const boton = document.getElementById("mi-boton-flotante");
  //const todosbot = document.querySelectorAll("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > div > button");
  if (boton) {
    const fin = performance.now();
    console.log(`⏱ crearBoton tardó ${(fin - inicio).toFixed(2)} ms en aparecer`);
    obs.disconnect();
  }
});

// Observar el body antes de llamar a crearBoton
observer2.observe(document.body, { childList: true, subtree: true });

const observer3 = new MutationObserver((mutations, obs) => {
  const botones = document.querySelectorAll("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > div > button");
  encontrados = botones.length;

  if (encontrados >= totalEsperado) {
    const fin = performance.now();
    console.log(`⏱ Se inyectaron ${encontrados} botones en ${(fin - inicio).toFixed(2)} ms`);
    obs.disconnect();
  }
});

observer3.observe(document.body, { childList: true, subtree: true });

const observer4 = new MutationObserver(async (mutations, obs) => {
  const popup = document.getElementById("mi-popup-extension");
  if (popup) {
    //obs.disconnect(); // Dejar de observar para ahorrar recursos
    const eltexto = document.querySelector('#contador');
    const eltexto2 = eltexto.textContent;
    console.log(eltexto.textContent);
    if (eltexto.textContent.endsWith("segundos.'")) {
      console.log('si');
    }
    if (eltexto2) {
      //miFuncionDespuesDelPopup();
      const match = eltexto2.match(/(\d+(\.\d+)?)(?=\s*segundos)/);
      if (match) {
        const segundos = parseFloat(match[1]); // 2.5
        const milisegundos = segundos * 1000;  // 2500
        console.log(`Segundos: ${segundos}, Milisegundos: ${milisegundos}`);
        tiempo = milisegundos;
        demoraBtn = milisegundos;
      } else {
        console.log("No se encontró el número");
        tiempo = 8000;
      }
      obs.disconnect();
      //resolverTiempo(tiempo);
      await BuscaContenedores();
    }
  }
});

observer4.observe(document.body, { childList: true, subtree: true });

//const start = performance.now();
//(async () => {
async function BuscaContenedores (){
  //console.log(fullUrl);
  const valorTiempo = await esperarTiempo();
  //console.log(valorTiempo);
  setTimeout(() => {
    const url = window.location.toString();
    const nombreTemporal = obtenerNombre(url);
    const nombre = nombreTemporal.split("#")[0];
    
    if (domain.includes('pornhub')) {
      if (fullUrl.includes('pornhub.com/gif/')) {
          selector = "#js-gifWebMWrapper > gif-video-element > div";
          enlace = document.querySelector('#gifWebmPlayer > source').src;
      } else if (fullUrl.includes('pornhub.com/gifs/')) {
        //const todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
        //const todos = document.querySelectorAll("body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li");
        crearBotonFlotantePorImagen([...todos2].slice(1));
        //crearBotonFlotantePorImagen(todos);
        return
      } else if (fullUrl.includes(`model/${userId}/gifs/video`) || fullUrl.includes(`pornstar/${userId}/gifs/video`)) {
        //const todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
        const tttodos = document.querySelectorAll(todos);
        //console.log(tttodos);
        cantidadInicial = todos.length;
        crearBotonFlotantePorImagen(tttodos);
        //console.log(cantidadInicial);
        return;
      } else if (fullUrl.includes(`pornstar/${userId}/gifs`) || fullUrl.includes(`model/${userId}/gifs`)) {
        //const todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids.gifsOutterWrapperProfile > div.gifsWrapperProfile.clearfix > ul > li");
        //const todos = document.querySelectorAll("#fromVideosGifsSection > li");
        cantidadInicial = todos1.length;
        crearBotonFlotantePorImagen(todos1);
        //console.log(cantidadInicial);
        return;
      } else {
        return;
      }
    } else if (domain.includes('redgifs')) {
      if (fullUrl.includes('redgifs.com/watch')) {
        //setTimeout(() => {
          const botonPlay = document.querySelector('video[class="isLoaded"]');
          if (botonPlay) {
            extension = '.mp4';
          } else {
            extension = '.jpg';
          }
          selector = `#gif_${nombre}`;
          enlace = `https://media.redgifs.com/${nombre}${extension}`;
        //}, 1000);
        
      } else if (fullUrl.includes('redgifs.com/users')) {
        //console.log(nombre);
        //console.log(fullUrl.split("/")[4]);
        //const todos = document.querySelectorAll("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > a");
        //todos = document.querySelectorAll(todos);
        //crearBotonFlotantePorImagen(todos);
        crearBotonFlotantePorImagen(document.querySelectorAll(todos));
        return;
      } else {
        return;
      }
    } else if (domain.includes('twpornstars')) {
      //console.log(domain);
      if (fullUrl.includes('twpornstars.com') && fullUrl.includes('/videos')) {
        const todos = document.querySelectorAll("body > div.block.block-thumbs.js-thumbs > div.thumb > div.thumb__inner");
        crearBotonFlotantePorImagen(todos);
        return
      } else {
        //selector = "#video_tag";
        selector = "#video_tag";
        enlace = document.querySelector(`${selector} > video > source`).src;
      }
    } else if (fullUrl.includes('manyvids.com/Video')) {
      const id = fullUrl.match(/\/Video\/(\d+)\//)[1];
      //selector = `#mv-video-player-vid-${id} > div.rmp-content`;
      selector = `#mv-video-player-vid-${id}`;
      enlace = document.querySelector(`#mv-video-player-vid-${id} > div.rmp-content > video`).src;
    } else if (fullUrl.includes('fapello.com') && !fullUrl.includes('fapello.com/content')) {
      //console.log(fullUrl);
      //console.log(userId);
      if (tieneExtra(fullUrl)) {
        //userId = fullUrl.split("/")[3];
        if (/\d/.test(userId)) {
          const local = new URL(fullUrl);
          const partido = local.pathname.split("/");
          //console.log(partido.length);
          if (partido.length === 3) {//if (fullUrl.includes(`fapello.com/${userId}/`) && tieneExtra(fullUrl)) {
            //console.log('estamos aca');
            //const todos = document.querySelectorAll("#content > div");
            cantidadInicial = todos.length;
            crearBotonFlotantePorImagen(todos);
            return
          } else if (partido.length === 4) { //(fullUrl.match(/\d/) && userId.match(/\d/)) {
            //console.log('estamos aca');
            selector = "#wrapper > div.main_content > div > div:nth-child(2) > div > div.flex.justify-between.items-center.p-5.border-b";
            enlace = document.querySelector("#wrapper > div.main_content > div > div:nth-child(2) > div > div:nth-child(2) > a > img")?.src;
          }
        } else {
          if (fullUrl.match(/\d/)){ //&& !userId.match(/\d/)) {
            //console.log('estamos aca');
            //checkUrl(fullUrl);
            selector = "#wrapper > div.main_content > div > div:nth-child(2) > div > div.flex.justify-between.items-center.p-5.border-b";
          } else {
            //const todos = document.querySelectorAll("#content > div");
            cantidadInicial = todos.length;
            crearBotonFlotantePorImagen(todos);
            return
          }      
        }
      } else {
        return;
      }
    } else if (fullUrl.includes('fapello.com/content')) {
        cantidadInicial = 1;
        selector = "body";
        enlace = fullUrl;
    } else if (fullUrl.includes('pornpics.com/galleries')) {
      //const todos = document.querySelectorAll("#tiles > li");
      crearBotonFlotantePorImagen(todos);
      return;
    } else if (fullUrl.includes('pornpics')) {
      cantidadInicial = 1;
      selector = "body";
      enlace = fullUrl;
  } else if (domain.includes('loyalfans')) {
    if (fullUrl.includes('/videos')) {
      const urlFetch = `https://www.loyalfans.com/api/v2/social/videos/${userId}?ngsw-bypass=true`;
      const todos = document.querySelectorAll("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div");
      const arr = Array.from(todos);
      const filtrados = arr.filter(el => !el.textContent.includes("Suscribirse"));
      salteados = arr.length - filtrados.length;
      //console.log(filtrados.length);
      cantidadInicial = filtrados.length;
      enlace = fullUrl;
      // todos.forEach((botones, index) => {
      //   idUrl = index;
      //   idBoto = index;
      // });
      const indicesValidos = [];
      arr.forEach((el, index) => {
        if (!el.textContent.includes("Suscribirse")) {
          indicesValidos.push(index); // Guardás el índice original
          //injectarBoton(el);          // Llamás a tu función solo para los válidos
          idBoto = index;
          mensajeTodos = 'Todos';
          //(async () => {
            //enlace = await obtieneLinkLoyalFans(urlFetch, index);
            //console.log(enlace);
            crearBotonFlotante(el, enlace);
            //chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
          //})();
          //crearBotonFlotante(el, enlace);
        }
      });
      //console.log(indicesValidos);
      // filtrados.forEach((el, index) => {
      //   if (!el.textContent.includes("Suscribirse")) {
      //     console.log("Agregando botón en:", el);
      //     console.log(index);
      //     idBoto = index;
      //     mensajeTodos = 'Todos';
      //     crearBotonFlotante(el, enlace);
      //   } else {
      //     console.log("Saltado por Suscribirse:", el);
      //   }
      // });
      //});
      //nuevoValor = todos.length;
      //crearBotonFlotantePorImagen(todos);
      return;
    }
  }
  // let contenedor;
  // const holi = document.getElementById("mi-popup-extension");
  // console.log(holi);
  // if (!holi) {
  //   console.log('no hay popup');
  //   return;
  // } else if (intentos < 3) {
  //   const contenedor1 = document.querySelector(
  //       selector
  //   );
  //   contenedor = contenedor1;
  // }
      const contenedor = document.querySelector(
          selector
      );
      //console.log(contenedor);
    if (contenedor) {
      if (demoraBtn) {
        crearBotonFlotante(contenedor, enlace)
      }
      crearBotonFlotante(contenedor, enlace);
    } else if (intentos < 3) {
      console.warn(`No se encontró el contenedor todavía, reintentando: ${intentos + 1}`);
      BuscaContenedores();
      intentos += 1;
    } else {
      console.warn(`No se encontró el contenedor despues de ${intentos} intentos.`);
    }
  }, valorTiempo); // espera 5 segundos
};
//BuscaContenedores();

(async () => {
  const activo = await window.verificarEstadoExtension();

  if (activo) {
    console.log("✅ Extensión activa");
    //iniciarExtension(); // tu lógica normal
    //estado = true;
    await BuscaContenedores();
  } else {
    //estado = false;
    console.log("⛔ Extensión desactivada, no hago nada");
    return;
  }
})();