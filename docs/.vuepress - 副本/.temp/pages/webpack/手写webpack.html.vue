<template><h1 id="手写webpack" tabindex="-1"><a class="header-anchor" href="#手写webpack" aria-hidden="true">#</a> 手写webpack</h1>
<p>打包 bundle 原理分析与实现</p>
<p>npx webpack</p>
<p>​	webpack -&gt; config -&gt; 打包入口 输出目录（入口文件在哪） -&gt; 入口文件 -&gt; 分析是否有依赖，以及依赖模块的路径 -&gt; 解析处理内容（es6转es5）-&gt; chunk code（缺失函数，require exports）</p>
<p>首先是构建器</p>
<p>演化：</p>
<p>模块化的道路，现时IIFE，后来commonJS，AMD和CMD的起来，gulp和grund的兴起，后来是wbepack统一配置，rollup的到来，未来的vite和snowpack</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://juejin.cn/post/6844903858179670030" target="_blank" rel="noopener noreferrer">实现一个简单的Webpack<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/vpQq3FcJuQkKXvxsq8c9Bw" target="_blank" rel="noopener noreferrer">90行代码的webpack，你确定不学吗？<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/-8rsHyu2nys_37nVlWiyCg" target="_blank" rel="noopener noreferrer">微医前端带你从头建立构建体系【开篇】<ExternalLinkIcon/></a></li>
</ul>
</template>
