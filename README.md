# Opera_Downloader_Extension
![Icon](icons/download48.png)

Una extensión para el navegador Opera que permite descargar contenido multimedia de varios sitios web populares. Compatible con:  🟥 RedGifs (*.redgifs.com/watch/*)  🔞 Pornhub GIFs (*.pornhub.com/gif/*)  🌟 TWPornstars (*.twpornstars.com/*)  🎬 ManyVids (*.manyvids.com/Video/*)  📷 Fapello (*.fapello.com/*)

📥 Opera Downloader Extension

Una extensión para Opera que permite descargar contenido multimedia directamente desde varias plataformas populares.

---

✨ **Características**

Descarga rápida y directa desde las páginas de contenido.

Compatible con los siguientes sitios:

🟥 RedGifs (*.redgifs.com/watch/*)

🔞 Pornhub GIFs (*.pornhub.com/gif/*)

🌟 TWPornstars (*.twpornstars.com/*)

🎬 ManyVids (*.manyvids.com/Video/*)

📷 Fapello (*.fapello.com/*)

Interfaz sencilla e intuitiva.

---

👨‍🔧 **Instalación**

Clona este repositorio o descarga el ZIP:
```bash
git clone https://github.com/TaylorBundy/opera-downloader-extension.git
```
Abre Opera y ve a opera://extensions.

Activa el Modo desarrollador.

Haz clic en Cargar extensión sin empaquetar y selecciona la carpeta del proyecto.

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
