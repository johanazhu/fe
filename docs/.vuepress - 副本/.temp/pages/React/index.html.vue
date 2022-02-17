<template><h1 id="react-导航" tabindex="-1"><a class="header-anchor" href="#react-导航" aria-hidden="true">#</a> React 导航</h1>
<blockquote>
<p>学习一个东西之前，首先在大脑中积累充分的”疑惑感“。即弄清面临的问题到底是什么，在浏览方法本身之前，最好先使劲问问自己都想到什么方法。一个公认的事实是，你对问题的疑惑越大，在之前做的自己的思考越多，当看到解答之后印象就越深刻</p>
</blockquote>
<p>俺是做 React 开发的，React 的知识点有很多，延伸出的点更多，该如何做取舍？我们是要做到事无巨细逐个分析，还是针对常见问题进行讲解。我认为，没有一个全面的指导思路路会走窄，而一味求全只做蜻蜓点水式的了解根本进不了大厂。所以俺不得既要全，又要深。本章节以常见面试题为抓手，测量自己对 React 的了解程度，再对每个知识点进行分析讲解，能做多少就做多少，尽量都写到</p>
<h2 id="react-面试题" tabindex="-1"><a class="header-anchor" href="#react-面试题" aria-hidden="true">#</a> React 面试题</h2>
<p>这些面试题基本和基础知识点中的知识点有所联系，</p>
<ul>
<li>
<p><RouterLink to="/React/%E9%9D%A2%E8%AF%95%E9%A2%98/">常见面试题</RouterLink></p>
</li>
<li>
<p><RouterLink to="/React/%E9%9D%A2%E8%AF%95%E9%A2%98/%E4%BB%A3%E7%A0%81%E9%A2%98.html">代码题</RouterLink></p>
</li>
<li>
<p><RouterLink to="/React/%E9%9D%A2%E8%AF%95%E9%A2%98/%E6%B8%B2%E6%9F%93%E5%8D%81%E4%B8%87%E6%9D%A1%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html">渲染十万条数据解决方案</RouterLink></p>
</li>
</ul>
<h2 id="react-各种知识点" tabindex="-1"><a class="header-anchor" href="#react-各种知识点" aria-hidden="true">#</a> React 各种知识点</h2>
<ul>
<li>
<p><RouterLink to="/React/React%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3.html">React 快速了解</RouterLink></p>
</li>
<li>
<p><RouterLink to="/React/%E6%A0%B8%E5%BF%83API.html">核心 API</RouterLink></p>
<ul>
<li>Component</li>
<li>pureComponent</li>
<li>createElement
<ul>
<li>JSX 就是通过 babel 转换为 createElement</li>
</ul>
</li>
<li>cloneElement</li>
<li><RouterLink to="/React/Ref.html">Ref</RouterLink></li>
<li>portal 传送门</li>
<li>context</li>
<li>children</li>
<li>...</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/VirtualDOM.html">VirtualDOM</RouterLink></p>
<ul>
<li>是什么？</li>
<li>它的作用？</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/Diff.html">Diff</RouterLink></p>
<ul>
<li>是什么？</li>
<li>在其中起到什么作用</li>
<li>它的本质？抽象语法树（AST）</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/%E5%BF%AB%E9%97%AE%E5%BF%AB%E7%AD%94setState.html">setState</RouterLink></p>
<ul>
<li>为什么要用 setState，而不是直接 <code>this.statet.xx == oo</code>？</li>
<li>setState 异步的原理，为什么出现</li>
<li>表现出异步后如何拿到更新后的 state</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6%E4%B8%8E%E7%B1%BB%E7%BB%84%E4%BB%B6%E6%9C%89%E4%BD%95%E4%B8%8D%E5%90%8C.html">函数式组件与类组件有何不同</RouterLink></p>
</li>
<li>
<p><RouterLink to="/React/Hooks.html">Hooks</RouterLink></p>
<ul>
<li>是什么？</li>
<li>有什么用？优缺点？</li>
<li>它的本质是什么？</li>
<li><RouterLink to="/React/Hooks%E8%B8%A9%E5%9D%91.html">Hooks 踩坑</RouterLink></li>
<li>手写</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6.html">事件机制</RouterLink></p>
</li>
<li>
<p><RouterLink to="/React/Fiber.html">Fiber</RouterLink></p>
<ul>
<li>为什么会有？</li>
<li>架构是怎么样的</li>
<li>为什么要了解</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html">性能优化</RouterLink></p>
<ul>
<li>方法</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/Ref.html">Ref</RouterLink></p>
<ul>
<li>是什么？</li>
<li>不同阶段 ref 的用法</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.html">生命周期</RouterLink></p>
<ul>
<li>class 才有生命周期</li>
<li>15 的生命周期</li>
<li>16.3 的生命周期</li>
<li>16.4 及以上的生命周期</li>
</ul>
</li>
</ul>
<h2 id="生态" tabindex="-1"><a class="header-anchor" href="#生态" aria-hidden="true">#</a> 生态</h2>
<ul>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/Immutable.html">Immutable</RouterLink>
<ul>
<li>数据不可变是什么</li>
</ul>
</li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/Redux.html">Redux</RouterLink>
<ul>
<li>是什么？ 单向数据流</li>
<li>有什么用？</li>
<li>手写</li>
</ul>
</li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/ReactRedux.html">ReactRedux</RouterLink>
<ul>
<li>连接 React 与 Redux</li>
<li>手写</li>
</ul>
</li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/Redux-Sage.html">Redux-Sage</RouterLink>
<ul>
<li>Redux 异步解决方案</li>
<li>手写</li>
</ul>
</li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/Redux-thunk.html">Redux-thunk</RouterLink>
<ul>
<li>Redux 异步解决方案</li>
<li>手写</li>
</ul>
</li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/Dva.html">Dva</RouterLink>
<ul>
<li>集成了 Redux+Redux-Sage</li>
<li>手写</li>
</ul>
</li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/Mobx.html">Mobx</RouterLink>
<ul>
<li>是什么？另一个状态库</li>
<li>原理</li>
</ul>
</li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/%E5%90%84%E4%B8%AA%E7%8A%B6%E6%80%81%E5%BA%93%E5%AF%B9%E6%AF%94.html">各个状态库对比</RouterLink></li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/ReactRouter.html">ReactRouter</RouterLink>
<ul>
<li>单页面路由的本质</li>
<li>手写</li>
</ul>
</li>
<li><RouterLink to="/React/%E7%94%9F%E6%80%81/ReactSSR.html">ReactSSR</RouterLink></li>
</ul>
<h2 id="手写-react" tabindex="-1"><a class="header-anchor" href="#手写-react" aria-hidden="true">#</a> 手写 React</h2>
<ul>
<li>JSX 和 虚拟 DOM</li>
<li>组件和生命周期</li>
<li>diff 算法</li>
<li>异步的 setState</li>
</ul>
<h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2>
<ul>
<li>
<p><RouterLink to="/React/%E5%AE%9E%E6%88%98/React%E4%BB%A3%E7%A0%81%E6%95%B4%E6%B4%81%E4%B9%8B%E9%81%93.html">React 代码整洁之道</RouterLink></p>
</li>
<li>
<p><RouterLink to="/React/%E5%AE%9E%E6%88%98/%E6%90%AD%E5%BB%BA%E6%88%91%E7%9A%84React+TS%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.html">搭建我的 React+TS 最佳实践</RouterLink></p>
</li>
<li>
<p><RouterLink to="/React/%E5%AE%9E%E6%88%98/%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95.html">自动化测试</RouterLink></p>
</li>
<li>
<p><RouterLink to="/React/%E5%AE%9E%E6%88%98/TodoList.html">TodoList</RouterLink></p>
<ul>
<li>开源</li>
<li>搭建多个版本</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/%E5%AE%9E%E6%88%98/UI%E7%BB%84%E4%BB%B6.html">UI 组件</RouterLink></p>
<ul>
<li>开源</li>
<li>jingui</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/%E5%AE%9E%E6%88%98/MovMov.html">MovMov</RouterLink></p>
<ul>
<li>开源</li>
<li>力求 star 1000 以上</li>
</ul>
</li>
<li>
<p><RouterLink to="/React/%E5%AE%9E%E6%88%98/%E4%BB%BFTapTap%E9%BB%98%E8%AE%A4%E9%A2%9C%E8%89%B2%E5%8F%96%E6%B5%B7%E6%8A%A5%E9%A2%9C%E8%89%B2.html">仿 TapTap 默认颜色取海报颜色</RouterLink></p>
</li>
</ul>
<p>React 前端工程师学习路径</p>
<p>https://github.com/tuture-dev/react-roadmap</p>
</template>
