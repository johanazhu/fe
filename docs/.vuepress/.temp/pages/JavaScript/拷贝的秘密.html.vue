<template><h1 id="拷贝的秘密" tabindex="-1"><a class="header-anchor" href="#拷贝的秘密" aria-hidden="true">#</a> 拷贝的秘密</h1>
<h2 id="如何复制对象" tabindex="-1"><a class="header-anchor" href="#如何复制对象" aria-hidden="true">#</a> 如何复制对象</h2>
<p>上一节说了，基本类型的复制，只要赋值就能克隆到样本，但是引用对象不能，“=” 只是把对象的地址赋值给 另一个对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> obj1<span class="token punctuation">;</span> <span class="token comment">// 将obj1的引用地址赋值给obj2</span>
obj1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'johan'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { name: 'johan' }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// { name: 'joahn' }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1 <span class="token operator">===</span> obj2<span class="token punctuation">)</span> <span class="token comment">// true,指向的是同一个地址</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>那么怎么拷贝引用类型呢？这里就有两种分类，依据是是否完全拷贝。</p>
<ul>
<li>浅拷贝： 拷贝的是对象的指针，修改内容互相影响</li>
<li>深拷贝：整个对象拷贝到另一个内存中，修改内容互不影响</li>
</ul>
<p>首先我们要看看最简单的浅拷贝是怎么样，让我们对其有个初步的认识，然后在总结下对象中到底有多少种浅拷贝方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span>
obj1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'elaine'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span>  <span class="token comment">// { name: elaine }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>拷贝原对象的引用，就是最简单的浅拷贝</p>
<p>浅拷贝只能拷贝一层对象，如果有对象的嵌套，那么浅拷贝将无能为力</p>
<table>
<thead>
<tr>
<th></th>
<th>与原数组是否指向同一对象</th>
<th>原数组为基本类型</th>
<th>原数据包含子对象</th>
</tr>
</thead>
<tbody>
<tr>
<td>赋值</td>
<td>是</td>
<td>改变【会】使原数据一同改变</td>
<td>改变【会】使原数据一同改变</td>
</tr>
<tr>
<td>浅拷贝</td>
<td>否</td>
<td>改变【不会】使原数据一同改变</td>
<td>改变【会】使原数据一同改变</td>
</tr>
<tr>
<td>深拷贝</td>
<td>否</td>
<td>改变【不会】使原数据一同改变</td>
<td>改变【不会】使原数据一同改变</td>
</tr>
</tbody>
</table>
<p>那让我们来看看对象中到底有多少种浅拷贝，再来试着写一个</p>
<h2 id="浅拷贝" tabindex="-1"><a class="header-anchor" href="#浅拷贝" aria-hidden="true">#</a> 浅拷贝</h2>
<h3 id="object-assign-target-sources" tabindex="-1"><a class="header-anchor" href="#object-assign-target-sources" aria-hidden="true">#</a> Object.assign(target, ...sources)</h3>
<p>Object.assign()方法可以把任意多个原对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。</p>
<p>它拷贝的是对象的属性的引用，而不是对象本身。</p>
<p>是ES6中Object对象新增的方法</p>
<p>​	参数：</p>
<p>​		target：目标对象</p>
<p>​		sources: 任意多个原对象。</p>
<p>​		返回值：目标对象会被返回</p>
<p>案例一</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> c<span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> obj1<span class="token punctuation">)</span><span class="token punctuation">;</span>
obj2<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {a: 10, b: 20, c: 30}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {a: 10, b: 100, c: 30}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>案例二</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token string">"hello"</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token number">21</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> initialObj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

