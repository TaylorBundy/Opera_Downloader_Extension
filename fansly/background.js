// Listener que se activa cuando se crea cualquier descarga
chrome.downloads.onCreated.addListener((item) => {
  // Detectar separador de ruta según SO
  const sep = item.filename.includes("\\") ? "\\" : "/";

  // Obtener carpeta de la descarga
  const currentDir = item.filename.substring(0, item.filename.lastIndexOf(sep));

  // Guardar en storage local
  chrome.storage.local.set({ currentDir });
  lastDir = currentDir;

  // Log para depuración
  console.log("Descarga creada:", item.filename);
  console.log("Última carpeta usada:", lastDir);
});

// Listener que se activa cuando cambia el estado de una descarga
// (opcional, útil si quieres asegurarte de capturar descargas completadas)
chrome.downloads.onChanged.addListener((delta) => {
  if (delta.state && delta.state.current === "complete") {
    chrome.downloads.search({ id: delta.id }, (results) => {
      if (results.length > 0) {
        const item = results[0];
        const sep = item.filename.includes("\\") ? "\\" : "/";
        const lastDir = item.filename.substring(0, item.filename.lastIndexOf(sep));
        console.log("Descarga completada:", item.filename);
        console.log("Última carpeta usada:", lastDir);        
        chrome.storage.local.set({ lastDir });
      }
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  });

  chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.action === "inject_main_script" && sender.tab) {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        files: ["content.js"]   // tu script pesado solo se carga cuando tocas el botón
      });
    }
    if (msg.action === "descargar") {
      chrome.downloads.download(
        {
          url: msg.url,
          //filename: msg.nombre,
          //filename: msg.nombre,
          saveAs: true // fuerza mostrar "Guardar como"
        },
        (downloadId) => {
          console.log("Download ID:", downloadId);
          
          sendResponse({
            last: poraca,
            nombre: msg.nombre,
            id: downloadId
          })
        }
      );
      return true; // mantiene el canal abierto para sendResponse
    }
  });