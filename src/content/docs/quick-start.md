---
title: 快速开始
description: 这一页是模板，把里面的占位文字换成你自己的内容就行。
group: 开始
order: 1
---

## 这份模板怎么用

左边那栏会自动列出 `src/content/docs/` 里所有 `.md` 文件，按 frontmatter 的 `group` 分组、`order` 排序。你不需要手动维护导航。

新增一页就是新建一个文件：

```yaml
---
title: 页面标题
description: 一句话摘要，会显示在标题下面
group: 开始
order: 2
---
```

<div class="callout callout-info">
<p class="callout-title">提示</p>
<p>文件名就是网址。<code>quick-start.md</code> 会变成 <code>/docs/quick-start/</code>，所以别用中文和空格。</p>
</div>

## 能用的排版元素

### 提示框

三种颜色，分别对应「补充说明 / 注意事项 / 危险操作」：

<div class="callout callout-info">
<p class="callout-title">补充说明</p>
<p>蓝色，用来放可有可无的背景信息。</p>
</div>

<div class="callout callout-warn">
<p class="callout-title">注意</p>
<p>黄色，用来放「不做就会出问题」的事。</p>
</div>

<div class="callout callout-danger">
<p class="callout-title">危险</p>
<p>红色，用来放「做了就回不来」的事，比如删数据、改线上配置。</p>
</div>

### 卡片链接

适合做「相关页面 / 外部资源」的入口：

<div class="card-grid">
  <a class="card" href="#">
    <span class="card-title">卡片标题</span>
    <span class="card-desc">一句话说明这张卡片通向哪里。</span>
  </a>
  <a class="card" href="#">
    <span class="card-title">第二张卡片</span>
    <span class="card-desc">会按容器宽度自动排列，窄屏下变成一列。</span>
  </a>
</div>

### 代码块

```ts
export function greet(name: string): string {
  return `你好，${name}`;
}
```

行内代码长这样：`import.meta.env`。

### 表格

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | 页面标题，必填 |
| `group` | string | 左侧栏分组，默认「文档」 |
| `order` | number | 越小越靠前 |

### 列表和引用

- 普通列表项
- 第二项，可以嵌 `代码`
- 第三项

> 引用块适合放一段别人的原话，或者需要强调的一句话。

---

以上就是全部可用的件。把不需要的直接删掉，剩下的替换成你自己的内容。
