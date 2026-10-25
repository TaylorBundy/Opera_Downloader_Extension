// background.js optimizado
let lastDir = "";
let poraca = "";
let userId;
let idFoto;
let domain;
// let estado = null;
// let host = null;
// --- Íconos por dominio ---
const ICONS = {
  twitter: { 16: "/icons/Twitter16.png", 48: "/icons/Twitter48.png" },
  fansly: { 16: "/icons/Fansly16.png", 48: "/icons/Fansly48.png" },
  onlyfans: { 16: "/icons/Onlyfans16.png", 48: "/icons/Onlyfans48.png" },
  redgifs: { 16: "/icons/Redgifs16.png", 48: "/icons/Redgifs48.png" },
  pornhub: { 16: "/icons/Pornhub16.png", 48: "/icons/Pornhub48.png" },
  twpornstars: {
    16: "/icons/Twpornstars16.png",
    48: "/icons/Twpornstars48.png",
  },
  manyvids: { 16: "/icons/Manyvids16.png", 48: "/icons/Manyvids48.png" },
  fapello: { 16: "/icons/Fapello16.png", 48: "/icons/Fapello48.png" },
  pornpics: { 16: "/icons/Pornpics16.png", 48: "/icons/Pornpics48.png" },
  youtube: { 16: "/icons/Youtube16.png", 48: "/icons/Youtube48.png" },
  default: { 16: "/icons/download16.png", 48: "/icons/download48.png" },
};

// --- Reglas de activación por dominio ---
const DOMAIN_RULES = {
  "twitter.com": {
    icon: ICONS.twitter,
    enable: (url) => url.includes("/status"),
  },
  "x.com": { icon: ICONS.twitter, enable: (url) => url.includes("/status") },
  "xdownloader.io": { icon: ICONS.twitter, enable: (url) => url.includes("") },
  "fansly.com": { icon: ICONS.fansly, enable: () => true },
  "onlyfans.com": { icon: ICONS.onlyfans, enable: () => true },
  "redgifs.com": { icon: ICONS.redgifs, enable: (url) => url.includes("") },
  "redditp.com": { icon: ICONS.redgifs, enable: (url) => url.includes("/u") },
  "pornhub.com": {
    icon: ICONS.pornhub,
    enable: (url) => url.includes("/model"),
  },
  "twpornstars.com": { icon: ICONS.twpornstars, enable: () => true },
  "manyvids.com": {
    icon: ICONS.manyvids,
    enable: (url) => url.includes("/Video/"),
  },
  "fapello.com": {
    icon: ICONS.fapello,
    enable: (url) => !url.includes("/content"),
  },
  "pornpics.com": { icon: ICONS.pornpics, enable: () => true },
  "porn4fans.com": { icon: ICONS.pornpics, enable: () => true },
  "viralxxxporn.com": { icon: ICONS.pornpics, enable: () => true },
  "youtube.com": {
    icon: ICONS.youtube,
    enable: (url) => url.includes("/watch"),
  },
  "loyalfans.com": { icon: ICONS.default, enable: () => true },
  default: { icon: ICONS.default, enable: () => false },
};

// --- Cookies: guardar y leer estado ---
function setEstado(domain, activo) {
  chrome.cookies.set({
    url: "https://" + domain,
    name: "estado_extension_" + domain,
    value: JSON.stringify({ activo }),
    path: "/",
  });
}

function getEstado(domain, url, callback) {
  const cookieName = "estado_extension_" + domain;
  const cookieUrl = new URL(url).origin;
  console.log(cookieUrl, cookieName);

  chrome.cookies.get({ url: cookieUrl, name: cookieName }, (cookie) => {
    if (!cookie) return callback({ activo: true }); // por defecto activo
    try {
      callback(JSON.parse(cookie.value));
    } catch {
      callback({ activo: true });
    }
  });
}

