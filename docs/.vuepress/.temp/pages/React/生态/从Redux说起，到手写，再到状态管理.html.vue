<template><h1 id="从redux说起-到手写-再到状态管理" tabindex="-1"><a class="header-anchor" href="#从redux说起-到手写-再到状态管理" aria-hidden="true">#</a> 从Redux说起，到手写，再到状态管理</h1>
<blockquote>
<p>学习一个东西之前，首先在大脑中积累充分的“疑惑感”。即弄清面临的问题到底是什么，再浏览方法本身之前，最好先使劲问问都想到什么方法。一个公认的事实是，你对问题的疑惑越大，在之前做的自己的思考越多，当看到解答之后印象就越深刻</p>
</blockquote>
<h2 id="先说结论" tabindex="-1"><a class="header-anchor" href="#先说结论" aria-hidden="true">#</a> 先说结论</h2>
<ol>
<li>Redux 是状态管理库，也是一种架构</li>
<li>Redux 与 React 无关，但它是为了解决 React 组件中状态无法共享而出的一种解决方案</li>
<li>单纯的 Redux 只是一个状态机， store 中存放了所有的状态 state，要想改变里面的状态 state，只能 dispatch 一个动作</li>
<li>发出去的 action 需要用 reducer 来处理，传入 state 和 action，返回新的 state</li>
<li>subscribe 方法可以注册回调方法，当 dispatch action 的时候会执行里面的回调</li>
<li>Redux 其实是一个发布订阅模式</li>
<li>Redux 支持 enhancer，enhancer 其实就是一个装饰器模式，传入当前的 createStore，返回一个增强的 createStore</li>
<li>Redux 使用 applyMiddleware 函数支持中间件，它的返回值其实就是一个 enhancer</li>
<li>Redux 的中间件也是一个装饰器模式，传入当前的 dispatch，返回一个增强了的 dispatch</li>
<li>单纯的 Redux 是没有 View 层的</li>
</ol>
<h2 id="为什么出现redux" tabindex="-1"><a class="header-anchor" href="#为什么出现redux" aria-hidden="true">#</a> 为什么出现Redux？</h2>
<p>我们默认使用 React 技术栈，当页面少且简单时，完全没必要使用 Redux。Redux 的出现，是为了应对复杂组件的情况。即当组件复杂到三层甚至四层时（如下图），组件 4 想改变组件 1 的状态</p>
<p><img src="https://i.loli.net/2021/12/01/HruEAivF4DsxNcq.png" alt="react 组件树"></p>
<p>按照 React 的做法，状态提升，将状态提升至同一父组件（在图中为祖父组件）。但层级一多，根组件要管理的 state 就很多了，不方便管理。</p>
<p>所以当初有了 context（React 0.14 确定引入），通过 context 能实现”远房组件“的数据共享。但它也有缺点，使用 context 意味着所有的组件都可以修改 context 里面的状态，就像谁都可以修改共享状态一样，导致程序运行的不可预测，这不是我们想要的</p>
<p>facebook 提出了 <a href="https://facebook.github.io/flux/" target="_blank" rel="noopener noreferrer">Flux<ExternalLinkIcon/></a> 解决方案，它引入了<a href="#%E8%A1%A5%E5%85%85%EF%BC%9A%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81">单向数据流</a>的概念（没错，React 没有单向数据流的概念，Redux 是集成了 Flux 的单向数据流理念），架构如下图所示：</p>
<p><img src="https://i.loli.net/2021/12/01/YzWmMoJCILsVZaE.png" alt="Flux 流程图"></p>
<p>这里不表 Flux。简单理解，在 Flux 架构中，View 要通过 Action （动作）通知 Dispatcher（派发器），Dispatcher 来修改 Store，Store 再修改 View</p>
<p>Flux 的问题或者说缺点在哪？</p>
<p>store 之间存在依赖关系、难以进行服务器端渲染、 stores 混杂了逻辑和状态</p>
<p>笔者在学习的 React 技术栈时是 2018 年，那是已然流行 React + Redux 的解决方案，Flux 已经被淘汰了，了解 Flux 是为了引出 Redux</p>
<h2 id="redux-的出现" tabindex="-1"><a class="header-anchor" href="#redux-的出现" aria-hidden="true">#</a> Redux 的出现</h2>
<p>Redux 主要解决状态共享问题</p>
<blockquote>
<p>官网：Redux 是 JavaScript 状态容器，它提供可预测的状态管理</p>
<p>它的作者是 <a href="https://overreacted.io/" target="_blank" rel="noopener noreferrer">Dan Abramov<ExternalLinkIcon/></a></p>
</blockquote>
<p>其架构为：</p>
<p><img src="https://i.loli.net/2021/12/02/eFszAQYxwLNMKUt.png" alt="Redux 流程图"></p>
<p>可以看得出，Redux 只是一个状态机，没有 View 层。其过程可以这样描述：</p>
<ul>
<li>自己写一个 reducer（纯函数，表示做什么动作会返回什么数据）</li>
<li>自己写一个 initState（store初始值，可写可不写）</li>
<li>通过 createStore 生成 store，此变量包含了三个重要的属性
<ul>
<li>store.getState：得到唯一值（使用了闭包老哥）</li>
<li>store.dispatch：动作行为（改变store中数据的唯一指定属性）</li>
<li>store.subscribe：订阅（发布订阅模式）</li>
</ul>
</li>
<li>通过 store.dispatch 派发一个 action</li>
<li>reducer 处理 action 返回一个新的 store</li>
<li>如果你订阅过，当数据改变时，你会收到通知</li>
</ul>
<p>按照行为过程，我们可手写一个 Redux，下文在表，先说特点</p>
<h3 id="三大原则" tabindex="-1"><a class="header-anchor" href="#三大原则" aria-hidden="true">#</a> 三大原则</h3>
<ul>
<li>单一数据源
<ul>
<li>整个应用的 全局 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中</li>
</ul>
</li>
<li>State 是只读的
<ul>
<li>唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生时间的普通对象</li>
</ul>
</li>
<li>使用纯函数来执行修改
<ul>
<li>为了描述 action 如何改变 state tree，你需要编写纯的 reducers</li>
</ul>
</li>
</ul>
<p>三大原则是为了更好地开发，按照<a href="#%E8%A1%A5%E5%85%85%EF%BC%9A%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81">单向数据流</a>的理念，行为变得可回溯</p>
<p>让我们动手写一个 Redux 吧</p>
<h2 id="手写-redux" tabindex="-1"><a class="header-anchor" href="#手写-redux" aria-hidden="true">#</a> 手写 redux</h2>
<p>按照行为过程和原则，我们要避免数据的随意修改、行为的可回溯等问题</p>
<h3 id="基础版-23行代码让你使用redux" tabindex="-1"><a class="header-anchor" href="#基础版-23行代码让你使用redux" aria-hidden="true">#</a> 基础版：23行代码让你使用redux</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> initState</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> state <span class="token operator">=</span> initState<span class="token punctuation">;</span>
    <span class="token keyword">let</span> listeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">subscribe</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        listeners<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token function-variable function">dispatch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token function">reducer</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> action<span class="token punctuation">)</span>
        listeners<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token function-variable function">getState</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> state
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        getState<span class="token punctuation">,</span>
        dispatch<span class="token punctuation">,</span>
        subscribe
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>搞个测试用例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../redux/index.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> initState <span class="token operator">=</span> <span class="token punctuation">{</span>
    count<span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">reducer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'INCREMENT'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">case</span> <span class="token string">'DECREMENT'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> state <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'state'</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'INCREMENT'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><blockquote>
<p>PS：俺是在 node 中使用 ES6 模块，需要升级Node版本至13.2.0</p>
</blockquote>
<h3 id="第二版-难点突破-中间件" tabindex="-1"><a class="header-anchor" href="#第二版-难点突破-中间件" aria-hidden="true">#</a> 第二版：难点突破：中间件</h3>
<p>普通的 Redux 只能做最基础地根据动作返回数据，dispatch 只是一个取数据的命令，例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'INCREMENT'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// store 中的 count + 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>但在开发中，我们有时候要查看日志、异步调用、记录日常等</p>
<p>怎么办，做成插件</p>
<p>在 Redux 中，类似的概念叫中间件</p>
<p><img src="https://i.loli.net/2021/12/03/xqXD5ynSbl6MWVu.png" alt="中间件"></p>
<p>Redux 的 createStore 共有三个参数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">[</span>reducer<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>initial state<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>enhancer<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>第三个参数为 enhancer，意为增强器。它的作用就是代替普通的 createStore，转变成为附加上中间件的 createStore。打几个比方：</p>
<ul>
<li>托尼·斯塔克本来是一个普通有钱人，加上增强器（盔甲）后，成了钢铁侠</li>
<li>中央下发一笔救灾款，加上增强器（大小官员的打点）后，到灾民手上的钱只有一丢丢</li>
<li>路飞用武装色打人，武装色就是一个中间件</li>
</ul>
<p>enhancer要做的就是：<strong>东西还是那个东西，只是经过了一些工序，加强了它</strong>。这些工序由 applyMiddleware 函数完成。按照行业术语，它是一个<strong>装饰器模式</strong>。它的写法大致是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">applyMiddleware</span><span class="token punctuation">(</span><span class="token operator">...</span>middlewares<span class="token punctuation">)</span>
<span class="token comment">// 结合 createStore，就是</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reudcer<span class="token punctuation">,</span>initState<span class="token punctuation">,</span><span class="token function">applyMiddleware</span> <span class="token punctuation">(</span><span class="token operator">...</span>middlewares<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>所以我们需要先对 createStore 进行改造，判断当有 enhancer 时，我们需传值给中间件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> initState<span class="token punctuation">,</span> enhancer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>enhancer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> newCreateStore <span class="token operator">=</span> <span class="token function">enhancer</span><span class="token punctuation">(</span>createStore<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">newCreateStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
	<span class="token keyword">let</span> state <span class="token operator">=</span> initState<span class="token punctuation">;</span>
    <span class="token keyword">let</span> listeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>如果有 enhancer 的话，先传入 createStore 函数，生成的 newCreateStore 和原来的 createStore 一样，会根据 reducer, initState 生成 store。可简化为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>enhancer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">enhancer</span><span class="token punctuation">(</span>createStore<span class="token punctuation">)</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote>
<p>PS：为什么要写成这样，因为 redux 是按照函数式写法来写的</p>
<p>为什么 createStore 可以被传值，因为函数也是对象，也可以作为参数传递（老铁闭包了）</p>
</blockquote>
<p>这样我们的 applyMiddleware 自然就明确了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">applyMiddleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>middlewares</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">oldCreateStore</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> initState</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">oldCreateStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">)</span>
            <span class="token operator">...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>这里的 store 表示的是普通版中的 store，接下来我们要增强 store 中的属性</p>
