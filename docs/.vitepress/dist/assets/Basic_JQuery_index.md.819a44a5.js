import{_ as s,c as a,o as n,d as l}from"./app.590c1fbf.js";const h=JSON.parse('{"title":"jQuery 导航","description":"","frontmatter":{},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"什么是 jQuery?","slug":"什么是-jquery","link":"#什么是-jquery","children":[]},{"level":2,"title":"用法","slug":"用法","link":"#用法","children":[{"level":3,"title":"选择器","slug":"选择器","link":"#选择器","children":[]},{"level":3,"title":"操作DOM","slug":"操作dom","link":"#操作dom","children":[]},{"level":3,"title":"事件","slug":"事件","link":"#事件","children":[]},{"level":3,"title":"动画","slug":"动画","link":"#动画","children":[]},{"level":3,"title":"工具","slug":"工具","link":"#工具","children":[]},{"level":3,"title":"各种组合","slug":"各种组合","link":"#各种组合","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"Basic/JQuery/index.md"}'),e={name:"Basic/JQuery/index.md"},p=l(`<h1 id="jquery-导航" tabindex="-1">jQuery 导航 <a class="header-anchor" href="#jquery-导航" aria-hidden="true">#</a></h1><p>在线文档：<a href="https://devdocs.io/jquery/" target="_blank" rel="noreferrer">https://devdocs.io/jquery/</a></p><p><a href="https://api.jquery.com/" target="_blank" rel="noreferrer">https://api.jquery.com/</a></p><p>jQuery 别人都说它已经过时了，但技术虽然过时，但设计理念还一直在，我们要学的是其设计理念</p><p>这一章我们着重学习它的源码以及如何设计一个插件</p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-hidden="true">#</a></h2><p>jQuery 学习通常会经历三个阶段</p><ul><li>会用 jQuery</li><li>能抽象成插件</li><li>让插件足够灵活强大</li><li>阅读源码，学习源码的写法</li></ul><h2 id="什么是-jquery" tabindex="-1">什么是 jQuery? <a class="header-anchor" href="#什么是-jquery" aria-hidden="true">#</a></h2><p>jQuery 是一个 JavaScript 函数库。</p><p>jQuery 是一个轻量级的&quot;写的少，做的多&quot;的 JavaScript 库。</p><p>jQuery 库包含以下功能：</p><ul><li>HTML 元素选取</li><li>HTML 元素操作</li><li>CSS 操作</li><li>HTML 事件函数</li><li>JavaScript 特效和动画</li><li>HTML DOM 遍历和修改</li><li>AJAX</li><li>Utilities</li></ul><h2 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-hidden="true">#</a></h2><h3 id="选择器" tabindex="-1">选择器 <a class="header-anchor" href="#选择器" aria-hidden="true">#</a></h3><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">this</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 选择当前HTML元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">p</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 选择所有 &lt;p&gt; 元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.left</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 选择 class=&quot;left&quot; 的元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">p.left</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 选择所有 class=&quot;left&quot; 的 &lt;p&gt; 元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#main</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 选择 id=&quot;main&quot; 的元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#main p</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 选择 id=&quot;main&quot; 下的所有 p 元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ul li:first</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 选择 &lt;ul&gt; 中的第一个 &lt;li&gt; 元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ul li:last</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 选择 &lt;ul&gt; 中的最后一个 &lt;li&gt; 元素</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="操作dom" tabindex="-1">操作DOM <a class="header-anchor" href="#操作dom" aria-hidden="true">#</a></h3><h3 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-hidden="true">#</a></h3><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">ready</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 文档准备就绪事件</span></span>
<span class="line"><span style="color:#82AAFF;">click</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 单击事件</span></span>
<span class="line"><span style="color:#82AAFF;">dblclick</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 双击事件</span></span>
<span class="line"><span style="color:#82AAFF;">focus</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 获取焦点事件</span></span>
<span class="line"><span style="color:#82AAFF;">blur</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 失去焦点事件</span></span>
<span class="line"><span style="color:#82AAFF;">mouseover</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 鼠标经过事件</span></span>
<span class="line"><span style="color:#82AAFF;">change</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 改变事件</span></span>
<span class="line"><span style="color:#82AAFF;">scroll</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 滚动事件</span></span>
<span class="line"><span style="color:#82AAFF;">toggle</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="动画" tabindex="-1">动画 <a class="header-anchor" href="#动画" aria-hidden="true">#</a></h3><h3 id="工具" tabindex="-1">工具 <a class="header-anchor" href="#工具" aria-hidden="true">#</a></h3><h3 id="各种组合" tabindex="-1">各种组合 <a class="header-anchor" href="#各种组合" aria-hidden="true">#</a></h3><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">this</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hide</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 隐藏当前元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">p</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hide</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 隐藏所有 p 标签元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">p.test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hide</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 隐藏所有 class=”test&quot; 的 p 标签元素</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hide</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 隐藏 id=&quot;test&quot; 的元素</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="http://i5ting.github.io/How-to-write-jQuery-plugin/build/jquery.plugin.html#1" target="_blank" rel="noreferrer">如何动手写一个 jQuery 插件</a></li><li><a href="https://fangyinghang.com/why-still-jquery/" target="_blank" rel="noreferrer">jQuery 都过时了，那我还学它干嘛？</a></li></ul>`,25),t=[p];function o(r,i,c,y,u,d){return n(),a("div",null,t)}const D=s(e,[["render",o]]);export{h as __pageData,D as default};