// --- Actualizar icono + título según estado ---
function updateAction(tabId, url, tab) {
  try {
    let cleanHost = null;
    const { hostname } = new URL(url);
    if (hostname.includes("es")) {
      cleanHost = hostname.replace("es.", "");
    } else {
      cleanHost = hostname.replace("www.", "");
    }
    const rules = DOMAIN_RULES[cleanHost] || DOMAIN_RULES.default;
    const host = hostname;
    console.log(host);

    //   getEstado(cleanHost, url, (estado) => {
    //     const activo = estado.activo && rules.enable(url);
    //     chrome.action.setIcon({ tabId, path: rules.icon });
    //     chrome.action.setTitle({
    //       tabId,
    //       title: activo
    //         ? `✅ Descargador activo en ${cleanHost}`
    //         : `⛔ Descargador desactivado en ${cleanHost}`
    //     });
    //     chrome.action[activo ? "enable" : "disable"](tabId);
    //     console.log(activo);
    //   });
    GetState(tab.id, host, tab.url, (estado) => {
      if (estado.activo) {
        console.log("✅ Extensión activa en", host);
        title = `✅ Descargador "(Activada)" para: ${cleanHost}`;
        // iniciarExtension();
      } else {
        console.log("⛔ Extensión desactivada en", host);
        title = `⛔ Descargador "(Desactivada)" para: ${cleanHost}`;
      }
      chrome.action.setIcon({ tabId, path: rules.icon });
      chrome.action.setTitle({ tabId, title });
    });
  } catch (e) {
    console.error("Error en updateAction:", e);
  }
}

// --- Listener único para actualizar cuando cambia una pestaña ---
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    updateAction(tabId, tab.url, tab);
  }
});

// --- También al cambiar de pestaña activa ---
chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    if (tab?.url) updateAction(tabId, tab.url, tab);
  });
});

// --- Mensajes desde otros scripts ---
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getEstadoExtension") {
    getEstado(msg.domain, msg.url, (estado) => sendResponse(estado));
    return true; // mantener el canal abierto
  }
  if (msg.action === "setEstadoExtension") {
    setEstado(msg.domain, msg.activo);
    sendResponse({ ok: true });
  }
  if (msg.action === "getState") {
    GetState(msg.tabId, msg.host, msg.url, (estado) => {
      sendResponse({ estado }); // devolvemos al caller
    });
    return true; // 🔥 necesario porque la respuesta es async
  }
  if (msg.action === "toggleExtension") {
    setEstado(msg.domain, msg.enabled);
    if (sender.tab?.id && sender.tab?.url) {
      updateAction(sender.tab.id, sender.tab.url);
    }
    sendResponse({ ok: true });
  }
  switch (msg.action) {
    case "inject_main_script3":
    case "inject_main_script":
      //case "download_video":
      chrome.scripting.executeScript(
        {
          target: { tabId: sender.tab.id },
          files: ["/common/content.js"],
        },
        () => {
          if (msg.url) {
            chrome.tabs.sendMessage(sender.tab.id, {
              action: "procesar_url",
              url: msg.url,
            });
          }
        },
      );
      break;
    // case "injectar":
    // chrome.scripting.executeScript({
    // target: { tabId: sender.tab.id },
    // files: ["/common/inject_button.js"],
    // });
    // break;
    //   case "popupClosed":
    //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //         //if (tabs[0]) {
    //         chrome.scripting.executeScript({
    //             target: { tabId: tabs[0].id },
    //             files: ["/youtube/content_nuevo.js"]
    //         });
    //         //}
    //     });
    //     break;

    case "popupClosed":
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab?.url) return;

        const domain = new URL(tab.url).hostname;

        // 📌 Diccionario de dominios → archivos a inyectar
        const SCRIPTS_MAP = {
          //"youtube.com": "/youtube/content_nuevo.js",
          "x.com": "/twitter/inject_button.js",
          "manyvids.com": "/common/inject_button.js",
          "twpornstars.com": "/common/inject_button.js",
          "pornhub.com": "/common/inject_button.js",
          "pornpics.com": "/common/inject_button.js",
          "porn4fans.com": "/common/inject_button.js",
          "viralxxxporn.com": "/common/inject_button.js",
          "redgifs.com": "/common/inject_button.js",
          "redditp.com": "/common/inject_button.js",
          "onlyfans.com": "/common/inject_button.js",
          "youtube.com": "/youtube/content_nuevo.js",
          // default
          //"default": "/common/content.js"
        };

        // Si el dominio existe en el mapa, usamos ese archivo, si no usamos default
        const fileToInject =
          Object.entries(SCRIPTS_MAP).find(([key]) =>
            domain.includes(key),
          )?.[1] || SCRIPTS_MAP.default;

        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: [fileToInject],
          },
          () => {
            console.log("✅ Script inyectado:", fileToInject, "en", domain);
          },
        );
      });
      break;

    case "inject_main_script-fansly":
      chrome.scripting.executeScript(
        {
          target: { tabId: sender.tab.id },
          files: ["/fansly/content.js"],
        },
        () => {
          if (msg.url) {
            chrome.tabs.sendMessage(sender.tab.id, {
              action: "procesar_url",
              url: msg.url,
            });
          }
        },
      );
      break;

    case "inject_main_script-twitter":
      if (!msg.url.includes("x.com/")) {
        sendResponse({
          status: "error",
          message: "No estás en un tweet de X.",
        });
        return;
      }
      chrome.tabs.create({ url: "https://ssstwitter.com" }, (newTab) => {
        //chrome.tabs.create({ url: "https://xdownloader.io" }, (newTab) => {
        chrome.scripting.executeScript({
          target: { tabId: newTab.id },
          func: (url) => sessionStorage.setItem("tweetUrl", url),
          args: [msg.url],
        });
      });
      sendResponse({ status: "ok" });
      break;

    case "updateCookie":
      chrome.cookies.set(
        {
          url: msg.url,
          name: msg.cookieName,
          value: msg.cookieValue,
          path: "/",
        },
        () => sendResponse({ status: "ok" }),
      );
      return true;

    case "descargar":
      chrome.downloads.download(
        { url: msg.url, saveAs: false },
        (downloadId) => {
          sendResponse({ last: poraca, nombre: msg.nombre, id: downloadId });
        },
      );
      return true;
  }
});

