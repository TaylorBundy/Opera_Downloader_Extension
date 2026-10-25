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

function esperarElementos(selector, callback) {
  const intervalo = setInterval(() => {
    const elementos = document.querySelectorAll(selector);

    if (elementos.length > 0) {
      clearInterval(intervalo);
      callback(elementos);
    }
  }, 300);
}

async function esperarElemento(selector, timeout = 15000) {
  const inicio = Date.now();

  while (Date.now() - inicio < timeout) {
    const elemento = document.querySelector(selector);

    if (elemento) {
      return elemento;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return null;
}

function procesarImagenes() {
  if (cantidadInicial > 1) {
    totalImagenes = document.querySelector(
      "#wrapper > div.main_content > div > div.flex.lg\\:flex-row.flex-col.items-center.lg\\:py-8.lg\\:space-x-8 > div.lg\\:w\\/8\\/12.flex-1.flex.flex-col.lg\\:items-start.items-center > div.divide-gray-300.divide-transparent.divide-x.grid.grid-cols-2.lg\\:text-left.lg\\:text-lg.mt-3.text-center.w-full.dark\\:text-gray-100 > div:nth-child(1)",
    );
    totalImagenes = totalImagenes.textContent.replace(" Media", "").trim();
    if (totalImagenes >= 200) {
      totalImagenes = 200;
    }
    const todos = document.querySelectorAll("#content > div");
    if (todos.length >= cantidadInicial && todos.length < totalImagenes) {
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
    todos = document.querySelectorAll(
      "#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li",
    );
    //const cargarMasBtn = document.querySelector('#moreDataBtn'); // selector real
    estilo = cargarMasBtn.getAttribute("style");
    totalVideos = document.querySelector(
      "#profileContent > div > section > div > div.profileVids > div.section_header.separated.first > div.float-left > div",
    )?.textContent;
    const numero = parseInt(totalVideos.match(/\d+/)[0], 10);
    totalVideos = numero;
    const todosBotones = document.querySelectorAll(
      "#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li > button",
    );
    todosBotones.forEach((botones, index) => {
      totalBotones = index + 1;
    });
    if (cantidadInicial == null) {
      cantidadInicial = todos.length;
    } else if (cantidadInicial > 1) {
      if (todos.length >= cantidadInicial && todos.length < totalVideos) {
        crearBotonFlotantePorImagen(todos);
      } else if (todos.length > totalBotones) {
        crearBotonFlotantePorImagen(todos);
      } else if (totalBotones < totalVideos && todos.length === totalVideos) {
        crearBotonFlotantePorImagen(todos);
      } else {
        observer.disconnect();
      }
      if (estilo === "display: none;") {
        observer.disconnect();
      }
    }
  }, 2000);
}

function procesarVideosRedgifs2() {
  //todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
  setTimeout(() => {
    //const todos = document.querySelectorAll("#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > img");
    //todos.forEach((img, i) => {
    //const src = img.getAttribute("src");

    //if (src && !src.startsWith("data:")) {
    //console.log(i, src);
    //totalVideos = src;
    //}
    //});
    const conSrc = [
      ...document.querySelectorAll(
        "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > img",
      ),
    ].filter((img) => {
      const src = img.getAttribute("src");
      return src && src.trim() !== "" && !src.startsWith("data:");
    }).length;
    totalVideos = conSrc;

    //console.log(totalVideos);
    //todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
    //const cargarMasBtn = document.querySelector('#moreDataBtn'); // selector real
    //estilo = cargarMasBtn.getAttribute('style');
    //totalVideos = document.querySelector("#profileContent > div > section > div > div.profileVids > div.section_header.separated.first > div.float-left > div")?.textContent;
    //const numero = parseInt(totalVideos.match(/\d+/)[0], 10);
    //totalVideos = numero;
    const todosBotones = document.querySelectorAll(
      "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > button",
    );
    todosBotones.forEach((botones, index) => {
      totalBotones = index + 1;
    });
    //console.log(totalVideos);
    const elementos = document.querySelectorAll(".tileItem");
    const cantidad = elementos.length;
    //console.log(cantidad);
    if (cantidadInicial == null) {
      cantidadInicial = cantidad;
    } else if (cantidadInicial > 1) {
      if (cantidad >= cantidadInicial && totalVideos < cantidad) {
        //crearBotonFlotantePorImagen(todos);
        crearBotonFlotantePorImagen(document.querySelectorAll(todos));
        //console.log(totalBotones);
        //console.log(cantidad);
        //crearBotonFlotantePorImagen(document.querySelectorAll(todos));
      } else if (cantidad > totalBotones) {
        //crearBotonFlotantePorImagen(todos);
      } else if (totalVideos < cantidad && cantidad === totalBotones) {
        //crearBotonFlotantePorImagen(todos);
        crearBotonFlotantePorImagen(document.querySelectorAll(todos));
      } else {
        observer.disconnect();
      }
      //if (estilo === 'display: none;') {
      //observer.disconnect();
      //}
    }
  }, 2000);
}

function procesarVideosRedgifs() {
  //todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
  setTimeout(() => {
    const elementos = document.querySelectorAll(
      "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem",
    );
    const cantidad = elementos.length;
    const conSrc = [
      ...document.querySelectorAll(
        "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > img",
      ),
    ].filter((img) => {
      const src = img.getAttribute("src");
      return src && src.trim() !== "" && !src.startsWith("data:");
    }).length;
    totalVideos = conSrc;

    const todosBotones = document.querySelectorAll(
      "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > button",
    );
    todosBotones.forEach((botones, index) => {
      totalBotones = index + 1;
    });

    const conSrc2 = [
      ...document.querySelectorAll(
        "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > img",
      ),
    ].filter((img, index) => {
      const src = img.getAttribute("src");
      if (src && src.trim() !== "" && !src.startsWith("data:")) {
        padre = img.parentElement;
        const nombreX = src.split("/").pop().replace("-mobile.jpg", "");
        const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
        nombreVid = nombreX;
        idBoto = index;
        const cantidad1 = (
          JSON.parse(localStorage.getItem("videos_descargados")) || []
        ).length;
        const sumando = cantidad1 + totalBotones;

        //setTimeout(() => {
        if (cantidad >= cantidadInicial && totalVideos < cantidad) {
          crearBotonFlotante(padre, losLink);
          crearNombreFlotante(padre, losLink);
          //console.log("estamos aca linea 155<br>cantidad >= cantidadInicial && totalVideos < cantidad");

          //crearBotonFlotante(padre, losLink);
          //console.log("estamos aca linea 155<br>cantidad >= cantidadInicial && totalVideos < cantidad");
        } else if (totalVideos > totalBotones) {
          crearBotonFlotante(padre, losLink);

          crearNombreFlotante(padre, losLink);
          //console.log("estamos aca linea 158<br>totalVideos > totalBotones");
        } else {
          observer.disconnect();
        }
        //}, 500);
        return (padre, nombreX, losLink, idBoto);
        //}, 500);
      }
      //return src && src.trim() !== "" && !src.startsWith("data:") && padre;
    }).length;
  }, 300);
}

function procesarVideosRedgifs3() {
  //todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
  setTimeout(() => {
    const elementos = document.querySelectorAll(
      "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo > div.TapTracker > div > div.Player-Video video",
    );
    const cantidad = elementos.length;
    const conSrc = [
      ...document.querySelectorAll(
        "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo > div.TapTracker > div > div.Player-Video video",
      ),
    ].filter((img, index) => {
      const src = img.src;
      return src && src.trim() !== "" && !src.startsWith("data:");
    }).length;
    totalVideos = conSrc;

    const todosBotones = document.querySelectorAll(
      "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isActive.GifPreview_isVideo > div.TapTracker > div > div.Player-Video > button",
    );
    todosBotones.forEach((botones, index) => {
      totalBotones = index + 1;
    });

    const conSrc2 = [
      ...document.querySelectorAll(
        "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo > div.TapTracker > div > div.Player-Video video",
      ),
    ].filter((img, index) => {
      const src = img.src;
      if (src && src.trim() !== "" && !src.startsWith("data:")) {
        padre = img.parentElement;
        const nombreX = src.split("/").pop().replace("-mobile.jpg", "");
        const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
        nombreVid = nombreX;
        idBoto = index;
        const cantidad1 = (
          JSON.parse(localStorage.getItem("videos_descargados")) || []
        ).length;
        const sumando = cantidad1 + totalBotones;

        //setTimeout(() => {
        if (cantidad >= cantidadInicial && totalVideos < cantidad) {
          crearBotonFlotante(padre, src);
          crearNombreFlotante(padre, src);
          //console.log("estamos aca linea 155<br>cantidad >= cantidadInicial && totalVideos < cantidad");

          //crearBotonFlotante(padre, losLink);
          //console.log("estamos aca linea 155<br>cantidad >= cantidadInicial && totalVideos < cantidad");
        } else if (totalVideos > totalBotones) {
          crearBotonFlotante(padre, src);

          crearNombreFlotante(padre, src);
          //console.log("estamos aca linea 158<br>totalVideos > totalBotones");
        } else {
          observer.disconnect();
        }
        //}, 500);
        return (padre, nombreX, losLink, idBoto);
        //}, 500);
      }
      //return src && src.trim() !== "" && !src.startsWith("data:") && padre;
    }).length;
  }, 300);
}

function hola() {
  if (fullUrl.includes("/videos")) {
    const todos = document.querySelectorAll(
      "body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div",
    );
    const arr = Array.from(todos);
    const filtrados = arr.filter(
      (el) => !el.textContent.includes("Suscribirse"),
    );
    salteados = arr.length - filtrados.length;
    todos.forEach((botones, index) => {
      idUrl = index;
    });
    //const numeroVideos = document.querySelector('.main-content > div:nth-child(4) > a:nth-child(3)');
    //totalVideos = numeroVideos.textContent.replace(" vídeos", "").trim();
    enlace = fullUrl;
    //console.log(filtrados.length);
    //console.log(`cantidad filtrados linea 184: ${filtrados.length}`);
    const todosBotones = document.querySelectorAll(
      "body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div > button",
    );
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
          mensajeTodos = "Todos";
          //(async () => {
          //enlace = await obtieneLinkLoyalFans(urlFetch, index);
          //console.log(enlace);
          crearBotonFlotante(el, enlace);
          //chrome.runtime.sendMessage({ action: "inject_main_script", url: enlace });
          //})();
          //crearBotonFlotante(el, enlace);
        }
      });
    };

    //console.log(`total videos linea 202: ${totalVideos}`);
    //cantidadInicial = filtrados.length;
    if (cantidadInicial === null || cantidadInicial === 0) {
      const numeroVideos = document.querySelector(
        ".main-content > div:nth-child(4) > a:nth-child(3)",
      );
      totalVideos = numeroVideos.textContent.replace(" vídeos", "").trim();
      tiempo = 2000;
      resolverTiempo(tiempo);
      //console.log(`cantidad inicial linea 196: ${cantidadInicial}`);
    } else {
      if (
        totalVideos > cantidadInicial &&
        cantidadInicial + filtrados.length < totalVideos
      ) {
        agregaBoton();
        //console.log(`agregamos boton porque totalvideos es mayor a la inicial linea 211: ${cantidadInicial}`);
      } else if (totalBotones + salteados < totalVideos) {
        agregaBoton();
        //console.log(`agregamos boton porque totalvideos es mayor a la totalbotones + salteados linea 223: ${cantidadInicial}`);
      } else if (totalBotones + salteados === totalVideos) {
        observer1.disconnect();
        //console.log(`Ciclo terminado, porque botones + salteados igual a todos videos observer desconectado linea 226.`);
      } else if (cantidadInicial + filtrados.length === totalVideos) {
        observer1.disconnect();
        //console.log(`Ciclo terminado, observer desconectado linea 233.`);
      }
    }
    //console.log(`cantidad inicial linea 198: ${cantidadInicial}`);
  }
}

