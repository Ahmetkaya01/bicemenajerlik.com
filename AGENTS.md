<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# bicemenajerlik.com

Production: https://bicemenajerlik.com  
Stack: Next.js 16 + Tailwind 4.  
Deploy: GitHub Pages (`main` → Actions → `out/`). Netlify/Vercel accounts are blocked (usage / fair-use).

## Commands

- `npm run dev` — local
- `npm run build` — static export to `out/`
- `npm run lint` — eslint

Do not commit `.env` or Ads credentials.

## Notes

- `output: "export"` + `trailingSlash: true` (required for GitHub Pages)
- Applications submit via WhatsApp (no server API on Pages)
- Custom domain CNAME: `public/CNAME` → `bicemenajerlik.com`
