import{_ as s,c as n,o as a,d as l}from"./app.590c1fbf.js";const A=JSON.parse('{"title":"Promise 保教不会","description":"","frontmatter":{},"headers":[{"level":2,"title":"什么是 Promise","slug":"什么是-promise","link":"#什么是-promise","children":[]},{"level":2,"title":"实战 Promise","slug":"实战-promise","link":"#实战-promise","children":[{"level":3,"title":"一般用法","slug":"一般用法","link":"#一般用法","children":[]},{"level":3,"title":"then","slug":"then","link":"#then","children":[]},{"level":3,"title":"执行顺序","slug":"执行顺序","link":"#执行顺序","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"ES6/Promise/Promise.md"}'),p={name:"ES6/Promise/Promise.md"},e=l(`<h1 id="promise-保教不会" tabindex="-1">Promise 保教不会 <a class="header-anchor" href="#promise-保教不会" aria-hidden="true">#</a></h1><p>Promise 是什么，为什么会产生 promise（即讲明相对于以往有什么优势），缺点是什么，更好的方案</p><ul><li>是什么？ES6 出的 异步编程的一种解决方案，是为了解决回调地狱问题，使代码可读性更高，便于维护</li></ul><p>Promise 具体语法是怎么样，有哪些特征</p><ul><li>语法 <ul><li>三种状态 pending 、resolve、reject。状态一旦变更无法修改</li><li>Promise 传入 executor，有 resolve 和 reject，</li></ul></li><li>特征 <ul><li>then、catch、Promise.all、Promise.race <ul><li>then <ul><li>获得异步变更后的状态</li><li>返回的也是一个 promise 对象</li></ul></li><li>catch <ul><li>捕获错误，如果你在 then 中已经对 reject 做过处理，不会再进入 catch</li></ul></li><li>Promise.all <ul><li>传入数组，当所有的 Promsie 的 resolve 回调结束再返回</li></ul></li><li>Promise.race <ul><li>传入数组，取最快的 resolve 的回调函数</li></ul></li></ul></li><li>链式调用 <ul><li>无论是 then 还是 catch 返回都是 this <ul><li>this 是什么？ <ul><li>词法作用域</li></ul></li></ul></li></ul></li></ul></li></ul><p>Promise 引出 Event Loop</p><ul><li>事件循环 <ul><li>宏任务、微任务</li></ul></li></ul><h2 id="什么是-promise" tabindex="-1">什么是 Promise <a class="header-anchor" href="#什么是-promise" aria-hidden="true">#</a></h2><p>在了解 Promise 前，先去看看为什么会产生 Promise</p><h4 id="javascript-的回调函数" tabindex="-1">JavaScript 的回调函数 <a class="header-anchor" href="#javascript-的回调函数" aria-hidden="true">#</a></h4><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">getAsync</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fileA.txt</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">error</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">result</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">error</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//  失败时的处理</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">throw</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 成功后的处理</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Node.Js 的规则是在 JavaScript 的回调函数的第一个参数为 <code>Error</code> 对象，这是它的一个惯例</p><h4 id="使用-promise-进行异步处理" tabindex="-1">使用 Promise 进行异步处理 <a class="header-anchor" href="#使用-promise-进行异步处理" aria-hidden="true">#</a></h4><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> promise </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getAsyncPromise</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fileA.txt</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">promise</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">result</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 获取文件内容成功后的处理</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">error</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 获取文件内容失败后的处理</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 或者用另一种</span></span>
<span class="line"><span style="color:#A6ACCD;">promise</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">result</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 获取文件内容成功后的处理</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">error</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 获取文件内容失败后的处理</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>看到用 promise 和回调函数的区别没有</p><p>promise 更趋于同步的想法——我去调这个行为，等（then）它好了我再执行 XX</p><p>综上所述：</p><p>promise 是异步编程的一种解决方案，比传统的回调函数和事件更合理和强大</p><p>所谓 promise，简单来说就是<strong>一个容器</strong>，里面保存着某个未来才会结束的行为（通常是一个异步处理）。从语法上讲，promise 是一个对象，从它那可以获取异步操作的消息</p><h2 id="实战-promise" tabindex="-1">实战 Promise <a class="header-anchor" href="#实战-promise" aria-hidden="true">#</a></h2><h3 id="一般用法" tabindex="-1">一般用法 <a class="header-anchor" href="#一般用法" aria-hidden="true">#</a></h3><p>之前介绍过，promise 像一个容器，包裹着“成功”或“失败”</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">promise</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">resolve</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">reject</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">成功</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">promise</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="then" tabindex="-1">then <a class="header-anchor" href="#then" aria-hidden="true">#</a></h3><h4 id="它的使用" tabindex="-1">它的使用 <a class="header-anchor" href="#它的使用" aria-hidden="true">#</a></h4><p>then 方法可以接受两个回调函数作为参数，</p><p>第一个回调函数是 promise 对象的状态变为 resolved 的时候调用，</p><p>第二个回调函数是 promise 对象的状态变为 rejected 时调用</p><p>其中第二个函数时可选的，不一定需要提供</p><h4 id="它的作用" tabindex="-1">它的作用 <a class="header-anchor" href="#它的作用" aria-hidden="true">#</a></h4><p>为 promise 实例添加状态改变时的回调函数</p><p>前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数（可选）</p><p><strong>then 方法返回的是一个新的 promise 实例</strong>。注意，不是原来那个 promise 实例，因此可以采用链式写法，即在 then 方法后面再调用另一个 then 方法</p><p>注意：<strong>then 方法即不会触发回调，也不会将它放到微任务，then 只负责注册回调，由 resolve 将注册的回调放入微任务队列，由事件循环将其取出并执行</strong></p><h3 id="执行顺序" tabindex="-1">执行顺序 <a class="header-anchor" href="#执行顺序" aria-hidden="true">#</a></h3><p>面试中常常考的问题</p><p>在说这个之前，需要先聊天事件循环的执行顺序</p><p>简单来说：XXX</p><p>回过头说 promise，promise 新建后就会立即执行，而 then 会被塞到为微任务中，当宏任务执行完后再执行微任务</p><p>promise</p><p>Promise 是 ES6 新增的语法，解决了回调地狱的问题</p><p>可以把 Promise 堪称一个状态机，初始时 pending 状态，通过函数 resolve 和 rejecy，将状态转变为 resolved 和 rejected，状态一旦改变就不会再次变化</p><p>阳波 javascript 核心技术开发解密</p><h4 id="_1-异步与同步" tabindex="-1">1.异步与同步 <a class="header-anchor" href="#_1-异步与同步" aria-hidden="true">#</a></h4><p>​ 什么是异步？什么是同步？在代码的执行过程中，经常会涉及两个不同的概念，他们就是同步和异步。</p><p>​ 同步是值当发起一个请求时，如果未得到请求结果，代码将会等待，直到结果出来，才会执行后面的代码。异步是指当发起一个请求时，不会等待请求结果，而是直接继续执行后面代码。</p><p>​ 我们使用 promise 模拟一个发起请求的函数，该函数执行后，会在 1s 之后返回数值 30</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">resolve</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">reject</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">30</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在该函数的基础上，可以使用 async/awaut 语法来模拟同步的效果</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">t</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">t</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">next code</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">foo</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 输出结果</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1s 之后依次输出</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 30</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// nextcode</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>而一部效果则会有不同的输出结果:</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">fn</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">next code</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 输出结果</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1s 之后依次输出</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// nextcode</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 30</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法</p><p>实例化 Promise 传入的函数是同步执行的，then 方法本身其实也是<strong>同步</strong>执行的，但 then 中的回调会先放入微任务队列，等同步任务执行完毕后，再依次取出执行，换句话说只有回调是异步的</p><p>在 new Promise 中使用 resolve 或者 reject，相当于变更 promise 的状态，变化后，promise.then 会执行</p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&amp;mid=2247484500&amp;idx=1&amp;sn=01d5ed1a017a09a232df19721cbbc0d4&amp;source=41#wechat_redirect" target="_blank" rel="noreferrer">面试问到 Promise，这样回答最完美了</a></li><li><a href="https://www.jianshu.com/p/da611c080feb" target="_blank" rel="noreferrer">JavaScript：生成器（Generator）</a></li><li><a href="https://juejin.cn/post/6844903666290262024" target="_blank" rel="noreferrer">迭代器,生成器(generator)和 Promise 的“微妙”关系</a></li><li><a href="https://github.com/xieranmaya/blog/issues/3" target="_blank" rel="noreferrer">剖析 Promise 内部结构，一步一步实现一个完整的、能通过所有 Test case 的 Promise 类</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&amp;mid=2451046472&amp;idx=1&amp;sn=308e85ae3a92dd81c1943d12f4e9d128&amp;chksm=87c41958b0b3904e962e6df6788ee8f66947da90066f700db0e25f59b21e12bd620121714efb&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1571791544493&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">Promise 链式调用顺序引发的思考</a></li><li><a href="https://www.kancloud.cn/kancloud/promises-book/44251" target="_blank" rel="noreferrer">JavaScript Promise 迷你书</a></li><li><a href="https://juejin.cn/post/6844903972008886279" target="_blank" rel="noreferrer">Promise 链式调用顺序引发的思考</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651234151&amp;idx=1&amp;sn=6292156c16e851d8d5f1dbccdfc82a74&amp;chksm=bd4946e38a3ecff561bef99277e0f1ad5ec7f7014437aa100cb01e872eee80985adb04734b11&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1570493248167&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">100 行代码实现 Promises/A+ 规范</a></li><li><a href="https://segmentfault.com/a/1190000016550260" target="_blank" rel="noreferrer">从 0 到 1 实现 Promise</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=Mzg3MTU4NTI3OA==&amp;mid=2247488564&amp;idx=1&amp;sn=064273a79002be92454954f0973c86ce&amp;source=41#wechat_redirect" target="_blank" rel="noreferrer">要就来 45 道 Promise 面试题一次爽到底(1.1w 字用心整理)</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&amp;mid=2247490644&amp;idx=1&amp;sn=4caa938b2f3d123fad848c3edb0a7b28&amp;source=41#wechat_redirect" target="_blank" rel="noreferrer">高级异步模式 - Promise 单例</a></li><li><a href="https://mp.weixin.qq.com/s/BlD9HgXM9hqRGf3Ep9UYEw" target="_blank" rel="noreferrer">Promise 原理&amp;宏微任务</a></li><li><a href="https://juejin.cn/post/6945319439772434469" target="_blank" rel="noreferrer">从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节</a></li><li><a href="https://mp.weixin.qq.com/s/pELnbmQkpsz2LmIQBnSeQQ" target="_blank" rel="noreferrer">这次彻底搞懂 Promise</a></li></ul>`,57),o=[e];function r(t,c,i,y,F,D){return a(),n("div",null,o)}const b=s(p,[["render",r]]);export{A as __pageData,b as default};