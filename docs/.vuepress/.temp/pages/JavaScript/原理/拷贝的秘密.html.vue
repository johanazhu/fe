<template><h1 id="拷贝的秘密" tabindex="-1"><a class="header-anchor" href="#拷贝的秘密" aria-hidden="true">#</a> 拷贝的秘密</h1>
<p><strong>基本类型</strong>：String、Number、Boolean、Null、Undefined、Symbol</p>
<p><strong>引用类型</strong>：Object</p>
<p>javascript的内存管理有两种，堆和栈</p>
<p>基本类型放在堆中，</p>
<p>引用类型放在栈中，</p>
<p>基本类型的复制是文件的复制</p>
<p>引用类型的复制是地址的引用</p>
<p>而我们说的深拷贝、浅拷贝是堆js 引用类型的拷贝</p>
<h2 id="如何实现深浅拷贝" tabindex="-1"><a class="header-anchor" href="#如何实现深浅拷贝" aria-hidden="true">#</a> 如何实现深浅拷贝</h2>
<p>Q：什么时候用到深浅拷贝？</p>
<p>A：当数据类型威引用类型，需要在不应用源数据时堆数据的操作</p>
<p><strong>浅拷贝：适用于引用类型内值为基本类型</strong></p>
<p><strong>深拷贝：适用于引用类型内值包含引用类型</strong></p>
<p>来观察下面一个场景</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'johan'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">22</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'2'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>

<span class="token keyword">var</span> fooCopy <span class="token operator">=</span> foo<span class="token punctuation">;</span>
fooCopy<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'elaine'</span><span class="token punctuation">;</span>
fooCopy<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">33</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token comment">// {name: 'elaine', age: 33}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fooCopy<span class="token punctuation">)</span> <span class="token comment">// {name: 'elaine', age: 33}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="浅拷贝" tabindex="-1"><a class="header-anchor" href="#浅拷贝" aria-hidden="true">#</a> 浅拷贝</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1.数组拷贝 slice</span>
<span class="token keyword">var</span> barSliceCopy <span class="token operator">=</span> bar<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 2.数组拷贝 concat</span>
<span class="token keyword">var</span> barConcatCopy <span class="token operator">=</span> bar<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 3.对象拷贝 {...}</span>
<span class="token keyword">var</span> fooEs6Copy <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>foo<span class="token punctuation">}</span>
<span class="token comment">// 4.对象拷贝 Object.assign()</span>
<span class="token keyword">var</span> fooAssignCopy <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> foo<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="术语解释" tabindex="-1"><a class="header-anchor" href="#术语解释" aria-hidden="true">#</a> 术语解释</h2>
<p>浅拷贝：只复制一层</p>
<p>深拷贝：无论多少层都能复制</p>
<h2 id="浅拷贝-只考虑对象类型" tabindex="-1"><a class="header-anchor" href="#浅拷贝-只考虑对象类型" aria-hidden="true">#</a> 浅拷贝：只考虑对象类型</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">shallowCopy</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> newObj <span class="token operator">=</span> obj <span class="token keyword">instanceof</span> <span class="token class-name">Array</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            newObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> newObj
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>简单版深拷贝：只考虑普通对象，不考虑内置对象和函数</p>
<p>就第一版+递归</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> newObj <span class="token operator">=</span> obj <span class="token keyword">instanceof</span> <span class="token class-name">Array</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            newObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">?</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">:</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> newObj
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>JSON.parse(JSON.stringify(foo)) 的缺点：</p>
<ul>
<li><code>undefined</code> 、任意的函数以及 <code>symbol</code> 值，在序列化过程中会被忽略（出现在非数组对象的-属性值中时）或者被转移成<code>null</code>（出现在数组中时）。函数、<code>undefined</code> 被单独转换时，会返回<code>undefined</code>，如<code>JSON.stringify(function(){})</code> or <code>JSON.stringify(undefined)</code></li>
<li>对包含循环引用的对象（对象之间互相引用，形成无限循环）执行此方法，会抛出错误</li>
<li>所有以<code>symbol</code> 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们</li>
</ul>
<p>第二版：针对 Symbol 和 循环应用做处理</p>
<ul>
<li>Symbol：每个从 <code>Symbol()</code> 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数组类型建有的目的</li>
<li>WeakMap：<code>WeakMap</code> 对象时一组键/值对的集合，其中的键时弱引用。其键必须时对象，而值可以是任何值</li>
</ul>
<p>PS：map和 WeakMap的区别在于用 map 声明的对象之间存在强引用关系。即使我们将值进行释放，但是因为存在强应用关系，这部分内存依然无法被释放，而使用 WeakMap 的话，因为键和值是弱引用关系，当下一次垃圾回收机制执行时，这块内存会被释放掉</p>
<p>选择使用 WeakMap 而不是 Map 是由于 WeakMap 持有的是每个键对象的”弱引用“，这意味着在没有其他引用存在时垃圾回收能正常进行</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> deepClone <span class="token operator">=</span> <span class="token punctuation">(</span>source<span class="token punctuation">,</span> storage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 普通类型直接返回</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">!==</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token keyword">return</span> source<span class="token punctuation">;</span> 
    <span class="token comment">// 是否是数组</span>
    <span class="token keyword">let</span> newObj <span class="token operator">=</span>  source <span class="token keyword">instanceof</span> <span class="token class-name">Array</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 循环引用 - 返回存储的引用数据</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>storage<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> storage<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
    <span class="token comment">// 循环应用 - 设置临时存储值</span>
    storage<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> newObj<span class="token punctuation">)</span>
    <span class="token comment">// 是否包含 Symbol 类型</span>
    <span class="token keyword">let</span> isSymbol <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertySymbols</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 若包含 Symbol 类型</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isSymbol<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        isSymbol<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> source<span class="token punctuation">[</span>item<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                newObj<span class="token punctuation">[</span>item<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>source<span class="token punctuation">[</span>item<span class="token punctuation">]</span><span class="token punctuation">,</span> storage<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
            newObj<span class="token punctuation">[</span>item<span class="token punctuation">]</span> <span class="token operator">=</span> source<span class="token punctuation">[</span>item<span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 不包含 Symbol </span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            newObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> source<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">?</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>source<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> storage<span class="token punctuation">)</span> <span class="token operator">:</span> source<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> newObj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/338443023?utm_source=wechat_session&amp;utm_medium=social&amp;utm_oi=56197411504128" target="_blank" rel="noopener noreferrer">闲庭信步聊前端 - 一文摸清ES拷贝的深浅<ExternalLinkIcon/></a></li>
</ul>
</template>
