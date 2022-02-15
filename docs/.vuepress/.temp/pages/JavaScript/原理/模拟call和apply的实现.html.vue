<template><h1 id="模拟call和apply的实现" tabindex="-1"><a class="header-anchor" href="#模拟call和apply的实现" aria-hidden="true">#</a> 模拟call和apply的实现</h1>
<h2 id="call实现" tabindex="-1"><a class="header-anchor" href="#call实现" aria-hidden="true">#</a> Call实现</h2>
<p>我们在 apply、call、bind 中曾经介绍过这三个 api 的作用，硬核掰弯 this 指向。这一节我们模拟实现 apply 和 call ，下一节我们介绍模拟实现 bind</p>
<p>我们先看一个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>注意两点：</p>
<ol>
<li>call 改变了 this 的指向，指向到 foo</li>
<li>bar 函数执行了</li>
</ol>
<h3 id="模拟实现第一步" tabindex="-1"><a class="header-anchor" href="#模拟实现第一步" aria-hidden="true">#</a> 模拟实现第一步</h3>
<p>那么如何模拟这两个效果呢？</p>
<p>试想当调用 call 的时候，把 foo 对象改造成如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token function-variable function">bar</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

foo<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>这个时候 this 就指向了 foo，是不是很简单？</p>
<p>但这又给 foo 对象本身添加了一个属性，这可不行</p>
<p>不过也不用担心，我们用 delete 再删除它不就好了</p>
<p>模拟步骤如下：</p>
<ol>
<li>将函数设为对象的属性</li>
<li>执行该函数</li>
<li>删除该函数</li>
</ol>
<p>以上个例子为例，就是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第一步</span>
foo<span class="token punctuation">.</span>fn <span class="token operator">=</span> bar
<span class="token comment">// 第二步</span>
foo<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 第三步</span>
<span class="token keyword">delete</span> foo<span class="token punctuation">.</span>fn
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>fn 是对象的属性名，反正最后也要删除它，所以起成什么都无所谓</p>
<p>根据这个思路，我们尝试着写第一版的 mycall 函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mycall</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// 谁调用this，this指向谁</span>
    context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试一番</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

bar<span class="token punctuation">.</span><span class="token function">mycall</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>打印出 2，是不是很开心 (～￣▽￣)～</p>
<h3 id="模拟实现第二步" tabindex="-1"><a class="header-anchor" href="#模拟实现第二步" aria-hidden="true">#</a> 模拟实现第二步</h3>
<p>call 函数还能传参数执行函数。举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">'johan'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span> 
<span class="token comment">// johan</span>
<span class="token comment">// 22</span>
<span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>注意：传入的参数并不确定，这可咋办？</p>
<p>不急，我们可以从 arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组中</p>
<p>比如这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 以上个例子为例，此时的 arguments 为</span>
<span class="token comment">// arguments = {</span>
<span class="token comment">// 		0: foo,</span>
<span class="token comment">// 		1: 'johan',</span>
<span class="token comment">// 		2: 22,</span>
<span class="token comment">// 		length: 3</span>
<span class="token comment">// }</span>
<span class="token comment">// 因为 arguments 是类数组对象，所以可以用 for 循环</span>
<span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'arguments['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 执行后 args 为 ["arguments[1]", "arguments[2]", "arguments[3]"]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>不定长的参数问题解决了，我们接着要把这个参数数组放到要执行的函数的参数里面去</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 将数组里的元素作为多个参数放进函数的形参里</span>
context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 但这个方法肯定不行</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>也许有人想到用 ES6 的方法，不过 call 是 ES3 的方法，我们要为了模拟实现 ES3 的方法，要用到 ES6 的方法，好像......，可以是可以，但这次我们用 eval 方法拼成一个函数，类似于这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'context.fn('</span> <span class="token operator">+</span> args <span class="token operator">+</span> <span class="token string">')'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里的 args 会自动调用 Array.toString() 方法</p>
<p>所以我们的第二版克服了两大问题，代码如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mycall2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'arguments['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'context.fn('</span> <span class="token operator">+</span> args <span class="token operator">+</span> <span class="token string">')'</span><span class="token punctuation">)</span>
    <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试一番</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

