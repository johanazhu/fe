<template><h1 id="核心-api" tabindex="-1"><a class="header-anchor" href="#核心-api" aria-hidden="true">#</a> 核心 API</h1>
<p>这里对重要的 API 做介绍</p>
<h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览" aria-hidden="true">#</a> 概览</h2>
<h3 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h3>
<p><a href="#Component">Component</a></p>
<ul>
<li>构建组件的基类</li>
</ul>
<p><a href="#PureComponent">PureComponent</a></p>
<ul>
<li>与 Component 不同的点在于，它进行了浅对比，即 shouldComponentUpdate 的操作</li>
</ul>
<p><a href="#memo">memo</a></p>
<ul>
<li>高阶组件</li>
<li>缓存操作</li>
</ul>
<h3 id="refs" tabindex="-1"><a class="header-anchor" href="#refs" aria-hidden="true">#</a> Refs</h3>
<p><a href="#createRef">createRef</a></p>
<ul>
<li>创建一个能够通过 ref 属性附加到 React 元素的 ref</li>
</ul>
<p><a href="#forwardRef">forwardRef</a></p>
<ul>
<li>转发，把 ref 转发给下一个组件</li>
</ul>
<h3 id="fragment" tabindex="-1"><a class="header-anchor" href="#fragment" aria-hidden="true">#</a> Fragment</h3>
<p><a href="#Fragment">Fragment</a></p>
<ul>
<li>其包裹作用，但自身不渲染到 DOM 上（不会渲染任何可见的UI）</li>
<li>允许你将子列表分组，而无需向 DOM 添加额外节点</li>
<li>减少不必要嵌套的组件</li>
</ul>
<h3 id="lazy-suspense" tabindex="-1"><a class="header-anchor" href="#lazy-suspense" aria-hidden="true">#</a> lazy&amp;Suspense</h3>
<p><a href="#lazy">lazy</a></p>
<ul>
<li>懒加载，本质是返回一个 Promise 实例</li>
</ul>
<p><a href="#Suspense">Suspense</a></p>
<ul>
<li>与 lazy 搭配，在等待加载 lazy 组件时做优雅降低（如 loading 指示器等）</li>
<li>使得组件可以“等待”某些操作结束后，再进行渲染</li>
</ul>
<h3 id="创建-react-元素" tabindex="-1"><a class="header-anchor" href="#创建-react-元素" aria-hidden="true">#</a> 创建 React 元素</h3>
<p><a href="#createElement">createElement</a></p>
<ul>
<li>每个 JSX 元素都是调用 React.createElement 的语法糖</li>
</ul>
<p><a href="#createFactory">createFactory</a></p>
<h3 id="转换元素" tabindex="-1"><a class="header-anchor" href="#转换元素" aria-hidden="true">#</a> 转换元素</h3>
<p><a href="#cloneElement">cloneElement</a></p>
<p><a href="#isValidElement">isValidElement</a></p>
<p><a href="#React.Children">React.Children</a></p>
<ul>
<li>map、forEach、count、only、toArray</li>
</ul>
<h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3>
<p><a href="#Context">Context</a></p>
<ul>
<li>提供一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法</li>
</ul>
<p><a href="#Portals">Portals</a></p>
<p>Profiler</p>
<ul>
<li>测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”</li>
</ul>
<p>StrictMode</p>
<ul>
<li>严格模式。</li>
<li>有助于
<ul>
<li>识别不安全的生命周期</li>
<li>关于使用过时字符串 ref API 的警告</li>
<li>关于使用废弃的 findDOMNode 方法的警告</li>
<li>检测意外的副作用</li>
<li>检测过时的 context API</li>
</ul>
</li>
</ul>
<hr>
<h3 id="component" tabindex="-1"><a class="header-anchor" href="#component" aria-hidden="true">#</a> Component</h3>
<p>React.Component 是使用 ES6 classes 方式定义 React 组件的基类</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class Greeting extends React.Component {
  render() {
    return &lt;h1&gt;Hello, {this.props.name}&lt;/h1&gt;;
  }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="purecomponent" tabindex="-1"><a class="header-anchor" href="#purecomponent" aria-hidden="true">#</a> PureComponent</h3>
<p>React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅对比 props 和 state 的方式实现了该函数</p>
<h3 id="memo" tabindex="-1"><a class="header-anchor" href="#memo" aria-hidden="true">#</a> memo</h3>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>React.memo 为高阶组件</p>
<p>如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过<strong>记忆组件</strong>渲染结果的方式来提高组件的性能表现</p>
<p>默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么需传入第二个参数</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><blockquote>
<p>注意</p>
<p>与 class 组件中 shouldComponentUpdate() 方法不同的是，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反</p>
</blockquote>
<h2 id="createref" tabindex="-1"><a class="header-anchor" href="#createref" aria-hidden="true">#</a> createRef</h2>
<p>React.createRef 创建一个能够通过 ref 属性附加到 React 元素的 ref</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return &lt;input type=&quot;text&quot; ref={this.inputRef} /&gt;;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="forwardref" tabindex="-1"><a class="header-anchor" href="#forwardref" aria-hidden="true">#</a> forwardRef</h3>
<p>React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其他组件树下的另一个组件中。在如下两种场景中特别有用：</p>
<ul>
<li>转发 refs 到 DOM 组件</li>
<li>在高阶组件中转发 refs</li>
</ul>
<p>React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>const FancyButton = React.forwardRef((props, ref) =&gt; (
  &lt;button ref={ref} className=&quot;FancyButton&quot;&gt;
    {props.children}
  &lt;/button&gt;
));

const ref = React.createRef();
&lt;FancyButton ref={ref}&gt;Click me!&lt;/FancyButton&gt;;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="fragment-1" tabindex="-1"><a class="header-anchor" href="#fragment-1" aria-hidden="true">#</a> Fragment</h3>
<p>React.Fragment 组件能够在不额外创建 DOM 元素的情况下，让 render() 方法返回多个元素</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>render() {
  return (
    &lt;React.Fragment&gt;
      Some text.
      &lt;h2&gt;A heading&lt;/h2&gt;
    &lt;/React.Fragment&gt;
  );
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>你也可以使用其简写语法 <code>&lt;&gt;&lt;/&gt;</code>。React v16.2.0 以上支持</p>
<h3 id="lazy" tabindex="-1"><a class="header-anchor" href="#lazy" aria-hidden="true">#</a> lazy</h3>
<p>lazy 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>// 这个组件是动态加载的
const SomeComponent = React.lazy(() =&gt; import('./SomeComponent'));
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>请注意，渲染 lazy 组件依赖该组件渲染树上层的 <code>&lt;React.Suspense&gt;</code> 组件。这是指定加载指示器（loading indicator）的方法</p>
<p>React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件</p>
<blockquote>
<p>注意</p>
<p>使用 React.lazy 的动态引入特征需要 JS 环境支持 Promise。在 IE11 及以下版本的浏览器中需要引入 polyfill 来使用该特征</p>
</blockquote>
<h3 id="suspense" tabindex="-1"><a class="header-anchor" href="#suspense" aria-hidden="true">#</a> Suspense</h3>
<p>React.Suspense 可以指定加载指示器（loading indicator），以防其组件树种的某些子组件尚未具备渲染条件，目前，懒加载组件是 <code>React.Suspense</code> 支持的唯一用例：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>// 该组件是动态加载的
const OtherComponent = React.lazy(() =&gt; import('./OtherComponent'));

function MyComponent() {
  return (
    // 显示 &lt;Spinner&gt; 组件直至 OtherComponent 加载完成
    &lt;React.Suspense fallback={&lt;Spinner /&gt;}&gt;
      &lt;div&gt;
        &lt;OtherComponent /&gt;
      &lt;/div&gt;
    &lt;/React.Suspense&gt;
  );
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>fallback 属性接受任何在组件加载过程中你想展示的 React 元素，你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Subspense 组件包裹多个懒加载组件</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() =&gt; import('./OtherComponent'));
const AnotherComponent = React.lazy(() =&gt; import('./AnotherComponent'));

function MyComponent() {
  return (
    &lt;div&gt;
      &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
        &lt;section&gt;
          &lt;OtherComponent /&gt;
          &lt;AnotherComponent /&gt;
        &lt;/section&gt;
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="createelement" tabindex="-1"><a class="header-anchor" href="#createelement" aria-hidden="true">#</a> createElement</h3>
<p>我们使用的 JSX 语法，是 createElement 的语法糖</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
	type<span class="token punctuation">,</span>
    <span class="token punctuation">[</span>props<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token operator">...</span>children<span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>创建并返回指定类型的新 React 元素。其中类型参数既可以是标签名、字符串（如 'div' 或 ‘span'），也可以是 React 组件类型（class组件或函数组件），亦或是 React.Frament 类型</p>
<h3 id="createfactory" tabindex="-1"><a class="header-anchor" href="#createfactory" aria-hidden="true">#</a> createFactory</h3>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>React.createFactory(type)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>返回用于生成指定类型 React 元素的函数</p>
<p>现已废弃</p>
<h3 id="cloneelement" tabindex="-1"><a class="header-anchor" href="#cloneelement" aria-hidden="true">#</a> cloneElement</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>React<span class="token punctuation">.</span><span class="token function">cloneElement</span><span class="token punctuation">(</span>
	element<span class="token punctuation">,</span>
    <span class="token punctuation">[</span>config<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token operator">...</span>children<span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>以 element 元素为样板克隆并返回新的 React 元素。config 中应包含新的 props，key 或 ref。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，如果在 config 中未出现 key 或 ref，那么原始元素的 key 和 ref 将被保留</p>
<p>React.cloneElement() 几乎等同于：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>&lt;element.type {...element.props} {...props}&gt;{children}&lt;/element.type&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="isvalidelement" tabindex="-1"><a class="header-anchor" href="#isvalidelement" aria-hidden="true">#</a> isValidElement</h3>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>React.isValidElement(object)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>验证对象是否为 React 元素，返回值为 true 或 false</p>
<h3 id="children" tabindex="-1"><a class="header-anchor" href="#children" aria-hidden="true">#</a> Children</h3>
<p>React.Children 提供了用于处理 this.props.children 不透明数据结构的使用方法</p>
<h4 id="react-children-map" tabindex="-1"><a class="header-anchor" href="#react-children-map" aria-hidden="true">#</a> React.Children.map</h4>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>React.Children.map(children, function[(thisArg)])
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。如果子节点为 null 或是 undefined，则此方法将放回 null 或是 undefined，而不会返回数组</p>
<h4 id="react-children-foreach" tabindex="-1"><a class="header-anchor" href="#react-children-foreach" aria-hidden="true">#</a> React.Children.forEach</h4>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>React.Children.forEach(children, function[(thisArg)])
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>与 React.Children.map() 类似，但它不会返回一个数组</p>
<h4 id="react-children-count" tabindex="-1"><a class="header-anchor" href="#react-children-count" aria-hidden="true">#</a> React.Children.count</h4>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>React.Children.count(children)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>返回 children 中的组件总数量</p>
<h4 id="react-children-only" tabindex="-1"><a class="header-anchor" href="#react-children-only" aria-hidden="true">#</a> React.Children.only</h4>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>React.Children.only(children)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误</p>
<h4 id="react-children-toarray" tabindex="-1"><a class="header-anchor" href="#react-children-toarray" aria-hidden="true">#</a> React.Children.toArray</h4>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>React.Children.toArray(children)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。当你想要在渲染函数中操作子节点的集合时，它会非常使用</p>
<h3 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h3>
<p>Context 提供了一个无需为每层组件手动添加 props，就能在组件数间进行数据传递的方法</p>
<h4 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h4>
<ol>
<li>先注册一个变量</li>
</ol>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>const ThemeContext = React.createContext(&quot;light&quot;)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="2">
<li>在要用的地方注入</li>
</ol>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>&lt;ThemeContext.Provider value=&quot;dark&quot;&gt;
    &lt;Test /&gt;
&lt;/ThemeContext.Provider&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3">
<li>使用</li>
</ol>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>&lt;ThemeContext.Consumer&gt;
    {value =&gt; (
        &lt;div&gt;{value}&lt;/div&gt;
    )}
&lt;/ThemeContext.Consumer&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Provider负责提供context，而Consumer用来消费Provider提供的context</p>
<h3 id="portals" tabindex="-1"><a class="header-anchor" href="#portals" aria-hidden="true">#</a> Portals</h3>
<p>Protal 提供了一种将子节点但渲染到父组件意外的 DOM 节点的方案</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>React.createPortal(child, container)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 Fragmen。第二个参数（container）是一个 DOM 元素</p>
<p>一般用在 对话框、提示框组件上</p>
<p><a href="https://codepen.io/gaearon/pen/yzMaBd" target="_blank" rel="noopener noreferrer">在 CodePen 上尝试<ExternalLinkIcon/></a></p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<p><a href="https://zh-hans.reactjs.org/docs/react-api.html#createelement" target="_blank" rel="noopener noreferrer">React 官网<ExternalLinkIcon/></a></p>
<p><a href="https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w" target="_blank" rel="noopener noreferrer">React万字基础全面剖析<ExternalLinkIcon/></a></p>
<p><a href="https://mp.weixin.qq.com/s/0SBeDkpp_DYS8uAnYL3AiQ" target="_blank" rel="noopener noreferrer">React 系统复习如何做最高效<ExternalLinkIcon/></a></p>
</template>
