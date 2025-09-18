# Opera_Downloader_Extension
![Icon](icons/download48.png)

Una extensión para el navegador Opera que permite descargar contenido multimedia de varios sitios web populares. Compatible con:  🟥 RedGifs (*.redgifs.com/watch/*)  🔞 Pornhub GIFs (*.pornhub.com/gif/*)  🌟 TWPornstars (*.twpornstars.com/*)  🎬 ManyVids (*.manyvids.com/Video/*)  📷 Fapello (*.fapello.com/*)

📥 Opera Downloader Extension

Una extensión para Opera que permite descargar contenido multimedia directamente desde varias plataformas populares.

---

✨ **Características**

Descarga rápida y directa desde las páginas de contenido.

Compatible con los siguientes sitios:
<!-- Template logos -->
<!-- <img src="" alt="Icono" width="20" height="20"> -->
<!-- 🟥 RedGifs (*.redgifs.com/watch/*) -->
- <img src="https://www.redgifs.com/favicon-32x32.png" alt="Icono" width="20" height="20">
RedGifs (*.redgifs.com/watch/*)

<!-- 🔞 Pornhub GIFs (*.pornhub.com/gif/*) -->
- <img src="https://es.pornhub.com/favicon.ico" alt="Icono" width="20" height="20">
Pornhub GIFs (*.pornhub.com/gif/*)

<!-- 🌟 TWPornstars (*.twpornstars.com/*) -->
<img src="https://www.twpornstars.com/favicon.ico" alt="Icono" width="20" height="20"> TWPornstars (*.twpornstars.com/*)

<!-- 🎬 ManyVids (*.manyvids.com/Video/*) -->
<img src="https://logos.manyvids.com/icon_public/favicon-16x16.png?v=4" alt="Icono" width="20" height="20"> ManyVids (*.manyvids.com/Video/*)

<!-- 📷 Fapello (*.fapello.com/*) -->
<img src="https://fapello.com/assets/favicon/favicon.ico" alt="Icono" width="20" height="20"> Fapello (*.fapello.com/*)

<img src="https://fansly.com/assets/images/icons/favicon.ico?v=12" alt="Icono" width="20" height="20"> Fansly (*.fansly.com/*)

<!-- ![Icon](https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png) Twitter (*.x.com/*) -->
<img src="https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png" alt="Icono" width="20" height="20"> Twitter (*.x.com/*)

Interfaz sencilla e intuitiva.

---

👨‍🔧 **Instalación**

1. ![Icon](icons/github.webp) Clona este repositorio o 📥 descarga el ZIP:
```bash
git clone https://github.com/TaylorBundy/opera-downloader-extension.git
```
2. Abre Opera y ve a opera://extensions.

3. Activa el Modo desarrollador.

4. Haz clic en Cargar extensión sin empaquetar y selecciona la carpeta del proyecto.

---

🚀 **Uso**

Navega a una de las páginas compatibles.

Haz clic en el botón flotante que aparece en la página.

Selecciona el archivo que deseas descargar.

---

📂 **Estructura del proyecto**
```bash 
opera-downloader-extension/
├── background/
  └── background.js
├── common/
  ├── content.js       # Inyección en páginas compatibles
  ├── funciones.js       # funciones
  ├── inject_button.js       # Inyección de botones
  └── variables_globales.js       # Variables de uso global
├── fansly/           # Archivos para fansly separados.
  ├── content.js       # Inyección en páginas compatibles
  ├── inject_button.js       # Inyección de botones
  └── popup.js       # ventana popup
├── twitter/           # Archivos para twitter separados.
  ├── content.js       # Inyección en páginas compatibles
  ├── inject_button.js       # Inyección de botones
  └── popup.js       # ventana popup
├── icons/           # Iconos de la extensión
├── manifest.json    # Configuración de la extensión
├── popup.js       # ventana popup
└── README.md        # Este archivo
```
---

📋💡 **Notas importantes:**

Dicha extensión, esta pensada para poder descargar contenido multimedia de diversas paginas web.

AL momento de abrir una página, la cual sea soportada por la extensión, la misma despleglará un popup, informando al usuario sobre el atajo de teclado a utilizar.

Si la extensión, no es soportada por la página web o sección de la misma, el icono permanecera deshabilitado.

---

🔹 **Contribuir:**

Si quieres mejorar la extensión o agregar nuevas funcionalidades, siéntete libre de:

1. Hacer un fork del repositorio.
2. Crear una rama con tus cambios (`git checkout -b feature/nueva-funcionalidad`).
3. Hacer commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Hacer push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Enviar un Pull Request.