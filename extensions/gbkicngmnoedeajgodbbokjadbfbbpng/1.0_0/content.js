const injectScript = document.createElement('script');
injectScript.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(injectScript);
injectScript.onload = () => {
    injectScript.remove();
};
