#!/bin/bash
set -e
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

sudo mv /usr/lib/ungoogled-chromium/ungoogled-chromium /usr/lib/ungoogled-chromium/navi 2>/dev/null || true
sudo cp "$REPO_DIR/bin/navi" /usr/bin/navi
sudo chmod +x /usr/bin/navi
echo "[*] Patched navi binary + wrapper after update."
