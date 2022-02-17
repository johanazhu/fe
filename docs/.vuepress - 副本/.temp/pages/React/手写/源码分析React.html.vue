<template><h1 id="react原理解析" tabindex="-1"><a class="header-anchor" href="#react原理解析" aria-hidden="true">#</a> React原理解析</h1>
<p>知识点</p>
<p>​	虚拟dom</p>
<p>​	JSX</p>
<p>​	React核心api</p>
<p>​	ReactDOM</p>
<p>​		render()</p>
<p>​	实现React.createElement，ReactDom.render，Component</p>
<p>​		CreateElement</p>
<p>​		ReactDOM.render</p>
<p>生命周期怎么实现</p>
<p>setState的过程</p>
<h1 id="jsx和虚拟dom" tabindex="-1"><a class="header-anchor" href="#jsx和虚拟dom" aria-hidden="true">#</a> JSX和虚拟DOM</h1>
<p>问题：</p>
<p><strong>在定义React组件或者书写React相关代码，不管代码中有没有用到React这个对象，我们都必须将其import进来，这是为什么？</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">'react-dom'</span><span class="token punctuation">;</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App<span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>因为React将 App 解析成 vnode</p>
<p>ReactDOM的作用就是将用jsx写成的对象映射到真实的DOM上，引入 React，自然能解析 <code>&lt;App /&gt;</code> 语法</p>
<p>jsx转换成abstract dom tree的时候，需要 <code>React.createElement</code>，引入React，因为babel的缘故，自动转换为 抽象语法树对象</p>
<h2 id="组件和声明周期" tabindex="-1"><a class="header-anchor" href="#组件和声明周期" aria-hidden="true">#</a> 组件和声明周期</h2>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>function Welcome(props) {
    return &lt;h1&gt;Hello, {props.name}&lt;/h1&gt;;
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://i.loli.net/2021/04/19/V9e5gtmZcUkojnS.png" alt="image-20210419171455659"></p>
<p>当对象的type属性是字符串时，表示为普通html标签，当type为函数时，它被当做构造函数，props属性被传入这个构造函数，生成实例，再调用实例的render方法，render方法返回的数据结构才用以渲染。</p>
<p>前言：</p>
<p>React是什么？</p>
<p>React 是一个库，它主要做的事情，就是管理试图UI，</p>
<p>写法：你可以按照 jsx 写法，也可以按照 React.createElement() 来写代码</p>
<p>第一章：JSX与transform-react-jsx</p>
<p>https://zh-hans.reactjs.org/</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class HelloMessage extends React.Component {
  render() {
    return (
      &lt;div&gt;
        Hello {this.props.name}
      &lt;/div&gt;
    );
  }
}

ReactDOM.render(
  &lt;HelloMessage name=&quot;Taylor&quot; /&gt;,
  document.getElementById('hello-example')
);
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>如果不加 JSX 的话，同样的意思</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class HelloMessage extends React.Component {
  render() {
    return React.createElement(
      &quot;div&quot;,
      null,
      &quot;Hello &quot;,
      this.props.name
    );
  }
}

