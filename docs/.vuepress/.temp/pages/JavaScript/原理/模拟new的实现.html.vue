<template><h1 id="模拟new的实现" tabindex="-1"><a class="header-anchor" href="#模拟new的实现" aria-hidden="true">#</a> 模拟new的实现</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>new 的本质是让你少些几行代码</p>
<h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2>
<p>之前在介绍 <RouterLink to="/JavaScript/%E5%8E%9F%E5%9E%8B.html">原型篇</RouterLink> 时，在介绍隐式原型继承时，说想要得到一个包含数据、方法以及关联原型三个组成部分的丰满对象，包含了三个步骤：</p>
<p>1）创建空对象</p>
<p>2）设置该对象的原型为另一个对象或者 null</p>
<p>3）填充该对象，增加属性或者方法</p>
<p>这些过程即 完成创建对象、原型继承和属性初始化。</p>
<p>隐式继承过程中，JS 帮我们做了创建对象和原型继承。</p>
<p>隐式继承包括两种，一对象（数组）字面量；而 new 继承</p>
<p>按照隐式继承的两层隐式行为来看</p>
<p>1）隐式的通过 new Object() 去创建对象</p>
<p>2）隐式的进行原型继承</p>
<h2 id="new是什么" tabindex="-1"><a class="header-anchor" href="#new是什么" aria-hidden="true">#</a> new是什么？</h2>
<p><strong>它是 JavaScript 为了让开发者开发起来方便而实现的关键字</strong></p>
<p>在 JavaScript 高级程序设计第四版对new调用构造函数会执行的操作描述：</p>
<blockquote>
<p>（1）在内存中创建一个新对象</p>
<p>（2）<strong>这个新对象内部的[[prototype]]特性被赋值为构造函数的 prototype 属性</strong></p>
<p>（3）构造函数内部的 this 被赋值为这个新对象（即this指向新对象）</p>
<p>（4）执行构造函数内部的代码（给新对象添加属性）</p>
<p>（5）如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象</p>
</blockquote>
<p>我们可以按照以上描述来写一个new。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">new2</span><span class="token punctuation">(</span><span class="token parameter">Constructor<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// (1)、创建一个新对象</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// (2)、新对象的[[prototype]]特性被赋值为 构造函数的 prototype 属性</span>
    obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">Constructor</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
    <span class="token comment">// (3)、构造函数内部的 this 被赋值为这个新对象</span>
    <span class="token comment">// (4)、执行构造函数内部的代码</span>
	<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">Constructor</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// (5)、如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象</span>
    <span class="token keyword">return</span> <span class="token keyword">typeof</span> result <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">?</span> result <span class="token operator">:</span> obj
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="别人的new写法" tabindex="-1"><a class="header-anchor" href="#别人的new写法" aria-hidden="true">#</a> 别人的new写法</h2>
<p>THE LAST TIME</p>
<p>ES3写法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">objectFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 从 Object.prototype 上克隆一个对象</span>
    Constructor <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 取得外部传入的构造器，取第一个参数</span>
    <span class="token comment">// 以下是 Object.create() 的核心</span>
    <span class="token keyword">var</span> <span class="token function-variable function">F</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">F</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token class-name">Constructor</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
    obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 指向正确的原型</span>
    
    <span class="token keyword">var</span> ret <span class="token operator">=</span> <span class="token function">Constructor</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 借用外部传入的构造器给obj设置属性</span>
    <span class="token keyword">return</span> <span class="token keyword">typeof</span> ret <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">?</span> ret <span class="token operator">:</span> obj<span class="token punctuation">;</span> <span class="token comment">// 确保构造器总是返回一个对象</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>测试一波</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">firstname<span class="token punctuation">,</span> lastname</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>firstname <span class="token operator">=</span> firstname<span class="token punctuation">;</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>lastname <span class="token operator">=</span> lastname<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">'johnny'</span><span class="token punctuation">,</span> <span class="token string">'joestar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">new2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">Constructor<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> instance <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Constructor</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Constructor</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">firstname<span class="token punctuation">,</span> lastname</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>firstname <span class="token operator">=</span> firstname<span class="token punctuation">;</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>lastname <span class="token operator">=</span> lastname<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token function">new2</span><span class="token punctuation">(</span>User<span class="token punctuation">,</span> <span class="token string">'johnny'</span><span class="token punctuation">,</span> <span class="token string">'joestar'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/23987456?utm_medium=social&amp;utm_source=wechat_session" target="_blank" rel="noopener noreferrer">JS 的 new 到底是干什么的？<ExternalLinkIcon/></a></li>
</ul>
</template>
