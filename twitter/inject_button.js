// Función auxiliar para extraer nombre limpio
// const obtenerNombre = (src, opciones = {}) => {
//   let limpio = src.split("?")[0]; // quitar parámetros
//   if (opciones.remover) {
//     opciones.remover.forEach(r => limpio = limpio.replace(r, ""));
//   }
//   return limpio.substring(limpio.lastIndexOf("/") + 1);
// };

let elputoUrl;
let src2;
let id;
const esRutaMedia = /\/media(?:[/?#]|$)/.test(fullUrl);
const esParametroMedia = /=media(?:[&#]|$)/.test(fullUrl);

function esperarElemento(selector, callback) {
  const elem = document.querySelector(selector);
  if (elem) return callback(elem);
  const observer = new MutationObserver(() => {
    const elem = document.querySelector(selector);
    if (elem) {
      observer.disconnect();
      callback(elem);
    }
  });
  //console.log(elem);
  observer.observe(document.body, { childList: true, subtree: true });
}

function crearBotonFlotante(contenedor, mensaje, enlaces) {
  if (document.getElementById("mi-boton-flotante")) return;

  const boton = document.createElement("button");
  boton.id = "mi-boton-flotante";
  boton.style.display = "inline-grid";
  boton.style.width = "100px";
  boton.style.position = "absolute";
  boton.style.padding = "5px 5px";
  boton.style.background = "rgb(29, 155, 240)";
  boton.style.color = "#fff";
  boton.style.border = "none";
  boton.style.borderRadius = "8px";
  boton.style.zIndex = "9999";
  boton.style.cursor = "pointer";
  boton.style.left = "0";
  boton.style.right = "0";
  boton.style.top = "5px";
  boton.style.margin = "auto";
  boton.style.justifyItems = "center";
  boton.innerHTML =
    '<img src="' +
    logo +
    '" style="width:20%;vertical-align:middle;opacity:0.8;margin:0">';
  boton.style.opacity = "0.8";
  boton.onmouseover = function () {
    boton.title = `${mensaje}`;
  };
  const texto = document.createElement("span");
  texto.innerHTML = "📥 Descargar";
  texto.id = "texto_id";
  texto.style.textAlign = "center";
  texto.style.fontSize = "12px";

  boton.onclick = () => {
    let nombrew;
    if (fullUrl.includes("status") && !fullUrl.includes("video")) {
      const ids = fullUrl.match(/\/status\/(\d+)/)?.[1];
      (async () => {
        try {
          const variables = {
            focalTweetId: ids,
            rankingMode: "Relevance",
            includePromotedContent: true,
            withCommunity: true,
            withQuickPromoteEligibilityTweetFields: true,
            withBirdwatchNotes: true,
            withVoice: true,
          };

          const url = new URL(
            "https://x.com/i/api/graphql/gJoREC4Bspo4kJ0ax9C3sQ/TweetDetail",
          );

          url.searchParams.set("variables", JSON.stringify(variables));

          // Mantener las features que ya utiliza tu extensión
          url.searchParams.set(
            "features",
            JSON.stringify({
              rweb_video_screen_enabled: false,
              rweb_cashtags_enabled: true,
              profile_label_improvements_pcf_label_in_post_enabled: true,
              responsive_web_profile_redirect_enabled: true,
              rweb_tipjar_consumption_enabled: false,
              verified_phone_label_enabled: false,
              creator_subscriptions_tweet_preview_api_enabled: true,
              responsive_web_graphql_timeline_navigation_enabled: true,
              premium_content_api_read_enabled: false,
              communities_web_enable_tweet_community_results_fetch: true,
              c9s_tweet_anatomy_moderator_badge_enabled: true,
              responsive_web_grok_analyze_button_fetch_trends_enabled: false,
              responsive_web_grok_analyze_post_followups_enabled: true,
              rweb_cashtags_composer_attachment_enabled: true,
              responsive_web_jetfuel_frame: true,
              rweb_sports_post_context_enabled: true,
              responsive_web_grok_share_attachment_enabled: true,
              responsive_web_grok_annotations_enabled: true,
              articles_preview_enabled: true,
              responsive_web_edit_tweet_api_enabled: true,
              view_counts_everywhere_api_enabled: true,
              longform_notetweets_consumption_enabled: true,
              responsive_web_twitter_article_tweet_consumption_enabled: true,
            }),
          );

          url.searchParams.set(
            "fieldToggles",
            JSON.stringify({
              withPayments: false,
              withDmBlocks: false,
              withArticleRichContentState: true,
              withArticlePlainText: false,
              withArticleSummaryText: true,
              withArticleVoiceOver: true,
              withGrokAnalyze: false,
              withDisallowedReplyControls: false,
            }),
          );

          // Tu función existente consulta el endpoint de X
          const enlaceVideo = await obtieneTwitter(
            url.toString(),
            typeof refer !== "undefined" ? refer : undefined,
          );

          if (!enlaceVideo) {
            console.warn("No se encontró un enlace multimedia");
            return;
          }

          console.log("Enlace obtenido:", enlaceVideo);
          const nombrew = enlaceVideo
            .split("/")
            .pop()
            .replace(/\?tag=\d+$/, "");
          await descargarVideo(enlaceVideo, nombrew);
        } catch (error) {
          console.error("Error procesando el multimedia de X:", error);
          media.__seen = false;
        }
      })();
    }
    (async () => {
      await navigator.clipboard.writeText(enlaces);
      nombrew = enlaces
        .split("/")
        .pop()
        .replace(/\?tag=\d+$/, "");
      //const ids = enlaces.substring(url.lastIndexOf("/") + 1);
      //console.log(nombrew);
      //console.log(ids);
      await descargarVideo(enlaces, nombrew);
      //abrir_xdownloader
      //chrome.runtime.sendMessage({ action: "inject_main_script-twitter", url: window.location.href });
      chrome.runtime.sendMessage({
        action: "inject_main_script-twitter",
        url: enlaces,
      });
    })();
    boton.remove();
  };
  boton.appendChild(texto);

  contenedor.appendChild(boton);
}

// setTimeout(() => {
//   const url = window.location.toString();
//   const nombreTemporal = obtenerNombre(url);
//   const nombre = nombreTemporal.split("#")[0];
//   let mensaje;

//   if (fullUrl.includes('x.com/post')) {
//       //selector = "body > app-root > div > div.site-wrapper.nav-bar-visible.nav-bar-mobile-visible.nav-bar-top-mobile-hidden > div > app-post-route > div.page-content > div > div > app-post > div > div.feed-item-preview.single-preview";
//       //mensaje = `Click para descargar: ${urlObj}.!`;
//   } else if (fullUrl.includes('x.com/home')) {
//     return;
//   } else if (fullUrl.includes('status')) {
//     //console.log(fullUrl);
//       selector = "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article";
//       mensaje = `Click para descargar: ${urlObj}.!`;
//   }
//     esperarElemento( selector,
//       (contenedor) => {
//         crearBotonFlotante(contenedor, mensaje);
//       }
//     );
// }, 5000); // espera 5 segundos

// Seleccionamos solo el media del visor maximizado
// const OVERLAY_SELECTORS = 'div[role="dialog"] video, div[role="dialog"] img';

// function getUniqueSelector(el) {
//   if (!el) return '';
//   if (el.id) return `#${CSS.escape(el.id)}`;
//   const path = [];
//   let node = el;
//   while (node && node.nodeType === 1 && node.tagName.toLowerCase() !== 'html') {
//     let sel = node.tagName.toLowerCase();
//     if (node.classList.length) {
//       sel += '.' + Array.from(node.classList).map(c => CSS.escape(c)).join('.');
//     }
//     const parent = node.parentNode;
//     if (parent) {
//       const siblings = parent.querySelectorAll(sel);
//       if (siblings.length > 1) {
//         const idx = Array.from(parent.children).indexOf(node) + 1;
//         sel = `${node.tagName.toLowerCase()}:nth-child(${idx})`;
//       }
//     }
//     path.unshift(sel);
//     node = node.parentNode;
//   }
//   return path.join(' > ');
// }

let observer = null;

function iniciarExtension() {
  console.log("🚀 Iniciando extensión en", location.hostname);

  setTimeout(() => {
    const url = window.location.toString();
    const nombreTemporal = obtenerNombre(url);
    const nombre = nombreTemporal.split("#")[0];
    let mensaje;

    if (fullUrl.includes("x.com/post")) {
      //selector = "body > app-root > div > div.site-wrapper.nav-bar-visible.nav-bar-mobile-visible.nav-bar-top-mobile-hidden > div > app-post-route > div.page-content > div > div > app-post > div > div.feed-item-preview.single-preview";
      //mensaje = `Click para descargar: ${urlObj}.!`;
    } else if (fullUrl.includes("x.com/home")) {
      return;
    } else if (fullUrl.includes("media")) {
      userId = fullUrl.split("/")[3];
      let urls;
      if (esRutaMedia) {
        urls = [...document.querySelectorAll("article")];
      } else if (esParametroMedia) {
        urls = [
          ...document.querySelectorAll(
            'li > div > div > div > a[href*="video"]',
          ),
        ]
          .map((a) => a.closest("li"))
          .filter(Boolean);
      }
      // if (fullUrl.includes(`${userId}/media`)) {
      //   urls = [...document.querySelectorAll("article")];
      // } else if (!fullUrl.includes(`${userId}/media`)) {
      //   urls = [
      //     ...document.querySelectorAll(
      //       'li > div > div > div > a[href*="video"]',
      //     ),
      //   ].map((a) => a.closest("li"));
      // }
      // const urls2 = [
      //   ...document.querySelectorAll('li > div > div > div > a[href*="video"]'),
      // ].map((a) => a.closest("li"));

      // //console.log(urls);
      // const enlaces2 = [
      //   ...document.querySelectorAll("li > div > div > div > a"),
      // ].filter((a) => a.href.includes("video"));
      // const padre = enlaces.parentElement;
      // console.log(padre);

      // urls = [
      //   ...document.querySelectorAll('li > div > div > div > a[href*="video"]'),
      // ].map((a) => a.closest("li"));

      // //console.log(urls);

      // const enlaces = [
      //   ...document.querySelectorAll('li > div > div > div > a[href*="video"]'),
      // ].map((a) => a.href);

      //console.log(enlaces);

      //console.log(enlaces);
      //selector = "li > div > div > div > a";
      //console.log(selector);
      crearBotonFlotantePorImagen([...urls]);
    } else if (fullUrl.includes("status")) {
      //console.log(fullUrl);
      //selector = "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article";
      //selector = "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-14lw9ot.r-jxzhtn.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div > div > div > article";
      //selector =
      //  "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-8e33y0.r-1lnugsr.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > article";
      selector = "article";
      mensaje = `Click para descargar: ${urlObj}.!`;
      esperarElemento(selector, (contenedor) => {
        crearBotonFlotante(contenedor, mensaje, urlObj);
      });
    }
  }, 500); // espera 5 segundos

  // --- Observador para detectar media maximizado ---
  const OVERLAY_SELECTORS = 'div[role="dialog"] video, div[role="dialog"] img';

  observer = new MutationObserver(() => {
    const media = document.querySelector(OVERLAY_SELECTORS);

    if (!media || media.__seen) return;

    media.__seen = true;

    // Obtener el ID de la publicación desde la URL actual
    const id = location.href.match(/\/status\/(\d+)/)?.[1];

    if (!id) {
      console.warn("No se pudo obtener el ID de la publicación");
      media.__seen = false;
      return;
    }

    console.log("ID de publicación:", id);
    console.log("Elemento multimedia:", media);

    // Evitar que el observer procese el mismo elemento varias veces
    (async () => {
      try {
        const variables = {
          focalTweetId: id,
          rankingMode: "Relevance",
          includePromotedContent: true,
          withCommunity: true,
          withQuickPromoteEligibilityTweetFields: true,
          withBirdwatchNotes: true,
          withVoice: true,
        };

        const url = new URL(
          "https://x.com/i/api/graphql/gJoREC4Bspo4kJ0ax9C3sQ/TweetDetail",
        );

        url.searchParams.set("variables", JSON.stringify(variables));

        // Mantener las features que ya utiliza tu extensión
        url.searchParams.set(
          "features",
          JSON.stringify({
            rweb_video_screen_enabled: false,
            rweb_cashtags_enabled: true,
            profile_label_improvements_pcf_label_in_post_enabled: true,
            responsive_web_profile_redirect_enabled: true,
            rweb_tipjar_consumption_enabled: false,
            verified_phone_label_enabled: false,
            creator_subscriptions_tweet_preview_api_enabled: true,
            responsive_web_graphql_timeline_navigation_enabled: true,
            premium_content_api_read_enabled: false,
            communities_web_enable_tweet_community_results_fetch: true,
            c9s_tweet_anatomy_moderator_badge_enabled: true,
            responsive_web_grok_analyze_button_fetch_trends_enabled: false,
            responsive_web_grok_analyze_post_followups_enabled: true,
            rweb_cashtags_composer_attachment_enabled: true,
            responsive_web_jetfuel_frame: true,
            rweb_sports_post_context_enabled: true,
            responsive_web_grok_share_attachment_enabled: true,
            responsive_web_grok_annotations_enabled: true,
            articles_preview_enabled: true,
            responsive_web_edit_tweet_api_enabled: true,
            view_counts_everywhere_api_enabled: true,
            longform_notetweets_consumption_enabled: true,
            responsive_web_twitter_article_tweet_consumption_enabled: true,
          }),
        );

        url.searchParams.set(
          "fieldToggles",
          JSON.stringify({
            withPayments: false,
            withDmBlocks: false,
            withArticleRichContentState: true,
            withArticlePlainText: false,
            withArticleSummaryText: true,
            withArticleVoiceOver: true,
            withGrokAnalyze: false,
            withDisallowedReplyControls: false,
          }),
        );

        // Tu función existente consulta el endpoint de X
        const enlaceVideo = await obtieneTwitter(
          url.toString(),
          typeof refer !== "undefined" ? refer : undefined,
        );

        if (!enlaceVideo) {
          console.warn("No se encontró un enlace multimedia");
          return;
        }

        console.log("Enlace obtenido:", enlaceVideo);

        // Buscar primero el contenedor del visor
        const contenedor =
          media.closest('div[aria-label="Video insertado"]') ||
          document.querySelector('div[aria-label="Video insertado"]') ||
          media.parentElement?.parentElement;

        if (!contenedor) {
          console.warn("No se encontró el contenedor para el botón");
          return;
        }

        // Evitar duplicar el botón
        if (contenedor.querySelector(".boton-descarga-multisitio")) {
          return;
        }

        const mensaje = `Click para descargar: ${enlaceVideo}`;

        crearBotonFlotante(contenedor, mensaje, enlaceVideo);

        // Si crearBotonFlotante permite configurar clases,
        // asignale "boton-descarga-multisitio" al botón creado.
      } catch (error) {
        console.error("Error procesando el multimedia de X:", error);
        media.__seen = false;
      }
    })();
  });

  // observer = new MutationObserver(() => {
  //   const media = document.querySelector(OVERLAY_SELECTORS);
  //   console.log(media);
  //   if (media && !media.__seen) {
  //     id = fullUrl.match(/\/status\/(\d+)/)?.[1];
  //     media.__seen = true;

  //     // 🔹 Padre directo
  //     const padre = media.parentElement?.parentElement;

  //     // 🔹 Construir mensaje
  //     const u = window.location.href;
  //     const parts = u.split("/");
  //     let without = null;
  //     let liinnkk;
  //     if (parts.includes("video")) {
  //       without = parts.slice(5, parts.indexOf("video")).join("/");
  //       liinnkk = `https://x.com/i/status/${without}`;
  //     } else if (parts.includes("photo")) {
  //       without = parts.slice(0, parts.indexOf("photo")).join("/");
  //       liinnkk = `${without}`;
  //     }
  //     //const baseUrl = `https://x.com/i/status/${without}`;
  //     //const baseUrl = liinnkk;
  //     (async () => {
  //       console.log(id);
  //       src2 =
  //         `https://x.com/i/api/graphql/gJoREC4Bspo4kJ0ax9C3sQ/TweetDetail?variables=%7B%22focalTweetId%22%3A%22` +
  //         id +
  //         `%22%2C%22rankingMode%22%3A%22Relevance%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%7D&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22rweb_cashtags_enabled%22%3Atrue%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22responsive_web_profile_redirect_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Afalse%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22rweb_cashtags_composer_attachment_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22rweb_sports_post_context_enabled%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22responsive_web_grok_annotations_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22rweb_conversational_replies_downvote_enabled%22%3Afalse%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22content_disclosure_indicator_enabled%22%3Atrue%2C%22content_disclosure_ai_generated_indicator_enabled%22%3Atrue%2C%22responsive_web_grok_show_grok_translated_post%22%3Atrue%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22post_ctas_fetch_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Afalse%2C%22responsive_web_nested_quote_preview_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_imagine_annotation_enabled%22%3Atrue%2C%22responsive_web_made_on_x_label_enabled%22%3Afalse%2C%22responsive_web_grok_community_note_auto_translation_is_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withPayments%22%3Afalse%2C%22withDmBlocks%22%3Afalse%2C%22withArticleRichContentState%22%3Atrue%2C%22withArticlePlainText%22%3Afalse%2C%22withArticleSummaryText%22%3Atrue%2C%22withArticleVoiceOver%22%3Atrue%2C%22withGrokAnalyze%22%3Afalse%2C%22withDisallowedReplyControls%22%3Afalse%7D`;
  //       elputoUrl = await obtieneredgifs(src2, refer);
  //       const contenedor = document.querySelector(
  //         'div[aria-label="Video insertado"]',
  //       );
  //       console.log(elputoUrl);
  //       const mensaje = `Click para descargar: ${elputoUrl}.!`;
  //       if (contenedor) {
  //         crearBotonFlotante(contenedor, mensaje, elputoUrl);
  //       }
  //     })();
  //     // async () => {
  //     //   const baseUrl = await obtieneredgifs(src2, refer);
  //     //   console.log(baseUrl);
  //     //   const mensaje = `Click para descargar: ${baseUrl}.!`;

  //     //   // 🔹 Contenedor donde meter el botón
  //     //   const contenedor = document.querySelector(
  //     //     "#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-17gur6a.r-1pi2tsx.r-13qz1uu > div > div.css-175oi2r.r-16y2uox.r-1wbh5a2 > div.css-175oi2r.r-1pi2tsx.r-11yh6sk.r-buy8e9.r-13qz1uu > div.css-175oi2r.r-13awgt0.r-184en5c > div > div > div",
  //     //   );

  //     //   if (contenedor) {
  //     //     crearBotonFlotante(contenedor, mensaje, baseUrl);
  //     //   }
  //     // };
  //   }
  // });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log("👀 Observando aparición de media maximizado...");
}

// 🔹 Desactivar extensión
function desactivarExtension() {
  document.querySelectorAll("#mi-boton-flotante").forEach((b) => b.remove());
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

function iniciarObservers2() {
  userId = fullUrl.split("/")[3];
  let urls;
  if (fullUrl.includes("media")) {
    urls = [
      ...document.querySelectorAll('li > div > div > div > a[href*="video"]'),
    ].map((a) => a.closest("li"));
  } else if (fullUrl.includes(`${userId}/media`)) {
    urls = [...document.querySelectorAll("article")];
  }

  //console.log(urls);
  // const enlaces = [
  //   ...document.querySelectorAll("li > div > div > div > a"),
  // ].filter((a) => a.href.includes("video"));
  // const padre = enlaces.parentElement;
  // console.log(padre);

  //console.log(enlaces);
  //selector = "li > div > div > div > a";
  //console.log(selector);
  crearBotonFlotantePorImagen([...urls]);
  //}
}
function iniciarObservers() {
  const url = new URL(location.href);
  const partes = url.pathname.split("/").filter(Boolean);

  //console.log({ esRutaMedia, esParametroMedia });

  let urls = [];

  //if (partes.length >= 2 && partes[1] === "media") {
  if (esRutaMedia) {
    // Perfil de usuario: /usuario/media
    urls = [...document.querySelectorAll("article")];
  } else if (esParametroMedia) {
    //if (partes.includes("media")) {
    // Otras vistas que incluyan /media
    urls = [
      ...document.querySelectorAll('li > div > div > div > a[href*="video"]'),
    ]
      .map((a) => a.closest("li"))
      .filter(Boolean);
  }

  //console.log("Elementos encontrados:", urls);
  crearBotonFlotantePorImagen(urls);
}

function detenerObservers() {
  observers.forEach((obs) => obs.disconnect());
  observers = [];
  console.log("Observers detenidos");
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    detenerObservers();
  }, INACTIVITY_TIME);
}

document.addEventListener(
  "scroll",
  () => {
    //console.log("hola");
    iniciarObservers();
    resetInactivityTimer();
  },
  true,
);

// Observar cuando aparece el visor de imagen/video
// const observer = new MutationObserver(() => {
//   const media = document.querySelector(OVERLAY_SELECTORS);
//   if (media && !media.__seen) {
//     media.__seen = true;

//     // 🔹 Padre directo
//     const padre = media.parentElement?.parentElement;

//     // 🔹 O un ancestro más arriba (ejemplo: todo el bloque del visor)
//     //const contenedor = media.closest('div[role="dialog"]');

//     //const selectorPadre = getUniqueSelector(padre);
//     //const selectorContenedor = getUniqueSelector(contenedor);

//     //const abuelo = getAncestor(media, 2);
//     const abuelo = media.parentElement?.parentElement;
//     const u = window.location.href;
//     const parts = u.split("/");
//     let without = null;
//     if (parts.includes('video')) {
//       without = parts.slice(0, parts.indexOf("video")).join("/");
//     } else if (parts.includes('photo')){
//       without = parts.slice(0, parts.indexOf("photo")).join("/");
//     }
//     const baseUrl = without;
//     mensaje = `Click para descargar: ${baseUrl}.!`;
//     //const lolo = document.querySelector(selectorPadre);
//     const lolo = document.querySelector("#layers > div:nth-child(2) > div > div > div > div > div > div.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy > div.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-17gur6a.r-1pi2tsx.r-13qz1uu > div > div.css-175oi2r.r-16y2uox.r-1wbh5a2 > div.css-175oi2r.r-1pi2tsx.r-11yh6sk.r-buy8e9.r-13qz1uu > div.css-175oi2r.r-13awgt0.r-184en5c > div > div > div");
//     crearBotonFlotante(lolo, mensaje);

//     // ejemplo: copiar selector al portapapeles
//     //navigator.clipboard.writeText(abuelo).then(() => {
//       //console.log("✅ Selector copiado al portapapeles");
//     //});
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

//console.log("🔍 Observando aparición de media maximizado...");

// function getAncestor(el, niveles = 1) {
//   let nodo = el;
//   for (let i = 0; i < niveles; i++) {
//     if (!nodo) return null;
//     nodo = nodo.parentElement;
//   }
//   return nodo;
// }

// --- Al cargar la página ---
// Revisar si el dominio está deshabilitado ANTES de arrancar
(async () => {
  const activo = await window.verificarEstadoExtension();

  if (activo) {
    console.log("✅ Extensión activa");
    iniciarExtension(); // tu lógica normal
  } else {
    console.log("⛔ Extensión desactivada, no hago nada");
  }
})();

// const urlObj = new URL(window.location.toString());
// const domain = urlObj.hostname;
// const fullUrl = urlObj.href;
//const src2 = `https://x.com/i/api/graphql/gJoREC4Bspo4kJ0ax9C3sQ/TweetDetail?variables=%7B%22focalTweetId%22%3A%222095478421392421157%22%2C%22rankingMode%22%3A%22Relevance%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%7D&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22rweb_cashtags_enabled%22%3Atrue%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22responsive_web_profile_redirect_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Afalse%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22rweb_cashtags_composer_attachment_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22rweb_sports_post_context_enabled%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22responsive_web_grok_annotations_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22rweb_conversational_replies_downvote_enabled%22%3Afalse%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22content_disclosure_indicator_enabled%22%3Atrue%2C%22content_disclosure_ai_generated_indicator_enabled%22%3Atrue%2C%22responsive_web_grok_show_grok_translated_post%22%3Atrue%2C%22responsive_web_grok_analysis_button_from_backend%22%3Atrue%2C%22post_ctas_fetch_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Afalse%2C%22responsive_web_nested_quote_preview_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_imagine_annotation_enabled%22%3Atrue%2C%22responsive_web_made_on_x_label_enabled%22%3Afalse%2C%22responsive_web_grok_community_note_auto_translation_is_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withPayments%22%3Afalse%2C%22withDmBlocks%22%3Afalse%2C%22withArticleRichContentState%22%3Atrue%2C%22withArticlePlainText%22%3Afalse%2C%22withArticleSummaryText%22%3Atrue%2C%22withArticleVoiceOver%22%3Atrue%2C%22withGrokAnalyze%22%3Afalse%2C%22withDisallowedReplyControls%22%3Afalse%7D`;
const refer = fullUrl;

function detectarVideoMaximizadoRedgifs() {
  let temporizador = null;
  let elementoDetectado = null;

  const buscarVideoMaximizado = () => {
    const boton = [
      ...document.querySelectorAll(
        'button[aria-label="Reproducir este video"]',
      ),
    ].find((btn) => btn.isConnected);

    if (!boton) {
      clearTimeout(temporizador);
      temporizador = null;
      elementoDetectado = null;
      return;
    }

    // Evitar reiniciar el temporizador para el mismo botón
    if (boton === elementoDetectado) return;

    clearTimeout(temporizador);
    elementoDetectado = boton;

    temporizador = setTimeout(() => {
      // Comprobar que el botón siga presente después de 4 segundos
      if (
        boton.isConnected &&
        document.querySelector('button[aria-label="Reproducir este video"]') ===
          boton
      ) {
        console.log("Video maximizado detectado:", boton);
        id = fullUrl.match(/\/status\/(\d+)/)?.[1];

        // Ejecutar tu función después de 4 segundos
        ejecutarFuncionVideoMaximizado(boton);
      }
    }, 4000);
  };

  const observer = new MutationObserver(buscarVideoMaximizado);

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["aria-label"],
  });

  // Comprobar también si el botón ya existe
  buscarVideoMaximizado();
}

function ejecutarFuncionVideoMaximizado(boton) {
  console.log("Ejecutando función después de 4 segundos");
  //async () => {
  // (async () => {
  //   elputoUrl = await obtieneredgifs(src2, refer);
  //   console.log(elputoUrl);
  // })();
  //};

  // Acá colocá la función que necesitás ejecutar.
  // Ejemplo:
  // const id = location.pathname.split("/").pop();
  // console.log("ID del video:", id);
}

if (location.hostname.includes("x.com")) {
  //detectarVideoMaximizadoRedgifs();
}

const obtieneredgifs2 = async (src, refer) => {
  try {
    //const token = await getToken();
    const response = await fetch(src, {
      headers: {
        accept: "*/*",
        "accept-language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
        authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Opera";v="133", "Chromium";v="149", "Not)A;Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-transaction-id":
          "OVC3zIpjYhWK5YgVj9Ar+ooK4Pq2vGKc/b0RcKD8phMdDoV8RIoFUNXOHxuwPbM5ael5tz/Rd9mro2eWzZ2w2glnh0MeOg",
        "x-csrf-token":
          "e6b250bd724fdce3a90a527ee656fdedac7421a90f0740e5100a4e93155f429ccfec1323baacdad7e745f4025f73f8710cdaea7bdd1f769583fb73d57871a63156e5659a769d2d933d6ba6ebc09a2af3",
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "es",
        cookie:
          'guest_id_marketing=v1%3A179127159700384310; guest_id_ads=v1%3A179127159700384310; guest_id=v1%3A179127159700384310; __cuid=8fa43bf1-34dc-43f3-8a34-9f8b70fcee8c; __cuid=8fa43bf1-34dc-43f3-8a34-9f8b70fcee8c; g_state={"i_l":0,"i_ll":1791271613687,"i_b":"O65S1Qq/1MnnZK37mBieYTOVPxYB9HF7rQNfPRn0bZs","i_e":{"enable_itp_optimization":24},"i_et":1791271613687}; twid=u%3D1675697010622582784; auth_token=a74d1daed954b5551f78a4bfe492470b7e35fc1c; ct0=e6b250bd724fdce3a90a527ee656fdedac7421a90f0740e5100a4e93155f429ccfec1323baacdad7e745f4025f73f8710cdaea7bdd1f769583fb73d57871a63156e5659a769d2d933d6ba6ebc09a2af3; lang=es; personalization_id="v1_EBg64yLV5XdiQ/rNnM4+tA=="; cf_clearance=bfQWHA04uqYnzFkvUqwKo7CDARuD6le6.6SxS9mAcoA-1792910375-1.2.1.1-Y6_y7iUs0UrbEqoqVgPSjdhRvDHyphjCGyPeUDDVAQG6AqOQjmKXCNVQIQpxPdzCWG1M1ds4GoIF8mGjBjYjh6GXf02p7ygzrH9fuFKIP9UIWs5ibWdC98ROnn7ZQetqyinlwK2P49t0qGJBaVRguuZ7coa9teehpo3QQPIQuPjvqIdgrDIq.weExRrjOwHo1IOBMGfKcDZgv2xjvmDTjWzOQCAd1Lj7dwVvgfvQx4ojSg5CMcltTWMMMUecbEd6Bp24JQdZcbxG_c0ffF63BUVv.GCKZqRblNRMuWByzYGyQlnJLr6AodkB7ADlsMXy.iHcm7WPTxwIIvzxyHkmVGH6T4YrCHRNNozrQ2k7D2Y; __cf_bm=zXzFaeq6UKW5OqsH_e4hwgbrFsxQCE6_7f0NTSBltpU-1792910375.966505-1.0.1.1-p_29Q7b0og2aQmEu1HofZpv4F60T6JTdnTOwXU3OImQ9YyKc_FIBBMfxnTQfvGeJ26yFldVseYWirYGgfx4aUqZY89zBORkPvgYlZpPyT8CTD4V2kR2BLw_yH0v_sumu',
        Referer: "https://x.com/SacanaDuTT/status/2095478421392421157/video/1",
      },
      body: null,
      method: "GET",
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const datoss = await response.json();
    const variantes =
      datoss.data.threaded_conversation_with_injections_v2.instructions[1]
        .entries[0].content.itemContent.tweet_results.result.legacy
        .extended_entities.media[0].video_info.variants;
    //console.log(variantes.at(-1).url);
    // console.log(
    //   datoss.data.threaded_conversation_with_injections_v2.instructions[1]
    //     .entries[0].content.itemContent.tweet_results.result.legacy
    //     .extended_entities.media[0].video_info.variants[3],
    // );
    //elputoUrl = variantes.at(-1).url;
    return variantes.at(-1).url;
  } catch (error) {
    // Capturamos errores durante la solicitud
    console.error("Error durante la solicitud:", error);
  }
};
