<template><h1 id="常见面试题" tabindex="-1"><a class="header-anchor" href="#常见面试题" aria-hidden="true">#</a> 常见面试题</h1>
<p>知乎上有个问题：<a href="https://www.zhihu.com/question/29191974/answer/1620274467" target="_blank" rel="noopener noreferrer">如果进阿里前端，代码能力得达到什么程度？<ExternalLinkIcon/></a></p>
<p>阿里官方的回答中，如果是个数量掌握 React 前端框架，了解技术底层的话，中高级的要求点是：</p>
<ul>
<li>能说明白为什么要实现fiber，以及可能带来的坑</li>
<li>能说明白为什么要实现hook</li>
<li>能说明白为什么要用immutable，以及用或者不用的考虑</li>
<li>知道react不常用的特性，比如context，portal</li>
<li>能用自己的理解说明白react like框架的本质，能说明白如何让这些框架共存</li>
<li>能设计出框架无关的技术架构。包括但不限于：</li>
<li>说明如何解决可能存在的冲突问题，需要结合实际案例。</li>
<li>能说明架构分层逻辑、各层的核心模块，以及核心模块要解决的问题。能结合实际场景例举一些坑或者优雅的处理方案则更佳</li>
<li>看过全家桶源码，不要求每行都看，但是知道核心实现原理和底层依赖。能口喷几行关键代码把对应类库实现即达标</li>
<li>能从数据驱动角度透彻的说明白 redux，能够口喷原生 js 和 redux 结合要怎么做</li>
<li>能结合 redux，vuex，mobx 等数据流谈谈自己对 vue 和 react 的异同</li>
<li>有基于全家桶构建复杂应用的经验，比如最近很火的微前端和这些类库结合的时候要注意什么，会有什么坑，怎么解决</li>
</ul>
<p>一看，我就谎的一逼，这就是中高级前端的标准，你达标了吗？</p>
<h2 id="常见题" tabindex="-1"><a class="header-anchor" href="#常见题" aria-hidden="true">#</a> 常见题</h2>
<h3 id="q-渲染十万条数据解决方案" tabindex="-1"><a class="header-anchor" href="#q-渲染十万条数据解决方案" aria-hidden="true">#</a> Q：渲染十万条数据解决方案</h3>
<p>A：<RouterLink to="/React/%E9%9D%A2%E8%AF%95%E9%A2%98/%E6%B8%B2%E6%9F%93%E5%8D%81%E4%B8%87%E6%9D%A1%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html">渲染十万条数据解决方案</RouterLink></p>
<h3 id="q-请问-fiber-是什么" tabindex="-1"><a class="header-anchor" href="#q-请问-fiber-是什么" aria-hidden="true">#</a> Q：请问 Fiber 是什么？</h3>
<p>A：</p>
<h3 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h3>
<h4 id="q-函数式组件与-class-组件的区别" tabindex="-1"><a class="header-anchor" href="#q-函数式组件与-class-组件的区别" aria-hidden="true">#</a> <strong>Q：函数式组件与 class 组件的区别</strong></h4>
<p>A：水水水水</p>
<h4 id="q-react-有哪几种创建组件的方式-有什么区别" tabindex="-1"><a class="header-anchor" href="#q-react-有哪几种创建组件的方式-有什么区别" aria-hidden="true">#</a> Q： React 有哪几种创建组件的方式？有什么区别</h4>
<p>A：</p>
<h4 id="q-react-组件间有哪些通讯方式" tabindex="-1"><a class="header-anchor" href="#q-react-组件间有哪些通讯方式" aria-hidden="true">#</a> Q： React 组件间有哪些通讯方式？</h4>
<p>A：</p>
<h4 id="q-父组件如何调用子组件中的方法" tabindex="-1"><a class="header-anchor" href="#q-父组件如何调用子组件中的方法" aria-hidden="true">#</a> Q：父组件如何调用子组件中的方法？</h4>
<p>A：</p>
<h4 id="q-react-如何区分-class-组件-和-function-组件" tabindex="-1"><a class="header-anchor" href="#q-react-如何区分-class-组件-和-function-组件" aria-hidden="true">#</a> Q： React 如何区分 class 组件 和 Function 组件</h4>
<p>A：</p>
<h3 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化" aria-hidden="true">#</a> 性能优化</h3>
<h4 id="q-在-react-中可以做哪些性能优化" tabindex="-1"><a class="header-anchor" href="#q-在-react-中可以做哪些性能优化" aria-hidden="true">#</a> Q：在 React 中可以做哪些性能优化</h4>
<p>类组件</p>
<p>函数式组件</p>
<p>其他方式</p>
<p>A：主要用React.memo、React.useCallback、React.usememo 的作用</p>
<h4 id="q-请问-react-vue-之类的框架为什么需要给组件添加-key-属性-其作用是什么" tabindex="-1"><a class="header-anchor" href="#q-请问-react-vue-之类的框架为什么需要给组件添加-key-属性-其作用是什么" aria-hidden="true">#</a> Q：请问 React/ Vue 之类的框架为什么需要给组件添加 key 属性，其作用是什么？</h4>
<p>A：唯一性</p>
<h3 id="state-setstate" tabindex="-1"><a class="header-anchor" href="#state-setstate" aria-hidden="true">#</a> state &amp; setState</h3>
<h4 id="q-请问-setstate-是异步还是同步-为什么" tabindex="-1"><a class="header-anchor" href="#q-请问-setstate-是异步还是同步-为什么" aria-hidden="true">#</a> Q：请问 setState 是异步还是同步？为什么？</h4>
<p>A：转到 setState 方面解答</p>
<h4 id="q-什么事件可以触发异步-什么会触发同步" tabindex="-1"><a class="header-anchor" href="#q-什么事件可以触发异步-什么会触发同步" aria-hidden="true">#</a> Q：什么事件可以触发异步，什么会触发同步？</h4>
<p>A：</p>
<h4 id="q-state-更新之后发生了什么" tabindex="-1"><a class="header-anchor" href="#q-state-更新之后发生了什么" aria-hidden="true">#</a> Q： state 更新之后发生了什么</h4>
<p>A：</p>
<h4 id="q-调用-setstate-之后发生了什么" tabindex="-1"><a class="header-anchor" href="#q-调用-setstate-之后发生了什么" aria-hidden="true">#</a> Q：调用 setState 之后发生了什么</h4>
<p>A：</p>
<h4 id="q-在-shouldcomponentupdate-或-componentwillupdate-中使用-setstate-会发生什么" tabindex="-1"><a class="header-anchor" href="#q-在-shouldcomponentupdate-或-componentwillupdate-中使用-setstate-会发生什么" aria-hidden="true">#</a> Q：在 shouldComponentUpdate 或 componentWillUpdate 中使用 setState 会发生什么？</h4>
<p>A：</p>
<h4 id="q-为什么不能直接使用-this-state-改变数据" tabindex="-1"><a class="header-anchor" href="#q-为什么不能直接使用-this-state-改变数据" aria-hidden="true">#</a> Q：为什么不能直接使用 this.state 改变数据</h4>
<p>A：</p>
<h3 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> Hooks</h3>
<h4 id="q-你对-hooks-了解吗-hooks-的本质是什么-为什么" tabindex="-1"><a class="header-anchor" href="#q-你对-hooks-了解吗-hooks-的本质是什么-为什么" aria-hidden="true">#</a> Q：你对 Hooks 了解吗？Hooks 的本质是什么？为什么？</h4>
<p>A：</p>
<h4 id="q-为什么不能在循环中调用-hooks-或者说为什么不能在-for-循环、if-语句里使用-hooks" tabindex="-1"><a class="header-anchor" href="#q-为什么不能在循环中调用-hooks-或者说为什么不能在-for-循环、if-语句里使用-hooks" aria-hidden="true">#</a> Q：为什么不能在循环中调用 hooks？或者说为什么不能在 for 循环、if 语句里使用 hooks？</h4>
<p>A：</p>
<h4 id="q-react-hooks-它带来了哪些便利" tabindex="-1"><a class="header-anchor" href="#q-react-hooks-它带来了哪些便利" aria-hidden="true">#</a> Q： React hooks，它带来了哪些便利</h4>
<p>A：</p>
<h4 id="q-列举几个常用的-hook" tabindex="-1"><a class="header-anchor" href="#q-列举几个常用的-hook" aria-hidden="true">#</a> Q：列举几个常用的 Hook</h4>
<p>A：</p>
<h4 id="q-说下-react-hooks-实现原理" tabindex="-1"><a class="header-anchor" href="#q-说下-react-hooks-实现原理" aria-hidden="true">#</a> Q：说下 React hooks 实现原理</h4>
<p>A：</p>
<h4 id="q-react-hooks-当中的-useeffect-是如何区分生命周期钩子的" tabindex="-1"><a class="header-anchor" href="#q-react-hooks-当中的-useeffect-是如何区分生命周期钩子的" aria-hidden="true">#</a> Q： React Hooks 当中的 useEffect 是如何区分生命周期钩子的</h4>
<p>A：</p>
<h4 id="q-useeffect-fn-和-componentdidmount-有什么差异" tabindex="-1"><a class="header-anchor" href="#q-useeffect-fn-和-componentdidmount-有什么差异" aria-hidden="true">#</a> Q： useEffect(fn, []) 和 componentDidMount 有什么差异</h4>
<p>A：</p>
<h3 id="virtual-dom" tabindex="-1"><a class="header-anchor" href="#virtual-dom" aria-hidden="true">#</a> Virtual DOM</h3>
<h4 id="q-react-的-virtual-dom-是怎么实现的" tabindex="-1"><a class="header-anchor" href="#q-react-的-virtual-dom-是怎么实现的" aria-hidden="true">#</a> Q： React 的 Virtual dom 是怎么实现的？</h4>
<p>A：</p>
<h4 id="q-考虑过-react-、-vue-这类的框架为什么要用-virtual-dom-机制吗" tabindex="-1"><a class="header-anchor" href="#q-考虑过-react-、-vue-这类的框架为什么要用-virtual-dom-机制吗" aria-hidden="true">#</a> Q：考虑过 React 、 Vue 这类的框架为什么要用 Virtual DOM 机制吗？</h4>
<p>A：</p>
<h4 id="q-为什么-virtual-dom-会提高性能" tabindex="-1"><a class="header-anchor" href="#q-为什么-virtual-dom-会提高性能" aria-hidden="true">#</a> Q：为什么 Virtual dom 会提高性能？</h4>
<p>A：</p>
<h3 id="q-简单介绍下-diff-算法" tabindex="-1"><a class="header-anchor" href="#q-简单介绍下-diff-算法" aria-hidden="true">#</a> Q：简单介绍下 diff 算法</h3>
<p>A：</p>
<h3 id="react中的事件机制" tabindex="-1"><a class="header-anchor" href="#react中的事件机制" aria-hidden="true">#</a> React中的事件机制</h3>
<h4 id="q-简述下-react-的事件代理机制" tabindex="-1"><a class="header-anchor" href="#q-简述下-react-的事件代理机制" aria-hidden="true">#</a> Q：简述下 React 的事件代理机制</h4>
<p>A：</p>
<h4 id="q-react-的事件代理机制和原生事件绑定有什么区别" tabindex="-1"><a class="header-anchor" href="#q-react-的事件代理机制和原生事件绑定有什么区别" aria-hidden="true">#</a> Q： React 的事件代理机制和原生事件绑定有什么区别？</h4>
<p>A：</p>
<h4 id="q-react-的事件代理机制和原生事件绑定混用会有什么问题" tabindex="-1"><a class="header-anchor" href="#q-react-的事件代理机制和原生事件绑定混用会有什么问题" aria-hidden="true">#</a> Q： React 的事件代理机制和原生事件绑定混用会有什么问题？</h4>
<p>A：</p>
<h4 id="q-react-中如果绑定事件使用匿名函数会怎么样" tabindex="-1"><a class="header-anchor" href="#q-react-中如果绑定事件使用匿名函数会怎么样" aria-hidden="true">#</a> Q： React 中如果绑定事件使用匿名函数会怎么样？</h4>
<p>A：</p>
<h3 id="生态相关" tabindex="-1"><a class="header-anchor" href="#生态相关" aria-hidden="true">#</a> 生态相关</h3>
<h4 id="q-reudx-是什么" tabindex="-1"><a class="header-anchor" href="#q-reudx-是什么" aria-hidden="true">#</a> Q： Reudx 是什么</h4>
<p>A：</p>
<h4 id="q-请求-redux-的原理是什么-你能手写一个-redux-吗" tabindex="-1"><a class="header-anchor" href="#q-请求-redux-的原理是什么-你能手写一个-redux-吗" aria-hidden="true">#</a> Q：请求 Redux 的原理是什么？你能手写一个 Redux 吗？</h4>
<p>A：</p>
<h4 id="q-react-redux-的实现原理" tabindex="-1"><a class="header-anchor" href="#q-react-redux-的实现原理" aria-hidden="true">#</a> Q： React-redux 的实现原理</h4>
<p>A：</p>
<h4 id="q-redux-和-mobx-的区别" tabindex="-1"><a class="header-anchor" href="#q-redux-和-mobx-的区别" aria-hidden="true">#</a> Q： Redux 和 mobx 的区别</h4>
<p>A：</p>
<h4 id="q-redux-异步中间件有什么用" tabindex="-1"><a class="header-anchor" href="#q-redux-异步中间件有什么用" aria-hidden="true">#</a> Q： Redux 异步中间件有什么用？</h4>
<p>A：</p>
<h4 id="q-请问-react-router-的模式" tabindex="-1"><a class="header-anchor" href="#q-请问-react-router-的模式" aria-hidden="true">#</a> Q：请问 React.Router 的模式</h4>
<p>A：共三种模式，手写一个</p>
<h4 id="q-请问-dva-的知识点-与-namespce-同层的参数有哪些" tabindex="-1"><a class="header-anchor" href="#q-请问-dva-的知识点-与-namespce-同层的参数有哪些" aria-hidden="true">#</a> Q：请问 Dva 的知识点？与 namespce 同层的参数有哪些？</h4>
<p>A：</p>
<h3 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期" aria-hidden="true">#</a> 生命周期</h3>
<h4 id="q-简述下-react-的生命周期-每个声明周期都做了什么" tabindex="-1"><a class="header-anchor" href="#q-简述下-react-的生命周期-每个声明周期都做了什么" aria-hidden="true">#</a> Q：简述下 React 的生命周期？每个声明周期都做了什么？</h4>
<p>A：</p>
<h4 id="q-聊聊-react-16-4-的生命周期" tabindex="-1"><a class="header-anchor" href="#q-聊聊-react-16-4-的生命周期" aria-hidden="true">#</a> Q：聊聊 React 16.4 + 的生命周期</h4>
<p>A：</p>
<h3 id="q-请问-react-从本页面跳转至其他站点页是否会执行-unmount-为什么" tabindex="-1"><a class="header-anchor" href="#q-请问-react-从本页面跳转至其他站点页是否会执行-unmount-为什么" aria-hidden="true">#</a> Q：请问 React 从本页面跳转至其他站点页是否会执行 unmount？为什么</h3>
<p>A：</p>
<h3 id="q-请问-react-中的-错误捕获" tabindex="-1"><a class="header-anchor" href="#q-请问-react-中的-错误捕获" aria-hidden="true">#</a> Q：请问 React 中的 错误捕获</h3>
<p>A：转 异步捕获 方面</p>
<h3 id="q-错误边界是什么-它有什么用" tabindex="-1"><a class="header-anchor" href="#q-错误边界是什么-它有什么用" aria-hidden="true">#</a> Q：错误边界是什么？它有什么用？</h3>
<p>A：</p>
<h3 id="q-为什么-constructor-里要调用-super-和传递-props" tabindex="-1"><a class="header-anchor" href="#q-为什么-constructor-里要调用-super-和传递-props" aria-hidden="true">#</a> Q：为什么 constructor 里要调用 super 和传递 props？</h3>
<p>A：这是官网的一段代码，具体见：<a href="https://zh-hans.reactjs.org/docs/state-and-lifecycle.html" target="_blank" rel="noopener noreferrer">状态（State） 和 生命周期<ExternalLinkIcon/></a></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Clock</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span> date<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>
        	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, World!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">It is </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>date<span class="token punctuation">.</span><span class="token function">toLocalTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>而且有这么一段话，不仅让我们调用 <code>super</code> 还要把 <code>props</code> 传递进去，但是没有告诉我们为什么要这么做。</p>
