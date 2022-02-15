<template><h1 id="源码分析react-router源码" tabindex="-1"><a class="header-anchor" href="#源码分析react-router源码" aria-hidden="true">#</a> 源码分析React Router源码</h1>
<h2 id="前端路由前世今生" tabindex="-1"><a class="header-anchor" href="#前端路由前世今生" aria-hidden="true">#</a> 前端路由前世今生</h2>
<p>前端路由发展到今天，经历了后端路由、前后端路由过渡、前端路由的过程</p>
<h3 id="后端路由" tabindex="-1"><a class="header-anchor" href="#后端路由" aria-hidden="true">#</a> 后端路由</h3>
<p>这个时期，不管 Web 后端是什么语言的框架，都会有一个专门开辟出来的路由模块或者路由区域，用来匹配用户给出的 URL 地址，以及一些表单提交、页面请求地址。用户进行页面切换时，浏览器发送不同的 URL 请求，服务器接收到浏览器的请求时，通过解析不同的 URL 地址进行后端路由匹配，将模板拼接好后将之返回给前端完整的 HTML，浏览器拿到这个 HTML 文件后直接解析展示了，也就是所谓的服务端渲染</p>
<p><img src="https://i.loli.net/2021/06/16/Fit7zNHclqfOTKZ.png" alt="后端路由过程"></p>
<p>服务端渲染页面，后端有完整的 HTML 页面，爬虫更容易获取信息，有利于 SEO 优化。对于客户端的资源占用更少，尤其是移动端，可以更省流量</p>
<h3 id="过渡" tabindex="-1"><a class="header-anchor" href="#过渡" aria-hidden="true">#</a> 过渡</h3>
<p>Ajax 的基本概念（XMLHttpRequest 的前身）</p>
<p>单页应用不仅在页面交互是无刷新的，连页面跳转都是无刷新的，为了配合实现单页面应用跳转，前端路由孕育而生。</p>
<h3 id="前端路由" tabindex="-1"><a class="header-anchor" href="#前端路由" aria-hidden="true">#</a> 前端路由</h3>
<p>前端路由的兴起，使得页面渲染由服务器渲染变成了前端渲染。为什么这么说呢！请求一个 URL 地址时，服务器不需要拼接模板，只需返回一个 HTML 即可，一般浏览器拿到的 HTML 是这样的：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app.css<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>这里空荡荡的只有一个<code> &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</code>，以及一系列的 js 文件，所以说这个 HTML 是不完整的。我们看到的页面是通过这一系列的 js 渲染出来的，也就是前端渲染。前端渲染通过客户端的算力来解决页面的构建，很大程度上缓解了服务端的压力</p>
<p><img src="https://i.loli.net/2021/06/16/xw5eLQZEt2KCiyq.png" alt="前端路由过程"></p>
<p>单页面开发是趋势，但也不能避重就轻，忽略前端渲染的缺点。由于服务器没有保留完整的 HTML，通过 js 进行动态 DOM 拼接，需要耗费额外的时间，不如服务端渲染速度快，也不利于 SEO 优化。所以说，实际开发中，不能盲目选择渲染方式，一定要基于业务场景。对于没有复杂交互，SEO 要求严格的网站，服务器渲染也是正确的选择</p>
<h2 id="核心原理解析" tabindex="-1"><a class="header-anchor" href="#核心原理解析" aria-hidden="true">#</a> 核心原理解析</h2>
<h3 id="react-router-dom" tabindex="-1"><a class="header-anchor" href="#react-router-dom" aria-hidden="true">#</a> react-router-dom</h3>
<p>react-router 的注入方式是在组件树顶层放一个 Router 组件，然后在组件树种散落着很多 Route 组件，顶层的 Router 组件负责分析监听 URL 的变化，在其下面的 Route 组件渲染对应的组件</p>
<h3 id="react-router-用法回顾" tabindex="-1"><a class="header-anchor" href="#react-router-用法回顾" aria-hidden="true">#</a> React Router 用法回顾</h3>
<p><img src="https://i.loli.net/2021/06/16/HvP9UhJQyToRij8.png" alt="React-router组件"></p>
<ul>
<li><strong>路由器组件</strong>: <code>&lt;BrowserRouter&gt;</code> 和 <code>&lt;HashRouter&gt;</code>，路由器组件的作为根容器组件，<code>&lt;Route&gt;</code> 等路由组件必须被包裹在内才能够使用。</li>
<li><strong>路由匹配组件</strong>: <code>&lt;Route&gt;</code> 和 <code>&lt;Switch&gt;</code>，路由匹配组件通过匹配 path，渲染对应组件。</li>
<li><strong>导航组件</strong>: <code>&lt;Link&gt;</code> 和 <code>&lt;NavLink&gt;</code>，导航组件起到类似 <code>a</code> 标签跳转页面的作用。在后续对源码的讲解中，也将分别以这六个组件代码的解析为线索，来一窥 React Router 的整体实现。看回我们的代码，对于我们开头实现的原生路由，如果用 React Router 改写，应该是怎样的写法呢：</li>
</ul>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>import { BrowserRouter, Switch, Route, Link } from &quot;react-router-dom&quot;;
// HashRouter 和 BrowserRouter 二者的使用方法几乎没有差别，这里只演示其一

