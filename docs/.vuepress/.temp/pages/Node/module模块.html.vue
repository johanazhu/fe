<template><h1 id="node中的模块机制" tabindex="-1"><a class="header-anchor" href="#node中的模块机制" aria-hidden="true">#</a> Node中的模块机制</h1>
<p>之前没有模块化</p>
<p>模块化的历程</p>
<p>简单来说：</p>
<p>IIFE——CommonJS——AMD/CMD——ES6模块...</p>
<p>https://tuture.co/2019/12/03/892fa12/</p>
<h3 id="什么是-node-模块" tabindex="-1"><a class="header-anchor" href="#什么是-node-模块" aria-hidden="true">#</a> 什么是 Node 模块</h3>
<p>在正是分析 Node 模块机制之前，我们需要明确定义什么是 Node 模块。通常来说，Node 模块可分为两大类：</p>
<ul>
<li>核心模块：Node 提供的内置模块，在安装 Node 时已经被编译成二进制可执行文件</li>
<li>文件模块：用户编写的模块，可以是自己写的，也可以使通过 npm 安全的</li>
</ul>
<p>exports 对象本质上是 module.exports 的引用。也就是说，下面两行代码是等价的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 导出 add 函数</span>
exports<span class="token punctuation">.</span>add <span class="token operator">=</span> add<span class="token punctuation">;</span>

<span class="token comment">// 和上面一行代码是一样的</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>add <span class="token operator">=</span> add<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>module 对象</p>
<p>module 在每个模块中表示对当前模块的引用。而 module.exports 又可以通过全局对象 exports 来引用。module 并不是一个全局对象，而更像一个模块内部对象</p>
<h5 id="module-children" tabindex="-1"><a class="header-anchor" href="#module-children" aria-hidden="true">#</a> module.children</h5>
<p>这个模块引入的所有模块对象</p>
<h5 id="module-exports" tabindex="-1"><a class="header-anchor" href="#module-exports" aria-hidden="true">#</a> module.exports</h5>
<p>module.exports 通过模块系统创建。</p>
<p>https://juejin.cn/post/6844904029219192839</p>
<p>Node.Js 模块系统源码探微</p>
<p>https://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&amp;mid=2247483885&amp;idx=1&amp;sn=eb4dd408d58774dc1587f0d6705eb8a2&amp;chksm=e9537fb5de24f6a310a36b8d46623ec534a94a5ff09d7deb6191124e14c39b0667ef465059e4&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1575817441587&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd</p>
<h2 id="export-与-module-export-的区别" tabindex="-1"><a class="header-anchor" href="#export-与-module-export-的区别" aria-hidden="true">#</a> export 与 module.export 的区别</h2>
<p>导出多个成员（必须在对象中）</p>
<p>exports.a = 123
exports.b = 'hello'
exports.c = function(){
console.log('ccc')
}
exports.d = {
foo: 'bar'
}
导出多个成员也可以这样写</p>
<p>module.exports = {
foo: 'bar',
add: function () {
console.log('aa')
}
}
导出单个成员（拿到的就是：函数，字符串）
module.exports = 'hello'
以下情况会覆盖：</p>
<p>module.exports = 'hello'</p>
<p>// 以这个为准，后者会覆盖前者
module.exports = function(x, y) {
return x + y
}
exports 是 module.exports 的一个引用</p>
<p>console.log(exports === module.exports) // =&gt; true</p>
<p>exports.foo = 'bar'</p>
<p>// 等价于
module.exports.foo = 'bar'</p>
<p>require和import</p>
<p>https://segmentfault.com/a/1190000014434944</p>
</template>
