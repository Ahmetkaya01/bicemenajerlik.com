#!/usr/bin/env bash
# Production deploy — bicemenajerlik.com (Vercel)
# Gereksinim: `vercel login` (bir kez) veya VERCEL_TOKEN env
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Bağımlılıklar..."
npm ci

echo "→ Production build..."
npm run build

echo "→ Vercel output (production)..."
npx vercel build --prod --yes

echo "→ Deploy (production)..."
npx vercel deploy --prebuilt --prod --yes

echo "✓ Deploy tamam. https://bicemenajerlik.com adresini yenileyin."
