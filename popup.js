(() => {
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
  img.style.height = "100%";
  img.style.padding = "10px 15px";
  img.style.background = "#333";
  img.style.color = "#fff";
  img.style.borderRadius = "8px";  
  img.style.zIndex = "8";
  img.style.fontSize = "14px";
  img.src = logo;
  img.style.opacity = "0.2";
  img.style.right = "0";
  const texto  = document.createElement("span");
  texto.innerHTML = `'✨ Extensión "Descarga_Multi_Sitio" activa:<br>lista para descargar (${domain}).<br>Si no aparece el boton de descarga, presione: "ctrl+shift+h".!'`;
  texto.style.zIndex = "9";
  texto.style.textAlign = "left";
  popup.appendChild(img);
  popup.appendChild(texto);
  popup.insertBefore(img, texto);

  if (domain.includes('manyvids')) {
    //
  } else if (domain.includes('pornhub')) {
    img.style.height = "90%";
    img.style.padding = "5px";
  } else if (domain.includes('twpornstars')) {
    img.style.padding = "0";
  } else if (domain.includes('fapello')) {
    popup.style.color = "rgb(190 24 93)";
    popup.style.background = "#efeeee";
    img.style.color = "";
    img.style.background = "";
  }

  document.body.appendChild(popup);

  // Hacer que desaparezca después de 5 segundos
  setTimeout(() => {
    popup.remove();
  }, 8000);
})();