bar<span class="token punctuation">.</span><span class="token function">mycall2</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">'elaine'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span>
<span class="token comment">// elaine</span>
<span class="token comment">// 22</span>
<span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>成功~~</p>
<h3 id="模拟实现第三步" tabindex="-1"><a class="header-anchor" href="#模拟实现第三步" aria-hidden="true">#</a> 模拟实现第三步</h3>
<p>模拟代码已经完成80%，还有两个小点要注意：</p>
<ol>
<li>this 参数可以传 null ， 当为 null 的时候，视为指向 window</li>
</ol>
<p>举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>虽然这个例子本身不适用 call， 结果依然一样</p>
<ol start="2">
<li>函数是可以有返回值的</li>
</ol>
<p>举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        value<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">,</span>
        name<span class="token operator">:</span> name<span class="token punctuation">,</span>
        age<span class="token operator">:</span> age
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">'johan'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// {</span>
<span class="token comment">//		value: 1,</span>
<span class="token comment">// 		name: 'johan',</span>
<span class="token comment">// 		age: 22</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>不过都很好解决，让我们直接看第三版也就是最后一版的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mycall3</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context <span class="token operator">=</span> context <span class="token operator">||</span> window<span class="token punctuation">;</span>
    context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'arguments['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'context.fn('</span> <span class="token operator">+</span> args <span class="token operator">+</span><span class="token string">')'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// eval 不能用双引号</span>
    
    <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn<span class="token punctuation">;</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
<span class="token comment">// 测试一番</span>
<span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        value<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">,</span>
        name<span class="token operator">:</span> name<span class="token punctuation">,</span>
        age<span class="token operator">:</span> age
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
bar<span class="token punctuation">.</span><span class="token function">mycall3</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> 
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span><span class="token function">mycall3</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">'johan'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// {</span>
<span class="token comment">//		value: 3,</span>
<span class="token comment">// 		name: 'johan',</span>
<span class="token comment">// 		age: 22</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="使用-es6-来实现-call" tabindex="-1"><a class="header-anchor" href="#使用-es6-来实现-call" aria-hidden="true">#</a> 使用 ES6 来实现 call</h3>
<p>道理如上所讲，这里只写代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mycall</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">undefined</span> <span class="token comment">// 防止 Function.prototype.mycall() 直接调用</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> context <span class="token operator">=</span> context <span class="token operator">||</span> window<span class="token punctuation">;</span>
    <span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">[</span>fn<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> context<span class="token punctuation">[</span>fn<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span>args<span class="token punctuation">)</span> <span class="token comment">// 调用除context外的arguments参数</span>
    <span class="token keyword">delete</span> context<span class="token punctuation">[</span>fn<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="apply实现" tabindex="-1"><a class="header-anchor" href="#apply实现" aria-hidden="true">#</a> apply实现</h2>
<p>apply 的实现跟 call 类似，这里直接给代码，代码来自于这知乎 郑航的实现：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myApply</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context <span class="token operator">=</span> context <span class="token operator">||</span> window<span class="token punctuation">;</span>
    context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    
    <span class="token keyword">var</span> result<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'arr['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        result <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'context.fn('</span> <span class="token operator">+</span> args <span class="token operator">+</span> <span class="token string">')'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn
    <span class="token keyword">return</span> result
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="es6-模拟实现-apply" tabindex="-1"><a class="header-anchor" href="#es6-模拟实现-apply" aria-hidden="true">#</a> ES6 模拟实现 apply</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myapply</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context <span class="token operator">=</span> window<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">undefined</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">[</span>fn<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> result<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> context<span class="token punctuation">[</span>fn<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> context<span class="token punctuation">[</span>fn<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
	
    <span class="token keyword">delete</span> context<span class="token punctuation">[</span>fn<span class="token punctuation">]</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>无论是call还是apply，难点是 context.fn = this</p>
</template>
