<template><h1 id="react-hook-从认识到手写" tabindex="-1"><a class="header-anchor" href="#react-hook-从认识到手写" aria-hidden="true">#</a> React Hook 从认识到手写</h1>
<blockquote>
<p>学习一项知识，必须问自己三个重要问题：1. 它的本质是什么。2. 它的第一原则是什么。3. 它的知识结构是怎样的</p>
</blockquote>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>React hook 必会，必考题。现在一个 React 开发要不会 Hook 的话，很难说自己是一名合格的开发者，Hook 问世已经3年了（18年出品），同仁出的教程数不胜数，这里做我对 Hook 的认识和理解</p>
<h2 id="大纲" tabindex="-1"><a class="header-anchor" href="#大纲" aria-hidden="true">#</a> 大纲</h2>
<p>测试一下 Hook 的熟练程度</p>
<p>是什么</p>
<ul>
<li>
<p>为什么要有 Hook</p>
<ul>
<li>状态逻辑复用</li>
</ul>
</li>
<li>
<p>发展史</p>
<ul>
<li>Mixin</li>
<li>HOC</li>
</ul>
</li>
<li>
<p>Hook 的设计目标</p>
</li>
</ul>
<p>最重要且常见的两个 Hook</p>
<ul>
<li>
<p>useState</p>
</li>
<li>
<p>useEffect</p>
<ul>
<li>与 useLayoutEffect 的区别</li>
</ul>
</li>
</ul>
<p>性能优化相关</p>
<ul>
<li>useMemo</li>
<li>useCallback</li>
</ul>
<p>与 Ref 相关</p>
<ul>
<li>useRef</li>
<li>useImperativeHandle</li>
</ul>
<p>不常见的其他的 hooks</p>
<ul>
<li>useReducer</li>
<li>useContext</li>
<li>useTransition</li>
<li>useDebugValue</li>
</ul>
<p>自定义 Hooks</p>
<p>手写 Hooks</p>
<h2 id="测试一下-hooks-的熟练程度" tabindex="-1"><a class="header-anchor" href="#测试一下-hooks-的熟练程度" aria-hidden="true">#</a> 测试一下 Hooks 的熟练程度</h2>
<p>为什么不能在 for 循环、if 语句里使用 Hook</p>
<p>React.memo、React.useCallback、React.usememo 的作用</p>
<p>useState 中的值是个对象，改变对象中的值，组件会渲染吗？如果用 React.memo() 包裹住呢</p>
<p>能否口喷 Hook 的原理是什么</p>
<p>你对 Hook 了解吗？Hooks 的本质是什么？为什么？</p>
<p>React Hook，它带来了哪些便利</p>
<p>列举几个常用的 Hook</p>
<p>说下 React Hook 实现原理</p>
<p>React Hook 当中的 useEffect 是如何区分生命周期钩子的</p>
<p>useEffect(fn, []) 和 componentDidMount 有什么差异</p>
<hr>
<p>回答的如何？如果一知半解请随我看一下我对它的认识</p>
<h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2>
<p>React Hook 是 React 16.7.0-alpha（真正推出是 React 16.8）推出的新特性。它可以让你再不编写 class 的情况下使用 state 以及其他的 React 特性</p>
<h3 id="为什么要有-hook" tabindex="-1"><a class="header-anchor" href="#为什么要有-hook" aria-hidden="true">#</a> 为什么要有 Hook</h3>
<p>我们一定要有个概念，即 React 的本质是什么？它的特征 UI=f(data)、一切皆组件、声明式编程。那好，它既然是 UI=f(data)，data（数据）通过 function 来驱动 UI 视图变化，之前了解 <RouterLink to="/React/%E5%BF%AB%E9%97%AE%E5%BF%AB%E7%AD%94setState.html">setState</RouterLink> 时我们就说了，setState 是来管理状态的，因为在一个视图，你不能简单只展示，也要交互，交互就有状态的改变，React 是通过 setState 来改变状态。但 setState 是类组件中的API，而每一个类组件写起来很麻烦，需要加各种生命周期。在函数式组件中，是没有状态的，一般当做渲染（无状态组件）</p>
<p>说了这么多，那为什么要有 Hook 呢？因为<strong>状态逻辑复用</strong>。我们先了解下状态逻辑复用的发展史</p>
<h3 id="发展史" tabindex="-1"><a class="header-anchor" href="#发展史" aria-hidden="true">#</a> 发展史</h3>
<h4 id="mixin时代" tabindex="-1"><a class="header-anchor" href="#mixin时代" aria-hidden="true">#</a> Mixin时代</h4>
<p>在我还没用 React 之前就有了，现在已经被淘汰。</p>
<blockquote>
<p>Mixin（混入）是一种通过扩展收集功能的方式，它本质上是将一个对象的属性拷贝到另一个对象上，不过你可以拷贝<code>任意多</code>个对象的<code>任意个</code>方法到一个新对象上去，这是<code>继承</code>所不能实现的。它的出现主要就是为了解决代码复用问题</p>
</blockquote>
<p>这里不对其做分析，React官方文档在 <a href="https://zh-hans.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html" target="_blank" rel="noopener noreferrer">Mixins Considered Harmful<ExternalLinkIcon/></a> 一文中提到了 Mixin 带来的危害：</p>
<ul>
<li>Mixin 可能会相互依赖，相互耦合，不利于代码维护</li>
<li>不同的 Mixin 中的方法可能会相互冲突</li>
<li>Mixin 非常多时，组件时可以感知到的，甚至还要为其做相关处理，这样会给代码造成滚雪球的复杂性</li>
</ul>
<h4 id="hoc-高阶组件" tabindex="-1"><a class="header-anchor" href="#hoc-高阶组件" aria-hidden="true">#</a> HOC（高阶组件）</h4>
<p>HOC的原理其实很简单，它就是一个函数，且它接受一个组件作为参数，并返回一个新的组件，把复用的地方放在高阶组件中，你在使用的时候，只需要做不同</p>
<p>打个比方：就好像我给你一瓶水，你在渴的时候就会喝它；你在耍帅的时候拿它摆POSE；你在别人需要的时候给他喝帮助人...</p>
<p>write is cheap，show you code</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>function Wrapper(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            console.log('我是一瓶水')
        }
        render() {
            return (
                &lt;div&gt;
                    &lt;div className=&quot;title&quot;&gt;{this.props.title}&lt;/div&gt;	
                    &lt;WrappedComponent {...this.props} /&gt;
                &lt;/div&gt;	
            )
        }
    }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>import &quot;./styles.css&quot;;
