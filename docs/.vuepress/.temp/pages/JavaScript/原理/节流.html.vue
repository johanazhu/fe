<template><h1 id="节流" tabindex="-1"><a class="header-anchor" href="#节流" aria-hidden="true">#</a> 节流</h1>
<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<p><strong>如果你持续触发事件，每隔一段时间，只执行一次事件</strong></p>
<p>关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器</p>
<h2 id="使用时间戳" tabindex="-1"><a class="header-anchor" href="#使用时间戳" aria-hidden="true">#</a> 使用时间戳</h2>
<p>当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳（最一开始值设为 0 ），如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 时间戳</span>
<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> context<span class="token punctuation">,</span> args<span class="token punctuation">;</span>
    <span class="token keyword">var</span> previous <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> now <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>now <span class="token operator">-</span> previous <span class="token operator">></span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
            previous <span class="token operator">=</span> now<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>例子依然是用讲 debounce 中的例子，如果你要使用：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>container.onmousemove = throttle(getUserAction, 1000)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>效果演示如下：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/throttle1.gif" alt="throttle1"></p>
<p>我们可以看到：当鼠标移入的时候，事件立即执行，每过 1s 会执行一次，如果在 4.2s 停止触发，以后不会再执行事件</p>
<h2 id="使用定时器" tabindex="-1"><a class="header-anchor" href="#使用定时器" aria-hidden="true">#</a> 使用定时器</h2>
<p>当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定时器</span>
<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">,</span> context<span class="token punctuation">,</span> args<span class="token punctuation">;</span>
    <span class="token keyword">var</span> previous <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>为了让效果更加明显，我们设置 wait 的事件为 3s，效果演示如下：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/throttle2.gif" alt="throttle2"></p>
<p>我们可以看到：当鼠标移入的时候，事件不会立即执行，晃了 3s 后才执行一次，此后每 3s 执行一次；当数字显示为 3 的时候，立即移出鼠标，相当于大约 9.2s 的时候停止触发，但是依然会在第 12s 的时候执行一次事件</p>
<p>所以比较两个方法：</p>
<p>1.第一种事件会立即执行，第二种事件会在 n 秒后第一次执行</p>
<p>2.第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件</p>
<h2 id="两者结合" tabindex="-1"><a class="header-anchor" href="#两者结合" aria-hidden="true">#</a> 两者结合</h2>
<p>我们既想要鼠标移入就执行，又想要停止触发后再执行一次</p>
<p>结合两者的优势，我们再写一版</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">,</span> context<span class="token punctuation">,</span> args<span class="token punctuation">;</span>
    <span class="token keyword">var</span> previous <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">later</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        previous <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">throttled</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> now <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 下次触发 func 剩余的时间</span>
        <span class="token keyword">var</span> remaining <span class="token operator">=</span> wait <span class="token operator">-</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> previous<span class="token punctuation">)</span><span class="token punctuation">;</span>
        context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        args <span class="token operator">=</span> argument<span class="token punctuation">;</span>
        <span class="token comment">// 如果没有剩余的时间或者改了系统时间</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>remaining <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> remaining <span class="token operator">></span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token punctuation">}</span>
            previous <span class="token operator">=</span> now<span class="token punctuation">;</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>later<span class="token punctuation">,</span> remaining<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> throttled
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>效果演示如下：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/throttle3.gif" alt="throttle3"></p>
<p>我们可以看到：鼠标移入，事件立即执行，晃了 3s，事件再一次执行，当数字变成 3 的时候，也就是 6s 后，我们立即移出鼠标，停止触发事件， 9s 的时候，依然会再执行一次事件</p>
<h2 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h2>
<p>但是我们希望能控制有时候有头无尾，有时候无头有尾，怎么办呢？</p>
<p>我们再设置一个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定：</p>
<p>leading: false 表示禁止第一次执行</p>
<p>trailing: false 表示禁用停止触发的回调</p>
<p>我们再来改一下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">,</span> context<span class="token punctuation">,</span> args<span class="token punctuation">;</span>
    <span class="token keyword">var</span> previous <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">)</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">later</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        previous <span class="token operator">=</span> option<span class="token punctuation">.</span>leading <span class="token operator">===</span> <span class="token boolean">false</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timeout<span class="token punctuation">)</span> context <span class="token operator">=</span> args <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
   <span class="token keyword">var</span> <span class="token function-variable function">throttled</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> now <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>previous <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>leading <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> previous <span class="token operator">=</span> now<span class="token punctuation">;</span>
        <span class="token keyword">var</span> remaining <span class="token operator">=</span> wait <span class="token operator">-</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> previous<span class="token punctuation">)</span><span class="token punctuation">;</span>
        context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>remaining <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> remaining <span class="token operator">></span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            previous <span class="token operator">=</span> now<span class="token punctuation">;</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timeout<span class="token punctuation">)</span> context <span class="token operator">=</span> args <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timeout <span class="token operator">&amp;&amp;</span> options<span class="token punctuation">.</span>trailing <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>later<span class="token punctuation">,</span> remaining<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> throttled<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h2 id="取消" tabindex="-1"><a class="header-anchor" href="#取消" aria-hidden="true">#</a> 取消</h2>
