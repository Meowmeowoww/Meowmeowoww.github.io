import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// 站内搜索用的静态索引。构建时生成，前端只 fetch 一次。
export const GET: APIRoute = async () => {
  const dir = import.meta.env.BASE_URL.replace(/\/$/, '');

  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const items = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      t: post.data.title,
      d: post.data.description ?? '',
      g: post.data.tags ?? [],
      u: `${dir}/posts/${post.id}/`,
      y: post.data.pubDate.toISOString().slice(0, 10),
    }));

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