initialObj<span class="token punctuation">.</span>a<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">"changed"</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// "change"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>可以看出，Object只能拷贝第一层对象，如果再往深一层拷贝，就成引用了。</p>
<h3 id="展开运算符" tabindex="-1"><a class="header-anchor" href="#展开运算符" aria-hidden="true">#</a> 展开运算符（...）</h3>
<p>展开语法，可以在函数调用/数组构造时，将数组表达式或者 string 在语法层面展开；还可以在构造字面量对象时，将对象表达式按 key-value 的方式展开</p>
<p>城然，我们都知道展开运算符的作用并不是为了拷贝。但无可厚非，拷贝也是 展开运算符 的特点之一</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>arr<span class="token punctuation">]</span><span class="token punctuation">;</span>
arr2<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token comment">// [1, 2, 3];</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr2<span class="token punctuation">)</span> <span class="token comment">// [1, 2, 3, 4]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>可以看出展开运算符也是 浅拷贝</p>
<h3 id="array中的-slice" tabindex="-1"><a class="header-anchor" href="#array中的-slice" aria-hidden="true">#</a> Array中的 slice</h3>
<p><strong>slice()</strong> 方法返回一个新的数组对象，这一对象是一个由 <code>begin</code> 和 <code>end</code> 决定的原数组的浅拷贝（包括 <code>begin</code></p>
<p>，不包括 <code>end</code> ）。原始数组不会被改变</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> leiFamily <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'father'</span><span class="token punctuation">,</span> <span class="token string">'mother'</span><span class="token punctuation">,</span> <span class="token string">'brother'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'sister0'</span><span class="token punctuation">,</span> <span class="token string">'sister1'</span><span class="token punctuation">,</span> <span class="token string">'sister2'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> copyFamily <span class="token operator">=</span> leiFamily<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
copyFamily<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Deku'</span><span class="token punctuation">;</span>
copyFamily<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'brother1'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>leiFamily<span class="token punctuation">)</span> <span class="token comment">// ['father', 'mother', 'brother', ['sister0' , 'brother1', 'sister2']]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>copyFamily<span class="token punctuation">)</span> <span class="token comment">// ['Deku', 'mother', 'brother', ['sister0' , 'brother1', 'sister2']] </span>
<span class="token comment">// 复制一层，第二层开始引用</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="array中的-concat" tabindex="-1"><a class="header-anchor" href="#array中的-concat" aria-hidden="true">#</a> Array中的 concat</h3>
<p>concat() 方法用于合并两个或多个数组。此方法不会改变现有数组，而是返回一个新数组</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'c0'</span><span class="token punctuation">,</span> <span class="token string">'c1'</span><span class="token punctuation">,</span> <span class="token string">'c2'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> array2 <span class="token operator">=</span> array1<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
array2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'B'</span><span class="token punctuation">;</span>
array2<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'C1'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['a', 'b', ['c0', 'C1', 'c2']]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['a', 'B', ['c0', 'C1', 'c2']]</span>
<span class="token comment">// 复制一层，第二层开始引用</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>https://www.cnblogs.com/baiyangyuanzi/p/6518218.html</p>
<p>slice和concat这两个方法，仅适用于对不包含引用对象的一维数组的深拷贝</p>
<h2 id="自己实现一个浅复制" tabindex="-1"><a class="header-anchor" href="#自己实现一个浅复制" aria-hidden="true">#</a> 自己实现一个浅复制</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">shallowClone</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> target <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> target <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> target <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">isArry</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> prop <span class="token keyword">in</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> target   
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> source
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>ps: hasOwnProperty，它表示此对象上自己拥有的属性。想起会在后面讲属性时介绍。</p>
<p>简单来说，浅拷贝只复制一层对象的属性。</p>
<p>综上分析，JavaScript 的浅拷贝有 4种，其中三种是针对 数组的浅拷贝，只有Object.assign() 是针对对象</p>
<h2 id="深拷贝" tabindex="-1"><a class="header-anchor" href="#深拷贝" aria-hidden="true">#</a> 深拷贝</h2>
<p>我们已经知道了浅复制的概念和展示浅复制所有的方法。那么深拷贝是什么？有多少方式实现深拷贝呢？</p>
<p>简单来说，深拷贝就是递归复制了所有层级的对象的属性。</p>
<p>深拷贝JSON.pase(JSON.stringify()),浅拷贝+递归</p>
<p>一般用 JSON.parse(JSON.stringify()) 来解决，这个方法比较简单，大家有常用。但是这个方法也有几个坑</p>
<blockquote>
<ol>
<li>它无法实现对函数、RegExp 等特殊对象的克隆</li>
<li>它会抛弃对象的constructor，所有的构造函数会指向Object</li>
<li>对象有循环引用，会报错</li>
</ol>
</blockquote>
<p>我们来测试一下这几个坑，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 构造函数</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Elaine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'elaine'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 函数</span>
<span class="token keyword">function</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hi'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> oldObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> say<span class="token punctuation">,</span>
    b<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    c<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">'ab+c'</span><span class="token punctuation">,</span> <span class="token string">'i'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    d<span class="token operator">:</span> Elaine
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> newObj <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>oldObj<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// 无法复制函数</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>a<span class="token punctuation">,</span> oldObj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined [Function: say]</span>
<span class="token comment">// 稀疏数组复制错误</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>b<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> oldObj<span class="token punctuation">.</span>b<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null undefined</span>
<span class="token comment">// 无法复制正则对象</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>c<span class="token punctuation">,</span> oldObj<span class="token punctuation">.</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {} /ab+c/i</span>
<span class="token comment">// 构造函数指向错误</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>d<span class="token punctuation">.</span>constructor<span class="token punctuation">,</span> oldObj<span class="token punctuation">.</span>d<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [Function: Object] [Function: person]</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>我们可以看到在对函数、正则对象。稀疏数组等对象克隆时会发生意外，构造函数指向也会发生错误。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> oldObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
oldObj<span class="token punctuation">.</span>a <span class="token operator">=</span> oldObj<span class="token punctuation">;</span>