import React from &quot;react&quot;;
import Wrapper from &quot;./Wrapper&quot;;

class A extends React.Component {
  render() {
    return &lt;div&gt;喝它&lt;/div&gt;;
  }
}

class B extends React.Component {
  render() {
    return &lt;div&gt;耍帅摆POSE&lt;/div&gt;;
  }
}

class C extends React.Component {
  render() {
    return &lt;div&gt;帮助别人&lt;/div&gt;;
  }
}

const AA = Wrapper(A);
const BB = Wrapper(B);
const CC = Wrapper(C);

export default function App() {
  return (
    &lt;div className=&quot;App&quot;&gt;
      &lt;h1&gt;Hello CodeSandbox&lt;/h1&gt;
      &lt;h2&gt;Start editing to see some magic happen!&lt;/h2&gt;
      &lt;AA title=&quot;我是普通人&quot; /&gt;
      &lt;BB /&gt;
      &lt;CC /&gt;
    &lt;/div&gt;
  );
}

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>这样就很明显的看出 HOC 的好处，”一瓶水“是共同代码，A、B、C处理业务代码，然后将A、B、C传入HOC（一瓶水）中，返回了一个新的组件 AA、BB、CC。相同的代码得到了公用</p>
<p><img src="https://i.loli.net/2021/09/17/q7vQpZwIngNc3C2.png" alt="HOC-demo"></p>
<p>各位可以前往这里查看 <a href="https://codesandbox.io/s/hoc-demo-d9p9j?file=/src/App.js:0-629" target="_blank" rel="noopener noreferrer">demo<ExternalLinkIcon/></a></p>
<p>HOC 的用处不单单是代码复用，还可以做权限控制、打印日志等。但它有也缺陷，例如 HOC 是在原组件上进行包裹或者嵌套，如果大量使用 HOC，将会产生非常多的嵌套，这会让调试变得非常困难；而且HOC 可以劫持 props，在不遵守约定的情况下可能造成冲突</p>
<h3 id="hook-的设计目标" tabindex="-1"><a class="header-anchor" href="#hook-的设计目标" aria-hidden="true">#</a> Hook 的设计目标</h3>
<p>我们了解了 React 状态逻辑复用的发展史，结合类组件带来的不便。我们希望 React Hook 能这样的：</p>
<ol>
<li>无 Class 的复杂性</li>
<li>无生命周期的困扰</li>
<li>优雅地复用</li>
<li>对其 Class 组件已经具备的能力</li>
</ol>
<h2 id="最重要且常见的两个-hooks" tabindex="-1"><a class="header-anchor" href="#最重要且常见的两个-hooks" aria-hidden="true">#</a> 最重要且常见的两个 hooks</h2>
<h3 id="usestate" tabindex="-1"><a class="header-anchor" href="#usestate" aria-hidden="true">#</a> useState</h3>
<h3 id="useeffect" tabindex="-1"><a class="header-anchor" href="#useeffect" aria-hidden="true">#</a> useEffect</h3>
<p>它是什么</p>
<h4 id="与-uselayouteffect-的区别" tabindex="-1"><a class="header-anchor" href="#与-uselayouteffect-的区别" aria-hidden="true">#</a> 与 useLayoutEffect 的区别</h4>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>// 用来替代constructor初始化状态
useState()

