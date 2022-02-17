<template><h1 id="深入浅出-setstate" tabindex="-1"><a class="header-anchor" href="#深入浅出-setstate" aria-hidden="true">#</a> 深入浅出 setState</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>想起自己 8 月份面试时，被面试官们问了好几个 setState 的问题，现在想想，虽然回答上问题了，但是了解的不深刻。我知道 setState 被设计成”异步“是为了性能，但是涉及到源码解读我就歇菜了；我知道如何让它同步，但是遇到真实的代码情况时，却不知道如何下手。说到底，当时是准备了面经把这些概念记下来，而没有真正理解它</p>
<h2 id="快速了解" tabindex="-1"><a class="header-anchor" href="#快速了解" aria-hidden="true">#</a> 快速了解</h2>
<p>基本概念和使用</p>
<p>关键知识点：</p>
<ul>
<li>setState 不会立即改变 React 组件中 state 的值</li>
<li>setState 通过引发一次组件的更新过程来引发重新绘制</li>
<li>多次 setState 函数调用产生的效果会合并</li>
</ul>
<p>setState 什么时候能同步</p>
<ul>
<li>addEventListener 绑定的原生事件处理、setTimeout/setInterval</li>
</ul>
<p>执行原理</p>
<p>有一答一</p>
<p>来几个面试题</p>
<p>为什么不直接同步而要塞入队列中，一起做处理，原理是什么？</p>
<ul>
<li>性能</li>
</ul>
<p>假设每次 setState 就要更新数据，更新过程要走四个生命周期，走完一轮生命周期</p>
<p>render 函数的结果要拿去做 diff 对比和更新真实 DOM，这个就很耗时间</p>
<p>所以将它每次调用都放在一起一次性处理，能将对 DOM 操作降到最小，提高性能</p>
<h2 id="基本概念和使用" tabindex="-1"><a class="header-anchor" href="#基本概念和使用" aria-hidden="true">#</a> 基本概念和使用</h2>
<p>React 的理念之一是 UI=f(data)，修改 data 即驱动 UI 变化，那么怎么修改呢？React 提供了一个 API ——setState</p>
<p><a href="https://zh-hans.reactjs.org/docs/react-component.html#setstate" target="_blank" rel="noopener noreferrer">官网介绍<ExternalLinkIcon/></a>：</p>
<blockquote>
<p><code>setState()</code> 将对组件 state 的更新排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式</p>
<p>为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。React 并不会保证 state 的变更会立即生效</p>
<p><code>setState()</code> 并不总是立即更新组件。它会批量推迟更新。这使得在调用 <code>setState()</code> 后立即读取 <code>this.state</code> 成为了隐患。为了消除隐患，请使用 <code>componentDidUpdate</code> 或者 <code>setState</code> 的回调函数（<code>setState(updater, callback)</code>），这两种方式都可以保证在应用更新后触发</p>
<p>除非 <code>shouldComponentUpdate()</code> 返回 <code>false</code>，否则 <code>setState()</code> 将始终执行重新渲染操作。如果可变对象被使用，且无法在 <code>shouldComponentUpdate()</code> 中实现条件渲染，那么仅在新旧状态不一时调用 <code>setState()</code>可以避免不必要的重新渲染</p>
</blockquote>
<h3 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h3>
<p>setState(updater[, callback])</p>
<p>参数一为带有形式参数的 updater 函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=></span> stateChange

