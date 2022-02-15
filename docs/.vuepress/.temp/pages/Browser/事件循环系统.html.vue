<template><h1 id="事件循环系统" tabindex="-1"><a class="header-anchor" href="#事件循环系统" aria-hidden="true">#</a> 事件循环系统</h1>
<p>在这篇文章中会介绍以下内容：</p>
<ul>
<li>engine runtime 和 call stack 简介（以 V8 引擎为例）</li>
<li>Event Loop 运行机制的详解</li>
<li>microtasks 和 macrotask 的执行顺序
<ul>
<li>哪些是 microtasks</li>
<li>哪些是 macrotask</li>
<li>promise 的执行顺序</li>
<li>async/await 的执行顺序</li>
</ul>
</li>
</ul>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>之前讲 <a href="./%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9E%B6%E6%9E%84">浏览器架构</a> 时，我们说到现代浏览器采用多进程架构，有 浏览器主进程、渲染进程、插进进程、网络进程、GPU进程等组成。又在 <RouterLink to="/Browser/%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B%E4%B8%AD%E7%9A%84%E8%BF%9B%E7%A8%8B.html">渲染进程中的线程</RouterLink> 中讲到，渲染进程由 JS 引擎线程、GUI 渲染线程、事件触发线程、定时触发线程、异步HTTP请求线程等。而且GUI 渲染线程与 JS 引擎线程是相斥的</p>
<p>JS 引擎线程 和 GUI渲染线程 是互斥关系，浏览器为了能够使宏任务和DOM任务有序的进行，会在一个宏任务执行结束后，在下一个宏任务执行前，GUI渲染线程开始工作，对页面进行渲染</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 宏任务 --> 渲染 --> 宏任务 --> 渲染 -->...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="engine-runtime-和-call-stack-简介" tabindex="-1"><a class="header-anchor" href="#engine-runtime-和-call-stack-简介" aria-hidden="true">#</a> engine runtime 和 call stack 简介</h2>
<p>在 chrome 浏览器和 nodejs 里都是用 V8 引擎解析和运行 JS 代码，我们先来看下 V8 引擎的简化图：</p>
<p><img src="https://i.loli.net/2021/06/22/d9FhMTAOBUjk8N3.png" alt="image-20210622155212551"></p>
<p>上面的 Heap 时用来做内存分配的， Call Stack 时用来执行 JS 代码，由于 JS 是单线程所以只有一个 Call Stack。实际我们写页面时，除了一些 JS 代码，我们还会大量使用：DOM事件、AJAX(XMLHttpRequest)、setTimeout 等一些异步事件。从上图可以看出，这些异步事件都没有在 V8 引擎里，事实上这些异步事件不属于 V8 引擎，而是<strong>属于浏览器</strong>，并且 DOM 事件、AJAX(XMLHttpRequest)、setTimeout 都分别有单独的线程来处理。由于 Call Stack 执行（JS引擎线程）与 页面渲染线程（GUI渲染线程）时互斥的，如果所有的事情都由 V8 引擎处理，这样肯定会导致页面卡顿。</p>
<p>而浏览器多线程和 callback 机制完美笔名了页面卡顿问题。DOM 事件、AJAX(XMLHttpRequest)、setTimeout 这些异步事件在各自单独的线程处理完以后，每个异步事件都有 callback 回调函数，V8 引擎再把这些回调函数放在 Call Stack 执行。上述整个运行机制可以称为是 runtime，可以简化如下图：</p>
<p><img src="https://i.loli.net/2021/06/22/3dAbMH9JkDrjxcR.png" alt="image-20210622155906103"></p>
<p>如上图所示，web 异步事件结束以后，会有 callback，然后 runtime 把这些 callback 事件放到 Callback Queue 里，一旦 Call Stack 所有的方法都执行完以后， Event Loop 会依次把 Callback Queue 里的回调函数放到 Call Stack 里执行</p>
<h2 id="event-loop-运行机制" tabindex="-1"><a class="header-anchor" href="#event-loop-运行机制" aria-hidden="true">#</a> Event Loop 运行机制</h2>
<p>Event Loop 实际上就是一个 job，用来检测 Call Stack 和 Callback Queue，一旦 Call Stack 里代码执行完以后，就会把 Callback Queue 里第一个 callback 函数放到 Call Stack 里执行。我们来看这个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>运行结果如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>script start
script end
setTimout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>具体的图就不画了，以文字的形式讲解以下：</p>
<p>1.代码没有运行之前，Call Stack 、Callback Queue 都是空的</p>
<p>2.把 <code>console.log('script start')</code> 加入 Call Stack 中</p>
<p>3.执行 <code>console.log()</code>，打印<code>script start</code>，执行接触后出栈</p>
<p>4.将 setTimeout 压入 Call Stack</p>
<p>5.执行 setTimeout，用<strong>定时器触发线程</strong>执行 timeout 时间，Call Stack 中的 setTimeout 执行结束，出栈</p>
<p>6.把 <code>console.log('script end')</code> 加入 Call Stack 中</p>
<p>7.执行<code>console.log('script end')</code>，在 console 里打印出<code>script end</code></p>
<p>8.<code>console.log('script end')</code>执行结束，把它移出 Call Stack</p>
<p>9.1000毫秒后，计时接触，定时器触发线程将 callback<code>cb1</code> 函数放到 Callback Queue 里</p>
<p>10.此时 Call Stack 是空的，Event Loop 把 <code>cb1</code> 拿到 Call Stack 里</p>
<p>11.执行 <code>cb1</code>，<code>cb1</code> 里有 <code>console.log('setTimeout')</code> ，把它放到 Call Stack里</p>
<p>12.执行<code>console.log('setTimeout')</code>，打印，移出 Call Stack</p>
<p>13.<code>cb1</code> 执行结束，将它移出 Call Stack</p>
<h2 id="放入-callback-queue-的顺序" tabindex="-1"><a class="header-anchor" href="#放入-callback-queue-的顺序" aria-hidden="true">#</a> 放入 Callback Queue 的顺序</h2>
<p>放入 Callback Queue 中的顺序与什么有关，要么跟书写位置（像词法作用域那样），要么调用（像调用this那样），我们看一下这个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout1'</span><span class="token punctuation">)</span>   
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>运行结果如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>script start
script end
setTimeout2
setTimeout1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>放入 Callback Queue 的顺序与调用有关，一个500毫秒后就放入 Callback Queue 中，一个是1000 毫秒，先进先出</p>
<p>总结来说，JS 是单线程，只有一个 Call Stack，浏览器是多进程，并且 DOM 事件、AJAX（XMLHttpRequest）、setTimeout 都是有单独的线程处理。在这些异步事件结束后，runtime 会把它们的 callback 按顺序放到 Callback Queue 里，Event Loop 会检测 Call Stack，一旦它为空，就会把 Callback Queue 里的回调函数依次放到 Call Stack 里执行，直到 Callback Queue 为空</p>
<h2 id="microtasks-和-macrotask-的执行顺序" tabindex="-1"><a class="header-anchor" href="#microtasks-和-macrotask-的执行顺序" aria-hidden="true">#</a> microtasks 和 macrotask 的执行顺序</h2>
<p>刚才用 setTimeout 为例，解释了 JS 中 Event Loop 机制是怎么运行的，也提到过 runtime 会把回调函数依次按时间先后顺序放到 Callback Queue 里，然后 Event Loop 再依次把这些回调函数放到 Call Stack 里运行。我们运行以下代码，看下结果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promose1'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promose2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>执行结果如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>script start
script end
promose1
promose2
setTimeout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote>
<p>上述代码虽然 setTimeout 延时为0，其实还是异步的，因为 H5 标准规定 setTimeout 函数的第二个参数不能小于 4 毫秒，不足会自动增加</p>
</blockquote>
<p>setTimeout 和 promise 都是异步事件，而且 setTimeout 写在 promise 之前，为什么 setTimeout 的回调要比 promise 后执行呢？那是因为 promise 属于微任务（microtasks）而 setTimeout 属于宏任务（macrotask），微任务（microtasks）的优先级要高于宏任务（macrotask）。</p>
<p>首先我们需要明白以下几个事件：</p>
<ul>
<li>JS 分为同步任务和异步任务</li>
<li>同步任务都在主线程上执行，形成一个执行栈</li>
<li>主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果（callback），就在任务队列之中放置一个事件</li>
<li>一旦执行栈中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到 Call Stack 中，开始执行</li>
</ul>
<p>根据规范，事件循环是通过任务队列的机制来进行协调的。一个 Event Loop 中，可以有一个或者多个任务队列(task queue)，一个任务队列便是一系列有序任务(task)的集合；每个任务都有一个任务源(task source)，源自同一个任务源的 task 必须放到同一个任务队列，从不同源来的则被添加到不同队列。 setTimeout/Promise 等 API 便是任务源，而进入任务队列的是他们指定的具体执行任务。</p>
<p><img src="https://i.loli.net/2021/06/22/7y2mRHsG3LkNQjE.png" alt="image-20210622173444700"></p>
<p>Callback Queue（Task Queue）里的回调事件称为宏任务（macrotask），每次异步事件结束后，它们的回调函数会依次按时间顺序放在 Callback Queue 里，等待 Event Loop 依次把它们放到 Call Stack 里执行。比如：<code>setInterval</code> <code>setTimeout</code> <code>script</code> <code>setImmediate</code> <code>I/O</code> <code>UI rendering</code>就是宏任务（macrotask）。</p>
<p>微任务（microtasks）是指异步事件结束后，回调函数不会放到 Callback Queue，而是放到一个微任务队列里（Microtasks Queue），在 Call Stack 为空时，Event Loop 会先查看微任务队列里是否有任务，如果有就会先执行微任务队列里的回调事件；如果没有微任务，才会到 Callback Queue 执行回到事件。比如：<code>promise</code> <code>process.nextTick</code>、 <code>Object.observe</code> 、<code>MutationObserver</code>就是微任务（microtasks）。</p>
<blockquote>
<p>在 ES6 规范中，microtasks 称为 jobs，macrotask 称为 task</p>
</blockquote>
<p>整个 Event Loop 的执行顺序如下：</p>
<ul>
<li>执行一个宏任务（栈中没有就从事件队列中获取）</li>
<li>执行过程中如果遇到微任务，就将它添加到微任务的任务队列中</li>
<li>宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）</li>
<li>当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染</li>
<li>渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取，也就是 callback queue）</li>
</ul>
<p>流程图如下：</p>
<p><img src="https://i.loli.net/2021/06/11/dWoDPcI4EwCiSa3.png" alt="js-eventloop17"></p>
<h2 id="promise" tabindex="-1"><a class="header-anchor" href="#promise" aria-hidden="true">#</a> Promise</h2>
<p>promise 是真正的男人，它是同步任务，它的then是异步的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span>
	<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'then'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// promise1 promise2 then</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>promise 中再给你个 setTimeout 怎么办</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'外部setTimeout1'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'内部setTimeout'</span><span class="token punctuation">)</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'then'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'外部setTimeout2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token comment">// promise1 外部setTimeout1 内部setTimeout then 外部setTimeout2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>这个例子告诉我们，宏任务中的执行顺序是队列，先进先出</p>
