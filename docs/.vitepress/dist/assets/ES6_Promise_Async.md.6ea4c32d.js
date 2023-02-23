import{_ as e,c as a,o as r,d as c}from"./app.590c1fbf.js";const b=JSON.parse('{"title":"Async & Await","description":"","frontmatter":{},"headers":[{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"ES6/Promise/Async.md"}'),s={name:"ES6/Promise/Async.md"},i=c('<h1 id="async-await" tabindex="-1">Async &amp; Await <a class="header-anchor" href="#async-await" aria-hidden="true">#</a></h1><p>一句话：</p><p>一异步迭代器</p><p>async 是 generator 和 promise 的语法糖，利用迭代器的状态机和 promise 来进行自更新!</p><p>async 是 Generator 函数的语法糖，并对 Generator 函数进行了改进。</p><p>async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。可以说 async 是 Generator 函数的语法糖，并对 Generator 函数进行了改进。</p><p>async 函数对 Generator 函数的改进，体现在以下四点：</p><ol><li><code>内置执行器</code>。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next() 方法。</li><li><code>更好的语义</code>。async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。</li><li><code>更广的适用性</code>。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。</li><li><code>返回值是 Promise</code>。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用。</li></ol><ul><li><code>await</code> 只能用在 <code>async</code> 关键词的函数中</li><li><code>async</code> 函数返回一个 <code>Promise</code></li><li><code>async/await</code> 相当于封装了 <code>Promise</code></li></ul><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="https://mp.weixin.qq.com/s?__biz=MjM5NTk4MDA1MA==&amp;mid=2458073291&amp;idx=2&amp;sn=65b3daf551627d9e72b2a48d379f3c6a&amp;chksm=b187aeb686f027a0b6243c6e3f3b6d86c0b0dea28e7040d997a975716ad1ed9a260abca05112&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1583798306222&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">async 原理解析</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&amp;mid=2247484739&amp;idx=1&amp;sn=81b9231c68d6f7796688171922bda822&amp;chksm=ea01662fdd76ef39825d1254d91943949626dce6aecd25cd1eaa47ad2c310036cd7855b2e5bb&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1572996601651&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">async/await 原理及执行顺序分析</a></li><li><a href="https://mp.weixin.qq.com/s/pHg2CGZocb2-2djnF_pPBg" target="_blank" rel="noreferrer">面试官: 说说你对 async 的理解</a></li></ul>',11),d=[i];function o(n,t,p,m,l,_){return r(),a("div",null,d)}const f=e(s,[["render",o]]);export{b as __pageData,f as default};