<span class="token keyword">const</span> newObj <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>oldObj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newObj<span class="token punctuation">.</span>a<span class="token punctuation">,</span> oldObj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token comment">// TypeError: Converting circular structure to JSON</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>对象的循环引用回抛出错误</p>
<h3 id="让我们手写一个" tabindex="-1"><a class="header-anchor" href="#让我们手写一个" aria-hidden="true">#</a> 让我们手写一个</h3>
<p>我们知道深拷贝就是递归+浅拷贝</p>
<p>所以我们自然而然的想到，如果是需拷贝对象中有对象，就对它进行再一次的拷贝，知道所有的对象中没有对象。很绕是吧，看代码能一目了然</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> prop <span class="token keyword">in</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> target
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果是 值类型 或 null，则直接return</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">'object'</span> <span class="token operator">||</span> obj <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> obj
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 定义结果对象</span>
    <span class="token keyword">let</span> copy <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token comment">// 如果对象是数组，则定义结果数组</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Array<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        copy <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 遍历对象的key</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果key是对象的自有属性</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 递归调用深拷贝方法</span>
            copy<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            copy<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">return</span> copy
<span class="token punctuation">}</span> 
<span class="token comment">// 修言版本</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>但这远远不够，我们做的工具需要适配大多数情况，有几种情况视为必须考虑范围，例如：</p>
<ul>
<li>
<p>没有对传参进行校验，传入 <code>null</code> 时应该返回 <code>null</code> 而不是 <code>{}</code></p>
</li>
<li>
<p>对于对象的判断逻辑不严谨，因为 <code>typeof null === 'object'</code></p>
</li>
<li>
<p>没有考虑数组，正则，Date的兼容</p>
</li>
</ul>
<p>就像之前谈到过的判断类型是个很重要的环节，我们要知道 null 对应的是null，object 对应的是object，string对应的是 string，数组对应是 array，函数 对应的是 funtion</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isObject</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Object]'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">isArray</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Array]'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">isFunction</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Function]'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">isDate</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Date]'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">isRegExp</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object RegExp]'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>具体查看细节  <a href="./JavaScript%E7%94%B1%E4%BB%80%E4%B9%88%E7%BB%84%E6%88%90">判断所有类型的工具isType</a></p>
<p>提示：注意 toString 方法在Date(),Array等多个构造函数上重置过，所以最靠谱的还是从Object上的toString做分析</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>source <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> source <span class="token operator">!==</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token keyword">return</span> source<span class="token punctuation">;</span> <span class="token comment">// 非对象返回自身</span>
    
    <span class="token comment">// var target = Array.isArray(source) ? [] : {};</span>
    <span class="token keyword">var</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'regexp'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 对正则进行深拷贝</span>
        target <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'date'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 对Date对象进行深拷贝</span>
        target <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isType</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'array'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理 Array 对象</span>
        target <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理 Object 对象</span>
        <span class="token comment">// target = new obj.constructor();</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> prop <span class="token keyword">in</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> target
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="hash-table-破解循环引用" tabindex="-1"><a class="header-anchor" href="#hash-table-破解循环引用" aria-hidden="true">#</a> hash table 破解循环引用</h3>
<p>我们需要有一个表来记录当前对象和拷贝对象的对应关系，当我们需要拷贝当前对象时，先去存储空间（表）中找，有没有拷贝过这个对象，如果有的话，直接返回，如果没有的话继续拷贝。</p>
<p>这个存储空间，需要可以存储 <code>key-value</code> 形式的数据，且 <code>key</code> 可以使一个引用类型，我们使用 <code>Map</code> 数据结构</p>
<ul>
<li>检查 <code>map</code> 中有无克隆过对象</li>
<li>有 - 直接返回</li>
<li>没有 - 将当前对象作为 <code>key</code>，克隆对象作为 <code>value</code> 进行存储</li>
<li>继续拷贝</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> source<span class="token punctuation">;</span> <span class="token comment">// 非对象返回自身</span>
    
    <span class="token keyword">var</span> target <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> target<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> prop <span class="token keyword">in</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> target
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>但递归浅拷贝也有一个缺点，它对庞大的数据来说性能不好，因为需要把整个对象都遍历一遍。</p>
<p>那么有没有一种方法，只有当属性修改以后才对这部分数据做深拷贝，又能解决JSON.parse(JSON.stringify(a))的局限，答案是 Proxy，具体细节请看这篇文章，本人暂时还么有能力打败这关</p>
<p>https://juejin.im/post/5df7175fe51d45582512962c</p>
<p>总结的话，深拷贝是前端面试中必考的一项，它问你怎么手写，你若是只写了JSON.parse(JSON.stringify(source))肯定是不合格的。有这个问题，就是因为它能考到很多知识，</p>
<p>比如说 数据类型的判断，for循环，原型链，递归以及hash表（key-value形式存储数据）等等</p>
<p>附上完整的 手写深拷贝的源码</p>
<p>http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html#%E6%9C%80%E5%90%8E</p>
<p>conardli的手写深拷贝</p>
<p>https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>peter 的深拷贝</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deepCopy</span><span class="token punctuation">(</span><span class="token parameter">origin</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> type <span class="token operator">=</span> <span class="token function">getType</span><span class="token punctuation">(</span>origin<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> copy<span class="token punctuation">;</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'array'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token function">copyArray</span><span class="token punctuation">(</span>origin<span class="token punctuation">,</span> type<span class="token punctuation">,</span> copy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">'object'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token function">copyObject</span><span class="token punctuation">(</span>origin<span class="token punctuation">,</span> type<span class="token punctuation">,</span> copy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">'function'</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token function">copyFunction</span><span class="token punctuation">(</span>origin<span class="token punctuation">,</span> type<span class="token punctuation">,</span> copy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> origin
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">copyArray</span><span class="token punctuation">(</span><span class="token parameter">origin<span class="token punctuation">,</span> type<span class="token punctuation">,</span> copy <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">[</span>index<span class="token punctuation">,</span> vale<span class="token punctuation">]</span> <span class="token keyword">of</span> origin<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        copy<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepCopy</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>  
    <span class="token keyword">return</span> copy<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">copyObject</span><span class="token punctuation">(</span><span class="token parameter">origin<span class="token punctuation">,</span> type<span class="token punctuation">,</span> copy <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">[</span>key<span class="token punctuation">,</span> value<span class="token punctuation">]</span> <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>origin<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        copy<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepCopy</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> copy<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">copyFunction</span><span class="token punctuation">(</span>origin<span class="token punctuation">,</span> type<span class="token punctuation">,</span> <span class="token function-variable function">copy</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> fun <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span>origin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fun<span class="token punctuation">.</span>prototype <span class="token operator">=</span> origin<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
    <span class="token keyword">return</span> fun<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>写源码其实很简单</p>
<p>知道最重要的点，然后对其他细节做补充</p>
<p>像在手写深拷贝过程中，最核心的代码是对数组和对象的深拷贝，但是它不能代表所有，比如基本类型，引用类型中其他的拷贝，以及循环引用，类型的判断，通用遍历，拷贝函数等等。</p>
<p>https://juejin.cn/post/6844903986479251464#heading-39</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
</template>