<p>不知道你有没有疑惑为什么要调用 <code>super</code> 和传递 <code>props</code>，接下来我们来揭开谜题吧</p>
<p><strong>为什么要调用 super</strong></p>
<p>其实这不是 React 的限制，这是 JavaScript 的限制，在构造函数里如果要调用 this，那么提前就要调用 super，在 React 里，我们常常会在构造函数里初始化 state ，<code>this.state = xxx</code> ,所以需要调用 super</p>
<p><strong>为什么要传递 props</strong></p>
<p>你可以能以为必须给 <code>super</code> 传入 <code>props</code> ,否则 <code>React.Component</code> 就没办法初始化 <code>this.props</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>props <span class="token operator">=</span> props<span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>不过，如果你不小心漏传了 <code>props</code> ，直接调用了 <code>super()</code> ，你仍然可以在 <code>render</code> 和其他方法中访问 <code>this.props</code></p>
<p>难道这样也行？<strong>因为 React 会在构造函数被调用之后，会把 props 赋值给刚刚创建的实例对象</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">YourComponent</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
instance<span class="token punctuation">.</span>props <span class="token operator">=</span> props<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>props</code> 不传也能用，是有原因的。</p>
<p>但这意味着你在使用 React 时，可以用 <code>super()</code> 代替 <code>super(props)</code> 了么？</p>
<p>那还是不行的，不然官网也不会建议你调用 props 了，虽然 React 会在构造函数运行之后，为 <code>this.props</code> 赋值，但在 <code>super()</code> 调用之后与构造函数结束之前， <code>this.props</code> 仍然是没法用的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>props <span class="token operator">=</span> props<span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Button</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 没有传入 props</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token comment">// {}</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>要是构造函数中调用了某个访问 <code>props</code> 的方法，那这个 bug 就更难定位了。因此我强烈建议始终使用 super(props)，即使这不是必须的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Button</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  传入 props</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  {}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  {}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="q-为什么调用方法要-bind-this" tabindex="-1"><a class="header-anchor" href="#q-为什么调用方法要-bind-this" aria-hidden="true">#</a> Q：为什么调用方法要 bind this？</h3>
<p>A：四种写实践的写法</p>
<h3 id="q-react-中的-ref-是干嘛的" tabindex="-1"><a class="header-anchor" href="#q-react-中的-ref-是干嘛的" aria-hidden="true">#</a> Q： React 中的 ref 是干嘛的？</h3>
<p>A：</p>
<h3 id="q-connect-原理" tabindex="-1"><a class="header-anchor" href="#q-connect-原理" aria-hidden="true">#</a> Q： connect 原理</h3>
<p>A：</p>
<h3 id="q-什么是-portals" tabindex="-1"><a class="header-anchor" href="#q-什么是-portals" aria-hidden="true">#</a> Q：什么是 Portals？</h3>
<p>A：</p>
<h3 id="q-什么是-suspense-组件" tabindex="-1"><a class="header-anchor" href="#q-什么是-suspense-组件" aria-hidden="true">#</a> Q：什么是 suspense 组件？</h3>
<p>A：</p>
<h3 id="q-为什么react-元素有一个-typeof-属性" tabindex="-1"><a class="header-anchor" href="#q-为什么react-元素有一个-typeof-属性" aria-hidden="true">#</a> Q：为什么React 元素有一个 <code>$$typeof</code> 属性？</h3>
<p>A：</p>
<h3 id="q-为什么-jsx-中的组件名要以大写字母开头" tabindex="-1"><a class="header-anchor" href="#q-为什么-jsx-中的组件名要以大写字母开头" aria-hidden="true">#</a> Q：为什么 JSX 中的组件名要以大写字母开头</h3>
<p>A：判断当前渲染的元素是组件还是 HTML 元素</p>
<h3 id="q-react-17、react-18-有什么新的特性" tabindex="-1"><a class="header-anchor" href="#q-react-17、react-18-有什么新的特性" aria-hidden="true">#</a> Q： React 17、React 18 有什么新的特性</h3>
<p>A：</p>
<h3 id="q-请问-react-有什么坑点" tabindex="-1"><a class="header-anchor" href="#q-请问-react-有什么坑点" aria-hidden="true">#</a> Q：请问 React 有什么坑点？</h3>
<p>A：</p>
<ol>
<li>JSX做表达式判断时，需要强转未 boolean 类型，如：</li>
</ol>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
    	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
        	</span><span class="token punctuation">{</span>
                <span class="token operator">!</span><span class="token operator">!</span>b <span class="token operator">&amp;&amp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">这是一段文字</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>如果不使用!!b 进行强转数据类型，会在页面里面输出 0</p>
<ol start="2">
<li>如果key不变，数据就不会变，如果两列数据为[1, 2, 3] ,[1, 2, 3, 4, 5, 6]点击第一组数据中的任意项，此数据标红，且展示第二组数据，如果展示UI时，key为index，那么前三是不会被替换的，你看的会是数据标红了且是第二条数据</li>
</ol>
<p>react中onClick={fun}和onClick=&gt;{()=&gt;fun}有何区别呢？</p>
<p>https://www.zhihu.com/question/504049336/answer/2294252770?utm_source=wechat_session&amp;utm_medium=social&amp;utm_oi=56197411504128&amp;utm_content=group3_Answer&amp;utm_campaign=shareopn</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://www.zhihu.com/question/29191974/answer/1620274467" target="_blank" rel="noopener noreferrer">如果进阿里前端，代码能力得达到什么程度？<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6940287134154637326" target="_blank" rel="noopener noreferrer">金三银四 React 常见面试题<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/yacan8/blog/issues/18" target="_blank" rel="noopener noreferrer">一年半经验，百度、有赞、阿里前端面试总结<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/304213203" target="_blank" rel="noopener noreferrer">React 灵魂 23 问，你能答对几个？<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&amp;mid=2247484614&amp;idx=1&amp;sn=a2b5050136c2cd5e00db90a6cc8daaed&amp;chksm=ea0167aadd76eebc0af31bf8de9ee7e5a35ecdb9e19045f5f36a0e5f8e3ae28e25e58eec0994&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1567645123897&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">新手学习 react 迷惑的点(完整版)<ExternalLinkIcon/></a></li>
</ul>
</template>
