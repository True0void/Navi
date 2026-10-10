#!/bin/bash
set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[*] Linking chromium flags..."
mkdir -p ~/.config
ln -sf "$REPO_DIR/flags/chromium-flags.conf" ~/.config/chromium-flags.conf

echo "[*] Renaming binary and installing wrapper..."
sudo mv /usr/lib/ungoogled-chromium/ungoogled-chromium /usr/lib/ungoogled-chromium/navi 2>/dev/null || true
sudo cp "$REPO_DIR/bin/navi" /usr/bin/navi
sudo chmod +x /usr/bin/navi

echo "[*] Installing desktop entry..."
sudo cp "$REPO_DIR/desktop/navi.desktop" /usr/share/applications/navi.desktop

echo "[*] Installing policies (extensions + memory saver)..."
sudo mkdir -p /etc/chromium/policies/managed
sudo cp "$REPO_DIR/policies/managed_policies.json" /etc/chromium/policies/managed/

echo "[*] Done."
echo "[*] Launch 'navi' — extensions auto-install on first run."
echo "[*] To load the theme: chrome://extensions -> dev mode -> load unpacked -> $REPO_DIR/theme"
