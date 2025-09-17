// background.js
//importScripts("funciones.js");

let lastDir = '';
let poraca = '';

chrome.commands.onCommand.addListener((command) => {
  console.log("Comando recibido:", command);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab) return;

    switch (command) {
      case "inject_main_script":
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["/common/content.js"],
        });
        break;

      case "inject_main_script-fansly":
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["/fansly/content.js"],
        });
        break;

      case "inject_main_script-twitter":
        if (!tab.url.includes("x.com/")) {
          console.warn("No estás en un tweet de X.");
          return;
        }
        const tweetUrl = tab.url;
        chrome.tabs.create({ url: "https://xdownloader.com/es" }, (newTab) => {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            func: (url) => sessionStorage.setItem("tweetUrl", url),
            args: [tweetUrl],
          });
        });
        break;
    }
  });
});



// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["content.js"]
//   });
// });

// Cargar carpeta guardada al iniciar
chrome.storage.local.get("lastDir", (data) => {
  if (data.lastDir) lastDir = data.lastDir;
  poraca = lastDir;
  console.log("Carpeta cargada al iniciar:", lastDir);
});

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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("redgifs.com/watch/") || tab.url && tab.url.includes("pornhub.com/gif/")
  || tab.url && tab.url.includes("twpornstars.com/") || tab.url && tab.url.includes("manyvids.com/Video/") || tab.url && tab.url.includes("fapello.com/") || tab.url && tab.url.includes("fansly.com/")|| tab.url && tab.url.includes("x.com/")) {
    chrome.action.enable(tabId);
  } else {
    chrome.action.disable(tabId);
  }
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "inject_main_script3" && sender.tab) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["/common/content.js"]   // tu script pesado solo se carga cuando tocas el botón
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "inject_main_script" && sender.tab) {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ["/common/content.js"],
      },
      () => {
        if (msg.url) {
          // Enviar la URL solo cuando sabemos que content.js ya está cargado
          chrome.tabs.sendMessage(sender.tab.id, {
            action: "procesar_url",
            url: msg.url,
          });
        } else {
          console.log("Script inyectado sin URL, no se envía procesar_url");
        }
      }
    );
  }
  if (msg.action === "inject_main_script-fansly" && sender.tab) {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ["/fansly/content.js"],
      },
      () => {
        if (msg.url) {
          // Enviar la URL solo cuando sabemos que content.js ya está cargado
          chrome.tabs.sendMessage(sender.tab.id, {
            action: "procesar_url",
            url: msg.url,
          });
        } else {
          console.log("Script inyectado sin URL, no se envía procesar_url");
        }
      }
    );
  }
  //if (msg.action === "abrir_xdownloader") {
  if (msg.action === "inject_main_script-twitter") {
    // Validar URL
    if (!msg.url.includes("x.com/")) {
      sendResponse({ status: "error", message: "No estás en un tweet de X." });
      return;
    }

    const tweetUrl = msg.url;

    chrome.tabs.create({ url: "https://xdownloader.com/es" }, (newTab) => {
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        func: (url) => {
          sessionStorage.setItem("tweetUrl", url);
        },
        args: [tweetUrl],
      });
    });

    sendResponse({ status: "ok" });
  }
  if (msg.action === "updateCookie") {
    chrome.cookies.set({
      url: msg.url,
      name: msg.cookieName,
      value: msg.cookieValue,
      path: "/"
    }, () => sendResponse({ status: "ok" }));
    return true; // asincrónico
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

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.includes("x.com/")) {
      //alert("No estás en un tweet de X.");
      //return;
    //}
    // Guardamos la URL del tweet en sessionStorage del navegador
    const tweetUrl = tab.url;
    // Abrimos xdownloader
    chrome.tabs.create({ url: "https://xdownloader.com/es" }, (newTab) => {
      // Esperamos a que cargue y le pasamos la URL del tweet
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        func: (url) => {
          sessionStorage.setItem("tweetUrl", url);
        },
        args: [tweetUrl]
      });
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["/common/content.js"]
    });
  }
});