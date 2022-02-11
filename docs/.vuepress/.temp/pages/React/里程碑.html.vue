<template><h1 id="react里程碑" tabindex="-1"><a class="header-anchor" href="#react里程碑" aria-hidden="true">#</a> React里程碑</h1>
<p>V...</p>
<p>V15</p>
<h3 id="v16-0" tabindex="-1"><a class="header-anchor" href="#v16-0" aria-hidden="true">#</a> V16.0：</h3>
<ul>
<li>重写核心模块 Reconciler，启用 Fiber 架构；
<ul>
<li>解决V15，在大型 React 应用中一次更新遍历大量虚拟 DOM 带来的卡顿问题</li>
</ul>
</li>
<li>推出 createPortal API
<ul>
<li>让节点渲染到指定容器内</li>
<li>在15里，方法是XXX</li>
</ul>
</li>
<li>引入 componentDidCatch 钩子
<ul>
<li>为捕获渲染中的异常</li>
</ul>
</li>
</ul>
<h3 id="v16-2" tabindex="-1"><a class="header-anchor" href="#v16-2" aria-hidden="true">#</a> V16.2</h3>
<p>推出 Fragment，解决数组元素同级渲染问题</p>
<h3 id="v16-3" tabindex="-1"><a class="header-anchor" href="#v16-3" aria-hidden="true">#</a> V16.3</h3>
<ul>
<li>增加 React.createRef() API，可以通过 React.createRef 取得 Ref 对象；</li>
<li>增加 React.forwardRef() API，解决高阶组件 ref 传递问题；</li>
<li>增加 getDerivedStateFromProps 和 getSnapshotBeforeUpdate 生命周期</li>
<li>推出新版本 Context api，迎接 Provider/Consumer 时代
<ul>
<li><code>React.createContext()</code>API会被React包暴露出来。</li>
</ul>
</li>
</ul>
<h3 id="v16-4" tabindex="-1"><a class="header-anchor" href="#v16-4" aria-hidden="true">#</a> V16.4</h3>
<p>getSnapshotBeforeUpdate 的一个变化</p>
<p>与16.3的区别在于，有一张图</p>
<h3 id="v16-6" tabindex="-1"><a class="header-anchor" href="#v16-6" aria-hidden="true">#</a> V16.6</h3>
<ul>
<li>增加 React.memo() API，用于控制子组件渲染；</li>
<li>增加 React.lazy() API 实现代码分割；</li>
<li>增加 contextType 让类组件更便捷的使用 context；</li>
<li>增加声明周期 getDerivedStateFromError 代替 componentDidCatch</li>
</ul>
<h3 id="v16-8" tabindex="-1"><a class="header-anchor" href="#v16-8" aria-hidden="true">#</a> V16.8</h3>
<p>支持 React Hooks，使函数组件也能像类组件那样拥有状态</p>
<h3 id="v17" tabindex="-1"><a class="header-anchor" href="#v17" aria-hidden="true">#</a> V17</h3>
<p>事件绑定由 document 变成 container，移除事件池</p>
<p>react17 jsx 就不需要引入React（？）</p>
</template>
