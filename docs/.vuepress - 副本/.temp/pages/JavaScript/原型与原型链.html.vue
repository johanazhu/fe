<template><h1 id="原型与原型链" tabindex="-1"><a class="header-anchor" href="#原型与原型链" aria-hidden="true">#</a> 原型与原型链</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>本章会介绍如下内容：</p>
<ul>
<li>什么是原型和原型链</li>
<li><code>prototype</code> 和 <code>__proto__</code> 有什么区别</li>
<li><code>new</code> 和 <code>Object.create()</code> 创建对象和实现继承的区别</li>
</ul>
<h2 id="原型" tabindex="-1"><a class="header-anchor" href="#原型" aria-hidden="true">#</a> 原型</h2>
<p>prototype（原型） 被定义为：给其他对象提供共享属性的对象</p>
<p>如果将 constructor 函数的 prototype 改名为 properties。问题可能少很多。或者进一步简写成 props，理解上将更加简单。不就是 new Constructor 时，自带了它的 Constructor.props 对象嘛</p>
<p>基于 prototype 的继承，可以继承数据、结构和行为三者</p>
<p>原型对象：实际上说的是 XX 对象的原型对象</p>
<p><strong>在JS中每个函数都有一个 prototype 属性，它实际指向的是一个 prototype 对象</strong>，比如有一个函数 Foo，我们来看看 Foo.prototype 这个对象里到底有什么：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>

<span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'johan'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>输出结果为：</p>
<p><img src="https://i.loli.net/2021/06/24/jVKFDOt3fahU96X.png" alt="image-20210624134318726"></p>
<p>我们可以看到，整个 prototype 对象就有两个属性，一个是 constructor，一个是 <code>__proto__</code>；constructor 是构造函数，<code>__proto__</code> 是 Object，Foo 的 prototype 就是 Object</p>
<blockquote>
<p>每一个 JavaScript 对象（除了 null）都具有一个属性，叫 <strong>proto</strong>，这个属性会指向该对象的原型</p>
</blockquote>
<p>PS：函数也是对象，也有 <code>__proto__</code> 属性</p>
<h2 id="原型链" tabindex="-1"><a class="header-anchor" href="#原型链" aria-hidden="true">#</a> 原型链</h2>
<p>高程四</p>
<blockquote>
<p>重温一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针（<code>__proto__</code>）指向原型。如果原型是另一个类型的实例呢？那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。这就是原型链的基本构想</p>
</blockquote>
<p>木易杨</p>
<blockquote>
<p>每个对象拥有一个原型对象，通过 <code>__proto__</code> 指针指向上一个原型，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向<code>null</code>。这种关系被称为原型链</p>
</blockquote>
<p>本质就是链表</p>
<p>为什么会有原型链为什么有一些库会把方法写到原型链上，这是因为每一个实例的这个方法都是一样的，在实例调用该方法时，可以通过原型（XXX.prototype）找到，而不需要每次实例化都新创建一个XX方法，这个节省内存，显然更合理。
那么什么是原型，什么又叫原型链？他们和继承又有什么关系？Class和他们是什么关系？</p>
<p>js中如何查看原型</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>__proto__<span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

__proto__ 是 chrome 浏览器提供的（可以理解为厂商提供）
getPrototypeOf <span class="token constant">ES5</span> 中增加的方法
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>内置对象Function的原型上默认有哪些属性和对象</p>
<p><code>Function</code> 对象继承自 Function.prototype</p>
<h3 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性</h3>
<p><code>Function.arguments</code> 	以数组形式获取传入函数的所有参数，此属性已被 <code>arguments</code> 替代</p>
<p><code>Function.caller</code> 获取调用函数的具体对象</p>
<p><code>Function.length</code> 获取函数的接受参数个数</p>
<p><code>Function.name</code> 获取函数的名称</p>
<p><code>Function.displayName</code> 获取函数的 display name</p>
<p><code>Function.prototype.constructor</code> 声明函数的原型构造方法</p>
<h3 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h3>
<p><strong><code>Function.prototype.apply()</code> apply 的继承来源自 Function</strong></p>
<p><strong><code>Function.prototype.bind()</code> bind 的继承也来源自 Function</strong></p>
<p><strong><code>Function.prototype.call()</code> call 的继承也是源自 Function</strong></p>
<p><code>Function.prototype.toString()</code> 获取函数的视线源码的字符串，覆盖了<code>Object.prototype.toString</code></p>
<p><strong>对象分为函数对象和普通对象。所谓的函数对象，其实就是 JavaScript用函数来模式的类实现</strong></p>
<p>JavaScript 中的 Object 和 Function 就是典型的函数对象。</p>
<h2 id="proto" tabindex="-1"><a class="header-anchor" href="#proto" aria-hidden="true">#</a> <code>_proto_</code></h2>
<p>首先我们需要明确两点： <code>__proto__</code> 和 <code>constructor</code> 是<strong>对象</strong>独有的。而 <code>prototype</code> 属性是<strong>函数</strong>独有的</p>
<p><code>__proto__</code> 是 <code>[[Prototype]]</code> 的因历史原因而留下来的 getter/setter</p>
<p><code>__proto__</code> 属性有点过时了，它的存在是出于历史的原因，现代编程预约建议我们应该使用函数<code>Object.getPrototypeOf/Object.setPrototypeOf</code> 来取代 <code>__proto__</code> 去 get/set 原型</p>
<p>prototype 是构造函数的属性，而 <code>__proto__</code> 是对象的属性</p>
<h2 id="new-vs-object-create" tabindex="-1"><a class="header-anchor" href="#new-vs-object-create" aria-hidden="true">#</a> new VS Object.create()</h2>
<p>new 是隐形继承</p>
<p>Object.create() 是显形继承</p>
<h2 id="面试题" tabindex="-1"><a class="header-anchor" href="#面试题" aria-hidden="true">#</a> 面试题</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">A</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token constant">B</span><span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">A</span><span class="token punctuation">.</span>prototype

