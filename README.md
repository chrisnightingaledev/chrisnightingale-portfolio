# Chris Nightingale — professional website

A static Astro website for Chris Nightingale, a freelance Senior .NET Developer specialising in maintaining, improving and modernising established business applications.

**Repository:** https://github.com/chrisnightingaledev/chrisnightingale-portfolio

The site uses warm ivory, deep green and an editorial type treatment. Services, engineering approach, professional background and direct contact are presented as one complete page. There are no projects, case studies, tracking, cookies, contact-form services or client-side JavaScript.

## Local development

Use Node.js 24 LTS (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. Fonts are bundled locally through Fontsource; visitors do not contact a font CDN.

```sh
npm run verify       # Astro/TypeScript diagnostics, production build, output checks
npm run preview      # Serve the production build locally
npm run deploy:check # Validate Wrangler configuration without publishing
```

Commit `package-lock.json` when changing dependencies. `npm ci` installs the locked versions. Build output and dependencies are ignored by Git.

## Cloudflare Workers setup

Create a **Worker** using Cloudflare's native GitHub integration. This is a Workers static-assets project, not Cloudflare Pages.

| Setting | Value |
| --- | --- |
| GitHub account | `chrisnightingaledev` |
| Repository | `chrisnightingale-portfolio` |
| Production branch | `main` |
| Root directory | Repository root (`/`) |
| Worker name | `chrisnightingale-portfolio` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Assets directory | `dist/` — configured in `wrangler.jsonc` |
| Node version | `24` — `.nvmrc`; use build variable `NODE_VERSION=24` if needed |

Wrangler is a pinned development dependency. Let the Git integration install dependencies; use `npm ci` if it offers an install-command field. Do not omit development dependencies during installation because Wrangler is needed for deployment.

The project includes no Worker handler, SSR adapter or runtime secrets. Cloudflare serves the generated assets directly. Unknown paths return the custom `404.html` with a 404 status; anchor navigation uses normal browser links. No SPA rewrite is needed.

**No Cloudflare deployment is performed by this repository's GitHub Actions workflow.** Deployment happens when you connect and run Cloudflare's Git integration.

### Canonical URL and custom domains

The default canonical origin is the *expected, unverified* hostname:

```text
https://chrisnightingale-portfolio.chrisnightingaledev.workers.dev
```

It is defined once in `astro.config.mjs` as a fallback for metadata generation. This does **not** claim the site is already live. Verify the actual hostname in Cloudflare before sharing it.

No environment variable is required for that intended hostname. If the actual hostname differs, or when adding a custom domain, set this **build** environment variable and rebuild:

```text
SITE_URL=https://your-domain.example
```

Use an absolute origin without a path, query or fragment. This updates the canonical link, Open Graph URL and image URL, sitemap and robots.txt together. Configure the custom domain in Cloudflare separately. This variable is public configuration, not a secret. Keep preview builds from being indexed if you publish previews under a different hostname.

For a local test of another origin:

```sh
SITE_URL=https://example.com npm run verify
```

## Editing

- `src/data/site.ts`: identity, links, service copy and approach principles.
- `src/pages/index.astro`: hero, about and contact copy, page composition.
- `src/styles/global.css`: responsive layout, colours, typography and motion preferences.
- `src/layouts/Layout.astro`: metadata and shared document structure.
- `src/components/`: navigation, footer and arrow icon.
- `src/pages/sitemap.xml.ts`: public routes (currently only `/`). Add future pages here.
- `src/pages/robots.txt.ts`: generated crawler instructions.
- `public/`: favicon, social sharing artwork, touch icon and response headers.

The social card has an editable SVG source alongside its PNG export. When changing it, export a 1200 × 630 PNG as `public/social-card.png`. Keep the PNG: social platforms do not consistently support SVG previews. The touch icon is a 180 × 180 PNG derived from `public/favicon.svg`.

Fonts: DM Sans and Newsreader, distributed by Fontsource under the SIL Open Font License. Their licence files are included in the installed packages.

## Accessibility and privacy

Semantic landmarks and headings, a skip link, visible keyboard focus, native links, readable contrast, responsive layouts and reduced-motion support are built in. Navigation stays visible on small screens, so no scripted menu is required. Contact is via `mailto:` and professional profile links.

The production security headers disable scripts, framing and sensitive device permissions. If future functionality needs scripts, update the Content Security Policy deliberately. Astro's local development tooling is not subject to Cloudflare's production `_headers`.

## Automated checks

GitHub Actions runs `npm ci`, `npm run verify` and a Wrangler dry run. Build verification checks canonical metadata, social metadata, sitemap/robots agreement, internal anchors, local asset references, 404 behaviour configuration and the absence of client JavaScript. These checks do not claim to replace a manual accessibility audit or testing a live Cloudflare deployment.
