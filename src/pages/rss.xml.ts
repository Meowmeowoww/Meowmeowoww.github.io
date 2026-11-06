import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { escapeXml } from '../lib/format';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const dir = import.meta.env.BASE_URL.replace(/\/$/, '');
  const abs = (path: string) => new URL(`${dir}${path}`, base).href;

  const posts = (
    await getCollection('posts', ({ data }) => !data.draft)
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts
    .map((post) => {
      const link = abs(`/posts/${post.id}/`);
      return [
        '    <item>',
        `      <title>${escapeXml(post.data.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid>${link}</guid>`,
        `      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.data.description)}</description>`,
        ...post.data.tags.map(
          (tag) => `      <category>${escapeXml(tag)}</category>`
        ),
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.title)}</title>
    <description>${escapeXml(SITE.description)}</description>
    <link>${abs('/')}</link>
    <atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml" />
    <language>${SITE.lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
