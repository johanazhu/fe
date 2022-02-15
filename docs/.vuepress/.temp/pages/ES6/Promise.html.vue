<template><h1 id="promise" tabindex="-1"><a class="header-anchor" href="#promise" aria-hidden="true">#</a> Promise</h1>
<h2 id="什么是promise" tabindex="-1"><a class="header-anchor" href="#什么是promise" aria-hidden="true">#</a> 什么是Promise</h2>
<p>在了解Promise前，先去看看为什么会产生Promise</p>
<h4 id="javascript的回调函数" tabindex="-1"><a class="header-anchor" href="#javascript的回调函数" aria-hidden="true">#</a> JavaScript的回调函数</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">getAsync</span><span class="token punctuation">(</span><span class="token string">"fileA.txt"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//  失败时的处理</span>
        <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 成功后的处理</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Node.Js 的规则是在 JavaScript 的回调函数的第一个参数为 <code>Error</code> 对象，这是它的一个惯例</p>
<h4 id="使用promise进行异步处理" tabindex="-1"><a class="header-anchor" href="#使用promise进行异步处理" aria-hidden="true">#</a> 使用Promise进行异步处理</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> promise <span class="token operator">=</span> <span class="token function">getAsyncPromise</span><span class="token punctuation">(</span><span class="token string">"fileA.txt"</span><span class="token punctuation">)</span>
promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取文件内容成功后的处理</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取文件内容失败后的处理</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 或者用另一种</span>
promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// 获取文件内容成功后的处理</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取文件内容失败后的处理</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>看到用promise和回调函数的区别没有</p>
<p>promise 更趋于同步的想法——我去调这个行为，等（then）它好了我再执行XX</p>
<p>综上所述：</p>
<p>promise是异步编程的一种解决方案，比传统的回调函数和事件更合理和强大</p>
<p>所谓 promise，简单来说就是<strong>一个容器</strong>，里面保存着某个未来才会结束的行为（通常是一个异步处理）。从语法上讲，promise 是一个对象，从它那可以获取异步操作的消息</p>
<h2 id="实战promise" tabindex="-1"><a class="header-anchor" href="#实战promise" aria-hidden="true">#</a> 实战Promise</h2>
<h3 id="一般用法" tabindex="-1"><a class="header-anchor" href="#一般用法" aria-hidden="true">#</a> 一般用法</h3>
<p>之前介绍过，promise像一个容器，包裹着“成功”或“失败”</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">promise</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'成功'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">promise</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="then" tabindex="-1"><a class="header-anchor" href="#then" aria-hidden="true">#</a> then</h3>
<h4 id="它的使用" tabindex="-1"><a class="header-anchor" href="#它的使用" aria-hidden="true">#</a> 它的使用</h4>
<p>then 方法可以接受两个回调函数作为参数，</p>
<p>第一个回调函数是 promise 对象的状态变为 resolved 的时候调用，</p>
<p>第二个回调函数是 promise 对象的状态变为 rejected 时调用</p>
<p>其中第二个函数时可选的，不一定需要提供</p>
<h4 id="它的作用" tabindex="-1"><a class="header-anchor" href="#它的作用" aria-hidden="true">#</a> 它的作用</h4>
<p>为 promise 实例添加状态改变时的回调函数</p>
<p>前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数（可选）</p>
<p><strong>then 方法返回的是一个新的 promise 实例</strong>。注意，不是原来那个 promise 实例，因此可以采用链式写法，即在 then 方法后面再调用另一个 then 方法</p>
<p>注意：<strong>then 方法即不会触发回调，也不会将它放到微任务，then 只负责注册回调，由 resolve 将注册的回调放入微任务队列，由事件循环将其取出并执行</strong></p>
<h3 id="执行顺序" tabindex="-1"><a class="header-anchor" href="#执行顺序" aria-hidden="true">#</a> 执行顺序</h3>
<p>面试中常常考的问题</p>
<p>在说这个之前，需要先聊天事件循环的执行顺序</p>
<p>简单来说：XXX</p>
<p>回过头说promise，promise新建后就会立即执行，而then会被塞到为微任务中，当宏任务执行完后再执行微任务</p>
<p>promise</p>
<p>Promise是ES6新增的语法，解决了回调地狱的问题</p>
<p>可以把Promise堪称一个状态机，初始时pending状态，通过函数resolve和rejecy，将状态转变为resolved和rejected，状态一旦改变就不会再次变化</p>
<p>阳波 javascript核心技术开发解密</p>
<h4 id="_1-异步与同步" tabindex="-1"><a class="header-anchor" href="#_1-异步与同步" aria-hidden="true">#</a> 1.异步与同步</h4>
<p>​	什么是异步？什么是同步？在代码的执行过程中，经常会涉及两个不同的概念，他们就是同步和异步。</p>
<p>​	同步是值当发起一个请求时，如果未得到请求结果，代码将会等待，直到结果出来，才会执行后面的代码。异步是指当发起一个请求时，不会等待请求结果，而是直接继续执行后面代码。</p>
<p>​	我们使用 promise 模拟一个发起请求的函数，该函数执行后，会在1s之后返回数值30</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在该函数的基础上，可以使用 async/awaut 语法来模拟同步的效果</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> t <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'next code'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 输出结果</span>
<span class="token comment">// 1s 之后依次输出 </span>
<span class="token comment">// 30 </span>
<span class="token comment">// nextcode</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>而一部效果则会有不同的输出结果:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'next code'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出结果</span>
<span class="token comment">// 1s 之后依次输出 </span>
<span class="token comment">// nextcode</span>
<span class="token comment">// 30</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）因此可以采用链式写法，即then方法后面再调用另一个then方法</p>
<p>实例化 Promise 传入的函数是同步执行的，then 方法本身其实也是<strong>同步</strong>执行的，但 then 中的回调会先放入微任务队列，等同步任务执行完毕后，再依次取出执行，换句话说只有回调是异步的</p>
<p>在new Promise 中使用resolve或者reject，相当于变更promise的状态，变化后，promise.then会执行</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&amp;mid=2247484500&amp;idx=1&amp;sn=01d5ed1a017a09a232df19721cbbc0d4&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">面试问到 Promise，这样回答最完美了<ExternalLinkIcon/></a></li>
<li><a href="https://www.jianshu.com/p/da611c080feb" target="_blank" rel="noopener noreferrer">JavaScript：生成器（Generator）<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903666290262024" target="_blank" rel="noopener noreferrer">迭代器,生成器(generator)和Promise的“微妙”关系<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/xieranmaya/blog/issues/3" target="_blank" rel="noopener noreferrer">剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&amp;mid=2451046472&amp;idx=1&amp;sn=308e85ae3a92dd81c1943d12f4e9d128&amp;chksm=87c41958b0b3904e962e6df6788ee8f66947da90066f700db0e25f59b21e12bd620121714efb&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1571791544493&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">Promise 链式调用顺序引发的思考<ExternalLinkIcon/></a></li>
<li><a href="https://www.kancloud.cn/kancloud/promises-book/44251" target="_blank" rel="noopener noreferrer">JavaScript Promise迷你书<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903972008886279" target="_blank" rel="noopener noreferrer">Promise 链式调用顺序引发的思考<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651234151&amp;idx=1&amp;sn=6292156c16e851d8d5f1dbccdfc82a74&amp;chksm=bd4946e38a3ecff561bef99277e0f1ad5ec7f7014437aa100cb01e872eee80985adb04734b11&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1570493248167&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">100 行代码实现 Promises/A+ 规范<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000016550260" target="_blank" rel="noopener noreferrer">从0到1实现Promise<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzg3MTU4NTI3OA==&amp;mid=2247488564&amp;idx=1&amp;sn=064273a79002be92454954f0973c86ce&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">要就来45道Promise面试题一次爽到底(1.1w字用心整理)<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&amp;mid=2247490644&amp;idx=1&amp;sn=4caa938b2f3d123fad848c3edb0a7b28&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">高级异步模式 - Promise 单例<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/BlD9HgXM9hqRGf3Ep9UYEw" target="_blank" rel="noopener noreferrer">Promise原理&amp;宏微任务<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6945319439772434469" target="_blank" rel="noopener noreferrer">从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/pELnbmQkpsz2LmIQBnSeQQ" target="_blank" rel="noopener noreferrer">这次彻底搞懂 Promise<ExternalLinkIcon/></a></li>
</ul>
</template>