// 替代 componentDidMount和componentDidUpdate以及componentWillUnmount
// 统一称为处理副作用
useEffect()

// 替代shouldComponent
useMemo（）
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="性能优化相关" tabindex="-1"><a class="header-anchor" href="#性能优化相关" aria-hidden="true">#</a> 性能优化相关</h2>
<p>什么时候使用 useMemo 和 useCallback ？</p>
<p>这两个 hooks 内置于 React 都有特别的原因：</p>
<ol>
<li>引用相等</li>
<li>昂贵的计算</li>
</ol>
<p>针对useMemo和useCallback 最直观的测试就是打印 函数式组件是否有渲染，优化之后，没改变的组件不渲染</p>
<p>先说结论 useCallback 和 useMemo 都可缓存函数的引用或值，但是从更细的实用角度来说，useCallback 缓存函数的引用，useMemo 缓存计算数据的值</p>
<h3 id="usememo" tabindex="-1"><a class="header-anchor" href="#usememo" aria-hidden="true">#</a> useMemo</h3>
<p>渲染一个组件，会将内部的方法重新执行，这个操作是没有闭包的，消耗无关的性能。</p>
<p>使用useMemo来优化</p>
<p>传入 <code>useMemo</code> 的函数会在渲染期间执行，</p>
<p>默认情况下，如果React 父组件重新渲染，它包含的所有子组件都会重新渲染，即使子组件没有任何变化。</p>
<p>React.memo() 方法可以防止子组件不必要渲染，从而提供组件性能。</p>
<h3 id="usecallback" tabindex="-1"><a class="header-anchor" href="#usecallback" aria-hidden="true">#</a> useCallback</h3>
<p>useCallback 钩子是专门为传递给子组件的回调函数设计的，可以避免不必要的重新创建这些函数，重新创建这些函数的过程会再每次重渲染时引起性能问题</p>
<p><code>useMemo</code> 和 <code>useCallback</code> 接受的参数都是一样，都是在其依赖项发生变化后执行，都是返回缓存的值，区别在于 <code>useMemo</code> 返回的是函数运行的结果，<code>useCallback</code> 返回的是函数</p>
<p>useCallback(fn, deps) 相当于 useMemo(() =&gt; fn, deps)</p>
<h3 id="react-memo" tabindex="-1"><a class="header-anchor" href="#react-memo" aria-hidden="true">#</a> React.memo</h3>
<p>只有当 props 改变时会重新渲染子组件</p>
<p><a href="https://codesandbox.io/s/laughing-shamir-5nx7p?file=/src/App.js" target="_blank" rel="noopener noreferrer">demo<ExternalLinkIcon/></a></p>
<h3 id="usecallback-和-usememo" tabindex="-1"><a class="header-anchor" href="#usecallback-和-usememo" aria-hidden="true">#</a> useCallback 和 useMemo</h3>
<p>相同点：useCallback 和 useMemo 都是性能优化的手段，类似于类组件的 shouldComponentUpdate，在子组件中使用 shouldComponentUpdate，判断该组件的 props 和 state 有没有变化，从而避免每次父组件 render 时重新渲染子组件</p>
<p>区别：useCallback 和 useMemo 的区别是 useCallback 返回一个函数，当把它返回的这个函数作为子组件使用时，可以笔名每次父组件更新时重新渲染这个子组件</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>const renderButton = useCallback(
     () =&gt; (
         &lt;Button type=&quot;link&quot;&gt;
            {buttonText}
         &lt;/Button&gt;
     ),
     [buttonText]    // 当buttonText改变时才重新渲染renderButton
);
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>useMemo 返回的是一个值，用于避免在每次渲染时都进行高开销的计算</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>// 仅当num改变时才重新计算结果
const result = useMemo(() =&gt; {
    for (let i = 0; i &lt; 100000; i++) {
      (num * Math.pow(2, 15)) / 9;
    }
}, [num]);
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="什么时候使用" tabindex="-1"><a class="header-anchor" href="#什么时候使用" aria-hidden="true">#</a> 什么时候使用</h3>
<p>别人导师说：任何时候都用是一个好的习惯，但是大部分时间不用也没什么大问题。<strong>但是如果该函数或变量作为 props 传给子组件，请一定要用，避免子组件的非必要渲染</strong></p>
<h2 id="与-ref-相关" tabindex="-1"><a class="header-anchor" href="#与-ref-相关" aria-hidden="true">#</a> 与 Ref 相关</h2>
<h3 id="useref" tabindex="-1"><a class="header-anchor" href="#useref" aria-hidden="true">#</a> useRef</h3>
<p>useRef 钩子能够再重渲染过程中保存 state</p>
<p>使用 useRef 保存和更新一些数据时有一定好处的，<strong>它可以不通过内存来保存数据</strong>，使得这些数据再重渲染时不会被清除掉</p>
<p>如果我们想利用普通的变量再重渲染过程中追踪数据变化是不可行的，因为每次组件渲染时它都会被重新初始化。然而，如果使用 ref 的话，其中的数据能在每次组件渲染时保持不变。</p>
<h4 id="为啥使用useref" tabindex="-1"><a class="header-anchor" href="#为啥使用useref" aria-hidden="true">#</a> 为啥使用useRef?</h4>
<p>它不仅仅是用来管理DOM ref 的，它还相当于 this，可以存放任何变量，很好的解决闭包带来的不方便行</p>
<h4 id="怎么使用useref" tabindex="-1"><a class="header-anchor" href="#怎么使用useref" aria-hidden="true">#</a> 怎么使用useRef?</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> useState<span class="token operator">&lt;</span>number<span class="token operator">></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> countRef <span class="token operator">=</span> useRef<span class="token operator">&lt;</span>number<span class="token operator">></span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="场景举例" tabindex="-1"><a class="header-anchor" href="#场景举例" aria-hidden="true">#</a> 场景举例</h5>
<h5 id="_1-闭包问题" tabindex="-1"><a class="header-anchor" href="#_1-闭包问题" aria-hidden="true">#</a> 1.闭包问题</h5>
<p>点击 <strong>加</strong> 一个按钮 3 次，再点 <strong>弹框显示</strong> 1次，再点 <strong>加</strong> 按钮 2 次，最终 <code>alert</code> 会是什么结果？</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>import React, { useState } from 'react'