<p>我愿称之为：五行代码让女人为我花了18万</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">applyMiddleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>middlewares</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">oldCreateStore</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> initState</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">oldCreateStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">)</span>
            <span class="token comment">// 以下为新增</span>
            <span class="token keyword">const</span> chain <span class="token operator">=</span> middlewares<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">middleware</span> <span class="token operator">=></span> <span class="token function">middleware</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">// 获得老 dispatch</span>
            <span class="token keyword">let</span> dispatch <span class="token operator">=</span> store<span class="token punctuation">.</span>dispatch
            chain<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">middleware</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token comment">// 给每个中间件传入原派发器，赋值中间件改造后的dispatch</span>
                dispatch <span class="token operator">=</span> <span class="token function">middleware</span><span class="token punctuation">(</span>dispatch<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token comment">// 赋值给 store 上的 dispatch</span>
            store<span class="token punctuation">.</span>dispatch <span class="token operator">=</span> dispatch
            <span class="token keyword">return</span> store
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>现在写几个中间件来测试一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 记录日志</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">loggerMiddleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">store</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this.state'</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'action'</span><span class="token punctuation">,</span> action<span class="token punctuation">)</span>
    <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'next state'</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 记录异常</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">exceptionMiddleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">store</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'错误报告'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 时间戳</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">timeMiddleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">store</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'time'</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>引入项目中，并运行</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore<span class="token punctuation">,</span> applyMiddleware <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../redux/index.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> loggerMiddleware<span class="token punctuation">,</span> exceptionMiddleware<span class="token punctuation">,</span> timeMiddleware <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./middleware.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> initState <span class="token operator">=</span> <span class="token punctuation">{</span>
    count<span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">reducer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'INCREMENT'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">case</span> <span class="token string">'DECREMENT'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">,</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>loggerMiddleware<span class="token punctuation">,</span> exceptionMiddleware<span class="token punctuation">,</span> timeMiddleware<span class="token punctuation">)</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> state <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'state'</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'INCREMENT'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>运行发现已经实现了 redux 最重要的功能——中间件</p>
<p><img src="https://i.loli.net/2021/12/03/F6l5Gfdow9OUSTn.png" alt="测试代码"></p>
<p>来分析下中间件的函数式编程，以 loggerMiddleware 为例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">loggerMiddleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">store</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this.state'</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'action'</span><span class="token punctuation">,</span> action<span class="token punctuation">)</span>
    <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'next state'</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在 applyMiddleware 源码中，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> chain <span class="token operator">=</span> middlewares<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">middleware</span> <span class="token operator">=></span> <span class="token function">middleware</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>相当于给每个中间件传值普通版的store</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> dispatch <span class="token operator">=</span> store<span class="token punctuation">.</span>dispatch
chain<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">middleware</span> <span class="token operator">=></span> dispatch <span class="token operator">=</span> <span class="token function">middleware</span><span class="token punctuation">(</span>dispatch<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>相当于给每个中间件在传入 store.dispatch，也就是 next，<strong>原dispatch = next</strong>。这个时候的中间件已经本成品了，代码中的 <code>(action) =&gt; {...}</code> 就是函数 <code>const dispatch = (action) =&gt; {}</code>。当你执行 <code>dispatch({ type: XXX })</code> 时执行中间件这段<code>(action) =&gt; {...}</code></p>
<blockquote>
<p>PS：柯里化一开始比较难理解，用多习惯就慢慢能懂</p>
</blockquote>
<h3 id="第三版-结构复杂化与拆分" tabindex="-1"><a class="header-anchor" href="#第三版-结构复杂化与拆分" aria-hidden="true">#</a> 第三版：结构复杂化与拆分</h3>
<p>中间件理解起来或许有些复杂，先看看其他的概念换换思路</p>
<p>一个应用做大后，单靠一个 JavaScript 文件来维护代码显然是不科学的，在 Redux 中，为避免这类情况，它提供了 <code>combineReducers</code> 来整个多个 reducer，使用方法如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reducer <span class="token operator">=</span> <span class="token function">combinReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    counter<span class="token operator">:</span> counterReducer<span class="token punctuation">,</span>
    info<span class="token operator">:</span> infoReducer<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在 <code>combinReducers</code> 中传入一个对象，什么样的 state 对应什么样的 reducer。这就好了，那么 <code>combinReducers</code> 怎么实现呢？因为比较简单，不做多分析，直接上源码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">combinReducers</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>reducers</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 拿到 counter、info</span>
    <span class="token keyword">const</span> reducerKey <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>reducers<span class="token punctuation">)</span>
	<span class="token comment">// combinReducers 合并的是 reducer，返回的还是一个 reducer，所以返回一样的传参</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> nextState <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token comment">// 循环 reducerKey，什么样的 state 对应什么样的 reducer</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> reducerKey<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> key <span class="token operator">=</span> reducerKey<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
            <span class="token keyword">const</span> reducer <span class="token operator">=</span> reducers<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
            <span class="token keyword">const</span> previousStateForKey <span class="token operator">=</span> state<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
            <span class="token keyword">const</span> nextStateForKey <span class="token operator">=</span> <span class="token function">reducer</span><span class="token punctuation">(</span>previousStateForKey<span class="token punctuation">,</span> action<span class="token punctuation">)</span>
            nextState<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> nextStateForKey
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> nextState
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>同级目录下新建一个 reducer 文件夹，并新建 <code>reducer.js</code>、<code>info.js</code>、<code>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// reducer.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'INCREMENT'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">case</span> <span class="token string">'DECREMENT'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// info.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'SET_NAME'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                name<span class="token operator">:</span> action<span class="token punctuation">.</span>name
            <span class="token punctuation">}</span>
        <span class="token keyword">case</span> <span class="token string">'SET_DESCRIPTION'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                description<span class="token operator">:</span> action<span class="token punctuation">.</span>description
            <span class="token punctuation">}</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>合并导出</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> counterReducer <span class="token keyword">from</span> <span class="token string">'./counter.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> infoReducer <span class="token keyword">from</span> <span class="token string">'./info.js'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>
    counterReducer<span class="token punctuation">,</span>
    infoReducer
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>我们现在测试一下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore<span class="token punctuation">,</span> applyMiddleware<span class="token punctuation">,</span> combinReducers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../redux/index.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> loggerMiddleware<span class="token punctuation">,</span> exceptionMiddleware<span class="token punctuation">,</span> timeMiddleware <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./middleware.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> counterReducer<span class="token punctuation">,</span> infoReducer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./reducer/index.js'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> initState <span class="token operator">=</span> <span class="token punctuation">{</span>
    counter<span class="token operator">:</span> <span class="token punctuation">{</span>
        count<span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    info<span class="token operator">:</span> <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">'johan'</span><span class="token punctuation">,</span>
        description<span class="token operator">:</span> <span class="token string">'前端之虎'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> reducer <span class="token operator">=</span> <span class="token function">combinReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    counter<span class="token operator">:</span> counterReducer<span class="token punctuation">,</span>
    info<span class="token operator">:</span> infoReducer<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">,</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>loggerMiddleware<span class="token punctuation">,</span> exceptionMiddleware<span class="token punctuation">,</span> timeMiddleware<span class="token punctuation">)</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'INCREMENT'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><code>combinReducers</code> 也完成了</p>
<p><img src="https://i.loli.net/2021/12/03/afUen16QiKRy3l4.png" alt="测试代码"></p>
<p>既然拆分了 reducer，那么 state 是否也能拆分，并且它是否需要传，在我们平时的写法中，一般都不传 state。这里需要两点改造，一是每个 reducer 中包含了它的 state 和 reducer；二是改造 createStore，让 initState 变得可传可不传，以及初始化数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// counter.js 中写入对应的 state 和 reducer</span>
<span class="token keyword">let</span> initState <span class="token operator">=</span> <span class="token punctuation">{</span>
    counter<span class="token operator">:</span> <span class="token punctuation">{</span>
        count<span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> initState
    <span class="token punctuation">}</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'INCREMENT'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">case</span> <span class="token string">'DECREMENT'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// info.js</span>
<span class="token keyword">let</span> initState <span class="token operator">=</span> <span class="token punctuation">{</span>
    info<span class="token operator">:</span> <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">'johan'</span><span class="token punctuation">,</span>
        description<span class="token operator">:</span> <span class="token string">'前端之虎'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> initState
    <span class="token punctuation">}</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'SET_NAME'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                name<span class="token operator">:</span> action<span class="token punctuation">.</span>name
            <span class="token punctuation">}</span>
        <span class="token keyword">case</span> <span class="token string">'SET_DESCRIPTION'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                description<span class="token operator">:</span> action<span class="token punctuation">.</span>description
            <span class="token punctuation">}</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>改造 createStore</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">createStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> initState<span class="token punctuation">,</span> enhancer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> initState <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        enhancer <span class="token operator">=</span> initState<span class="token punctuation">;</span>
        initState <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token punctuation">}</span>
    <span class="token operator">...</span>
    <span class="token keyword">const</span> <span class="token function-variable function">getState</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> state
    <span class="token punctuation">}</span>
	<span class="token comment">// 用一个不匹配任何动作来初始化store</span>
    <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        getState<span class="token punctuation">,</span>
        dispatch<span class="token punctuation">,</span>
        subscribe
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>主文件中</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore<span class="token punctuation">,</span> applyMiddleware<span class="token punctuation">,</span> combinReducers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./redux/index.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> loggerMiddleware<span class="token punctuation">,</span> exceptionMiddleware<span class="token punctuation">,</span> timeMiddleware <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./middleware.js'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> counterReducer<span class="token punctuation">,</span> infoReducer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./reducer/index.js'</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> reducer <span class="token operator">=</span> <span class="token function">combinReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    counter<span class="token operator">:</span> counterReducer<span class="token punctuation">,</span>
    info<span class="token operator">:</span> infoReducer<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>loggerMiddleware<span class="token punctuation">,</span> exceptionMiddleware<span class="token punctuation">,</span> timeMiddleware<span class="token punctuation">)</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>到此为止，我们已经实现了一个七七八八的 redux 了</p>