const App = () =&gt; {
  return (
    &lt;BrowserRouter&gt;
        &lt;Link to=&quot;/&quot;&gt;Home&lt;/Link&gt;
        &lt;Link to=&quot;/about&quot;&gt;About&lt;/Link&gt;
        &lt;Link to=&quot;/user&quot;&gt;User&lt;/Link&gt;

        &lt;Switch&gt;
            &lt;Route path=&quot;/about&quot;&gt;&lt;About /&gt;&lt;/Route&gt;
            &lt;Route path=&quot;/user&quot;&gt; &lt;User /&gt;&lt;/Route&gt;
            &lt;Route path=&quot;/&quot;&gt;&lt;Home /&gt;&lt;/Route&gt;
        &lt;/Switch&gt;
    &lt;/BrowserRouter&gt;
  );
}

const Home = () =&gt; (&lt;h2&gt;Home&lt;/h2&gt;);
const About = () =&gt; (&lt;h2&gt;About&lt;/h2&gt;);
const User = () =&gt; (&lt;h2&gt;User&lt;/h2&gt;);

export default App;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="react-router-源码实现" tabindex="-1"><a class="header-anchor" href="#react-router-源码实现" aria-hidden="true">#</a> React Router 源码实现</h2>
<p>先用最简单的话来概括一下 React Router 到底做了什么？</p>
<p><strong>本质上， React Router 就是在页面 URL 发生变化的时候，通过我们写的 path 去匹配，然后渲染对应的组件。</strong></p>
<p>那么，我们想一下如何分步骤实现：</p>
<ol>
<li>如何监听 url 的变化 ？</li>
<li>如何匹配 path ？</li>
<li>渲染对应的组件</li>
</ol>
<p>换句话说，也是一个组件，通过渲染不同的组件来控制路由切换</p>
<h3 id="整体设计" tabindex="-1"><a class="header-anchor" href="#整体设计" aria-hidden="true">#</a> 整体设计</h3>
<p>我们用一张图来理解一下整个 react-router 是怎么实现的：</p>
<p>接下来我们看看每一个步骤是怎么实现的。</p>
<p><img src="https://i.loli.net/2021/06/16/LdX43GNEtSCMjI2.png" alt="640"></p>
<h3 id="如何监听-url-的变化" tabindex="-1"><a class="header-anchor" href="#如何监听-url-的变化" aria-hidden="true">#</a> 如何监听 url 的变化 ？</h3>
<p>正常情况下，当 URL 发生变化时，浏览器会像服务端发送请求，但使用以下2种办法不会向服务端发送请求：</p>
<ul>
<li>基于 hash</li>
<li>基于 history</li>
</ul>
<p>react-router 使用了 history 这个核心库。</p>
<p>而 history 库的本质是通过前文所说的</p>
<p>要想了解 React-Router 的本质，就要依次解决这三个问题</p>
<ol>
<li>单页面应用路由的实现原理是什么？</li>
<li>React-router 是如何跟 React 结合起来的？</li>
</ol>
<p>而后我们可以实现一个简单的 React-router</p>
<p>React-Router 借用了 history 解决了第一个问题</p>
<p>用 React.createContext 解决了第二个问题</p>
<p><code>&lt;Router&gt;</code> 只做了两件事，一是给子组件包了一层 <code>context</code>，让路由信息（ history 和 location 对象）能传递给其下所有子孙组件；二是绑定了路由监听事件，使每次路由的改变都触发<code>setState</code></p>
<p>实现 ReactRouter 前，先去看一下 ReactRouter 的写法</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>&lt;Switch&gt;
      &lt;Route exact path=&quot;/&quot; component={Home}/&gt;
      &lt;Route path=&quot;/about&quot; component={About}/&gt;
      &lt;Route path=&quot;/topics&quot; component={Topics} /&gt;
      &lt;Route render={(props) =&gt; {
        return &lt;pre&gt;URL: {JSON.stringify(props.match.url)}&lt;/pre&gt;
      }} /&gt;