// Observar cambios en el DOM para el scroll infinito
const observer = new MutationObserver(() => {
  if (domain.includes("fapello")) {
    procesarImagenes();
  }
  if (domain.includes("redgifs")) {
    //procesarVideosRedgifs();
  }
  // if (domain.includes(`pornhub`)) {
  //   if (fullUrl.includes(`${userId}/gifs/video`)) {
  //     const cargarMasBtn = document.querySelector('#moreDataBtn'); // selector real
  //     cargarMasBtn.addEventListener('click', procesarVideos);
  //     //procesarVideos();
  //   }
  // }
  if (domain.includes("pornhub")) {
    if (estadoGene) {
      if (fullUrl.includes(`${userId}/gifs/video`)) {
        //const cargarMasBtn = document.querySelector('#moreDataBtn');
        //setTimeout(() => {
        if (cargarMasBtn) {
          // Evitar múltiples registros en scroll infinito:
          if (!cargarMasBtn.dataset.listenerAdded) {
            cargarMasBtn.addEventListener("click", procesarVideos);
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
  //observer.disconnect();
  //console.log('Observer detenido automáticamente después de 7.5minutos');
}, 450000);
//}, 15000);

if (domain.includes("pornhub")) {
  setTimeout(() => {
    tiempo = 500;
    if (fullUrl.includes("pornhub.com/gifs/")) {
      //tiempo = 3000;
    } else if (
      fullUrl.includes(`pornhub.com/model/${userId}/gifs/video`) ||
      fullUrl.includes(`pornhub.com/pornstar/${userId}/gifs/video`)
    ) {
      selector = document.querySelector(".gifsWrapperProfile");
      if (selector) {
        //tiempo = 3500;
        resolverTiempo(tiempo);
      }
    } else if (
      fullUrl.includes(`pornhub.com/model/${userId}/gifs`) ||
      fullUrl.includes(`pornhub.com/pornstar/${userId}/gifs`)
    ) {
      selector = document.querySelector(".gifsWrapperProfile.clearfix");
      if (selector) {
        //tiempo = 2500;
        resolverTiempo(tiempo);
      }
    } else {
      selector = document.querySelector("#js-playWebM");
      if (selector) {
        enlace = document.querySelector("#gifWebmPlayer > source").src;
        //tiempo = 1000;
        resolverTiempo(tiempo);
      } else {
        //tiempo = 5000;
        return;
      }
    }
  }, 500);
} else if (domain.includes("redgifs")) {
  setTimeout(() => {
    selector = document.querySelector('video[class="isLoaded"]');
    //console.log(selector);
    if (selector) {
      tiempo = 1000;
      resolverTiempo(tiempo);
    } else if (intentos < 3) {
      selector = document.querySelector('video[class="isLoaded"]');
      tiempo = 1000;
      resolverTiempo(tiempo);
      intentos += 1;
    } else {
      setTimeout(() => {
        resolverTiempo(tiempo);
      }, 300);
      tiempo = 1000;
    }
  }, 500);
} else if (domain.includes("manyvids")) {
  setTimeout(() => {
    const id = fullUrl.match(/\/Video\/(\d+)\//)[1];
    selector = document.querySelector(
      `#mv-video-player-vid-${id} > div.rmp-content > video`,
    );
    if (selector) {
      tiempo = 500;
      resolverTiempo(tiempo);
    } else if (intentos < 3) {
      //selector = document.querySelector("#mv-video-player-vid-5791941 > div.rmp-content > video");
      tiempo = 500;
      resolverTiempo(tiempo);
      intentos += 1;
    } else {
      tiempo = 500;
    }
  }, 500);
} else if (domain.includes("twpornstars") || domain.includes("pornpics")) {
  tiempo = 2000;
  if (domain.includes("twpornstars")) {
    selector = document.querySelector(
      "body > div.block.block-thumbs.js-thumbs > div.thumb > div.thumb__inner",
    );
    if (selector) {
      tiempo = 1000;
      resolverTiempo(tiempo);
    } else if (intentos < 3) {
      tiempo = 2000;
      resolverTiempo(tiempo);
      intentos += 1;
    }
  } else if (domain.includes("pornpics")) {
    tiempo = 3000;
  }
} else if (domain.includes("fapello")) {
  //userId = fullUrl.split("/")[3];
  const local = new URL(fullUrl);
  const partido = local.pathname.split("/");
  if (
    fullUrl.includes("fapello.com") &&
    !fullUrl.includes("fapello.com/content")
  ) {
    if (partido.length === 4) {
      //if (fullUrl.match(/\d/) && !userId.match(/\d/)) {
      selector = document.querySelector(
        "#wrapper > div.main_content > div > div:nth-child(2) > div > div:nth-child(2) > a > img",
      );
      img.src = selector.src;
      img.onload = () => {
        tiempo = 1500;
        enlace = img.src;
      };
      img.onerror = () => {
        console.error("Error al cargar la imagen");
      };
    } else if (partido.length === 3) {
      tiempo = 2000;
    }
  } else if (fullUrl.includes("fapello.com/content")) {
    selector = document.querySelector("body > img");
    img.src = selector.src;
    img.onload = () => {
      tiempo = 1000;
    };
    img.onerror = () => {
      console.error("Error al cargar la imagen");
    };
  }
} else if (domain.includes("onlyfans")) {
  userId = fullUrl.split("/")[3];
  tiempo = 7000;
} else if (domain.includes("porn4fans") || domain.includes("viralxxxporn")) {
  tiempo = 1000;
  if (domain.includes("porn4fans")) {
    selector = document.querySelector("#player_wrap");
  } else {
    selector = document.querySelector(".player-wrap");
  }
  // selector =
  //   document.querySelector("#player_wrap") ||
  //   document.querySelector(".player-wrap") ||
  //   null;
} else if (domain.includes("loyalfans")) {
  userId = fullUrl.split("/")[3];
  //console.log(userId);
  if (fullUrl.includes("/videos")) {
    //totalVideos = 0;
    //totalVideos = document.querySelector("body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > div.media-filters.ng-star-inserted > a.active.ng-star-inserted");
    //totalVideos = totalVideos.textContent.replace(" vídeos", "").trim();
    //console.log(totalVideos);
    //setTimeout(() => {
    (async function buscacon() {
      //const valorTiempo = await esperarTiempo();
      setTimeout(() => {
        const principal = document.querySelector(".main-content");
        if (principal) {
          //console.log(`sisisisi main-content despues de: ${intentos}`);
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
          //console.log(`aun no, intentando nuevamente: ${intentos + 1}`);
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
  return new Promise((resolve) => {
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
    //console.log(`⏱ crearBoton tardó ${(fin - inicio).toFixed(2)} ms en aparecer`);
    obs.disconnect();
  }
});

// Observar el body antes de llamar a crearBoton
observer2.observe(document.body, { childList: true, subtree: true });

const observer3 = new MutationObserver((mutations, obs) => {
  const botones = document.querySelectorAll(
    "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > div > button",
  );
  encontrados = botones.length;

  if (encontrados >= totalEsperado) {
    const fin = performance.now();
    //console.log(`⏱ Se inyectaron ${encontrados} botones en ${(fin - inicio).toFixed(2)} ms`);
    obs.disconnect();
  }
});

observer3.observe(document.body, { childList: true, subtree: true });

const observer4 = new MutationObserver(async (mutations, obs) => {
  const popup = document.getElementById("mi-popup-extension");
  if (popup) {
    //obs.disconnect(); // Dejar de observar para ahorrar recursos
    const eltexto = document.querySelector("#contador");
    const eltexto2 = eltexto.textContent;
    //console.log(eltexto.textContent);
    if (eltexto.textContent.endsWith("segundos.'")) {
      //console.log('si');
    }
    if (eltexto2) {
      //miFuncionDespuesDelPopup();
      const match = eltexto2.match(/(\d+(\.\d+)?)(?=\s*segundos)/);
      if (match) {
        const segundos = parseFloat(match[1]); // 2.5
        const milisegundos = segundos * 1000; // 2500
        //console.log(`Segundos: ${segundos}, Milisegundos: ${milisegundos}`);
        tiempo = milisegundos;
        demoraBtn = milisegundos;
      } else {
        //console.log("No se encontró el número");
        tiempo = 8000;
      }
      obs.disconnect();
      //resolverTiempo(tiempo);
      await BuscaContenedores();
    }
  }
});

observer4.observe(document.body, { childList: true, subtree: true });

function iniciarObservers() {
  // evitar duplicados
  if (observers.length > 0) return;
  if (fullUrl.includes("redgifs.com/watch")) {
    document
      .querySelectorAll(
        "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo > div.TapTracker > div > div.Player-Video video",
      )
      .forEach((img) => {
        const observer = new MutationObserver(() => {
          const src = img.src;

          //if (src && !src.startsWith("data:")) {
          if (src && src.trim() !== "" && !src.startsWith("data:")) {
            //console.log(src);
            //if (domain.includes('redgifs')) {
            setTimeout(() => {
              procesarVideosRedgifs3();
            }, 800);
            //}
          }
        });

        observer.observe(img, {
          attributes: true,
          attributeFilter: ["src"],
        });

        observers.push(observer);
      });
    procesarVideosRedgifs3();
  } else if (fullUrl.includes(`onlyfans.com/${userId}/videos`)) {
    if (fullUrl.includes(`/${userId}/`)) {
      (async () => {
        const padre = await esperarElemento(".user_posts");
        todos = padre.querySelectorAll(
          ".vue-recycle-scroller__item-wrapper > div > .dynamic-scroller-item > a",
        );
        crearBotonFlotantePorImagen(todos);
      })();
    }
  } else {
    document
      .querySelectorAll(
        "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > img",
      )
      .forEach((img) => {
        const observer = new MutationObserver(() => {
          const src = img.getAttribute("src");

          //if (src && !src.startsWith("data:")) {
          if (src && src.trim() !== "" && !src.startsWith("data:")) {
            //console.log(src);
            if (domain.includes("redgifs")) {
              setTimeout(() => {
                procesarVideosRedgifs();
              }, 800);
            }
          }
        });

        observer.observe(img, {
          attributes: true,
          attributeFilter: ["src"],
        });

        observers.push(observer);
      });
  }

  console.log("Observers iniciados");
}

function detenerObservers() {
  observers.forEach((obs) => obs.disconnect());
  observers = [];
  console.log("Observers detenidos");
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    detenerObservers();
  }, INACTIVITY_TIME);
}

//const main = document.querySelector(".skyWrapper");
// Evento de scroll
//main.addEventListener("scroll", () => {
//console.log("hola");
//iniciarObservers();
//resetInactivityTimer();
//}, true);

document.addEventListener(
  "scroll",
  () => {
    //console.log("hola");
    iniciarObservers();
    resetInactivityTimer();
  },
  true,
);

if (domain.includes("redgifs")) {
  if (fullUrl.includes("redgifs.com/watch")) {
    procesarVideosRedgifs3();
  } else {
    const tagList = document.querySelector(".tagList");
    if (tagList) {
      tagList.addEventListener("click", function (e) {
        const tag = e.target.closest("button"); // ajustá esto al selector real de cada etiqueta

        if (tag) {
          //console.log('Click en:', tag.innerText);
          //setTimeout(() => {
          procesarVideosRedgifs();
          //}, 1500);
          // tu función
          //miFuncion(tag);
        }
      });
    }
  }
}
//function miFuncion(tag) {
//alert('Hiciste click en: ' + tag.innerText);
//}

//document.addEventListener("click", (e) => {
//const tags = e.target.closest("#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.FilterByTag > div");
//});
document.addEventListener("click", (e) => {
  //console.log(e.target);
  //nombreVid = null;
  const tile = e.target.closest(
    "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem",
  );

  if (!tile) return;

  const img = tile.querySelector("img");
  const id = tile.dataset.feedItemId;
  //const botonPlay = document.querySelector('video[class="isLoaded"]');
  //console.log(botonPlay);
  //const padre = tile?.parentElement;
  //console.log(padre);
  //const img = padre.querySelector("img");
  const src = img?.src;
  const nombreX = src.split("/").pop().replace("-mobile.jpg", "");
  const losLink = `https://media.redgifs.com/${nombreX}.mp4`;

  //console.log(`nombre: ${nombreX} link: ${losLink}`);

  setTimeout(() => {
    //const modal = document.querySelector(".Player-OverLayer, .Modal, .videoWrapper, .isLoaded");
    //console.log(modal);
    //selector = e.target.parentElement;
    //console.log(selector);
    idBoto = nombreX;
    mensajeUno = "repro";
    nombreVid = nombreX;
    esperarElementos(".isLoaded", (tiles) => {
      tiles.forEach((tile) => {
        const contenedor = tile.closest(".Player-Video");
        //console.log(contenedor);
        selector = contenedor;
      });
      //console.log("Tiles detectados:", tiles.length);
      //const modal = document.querySelector(".Player-OverLayer, .Modal, .videoWrapper, .isLoaded");
      //selector = e.target;
      //const contenedor = tiles.closest(".Player-Video");
      //console.log(contenedor);
      //console.log(tiles.offsetParent);
      crearBotonFlotante(selector, losLink);
      crearNombreFlotante(selector, losLink);
      //crearBotones();
    });
    //crearBotonFlotante(selector, losLink);
  }, 2000);
  //console.log(img);

  //console.log("ID:", id);
  //console.log("IMG:", img);
  //console.log("SRC:", img?.src);
  //console.log(img.parentElement);
});

document.addEventListener("click", (e) => {
  if (e.target.matches(`button[aria-label="Close video"]`)) {
    //console.log("Se hizo click en cerrar");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    console.log("Se presionó ESC");
    //nombreVid = null;
  }
});
document.addEventListener("click", (e) => {
  const btn = e.target.closest('button[aria-label="Close video"]');

  if (btn) {
    mensajeUno = null;
    //console.log("Se hizo click en cerrar");
    //console.log(mensajeUno);
  }
});
//const start = performance.now();
//(async () => {
async function BuscaContenedores() {
  //console.log(fullUrl);
  const valorTiempo = await esperarTiempo();
  //console.log(valorTiempo);
  setTimeout(() => {
    const url = window.location.toString();
    const nombreTemporal = obtenerNombre(url);
    const nombre = nombreTemporal.split("#")[0];

    if (domain.includes("pornhub")) {
      if (fullUrl.includes("pornhub.com/gif/")) {
        selector = "#js-gifWebMWrapper > gif-video-element > div";
        //selector = "#js-gifToWebm";
        //const enlaceeeee = document.querySelector('#gifWebmPlayer > source').src;
        const enlaceeeee = document.querySelector("#js-gifToWebm").dataset.mp4;
        // Obtener nombre
        //enlace = enlaceeeee.match(/\/([^\/]+)\.webm/i)?.[1];

        // Reemplazar extensión
        enlace = enlaceeeee.replace(".webm", ".mp4");
        //console.log(enlace);
        setTimeout(() => {
          const videosssss = document.querySelector(
            `video[ID="gifWebmPlayer"]`,
          );
          videosssss.controls = true;
          videosssss.muted = false;
        }, 1000);
      } else if (fullUrl.includes("pornhub.com/view_video")) {
        console.log("estamos en view_video");
        selector =
          "#hd-leftColVideoPage > div.topSectionGrid > div.videoWrapModelInfo.original > div.video-wrapper.modelInfo > div";
        enlace = fullUrl;
      } else if (fullUrl.includes("pornhub.com/gifs/")) {
        //console.log(todos2);
        //const todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
        //const todos = document.querySelectorAll("body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li");
        if (!fullUrl.includes("&page=")) {
          crearBotonFlotantePorImagen([...todos2]);
        } else {
          crearBotonFlotantePorImagen([...todos2]);
        }
        //crearBotonFlotantePorImagen(todos);
        return;
      } else if (
        fullUrl.includes(`model/${userId}/gifs/video`) ||
        fullUrl.includes(`pornstar/${userId}/gifs/video`)
      ) {
        //const todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
        const tttodos = document.querySelectorAll(todos);
        //console.log(tttodos);
        cantidadInicial = todos.length;
        crearBotonFlotantePorImagen(tttodos);
        //console.log(cantidadInicial);
        return;
      } else if (
        fullUrl.includes(`pornstar/${userId}/gifs`) ||
        fullUrl.includes(`model/${userId}/gifs`)
      ) {
        //const todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids.gifsOutterWrapperProfile > div.gifsWrapperProfile.clearfix > ul > li");
        //const todos = document.querySelectorAll("#fromVideosGifsSection > li");
        cantidadInicial = todos1.length;
        crearBotonFlotantePorImagen(todos1);
        //console.log(cantidadInicial);
        return;
      } else {
        return;
      }
    } else if (domain.includes("redgifs")) {
      if (fullUrl.includes("redgifs.com/niches")) {
        const conSrc = [
          ...document.querySelectorAll(
            "#root > div > div.Wrapper > div > div.nichePage > div.nichePageWrap > div.nicheGifListContainer > div > div.previewFeed > div.GifPreview.GifPreview_isActive.GifPreview_isVideo.GifPreview_isWithRepost.GifPreview_isVertical > div.TapTracker > div > img",
          ),
        ].filter((img, index) => {
          const src = img.getAttribute("src");
          if (src && src.trim() !== "" && !src.startsWith("data:")) {
            padre = img.parentElement;
            //console.log(padre);
            const nombreX = src.split("/").pop().replace("-mobile.jpg", "");
            const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
            nombreVid = nombreX;
            //console.log(index);
            idBoto = index;
            crearBotonFlotante(padre, losLink);
            crearNombreFlotante(padre, losLink);
          }
          return src && src.trim() !== "" && !src.startsWith("data:") && padre;
        }).length;
        return;
      } else if (fullUrl.includes("redgifs.com/watch")) {
        //setTimeout(() => {
        const botonPlay = document.querySelector('video[class="isLoaded"]');
        //console.log(botonPlay);
        if (botonPlay) {
          extension = ".mp4";
        } else {
          extension = ".jpg";
        }
        //enlace = document.querySelector("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo > div.TapTracker > div > div.Player-Video video").src;
        //padre = document.querySelector("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo > div.TapTracker > div.Player");
        //crearBotonFlotante(padre, enlace);
        //crearNombreFlotante(padre, enlace);
        const conSrc2 = [
          ...document.querySelectorAll(
            "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo > div.TapTracker > div > div.Player-Video video",
          ),
        ].filter((img, index) => {
          const src = img.src;
          console.log(src);
          if (src && src.trim() !== "" && !src.startsWith("data:")) {
            padre = img.parentElement;
            //console.log(padre);
            const nombreX = src.split("/").pop().replace("-mobile.jpg", "");
            const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
            nombreVid = nombreX;
            //console.log(index);
            idBoto = index;
            //crearBotonFlotante(padre, src);
            //crearNombreFlotante(padre, src);
          }
          return src && src.trim() !== "" && !src.startsWith("data:") && padre;
        }).length;
        //selector = `#gif_${nombre}`;
        //const padre1 = document.querySelector("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo.GifPreview_isVertical > div.TapTracker > div > img");
        //const id = padre1.dataset.feedItemId;
        //console.log(obtenerNombre(fullUrl));
        //console.log(padre1);
        //const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
        //enlace = `https://media.redgifs.com/${nombre}${extension}`;
        const conSrc = [
          ...document.querySelectorAll(
            "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div > div.previewFeed > div.GifPreview.GifPreview_isVideo.GifPreview_isVertical > div.TapTracker > div > img",
          ),
        ].filter((img, index) => {
          const src = img.getAttribute("src");
          console.log(src);
          if (src && src.trim() !== "" && !src.startsWith("data:")) {
            padre = img.parentElement;
            //console.log(padre);
            const nombreX = src.split("/").pop().replace("-mobile.jpg", "");
            const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
            nombreVid = nombreX;
            //console.log(index);
            idBoto = index;
            crearBotonFlotante(padre, losLink);
            crearNombreFlotante(padre, losLink);
          }
          return src && src.trim() !== "" && !src.startsWith("data:") && padre;
        }).length;
        //}, 1000);
        return;
      } else if (
        fullUrl.includes("redgifs.com/users") ||
        fullUrl.includes("redgifs.com/gifs")
      ) {
        //console.log(nombre);
        //console.log(fullUrl.split("/")[4]);
        //const todos = document.querySelectorAll("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > a");
        //todos = document.querySelectorAll(todos);
        //crearBotonFlotantePorImagen(todos);
        //const listaDo = document.querySelectorAll(todos);
        //console.log(listaDo);
        const conSrc = [
          ...document.querySelectorAll(
            "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem > img",
          ),
        ].filter((img, index) => {
          const src = img.getAttribute("src");
          if (src && src.trim() !== "" && !src.startsWith("data:")) {
            padre = img.parentElement;
            //console.log(padre);
            const nombreX = src.split("/").pop().replace("-mobile.jpg", "");
            const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
            nombreVid = nombreX;
            //console.log(index);
            idBoto = index;
            crearBotonFlotante(padre, losLink);
            crearNombreFlotante(padre, losLink);
          }
          return src && src.trim() !== "" && !src.startsWith("data:") && padre;
        }).length;

        //console.log(conSrc);

        //totalVideos = conSrc;
        //crearBotonFlotantePorImagen(document.querySelectorAll(todos));
        return;
      } else if (fullUrl.includes("redgifs.com/gifs")) {
        //console.log("si");
        const conSrc = [
          ...document.querySelectorAll(
            "#root > div > div.Wrapper > div > div.skyWrapper > div.middle > div > div > div.TagGifsFeed > div.gifList > div > div.tileFeed > div:nth-child(1)",
          ),
        ].filter((img, index) => {
          const src = img.getAttribute("src");
          if (src && src.trim() !== "" && !src.startsWith("data:")) {
            padre = img.parentElement;
            //console.log(padre);
            const nombreX = src.split("/").pop().replace("-mobile.jpg", "");
            const losLink = `https://media.redgifs.com/${nombreX}.mp4`;
            nombreVid = nombreX;
            //console.log(index);
            idBoto = index;
            crearBotonFlotante(padre, losLink);
            crearNombreFlotante(padre, losLink);
          }
          return src && src.trim() !== "" && !src.startsWith("data:") && padre;
        }).length;
      } else {
        return;
      }
    } else if (domain.includes("twpornstars")) {
      //console.log(domain);
      if (fullUrl.includes("twpornstars.com") && fullUrl.includes("/videos")) {
        const todos = document.querySelectorAll(
          "body > div.block.block-thumbs.js-thumbs > div.thumb > div.thumb__inner",
        );
        crearBotonFlotantePorImagen(todos);
        return;
      } else {
        //selector = "#video_tag";
        selector = "#video_tag";
        enlace = document.querySelector(`${selector} > video > source`).src;
      }
    } else if (fullUrl.includes("manyvids.com/Video")) {
      const id = fullUrl.match(/\/Video\/(\d+)\//)[1];
      //selector = `#mv-video-player-vid-${id} > div.rmp-content`;
      selector = `#mv-video-player-vid-${id}`;
      enlace = document.querySelector(
        `#mv-video-player-vid-${id} > div.rmp-content > video`,
      ).src;
    } else if (
      fullUrl.includes("fapello.com") &&
      !fullUrl.includes("fapello.com/content")
    ) {
      //console.log(fullUrl);
      //console.log(userId);
      if (tieneExtra(fullUrl)) {
        //userId = fullUrl.split("/")[3];
        if (/\d/.test(userId)) {
          const local = new URL(fullUrl);
          const partido = local.pathname.split("/");
          //console.log(partido.length);
          if (partido.length === 3) {
            //if (fullUrl.includes(`fapello.com/${userId}/`) && tieneExtra(fullUrl)) {
            //console.log('estamos aca');
            //const todos = document.querySelectorAll("#content > div");
            cantidadInicial = todos.length;
            crearBotonFlotantePorImagen(todos);
            return;
          } else if (partido.length === 4) {
            //(fullUrl.match(/\d/) && userId.match(/\d/)) {
            //console.log('estamos aca');
            selector =
              "#wrapper > div.main_content > div > div:nth-child(2) > div > div.flex.justify-between.items-center.p-5.border-b";
            enlace = document.querySelector(
              "#wrapper > div.main_content > div > div:nth-child(2) > div > div:nth-child(2) > a > img",
            )?.src;
          }
        } else {
          if (fullUrl.match(/\d/)) {
            //&& !userId.match(/\d/)) {
            //console.log('estamos aca');
            //checkUrl(fullUrl);
            selector =
              "#wrapper > div.main_content > div > div:nth-child(2) > div > div.flex.justify-between.items-center.p-5.border-b";
          } else {
            //const todos = document.querySelectorAll("#content > div");
            cantidadInicial = todos.length;
            crearBotonFlotantePorImagen(todos);
            return;
          }
        }
      } else {
        return;
      }
    } else if (
      fullUrl.includes("porn4fans.com/video") ||
      fullUrl.includes("viralxxxporn.com/es/video")
    ) {
      if (domain.includes("porn4fans")) {
        selector = "#player_wrap";
      } else {
        selector = ".player-wrap";
      }
      //selector = "#player_wrap" || ".player-wrap" || null;
      enlace = document.querySelector("#kt_player > div.fp-player > video").src;
      //crearBotonFlotante(selector, enlace);
      console.log(enlace);
      console.log(selector);
    } else if (fullUrl.includes("fapello.com/content")) {
      cantidadInicial = 1;
      selector = "body";
      enlace = fullUrl;
    } else if (fullUrl.includes("redditp.com/u")) {
      cantidadInicial = 1;
      const lklk = document.querySelector("#root > div > div > div > div");
      //console.log(lklk);
      selector = "#root > div > div > div > div";
      enlace = fullUrl;
      crearBotonFlotante(lklk, enlace);
    } else if (fullUrl.includes("pornpics.com/galleries")) {
      //const todos = document.querySelectorAll("#tiles > li");
      crearBotonFlotantePorImagen(todos);
      return;
    } else if (fullUrl.includes("onlyfans")) {
      if (
        fullUrl.includes(`/${userId}`) &&
        !fullUrl.includes(`/${userId}/videos`)
      ) {
        selector = ".video-trigger > div";
        const img = document.querySelectorAll("source")[2];
        const url = img.src;
        enlace = url;
      } else if (fullUrl.includes(`/${userId}/`)) {
        (async () => {
          const padre = await esperarElemento(".user_posts");
          todos = padre.querySelectorAll(
            ".vue-recycle-scroller__item-wrapper > div > .dynamic-scroller-item > a",
          );
          crearBotonFlotantePorImagen(todos);
        })();
        // esperarElementos(".user_posts", (tiles) => {
        //   tiles.forEach((tile) => {
        //     const contenedor = tile.closest(".dynamic-scroller-item > a");
        //     //console.log(contenedor);
        //     selector = contenedor;
        //   });
        //   //console.log("Tiles detectados:", tiles.length);
        //   //const modal = document.querySelector(".Player-OverLayer, .Modal, .videoWrapper, .isLoaded");
        //   //selector = e.target;
        //   //const contenedor = tiles.closest(".Player-Video");
        //   //console.log(contenedor);
        //   //console.log(tiles.offsetParent);
        //   //crearBotonFlotante(selector, losLink);
        //   //crearNombreFlotante(selector, losLink);
        //   crearBotonFlotantePorImagen(selector);
        //   //crearBotones();
        // });
        //crearBotonFlotantePorImagen(todos);
        return;
      }
    } else if (fullUrl.includes("pornpics")) {
      cantidadInicial = 1;
      selector = "body";
      enlace = fullUrl;
    } else if (domain.includes("loyalfans")) {
      if (fullUrl.includes("/videos")) {
        const urlFetch = `https://www.loyalfans.com/api/v2/social/videos/${userId}?ngsw-bypass=true`;
        const todos = document.querySelectorAll(
          "body > app-root > div > div.app-container_left > app-model-public > div > div > div.left-content-wrapper > div > app-videos > div > div",
        );
        const arr = Array.from(todos);
        const filtrados = arr.filter(
          (el) => !el.textContent.includes("Suscribirse"),
        );
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
            mensajeTodos = "Todos";
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
    const contenedor = document.querySelector(selector);
    console.log(contenedor);
    if (contenedor) {
      if (demoraBtn) {
        crearBotonFlotante(contenedor, enlace);
      }
      crearBotonFlotante(contenedor, enlace);
    } else if (intentos < 3) {
      console.warn(
        `No se encontró el contenedor todavía, reintentando: ${intentos + 1}`,
      );
      BuscaContenedores();
      intentos += 1;
    } else {
      console.warn(
        `No se encontró el contenedor despues de ${intentos} intentos.`,
      );
    }
  }, valorTiempo); // espera 5 segundos
}
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
