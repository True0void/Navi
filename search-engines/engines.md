# Moteurs de recherche — Navi

À configurer manuellement dans chrome://settings/searchEngines (pas de fichier de config Chromium pour ça).

## Défaut : Startpage
- Nom: Startpage
- Mot-clé: sp
- URL: https://www.startpage.com/sp/search?query=%s
- Suggestions: https://www.startpage.com/suggestions?q=%s&format=opensearch

## Secondaire : Mojeek
- Nom: Mojeek
- Mot-clé: mojeek
- URL: https://www.mojeek.com/search?q=%s

## Secondaire : Stract (méta-moteur open source, index perso)
- Nom: Stract
- Mot-clé: stract
- URL: https://stract.com/search?q=%s
  (⚠️ vérifier le format exact en cas de 404, tester une recherche manuelle sur stract.com et copier l'URL générée)

## Secondaire : Marginalia (contenu non-SEO, petits sites)
- Nom: Marginalia
- Mot-clé: marg
- URL: à confirmer (vérifier sur marginalia-search.com)

## DNS-over-HTTPS : Quad9 (non filtré, pour éviter faux positifs sur outils sécu)
chrome://settings/security → DNS sécurisé → personnalisé :
https://dns10.quad9.net/dns-query
