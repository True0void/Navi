# Navi

*Built to vanish.*

Custom-hardened ungoogled-chromium build. RAM-optimized, privacy-focused, dwm/suckless-friendly.

## Structure

```
navi/
├── bin/navi                    # wrapper shell patché (lit chromium-flags.conf)
├── flags/chromium-flags.conf   # tous les flags RAM/perf/UI
├── policies/managed_policies.json  # force-install extensions + memory saver
├── desktop/navi.desktop        # entrée menu/rofi
├── theme/                      # chrome theme (toolbar/frame image custom)
│   ├── manifest.json
│   └── images/toolbar.png      # à générer depuis ton wallpaper (voir ci-dessous)
├── search-engines/engines.md   # doc des moteurs custom (Startpage, Mojeek, Stract...)
├── scripts/navi-overlay.user.js # userscript Violentmonkey (overlay image+texte)
├── install.sh                  # install complète en une commande
└── update-patch.sh             # à relancer après chaque xbps-install -Su ungoogled-chromium
```

## Prérequis

- ungoogled-chromium installé (repo DAINRA sur Void)
- Violentmonkey installé (pour le userscript overlay)
- ImageMagick (`convert`) pour générer l'image de toolbar depuis ton wallpaper

## Install

```bash
git clone https://github.com/TONUSER/navi ~/dotfiles/navi
cd ~/dotfiles/navi
./install.sh
```

## Après chaque update ungoogled-chromium

```bash
./update-patch.sh
```
(le paquet écrase le binaire renommé et le wrapper à chaque MAJ)

## Charger le thème

```
chrome://extensions → Mode développeur → Charger l'extension non empaquetée → ./theme
```

Pour générer l'image toolbar depuis ton wallpaper :
```bash
convert /chemin/vers/wallpaper.png -gravity North -crop 1920x200+0+0 theme/images/toolbar.png
```

## Charger le userscript overlay

1. Ouvre `scripts/navi-overlay.user.js` dans Violentmonkey (glisser-déposer ou "Créer un script" et coller le contenu)
2. Remplace les URLs d'exemple par tes propres images hébergées sur imgur
   (jamais de lien copié direct depuis un moteur de recherche — télécharge l'image puis uploade-la sur https://imgur.com/upload)
3. Toggle on/off via le menu Violentmonkey sur l'icône de l'extension

## Moteurs de recherche

Voir `search-engines/engines.md` — à configurer manuellement dans
`chrome://settings/searchEngines` (pas automatisable via policy simplement).

## DNS

DNS-over-HTTPS Quad9 non filtré (évite les faux positifs sur outils sécu) :
`chrome://settings/security` → DNS sécurisé → `https://dns10.quad9.net/dns-query`
