import{_ as e,c as i,o as l,d as a}from"./app.590c1fbf.js";const f=JSON.parse('{"title":"渲染进程中的线程","description":"","frontmatter":{},"headers":[{"level":2,"title":"写在面前","slug":"写在面前","link":"#写在面前","children":[]},{"level":2,"title":"一句话解释","slug":"一句话解释","link":"#一句话解释","children":[]},{"level":2,"title":"由什么组成","slug":"由什么组成","link":"#由什么组成","children":[{"level":3,"title":"GUI 渲染线程","slug":"gui-渲染线程","link":"#gui-渲染线程","children":[]},{"level":3,"title":"JS 引擎线程","slug":"js-引擎线程","link":"#js-引擎线程","children":[]},{"level":3,"title":"事件触发线程","slug":"事件触发线程","link":"#事件触发线程","children":[]},{"level":3,"title":"定时触发器线程","slug":"定时触发器线程","link":"#定时触发器线程","children":[]},{"level":3,"title":"异步 HTTP 请求线程","slug":"异步-http-请求线程","link":"#异步-http-请求线程","children":[]},{"level":3,"title":"为什么 GUI 渲染线程与 JS 引擎线程互斥","slug":"为什么-gui-渲染线程与-js-引擎线程互斥","link":"#为什么-gui-渲染线程与-js-引擎线程互斥","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"Browser/渲染进程中的线程.md"}'),r={name:"Browser/渲染进程中的线程.md"},t=a('<h1 id="渲染进程中的线程" tabindex="-1">渲染进程中的线程 <a class="header-anchor" href="#渲染进程中的线程" aria-hidden="true">#</a></h1><h2 id="写在面前" tabindex="-1">写在面前 <a class="header-anchor" href="#写在面前" aria-hidden="true">#</a></h2><p>上一章我们介绍了 <a href="./浏览器架构.html">浏览器架构</a> 。介绍了现代浏览器的架构为多进程架构，它由浏览器主进程、GPU 进程、网络进程、音频进程、存储进程、多个渲染进程和多个插件进程组成（89.0.4389.90 版本 Chrome）。我们也说了线程的崩坏会导致页面（渲染进程）卡死，但不会影响其他页面。</p><p>那么渲染进程有什么组成？这个很重要，因为它是页面渲染、事件循环的基础。</p><h2 id="一句话解释" tabindex="-1">一句话解释 <a class="header-anchor" href="#一句话解释" aria-hidden="true">#</a></h2><p>渲染进程就是我们常说的浏览器内核，负责页面渲染，脚本执行，事件处理等，每个 tab 页就是一个渲染进程</p><p>渲染进程中包括 GUI 渲染线程、 JS 引擎线程、事件触发线程、网络异步线程、定时器线程</p><p>渲染进程内部包含主线程、工作线程、合成线程和光栅线程</p><h2 id="由什么组成" tabindex="-1">由什么组成 <a class="header-anchor" href="#由什么组成" aria-hidden="true">#</a></h2><h3 id="gui-渲染线程" tabindex="-1">GUI 渲染线程 <a class="header-anchor" href="#gui-渲染线程" aria-hidden="true">#</a></h3><ul><li>负责渲染浏览器界面，解析 HTML、CSS，构建 DOM 树和 RenderObject 树，布局和绘制等</li><li>当界面需要重绘或由于某种操作引发回流时，该线程就会执行</li><li>注意，GUI 渲染线程与 JS 引擎线程时互斥的，当 JS 引擎执行时 GUI 线程会被挂在，GUI 更新会被保存在一个队列中等待 JS 引擎空闲时立即被执行</li></ul><h3 id="js-引擎线程" tabindex="-1">JS 引擎线程 <a class="header-anchor" href="#js-引擎线程" aria-hidden="true">#</a></h3><ul><li>也称为 JS 内核，负责处理 JavaScript 脚本程序（例如 V8 引擎）</li><li>负责处理解析和执行 JavaScript 脚本程序</li><li>只有一个 JS 引擎线程（单线程）</li><li>与 GUI 渲染线程互斥，防止渲染结果不可预期</li></ul><h3 id="事件触发线程" tabindex="-1">事件触发线程 <a class="header-anchor" href="#事件触发线程" aria-hidden="true">#</a></h3><ul><li>用来控制事件循环（鼠标点击、setTimeout、Ajax 等）</li><li>当事件满足触发条件时，将事件放入到 JS 引擎所在的执行队列中</li><li>归属于浏览器而不是<code>JS</code>引擎，用来控制事件循环</li></ul><h3 id="定时触发器线程" tabindex="-1">定时触发器线程 <a class="header-anchor" href="#定时触发器线程" aria-hidden="true">#</a></h3><ul><li><code>setTimeout</code>和<code>setInterval</code>所在的线程</li><li>定时任务并不是由 JS 引擎计时的，是由定时触发线程来计时</li><li>计时完毕后，通知事件触发线程</li></ul><h3 id="异步-http-请求线程" tabindex="-1">异步 HTTP 请求线程 <a class="header-anchor" href="#异步-http-请求线程" aria-hidden="true">#</a></h3><ul><li>浏览器有一个单独的线程用于处理 AJAX 请求</li><li>当请求完成时，若有回调函数，通知事件触发线程</li></ul><h3 id="为什么-gui-渲染线程与-js-引擎线程互斥" tabindex="-1">为什么 GUI 渲染线程与 JS 引擎线程互斥 <a class="header-anchor" href="#为什么-gui-渲染线程与-js-引擎线程互斥" aria-hidden="true">#</a></h3><p>这是由于 JS 是可以操作 DOM 的，如果同时修改元素属性并同时渲染界面（即 JS 线程 和 UI 线程同时运行），那么渲染线程前后获得的元素就可能不一致了</p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><p><a href="https://segmentfault.com/a/1190000014018604" target="_blank" rel="noreferrer">浏览器渲染机制</a></p></li><li><p><a href="https://juejin.cn/post/6844903919789801486#heading-5" target="_blank" rel="noreferrer">「前端进阶」从多线程到 Event Loop 全面梳理</a></p></li></ul>',23),h=[t];function d(n,s,c,o,u,p){return l(),i("div",null,h)}const S=e(r,[["render",d]]);export{f as __pageData,S as default};
