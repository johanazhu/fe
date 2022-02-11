<template><h1 id="页面渲染层面" tabindex="-1"><a class="header-anchor" href="#页面渲染层面" aria-hidden="true">#</a> 页面渲染层面</h1>
<p>html dom树，css cssom树 defer async等等 遇到js，preload以及 prefetch 并发加载
重绘和回流
浏览器缓存</p>
<p>页面渲染阶段</p>
<ul>
<li>css在上、js在下</li>
<li>加载css推荐用link少用 @import
<ul>
<li>link 属于 html，@import 属于 css，需写在样式表开头</li>
<li>@import 是 css2.1 才出现的概念</li>
<li>当 html 文件被加载时，link 引用的文件会同时被加载，而@import 引用的文件则会等页面全部下载完毕再被加载</li>
</ul>
</li>
<li>不重要的外置引入的js使用defer或者async属性异步加载</li>
</ul>
<p><code>script</code> 特性（attribute）可以为我们解决延迟问题：<code>defer</code> 和 <code>async</code></p>
<h3 id="defer" tabindex="-1"><a class="header-anchor" href="#defer" aria-hidden="true">#</a> defer</h3>
<p><code>defer</code> 特性告诉浏览器不要等待脚本。相反，浏览器将继续处理HTML，构建 DOM。脚本会“在后台”下载，然后等 DOM 构建完成后，脚本才会执行</p>
<p>换句话说：</p>
<ul>
<li>具有 <code>defer</code> 特性的脚本不会阻塞页面</li>
<li>具有 <code>defer</code> 特性的脚本总是要等到 DOM 解析完毕，但在 <code>DOMContentLoaded</code> 事件之前执行</li>
</ul>
<p>下面这个示例演示了上面所说的第二句话：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>...content before scripts...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'DOMContentLoaded'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"DOM ready after defer!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">defer</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://javascript.info/article/script-async-defer/long.js?speed=1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>...content after scripts...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ol>
<li>页面内容立即现实</li>
<li><code>DOMContentLoaded</code> 事件处理程序等待具有<code>defer</code> 特性的脚本执行完成。它仅在脚本下载且执行结束后才会被触发</li>
</ol>
<p><strong>具有 <code>defer</code> 特性的脚本保持其相对顺序，就像常规脚本一样。</strong></p>
<p><strong><code>defer</code> 特性仅适用于外部脚本</strong></p>
<p>如果 <code>&lt;script&gt;</code> 脚本没有 <code>src</code>，则会忽略 <code>defer</code> 特性。</p>
<h3 id="async" tabindex="-1"><a class="header-anchor" href="#async" aria-hidden="true">#</a> async</h3>
<p><code>async</code> 特性与 <code>defer</code> 有些类似。它也能够让脚本不阻塞页面，但是，在行为上二者有着重要的区别</p>
<p><code>async</code> 特性意味着脚本是完成独立的</p>
<ul>
<li>浏览器不会因 <code>async </code> 脚本而阻塞（与 <code>defer</code> 类似）</li>
<li>其他脚本不会等待 <code>async</code> 脚本加载完成，同样，<code>async</code> 脚本也不会等待其他脚本</li>
<li><code>DOMContentLoaded</code> 可能会发生在异步脚本之前（如果异步脚本在页面完成后才加载完成）</li>
<li><code>DOMContentLoaded</code> 也可能发生在异步脚本之后（如果异步脚本很短，或者是从 HTTP 缓存中加载的）</li>
</ul>
<p>换句话说，<code>async</code> 脚本会在后台加载，并在加载就绪时运行。DOM和其他脚本不会等待它们，它们也不会等待其他的东西。<code>async</code> 脚本就是一个会在加载完成时执行的完全独立的脚本</p>
<h3 id="动态脚本" tabindex="-1"><a class="header-anchor" href="#动态脚本" aria-hidden="true">#</a> 动态脚本</h3>
<p>我们可以使用 JavaScript 动态地创建一个脚本，并将其插入（append）到文档（document）中：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'script'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
script<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">"/article/script-async-defer/long.js"</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// (*)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>默认情况下，动态脚本的行为是“异步”的。</strong></p>
<p>也就是说：</p>
<ul>
<li>它们不会等待任何东西，也没有上面东西会等它们</li>
<li>先加载完成的脚本先执行（“加载优先”顺序）</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p><code>async</code> 和 <code>defer</code> 有一个共同点：加载这样的脚本都不会阻塞页面的渲染。因此，用户可以立即圆度并了解页面内容。但是，它们之前也存在一些本质的区别：</p>
<table>
<thead>
<tr>
<th></th>
<th>顺序</th>
<th>DOMContnetLoaded</th>
</tr>
</thead>
<tbody>
<tr>
<td>async</td>
<td>加载优先顺序。脚本在文档中的顺序不重要——先加载完成的先执行</td>
<td>不相关。可能在文档加载完成前加载并执行完毕。如果脚本很小或者来自缓存，同时文档足够长，就会发生这种情况</td>
</tr>
<tr>
<td>defer</td>
<td>文档顺序（它们在文档中的顺序）</td>
<td>在文档加载和解析完成之后（如果需要，则会等待），即在<code>DOMContentLoaded</code> 之前执行</td>
</tr>
</tbody>
</table>
<p>在实际开发中，<code>defer</code> 用于需要整个 DOM 的脚本，脚本的相对执行顺序很重要的时候使用</p>
<p><code>async</code> 用于独立脚本，例如计数器或广告，这些脚本的相对执行顺序无关紧要</p>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>
<p><a href="https://zh.javascript.info/script-async-defer" target="_blank" rel="noopener noreferrer">脚本：async，defer<ExternalLinkIcon/></a></p>
</template>
