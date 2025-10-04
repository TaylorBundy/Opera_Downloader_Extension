// popup.js optimizado

const LOGOS = {
    pornhub: {
      src: "https://ei.phncdn.com/pics/logos/10211.png?cache=2025091603",
      bg: "rgb(51, 51, 51)",
      color: "white",
      boxShadow: "inset 0px 0px 10px 2px rgb(255 0 51 / 39%)"
    },
    redgifs: { src: "https://www.redgifs.com/static/logo-full-red-C9X7m0yF.svg" },
    manyvids: { src: "https://logos.manyvids.com/icon_public/favicon-32x32.png?v=4" },
    twpornstars: { src: "https://www.twpornstars.com/favicon.ico" },
    fapello: { src: "https://fapello.com/assets/images/logo.png" },
    fansly: { src: "https://fansly.com/assets/images/fansly_dark_v3.webp" },
    "x.com": {
        src: "https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png",
        alto: "90%",
        estilo: "flex",
        alinea: "center"
    },
    pornpics: { src: "https://static.pornpics.com/style/img/logo.svg" },
    loyalfans: { src: "https://cdn-static.loyalfans.com/assets/images/loyalfans-light.svg" },
    youtube: { src: "https://www.youtube.com/s/desktop/c90d512c/img/favicon_32x32.png" },
    default: { src: "/icons/download48.png" }
  };
  
  // --- Helpers ---
  function setLogo(host, container, imagen) {
    const rule = LOGOS[Object.keys(LOGOS).find(k => host.includes(k))] || LOGOS.default;
  
    if (rule.bg) {
      container.style.background = rule.bg;
      container.style.color = rule.color || "inherit";
      container.style.boxShadow = rule.boxShadow || "none";
    }
    if (host.includes("x.com")) {
        imagen.style.height = rule.alto;
        imagen.style.display = rule.estilo;
        imagen.style.alignItems = rule.alinea;
        imagen.innerHTML = `<img src="${rule.src}" style="height:90%; display: flex; align-items: center;vertical-align:middle;">`;
    } else {
        imagen.innerHTML = `<img src="${rule.src}" style="width:90%;height:inherit;vertical-align:middle;">`;
    }
  }
  
  // --- Función para enviar mensaje al background y obtener estado ---
  function obtenerEstado(domain, url) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { action: "getEstadoExtension", domain, url },
        (response) => resolve(response)
      );
    });
  }
  
  function guardarEstado(domain, activo) {
    chrome.runtime.sendMessage(
      { action: "setEstadoExtension", domain, activo },
      (res) => console.log("Estado guardado:", res)
    );
  }
  
  // --- Inicialización del popup ---
  async function initPopup() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url) return;
  
    const host = new URL(tab.url).hostname;
    const url = tab.url;
  
    const estado1 = await obtenerEstado(host, url);
  
    const toggle = document.getElementById("toggle");
    const texto = document.querySelector(".texto");
    const imagen = document.querySelector(".img");
    const container = document.querySelector(".container");
  
    // Reflejar estado
    toggle.checked = estado1.activo;
    texto.innerHTML = estado1.activo
      ? `✨ Desactivar en: (${host}).<br>${tab.title}`
      : `✨ Activar en: (${host}).<br>${tab.title}`;
  
    // Colocar logo
    setLogo(host, container, imagen);
  
    // Evento de toggle
    toggle.addEventListener("change", () => {
      const nuevoEstado = toggle.checked;
      //estado = nuevoEstado;
      guardarEstado(host, nuevoEstado);
  
      chrome.tabs.sendMessage(tab.id, {
        action: "toggleExtension",
        domain: host,
        enabled: nuevoEstado
      });
    });
  }
  
  // Ejecutar al abrir popup
  document.addEventListener("DOMContentLoaded", initPopup);
  