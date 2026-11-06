const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** 生成站内链接，自动带上 base。部署到 /blog 这类子路径时不会 404。 */
export function url(path: string): string {
  return `${BASE}${path}` || '/';
}
