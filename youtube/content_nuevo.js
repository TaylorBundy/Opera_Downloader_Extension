// Escuchar mensajes del popup para activar/desactivar en vivo
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "toggleExtension" && msg.domain === location.hostname) {
    if (msg.enabled) {
      console.log("✅ Extensión activada en", msg.domain);
      iniciarExtension();
    } else {
      console.log("🚫 Extensión desactivada en", msg.domain);
      desactivarExtension();
    }
  }
});

let observer = null;

// Funcion que chequea si el servidor local esta activo.
async function checkServer(url = "http://127.0.0.1:5000/ping", timeout = 2000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(false), timeout);
    fetch(url)
      .then((res) => {
        clearTimeout(timer);
        resolve(res.ok); // true si responde 200-299
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(false);
      });
  });
}

// Funcion que obtiene resoluciones.
function ObtenerResoluciones2(enlace, select) {
  fetch("http://127.0.0.1:5000/resoluciones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: enlace }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "ok") {
        select.innerHTML = data.resoluciones
          .map((r) => `<option value="${r.replace("p", "")}">${r}</option>`)
          .join("");
        select.disabled = false;
      } else {
        select.innerHTML = `<option>Error</option>`;
      }
    });
}

function ObtenerResoluciones3(enlace, select) {
  console.log("🔎 Solicitando resoluciones:", enlace);

  select.disabled = true;

  select.innerHTML = `
        <option value="">
            ⏳ Buscando resoluciones...
        </option>
    `;

  chrome.runtime.sendMessage(
    {
      action: "obtener_resoluciones",
      url: enlace,
    },
    (data) => {
      if (chrome.runtime.lastError) {
        console.error("❌ Error extension:", chrome.runtime.lastError.message);

        select.innerHTML = `
                    <option value="">
                        ❌ Error de comunicación
                    </option>
                `;

        return;
      }

      console.log("📦 Respuesta:", data);

      if (!data || data.status !== "ok") {
        select.innerHTML = `
                    <option value="">
                        ❌ ${data?.error || "Error"}
                    </option>
                `;

        return;
      }

      if (!Array.isArray(data.resoluciones) || data.resoluciones.length === 0) {
        select.innerHTML = `
                    <option value="">
                        No hay resoluciones
                    </option>
                `;

        return;
      }

      select.innerHTML = data.resoluciones
        .map((r) => {
          const valor = r.replace("p", "");

          return `
                        <option value="${valor}">
                            ${r}
                        </option>
                    `;
        })
        .join("");

      select.disabled = false;

      console.log("✅ Resoluciones cargadas");
    },
  );
}

async function ObtenerResoluciones(enlace, select) {
  console.log("🔎 Obteniendo resoluciones para:");
  console.log(enlace);

  if (!enlace) {
    console.error("❌ No se proporcionó enlace");

    select.innerHTML = `
            <option value="">Sin URL</option>
        `;

    select.disabled = true;
    return;
  }

  select.disabled = true;

  select.innerHTML = `
        <option value="">⏳ Buscando resoluciones...</option>
    `;

  try {
    const respuesta = await fetch("http://127.0.0.1:5000/resoluciones", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        url: enlace,
      }),
    });

    console.log("📡 Estado HTTP:", respuesta.status);

    const data = await respuesta.json();

    console.log("📦 Respuesta backend:", data);

    if (!respuesta.ok) {
      throw new Error(data.error || `Error HTTP ${respuesta.status}`);
    }

    if (data.status !== "ok") {
      throw new Error(data.error || "El backend devolvió un error");
    }

    if (!Array.isArray(data.resoluciones) || data.resoluciones.length === 0) {
      select.innerHTML = `
                <option value="">
                    No se encontraron resoluciones
                </option>
            `;

      select.disabled = true;

      return;
    }

    select.innerHTML = data.resoluciones
      .map((resolucion) => {
        const valor = resolucion.replace("p", "");

        return `
                    <option value="${valor}">
                        ${resolucion}
                    </option>
                `;
      })
      .join("");

    select.disabled = false;

    console.log("✅ Resoluciones cargadas:", data.resoluciones);
  } catch (error) {
    console.error("❌ Error obteniendo resoluciones:", error);

    select.innerHTML = `
            <option value="">
                ❌ Error al obtener resoluciones
            </option>
        `;

    select.disabled = true;
  }
}

