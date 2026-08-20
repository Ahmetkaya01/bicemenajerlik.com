#!/usr/bin/env bash
# Google Ads MCP kurulum yardımcısı — Bice Menajerlik (CID 151-230-4203)
# Kullanım: bash scripts/setup-google-ads-mcp.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CREDS_DIR="${HOME}/.config/google-ads-mcp"
MCP_GLOBAL="${HOME}/.cursor/mcp.json"
EXAMPLE="${ROOT}/.cursor/mcp.google-ads.example.json"

echo "==> Google Ads MCP kurulum (Bice Menajerlik)"
echo ""
echo "Önkoşullar (manuel):"
echo "  1) ads.google.com → Araçlar → API merkezi"
echo "     - İletişim e-posta: bicemenajerliktr@gmail.com"
echo "     - Şirket: Bice Menajerlik"
echo "     - URL: https://bicemenajerlik.com"
echo "     - Developer Token iste / kopyala"
echo "  2) console.cloud.google.com"
echo "     - Proje oluştur / seç"
echo "     - Google Ads API'yi etkinleştir"
echo "     - OAuth istemci (Masaüstü) oluştur, client JSON indir"
echo ""

read -r -p "GOOGLE_PROJECT_ID: " GOOGLE_PROJECT_ID
read -r -p "GOOGLE_ADS_DEVELOPER_TOKEN: " GOOGLE_ADS_DEVELOPER_TOKEN
read -r -p "GOOGLE_APPLICATION_CREDENTIALS (JSON mutlak yol): " GOOGLE_APPLICATION_CREDENTIALS
read -r -p "GOOGLE_ADS_LOGIN_CUSTOMER_ID (MCC yoksa boş): " GOOGLE_ADS_LOGIN_CUSTOMER_ID

if [[ ! -f "$GOOGLE_APPLICATION_CREDENTIALS" ]]; then
  echo "Hata: credentials dosyası bulunamadı: $GOOGLE_APPLICATION_CREDENTIALS" >&2
  exit 1
fi

mkdir -p "$CREDS_DIR"

# pipx yoksa uvx / python -m pip dene
RUNNER=""
if command -v pipx >/dev/null 2>&1; then
  RUNNER="pipx"
elif command -v uvx >/dev/null 2>&1; then
  RUNNER="uvx"
else
  echo "pipx veya uvx bulunamadı. Kur:"
  echo "  curl -LsSf https://astral.sh/uv/install.sh | sh"
  echo "  # veya: python3 -m pip install --user pipx && pipx ensurepath"
  exit 1
fi

python3 - <<PY
import json
from pathlib import Path

mcp_path = Path(${MCP_GLOBAL@Q})
example = Path(${EXAMPLE@Q})
data = {"mcpServers": {}}
if mcp_path.exists():
    data = json.loads(mcp_path.read_text() or '{"mcpServers": {}}')

data.setdefault("mcpServers", {})
if "$RUNNER" == "pipx":
    cmd, args = "pipx", ["run", "--spec", "git+https://github.com/googleads/google-ads-mcp.git", "google-ads-mcp"]
else:
    cmd, args = "uvx", ["--from", "git+https://github.com/googleads/google-ads-mcp.git", "google-ads-mcp"]

env = {
    "GOOGLE_APPLICATION_CREDENTIALS": ${GOOGLE_APPLICATION_CREDENTIALS@Q},
    "GOOGLE_PROJECT_ID": ${GOOGLE_PROJECT_ID@Q},
    "GOOGLE_ADS_DEVELOPER_TOKEN": ${GOOGLE_ADS_DEVELOPER_TOKEN@Q},
}
login = ${GOOGLE_ADS_LOGIN_CUSTOMER_ID@Q}.strip()
if login:
    env["GOOGLE_ADS_LOGIN_CUSTOMER_ID"] = login.replace("-", "")

data["mcpServers"]["google-ads-mcp"] = {"command": cmd, "args": args, "env": env}
mcp_path.write_text(json.dumps(data, indent=2) + "\n")
print(f"Yazıldı: {mcp_path}")
PY

echo ""
echo "Tamam. Cursor → Settings → MCP → Reload, veya pencereyi yenile."
echo "Test: 'Google Ads erişebildiğim hesapları listele' / customer id 1512304203"
