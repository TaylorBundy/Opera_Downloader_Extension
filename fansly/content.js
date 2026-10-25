(() => {
    // Funcion para descargar archivos

    const CallChrome = (host, urlssss, nombre) => {
      //const descargarArchivo = (urlssss, nombre) => {
        try {
          let segundos = 5;
          let intervalo;
      
          // Crear modal
          const modal = document.createElement("div");
          modal.style = `
            position: fixed; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: white; padding: 20px;
            border: 2px solid black; border-radius: 10px;
            font-size: 18px; text-align: center;
            color: black;
            z-index: 9999;
          `;
      
          const mensaje = document.createElement("p");
          mensaje.textContent = `La descarga de: ${urlssss} comienza en ${segundos} segundos...`;
      
          const btnAceptar = document.createElement("button");
          btnAceptar.textContent = "Aceptar";
          btnAceptar.style.margin = "5px";
      
          const btnEsperar = document.createElement("button");
          btnEsperar.textContent = "Esperar";
          btnEsperar.style.margin = "5px";
      
          const btnCancelar = document.createElement("button");
          btnCancelar.textContent = "Cancelar";
          btnCancelar.style.margin = "5px";
          btnCancelar.style.background = "red";
          btnCancelar.style.color = "white";
      
          modal.appendChild(mensaje);
          modal.appendChild(btnAceptar);
          modal.appendChild(btnEsperar);
          modal.appendChild(btnCancelar);
          document.body.appendChild(modal);
      
          // Lanza la descarga vía mensaje a la extensión
          const iniciarDescarga = () => {
            clearInterval(intervalo);
            mensaje.textContent = "Enviando a la extensión...";
            btnAceptar.disabled = true;
            btnEsperar.disabled = true;
            btnCancelar.disabled = true;
      
            chrome.runtime.sendMessage(
              { action: "descargar", url: urlssss, nombre: nombre },
              function (response) {
                //console.log(response);
                let id = response.id;
                let nom = response.nombre;
                let ulti = response.last;
      
                //datos.set(id, { id, nom, ulti });
                //console.log(Array.from(datos.values()));
      
                setTimeout(() => {
                  chrome.runtime.sendMessage({
                    action: "updateCookie",
                    cookieName: "lastdir",
                    cookieValue: ulti,
                    url: location.href
                  });
                }, 500);
      
                mensaje.textContent = "Solicitud enviada ✔";
                setTimeout(() => modal.remove(), 1500);
              }
            );
          };
      
          // Eventos de botones
          btnAceptar.onclick = iniciarDescarga;
          btnEsperar.onclick = () => {
            clearInterval(intervalo);
            modal.remove();
            iniciarDescarga();
          };
          btnCancelar.onclick = () => {
            clearInterval(intervalo);
            limpiarListener();
            modal.remove();
          };
      
          // Activar Enter para aceptar
          const teclaEnterListener = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              btnAceptar.click();
            }
          };
          document.addEventListener("keydown", teclaEnterListener);
      
          const limpiarListener = () => {
            document.removeEventListener("keydown", teclaEnterListener);
          };
          btnAceptar.addEventListener("click", limpiarListener);
          btnEsperar.addEventListener("click", limpiarListener);
          btnCancelar.addEventListener("click", limpiarListener);
      
          // Cuenta regresiva de 5 segundos
          intervalo = setInterval(() => {
            segundos--;
            if (segundos > 0) {
              mensaje.textContent = `La descarga de: ${urlssss} comienza en ${segundos} segundos...`;
            } else {
              clearInterval(intervalo);
              iniciarDescarga();
            }
          }, 1000);
      
        } catch (err) {
          console.error("Error al iniciar descarga:", err);
        }
      };

  const descargarArchivo = async (url, nombre) => {  
    try {
      let segundos = 5;
      let intervalo;
      let descargando = false;
  
      // Crear modal
      const modal = document.createElement("div");
      modal.style = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: white; padding: 20px;
        border: 2px solid black; border-radius: 10px;
        font-size: 18px; text-align: center;
        color: black;
        z-index: 9999;
      `;
  
      const mensaje = document.createElement("p");
      mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
  
      const btnAceptar = document.createElement("button");
      btnAceptar.textContent = "Aceptar";
      btnAceptar.style.margin = "5px";
  
      const btnEsperar = document.createElement("button");
      btnEsperar.textContent = "Esperar";
      btnEsperar.style.margin = "5px";
  
      const btnCancelar = document.createElement("button");
      btnCancelar.textContent = "Cancelar";
      btnCancelar.style.margin = "5px";
      btnCancelar.style.background = "red";
      btnCancelar.style.color = "white";
  
      modal.appendChild(mensaje);
      modal.appendChild(btnAceptar);
      modal.appendChild(btnEsperar);
      modal.appendChild(btnCancelar);
      document.body.appendChild(modal);
  
      // Función de descarga
      const iniciarDescarga = async () => {
        if (descargando) return;
        descargando = true;
        clearInterval(intervalo);
        mensaje.textContent = "Descargando...";
        btnAceptar.disabled = true;
        btnEsperar.disabled = true;
        btnCancelar.disabled = true;
  
        try {
          const respuesta = await fetch(url);          
          const blob = await respuesta.blob();
          const blobUrl = URL.createObjectURL(blob);
  
          const link = Object.assign(document.createElement("a"), {
            href: blobUrl,
            download: nombre
          });
  
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(blobUrl);
  
          mensaje.textContent = "Descarga completa ?";
        } catch (err) {
          mensaje.textContent = "Error en la descarga ?";
          console.error(err);
        }
  
        setTimeout(() => modal.remove(), 2000);
      };
  
      // Eventos de botones
      btnAceptar.onclick = iniciarDescarga;
      btnEsperar.onclick = () => {
        clearInterval(intervalo);
        modal.remove();
        iniciarDescarga();
      };
      btnCancelar.onclick = () => {
        clearInterval(intervalo);
        limpiarListener();
        modal.remove();
      };
  
      // Activar Enter para aceptar
      const teclaEnterListener = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          btnAceptar.click();
        }
      };
      document.addEventListener("keydown", teclaEnterListener);
      
      // Limpiar listener al cerrar modal
      const limpiarListener = () => {
        document.removeEventListener("keydown", teclaEnterListener);
      };
      btnAceptar.addEventListener("click", limpiarListener);
      btnEsperar.addEventListener("click", limpiarListener);
      btnCancelar.addEventListener("click", limpiarListener);
  
      // Cuenta regresiva
      intervalo = setInterval(() => {
        segundos--;
        if (segundos > 0) {
          mensaje.textContent = `La descarga de: ${url} comienza en ${segundos} segundos...`;
        } else {
          clearInterval(intervalo);
          iniciarDescarga();
        }
      }, 1000);
  
    } catch (err) {
      console.error("Error al descargar:", err);
    }
  };
    // 👉 estilos globales para el modal
    const estilosModal = `
        #mi-modal-extension {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 900;
        }

        #mi-modal-extension .modal-box {
        background: #fff;
        padding: 20px;
        border-radius: 12px;
        width: 85%;
        max-width: 1000px;
        max-height: 80%;
        overflow: hidden; /* controlamos overflow total */
        font-family: system-ui, Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        animation: aparecer 0.2s ease-out;
        display: flex;
        flex-direction: column;
        }

        #mi-modal-extension .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        }

        #mi-modal-extension .modal-header h2 {
        font-size: 16px;
        margin: 0;
        }

        #mi-modal-extension button.cerrar {
        border: none;
        background: transparent;
        font-size: 18px;
        cursor: pointer;
        color: #666;
        }

        #mi-modal-extension .modal-content {
        flex: 1;
        overflow: auto; /* 📌 Scroll interno */
        }

        /* Tabla */
        #mi-modal-extension table {
        width: 100%;
        border-collapse: collapse;
        }

        #mi-modal-extension thead {
        background: rgb(29, 242, 65);
        position: sticky;
        top: 0;
        z-index: 2;
        }

        #mi-modal-extension th, 
        #mi-modal-extension td {
        padding: 8px 10px;
        border-bottom: 1px solid #eee;
        text-align: left;
        color: #2563eb;
        }

        #mi-modal-extension td.url-cell {
        width: 60%;        /*  📌 límite de ancho */
        word-break: break-all;    /* 📌 rompe en cualquier parte */
        white-space: normal;
        font-size: 14px;
        }

        #mi-modal-extension a {
        color: #2563eb;
        text-decoration: none;
        }

        #mi-modal-extension a:hover {
        text-decoration: underline;
        }

        /* Scroll estilizado */
        #mi-modal-extension .modal-content::-webkit-scrollbar {
        width: 8px;
        }
        #mi-modal-extension .modal-content::-webkit-scrollbar-thumb {
        background: #bbb;
        border-radius: 4px;
        }
        #mi-modal-extension .modal-content::-webkit-scrollbar-thumb:hover {
        background: #888;
        }
        .fila-impar {
            background-color : rgb(0 0 0 / 83%);
        }
        .fila-par {
            background-color : rgb(0 0 0 / 75%);
        }

        @keyframes aparecer {
        from { transform: translateY(-10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
        }
    `;

    function injectEstilosModal() {
    if (document.getElementById("estilos-modal-extension")) return;
    const style = document.createElement("style");
    style.id = "estilos-modal-extension";
    style.textContent = estilosModal;
    document.head.appendChild(style);
    }

    function removeEstilosModal() {
        const style = document.getElementById("estilos-modal-extension");
        if (style) {
        style.remove(); // elimina el nodo <style> del DOM
        console.log("✅ Estilos del modal eliminados");
        }
    }    

    function crearModal() {
        injectEstilosModal();

        if (document.getElementById("mi-modal-extension")) return;
        const overlay = document.createElement("div");
        overlay.id = "mi-modal-extension";

        const modal = document.createElement("div");
        modal.className = "modal-box";

        const header = document.createElement("div");
        header.className = "modal-header";
        header.style.position = "relative";
        header.style.color = "blue";
        //header.innerHTML = `<h2>📋 Resultados obtenidos ${idpostt}${value.id}</h2>`;
        //header.innerHTML = `<img src=${logo1}`;
        header.innerHTML = `<img src=${logo1} style="width:10%; position:absolute; right:50px" <h2>📋 Resultados obtenidos de: ${fullUrl}</h2>`;
        
        const cerrar = document.createElement("button");
        cerrar.className = "cerrar";
        cerrar.textContent = "✖";
        //cerrar.onclick = () => document.body.removeChild(overlay);
        cerrar.onclick = () => cerrarModal();
        header.appendChild(cerrar);        

        const content = document.createElement("div");
        content.className = "modal-content";

        const tabla = document.createElement("table");
        tabla.innerHTML = `
            <thead>
            <tr>
                <th>Miniatura</th>
                <th>Id</th>
                <th>Content ID</th>
                <th>URL</th>
                <th>Tags</th>
            </tr>
            </thead>
            <tbody></tbody>
        `;

        content.appendChild(tabla);
        modal.appendChild(header);
        modal.appendChild(content);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        return tabla.querySelector("tbody");
        //return tbody;
    }

    function cerrarModal() {
        document.getElementById("mi-modal-extension").classList.remove("visible");
        const over = document.getElementById("mi-modal-extension");
        document.body.removeChild(over);
        removeEstilosModal(); // limpia estilos
    }
    // === Cerrar con ESC ===
    function escHandler(e) {
      if (e.key === "Escape") {
        cerrarModal();
      }
    }
    document.addEventListener("keydown", escHandler);

    function mostrarModal(allTodos) {
        const tbody = crearModal();
        if (!tbody) return; 
        tbody.innerHTML = "";
        document.getElementById("mi-modal-extension").classList.add("visible");

        allTodos.forEach((value) => {
            
            const pruebaaaa = value.mediaUrl;
            if (pruebaaaa === null) return;            
            const urlCorta = value.mediaUrl.length > 50 ? value.mediaUrl.slice(0, 100) + "..." : value.mediaUrl;
            const contentCorto = value.content.length > 50 ? value.content.slice(0, 100) + "..." : value.content;
            const fila = document.createElement("tr");
            //fila.style.backgroundColor = "#16161aa6";
            var filas = document.getElementsByTagName("tr");
            if (filas.length > 1) {                            
                for (var i = 0; i < filas.length; i++) {
                    if (i % 2 === 0) { // Si la fila es par (según el índice)
                        filas[i].classList.add("fila-impar");
                    } else{
                        filas[i].classList.add("fila-par");                
                    }
                }
            } else {
                fila.classList.add("fila-impar");
            }
            //const idpostt = "https://fansly.com/post/";

            // fila.innerHTML = `
            // <td title="Click para ver la imagen: ${value.miniaturas}" style="width:10%;color:var(--blue-1);">
            //     <a href="${value.miniaturas}" target="_blank">
            //         <img src="${value.miniaturas}" onclick="descargarArchivo('${value.miniaturas}', '${value.id}')"" style="width:100%;height:100%;position:relative;border-radius:8px";>
            //     </a>                
            // </td>
            // <td title="Click para visitar el post: ${idpostt}${value.id}" style="width:10%;color:var(--blue-1);">
            //     <a href="${idpostt + value.id}" target="_blank">${value.id}</a>
            // </td>
            // <td title="ContentId del post: ${value.contentId}" style="width:10%;color: var(--blue-1);">${value.contentId}</td>
            // <td class="url-cell" title="${value.mediaUrl}">
            //     <a href="${value.mediaUrl}" target="_blank" onclick="descargarArchivo('${value.mediaUrl}', '${value.id}')"">${urlCorta}</a>
            // </td>
            // <td title="Etiquetas utilizadas: ${value.content}" style="width:10%; color: #73a0ff;">${contentCorto}</td>
            // `;
            // tbody.appendChild(fila);

            //const fila = document.createElement("tr");

            // ---------- Miniatura ----------
            const tdImg = document.createElement("td");
            tdImg.style.width = "10%";
            tdImg.title = `Click para ver la imagen: ${value.miniaturas}`;

            const img = document.createElement("img");
            img.src = value.miniaturas;
            img.style.cssText = "width:100%;height:100%;position:relative;border-radius:8px;cursor:pointer";
            //img.addEventListener("click", () => descargarArchivo(value.miniaturas, value.id));
            img.addEventListener("click", () => CallChrome('fansly', value.mediaUrl, value.id));

            const linkImg = document.createElement("a");
            linkImg.style.display = "block";
            linkImg.href = value.miniaturas;
            linkImg.target = "_blank";
            linkImg.appendChild(img);

            tdImg.appendChild(linkImg);
            fila.appendChild(tdImg);

            // ---------- ID ----------
            const tdId = document.createElement("td");
            tdId.style.width = "10%";
            tdId.style.color = "var(--blue-1)";
            tdId.title = `Click para visitar el post: ${idpostt}${value.id}`;

            const linkId = document.createElement("a");
            linkId.href = idpostt + value.id;
            linkId.target = "_blank";
            linkId.textContent = value.id;

            tdId.appendChild(linkId);
            fila.appendChild(tdId);

            // ---------- ContentId ----------
            const tdContentId = document.createElement("td");
            tdContentId.style.width = "10%";
            tdContentId.style.color = "var(--blue-1)";
            tdContentId.title = `ContentId del post: ${value.contentId}`;
            tdContentId.textContent = value.contentId;
            fila.appendChild(tdContentId);

            // ---------- URL ----------
            const tdUrl = document.createElement("td");
            tdUrl.className = "url-cell";
            tdUrl.title = `Click para descargar el video: ${value.mediaUrl}`;

            const linkUrl = document.createElement("a");
            linkUrl.href = value.mediaUrl;
            linkUrl.target = "_blank";
            linkUrl.textContent = urlCorta;
            linkUrl.addEventListener("click", (e) => {
            e.preventDefault(); // evita que abra la pestaña si querés solo descargar
            CallChrome('fansly', value.mediaUrl, value.id);
            //descargarArchivo(value.mediaUrl, value.id);
            });

            tdUrl.appendChild(linkUrl);
            fila.appendChild(tdUrl);

            // ---------- Content ----------
            const tdContent = document.createElement("td");
            tdContent.style.width = "10%";
            tdContent.style.color = "#73a0ff";
            tdContent.title = `Etiquetas utilizadas: ${value.content}`;
            tdContent.textContent = contentCorto;
            fila.appendChild(tdContent);

            tbody.appendChild(fila);

        });
    }

    function filtrarPorExtension(allTodos, extension) {
        if (!extension) return Array.from(allTodos.values()); // si no escribe nada, devolvemos todos
        extension = extension.toLowerCase();
      
        return Array.from(allTodos.values()).filter(item => {
          if (!item.mediaUrl) return false;
          try {
            const url = new URL(item.mediaUrl);
            return url.pathname.toLowerCase().endsWith("." + extension);
          } catch (e) {
            return false;
          }
        });
      }
      // Función auxiliar para extraer nombre limpio
      const obtenerNombre = (src, opciones = {}) => {
          let limpio = src.split("?")[0]; // quitar parámetros
          if (opciones.remover) {
          opciones.remover.forEach(r => limpio = limpio.replace(r, ""));
          }
          return limpio.substring(limpio.lastIndexOf("/") + 1);
      };
    const GetUserId = async (nombre) => {
      try {
        const url = `https://apiv3.fansly.com/api/v1/account?usernames=${nombre}&ngsw-bypass=true`;
        const response = await fetch(url, {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
            "authorization": "OTAwNzIyMDE4NDgyMTUxNDI2OjE6MjphNDZkOWViZmZjZmZjOTFjNDBiYWVmMmVmZTFlYzc",
            "fansly-client-check": "3b5d6d05a484e",
            "fansly-client-id": "741332220559499264",
            "fansly-client-ts": "1757340601428",
            "fansly-session-id": "821324085555376128",
            "sec-ch-ua": "\"Opera\";v=\"95\", \"Chromium\";v=\"109\", \"Not;A=Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
          },
          "referrer": "https://fansly.com/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
        });
        const data = await response.json();
        //const userid = data.response[0].id;
        //const locationId = data.response[0].walls[1].id;
        //console.log(userid,locationId);
        console.log(data);
        //return userid, locationId;
        return data;
        //return data.gif.urls.hd;
      } catch (e) {
        console.error("Error Redgifs:", e);
      }
    }
      

    (async () => {
        const allIds = new Set(); // 🔑 evita duplicados automáticamente
        const allmedia = new Set();
        const allcontent = new Set();
        const urlObj = new URL(window.location.toString());
        const domain = urlObj.hostname;
        const fullUrl = urlObj.href;
        const allTodos = new Map();
        
        let extensionElegida;
        let after = 0;
        let before = null;
        let keepGoing = true;
        let page = 0;
        const nombre = fullUrl.split("/")[3];
        //console.log(nombre);
        const ppID = obtenerNombre(fullUrl);
        //console.log(ppID);
        let userid;
        let locationid;        
        let CantId;
        let url;          
        let filtro;      
        if (fullUrl.includes("fansly.com/post")) {
            //console.log(fullUrl);
            CantId = "1";
            url = `https://apiv3.fansly.com/api/v1/post?ids=${ppID}&ngsw-bypass=true`;
        } else if (fullUrl.includes("/media")) {
          //(async () => {
            const datos= await GetUserId(nombre);
            //console.log(datos);
            userid = datos.response[0]?.id;
            locationid = datos.response[0]?.walls?.[datos.response[0].walls.length - 1]?.id;
            
          //})();
            CantId = prompt("Ingrese el número de IDs que desea buscar.!");
            //url = `https://apiv3.fansly.com/api/v1/mediaoffers/location?locationId=785332964610285568&locationType=1002&accountId=707377415302684673&mediaType=&before=&after=${after}=0&limit=${CantId}&offset=0&ngsw-bypass=true`;
            url = `https://apiv3.fansly.com/api/v1/mediaoffers/location?locationId=${locationid}&locationType=1002&accountId=${userid}&mediaType=&before=&after=${after}&limit=${CantId}&offset=0&ngsw-bypass=true`;
            extensionElegida = prompt("Ingrese la extensión que desea filtrar (jpg, jpeg, png, mp4):");
        }
        //url = url;
        filtro = extensionElegida;
        if (CantId === null) return;
        const Eleccion = CantId;
    
        // ⚙️ CONFIGURACIÓN
        //const MAX_IDS = 30;        // cantidad máxima de IDs antes de parar
        const MAX_IDS = Eleccion;
        const MAX_MS = 60_000;      // tiempo máximo (1 minuto) en milisegundos
    
        const startTime = Date.now();
    
        const headers = {
        "accept": "application/json, text/plain, */*",
        "authorization": "ODIxMzI0MDg1NTU1Mzc2MTI4OjE6MjphMTliYTkwNzM3YjAzMWI4NDMwMmQ0ODE0MzMxYzk",
        "fansly-client-check": "1eee9393a262d1",
        "fansly-client-id": "741332220559499264",
        "fansly-client-ts": "1758071671458",
        "fansly-session-id": "741332362213732352",
        "cookie": `f-v-d=1768236032614; f-d=897127406660251648; fansly-d=897127406660251648; f-v-v=0.47.39; f-s-c=OTAwNzIyMDE4NDgyMTUxNDI2OjE6MTo0NTlhYTEwNDE0MjYyYjU5NjZjZmRjYWExNTExMWE; intercom-device-id-g2ytx5gg=91e45d38-e994-4e82-b991-74f6314951d6; intercom-session-g2ytx5gg=ckxBektXdm4vZ0Z6U3dsQjVaN0w2dVRWWWpaQVFnU2dGcFFBQmJFL2EzVVZiclFRVDljcjFoRC9VQkkvSDVHbm52SU1rTE9BTnZsSzdwdE9RUHBNaGpsZHhlVUp4QlBPcnFEWFdnNHo1WTgwRjFQdVdQMy9oMGpNQkw1VlVyYzg5WGtRcVIzU2hsWXFRcjl1UWt3Yk9VOC9CV01qU2FCeWtJOXBqVjh3Tzg1MEF4VnovTlZYaVN4c29xci82MjVqY1NTR1N4eVZKWjB0eUNpWUFIVG0vQT09LS1DOXdqcGgyRUhuUzh5dzc1N3lZZjhnPT0=--4390a3922902db08ac5edd6c7fb2bbc3de7feb9f; fansly-ts-info={"tso":-2482,"sts":1778306606871,"cts":1778306609353}`,
        };
    
        while (keepGoing) {
        // Verificar condiciones de corte
        if (allTodos.size >= MAX_IDS) {
            console.log(`⏹️ Límite de ${MAX_IDS} IDs alcanzado`);
            break;
        }
        if (Date.now() - startTime >= MAX_MS) {
            console.log(`⏹️ Tiempo máximo (${MAX_MS / 1000}s) alcanzado`);
            break;
        }
    
        //const url = `https://apiv3.fansly.com/api/v1/mediaoffers/location?locationId=785332964610285568&locationType=1002&accountId=707377415302684673&mediaType=&before=&after=0&limit=30&offset=0&ngsw-bypass=true`;
        //const url = `https://apiv3.fansly.com/api/v1/mediaoffers/location?locationId=785332964610285568&locationType=1002&accountId=707377415302684673&mediaType=&before=&after=0&limit=${MAX_IDS}&offset=0&ngsw-bypass=true`;
        //url = `https://apiv3.fansly.com/api/v1/mediaoffers/location?locationId=785332964610285568&locationType=1002&accountId=707377415302684673&mediaType=&before=&after=0&limit=${MAX_IDS}&offset=0&ngsw-bypass=true`;
    
        console.log("🔎 Fetch:", url);
    
        const res = await fetch(url, { headers });
        if (!res.ok) {
            console.error("❌ Error en fetch:", res.status);
            break;
        }
    
        const data = await res.json();
        
        
        const idConLos = data?.response?.aggregationData || [];
        //const posts = data?.response?.aggregationData?.posts || [];
        let posts;
        let medias;
        let imgsT;
        let id;
        let contador = 0;
        if (fullUrl.includes("fansly.com/post")) {
            //console.log(data);
            posts = data.response.posts;
            medias = data?.response?.accountMedia?.[0]?.preview?.locations[0] || data?.response?.accountMedia?.[0]?.media?.locations[0];
            imgsT = data?.response?.accountMedia?.[0]?.preview?.variants?.[0]?.locations[0] || data?.response?.accountMedia?.[0]?.media?.variants?.[0]?.locations[0];
            //console.log(posts.length);
            //break;
        } else {
            posts = data?.response?.aggregationData?.posts || [];
            medias = data?.response?.aggregationData?.accountMedia || [];
            imgsT = data?.response?.aggregationData?.accountMedia || [];
            //console.log(posts.length);
        }
        //const prueba = idConLos || [];
        let pageCount = 0;
        let contentId;
        let content;
        let mediaUrl;
        let miniaturas;
    if (!posts || posts.length === 0) {
    console.log("Sin posts");
    break;
}
        if (posts.length > 1){
          console.log(data);
            // Paso 1: recorrer posts → obtener contentId + content
            for (const post of posts ?? []) {
                id = post?.id;
                for (const att of post.attachments ?? []) {
                // if (fullUrl.includes("fansly.com/post")) {
                //     contentId = obtenerNombre(fullUrl);
                //     console.log(contentId);
                // } else {
                //     contentId = att.contentId;
                // }
                contentId = att.contentId;
                content = post.content;
                console.log(contentId);
                
                if (!contentId) continue;
            
                // Paso 2: buscar en accountMedia por id == contentId
                const mediaItem = (medias ?? [])
                    .find(m => m.id === contentId);   
                    console.log(mediaItem);             
                
            
                mediaUrl = mediaItem?.preview?.locations?.[0]?.location || null;
                miniaturas = mediaItem?.preview?.variants?.[0]?.locations?.[0]?.location || null;
                
                // if (mediaUrl.includes(filtro)) {
                //     console.log(mediaUrl);
                // }
                before = allTodos.size;
                allTodos.set(contentId, { id, contentId, content, mediaUrl, miniaturas });
                contador++;
                //allTodos.set(id, {tuti});
                //console.log(contador);
                if (allTodos.size > before) pageCount++;        
                }
            }
        } else {
            id = posts[0].id;
            content = posts[0].content;
            mediaUrl = medias.location;
            miniaturas = imgsT.location;
            contentId = posts[0].attachments[0].contentId;
            allTodos.set(contentId, { id, contentId, content, mediaUrl, miniaturas });
            //before = posts[0].id;            
        }
        
        //console.log(before);
    
        //console.log(`✅ IDs Extraídos ${before} posts, total acumulado: ${allTodos.size}`);
        console.log(`✅ IDs Extraídos ${contador} posts, total acumulado: ${allTodos.size}`);
    
        if (posts.length > 0) {
            after = posts[posts.length - 1].id;            
        } else {
            keepGoing = false;
        }
        page++;
        }
        console.log(filtrarPorExtension(allTodos, filtro));
        const tuti = filtrarPorExtension(allTodos, filtro);
        //console.log(tuti);
        console.log("🎯 Todos obtenidos:", Array.from(allTodos.values()));
        mostrarModal(tuti);
        //mostrarModal(allTodos);
    })();
})();