const Counter = () =&gt; {
  const [count, setCount] = useState&lt;number&gt;(0)

  const handleCount = () =&gt; {
    setTimeout(() =&gt; {
      alert('current count: ' + count)
    }, 3000);
  }

  return (
    &lt;div&gt;
      &lt;p&gt;current count: { count }&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;加&lt;/button&gt;
      &lt;button onClick={() =&gt; handleCount()}&gt;弹框显示&lt;/button&gt;
    &lt;/div&gt;
  )
}

export default Counter
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>结果是弹框内容为 <strong>current count: 3</strong>，为什么？</p>
<p>闭包了，每次调用 setCount，</p>
<p>当我们更新状态的时候, React 会重新渲染组件, 每一次渲染都会拿到独立的 count 状态, 并重新渲染一个 handleCount 函数. 每一个 handleCount 里面都有它自己的 count</p>
<h2 id="使用规则" tabindex="-1"><a class="header-anchor" href="#使用规则" aria-hidden="true">#</a> 使用规则</h2>
<p>Hooks 的本质就是 JavaScript 函数，在使用它时需要遵守<a href="https://zh-hans.reactjs.org/docs/hooks-rules.html" target="_blank" rel="noopener noreferrer">两条规则<ExternalLinkIcon/></a></p>
<h3 id="只在最顶层使用-hook" tabindex="-1"><a class="header-anchor" href="#只在最顶层使用-hook" aria-hidden="true">#</a> 只在最顶层使用 Hook</h3>
<p><strong>不要在循环，条件或嵌套函数中调用 Hook</strong>，确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确</p>
<h3 id="只在-react-函数中调用-hook" tabindex="-1"><a class="header-anchor" href="#只在-react-函数中调用-hook" aria-hidden="true">#</a> 只在 React 函数中调用 Hook</h3>
<p>不要再普通的 JavaScript 函数中调用 Hook，你可以：</p>
<ul>
<li>在 React 的函数组件中调用 Hook</li>
<li>在自定义 Hook 中调用其他 Hook</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://github.com/shanggqm/blog/issues/4" target="_blank" rel="noopener noreferrer">无意识设计-复盘React Hook的创造过程<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844903815762673671" target="_blank" rel="noopener noreferrer">【React深入】从Mixin到HOC再到Hook<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/" target="_blank" rel="noopener noreferrer">useEffect 完整指南<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.im/post/5dd64ae6f265da478b00e639" target="_blank" rel="noopener noreferrer">useCallback、useMemo 分析以及差别<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/happylindz/blog/issues/19" target="_blank" rel="noopener noreferrer">十个案例学会 React Hooks<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/brickspert/blog/issues/26" target="_blank" rel="noopener noreferrer">React Hooks 原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/MzpUROCRYPpwOycI2sz3lQ" target="_blank" rel="noopener noreferrer">useEffect, useCallback, useMemo三者有何区别<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&amp;mid=2247488110&amp;idx=1&amp;sn=f7c142fb65259f22773bb2bad4ccf8ca&amp;chksm=ea0d5894dd7ad18236c174f1b5776f933473c7d6e3d3f95b3f57516d5594552ad7414198d1f4&amp;scene=126&amp;sessionid=1617017984&amp;key=74e411ceb40c53ecceeb837c57022e68713e07c93481427e7e48bce03a829b9867bfe6e59e4db1e1b7bcf1db392c63aecc4ac96c0d04c594bf4f1dcaadb7e77fc37f8e6cb0405ba447bbd29ac158bdfe5f8d98515a27c910f031d65e34617eaa75ab601ef2a0780a16db37bc7c58280e68401ba0ae105a59274bb9a0ed6d1d16&amp;ascene=1&amp;uin=MTA0NTY0NDM2MQ%3D%3D&amp;devicetype=Windows+10+x64&amp;version=62090070&amp;lang=zh_CN&amp;exportkey=ATPQQ5EDyogKCw2h%2BuLo8yA%3D&amp;pass_ticket=rOrDQ7aYmbIfx6AGR%2BUc8RcjMfmD7fSjUCfVAc87kvPd%2BMLrrXll%2BmIbzLV5R7OT&amp;wx_header=0" target="_blank" rel="noopener noreferrer">React hooks 最佳实践【更新中】<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6948748617817522206" target="_blank" rel="noopener noreferrer">React Hooks 万字总结<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e" target="_blank" rel="noopener noreferrer">React hooks: not magic, just arrays<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w" target="_blank" rel="noopener noreferrer">「React万字基础全面剖析」<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://felixgerschau.com/react-hooks-separation-of-concerns/" target="_blank" rel="noopener noreferrer">Separation of concerns with React hooks<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.zhihu.com/question/357020049/answer/909484669?utm_source=wechat_session&amp;utm_medium=social&amp;utm_oi=56197411504128&amp;utm_content=group2_Answer&amp;utm_campaign=shareopn" target="_blank" rel="noopener noreferrer">如何去合理使用 React hook？<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://alexsidorenko.com/blog/react-render-always-rerenders/" target="_blank" rel="noopener noreferrer">使用 React.memo() 提高组件性能<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
