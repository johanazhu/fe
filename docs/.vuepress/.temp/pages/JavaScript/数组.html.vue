<template><h1 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h1>
<h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2>
<p>数组是一组按序排列的值，创建数组的目的通常是遍历数字索引值，以零索引开始。</p>
<p>我们需要了解的是，数组是按照数字顺序排列的集合，相对地，对象的属性名称是无序的。</p>
<p>从本质上讲，数组使用数字作为查找建，而对象拥有用户自定义的属性名。</p>
<p>JavaScript 没有真正的关联数组，对象可用于实现关联数组的功能</p>
<p>如果我们想了解数组中有什么方法和属性，有个很简单的方法——通过浏览器打印 Array</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>Array<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/JavaScript/Array/查看Array数据结构.png" alt="查看Array数据结构"></p>
<p>除去 arguments、caller、Symbol、get Symbol 以及 [[Scopes]] （这些是什么？具体我还没搞明白，不过本文重点在于分析Array的构造函数的属性和方法以及它原型上的属性和方法）</p>
<p>我们可以得出，Array 的属性有 length，name，prototype（所有的函数创建时，都会默认给该函数添加 <code>prototype</code> 属性[见原型篇章]）</p>
<p>方法有：from()、isArray()、of()</p>
<p>写个Class模拟Array就是：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyArray</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token comment">// arguments 指参数中的类数组对象</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> prototype<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
MyArray<span class="token punctuation">.</span><span class="token function-variable function">from</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
MyArray<span class="token punctuation">.</span><span class="token function-variable function">isArray</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
MyArray<span class="token punctuation">.</span><span class="token function-variable function">of</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="@source/.vuepress/public/images/JavaScript/Array/自己写的Array.png" alt="查看Array数据结构"></p>
<p>ps： 这里提一句，用class模拟类(继承)，它的constructor函数 其实也很好记，它就是用来做属性初始化的，它很特殊，写在class中，但不在prototype里</p>
<h2 id="原型上的属性和方法" tabindex="-1"><a class="header-anchor" href="#原型上的属性和方法" aria-hidden="true">#</a> 原型上的属性和方法</h2>
<h2 id="属性和方法" tabindex="-1"><a class="header-anchor" href="#属性和方法" aria-hidden="true">#</a> 属性和方法</h2>
<p>Array() 对象具有以下属性（不包括继承的属性和方法）</p>
<p><strong>属性</strong></p>
<ul>
<li>prototype</li>
</ul>
<h2 id="数组对象实例属性和方法" tabindex="-1"><a class="header-anchor" href="#数组对象实例属性和方法" aria-hidden="true">#</a> 数组对象实例属性和方法</h2>
<p><strong>实例属性</strong></p>
<ul>
<li>
<p>constructor</p>
</li>
<li>
<p>index</p>
</li>
<li>
<p>length</p>
<ul>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
myArray<span class="token punctuation">.</span>length
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ul>
</li>
</ul>
<p><strong>实例方法</strong></p>
<ul>
<li>
<p>pop()</p>
<ul>
<li>
<p><code>pop()</code> 方法从数组中删除最后一个元素，并返回该原生的值。该方法更改数组的长度</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> plants <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'broccoli'</span><span class="token punctuation">,</span> <span class="token string">'cauliflower'</span><span class="token punctuation">,</span> <span class="token string">'cabbage'</span><span class="token punctuation">,</span> <span class="token string">'kale'</span><span class="token punctuation">,</span> <span class="token string">'tomato'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>plants<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 移出 tomato</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>plants<span class="token punctuation">)</span> <span class="token comment">// ['broccoli', 'cauliflower', 'cabbage', 'kale']</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
</li>
<li>
<p>push()</p>
<ul>
<li>
<p><code>push()</code> 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> animals <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'pigs'</span><span class="token punctuation">,</span> <span class="token string">'goats'</span><span class="token punctuation">,</span> <span class="token string">'sheep'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> count <span class="token operator">=</span> animals<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'cows'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span> <span class="token comment">// 4</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>animals<span class="token punctuation">)</span> <span class="token comment">// ["pigs", "goats", "sheep", "cows"]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
</ul>
</li>
<li>
<p>reverse()</p>
<ul>
<li>
<p><code>reverse()</code> 方法将数组中原生的位置颠倒，并返回该数组。数组的第一个元素变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'one'</span><span class="token punctuation">,</span> <span class="token string">'two'</span><span class="token punctuation">,</span> <span class="token string">'three'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'array1'</span><span class="token punctuation">,</span> array1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ["one", "two", "three"]</span>
<span class="token keyword">const</span> reversed <span class="token operator">=</span> array1<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'reversed'</span><span class="token punctuation">,</span> reversed<span class="token punctuation">)</span> <span class="token comment">// ['three', 'two', 'one']</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'array1'</span><span class="token operator">:</span> array1<span class="token punctuation">)</span> <span class="token comment">// ['three', 'two', 'one'] 改变原数组</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>所以一般如果你要颠倒一个数组时，先深拷贝先</p>
</li>
</ul>
</li>
<li>
<p>shift()</p>
<ul>
<li>
<p><code>shift()</code> 方法从数组中删除<strong>第一个</strong>元素，并返回该元素的值。此方法更改数组的长度</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> firstElement <span class="token operator">=</span> array1<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [2, 3]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>firstElement<span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
</ul>
</li>
<li>
<p>sort()</p>
<ul>
<li>
<p><code>sort()</code> 方法用原地算法对数组的元素进行排序，并返回数组。默认排序是在将元素转换为字符串，然后比较他们的UTF-16代码单元制序列时构建</p>
</li>
<li>
<p>由于它取决于具体实现，因此无法保证排序的时间和空间复杂性</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> months <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'March'</span><span class="token punctuation">,</span> <span class="token string">'Jan'</span><span class="token punctuation">,</span> <span class="token string">'Feb'</span><span class="token punctuation">,</span> <span class="token string">'Dec'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
months<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>months<span class="token punctuation">)</span> <span class="token comment">// ["Dec", "Feb", "Jan", "March"]</span>
<span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
array1<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">)</span> <span class="token comment">// [1, 100000, 21, 30, 4]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
</ul>
</li>
<li>
<p>splice()</p>
<ul>
<li>
<p><code>splice()</code> 方法通过删除或代替现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> months <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'Jan'</span><span class="token punctuation">,</span> <span class="token string">'March'</span><span class="token punctuation">,</span> <span class="token string">'April'</span><span class="token punctuation">,</span> <span class="token string">'June'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
months<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">'Feb'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 从第 1 位开始删除0个元素，插入'Feb’</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>months<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['Jan', 'Feb', 'March', 'April', 'June']</span>
months<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'May'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 从第 4 位开始删除1个元素，并插入'May'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>months<span class="token punctuation">)</span> <span class="token comment">// ["Jan", "Feb", "March", "April", "May"]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
<li>
<p>第一个参数，指定修改的开始位置（从0计数）</p>
</li>
</ul>
</li>
<li>
<p>unshift()</p>
<ul>
<li>
<p><code>unshift()</code> 方法将一个或多个元素添加到数组的<strong>开头</strong>，并返回该数组的<strong>新长度</strong>（该方法修改原数组）</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">)</span> <span class="token comment">// [4, 5, 1, 2, 3]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
</li>
<li>
<p>concat()</p>
<ul>
<li>
<p><code>concat()</code> 方法用于合并或多个数组。此方法不会更改现有数组，<strong>而是返回一个新数组</strong></p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> array1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> array2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'d'</span><span class="token punctuation">,</span> <span class="token string">'e'</span><span class="token punctuation">,</span> <span class="token string">'f'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> array3 <span class="token operator">=</span> array1<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>array2<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array3<span class="token punctuation">)</span> <span class="token comment">// ["a", "b", "c", "d", "e", "f"]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array1<span class="token punctuation">)</span> <span class="token comment">// ['a', 'b', 'c'];</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
</ul>
</li>
<li>
<p>join()</p>
<ul>
<li>
<p><code>join()</code> 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不适用分隔符</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> elements <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'Fire'</span><span class="token punctuation">,</span> <span class="token string">'Air'</span><span class="token punctuation">,</span> <span class="token string">'Water'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elements<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "Fire,Air,Water"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elements<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "FireAirWater"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elements<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'-'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// "Fire-Air-Water"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
</ul>
</li>
<li>
<p>slice()</p>
<ul>
<li>
<p><code>slice()</code> 方法返回一个新的数组对象，这一对象是一个由 <code>begin</code> 和 <code>end</code> 决定的原数组的<strong>浅拷贝</strong>（包括<code>begin</code>，不包括<code>end</code>）。原始数组不会被改变</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> animals <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'ant'</span><span class="token punctuation">,</span> <span class="token string">'bison'</span><span class="token punctuation">,</span> <span class="token string">'camel'</span><span class="token punctuation">,</span> <span class="token string">'duck'</span><span class="token punctuation">,</span> <span class="token string">'elephant'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>animals<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// ["camel", "duck", "elephant"]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>animals<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// ["camel", "duck"]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>animals<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// ["bison", "camel", "duck", "elephant"]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
</ul>
</li>
<li>
<p>of()</p>
</li>
<li>
<p>isArray()</p>
</li>
<li>
<p>from()</p>
</li>
<li>
<p>forEach()</p>
</li>
<li>
<p>filter()</p>
</li>
<li>
<p>find()</p>
</li>
<li>
<p>reduce()</p>
</li>
<li>
<p>some()</p>
</li>
</ul>
<h2 id="数组方法备忘录" tabindex="-1"><a class="header-anchor" href="#数组方法备忘录" aria-hidden="true">#</a> 数组方法备忘录</h2>
<ul>
<li>
<h3 id="添加-删除元素" tabindex="-1"><a class="header-anchor" href="#添加-删除元素" aria-hidden="true">#</a> 添加/删除元素</h3>
<ul>
<li>
<p>push(...items) —— 从结尾添加元素</p>
</li>
<li>
<p>pop() —— 从截取提取元素</p>
</li>
<li>
<p>shift() —— 从开头提取元素</p>
</li>
<li>
<p>unshift(...items) —— 从开头添加元素</p>
</li>
<li>
<p>splice(index, deleteCount, ...items) —— 从 <code>index</code> 开始： 删除 <code>deleteCount</code> 元素并在当前位置插入元素</p>
</li>
<li>
<p>slice(start, end) —— 它从所有元素的开始索引<code>“start”</code> 复制到 <code>end</code> （不包括（<code>end</code>））返回一个新的数组</p>
</li>
<li>
<p>concat(...items) —— 返回一个新数组：复制当前数组的所有成员并向其中添加 <code>items</code>。如果有任何<code>items</code> 是个数组，那么就取其元素</p>
</li>
</ul>
</li>
</ul>
<h3 id="数组的哪些-api-会改变原数组" tabindex="-1"><a class="header-anchor" href="#数组的哪些-api-会改变原数组" aria-hidden="true">#</a> 数组的哪些 API 会改变原数组</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="数组的哪些-api-不会改变原数组" tabindex="-1"><a class="header-anchor" href="#数组的哪些-api-不会改变原数组" aria-hidden="true">#</a> 数组的哪些 API 不会改变原数组</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">fliter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://juejin.cn/post/6907109642917117965" target="_blank" rel="noopener noreferrer">超级详细的 js数组方法详解<ExternalLinkIcon/></a></li>
</ul>
</template>