function GetState(tabId, host, url, callback) {
  const protocol = new URL(url).protocol;
  if (protocol !== "http:" && protocol !== "https:") {
    console.warn("⛔ No se pueden leer cookies en:", url);
    callback({ activo: true }); // valor por defecto
    return;
  }
  const COOKIE_NAME = "estado_extension_" + host;
  const COOKIE_URL = new URL(url).origin;
  //console.log(COOKIE_URL, COOKIE_NAME);

  chrome.cookies.get({ url: COOKIE_URL, name: COOKIE_NAME }, (cookie) => {
    if (cookie) {
      try {
        const datos = JSON.parse(cookie.value);
        console.log("Estado leido:", datos);
        estado = datos.activo;
        callback(datos); // 🔥 devolvemos el valor al caller
        //return;
      } catch (e) {
        console.error("Error parseando cookie:", e);
        callback({ activo: true }); // fallback
        //return;
      }
    } else {
      console.log("No hay cookie → por defecto activo");
      estado = true;
      callback({ activo: true }); // si no hay cookie
    }
  });
}

chrome.runtime.onMessage.addListener((mensaje, sender, sendResponse) => {
  if (mensaje.action !== "obtener_resoluciones") {
    return;
  }

  fetch("http://127.0.0.1:5000/resoluciones", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      url: mensaje.url,
    }),
  })
    .then(async (respuesta) => {
      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || `HTTP ${respuesta.status}`);
      }

      return data;
    })
    .then((data) => {
      console.log("✅ Resoluciones recibidas:", data);

      sendResponse(data);
    })
    .catch((error) => {
      console.error("❌ Error consultando Flask:", error);

      sendResponse({
        status: "error",
        error: error.message,
      });
    });

  return true;
});

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

      // case "popupClosed":
      //   chrome.scripting.executeScript({
      //     target: { tabId: tab.id },
      //     files: ["/youtube/content_nuevo.js"],
      //   });
      //   break;

      case "inject_main_script-twitter":
        if (!tab.url.includes("x.com/")) {
          console.warn("No estás en un tweet de X.");
          return;
        }
        const tweetUrl = tab.url;
        chrome.tabs.create({ url: "https://xdownloader.io" }, (newTab) => {
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