<span class="token comment">// 例如</span>
<span class="token comment">// this.setState((state, props) => {</span>
<span class="token comment">//   return {counter: state.counter + props.step};</span>
<span class="token comment">// });</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>setState() 的第一个参数除了接受函数外，还可以接受对象类型：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setState</span><span class="token punctuation">(</span>stateChange<span class="token punctuation">[</span><span class="token punctuation">,</span> callback<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">// 例如：this.setState({count: 2})</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>setState() 的第二个参数位可选的回调函数，它将在 setState 完成合并重新渲染组件后执行。通常，我们建议使用 componentDidUpdate 来代替此方法</p>
<p>为什么？</p>
<p><a href="https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback" target="_blank" rel="noopener noreferrer">stackoverflow<ExternalLinkIcon/></a> 有人问过，也有人回答过：</p>
<ul>
<li>
<p>一致的逻辑</p>
</li>
<li>
<p>批量更新</p>
</li>
</ul>
<p>什么时候 setState 会比较好？</p>
<p>当外部代码需要等待状态更新时</p>
<p>如果在同意周期内对多个 setState 进行处理，例如，在同一周期内多次设置商品数据，相当于：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// === </span>
Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>
  count<span class="token punctuation">,</span>
  <span class="token punctuation">{</span>quantity<span class="token operator">:</span> state<span class="token punctuation">.</span>quantity <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>quantity<span class="token operator">:</span> state<span class="token punctuation">.</span>quantity <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>后调的 setState 将覆盖同一周期内先调用 setState 的值</p>
<ul>
<li>setState(stateChange[, callback])</li>
<li>setState((state, props) =&gt; stateChange[, callback])</li>
</ul>
<p>setState必引发更新过程，但不一定会引发render被执行，因为shouldCompomentUpdate可以返回false</p>
<h2 id="常见的问题" tabindex="-1"><a class="header-anchor" href="#常见的问题" aria-hidden="true">#</a> 常见的问题</h2>
<h3 id="问题一" tabindex="-1"><a class="header-anchor" href="#问题一" aria-hidden="true">#</a> 问题一：</h3>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>this.setState({count: state.count + 1}); 
this.setState({count: state.count + 1}); 
this.setState({count: state.count + 1}); 
// state.count === 1，不是 3
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>setState是异步的？</p>
<p>为什么setState是异步的？这样设计的目的是什么？</p>
<p>如何实现异步的setState，设计思路是什么？</p>
<p>为了性能，</p>
<p>因为浏览器是单线程，我举个例子，如果你点击，而这个点击方法里延迟3秒，那么用户再在三秒里是不能做什么事情的，这样的用户体验是极差的，所以react在设计setState的时候会把setState设计成异步。</p>
<p>每一次setState如果都会引发一次组件更新，走完一圈生命周期，实在是有点粗糙和浪费</p>
<p>如何设计我就没思路了</p>
<h4 id="为什么要-setstate-而不是直接-this-state-xx-oo" tabindex="-1"><a class="header-anchor" href="#为什么要-setstate-而不是直接-this-state-xx-oo" aria-hidden="true">#</a> 为什么要 setState，而不是直接 this.state.xx = oo?</h4>
<p>我们知道在 vue 中的修改状态是可以直接修改的。为什么在react中不行</p>
<p>因为 setState 做的事情不仅只是修改了 <code>this.state</code> 的值，另外最重要的是它会触发 React 的更新机制，会进行diff，然后将 patch 部分更新到真实 dom 里。</p>
<p>如果你直接 <code>this.state.xx = oo</code> 的话，state 的值确实会改，但是改了不会触发 UI 的更新，那就不是数据驱动了。</p>
<p>那为什么Vue直接修改 data 可以触发 UI 的更新呢？ 因为 Vue 在创建 UI 的时候会把这些 data 给收集起来，并且在这些 data 的访问器属性 setter 进行了重写，在这个重写的方法里会去触发 UI 的更新</p>
<p>目前React会将setState的效果放在队列中，积攒着一次引发更新过程，为的就是把Virtual DOM和DOM树操作降到最小，用于提高性能</p>
<h2 id="setstate-的大纲笔记" tabindex="-1"><a class="header-anchor" href="#setstate-的大纲笔记" aria-hidden="true">#</a> setState 的大纲笔记</h2>
<ol>
<li>
<p>setState 不会立刻改变 React 组件中 state 的值</p>
<ol>
<li>因为批处理</li>
<li>修改 this.state 值是没有意义的，它不会驱动 react 重渲染</li>
<li>setState 函数能帮助我们更新视图，引发 componentDidMount、render 等一系列函数的调用</li>
</ol>
</li>
<li>
<p>setState 通过引发一次组件的更新过程来引发重新绘制</p>
<ol>
<li>
<p>使用 setState 后，会触发 render</p>
</li>
<li>
<p>react 不像 vue，vue 是通过数据劫持来实现数据变化视图跟着更新，react 需要通过调用 setState 来render</p>
<ol>
<li>React 改变状态时通过一个函数 setState 驱动的，和 vue 不同</li>
</ol>
</li>
<li>
<p>setState 调用引起的React的更新生命周期函数4个函数（比修改 props 引发的生命周期少一个componentWillReceiveProps函数），这4个函数一次被调用</p>
<ol>
<li>
<p>shouldComponentUpdate</p>
</li>
<li>
<p>componentWillUpdate</p>
</li>
<li>
<p>render</p>
</li>
<li>
<p>componentDidUpdate</p>
<p>this.state 只有在render函数被调用后才更新</p>
<p>不管你喜欢不喜欢，反正this.state就是不会再this.setState调用之后立刻更新</p>
</li>
</ol>
</li>
</ol>
</li>
<li>
<p>多次setState函数调用产生的效果会合并。</p>
<ol>
<li>批处理</li>
<li>原因如上所示，只有调用this.setState才会更新试图（render 的时候更新数据），所以为了性能，每次更新过程中，会把积攒的setState结果合并（react会将多个this.setState产生的修改放在一个队列里，最后批处理）</li>
</ol>
</li>
<li>
<p>setState中能传入函数</p>
<ol>
<li>传入函数的话，就能实现同步</li>
</ol>
</li>
<li>
<p>this.setState 能同步</p>
<ol>
<li>在React中，<strong>如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state</strong>。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。</li>
</ol>
</li>
</ol>
<h2 id="执行原理" tabindex="-1"><a class="header-anchor" href="#执行原理" aria-hidden="true">#</a> 执行原理</h2>
<p>this.setState 之后，触发更新。<a href="https://zh-hans.reactjs.org/docs/react-component.html" target="_blank" rel="noopener noreferrer">更新的生命周期调用顺序如下<ExternalLinkIcon/></a>：</p>
<ul>
<li>static getDerivedStateFromProps</li>
<li>shouldComponentUpdate</li>
<li>UNSAFE_componentWillUpdate</li>
<li>render</li>
<li>getSnapshotBeforeUpdate</li>
<li>componentDidUpdate</li>
</ul>
<p>在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state</p>
<p>源码：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
      typeof partialState === 'function' ||
      partialState == null,
    'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.',
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">ReactComponent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">setState</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">partialState<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>updater<span class="token punctuation">.</span><span class="token function">enqueueSetState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> partialState<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>updater<span class="token punctuation">.</span><span class="token function">enqueueCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> callback<span class="token punctuation">,</span> <span class="token string">'setState'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="有一答一" tabindex="-1"><a class="header-anchor" href="#有一答一" aria-hidden="true">#</a> 有一答一</h2>
<ol>
<li>setState 是同步还是异步？</li>
</ol>
<p>我的回答是执行过程代码同步，只要合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，所以表现出来有时候同步，有时候异步</p>
<ol start="2">
<li>何时是同步，何时是异步？</li>
</ol>
<p>只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout/setInterval 等原生API 中都是同步的。简单的可以理解为被 React 控制的函数里面就会表现出“异步”，反之表现为同步。</p>
<ol start="3">
<li>那为什么会出现异步的情况呢？（为什么这么设计？）</li>
</ol>
<p>为了做性能优化，将 state 的更新延缓到最后批量合并再去渲染，对于应用的性能优化有极大好处。如果每次的状态更改都去重新渲染真实 dom，那么它将带来巨大的性能消耗</p>
<ol start="4">
<li>那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？</li>
</ol>
<p>通过第二个参数 <code>setState(partialState, callback)</code> 中的 callback 拿到更新后的结果</p>
<p>或者可以直接给 state 传递函数来表现出同步的情况</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> val<span class="token operator">:</span> newVal <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="5">
<li>那表现出异步的原理是怎么样的？</li>
</ol>
<p>在 React 的 setState 函数实现中，会根据 isBatchingUpdates（默认是 false） 变量判断是否直接更新 this.state 还是放到队列中稍后更新。然后有一个 batchedUpdate 函数，可以修改 isBatchingUpdates 为 true，当 React 调用事件处理函数之前，或者生命周期函数之前就会调用 batchedUpdate 函数，这样的话，setState 就不会同步更新 this.state，而是放到更新队列里面后续更新。</p>
<p>这样你就可以理解为什么原生事件和 setTimeout/setInterval 里面调用 this.state 会同步更新了吧，因为通过这些函数调用的 React 没办法去调用 batchedUpdate 函数将 isBatchingUpdates 设置为 true，那么这个时候 setState 的时候默认就是 false，那么就会同步更新。</p>
<h2 id="来几个面试题" tabindex="-1"><a class="header-anchor" href="#来几个面试题" aria-hidden="true">#</a> 来几个面试题</h2>
<p>第一个，也是我在面试中遇到的。如下的代码，它的 a 的值是多少？又 render 了几次</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class C extends React.Component {
  state = {
    a: 0
  };
  componentDidMount() {
    this.setState({ a: 1 });
    setTimeout(() =&gt; {
      this.setState({ a: 2 });
    }, 0);
    new Promise((resolve) =&gt; {
      resolve(this.setState({ a: 3 }));
    }).then(() =&gt; {
      this.setState({ a: 4 });
    });
  }
  render() {
    console.log(&quot;state&quot;, this.state);
    return &lt;div&gt;{this.state.a}&lt;/div&gt;;
  }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class App extends React.Component {
  state = {
    val: 0
  };
  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    setTimeout(() =&gt; {
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
    }, 0);
  }
  render() {
    return &lt;div className=&quot;App&quot;&gt;{this.state.val}&lt;/div&gt;;
  }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>可以在这里查看 <a href="https://codesandbox.io/s/setstate-216l6?file=/src/App.js" target="_blank" rel="noopener noreferrer">demo<ExternalLinkIcon/></a></p>
<p>答案是 0、0、1、2、3</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/25954470" target="_blank" rel="noopener noreferrer">setState：这个API设计到底怎么样<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/25990883" target="_blank" rel="noopener noreferrer">setState为什么不会同步更新组件状态<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/26069727" target="_blank" rel="noopener noreferrer">setState何时同步更新状态<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000015615057" target="_blank" rel="noopener noreferrer">浅入深出setState（上篇）<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000015821018" target="_blank" rel="noopener noreferrer">浅入深出setState（下篇）<ExternalLinkIcon/></a></li>
<li><a href="https://keqingrong.cn/blog/2019-04-01-react-setstate" target="_blank" rel="noopener noreferrer">重新认识 React 的 setState<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/39512941" target="_blank" rel="noopener noreferrer">你真的理解setState吗？<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/my2Jx7pcbVYnaCWklAzKXA" target="_blank" rel="noopener noreferrer">setState 到底是同步的，还是异步的<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000040445026" target="_blank" rel="noopener noreferrer">React 中 setState 是一个宏任务还是微任务？<ExternalLinkIcon/></a></li>
<li><a href="https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback" target="_blank" rel="noopener noreferrer">What is the advantage of using componentDidUpdate over the setState callback?<ExternalLinkIcon/></a></li>
</ul>
</template>
