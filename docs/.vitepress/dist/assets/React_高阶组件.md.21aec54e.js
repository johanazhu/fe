import{_ as s,c as n,o as a,d as l}from"./app.590c1fbf.js";const C=JSON.parse('{"title":"高阶组件（HOC）","description":"","frontmatter":{},"headers":[{"level":2,"title":"什么是高阶组件","slug":"什么是高阶组件","link":"#什么是高阶组件","children":[]}],"relativePath":"React/高阶组件.md"}'),p={name:"React/高阶组件.md"},e=l(`<h1 id="高阶组件-hoc" tabindex="-1">高阶组件（HOC） <a class="header-anchor" href="#高阶组件-hoc" aria-hidden="true">#</a></h1><h2 id="什么是高阶组件" tabindex="-1">什么是高阶组件 <a class="header-anchor" href="#什么是高阶组件" aria-hidden="true">#</a></h2><p>高阶组件就是一个函数，传给它一个组件，它返回一个新的组件</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> NewComponent </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">higherOrderComponent</span><span style="color:#A6ACCD;">(OldComponent)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>注意，高阶组件就是一个函数（而不是组件），它接受一个组件作为参数，返回一个新的组件。这个新的组件会使用你传给它的组件作为子组件，我们看看一个很简单的高阶组件：</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> React</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">WrappedComponent</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Wrap</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">WrappedComponent</span><span style="color:#89DDFF;"> /&gt;;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Wrap</span><span style="color:#89DDFF;"> /&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>高接组件的作用是为了组件之间重复代码的复用。组件可能存在某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件进行复用。新的组件和传入的组件通过 <code>props</code> 传递信息</p>`,7),o=[e];function t(r,c,i,y,F,D){return a(),n("div",null,o)}const A=s(p,[["render",t]]);export{C as __pageData,A as default};