<h3 id="完整体的-redux" tabindex="-1"><a class="header-anchor" href="#完整体的-redux" aria-hidden="true">#</a> 完整体的 Redux</h3>
<h4 id="退订" tabindex="-1"><a class="header-anchor" href="#退订" aria-hidden="true">#</a> 退订</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">subscribe</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    listeners<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> index <span class="token operator">=</span> listeners<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>listener<span class="token punctuation">)</span>
        listeners<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="中间件拿到的-store" tabindex="-1"><a class="header-anchor" href="#中间件拿到的-store" aria-hidden="true">#</a> 中间件拿到的 store</h4>
<p>现在的中间件能拿到完整的 store，他甚至可以修改我们的 subscribe 方法。按照<strong>最小开放策略</strong>，我们只用给 getState 即可，修改下 applyMiddleware 中给中间件传的 store</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// const chain = middlewares.map(middleware => middleware(store))</span>
<span class="token keyword">const</span> simpleStore <span class="token operator">=</span> <span class="token punctuation">{</span> getState<span class="token operator">:</span> store<span class="token punctuation">.</span>getState <span class="token punctuation">}</span>
<span class="token keyword">const</span> chain <span class="token operator">=</span> middlewares<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">middleware</span> <span class="token operator">=></span> <span class="token function">middleware</span><span class="token punctuation">(</span>simpleStore<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="compose" tabindex="-1"><a class="header-anchor" href="#compose" aria-hidden="true">#</a> compose</h4>
<p>在我们的 applyMiddleware 中，把 [A, B, C] 转换成 A(B(C(next)))，效果是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> chain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token constant">A</span><span class="token punctuation">,</span> <span class="token constant">B</span><span class="token punctuation">,</span> <span class="token constant">C</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> dispatch <span class="token operator">=</span> store<span class="token punctuation">.</span>dispatch<span class="token punctuation">;</span>
chain<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">middleware</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
   dispatch <span class="token operator">=</span> <span class="token function">middleware</span><span class="token punctuation">(</span>dispatch<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Redux 提供了一个 compose ，如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>funcs</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>funcs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token parameter">args</span> <span class="token operator">=></span> args
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>funcs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> funcs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> funcs<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_2行代码-replacereducer" tabindex="-1"><a class="header-anchor" href="#_2行代码-replacereducer" aria-hidden="true">#</a> 2行代码 replaceReducer</h4>
<p>替换当前的 reudcer ，使用场景：</p>
<ul>
<li>代码分割</li>
<li>动态加载</li>
<li>实时 reloading 机制</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">replaceReducer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">nextReducer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    reducer <span class="token operator">=</span> nextReducer
    <span class="token comment">// 刷新一次，广播 reducer 已经替换，也同样把默认值换成新的 reducer</span>
    <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="bindactioncreators" tabindex="-1"><a class="header-anchor" href="#bindactioncreators" aria-hidden="true">#</a> bindActionCreators</h4>
<p>bindActionCreators 是做什么的，他通过闭包，把 dispatch 和 actionCreator 隐藏起来，让其他地方感知不到 redux 的存在。一般与 react-redux 的 connect 结合</p>
<p>这里直接贴源码实现：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">bindActionCreator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">actionCreator<span class="token punctuation">,</span> dispatch</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">actionCreator</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">bindActionCreators</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">actionCreators<span class="token punctuation">,</span> dispatch</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> actionCreators <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">bindActionCreator</span><span class="token punctuation">(</span>actionCreators<span class="token punctuation">,</span> dispatch<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> actionCreators <span class="token operator">!==</span> <span class="token string">'object'</span> <span class="token operator">||</span> actionCreators <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>actionCreators<span class="token punctuation">)</span>
    <span class="token keyword">const</span> boundActionCreators <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token keyword">const</span> actionCreator <span class="token operator">=</span> actionCreators<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> actionCreator <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            boundActionCreators<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">bindActionCreator</span><span class="token punctuation">(</span>actionCreator<span class="token punctuation">,</span> dispatch<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> boundActionCreators
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>以上，我们就已经完成了 Redux 中所有的代码。大体上这里100多行的代码就是 Redux 的全部，真 Redux 无非是加了些注释和参数校验</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>我们把与 Redux 相关的名词列出来，梳理它是做什么的</p>
<ul>
<li>createStore
<ul>
<li>创建 store 对象，包含 getState、dispatch、subscribe、replaceReducer</li>
</ul>
</li>
<li>reducer
<ul>
<li>纯函数，接受旧的 state、action，生成新的 state</li>
</ul>
</li>
<li>action
<ul>
<li>动作，是一个对象，必须包括 type 字段，表示 view 发出通知告诉 store 要改变</li>
</ul>
</li>
<li>dispatch
<ul>
<li>派发，触发 action ，生成新的 state。是 view 发出 action 的唯一方法</li>
</ul>
</li>
<li>subscribe
<ul>
<li>订阅，只有订阅了，当派发时，会执行订阅函数</li>
</ul>
</li>
<li>combineReducers
<ul>
<li>合并 reducer 成一个 reducer</li>
</ul>
</li>
<li>replaceReudcer
<ul>
<li>代替 reducer 的函数</li>
</ul>
</li>
<li>middleware
<ul>
<li>中间件，扩展 dispatch 函数</li>
</ul>
</li>
</ul>
<p><a href="https://github.com/brickspert" target="_blank" rel="noopener noreferrer">砖家<ExternalLinkIcon/></a>曾经画过一张关于 Redux 的流程图</p>
<p><img src="https://s2.loli.net/2021/12/06/xD9omCG4OScBFiK.png" alt="流程图"></p>
<h2 id="换种思考方式理解" tabindex="-1"><a class="header-anchor" href="#换种思考方式理解" aria-hidden="true">#</a> 换种思考方式理解</h2>
<p>我们说过， Redux 只是一个状态管理库，它是由数据来驱动，发起 action，会引发 reducer 的数据更新，从而更新到最新的 store</p>
<h3 id="与-react-结合" tabindex="-1"><a class="header-anchor" href="#与-react-结合" aria-hidden="true">#</a> 与 React 结合</h3>
<p>拿着刚做好的 Redux，放到 React 中，试试什么叫 Redux + React 集合，注意，这里我们先不使用 React-Redux，单拿这两个结合</p>
<p>先创建项目</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npx create-react-app demo-5-react
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>引入手写的 redux 库</p>
<p>在 <code>App.js</code> 中引入 createStore，并写好初始数据和 reducer，在 useEffect 中监听数据，监听好之后当发起一个 action 时，数据就会改变，看代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useEffect<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./redux'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'./App.css'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> initState <span class="token operator">=</span> <span class="token punctuation">{</span>
    count<span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">reducer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'INCREMENT'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">case</span> <span class="token string">'DECREMENT'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>
                <span class="token operator">...</span>state<span class="token punctuation">,</span>
                count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>count<span class="token punctuation">)</span>

    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> unsubscribe <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">setCount</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>count<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>unsubscribe<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token function-variable function">onHandle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            type<span class="token operator">:</span> <span class="token string">'INCREMENT'</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'store'</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>count<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"App"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
            <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>onHandle<span class="token punctuation">}</span><span class="token operator">></span>add<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><p>点击 button 后，数据跟着改变</p>
