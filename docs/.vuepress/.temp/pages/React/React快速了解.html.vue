<template><h1 id="react-快速了解" tabindex="-1"><a class="header-anchor" href="#react-快速了解" aria-hidden="true">#</a> React 快速了解</h1>
<h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2>
<p>用于构建用户界面的 JavaScript 库</p>
<p>facebook 做的一个 UI 库</p>
<p>React 英语意思：响应</p>
<h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2>
<p>声明式</p>
<p>组件化</p>
<p>一次学习，跨平台编写</p>
<p>最好的学习资料在<a href="https://zh-hans.reactjs.org/docs/state-and-lifecycle.html" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></p>
<p>React 的作者的 <a href="https://overreacted.io/" target="_blank" rel="noopener noreferrer">blog<ExternalLinkIcon/></a> ，上面有很多易错点以及原理解答，很好的学习资料</p>
<h2 id="哲学" tabindex="-1"><a class="header-anchor" href="#哲学" aria-hidden="true">#</a> 哲学</h2>
<p>单向数据流</p>
<p>不可变特性（immutability）</p>
<h2 id="本质" tabindex="-1"><a class="header-anchor" href="#本质" aria-hidden="true">#</a> 本质</h2>
<p>主要有三个特征</p>
<ul>
<li>
<p>UI = f(data)</p>
<ul>
<li>贯彻了一套公式</li>
<li>改变 data，驱动 function，从而改变 UI
<ul>
<li>data 即我们所说的 props 和 state</li>
</ul>
</li>
</ul>
</li>
<li>
<p>一切都是组件</p>
<ul>
<li>页面是组件，路由也是组件，错误边界也是组件...</li>
</ul>
</li>
<li>
<p>声明式编程</p>
<ul>
<li>对比 JQuery
<ul>
<li>JQuery 是命令式的库，直接操作 dom，我拿到这个 dom，我要去干什么</li>
<li>React 是声明式的库，写好一个组件，UI就展示成什么样</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="执行过程" tabindex="-1"><a class="header-anchor" href="#执行过程" aria-hidden="true">#</a> 执行过程</h2>
<p>我们用 JSX 来写 React，JSX 会通过 babel 将其代码转换成 React.createElement 的形式，React.createElement 返回的是一个对 DOM 的描述，并不是真正的 DOM，这个叫 Virtual DOM。</p>
<p>当某一时刻调用 React 的 <code>render()</code> 方法，会创建一颗由 React 元素组成的树，在下一次 props 或 state 更新时，相同的 <code>render()</code> 方法会返回一颗不同的树。React 需要基于这两颗树之间的差异来判断如何高效更新 UI，这也就是 diff。</p>
<p>说到 diff，此概念在 <RouterLink to="/Git/">Git</RouterLink> 中也有过，不过 diff 的算法与 React 不同，在 Git 中时间复杂度为 O(n2)，但是在 React 里，最优的算法的时间复杂度仍为 O(n3)</p>
<p>所以 React 在以下两个假设的基础上提出了一套 O(n) 的启发式算法</p>
<ol>
<li>两个不同类型的元素会产生出不同的树</li>
<li>开发者可以通过设置 key 属性，来告知渲染哪些子元素在不同的渲染树下可以保持不变</li>
</ol>
<p>其第一点，不同类型的元素会产生不同的树，React 发现组件的类型不同时，直接重绘新的组件，而不去在做 diff。第二点即可理解为动态产生的组件需要设置 key。</p>
<h3 id="render" tabindex="-1"><a class="header-anchor" href="#render" aria-hidden="true">#</a> Render</h3>
<p>Class 中的 Render 方法是个纯函数，不做任何直接渲染的事情。只是返回了一些指令，由 React 对这些指令做真正的 DOM 操作</p>
<p>JSX 其实是 <code>React.createElement(compoent, props,...children)</code> 函数的语法糖。如下 JSX 代码：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>&lt;MyButton color=&quot;blue&quot; shadowSize={2}&gt;
    Click Me
&lt;/MyButton&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>会编译为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
	MyButton<span class="token punctuation">,</span>
    <span class="token punctuation">{</span>color<span class="token operator">:</span> <span class="token string">'blue'</span><span class="token punctuation">,</span> shadowSize<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">'Click Me'</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><a href="https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&amp;build=&amp;builtIns=false&amp;corejs=3.6&amp;spec=false&amp;loose=false&amp;code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA&amp;debug=false&amp;forceAllTransforms=false&amp;shippedProposals=false&amp;circleciRepo=&amp;evaluate=false&amp;fileSize=false&amp;timeTravel=false&amp;sourceType=module&amp;lineWrap=true&amp;presets=react&amp;prettier=false&amp;targets=&amp;version=7.15.5&amp;externalPlugins=&amp;assumptions=%7B%7D" target="_blank" rel="noopener noreferrer">在线 Babel 编译器<ExternalLinkIcon/></a> 可以玩一玩</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zh-hans.reactjs.org" target="_blank" rel="noopener noreferrer">React 官网<ExternalLinkIcon/></a></li>
<li><a href="https://www.zhihu.com/lives/883022235516960768" target="_blank" rel="noopener noreferrer">帮助你深入理解 React<ExternalLinkIcon/></a></li>
<li><a href="https://www.xbroder.com/2018/08/19/react-zhihu-live/" target="_blank" rel="noopener noreferrer">Live - 帮助你深入理解 React<ExternalLinkIcon/></a></li>
</ul>
</template>
