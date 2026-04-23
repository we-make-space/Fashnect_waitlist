<p align="center">
  <img src="public/fashnect.svg" alt="Fashnect" width="96" height="96" />
</p>

<h1 align="center">Fashnect waitlist</h1>

Next.js 16 app that captures **early-access signups** for Fashnect—paired with transactional email, optional WhatsApp hand-offs, and a Supabase-backed waitlist table. The public surface is tuned for **discoverability**: titles, descriptions, Open Graph / Twitter cards, JSON-LD, a generated `sitemap.xml`, and a dynamic `robots.txt`.

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/SEO-metadata%20%2B%20JSON--LD-635555?style=flat-square" alt="SEO" />
</p>

---

## What you get

- **Landing** with waitlist form, brand background, and social links (Instagram, LinkedIn).
- **API route** `POST /api/waitlist` — validates input, writes to Supabase, sends team + user emails when SMTP is configured.
- **Admin** UI at `/admin` (client-side Supabase read) — **blocked from search** via `noindex` + `robots.txt` disallow.
- **Central SEO config** in [`config/seo.ts`](./config/seo.ts): default title, meta description, keyword list, and `@graph` structured data (`Organization`, `WebSite`, `WebPage`).
- **Dynamic** [`app/sitemap.ts`](./app/sitemap.ts) and [`app/robots.ts`](./app/robots.ts) so sitemap and host follow `NEXT_PUBLIC_SITE_URL`.

## Default browser title

The document title is optimized for clarity and waitlist intent—not a generic marketplace tagline:

> **Fashnect waitlist — early access to social fashion commerce**

Subpages (if you add them) use the template **`%s · Fashnect waitlist`**. Tweak all strings in **`config/seo.ts`** so marketing stays in one place.

## Setup

```bash
npm install
cp .env.example .env
# Fill Supabase, SMTP, and optional URLs (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase: `location` column (waitlist)

The public form can collect an optional **Location** field. If your `waitlist` table was created before that feature, run the SQL in [`supabase/migrations/20250423120000_add_location_to_waitlist.sql`](./supabase/migrations/20250423120000_add_location_to_waitlist.sql) in the Supabase **SQL Editor** (or apply it with the Supabase CLI) so inserts include `location` without errors.

## Environment variables

| Variable | Purpose |
| -------- | -------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (no trailing slash). Drives `metadataBase`, sitemap, robots, JSON-LD, Open Graph. Defaults to `https://waitlist.fashnect.com`. |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser Supabase client (waitlist insert + admin list). |
| `SMTP_*` | Outbound mail for confirmations / internal alerts (see `.env.example`). |
| `WHATSAPP_SELLER` / `WHATSAPP_BUYER` | Invite links returned after signup. |
| `TEAM_EMAIL` | Internal notification recipient. |

Server-only secrets stay in `.env` (never commit real values).

## Scripts

| Command | Description |
| -------- | ----------- |
| `npm run dev` | Dev server (Turbopack). |
| `npm run build` | Production build. |
| `npm run start` | Serve production output. |
| `npm run lint` | ESLint with autofix where configured. |

## SEO checklist (built-in)

- Unique **title** + **meta description** + extended **keywords**.
- **Open Graph** + **Twitter** cards aligned with the same copy; share image **`/fashnect.svg`**.
- **Canonical** URL and `en-US` alternate hint.
- **Google Search Console** token via `metadata.verification` (replace if you use a different property).
- **`@graph` JSON-LD** with Organization (incl. `sameAs` socials), WebSite, and WebPage.
- **Web app manifest** ([`app/manifest.json`](./app/manifest.json)) for install hints and PWA-friendly metadata.
- **Admin** excluded from indexing at the route and crawler level.

## Project layout (high level)

```
app/
  layout.tsx       # Root metadata + JSON-LD script
  page.tsx         # Waitlist landing (H1 + supporting copy)
  sitemap.ts       # Sitemap generation
  robots.ts        # Crawl rules + sitemap URL
  manifest.json    # PWA manifest
  api/waitlist/    # Signup API
  admin/           # Internal list UI (noindex)
components/
  WaitlistForm.tsx # Form UI + client submit
config/
  seo.ts           # Single source of truth for SEO strings + schema
public/
  favicon.ico
  fashnect.svg
```

## Related

- Main web app: [`../Frontend`](../Frontend)
- API backend: [`../Backend`](../Backend)
- Monorepo overview: [`../README.md`](../README.md)

---

<p align="center"><sub>Fashion in the feed. Commerce in the same tab.</sub></p>