<p><img src="https://s2.loli.net/2021/12/06/E5xaY7dVv9OJUMP.png" alt="效果图"></p>
<blockquote>
<p>PS：虽然我们可以用这种方式订阅 store 和改变数据，但是订阅的代码重复过多，我们可以用高阶组件将他提取出去。这也是 React-Redux 所做的事情</p>
</blockquote>
<h3 id="与原生js-html结合" tabindex="-1"><a class="header-anchor" href="#与原生js-html结合" aria-hidden="true">#</a> 与原生JS+HTML结合</h3>
<p>我们说过，Redux 是个独立于 Redux 的存在，它不仅可在 Redux 充当数据管理器，还可以在原生 JS + HTML 中充当起职位</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>count<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>add<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./redux/index.js'</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> initState <span class="token operator">=</span> <span class="token punctuation">{</span>
            count<span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> <span class="token function-variable function">reducer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token string">'INCREMENT'</span><span class="token operator">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">{</span>
                        <span class="token operator">...</span>state<span class="token punctuation">,</span>
                        count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span>
                    <span class="token punctuation">}</span>
                <span class="token keyword">case</span> <span class="token string">'DECREMENT'</span><span class="token operator">:</span>
                    <span class="token keyword">return</span> <span class="token punctuation">{</span>
                        <span class="token operator">...</span>state<span class="token punctuation">,</span>
                        count<span class="token operator">:</span> state<span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span>
                    <span class="token punctuation">}</span>
                <span class="token keyword">default</span><span class="token operator">:</span>
                    <span class="token keyword">return</span> state
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initState<span class="token punctuation">)</span>

        <span class="token keyword">let</span> count <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'count'</span><span class="token punctuation">)</span>
        <span class="token keyword">let</span> add <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"btn"</span><span class="token punctuation">)</span>
        add<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                type<span class="token operator">:</span> <span class="token string">'INCREMENT'</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 渲染视图</span>
        <span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            count<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>count
        <span class="token punctuation">}</span>
        <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 监听数据</span>
        store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> state <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'state'</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span>
            <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br></div></div><p>效果如下：</p>
