import { defineConfig } from 'astro/config';

// Canonical metadata only: this expected hostname is not a verified deployment.
// Override SITE_URL in the build environment when using a custom domain.
const site = process.env.SITE_URL || 'https://chrisnightingale-portfolio.chrisnightingaledev.workers.dev';
const url = new URL(site);
if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
  throw new Error('SITE_URL must be an absolute HTTP(S) origin with no path, credentials, query or fragment.');
}

export default defineConfig({
  site: url.origin,
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'never' },
});
