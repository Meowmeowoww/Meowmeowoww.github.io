import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Doc = CollectionEntry<'docs'>;

/** 取全部文档（生产环境过滤草稿），按 order 再按标题排序 */
export async function getDocs(): Promise<Doc[]> {
  const docs = await getCollection('docs', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return docs.sort(
    (a, b) =>
      a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'zh-CN')
  );
}

export interface DocGroup {
  name: string;
  items: Doc[];
}

/** 按 frontmatter 的 group 分组，组的顺序由组内第一篇的 order 决定 */
export function groupDocs(docs: Doc[]): DocGroup[] {
  const map = new Map<string, Doc[]>();
  for (const doc of docs) {
    const key = doc.data.group || '文档';
    const list = map.get(key);
    if (list) list.push(doc);
    else map.set(key, [doc]);
  }
  return Array.from(map, ([name, items]) => ({ name, items }));
}
