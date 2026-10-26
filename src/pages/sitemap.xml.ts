import type { APIRoute } from 'astro';
// One public page. Add future public routes here; keep the 404 excluded.
export const GET: APIRoute = ({ site }) => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${new URL('/', site)}</loc></url></urlset>\n`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
