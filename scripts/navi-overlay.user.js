// ==UserScript==
// @name         Navi Overlay
// @namespace    navi
// @version      1.0
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_addElement
// ==/UserScript==

(function() {
    'use strict';

    // Remplace ces URLs par tes propres liens imgur (jamais de lien copié direct
    // depuis un moteur de recherche, voir README pour la méthode)
    const images = [
        "https://i.imgur.com/REMPLACE1.png",
        "https://i.imgur.com/REMPLACE2.png",
        "https://i.imgur.com/REMPLACE3.png"
    ];
    const texts = [
        "Navi is watching. Just kidding.",
        "kanso.",
        "you know where. they don't."
    ];

    let enabled = GM_getValue('navi_overlay_enabled', true);

    GM_registerMenuCommand(enabled ? "Désactiver overlay" : "Activer overlay", () => {
        GM_setValue('navi_overlay_enabled', !enabled);
        location.reload();
    });

    if (!enabled) return;

    const img = images[Math.floor(Math.random() * images.length)];
    const txt = texts[Math.floor(Math.random() * texts.length)];

    const box = document.createElement('div');
    box.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        background: rgba(20,20,25,0.85);
        border-radius: 8px;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: monospace;
        color: #eee;
        max-width: 450px;
        pointer-events: none;
        opacity: 0.9;
    `;

    GM_addElement(box, 'img', {
        src: img,
        style: 'width:100px;height:100px;border-radius:6px;object-fit:cover;'
    });

    const span = document.createElement('span');
    span.style.fontSize = '12px';
    span.textContent = txt;
    box.appendChild(span);

    document.body.appendChild(box);
    setTimeout(() => box.remove(), 8000);
})();
