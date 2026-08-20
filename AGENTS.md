<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Single-service Next.js 16 (App Router, Turbopack) marketing site for "Bice Menajerlik" (Turkish talent agency). Package manager is npm (`package-lock.json`). Standard scripts live in `package.json`: `npm run dev` (port 3000), `npm run build`, `npm start`, `npm run lint`.

- The update script already runs `npm ci`, so dependencies are ready on boot. Start the dev server with `npm run dev` in a background/tmux terminal, not in `install`.
- No database or external service is required to run or test the app. All runtime env vars are optional and have fallbacks: `SMTP_*` (email), `NEXT_PUBLIC_GADS_*` (Google Ads). Without them the app runs fine.
- Core flow: the application form at `/basvuru` (component `src/components/form/ApplicationForm.tsx`) posts to `POST /api/basvuru`. When `SMTP_PASS` is unset, the email path intentionally returns `fallbackToWhatsapp: true` and the UI still shows the "Başvurunuz Alındı!" success modal — this is expected, not a bug. To exercise real email, set `SMTP_USER`/`SMTP_PASS` (and optionally `SMTP_HOST`/`SMTP_PORT`, defaults `smtp.gmail.com:587`).
- Choosing the WhatsApp delivery method calls `window.open(wa.me/...)`, which opens a new tab; automated browsers may block it. Use the "E-posta" delivery method when demoing the success modal.
- `npm run lint` currently reports pre-existing `react-hooks/set-state-in-effect` errors (e.g. `src/lib/i18n/LanguageProvider.tsx`). These are existing code issues unrelated to environment setup.
