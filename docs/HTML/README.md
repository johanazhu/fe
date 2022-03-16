# HTML 面试点汇总

HTML 是网站的基础，是最开始的灵魂，如果说网站的基础构成，那么非它莫属

## DOCTYPE 的作用？标准模式（严格模式）和 兼容模式（混杂模式）有什么区别？

声明位于 HTML 文档中的第一行，处于标签之前，告知浏览器解析器，需要用声明文档去解析这个文档

-   标准模式的排版和 JS 运行模式是以浏览器支持的最高标准运行
-   兼容模式模式中，页面以宽松向后兼容的方式去显示，模拟老式浏览器的行为以防止站点无法工作

## 行内元素有哪些？块级元素有哪些？

```
行内：<a>、<b>、<span>、<img>、<input>、<select>...
块级：<div> <ul> <ol> <li> <dl> <dt> <dd> <h1> .. <h6> <p>
```

块级元素和行内元素的区别：

1. 块级元素独占一行，块级元素内可嵌套部分块级元素，而行内元素不能嵌套块级元素
2. 块级元素可设置 margin、padding，但是行内元素只有 margin-left/right 和 padding-left/right 有效
3. 块级 display:block；行内：display:inline（行内块：display: inline-block）

## 参考资料

-   [前端面试-HTML 篇](https://github.com/PDKSophia/blog.io/blob/master/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95-HTML%E7%AF%87.md)
