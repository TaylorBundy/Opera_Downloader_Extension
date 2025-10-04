// /common/estadoExtension.js
// Esta función queda disponible en window para que cualquier script pueda usarla
window.verificarEstadoExtension = function () {
    return new Promise((resolve) => {
      const url = window.location.origin;
      const domain = window.location.hostname;
  
      chrome.runtime.sendMessage(
        { action: "getEstadoExtension", url, domain },
        (response) => {
          if (!response) {
            console.warn("No se recibió respuesta del background");
            resolve(true); // por defecto activo
            return;
          }
          resolve(response.activo);
        }
      );
    });
  };
  