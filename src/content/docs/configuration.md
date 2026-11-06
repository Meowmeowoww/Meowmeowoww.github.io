---
title: 配置说明
description: 第二篇模板，用来演示左侧栏的分组。
group: 指南
order: 2
---

## 分组是怎么来的

`group` 相同的页面会归到左侧栏的同一组下面。上面这篇和这篇就分在「开始」和「指南」两组里。

想调整组的先后顺序，改组里第一篇的 `order` 就行。

<div class="callout callout-warn">
<p class="callout-title">注意</p>
<p>组名请保持一致。<code>指南</code> 和 <code>指南 </code>（多一个空格）会被当成两个不同的组。</p>
</div>

## 加一张自己的图

图片放 `public/` 下，用绝对路径引用：

```md
![替代文字](/images/example.png)
```

## 删掉这篇

不需要分组演示的话，直接删掉这个文件即可，左侧栏会自动更新。