&lt;/Switch&gt;	
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote>
<p>BrowseHistory 必须依赖服务器让 url 都映射到 index.html ，否则会 404 。</p>
</blockquote>
<p>注意到了没，Switch 是一个组件，Route 也是一个组件</p>
<p>这就好比</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class Route extends React.Component {
   render() {
       const { exact, path, component, children,render } = this.props;
       
       const match = matchPath(location.pathname, {
           path,
           exact
       })
       
       if (!match) {
           return null
       }
       
       if (component) {
           return React.createElement(component, { match })
       }
       
       if (render) {
           return (
               render({ match })
           )
       }
       return (
         null	
       )
   }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>主要是</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>&lt;RouterContext.Provider
    value={{
        history: this.props.history,
            location: this.state.location,
                match: Router.computeRootMatch(this.state.location.pathname),
                    staticContext: this.props.staticContext
    }}
    &gt;
    &lt;HistoryContext.Provider
        children={this.props.children || null}
        value={this.props.history}
    /&gt;
&lt;/RouterContext.Provider&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="route-的实现" tabindex="-1"><a class="header-anchor" href="#route-的实现" aria-hidden="true">#</a> Route 的实现</h3>
<p>我们前面提到，前端路由的核心在于监听和匹配，上面我们使用 <code>&lt;Router&gt;</code> 实现了监听，那么本小节就来分析 <code>&lt;Route&gt;</code> 是如何做匹配的，同样地我们先回顾 <code>&lt;Route&gt;</code> 的用法：</p>
<p>匹配模式：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>// 精确匹配
// 严格匹配
// 大小写敏感
&lt;Route path=&quot;/user&quot; exact component={User} /&gt;
&lt;Route path=&quot;/user&quot; strict component={User} /&gt;
&lt;Route path=&quot;/user&quot; sensitive component={User} /&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>路径 path 写法：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>// 字符串形式
// 命名参数
// 数组形式
&lt;Route path=&quot;/user&quot; component={User} /&gt;
&lt;Route path=&quot;/user/:userId&quot; component={User} /&gt;
&lt;Route path={[&quot;/users&quot;, &quot;/profile&quot;]} component={User} /&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>渲染方式：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>// 通过子组件渲染
// 通过 props.component 渲染
// 通过 props.render 渲染
&lt;Route path='/home'&gt;&lt;Home /&gt;&lt;/Route&gt;
&lt;Route path='/home' component={Home}&gt;&lt;/Route&gt;
&lt;Route path='/home' render={() =&gt; &lt;p&gt;home&lt;/p&gt;}&gt;&lt;/Route&gt;

// 例子: 这里最终的渲染结果是User, 优先级是子组件 &gt; component &gt; render
&lt;Route path='/home' component={Home} render={() =&gt; &lt;p&gt;About&lt;/p&gt;}&gt;
  &lt;User /&gt;
&lt;/Route&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><code>&lt;Route&gt;</code> 所做的事情也很简单，匹配到传入的 path，渲染对应的组件。此外 <code>&lt;Route&gt;</code> 还提供了几种不同的匹配模式、path写法以及渲染方式</p>
<p>Route 提供了三种渲染方式：子组件、<code>props.component</code>、<code>props.render</code>，三者之间又存在优先级，因此就形成了我们看到了多层三元表达式渲染的结构。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>从后端路由到前端路由，最大的改变是体验，体验更良好了</p>
<p>前端路由模式有两种：hash 模式 和 history 模式，两者分别利用浏览器自由特性实现单页面导航</p>
<ul>
<li>hash 模式：window.location 或 a 标签改变锚点值，window.hashchange() 监听锚点变化</li>
<li>history 模式：history.pushState()、history.replaceState() 定义目标路由，window.onpopstate() 监听浏览器操作导致的 URL 变化</li>
</ul>
<p>React Router 匹配路由由 <code>mathPath</code>  通过 <code>path-to-regexp</code> 进行，<code>&lt;Route&gt;</code> 相当于一个高阶组件，以不同的优先级和匹配模式渲染匹配到的子组件</p>
<p>React Router 的主要组件源码，整体的实现：</p>
<ul>
<li>对于<strong>监听</strong>功能的实现，React Router 引入了 <code>history</code> 库，以屏蔽了不同模式路由在监听实现上的差异, 并将路由信息以 <code>context</code> 的形式，传递给被 <code>&lt;Router&gt; </code> 包裹的组件, 使所有被包裹在其中的路由组件都能<strong>感知到路由的变化, 并接收到路由信息</strong></li>
<li>在<strong>匹配</strong>的部分， React Router 引入了 <code>path-to-regexp</code> 来拼接路径正则以实现不同模式的匹配，路由组件·<code>&lt;Route&gt;</code>作为一个高阶组件包裹业务组件, 通过比较当前路由信息和传入的 path，以不同的优先级来渲染对应组件</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://mp.weixin.qq.com/s/hcAMubPlse4cK9y_-mS5yQ" target="_blank" rel="noopener noreferrer">深入浅出解析React Router源码<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/youngwind/blog/issues/109" target="_blank" rel="noopener noreferrer">单页面应用路由实现原理：以 React-Router 为例<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/happylindz/blog/issues/4" target="_blank" rel="noopener noreferrer">剖析单页面应用路由实现原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6895882310458343431" target="_blank" rel="noopener noreferrer">SPA 路由三部曲之核心原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/SJXwhTo4j6I3WMmQuOOs7A" target="_blank" rel="noopener noreferrer">SPA 路由三部曲之实战演练<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/xyk9Qla6p2lDsRoqrvasTA" target="_blank" rel="noopener noreferrer">图解 React-router 带你深入理解路由本质<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
