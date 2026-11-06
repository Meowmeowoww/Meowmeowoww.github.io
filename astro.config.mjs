import { defineConfig } from 'astro/config';

// ────────────────────────────────────────────────
// 部署到 GitHub Pages 时，这里是唯一必须改的地方
//
// 仓库叫 <用户名>.github.io      → 只改 site，base 保持注释
// 仓库叫 blog / my-site 这种     → site 和 base 都要填（见下）
// ────────────────────────────────────────────────

export default defineConfig({
  site: 'https://izumikonata1231.cn',

  // 仓库名不是 <用户名>.github.io 时，取消注释并把仓库名填进去：
  // base: '/blog',

  build: {
    format: 'directory',
  },
});
