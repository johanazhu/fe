<template><h1 id="高阶组件-hoc" tabindex="-1"><a class="header-anchor" href="#高阶组件-hoc" aria-hidden="true">#</a> 高阶组件（HOC）</h1>
<h2 id="什么是高阶组件" tabindex="-1"><a class="header-anchor" href="#什么是高阶组件" aria-hidden="true">#</a> 什么是高阶组件</h2>
<p>高阶组件就是一个函数，传给它一个组件，它返回一个新的组件</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token keyword">const</span> NewComponent <span class="token operator">=</span> <span class="token function">higherOrderComponent</span><span class="token punctuation">(</span>OldComponent<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>注意，高阶组件就是一个函数（而不是组件），它接受一个组件作为参数，返回一个新的组件。这个新的组件会使用你传给它的组件作为子组件，我们看看一个很简单的高阶组件：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter">WrappedComponent</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">Wrap</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">WrappedComponent</span></span> <span class="token punctuation">/></span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Wrap</span></span> <span class="token punctuation">/></span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>高接组件的作用是为了组件之间重复代码的复用。组件可能存在某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件进行复用。新的组件和传入的组件通过 <code>props</code> 传递信息</p>
</template>