// 🔹 Función para inyectar el botón flotante
function crearBotonFlotante(contenedor, enlace) {
  if (document.getElementById("mi-boton-flotante")) return;

  const wrapper = document.createElement("div");
  wrapper.id = "mi-boton-flotante";
  wrapper.style.position = "absolute";
  wrapper.style.top = "10px";
  wrapper.style.right = "10px";
  wrapper.style.zIndex = "9999";
  wrapper.style.background = "red";
  wrapper.style.padding = "8px";
  wrapper.style.borderRadius = "6px";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.alignItems = "center";

  const nombree =
    document.querySelector("#title > h1 > yt-formatted-string")?.textContent ||
    "video";

  // Botón de descarga
  const boton = document.createElement("button");
  boton.innerText = "📥 Descargar con yt-dlp";
  boton.style.color = "white";
  boton.style.background = "darkred";
  boton.style.border = "none";
  boton.style.padding = "6px 10px";
  boton.style.borderRadius = "4px";
  boton.style.cursor = "pointer";

  // Select para resoluciones
  const select = document.createElement("select");
  select.id = "select-resoluciones";
  select.style.marginTop = "5px";
  select.style.padding = "4px";
  select.style.borderRadius = "4px";
  select.disabled = true;

  // Verificar si server esta activo.
  checkServer().then((serverUp) => {
    if (serverUp) {
      // si activo, obtiene resoluciones.
      console.log("Servidor activo, podemos pedir resoluciones.");
      ObtenerResoluciones(enlace, select);
    } else {
      // sino pone offline.
      select.innerHTML = `<option>Servidor offline</option>`;
      console.log("Servidor inactivo.");
    }
  });

  // fetch("http://127.0.0.1:5000/resoluciones", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ url: enlace })
  // })
  // .then(res => res.json())
  // .then(data => {
  //   if (data.status === "ok") {
  //     select.innerHTML = data.resoluciones
  //       .map(r => `<option value="${r.replace("p", "")}">${r}</option>`)
  //       .join("");
  //     select.disabled = false;
  //   } else {
  //     select.innerHTML = `<option>Error</option>`;
  //   }
  // });

  boton.addEventListener("click", () => {
    const resolucion = select.value || "360";
    chrome.runtime.sendMessage(
      { action: "download_video", url: enlace, nombre: nombree, resolucion },
      (response) => {
        console.log("Respuesta del servidor:", response);
      },
    );
  });

  wrapper.appendChild(boton);
  wrapper.appendChild(select);
  contenedor.appendChild(wrapper);
}

// 🔹 Procesar video principal
//   function procesarVideoPrincipal() {
//     const player = document.querySelector("#movie_player");
//     const video = document.querySelector("video.html5-main-video");

//     if (player && video) {
//       //const enlace = window.location.href;
//       enlace = window.location.href;
//       crearBotonFlotante(player, enlace);
//     }
//   }

function procesarVideoPrincipal(reintentos = 5) {
  const player = document.querySelector("#movie_player");
  const video = document.querySelector("video.html5-main-video");

  if (player && video) {
    const enlace = window.location.href;
    crearBotonFlotante(player, enlace);
  } else if (reintentos > 0) {
    console.log("⏳ Esperando que cargue el player...");
    setTimeout(() => procesarVideoPrincipal(reintentos - 1), 1000);
  }
}

// 🔹 Iniciar extensión si está habilitada
function iniciarExtension() {
  if (observer) {
    procesarVideoPrincipal();
    observer.disconnect();
  }

  observer = new MutationObserver(() => {
    //estado = true;
    procesarVideoPrincipal();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  procesarVideoPrincipal();
}

// 🔹 Desactivar extensión
function desactivarExtension() {
  document.querySelectorAll("#mi-boton-flotante").forEach((b) => b.remove());
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

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

//   (function() {
//     //const domain = window.location.hostname;
//     const url = window.location.origin;
//     //console.log(domain, url);
//     chrome.runtime.sendMessage(
//       { action: "getEstadoExtension", url, domain },
//       (response) => {
//         if (!response) {
//           console.warn("No se recibió respuesta del background");
//           //estado = true;
//           return;
//         }

//         if (response.activo) {
//           console.log("✅ Extensión activa en", domain);
//           // aquí inyectás botones normalmente
//           // procesarImagenes();
//           iniciarExtension();
//           //estado = true;
//         } else {
//           console.log("⛔ Extensión desactivada en", domain);
//           //estado = false;
//           // aquí bloqueás la inyección
//         }
//       }
//     );
//   })();