ReactDOM.render(React.createElement(HelloMessage, { name: &quot;Taylor&quot; }), document.getElementById('hello-example'));
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>所以抽象语法树，会讲你写的代码转换成 （“div”, null, 'Hello', this.props.name），即 type，props，多个children，当然你可以以其他形式来</p>
<p>我们知道Babel是将ES6语法转移成ES5，那Babel是怎么转换的呢，就是运用了抽象语法树，具体可以看看这篇文章：抽象语法树</p>
<p>似乎我们只要引入<code>@babel/plugin-transform-react-jsx</code>，就能运行React</p>
<p>那为什么是 （type），属性（props），多个子节点（children）</p>
<p>React</p>
<p>有兴趣可以看看它的<a href="https://github.com/babel/babel/blob/main/packages/babel-plugin-transform-react-jsx/src/create-plugin.js" target="_blank" rel="noopener noreferrer">源码<ExternalLinkIcon/></a></p>
<p>每个 JSX 元素只是调用 <code>React.createElement(component, props, ...children)</code> 的语法糖</p>
<p>所以我们如果要做React.createElement，就按照这种形式来写，至于为什么是 type，props，...children。我想一个 jsx 只需要这三个属性就可以覆盖，标签名，标签中的属性，父标签下的子标签，一直递归下去，知道空</p>
<p>我们先来看一个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> test <span class="token operator">=</span> <span class="token punctuation">(</span>
	<span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"test"</span><span class="token operator">></span>test<span class="token punctuation">,</span> world<span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>	
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createElement</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> props<span class="token punctuation">,</span> <span class="token operator">...</span>children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'type'</span><span class="token punctuation">,</span> type<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'props'</span><span class="token punctuation">,</span> props<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'children'</span><span class="token punctuation">,</span> children<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 源码中，是会输出 $$typeof,key,ref,props,children,_owner,_self,_source 等等</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createElement</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> props<span class="token punctuation">,</span> <span class="token operator">...</span>children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        type<span class="token punctuation">,</span>
        props<span class="token punctuation">,</span>
        children
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>我们已经知道React.createElement 相当于创建了一个对象（也就是虚拟dom），如果我们要在页面上看到所写的代码，就需要把这个对象映射成HTML，然后插入到document（文档）中。</p>
<p>这里有两个步骤，</p>
<p>一是vnode（即虚拟dom，以下简写成vnode）与真实dom的映射</p>
<p>二将真实dom插入到页面中</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>function render(vnode, container) {
    // 第一步：创建真实dom vnode -&gt; node
	const node = createNode(vnode)
    // 第二步：将 node 插入 container
    return container.appendChild(node)
}

function createNode(vnode) {
    ...
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>PS：ReactDOM.render(element, container[, callback])，是有 callback 参数，这里先不实现</p>
<p>关键一部是 createNode 函数，我们先来看看 vnode 的结构</p>
<p>div,</p>
<p>是<code>&lt;div class=&quot;blue&quot;&gt;hello,world&lt;/div&gt;</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> props <span class="token punctuation">}</span> <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
    <span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> type <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 递归children</span>
    
    <span class="token comment">// 在节点上赋上属性</span>
    <span class="token function">setAttribute</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span>
    
    <span class="token comment">// 将 children 遍历，转成真实 dom 节点，再插入 node 中</span>
    <span class="token function">reconcileChildren</span><span class="token punctuation">(</span>nodeChildren<span class="token punctuation">,</span> node<span class="token punctuation">)</span>
    
    <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>疑惑：</p>
<p>react到底是什么</p>
<p>为什么用jsx写react，或者说写组件有哪些方法</p>
<p>简述下React 的生命周期？每个生命周期都做了什么？</p>
<p>setState是异步的，怎么实现</p>
<p>fiber是什么，它解决了什么（为什么用fiber代替之前的框架），优势是什么</p>
<p>事件合成怎么做的，因为react中有几万行代码是针对事件的</p>
<p>hooks 是什么，解决了什么问题，写法，各种hooks的作用和用法</p>
<p>react如何做优化</p>
<p>为什么说 immutable 是 React 的核心？（知乎问题）</p>
<p>为什么要setState，而不是直接this.state.xx == oo？</p>
<p>什么是虚拟dom？</p>
<p>怎么做diff？</p>
<p>react到底是什么</p>
<p>​	UI库..，facebook出品，</p>
<p>​	为什么会出来</p>
<p>​		页面越来越重，频繁操作真实dom页面会变卡，变慢，而且页面不好组织。所以就有了一些框架，其中最好的是react和vue，其目的是</p>
<p>为什么用jsx写react，或者说写组件有哪些方法</p>
<p>​	开创，写起来舒服</p>
<p>​	react.createElement</p>
<p>​	类组件 <code>&lt;Welcome&gt;</code></p>
<p>​	函数组件<code> const jsx = &lt;div&gt;&lt;/div&gt;</code></p>
<p>​	jsx会转换为react.createElement</p>
<p>react 的源头是 react.createElement，生产虚拟dom</p>
<p>组件：</p>
<p>当我们自己的组件继承 Component 的时候，我们的组件会继承一些属性，这些属性简单的来说就是<strong>自更新能力</strong></p>
<p>当我们调用 this.setState() 的时候，组件就会自动的重新渲染自己，然后通过新的虚拟节点去对比旧节点来进行变更</p>
<p>component.render()</p>
<p>得到 vnode</p>
<p>setState为什么要做成异步的？原因是什么？</p>
<p>为了性能，不能每次setState 的时候都触发更新，所以要异步</p>
<p>setState是一个队列</p>
<p>利用事件队列，让flush 在所有同步任务后执行</p>
<p>https://github.com/facebook/react/issues/11527</p>
<p><a href="https://github.com/facebook/react/issues/11527#" target="_blank" rel="noopener noreferrer">RFClarification: why is <code>setState</code> asynchronous?<ExternalLinkIcon/></a></p>
<p>为什么要设计成异步的</p>
<p>批处理</p>
<p>为什么要setState，而不是直接this.state.xx == oo？</p>
<p>​	因为react没有像vue那样对数据进行劫持，如果用this.state.xx == oo，react并不知道是数据改变了，所以必须使用setState来告诉react数据已经发生改变</p>
<p>React hooks 和 Class Component 的性能哪一个更好？</p>
<p>一样，都是走相同的 diff 算法</p>
<p>craeteElement 生成虚拟dom？</p>
<p>JSX ——babel —— React.createElement('div', {}, ...children)——return——VDOM——ReactDOM.render——DOM</p>
<p>先生成虚拟DOM,在把虚拟DOM映射到DOM上，也就是渲染</p>
<p>好文：Deep In React之浅谈 React Fiber 架构(一)</p>
<p>https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&amp;mid=2247484469&amp;idx=1&amp;sn=f68d044f1b0e4e2eb981e3878427b75b&amp;scene=21#wechat_redirect</p>
<p>React 核心思想：</p>
<p>内存中维护一颗虚拟DOM树，数据变化时（setState），自动更新虚拟 DOM，得到一颗新树，然后 Diff 新老虚拟 DOM 树，找到有变化的部分（diff算法），得到一个 Change（Patch），将这个 Patch 加入队列，最终批量更新这些 Patch 到 DOM 中</p>
<p>Fiber时为了解决原先架构中的卡顿问题——任务一旦执行，就无法中断，js 线程一直占用主线程，导致卡顿</p>
<p>render 阶段可以理解为就是 Diff 的过程</p>
<p>React Fiber 首先时将虚拟DOM树转化为 Fiber tree，因此每个节点都有 child、subling、return 属性，遍历 Fiber tree 时采用的是后续遍历方法（深度优先）：</p>
<ol>
<li>从顶点开始遍历</li>
<li>如果有大儿子，先遍历大儿子；如果没有大儿子，则标识遍历完成</li>
<li>大儿子
<ol>
<li>如果有弟弟，则返回弟弟，跳到2</li>
<li>如果没有弟弟，则返回父节点，并标志完成父节点遍历，跳回2</li>
<li>如果没有父节点则标志遍历结束</li>
</ol>
</li>
</ol>
<p><img src="https://i.loli.net/2021/04/28/1mv4WjqrDNKsXPC.png" alt="image-20210428100332140"></p>
<p>React 抽象来说，就是一个公式</p>
<p>UI=f(state)</p>
<p>我们把最终绘制出来的**<em>UI*<strong>当做一个函数</strong></em>f**<em>运行的结果，<em><em><em>f*<strong>就是React和我们基于React写得代码，而</strong></em>f*<strong>的输入参数就是</strong></em>state*</em></em>。</p>
<p>https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzA5NzkwNDk3MQ==&amp;action=getalbum&amp;album_id=1355691950980317186&amp;scene=173&amp;from_msgid=2650591628&amp;from_itemidx=1&amp;count=3&amp;nolastread=1#wechat_redirect</p>
</template>
