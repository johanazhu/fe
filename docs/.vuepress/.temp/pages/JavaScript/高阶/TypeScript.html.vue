<template><h1 id="typescript学习笔记" tabindex="-1"><a class="header-anchor" href="#typescript学习笔记" aria-hidden="true">#</a> TypeScript学习笔记</h1>
<p>我是typescript</p>
<p>ts最佳实践
做个todolist</p>
<h2 id="一-简介" tabindex="-1"><a class="header-anchor" href="#一-简介" aria-hidden="true">#</a> 一.简介：</h2>
<h3 id="什么是typescript" tabindex="-1"><a class="header-anchor" href="#什么是typescript" aria-hidden="true">#</a> 什么是TypeScript</h3>
<p>TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对ES6的支持，它由微软开发，代码开源于 GitHub 上</p>
<h3 id="为什么选择typescript" tabindex="-1"><a class="header-anchor" href="#为什么选择typescript" aria-hidden="true">#</a> 为什么选择TypeScript</h3>
<h4 id="增强了代码的可读性和可维护性" tabindex="-1"><a class="header-anchor" href="#增强了代码的可读性和可维护性" aria-hidden="true">#</a> 增强了代码的可读性和可维护性</h4>
<ul>
<li>类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用</li>
<li>可以在编译阶段就发现大部分错误，这总比在运行时候出错好</li>
<li>增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等</li>
</ul>
<h4 id="typescript-拥有活跃的社区" tabindex="-1"><a class="header-anchor" href="#typescript-拥有活跃的社区" aria-hidden="true">#</a> TypeScript 拥有活跃的社区</h4>
<ul>
<li>大部分第三方库都有提供给 TypeScript 的类型定义文件</li>
<li>大公司的开源项目开始用TypeScript 来写，比如antdesign</li>
<li>拥抱 ES6 规范，也支持部分 ESNext 草案的规范</li>
</ul>
<h4 id="typescript的缺点" tabindex="-1"><a class="header-anchor" href="#typescript的缺点" aria-hidden="true">#</a> TypeScript的缺点</h4>
<ul>
<li>有一定的学习成本，需要理解接口（Interfaces）、泛型（Generices）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念</li>
<li>增加开发成本，毕竟要写类型定义</li>
<li>与一些库结合不是很完美</li>
</ul>
<h3 id="安装-typescript" tabindex="-1"><a class="header-anchor" href="#安装-typescript" aria-hidden="true">#</a> 安装 TypeScript</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g typescript
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>以上命令会在全局环境下安装  <code>tsc</code> 命令，安装完成之后，我们就可以在任何地方执行 <code>tsc</code> 命令了</p>
<p>编译一个 TypeScript 文件很简单</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>tsc hello.ts
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我们约定使用 TypeScript 编写的文件以 <code>.ts</code> 为后缀，用 TypeScript 编写 React 时， 以 <code>.tsx</code> 为后缀</p>
<h3 id="hello-typescript" tabindex="-1"><a class="header-anchor" href="#hello-typescript" aria-hidden="true">#</a> Hello TypeScript</h3>
<p>从一个简单的例子开始，创建文件 <code>hello.ts</code></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">sayHello</span><span class="token punctuation">(</span>person<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>person<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token string">'To,'</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">sayHello</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后执行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>tsc hello.ts
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>TypeScript 是 javaScript 的超集其实就是原生ES语法+Type 类型</p>
<p>切记 所有的ts的依赖，都必须是@types 开头的，否则用不了</p>
<ul>
<li>类型定义：每一个变量都需要定义它的类型</li>
<li>引用第三方类库：第三方库如果不是 <code>TypeScript</code> 写的，没有提供声明文件，就需要去为第三方库编写声明文件</li>
<li>新概念：<code>TypeScript</code> 中引入的类型（Types）、类（Classes）、泛型（Generics）、接口（Interfaces）以及枚举（Enums）</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://ts.xcatliu.com/" target="_blank" rel="noopener noreferrer">TypeScript 入门教程<ExternalLinkIcon/></a></li>
<li><a href="https://blog.fundebug.com/2021/06/28/typescript-the-difference-between-interface-and-type/" target="_blank" rel="noopener noreferrer">使用 TypeScript 常见困惑：interface 和 type 的区别是什么？<ExternalLinkIcon/></a></li>
<li><a href="https://tuture.co/tags/Typescript/" target="_blank" rel="noopener noreferrer">图雀的typescript 教程<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000021210413" target="_blank" rel="noopener noreferrer">4000字讲清 《深入理解TypeScript》一书 【基础篇】<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/gAwvcmSNYMwQKk6RY-GaEw" target="_blank" rel="noopener noreferrer">编写高质量可维护的代码：Awesome TypeScript<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/JTfzexEh0qYDWHCT4l337A" target="_blank" rel="noopener noreferrer">又升级了！你不知道的 TypeScript 泛型（千字长文，建议收藏）<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/fe_VqsoEErmBF6y5pph99A" target="_blank" rel="noopener noreferrer">总结TypeScript在项目开发中的应用实践体会<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/TzkAQrDYR2O2VeauYCSWhw" target="_blank" rel="noopener noreferrer">30个小知识让你更清楚TypeScript<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/285270177" target="_blank" rel="noopener noreferrer">了不起的 tsconfig.json 指南<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/v7uZrEmEaPVfL76PHGD1oQ" target="_blank" rel="noopener noreferrer">字节 React + TypeScript 实践总结篇<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/B7sdfzu6ZBbfwSdB34rGGA" target="_blank" rel="noopener noreferrer">最全的TypeScript学习指南<ExternalLinkIcon/></a></li>
</ul>
</template>
