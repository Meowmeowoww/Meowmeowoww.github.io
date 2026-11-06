import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const dir = import.meta.env.BASE_URL.replace(/\/$/, '');
  const abs = (path: string) => new URL(`${dir}${path}`, base).href;

  const posts = await getCollection(
    'posts',
    ({ data }) => !data.draft && data.pubDate.valueOf() <= Date.now()
  );

  const pages = ['/', '/about/', '/tags/'];
  const tagPages = [
    ...new Set(posts.flatMap((post) => post.data.tags)),
  ].map((tag) => `/tags/${encodeURIComponent(tag)}/`);
  const postPages = posts.map((post) => `/posts/${post.id}/`);

  const urls = [...pages, ...tagPages, ...postPages];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url>\n    <loc>${abs(path)}</loc>\n  </url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