<p>如上所说，<code>promise.then</code> 、<code>catch</code> 和 <code>finally</code> 是属于 <code>MicroTasks</code>。</p>
<h2 id="async-wait" tabindex="-1"><a class="header-anchor" href="#async-wait" aria-hidden="true">#</a> async/wait</h2>
<blockquote>
<p>async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的一部操作完成，再接着执行函数体内后面的语句</p>
</blockquote>
<p><code>async</code> 隐式返回 Promise 作为结果的函数， await 后面的函数执行完毕时，await 会产生一个微任务。但是我们要主义这个微任务产生的时机，时执行完 await 之后，直接跳出 async 函数</p>
<p>来一个题目</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async1 start'</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async1 end'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">async2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'async2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script start'</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout0'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setTimeout3'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token function">setTmmediate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setImmediate'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'nextTick'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">async1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Promose</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'promise3'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'script end'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>运行结果</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>script start
async1 start
async2
promise1
promise2
script end
nextTick
async1 end
promise3
setTimeout0
setImmediate
setTimeout3
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>回想起 JavaScript 的执行栈中，我们讲到执行上下文栈，所谓的执行上下文栈，就是 Call Stack。从大的方向看，每一段代码要先压入 Call Stack 。这里面涉及到词法作用域与变量提升、函数提升等问题，但最终引出的是闭包。闭包是静态（词法）作用域的延申</p>
<p>因为浏览器的多线程以及 callback 机制完美避免了页面卡顿的问题。任何异步操作在各自单独线程中处理完以后，每个异步事件都有 callback 回调函数，V8 引擎会将这些回调函数放入 Call Stack 执行。上述整个运行机制可以称为 runtime</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://limeii.github.io/2019/05/js-eventloop/" target="_blank" rel="noopener noreferrer">JS：详解Event Loop运行机制<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&amp;mid=2247484610&amp;idx=2&amp;sn=72b77572a8c42fe6c165336ce0a035c1&amp;chksm=ea0167aedd76eeb8cfdc05c058bb3967f6dcbb6a20eef43f0afd2398a52d2d8ead2895a35118&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1567556614880&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">用一道大厂面试题带你搞懂事件循环机制<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
