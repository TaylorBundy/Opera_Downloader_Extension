(async () => {
    // Recuperamos la URL guardada
    const tweetUrl = sessionStorage.getItem("tweetUrl");
    if (!tweetUrl) return;

    function esperarBoton(textoBoton) {
        return new Promise(resolve => {
          const observer = new MutationObserver(() => {
            const btn = [...document.querySelectorAll("button")].find(
              b => b.textContent.replace(/\s+/g, ' ').trim().includes(textoBoton)
            );
            if (btn) {
              observer.disconnect();
              resolve(btn);
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
        });
      }

    const input = document.querySelector("#postLink");
   
    if (input) {
      input.value = tweetUrl;      
    }
    //const tweetId = tweetUrl.substring(tweetUrl.lastIndexOf("/") + 1);
    //console.log(tweetId);
    //await fetchTweetMedia(tweetId);
  
    // Click en "Cargar videos"
    // const btnCargar = [...document.querySelectorAll("button")].find(
    //   (b) => b.textContent.includes("  Cargar videos")
    // );
    const btnCargar = await esperarBoton("  Cargar videos");
    //if (btnCargar) {
        console.log(btnCargar);
        btnCargar.click();
    //}

    
      
  
    // Esperar a que aparezca el botón de descarga
    function esperarDescarga() {
      return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
          const btnDescargar = [...document.querySelectorAll("button")].find((b) =>
            b.textContent.includes(" Descargar") &&
            b.textContent.includes("MP4")
          );
          if (btnDescargar) {
            observer.disconnect();
            resolve(btnDescargar);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
  
    const btnDescargar = await esperarDescarga();
    btnDescargar.click();
  })();

//   function gr(m3u8Text, baseUrl) {
//     const lines = m3u8Text.split("\n");
//     const playlists = [];
//     let current = {};

//     for (let line of lines) {
//         if (line.startsWith("#EXT-X-STREAM-INF")) {
//             const resMatch = line.match(/RESOLUTION=(\d+x\d+)/);
//             current.resolution = resMatch ? resMatch[1] : undefined;
//         } else if (line && !line.startsWith("#")) {
//             current.url = new URL(line, baseUrl).href;
//             playlists.push(current);
//             current = {};
//         }
//     }

//     return playlists;
// }


//   async function fetchTweetMedia(tweetId) {
//     try {
//         const response = await fetch(`https://api.xdownloader.com/twitter/tweet/media?id=${tweetId}`);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch media for ID ${tweetId}: ${response.statusText}`);
//         }

//         const data = await response.json();
//         const result = {
//             meta: { is_broadcast: data.meta.is_broadcast },
//             results: []
//         };

//         const mediaList = [];

//         async function processMedia(type) {
//             const mediaItems = data.media[type];
//             let counter = 0;

//             for (const item of mediaItems) {
//                 counter++;
//                 const variants = [];
//                 const hlsVariant = item.variants.find(v => v.content_type === "application/x-mpegURL");
//                 let audioAdded = false;

//                 if (hlsVariant) {
//                     try {
//                         const playlists = gr(await fetch(hlsVariant.url, { referrerPolicy: "no-referrer" })
//                             .then(res => res.text()), hlsVariant.url);

//                         for (const pl of playlists) {
//                             variants.push({
//                                 url: pl.url,
//                                 audio_url: pl.audio_url,
//                                 resolution: pl.resolution ? `${pl.resolution.width}x${pl.resolution.height}` : undefined,
//                                 isHD: pl.resolution && pl.resolution.width * pl.resolution.height >= 921600,
//                                 fileType: "m3u8/mp4",
//                                 //hash: await Ge(pl.url, 5).catch(() => undefined),
//                                 sortNumber: pl.resolution ? pl.resolution.width * pl.resolution.height : 0
//                             });

//                             if (pl.audio_url && !audioAdded) {
//                                 variants.push({
//                                     url: pl.audio_url,
//                                     resolution: Dt("Audio Only"),
//                                     isHD: pl.resolution && pl.resolution.width * pl.resolution.height >= 921600,
//                                     fileType: "m3u8/m4a",
//                                     //hash: await Ge(pl.audio_url, 5).catch(() => undefined),
//                                     sortNumber: pl.resolution ? pl.resolution.width * pl.resolution.height : 0
//                                 });
//                                 audioAdded = true;
//                             }
//                         }
//                     } catch (err) {
//                         console.error("Error processing HLS variant:", err);
//                     }
//                 }

//                 const normalVariants = item.variants.filter(v =>
//                     ["video/mp4", "video/webm", "image/gif", "image/jpeg", "image/png"].includes(v.content_type)
//                 );

//                 for (const v of normalVariants) {
//                     if (!v.url || !v.content_type) continue;

//                     const variantObj = {
//                         url: v.url,
//                         resolution: v.width * v.height > 0 ? `${v.width}x${v.height}` : undefined,
//                         isHD: v.bitrate >= 2176000,
//                         fileType: v.content_type,
//                         //hash: await Ge(v.url, 5).catch(() => undefined),
//                         sortNumber: v.width * v.height || v.bitrate || 0
//                     };

//                     // Check for mp4 fallback
//                     const existing = variants.find(vi => vi.resolution === variantObj.resolution && vi.fileType === "m3u8/mp4");
//                     if (existing) {
//                         existing.mp4_fallback_url = variantObj.url;
//                         continue;
//                     }

//                     variants.push(variantObj);
//                 }

//                 mediaList.push({
//                     id: `${data.meta.tweet_id}-${type}-${counter}`,
//                     thumbnail: item.thumbnail?.includes("?") ? item.thumbnail : `${item.thumbnail}?name=small`,
//                     key: type,
//                     variants: variants.sort((a, b) => {
//                         if (a.fileType.includes("mp4") && !b.fileType.includes("mp4")) return -1;
//                         if (!a.fileType.includes("mp4") && b.fileType.includes("mp4")) return 1;
//                         return a.sortNumber - b.sortNumber;
//                     }),
//                     metaData: {
//                         id: data.meta.tweet_id,
//                         username: data.meta.username,
//                         sensitive: data.meta.possibly_sensitive
//                     }
//                 });
//             }
//         }

//         await processMedia("videos");
//         if (mediaList.length === 1) mediaList[0].variants[0].preload = true;
//         await processMedia("gifs");
//         await processMedia("images");

//         result.results = mediaList;
//         console.log(result);

//         return result;

//     } catch (error) {
//         console.error("Failed to fetch tweet media:", error);
//         return null;
//     }
// }
