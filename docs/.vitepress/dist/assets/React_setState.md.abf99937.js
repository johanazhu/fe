import{_ as s,c as a,o as n,d as e}from"./app.590c1fbf.js";const C=JSON.parse('{"title":"深入浅出 setState 原理篇","description":"","frontmatter":{},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"基本概念和使用","slug":"基本概念和使用","link":"#基本概念和使用","children":[{"level":3,"title":"使用方法","slug":"使用方法","link":"#使用方法","children":[]},{"level":3,"title":"与 setState 回调相比，使用 componentDidUpdate 有什么优势？","slug":"与-setstate-回调相比-使用-componentdidupdate-有什么优势","link":"#与-setstate-回调相比-使用-componentdidupdate-有什么优势","children":[]}]},{"level":2,"title":"setState 的特性——批处理","slug":"setstate-的特性——批处理","link":"#setstate-的特性——批处理","children":[]},{"level":2,"title":"批处理引发的问题","slug":"批处理引发的问题","link":"#批处理引发的问题","children":[{"level":3,"title":"问题 1：连续使用 setState，为什么不能实时改变","slug":"问题-1-连续使用-setstate-为什么不能实时改变","link":"#问题-1-连续使用-setstate-为什么不能实时改变","children":[]},{"level":3,"title":"问题 2：为什么要 setState，而不是直接 this.state.xx = oo?","slug":"问题-2-为什么要-setstate-而不是直接-this-state-xx-oo","link":"#问题-2-为什么要-setstate-而不是直接-this-state-xx-oo","children":[]},{"level":3,"title":"问题 3：那为什么会出现异步的情况呢？（为什么这么设计？）","slug":"问题-3-那为什么会出现异步的情况呢-为什么这么设计","link":"#问题-3-那为什么会出现异步的情况呢-为什么这么设计","children":[]},{"level":3,"title":"问题 4：那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？","slug":"问题-4-那如何在表现出异步的函数里可以准确拿到更新后的-state-呢","link":"#问题-4-那如何在表现出异步的函数里可以准确拿到更新后的-state-呢","children":[]}]},{"level":2,"title":"执行原理","slug":"执行原理","link":"#执行原理","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"React/setState.md"}'),l={name:"React/setState.md"},t=e(`<h1 id="深入浅出-setstate-原理篇" tabindex="-1">深入浅出 setState 原理篇 <a class="header-anchor" href="#深入浅出-setstate-原理篇" aria-hidden="true">#</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-hidden="true">#</a></h2><p>想起自己（2021 年） 8 月份面试时，被面试官们问了好几个 setState 的问题，现在想想，虽然回答上问题，但是了解的不深刻。我知道 setState 被设计成”异步“是为了性能，但是涉及到源码解读我就歇菜了；我知道如何让它同步，但是遇到真实的代码情况时，却不知道如何下手。说到底，当时是准备了面经把这些概念记下来，而没有真正理解它</p><p>在认识 setState 前，我们问几个常见问题</p><ul><li>setState 是同步还是异步？</li><li>如果是异步，怎么让它同步？</li><li>为什么要这样设计？</li></ul><h2 id="基本概念和使用" tabindex="-1">基本概念和使用 <a class="header-anchor" href="#基本概念和使用" aria-hidden="true">#</a></h2><p>React 的理念之一是 UI=f(data)，修改 data 即驱动 UI 变化，那么怎么修改呢？React 提供了一个 API ——setState（类组件的修改方法）</p><p><a href="https://zh-hans.reactjs.org/docs/react-component.html#setstate" target="_blank" rel="noreferrer">官网介绍</a>：</p><blockquote><p><code>setState()</code> 将对组件 state 的更新排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式</p><p>为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。React 并不会保证 state 的变更会立即生效</p><p><code>setState()</code> 并不总是立即更新组件。它会批量推迟更新。这使得在调用 <code>setState()</code> 后立即读取 <code>this.state</code> 成为了隐患。为了消除隐患，请使用 <code>componentDidUpdate</code> 或者 <code>setState</code> 的回调函数（<code>setState(updater, callback)</code>），这两种方式都可以保证在应用更新后触发</p><p>除非 <code>shouldComponentUpdate()</code> 返回 <code>false</code>，否则 <code>setState()</code> 将始终执行重新渲染操作。如果可变对象被使用，且无法在 <code>shouldComponentUpdate()</code> 中实现条件渲染，那么仅在新旧状态不一时调用 <code>setState()</code>可以避免不必要的重新渲染</p></blockquote><h3 id="使用方法" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法" aria-hidden="true">#</a></h3><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(updater</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [callback])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>参数一为带有形式参数的 updater 函数：</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> stateChange</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 例如</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// this.setState((state, props) =&gt; {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//   return {counter: state.counter + props.step};</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// });</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>setState 的第一个参数除了接受函数外，还可以接受对象类型：</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(stateChange[</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> callback])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 例如：this.setState({count: 2})</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>setState 的第二个参数为可选的回调函数，它将在 setState 完成合并重新渲染组件后执行。通常，我们建议使用 componentDidUpdate 来代替此方法</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(stateChange[</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> callback])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 例如: this.setState({count: 2}, () =&gt; {console.log(this.state.count)})</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="与-setstate-回调相比-使用-componentdidupdate-有什么优势" tabindex="-1">与 setState 回调相比，使用 componentDidUpdate 有什么优势？ <a class="header-anchor" href="#与-setstate-回调相比-使用-componentdidupdate-有什么优势" aria-hidden="true">#</a></h3><p><a href="https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback" target="_blank" rel="noreferrer">stackoverflow</a> 有人问过，也有人回答过：</p><ul><li><p>一致的逻辑</p></li><li><p>批量更新</p></li><li><p>什么时候 setState 会比较好？</p><ul><li>当外部代码需要等待状态更新时，如 Promise</li></ul></li></ul><h2 id="setstate-的特性——批处理" tabindex="-1">setState 的特性——批处理 <a class="header-anchor" href="#setstate-的特性——批处理" aria-hidden="true">#</a></h2><p>如果在同一周期内对多个 setState 进行处理，例如，在同一周期内多次设置商品数据，相当于：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// ===</span></span>
<span class="line"><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">assign</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  count</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">quantity</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">quantity </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">quantity</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">quantity </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>后调的 setState 将覆盖同一周期内先调用 setState 的值</p><ul><li>setState(stateChange[, callback])</li><li>setState((state, props) =&gt; stateChange[, callback])</li></ul><p>setState 必引发更新过程，但不一定会引发 render 被执行，因为 shouldCompomentUpdate 可以返回 false</p><h2 id="批处理引发的问题" tabindex="-1">批处理引发的问题 <a class="header-anchor" href="#批处理引发的问题" aria-hidden="true">#</a></h2><h3 id="问题-1-连续使用-setstate-为什么不能实时改变" tabindex="-1">问题 1：连续使用 setState，为什么不能实时改变 <a class="header-anchor" href="#问题-1-连续使用-setstate-为什么不能实时改变" aria-hidden="true">#</a></h3><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// state.count === 1，不是 3</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>因为 this.setState 词 API 为会进行批处理，后调的 setState 会覆盖统一周期内先调用的 setState 的值，如下图所示：</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// state.count === 4</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="问题-2-为什么要-setstate-而不是直接-this-state-xx-oo" tabindex="-1">问题 2：为什么要 setState，而不是直接 this.state.xx = oo? <a class="header-anchor" href="#问题-2-为什么要-setstate-而不是直接-this-state-xx-oo" aria-hidden="true">#</a></h3><p>因为 setState 做的事情不仅只是修改了 <code>this.state</code> 的值，另外最重要的是它会触发 React 的更新机制，会进行 diff，然后将 patch 部分更新到真实 dom 里</p><p>如果你直接 <code>this.state.xx = oo</code> 的话，state 的值确实会改，但是它不会驱动 React 重渲染。setState 能帮助我们更新视图，引发 shouldComponentUpdate、render 等一系列函数的调用。至于批处理，React 会将 setState 的效果放入队列中，在事件结束之后产生一次重新渲染，为的就是把 Virtual DOM 和 DOM 树操作降到最小，用于提高性能</p><p>当调用 setState 后，React 的 <a href="https://zh-hans.reactjs.org/docs/react-component.html" target="_blank" rel="noreferrer">生命周期函数</a> 会依次顺序执行</p><ul><li>static getDerivedStateFromProps</li><li>shouldComponentUpdate</li><li>render</li><li>getSnapshotBeforeUpdate</li><li>componentDidUpdate</li></ul><h3 id="问题-3-那为什么会出现异步的情况呢-为什么这么设计" tabindex="-1">问题 3：那为什么会出现异步的情况呢？（为什么这么设计？） <a class="header-anchor" href="#问题-3-那为什么会出现异步的情况呢-为什么这么设计" aria-hidden="true">#</a></h3><p>因为性能优化。假如每次 setState 都要更新数据，更新过程就要走五个生命周期，走完一轮生命周期再拿 render 函数的结果去做 diff 对比和更新真实 DOM，会很耗时间。所以将每次调用都放一起做一次性处理，能降低对 DOM 的操作，提高应用性能</p><h3 id="问题-4-那如何在表现出异步的函数里可以准确拿到更新后的-state-呢" tabindex="-1">问题 4：那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？ <a class="header-anchor" href="#问题-4-那如何在表现出异步的函数里可以准确拿到更新后的-state-呢" aria-hidden="true">#</a></h3><p>通过第二个参数 <code>setState(partialState, callback)</code> 中的 callback 拿到更新后的结果</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">onHandleClick</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">点击之后的回调</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 最新值</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>或者可以直接给 state 传递函数来表现出同步的情况</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">函数模式</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="执行原理" tabindex="-1">执行原理 <a class="header-anchor" href="#执行原理" aria-hidden="true">#</a></h2><p>首先先了解<a href="https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html" target="_blank" rel="noreferrer">三种渲染模式</a></p><blockquote><ul><li>legacy 模式：<code>ReactDOM.render(&lt;App /&gt;, rootNode)</code> 。这是当前 React app 使用的方式。当前没有计划删除本模式，但是这个模式可能不支持新功能</li><li>blocking 模式：<code>ReactDOM.createBlockingRoot(rootNode).render(&lt;App /&gt;)</code> 。目前正在实验中，作为迁移到 concurrent 模式的第一个步骤</li><li>concurrent 模式 ：<code>ReactDOM.createRoot(rootNode).render(&lt;App /&gt;)</code>。目前再实验中，未来稳定之后，打算作为 React 的模式开发模式。这个模式开启了所有的新功能 <ul><li>拥有不同的优先级，更新的过程可以被打断</li></ul></li></ul></blockquote><p>在 legacy 模式下，在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state</p><p>像 addEventListener 绑定的原生事件、setTimeout/setInterval 会走同步，除此之外，也就是 React 控制的事件处理 setState 会异步</p><p>而 concurrent 模式都是异步，这也是未来 React 18 的默认模式</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h2><p>首先，我们总结下关键知识点</p><ul><li>setState 不会立即改变 React 组件中 state 的值</li><li>setState 通过引发一次组件的更新过程来引发重新绘制</li><li>多次 setState 函数调用产生的效果会合并（批处理）</li></ul><p>其次，回答一下文章开头的问题（第二第三问题在文中已经回答）</p><p>setState 是同步还是异步？</p><ul><li>代码同步，渲染看模式 <ul><li>legacy 模式，非原生事件、setTimeout/setInterval 的情况下为异步；addEventListener 绑定原生事件、setTimeout/setInterval 时会同步</li><li>concurrent 模式：异步</li></ul></li></ul><p><img src="https://s2.loli.net/2022/02/21/oDCljPzA5yFqTpU.png" alt="image-20220221160905787"></p><p>附上线上 demo 示例：</p><ul><li><a href="https://azhubaby.com/demo/setState%E6%98%AF%E5%90%8C%E6%AD%A5%E8%BF%98%E6%98%AF%E5%BC%82%E6%AD%A5/build/index.html" target="_blank" rel="noreferrer">setState 是同步还是异步</a></li></ul><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="https://zhuanlan.zhihu.com/p/25954470" target="_blank" rel="noreferrer">setState：这个 API 设计到底怎么样</a></li><li><a href="https://zhuanlan.zhihu.com/p/25990883" target="_blank" rel="noreferrer">setState 为什么不会同步更新组件状态</a></li><li><a href="https://zhuanlan.zhihu.com/p/26069727" target="_blank" rel="noreferrer">setState 何时同步更新状态</a></li><li><a href="https://segmentfault.com/a/1190000015615057" target="_blank" rel="noreferrer">浅入深出 setState（上篇）</a></li><li><a href="https://segmentfault.com/a/1190000015821018" target="_blank" rel="noreferrer">浅入深出 setState（下篇）</a></li><li><a href="https://keqingrong.cn/blog/2019-04-01-react-setstate" target="_blank" rel="noreferrer">重新认识 React 的 setState</a></li><li><a href="https://zhuanlan.zhihu.com/p/39512941" target="_blank" rel="noreferrer">你真的理解 setState 吗？</a></li><li><a href="https://mp.weixin.qq.com/s/my2Jx7pcbVYnaCWklAzKXA" target="_blank" rel="noreferrer">setState 到底是同步的，还是异步的</a></li><li><a href="https://segmentfault.com/a/1190000040445026" target="_blank" rel="noreferrer">React 中 setState 是一个宏任务还是微任务？</a></li><li><a href="https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback" target="_blank" rel="noreferrer">What is the advantage of using componentDidUpdate over the setState callback?</a></li><li><a href="https://stackoverflow.com/a/48610973/458193" target="_blank" rel="noreferrer">深入学习：何时以及为什么 setState() 会批量执行？</a></li><li><a href="https://github.com/facebook/react/issues/11527#issuecomment-360199710" target="_blank" rel="noreferrer">深入：为什么不直接更新 this.state？</a></li><li><a href="https://zhuanlan.zhihu.com/p/296359220" target="_blank" rel="noreferrer">这届面试官，不讲武德</a></li></ul>`,60),p=[t];function o(r,c,i,D,y,F){return n(),a("div",null,p)}const A=s(l,[["render",o]]);export{C as __pageData,A as default};