<p><img src="https://s2.loli.net/2021/12/06/zuaQsI9mhj5SAPF.png" alt="效果图"></p>
<h2 id="状态生态" tabindex="-1"><a class="header-anchor" href="#状态生态" aria-hidden="true">#</a> 状态生态</h2>
<p>我们从 Flux 说到 Redux，再从 Redux 说了各种中间件，其中 React-saga 就是为解决异步行为而生的中间件，它主要采用 Generator（生成器）概念，比起 React-thunk 和 React-promise，它没有像其他两者将异步行为放在 action creator 上，而是把所有的异步操作看成“线程”，通过action触发它，当操作完成后再次发出 action 作为输出</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">helloWorldGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token string">'world'</span><span class="token punctuation">;</span>
    <span class="token keyword">yield</span> <span class="token string">'ending'</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> helloWorld <span class="token operator">=</span> <span class="token function">helloWorldGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

hewlloWorld<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// { value: 'hello', done: false }</span>
hewlloWorld<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// { value: 'world', done: false }</span>
hewlloWorld<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// { value: 'ending', done: true }</span>
hewlloWorld<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// { value: undefined, done: true }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>简单来说：遇到 yield 表达式，就暂停执行后面的操作，并将紧跟 yield 后面的那个表达式的值，作为返回值 value，等着下一个调用 next 方法，再继续往下执行</p>
<h3 id="dva" tabindex="-1"><a class="header-anchor" href="#dva" aria-hidden="true">#</a> Dva</h3>
<p>Dva 是什么？</p>
<blockquote>
<p>官网：Dva 首先是一个基于 Redux + Redux-saga 的数据流方案。为了简化开发体验，Dva 还额外内置了 react-router 和 fetch，所以可以理解为一个轻量级的应用框架</p>
</blockquote>
<p>简单来说，它是整合了现在最流行的数据流方案，即一个React技术栈：</p>
<p>dva = React-Router + Redux + Redux-saga + React-Redux</p>
<p>它的数据流图为：</p>
<p><img src="https://s2.loli.net/2021/12/06/QUOfn9sW2NqEyCA.png" alt="Dva 流程图"></p>
<p>view dispatch 一个动作，改变 state（即 store），state与 view 绑定，响应 view</p>
<p>其他不表，可去 <a href="https://dvajs.com/" target="_blank" rel="noopener noreferrer">Dva 官网<ExternalLinkIcon/></a>查看，这里讲讲 Model ，它包含了5个属性</p>
<ul>
<li>namespace
<ul>
<li>model 的命名空间，同时也是他在全局 state 上的属性，只能用字符串，不支持通过 <code>.</code> 的方式创建多层命名空间</li>
</ul>
</li>
<li>state
<ul>
<li>初始值</li>
</ul>
</li>
<li>reducers
<ul>
<li>纯函数，以 key/value 格式定义 reducer。用于处理同步擦做，唯一可以修改 <code>state</code> 的地方，由 <code>action</code> 触发</li>
<li>格式为：<code>(state, action) =&gt; newState</code> 或 <code>[(state, action) =&gt; newState, enhancer]</code></li>
</ul>
</li>
<li>effects
<ul>
<li>处理异步操作和业务逻辑，以 key/value 格式定义 effect</li>
<li>不直接修改 state。由 action 触发</li>
<li>call：执行异步操作</li>
<li>put：发出一个 Action，类似于 dispatch</li>
</ul>
</li>
<li>subscriptions
<ul>
<li>订阅</li>
<li>在 <code>app.start()</code> 时被执行，数据源可以是当前的时间、服务器的 websocket 链接、 keyboard 输入、history 路由变化、geolocation 变化等等</li>
</ul>
</li>
</ul>
<h3 id="mobx" tabindex="-1"><a class="header-anchor" href="#mobx" aria-hidden="true">#</a> Mobx</h3>
<p>View 通过订阅也好，监听也好，不同的框架有不同的技术，总之 store 变化， view 也跟着变化</p>
<p>Mobx 使用的是响应式数据流方案。后续会单独写一篇，此篇太长，先不写</p>
<h2 id="补充-单向数据流" tabindex="-1"><a class="header-anchor" href="#补充-单向数据流" aria-hidden="true">#</a> 补充：单向数据流</h2>
<p>先介绍React中数据传递，即通信问题</p>
<ul>
<li>向子组件发消息</li>
<li>向父组件发消息</li>
<li>向其他组件发消息</li>
</ul>
<p>React 只提供了一种通信方式：传参。</p>
<p>即父传值给子，子不能修改父传的数据，props 具有不可修改性。子组件想把数据传给父组件怎么办？通过 props 中的事件来传值通知父组件</p>
<p>仓库地址：https://github.com/johanazhu/jo-redux</p>
</template>
