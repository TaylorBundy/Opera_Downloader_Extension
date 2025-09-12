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
  
// Observar cambios en el DOM para el scroll infinito
const observer = new MutationObserver(() => {
  procesarImagenes();
});
  
observer.observe(document.body, { childList: true, subtree: true });
    
if (domain.includes('pornhub')) {
    setTimeout(() => {
      if (fullUrl.includes('pornhub.com/gifs/')) {
        tiempo = 3000;
      } else {
      selector = document.querySelector("#js-playWebM");
      if (selector) {
        enlace = document.querySelector('#gifWebmPlayer > source').src;
        tiempo = 1000;
        resolverTiempo(tiempo);
      } else {
        tiempo = 5000;
      }
    }
    }, 1000);
} else if (domain.includes('redgifs')) {
    setTimeout(() => {
      selector = document.querySelector('video[class="isLoaded"]');
      if (selector) {
        tiempo = 2000;
      } else {
        tiempo = 5000;
      }
    }, 2000);
} else if (domain.includes('manyvids')) {
  tiempo = 3000;
} else if (domain.includes('twpornstars')) {
    tiempo = 3000;
} else if (domain.includes('fapello')) {
  if (fullUrl.includes('fapello.com') && !fullUrl.includes('fapello.com/content')) {
    if (fullUrl.match(/\d/)) {
      selector = document.querySelector("#wrapper > div.main_content > div > div:nth-child(2) > div > div:nth-child(2) > a > img");
      img.src = selector.src;
      img.onload = () => {
        tiempo = 1500;
        enlace = img.src;
      };
      img.onerror = () => {
        console.error('Error al cargar la imagen');
      };
    } else {
      tiempo = 3000;
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

//(async () => {
(async function BuscaContenedores (){
  const valorTiempo = await esperarTiempo();
  setTimeout(() => {
    const url = window.location.toString();
    const nombreTemporal = obtenerNombre(url);
    const nombre = nombreTemporal.split("#")[0];    
    
    if (fullUrl.includes('pornhub.com/gif/')) {
        selector = "#js-gifWebMWrapper > gif-video-element > div";
    } else if (fullUrl.includes('pornhub.com/gifs/')) {
      const todos = document.querySelectorAll("body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li > a");
      crearBotonFlotantePorImagen(todos);
      return
    } else if (domain.includes('redgifs')) {
        selector = `#gif_${nombre}`;
        enlace = `https://media.redgifs.com/${nombre}.mp4`;
    } else if (domain.includes('twpornstars')) {
      if (fullUrl.includes('twpornstars.com') && fullUrl.includes('/videos')) {
        const todos = document.querySelectorAll("body > div.block.block-thumbs.js-thumbs > div.thumb > div.thumb__inner");
        crearBotonFlotantePorImagen(todos);
        return
      } else {
        selector = "#video_tag";
        enlace = document.querySelector(`${selector} > video > source`).src;
      }
    } else if (fullUrl.includes('manyvids.com/Video')) {
      const id = fullUrl.match(/\/Video\/(\d+)\//)[1];
      selector = `#mv-video-player-vid-${id} > div.rmp-content`;
      enlace = document.querySelector(`#mv-video-player-vid-${id} > div.rmp-content > video`).src;
    } else if (fullUrl.includes('fapello.com') && !fullUrl.includes('fapello.com/content')) {
      if (fullUrl.match(/\d/)) {
        selector = "#wrapper > div.main_content > div > div:nth-child(2) > div > div.flex.justify-between.items-center.p-5.border-b";
      } else {
        const todos = document.querySelectorAll("#content > div");
        cantidadInicial = todos.length;
        crearBotonFlotantePorImagen(todos);
        return
      }
    } else if (fullUrl.includes('fapello.com/content')) {
        cantidadInicial = 1;
        selector = "body";
        enlace = fullUrl;
    }
    const contenedor = document.querySelector(
        selector
    );
    if (contenedor) {
      crearBotonFlotante(contenedor, enlace);
    } else if (intentos < 3) {
      console.warn(`No se encontró el contenedor todavía, reintentando: ${intentos + 1}`);
      BuscaContenedores();
      intentos =+ 1;
    } else {
      console.warn(`No se encontró el contenedor despues de ${intentos}.`);
    }
  }, valorTiempo); // espera 5 segundos
})();
//BuscaContenedores();