<p>在 debounce 的实现中，我们加了一个 cancel 方法，throttle 我们也加个 cancel 方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 非完整代码</span>
<span class="token operator">...</span>
throttled<span class="token punctuation">.</span><span class="token function-variable function">cancel</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
    previous <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h2>
<p>我们要注意 underscore 的实现中有这样一个问题：</p>
<p>那就是 <code>leading：false</code> 和 <code>trailing: false</code> 不能同时设置。</p>
<p>如果同时设置的话，比如当你将鼠标移出的时候，因为 trailing 设置为 false，停止触发的时候不会设置定时器，所以只要再过了设置的时间，再移入的话，就会立刻执行，就违反了 leading: false，bug 就出来了，所以，这个 throttle 只有三种用法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>container.onmousemove = throttle(getUserAction, 1000);
container.onmousemove = throttle(getUserAction, 1000, {
    leading: false
});
container.onmousemove = throttle(getUserAction, 1000, {
    trailing: false
});
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>至此我们已经完整实现了一个 underscore 中的 throttle 函数，恭喜，撒花！</p>
<h2 id="原理-1" tabindex="-1"><a class="header-anchor" href="#原理-1" aria-hidden="true">#</a> 原理</h2>
<p>防抖（<code>debounce</code>）：不管事件触发频率多高，一定在事件触发 <code>n</code> 秒后才执行，如果你在一个事件触发的 <code>n</code> 秒内又触发了这个事件，就以新的事件的事件为准， <code>n</code> 秒后才执行，总之，触发完事件 <code>n</code> 秒内不再触发事件， <code>n</code> 秒后再执行</p>
<p><a href="http://www.conardli.top/docs/JavaScript/%E9%98%B2%E6%8A%96.html#%E5%8E%9F%E7%90%86" target="_blank" rel="noopener noreferrer">http://www.conardli.top/docs/JavaScript/%E9%98%B2%E6%8A%96.html#%E5%8E%9F%E7%90%86<ExternalLinkIcon/></a></p>
<p>防抖，如果再点击，从头再来</p>
<p>防抖取第近一次的调用</p>
<p>防抖：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效</p>
<p>防抖的理解，可以把它想象成游戏中的CD，技能释放完后要有冷却事件，在这一时间内，你无论怎么按技能，技能不会释放</p>
<p>无论是防抖，还是节流，都是闭包的引用</p>
<p>防抖和节流都是防止某一时间频繁触发，但是原理不一样</p>
<p>防抖是某一段时间内只执行一次，而节流是间隔时间执行</p>
<p>引用场景：</p>
<p>debounce</p>
<ul>
<li>search搜索联想，用户在不断输入值时，用防抖来节约请求资源。</li>
<li>window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次</li>
</ul>
<p>throttle</p>
<ul>
<li>鼠标不断点击触发，mousedown(单位时间内只触发一次)</li>
<li>监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断</li>
</ul>
<p>https://github.com/mqyqingfeng/Blog/issues/22</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/26" target="_blank" rel="noopener noreferrer">JavaScript专题之跟着 underscore 学节流<ExternalLinkIcon/></a></li>
</ul>
</template>
