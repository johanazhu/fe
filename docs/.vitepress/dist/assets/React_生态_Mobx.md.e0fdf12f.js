import{_ as e,c as l,o as i,d as a}from"./app.590c1fbf.js";const u=JSON.parse('{"title":"Mobx","description":"","frontmatter":{},"headers":[{"level":2,"title":"Mobx 是什么","slug":"mobx-是什么","link":"#mobx-是什么","children":[]},{"level":2,"title":"Mobx 的实现原理","slug":"mobx-的实现原理","link":"#mobx-的实现原理","children":[]},{"level":2,"title":"为什么要用 Mobx","slug":"为什么要用-mobx","link":"#为什么要用-mobx","children":[]},{"level":2,"title":"Mobx 要点","slug":"mobx-要点","link":"#mobx-要点","children":[]},{"level":2,"title":"概念与原则","slug":"概念与原则","link":"#概念与原则","children":[]},{"level":2,"title":"核心 API","slug":"核心-api","link":"#核心-api","children":[]},{"level":2,"title":"Mobx 与 React 的应用场景","slug":"mobx-与-react-的应用场景","link":"#mobx-与-react-的应用场景","children":[]},{"level":2,"title":"Mobx 原理","slug":"mobx-原理","link":"#mobx-原理","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"React/生态/Mobx.md"}'),r={name:"React/生态/Mobx.md"},t=a('<h1 id="mobx" tabindex="-1">Mobx <a class="header-anchor" href="#mobx" aria-hidden="true">#</a></h1><h2 id="mobx-是什么" tabindex="-1">Mobx 是什么 <a class="header-anchor" href="#mobx-是什么" aria-hidden="true">#</a></h2><ul><li><p>Mobx 是一个简单的、可扩展的、经过测试的状态管理解决方案</p></li><li><p>简单到令人发指的状态管理解决方案</p></li><li><p>掌握核心 API</p><ul><li>observable</li><li>action</li></ul></li></ul><h2 id="mobx-的实现原理" tabindex="-1">Mobx 的实现原理 <a class="header-anchor" href="#mobx-的实现原理" aria-hidden="true">#</a></h2><p><img src="https://i.loli.net/2021/09/13/dtewNqa1rEUylR2.png" alt="image-20210913062914362"></p><h2 id="为什么要用-mobx" tabindex="-1">为什么要用 Mobx <a class="header-anchor" href="#为什么要用-mobx" aria-hidden="true">#</a></h2><ul><li>学习成本低</li><li>方便管理</li><li>效果比肩 Redux</li></ul><h2 id="mobx-要点" tabindex="-1">Mobx 要点 <a class="header-anchor" href="#mobx-要点" aria-hidden="true">#</a></h2><ul><li>使用 mobx 让一个应用变成响应式只需要 3 步 <ul><li>定义状态并使其可观察 <ul><li>Observable 定义数据结构，可以为对象，数组，类等等</li></ul></li></ul></li><li>创建视图以响应状态的变化 <ul><li>@observer 观察</li></ul></li><li>更改状态 <ul><li>@action 动作</li></ul></li></ul><h2 id="概念与原则" tabindex="-1">概念与原则 <a class="header-anchor" href="#概念与原则" aria-hidden="true">#</a></h2><ol><li>state（状态） <ul><li>state 就是驱动应用的数据</li></ul></li><li>derivations（衍生） <ul><li>任何源自状态并且不会有任何进一步的相互作用的东西就是衍生 <ul><li>用户界面</li><li>衍生数据</li><li>后端集成</li></ul></li></ul></li><li>action（动作） <ul><li>动作是任一一段可以改变状态的代码。用户事件、后端数据推送、预定事件、等等</li></ul></li></ol><h2 id="核心-api" tabindex="-1">核心 API <a class="header-anchor" href="#核心-api" aria-hidden="true">#</a></h2><ul><li>Observable：可以为 JS 的基本数据类型、引用类型、普通类型、类实例、数组和映射</li><li>Computed：计算值（自动响应状态的值）</li><li>Reactions： 反应 （自动响应状态的副作用）——在 mobx-react 中以 observer 为例</li><li>Actions：动作，动作用来修改状态</li></ul><h2 id="mobx-与-react-的应用场景" tabindex="-1">Mobx 与 React 的应用场景 <a class="header-anchor" href="#mobx-与-react-的应用场景" aria-hidden="true">#</a></h2><h2 id="mobx-原理" tabindex="-1">Mobx 原理 <a class="header-anchor" href="#mobx-原理" aria-hidden="true">#</a></h2><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="https://zh.mobx.js.org/the-gist-of-mobx.html" target="_blank" rel="noreferrer">mobx 官网</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651234690&amp;idx=2&amp;sn=2aa41bd2804a25aa5a9052ff940a5757&amp;chksm=bd4978068a3ef1100c0be3f27edb7c5c9353eb011610a576930b17e010685620b4d16ecbfb6a&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1574207008025&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">Mobx 简明教程</a></li><li><a href="https://github.com/ascoders/blog/issues/19" target="_blank" rel="noreferrer">从零开始用 proxy 实现 mobx</a></li><li><a href="https://github.com/sorrycc/blog/issues/2" target="_blank" rel="noreferrer">MobX 入门教程</a></li><li><a href="https://github.com/sorrycc/blog/issues/3" target="_blank" rel="noreferrer">MobX 原理</a></li><li><a href="https://github.com/chenxiaochun/blog/issues/51" target="_blank" rel="noreferrer">https://github.com/chenxiaochun/blog/issues/51</a></li><li><a href="https://mp.weixin.qq.com/s/zWp-qSVeOjzHKiOYLi2s0g" target="_blank" rel="noreferrer">MobX 的实现原理是？</a></li></ul>',17),o=[t];function h(s,b,n,d,c,x){return i(),l("div",null,o)}const p=e(r,[["render",h]]);export{u as __pageData,p as default};
