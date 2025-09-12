chrome.action.onClicked.addListener((tab) => {  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("redgifs.com/watch/") || tab.url && tab.url.includes("pornhub.com/gif/") 
  || tab.url && tab.url.includes("twpornstars.com/") || tab.url && tab.url.includes("manyvids.com/Video/")|| tab.url && tab.url.includes("fapello.com/")) {
    chrome.action.enable(tabId);
  } else {
    chrome.action.disable(tabId);
  }
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "inject_main_script3" && sender.tab) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"]   // tu script pesado solo se carga cuando tocas el botón
    });
  }
});

// chrome.runtime.onMessage.addListener((msg, sender) => {
//   if (msg.action === "inject_main_script2" && sender.tab) {
//     chrome.scripting.executeScript({
//       target: { tabId: sender.tab.id },
//       files: ["content.js"]
//     }, () => {
//       // Después de inyectar el script, envía la URL a ese content script
//       chrome.tabs.sendMessage(sender.tab.id, { action: "procesar_url", url: msg.url });
//     });
//   }
// });

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "inject_main_script" && sender.tab) {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ["content.js"],
      },
      () => {
        // Enviar la URL solo cuando sabemos que content.js ya está cargado
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "procesar_url",
          url: msg.url,
        });
      }
    );
  }
});


//chrome.runtime.onMessage.addListener((msg, sender) => {
  //if (msg.action === "inject_button" && sender.tab) {
    //chrome.scripting.executeScript({
      //target: { tabId: sender.tab.id },
      //files: ["inject_button.js"]
    //});
  //}
//});
