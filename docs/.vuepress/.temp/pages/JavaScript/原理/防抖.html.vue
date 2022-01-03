<template><h1 id="防抖-debounce" tabindex="-1"><a class="header-anchor" href="#防抖-debounce" aria-hidden="true">#</a> 防抖（debounce）</h1>
<p>在前端代码中，我们常会遇到一些场景，滚动屏幕，上拉加载图片，搜索关键字，如果前端不做处理，把请求都交给后端，后端的压力就会非常大，这样导致用户体验也会受到一些影响，所以在日常开发中，我们会对其进行防抖和节流的操作。</p>
<p>本节我们来讲讲防抖</p>
<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<p>防抖的原理是：不管事件触发频率有多高，一定在事件触发 <code>n</code> 秒后才执行。如果你在事件触发的 <code>n</code> 秒内又触发了这个事件，那就以新事件的时间为准，<code>n</code> 秒后才执行。总之，要等你触发完事件 <code>n</code> 秒内不再触发事件，我才执行</p>
<p>根据这段表述，我们可以写第一版的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span>
        timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="this" tabindex="-1"><a class="header-anchor" href="#this" aria-hidden="true">#</a> this</h2>
<p>如果我们在  <code>getUserAction</code> 函数中<code>console.log(this)</code> , 在不使用 <code>debounce</code> 函数的时候， <code>this</code> 的值为：</p>
<div class="language-htnl ext-htnl line-numbers-mode"><pre v-pre class="language-htnl"><code>&lt;div id=&quot;container&quot;&gt;&lt;/div&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>但是如果使用我们的 debounce 函数，this 就会指向 Window 对象</p>
<p>所以我们要改变 this 的指向，让它指向它该指向的地方</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第二版</span>
<span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        
        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        	<span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token comment">// 使用 func,bind(self) 一样的效果</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>现在 this 已经可以正确指向了。让我们看下个问题</p>
<h2 id="event问题" tabindex="-1"><a class="header-anchor" href="#event问题" aria-hidden="true">#</a> event问题</h2>
<p>JavaScript 在事件处理函数中会提供事件对象 event，我们修改下 getUserAction 函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getUserAction</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
    container<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> count<span class="token operator">++</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>如果我们不适用 debounce 函数，这里会打印 MouseEvent 对象</p>
<p><img src="@source/.vuepress/public/images/JavaScript/dobounce.png" alt="dobounce"></p>
<p>但是在我们实现的 debounce 函数中，却只会打印 undefined！</p>
<p>所以我们需要修改一下代码，将参数赋值上去</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第三版</span>
<span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        
        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span>
        timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>到此为止，我们修复了两个小问题：</p>
<ul>
<li>this 指向</li>
<li>event 对象</li>
</ul>
<p>其实到这里，就已经实现了防抖的“面试”代码，但我们的可以再次基础上再完善一番</p>
<h2 id="立即执行" tabindex="-1"><a class="header-anchor" href="#立即执行" aria-hidden="true">#</a> 立即执行</h2>
<p>需求：我不希望非要等到事件停止出发后才执行，我希望立即执行函数，然后等到停止触发 n 秒后，才可以重新触发执行</p>
<p>那么我们加个 immediate 参数判断是否是立刻执行</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第四版</span>
<span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait<span class="token punctuation">,</span> immediate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果已经执行过，不再执行</span>
            <span class="token keyword">var</span> callNow <span class="token operator">=</span> <span class="token operator">!</span>timeout<span class="token punctuation">;</span>
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="返回值" tabindex="-1"><a class="header-anchor" href="#返回值" aria-hidden="true">#</a> 返回值</h2>
<p>此时注意一点，getUserAction 函数可能是有返回值的，所以我们也要返回函数的执行结果，但是当 immediate 为 false 的时候，因为使用了 setTimeout，我们将 func.apply(self, args) 的返回值赋值给变量，最后再 return 的时候，值将会一直是 undefined，所以我们需要在 immediate 为 true 的时候返回函数的执行结果</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第五版</span>
<span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait<span class="token punctuation">,</span> immediate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">,</span> result<span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>immeduate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> callNow <span class="token operator">=</span> <span class="token operator">!</span>timeout
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>callNow<span class="token punctuation">)</span> result <span class="token operator">=</span> <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> 
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="有返回值但不立即执行" tabindex="-1"><a class="header-anchor" href="#有返回值但不立即执行" aria-hidden="true">#</a> 有返回值但不立即执行</h2>
<p>如果我们没有 immediate 参数，但需要返回值怎么办？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">,</span> result<span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
        timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="取消" tabindex="-1"><a class="header-anchor" href="#取消" aria-hidden="true">#</a> 取消</h2>
<p>最后我们希望能取消 debounce 函数，比如说 debounce 的时间间隔是 10 秒钟，immediate 为 true，这样的话，我只有等10 秒后才能重新出发事件，现在我希望有个按钮，点击后，取消防抖，这样我们再去触发，就可以又立即执行了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第六版</span>
<span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait<span class="token punctuation">,</span> immediate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> timeout<span class="token punctuation">,</span> result<span class="token punctuation">;</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">debounced</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> callNow <span class="token operator">=</span> <span class="token operator">!</span>timeout
            
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>callNow<span class="token punctuation">)</span> result <span class="token operator">=</span> <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
            
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    debounced<span class="token punctuation">.</span><span class="token function-variable function">cancel</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
        timeout <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> debounced<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>如何使用这个cancel 函数呢？依然是以上面的 demo 为例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'container'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getUserAction</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    container<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> count<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> setUseAction <span class="token operator">=</span> <span class="token function">debounce</span><span class="token punctuation">(</span>getUserAction<span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

container<span class="token punctuation">.</span>onmousemove <span class="token operator">=</span> setUseAction<span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"button"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    setUseAction<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>至此我们已经完整实现了一个 underscore 中的 debounce 函数</p>
<p>最新的1.10.2 的 debounce 源码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="es6版本" tabindex="-1"><a class="header-anchor" href="#es6版本" aria-hidden="true">#</a> ES6版本</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> time<span class="token punctuation">,</span> flag</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">debounced</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>flag <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>  
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    debounced<span class="token punctuation">.</span><span class="token function-variable function">cancel</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
      timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> debounced<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2>
<p>做动画时常用的防抖：一帧时间中（16ms）渲染多次（骗过肉眼即可）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> t<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">cancelAnimationFrame</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>
        t <span class="token operator">=</span> <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>代码已经部署在codepen.io上，可以通过 <a href="https://codepen.io/jojobo/pen/KKNYoQx" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a> 查看</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://github.com/jashkenas/underscore/blob/master/modules/debounce.js" target="_blank" rel="noopener noreferrer">underscore的debounce源码<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/22" target="_blank" rel="noopener noreferrer">JavaScript专题之跟着underscore学防抖<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://codepen.io/jojobo/pen/KKNYoQx" target="_blank" rel="noopener noreferrer">codepen在线代码平台<ExternalLinkIcon/></a></p>
</li>
</ul>
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
<p>老外写的防抖与节流</p>
<p>https://css-tricks.com/debouncing-throttling-explained-examples/</p>
<h3 id="如何区分节流和防抖" tabindex="-1"><a class="header-anchor" href="#如何区分节流和防抖" aria-hidden="true">#</a> 如何区分节流和防抖</h3>
<p>防抖是虽然事件持续触发，但只有等事件停止触发后 n 秒才执行函数，节流是持续触发的时候，每 n 秒执行一次函数</p>
<p>防抖节流场景及应用</p>
<p>https://mp.weixin.qq.com/s/XzqwfdG4-whUaAxxnXITmg</p>
</template>
