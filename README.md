# 未命名博客

一个用 [Astro](https://astro.build/) 搭的纯静态个人博客。没有数据库，没有后台，文章就是 Markdown 文件。

## 你现在看到的是什么

```
blog/
├─ src/
│  ├─ consts.ts              站点名字、简介、作者 —— 先改这个
│  ├─ content/posts/         你的文章，一个 .md 一个文件
│  ├─ layouts/Base.astro     外壳（页头、页脚、head 里的 meta）
│  ├─ pages/
│  │  ├─ index.astro         首页列表
│  │  ├─ posts/[...slug].astro  文章页
│  │  ├─ tags/               标签页
│  │  ├─ about.astro         关于页
│  │  ├─ 404.astro           404
│  │  ├─ rss.xml.ts          RSS
│  │  └─ sitemap.xml.ts      sitemap
│  ├─ lib/                   日期格式化、链接生成
│  └─ styles/global.css      全部样式，配色在文件最上面的变量里
├─ public/                   favicon、图片等原样复制的文件
├─ astro.config.mjs          站点地址和部署路径
└─ .github/workflows/deploy.yml  推上去自动部署到 GitHub Pages
```

## 写一篇新文章

在 `src/content/posts/` 里新建 `随便什么名字.md`：

```markdown
---
title: 标题
description: 一句话摘要，会显示在列表和分享卡片里
pubDate: 2026-11-06
tags: [随笔]
draft: false
---

正文从这里开始。用 Markdown 写。
```

文件名就是网址：`hello-world.md` → `/posts/hello-world/`。
`draft: true` 的文章只在本地能看到，构建时会被过滤掉。

## 本地跑起来

需要 Node.js 20 或更高版本（装一次就行）：

```powershell
winget install --id OpenJS.NodeJS.LTS -e
```

然后在本目录：

```powershell
npm install
npm run dev        # 打开 http://localhost:4321
```

> 如果 PowerShell 报「因为在此系统上禁止运行脚本」，先跑一次这条再试：
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

其它命令：

```powershell
npm run build      # 生成到 dist/
npm run preview    # 预览构建结果
```

## 部署到 GitHub Pages

1. 在 GitHub 建一个仓库。**最简单的是叫 `<你的用户名>.github.io`** —— 这样站点在根路径，不用配 `base`。
2. 把本项目推上去（`main` 分支）。
3. 仓库 **Settings → Pages → Source** 选 **GitHub Actions**（不要选 Deploy from a branch）。
4. 改 `astro.config.mjs` 里的 `site` 为你的地址，改 `src/consts.ts` 里的站点名。
5. push，等 Actions 跑完，访问你的地址。

### 如果仓库名不是 `<用户名>.github.io`

比如仓库叫 `blog`，那站点地址是 `https://<用户名>.github.io/blog/`，必须同时改两处，否则 CSS 和链接全 404：

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://<用户名>.github.io',
  base: '/blog',
});
```

## 换配色 / 换排版

`src/styles/global.css` 开头有一段变量，改那几行就够了：

```css
:root {
  --bg: #fdfcfb;      /* 背景 */
  --fg: #1c1b19;      /* 正文 */
  --accent: #b45309;  /* 链接和强调色 */
  --max: 42rem;       /* 正文宽度 */
}
```

深色模式在下面的 `@media (prefers-color-scheme: dark)` 里，跟随系统自动切换，不需要 JS。

## 以后可以加

- **评论**：giscus（数据存在 GitHub Discussions，不用后端）
- **统计**：Umami 或 Cloudflare Web Analytics（都不用 cookie 弹窗）
- **搜索**：Pagefind（构建时生成索引，纯静态）
- **图片**：丢进 `public/`，用 `![](/xxx.png)` 引用

## 技术说明

- Astro 5，输出纯静态 HTML，默认零 JavaScript
- 文章用 Content Collections 管理，frontmatter 有类型校验，写错字段会构建失败并提示
- 所有站内链接都过了 `src/lib/url.ts`，部署到子路径不会出错
