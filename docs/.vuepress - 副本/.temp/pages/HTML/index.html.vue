<template><h1 id="html面试点汇总" tabindex="-1"><a class="header-anchor" href="#html面试点汇总" aria-hidden="true">#</a> HTML面试点汇总</h1>
<p>HTML 是网站的基础，是最开始的灵魂，如果说网站的基础构成，那么非它莫属</p>
<h2 id="doctype-的作用-标准模式-严格模式-和-兼容模式-混杂模式-有什么区别" tabindex="-1"><a class="header-anchor" href="#doctype-的作用-标准模式-严格模式-和-兼容模式-混杂模式-有什么区别" aria-hidden="true">#</a> DOCTYPE 的作用？标准模式（严格模式）和 兼容模式（混杂模式）有什么区别？</h2>
<p>声明位于 HTML 文档中的第一行，处于标签之前，告知浏览器解析器，需要用声明文档去解析这个文档</p>
<ul>
<li>标准模式的排版和 JS 运行模式是以浏览器支持的最高标准运行</li>
<li>兼容模式模式中，页面以宽松向后兼容的方式去显示，模拟老式浏览器的行为以防止站点无法工作</li>
</ul>
<h2 id="行内元素有哪些-块级元素有哪些" tabindex="-1"><a class="header-anchor" href="#行内元素有哪些-块级元素有哪些" aria-hidden="true">#</a> 行内元素有哪些？块级元素有哪些？</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>行内：&lt;a>、&lt;b>、&lt;span>、&lt;img>、&lt;input>、&lt;select>...
块级：&lt;div> &lt;ul> &lt;ol> &lt;li> &lt;dl> &lt;dt> &lt;dd> &lt;h1> .. &lt;h6> &lt;p>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>块级元素和行内元素的区别：</p>
<ol>
<li>块级元素独占一行，块级元素内可嵌套部分块级元素，而行内元素不能嵌套块级元素</li>
<li>块级元素可设置 margin、padding，但是行内元素只有 margin-left/right 和 padding-left/right 有效</li>
<li>块级 display:block；行内：display:inline（行内块：display: inline-block）</li>
</ol>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://github.com/PDKSophia/blog.io/blob/master/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95-HTML%E7%AF%87.md" target="_blank" rel="noopener noreferrer">前端面试-HTML篇<ExternalLinkIcon/></a></li>
</ul>
</template>