b<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">B</span><span class="token punctuation">.</span>prototype
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>https://zhuanlan.zhihu.com/p/356980105</p>
<p>https://segmentfault.com/a/1190000011801127?v=20171103</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://limeii.github.io/2019/05/js-prototype/" target="_blank" rel="noopener noreferrer">JS：深入理解JavaScript-原型<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzA4Njc2MTE3Ng==&amp;mid=2456151505&amp;idx=1&amp;sn=07de1105b4779510444703d3cca52336&amp;chksm=88528e66bf2507701f2593b03eea15809de54054ea8aa3bd40a174773065c577782a4849463e&amp;mpshare=1&amp;scene=1&amp;srcid=0309uLjOLfJNRzjKNAZhU0cv&amp;sharer_sharetime=1615281032709&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&amp;key=c04e2b9ed744a6145f96a45d0f35feed9b31918fdaebb7da9d1fd16c9d835a875f6df79abf4c5060a78c79e677bc095578be94a64cffb0982adb1f3a5654ab5df8b9deec7424e3e9f4969fd99998ca75b5dfeed2a07fbba4bb46d2db7a6ed09048890bc737c545987956f30d638455a420543b85ce62544a7453eaed0ccb5179&amp;ascene=1&amp;uin=MTA0NTY0NDM2MQ%3D%3D&amp;devicetype=Windows+10+x64&amp;version=62090070&amp;lang=zh_CN&amp;exportkey=ARSsSQ56FpBr7dPsNSJf4hM%3D&amp;pass_ticket=x4jvdfIuLwC89CyvjbvfIU1MWevsFYaIGHAG4pfEH%2FSqHCoWE00Ac0tHo69Gk3MB&amp;wx_header=0" target="_blank" rel="noopener noreferrer">深入理解 JavaScript 原型<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzA3MzA5MDY2NA==&amp;mid=2247486446&amp;idx=1&amp;sn=6c2bbf90fc85e35c1cc9c8845ee8d028&amp;chksm=9f1518e9a86291ff411acf855539c7e859bf79e2dfb9a1f093ece57c0e408386ae10192d89bd&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1585111588911&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">2020面试收获 - js原型及原型链<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzA5MTI0ODUzNQ==&amp;mid=2652951300&amp;idx=1&amp;sn=e60266b2ad0976ec041669357ef8fec4&amp;chksm=8bab31fcbcdcb8ea204b14cc257335a7800d576b96f27392a4a35e3efac886e8d9948f0ce97f&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1575797254136&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">你还没学会JavaScript原型和原型链吗？<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&amp;mid=2650590695&amp;idx=1&amp;sn=d6cfd8c2b7d87ec26a99a738f9ca825e&amp;chksm=8891ddc3bfe654d5c977127f94248d3d280d04f6a5dc38b2da3eeb54e89f05ee0d5a854bf870&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1575108712052&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">深入浅出 JavaScript 原型链<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&amp;mid=2247484388&amp;idx=1&amp;sn=8f71421cfe2490284739ec9a41d3117c&amp;chksm=9782cd6da0f5447b6e7c41fa1264127210064f9b80cc0848bb55af0ce450fb5cf76988ec2081&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1572511539484&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">【THE LAST TIME】一文吃透所有JS原型相关知识点<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
