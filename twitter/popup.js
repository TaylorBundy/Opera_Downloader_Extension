// Al inicio de popup.js
// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     // Obtener la pestaña activa
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     if (!tab || !tab.id) {
//       console.error("❌ No se pudo obtener la pestaña activa.");
//       return;
//     }

//     // Ejecutar código directamente en la pestaña
//     await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => {
//         console.log("✅ Script ejecutado automáticamente al abrir el popup.");
//         alert("¡Hola! Esto se ejecutó automáticamente al abrir el popup 🚀");
//       },
//     });
//   } catch (err) {
//     console.error("⚠️ Error ejecutando script:", err);
//   }
// });

// (async () => {
//   const activo = await window.verificarEstadoExtension();

//   if (activo) {
//     console.log("✅ Extensión activa");
//     //iniciarExtension(); // tu lógica normal
//     estado = true;
//     //BuscaContenedores();
//     return true;
//   } else {
//     estado = false;
//     console.log("⛔ Extensión desactivada, no hago nada");
//     return;
//   }
// })();

let estadoTwitter = true;

if (location.hostname === "x.com" && location.pathname.includes("home")) {
  // No ejecutar el resto del script
  console.log("Popup deshabilitado en x.com/home");
} else {
  // Tu código normal aquí
  (() => {
    // (async () => {
    //   const estado1 = await obtenerEstado(null, location.hostname, location.href);
    //   //console.log("Estado recibido:", estado1);
    //   if (estado1.activo) {
    //     //console.log("✅ La extensión está activa");
    //     //chrome.runtime.sendMessage({ action: "popupClosed" });
    //     estado = true;
    //   } else {
    //     //console.log("🚫 La extensión está desactivada");
    //     estado = false;
    //   }
    // })();
    if (document.getElementById("mi-popup-extension")) return;
    
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
    img.style.height = "100%"
    img.style.right = "0";
    img.style.padding = "5px 5px";
    img.style.background = "#333";
    img.style.color = "#fff";
    img.style.borderRadius = "8px";
    img.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
    img.style.zIndex = "8";
    img.style.fontSize = "14px";
    img.src = logo;
    img.style.opacity = "0.2";
    const texto  = document.createElement("span");
    texto.id = "contador";
    let segundos;
    console.log(estadoTwitter);
    //texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa:<br>lista para descargar (${domain}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+G".!'`;
    if (!estadoTwitter) {
      segundos = 10000;
      texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!<br>Tiempo restante: ${(segundos / 1000).toFixed(1)} segundos.'`;
      mensaje = `'✨ Extensión "Descarga_Multi_Sitio" Desactivada temporalmente en: (${domain}).<br>Para habilitar nuevamente la extensión, presione: "Ctrl+Shift+V".!'`;
      mensaje2 = `Temporalmente deshabilitado.!'`;
      //mensaje2 = `Tiempo restante: ${(segundos / 1000).toFixed(1)} segundos.'`;
    } else {
      segundos = 3000;
      //texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa:<br>lista para descargar (${domain}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+G".!'`;
      //mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa:<br>lista para descargar (${domain}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+G".!'`;
      //mensaje2 = `Boton cargado.!'`;
      texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${domain}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!<br>Tiempo estimado para cargar boton: ${segundos / 1000} segundos.<br>Tiempo restante: ${segundos / 1000} segundos.'`;
      mensaje = `'✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>listo para descargar: (${domain}).<br>Si no aparece el boton de descarga, presione: "Ctrl+Shift+H".!'`;
      mensaje2 = `Boton cargado.!'`;
      TiempoCuentaRegresiva = 1500;
    }
    texto.style.zIndex = "9";
    texto.style.textAlign = "left";
    popup.appendChild(img);
    popup.appendChild(texto);
    popup.insertBefore(img, texto);
    document.body.appendChild(popup);
    const texto1 = document.getElementById("contador"); // tu elemento
    setTimeout(() => {
      //texto.innerHTML = mensaje;
      //iniciarCuentaRegresiva(texto1, segundos, mensaje, mensaje2, domain);
      iniciarCuentaRegresiva(texto1, segundos, mensaje, mensaje2, estadoTwitter, domain, () => {
        console.log("✅ La cuenta regresiva llegó a 0.");
        setTimeout(() => {
          popup.remove();
          chrome.runtime.sendMessage({ action: "popupClosed" });
          // if (domain.includes('youtube')) {
          //   if (estado) {
          //     console.log(`estado: ${estado}`);
          //     chrome.runtime.sendMessage({ action: "popupClosed" });
          //   }
          // } else {
          //   chrome.runtime.sendMessage({ action: "injectar" });
          // }
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
    //const texto1 = document.getElementById("contador"); // tu elemento
    // Después de agregar al DOM, enviamos mensaje al content script
    //chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      //if (!tab?.id) return;

      // chrome.runtime.sendMessage({
      //   action: "iniciarCuentaRegresiva",
      //   idElemento: texto1.id,
      //   msTotales: segundos,
      //   mensaje: mensaje, //'✨ Extensión "Descarga_Multi_Sitio" activa',
      //   mensaje2: mensaje2, //'✅ Botones cargados correctamente',
      //   domain: domain
      // });
    //});
    //const texto1 = document.getElementById("contador"); // tu elemento
    // funciones.js (content script)
    // popup.js
    //document.getElementById("btnCuentaRegresiva").addEventListener("click", () => {
      // setTimeout(() => {
      //   return new Promise((resolve) => {
      //     chrome.runtime.sendMessage(
      //       { action: "iniciarCuentaRegresiva",
      //       msTotales: segundos, // ejemplo: 5 segundos
      //       //mensaje: "✨ Extensión activa",
      //       mensaje: mensaje,
      //       //mensaje2: "⏱ Botones cargados!",
      //       mensaje2: mensaje2,
      //       domain: ""},//tabs[0].url ? new URL(tabs[0].url).hostname : "" },
      //       (response) => resolve(response)
      //     );
      //   });
      // }, TiempoCuentaRegresiva);

      // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //   if (tabs[0]?.id) {
      //     chrome.tabs.sendMessage(
      //       tabs[0].id,
      //       {
      //         action: "iniciarCuentaRegresiva",
      //         msTotales: segundos, // ejemplo: 5 segundos
      //         //mensaje: "✨ Extensión activa",
      //         mensaje: mensaje,
      //         //mensaje2: "⏱ Botones cargados!",
      //         mensaje2: mensaje2,
      //         domain: tabs[0].url ? new URL(tabs[0].url).hostname : ""
      //       },
      //       (response) => {
      //         console.log("Respuesta content:", response);
      //       }
      //     );
      //   }
      // });
    //});


    // setTimeout(() => {
    //   iniciarCuentaRegresiva(texto1, segundos, mensaje, mensaje2, domain, () => {
    //     console.log("✅ La cuenta regresiva llegó a 0.");
    //     setTimeout(() => {
    //       popup.remove();
    //       //if (domain.includes('youtube')) {
    //         if (estado) {
    //           console.log(`estado: ${estado}`);
    //           chrome.runtime.sendMessage({ action: "popupClosed" });
    //         }
    //     }, elTiempo);
    //   });
    // }, TiempoCuentaRegresiva);
    // Hacer que desaparezca después de 8 segundos
    setTimeout(() => {
      popup.remove();
      //chrome.runtime.sendMessage({ action: "popupClosed" });
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
//   try {
//     // Obtener pestaña activa
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     if (!tab?.id || !tab?.url) {
//       console.warn("No se encontró pestaña activa o URL inválida");
//       return;
//     }

//     // Preparar datos del mensaje
//     const domain = new URL(tab.url).hostname;

//     // Enviar mensaje al content script
//     chrome.tabs.sendMessage(
//       tab.id,
//       {
//         action: "iniciarCuentaRegresiva",
//         msTotales: 8000, // tiempo total (ms)
//         mensaje: `✨ Extensión "Descarga_Multi_Sitio" activa en: (${domain})<br>
//                   Si no aparece el botón de descarga, espere unos segundos.`,
//         mensaje2: "✅ Botones cargados correctamente.",
//         domain
//       },
//       (response) => {
//         if (chrome.runtime.lastError) {
//           console.warn("⚠️ No se pudo enviar mensaje (el content script no está cargado aún).");
//         } else {
//           console.log("📨 Respuesta del content script:", response);
//         }
//       }
//     );
//   } catch (e) {
//     console.error("Error al iniciar cuenta regresiva:", e);
//   }
// });

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const texto1 = document.getElementById("contador"); // tu elemento

    if (!tab?.id) {
      console.error("❌ No se encontró pestaña activa.");
      return;
    }

    // Enviar mensaje al content script (funciones.js)
    chrome.tabs.sendMessage(
      tab.id,
      {
        action: "iniciarCuentaRegresiva",
        idElemento: texto1.id,
        msTotales: segundos,
        mensaje: mensaje,//"✨ Extensión activa en esta página.",
        mensaje2: mensaje2,//"Botones cargados con éxito.",
        domain: domain//new URL(tab.url).hostname,
      },
      (response) => {
        console.log("📩 Respuesta desde funciones.js:", response);
      }
    );

  } catch (error) {
    console.error("⚠️ Error al enviar mensaje:", error);
  }
});

(async () => {
  const activo = await window.verificarEstadoExtension();

  if (activo) {
    console.log("✅ Extensión activa");
    //iniciarExtension(); // tu lógica normal
    estadoTwitter = true;
    //await BuscaContenedores();
  } else {
    estadoTwitter = false;
    console.log("⛔ Extensión desactivada, no hago nada");
    return;
  }
})();