import{_ as s,c as a,o as n,d as p}from"./app.590c1fbf.js";const F=JSON.parse('{"title":"一切皆对象","description":"","frontmatter":{},"headers":[{"level":2,"title":"基本包装类型","slug":"基本包装类型","link":"#基本包装类型","children":[]},{"level":2,"title":"JavaScript 中一切都是对象？","slug":"javascript-中一切都是对象","link":"#javascript-中一切都是对象","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"JavaScript/一切皆对象.md"}'),l={name:"JavaScript/一切皆对象.md"},e=p(`<h1 id="一切皆对象" tabindex="-1">一切皆对象 <a class="header-anchor" href="#一切皆对象" aria-hidden="true">#</a></h1><p>先来看一句有争议的话——&quot;在 JavaScript 中，一切皆对象。理解了对象，就能理解 JavaScript&quot;</p><p>你觉得这句话是对是错，为什么？其实在知乎上就曾有人提过一个问题——<a href="https://www.zhihu.com/question/264157543" target="_blank" rel="noreferrer">如何理解javascript中一切都是对象？</a></p><p>我们不妨先放一放，在文末笔者会给出自己的答案，如想看答案可直接划到文末查看</p><p>在前文 <a href="./JavaScript由什么组成.html">JavaScript由什么组成</a>，笔者曾一句带过：</p><blockquote><p>引用类型是 object（一组属性的集合）</p></blockquote><p>而这个 object 包括什么，前文中的案例中出现的 Function、Array 之流又属于什么？</p><p>这里引用两本书和MDN中的内容，并结合下给它下个定性：</p><p>按照《JavaScript 高级编程第四版》（后文简写高程四）中的说法：</p><p>引用类型包括：Object、Array、定型数组（typed array）、Date、RegExp、Function、基本包装类型（String、Number、Boolean）、单体内置对象（Global、Math）、ES6新增引用类型（Map、WeakMap、Set 、WeakSet）</p><p>而在<a href="./../Read/book/JavaScript启示录.html">《JavaScript启示录》</a>中，则给出 9 个原生（或内置）对象构造函数，String、Number、Boolean、Object、Array、Function、Date、RegExp、Error</p><p>而 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects" target="_blank" rel="noreferrer">MDN</a> 更全面，不仅有值属性（NaN、undefined）、函数属性（eval、isNaN、parseFloat、encodeURI）、基本对象（Object、Function、Boolean、Symbol）、错误对象（Error、TypeError、ReferenceError）、数字和日期对象（Number、BigInt、Math、Date）、字符串（String、RegExp）、可索引的集合对象（Array）、使用键的结合对象（Map、Set、WeakMap、WeakSet）、结构化数据（ArrayBuffer、JSON）、控制抽象对象（Promise、Generator）、放射（Reflect、Proxy）、国际化（Int1）、WebAssembly、arguments等等</p><p>个人认为MDN上的内容可以当字典来查看，而对外（面试）可以以高程四为标准解释</p><p>等等等等</p><p>不是说引用类型就指 object（对象）吗，为什么还包括这些东西，它们不是内置对象吗？</p><p>对象~~</p><p>内置对象~~</p><p>难道说对象包括内置对象？</p><p>所以MDN才说：对象（object）是指内存中的可以被标识符引用的一块区域</p><p>高程四才说：ECMA-262 将对象定义为一组属性的无需组合。可以把 ECMAScript 的对象想象成一张散列表，其中的内存就是一组名/值对，值可以是数据或者函数</p><p>所以 JavaScript 中的对象包含内置对象（或者说对象由内置对象和自定义对象组成）</p><p>由于「原型」、「继承」等更底层的设计，对象是&quot;始祖巨人&quot;。基于它，String、Number、Boolean、Array、Function、Date、RegExp、Error 等等以各自特性成一构造函数，当然不知它们，还有很多其他的内置对象</p><p><img src="https://s2.loli.net/2022/08/08/J5uiTjLNm7DRtIW.png" alt="内置对象"></p><p>后来，笔者在看<a href="./../Read/book/JavaScript权威指南.html">《JavaScript权威指南(第6版)》</a>时看到这一解释：</p><blockquote><p>以下术语来区分三类 JavaScript 对象和两类属性</p><ul><li>内置对象（native object）是由 ECMAScript 规范定义的对象或类。例如，数组、函数、日期和正则表达式都是内置对象</li><li>宿主对象（host object）是由 JavaScript 解释器所嵌入的宿主环境（比如 Web 浏览器）定义的</li><li>自定义对象（user-defined object）是由运行中的 JavaScript 代码创建的对象</li><li>自有属性（own property）是直接在对象中定义的属性</li><li>继承属性（inherited property）是在对象的原型对象中定义的属性</li></ul></blockquote><p>所以说 JavaScript 中的「对象」很厉害，大多数元素都是基于「对象」构建。其中像 Object、Function、Array 之类比较重要，后续会对其介绍。单体内置对象和其他内置函数不做介绍，ES6新增的 Map、Set、WeakMap、WeakSet可以<a href="./../ES6/Map&amp;Set.html">这篇文章</a>中了解一二，这里我们先讲讲基本包装类型</p><h2 id="基本包装类型" tabindex="-1">基本包装类型 <a class="header-anchor" href="#基本包装类型" aria-hidden="true">#</a></h2><p>基本包装类型包括： String、Number、Boolean，它和基本类型中的 string、number、boolean 有什么区别</p><p>先看一下以下代码：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> string1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> string2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">String</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> number1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> number2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Number</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">10</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> boolean1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> boolean2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Boolean</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">true</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> string1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> string2)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出 &#39;string, string&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> number1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> number2)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出 &#39;number, number&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> boolean1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> boolean2)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出 &#39;boolean, boolean&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 如果使用创建对象的构造函数和new关键字</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> myString </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">String</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">male</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> myNumber </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Number</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">23</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> myBoolean </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Boolean</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> myString</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> myNumber</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> myBoolean)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// object, object, object</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>我们看到如果使用字面量语法创建值，<strong>数据类型的输出结果是基本类型</strong></p><p>如果使用 new 关键字创建 String()、Number()、Boolean() 值时，<strong>创建的对象实际上是一个对象（引用类型）</strong></p><p>这说明 new 关键字做了一些手脚，具体可以在这篇 [new 改变了对象](./new <a href="http://xn--ykq92ko5ht1jdl3c.md" target="_blank" rel="noreferrer">改变了对象.md</a>) 查看一二</p><p>还看出无论是字面量创建值还是不带 new 调用基本包装类型，它们都会转换为其相对应的类型</p><p>再看看这个例子</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> str </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(str</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUpperCase</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// HELLO</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>一个基本类型为什么会有 toUpperCase 这个方法，它既然是基本类型，那就是一个字符串，为什么会有方法呢？方法从何而来？</p><p>高程四的解释是：</p><blockquote><p>在以读模式访问字符串值的任何时候，后台都会执行以下3步：</p><ol><li>创建一个 String 类型的实例；</li><li>调用实例上的特定方法</li><li>销毁实例</li></ol><p>可以把这 3 步想象成执行了如下 3 行 ECMAScript 代码：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">String</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">some text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> s2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">substring</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></blockquote><p><a href="https://zh.javascript.info/primitives-methods" target="_blank" rel="noreferrer">JavaScript Info </a>给出的解答是：</p><blockquote><p>以下是 JavaScript 创建者面临的悖论：</p><ul><li>人们可能想对诸如字符串或数字之类的原始类型执行很多操作。最好使用方法来访问它们。</li><li>原始类型必须尽可能的简单轻量。</li></ul><p>而解决方案看起来多少有点尴尬，如下：</p><ol><li>原始类型仍然是原始的。与预期相同，提供单个值</li><li>JavaScript 允许访问字符串，数字，布尔值和 symbol 的方法和属性。</li><li>为了使它们起作用，创建了提供额外功能的特殊“对象包装器”，使用后即被销毁。</li></ol><p>“对象包装器”对于每种原始类型都是不同的，它们被称为 <code>String</code>、<code>Number</code>、<code>Boolean</code>、<code>Symbol</code> 和 <code>BigInt</code>。因此，它们提供了不同的方法。</p></blockquote><p>两则都给出了一个答案：</p><p>在调用字符串、数字之类的基本类型类型时，ECMAScript 引擎会以基本包装类型为构造函数，创建一个基于它的实例，调用完后，得到生成的结果，删除调用时的实例</p><p>所以也解释了虽然它们是基本类型，却能调用各种原型方法</p><p>也体现了个别类型既要又要的特殊场景（既要轻量占内存小，又要有方便的方法），而这一切是为了提高性能</p><h2 id="javascript-中一切都是对象" tabindex="-1">JavaScript 中一切都是对象？ <a class="header-anchor" href="#javascript-中一切都是对象" aria-hidden="true">#</a></h2><p>回到开头说的：如何理解 JavaScript 中一切都是对象？</p><p>笔者的回答是：</p><p>不能说一切，但是基本不差</p><p>JavaScript 按数据类型分，分为原始类型和引用类型。原始类型又被成为原始值，它包括 string，number，boolean，null，undefined，symbol，bigint；而引用类型则是对象，其对象分为内置对象、宿主对象、自定义对象。内置对象中有 Object、Array、定型数组（typed array）、Date、RegExp、Function、基本包装类型（String、Number、Boolean）、单体内置对象（Global、Math）、ES6新增引用类型（Map、WeakMap、Set 、WeakSet）等等，更详细的可查看 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects" target="_blank" rel="noreferrer">MDN</a></p><p>你写的代码除了基本类型外，都是对象，而基本类型中的 string、number、boolean、symbol、bigInt 又和基本包装类型有了调用原型方法后删除实例的关系。简单来说，它们既享受了基本类型的轻量占内存小，又获得了调用内置构造函数的各种原型方法</p><p>基本类型中，除了 null、undefined，其余的都与对象有关，而引用类型就是指对象，所以说 JavaScript 中的一切都是对象，大致上是正确的</p><p>缘起性空，下一节，去看看对象中的内置构造函数—— <a href="./Object.html">Object</a></p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li>JavaScript高级程序编程第四版</li><li>JavaScript权威指南</li><li>JavaScript启示录</li><li><a href="https://developer.mozilla.org/" target="_blank" rel="noreferrer">MDN</a></li><li><a href="https://zh.javascript.info/" target="_blank" rel="noreferrer">现代 JavaScript 教程</a></li></ul>`,55),o=[e];function r(t,c,i,y,D,A){return n(),a("div",null,o)}const b=s(l,[["render",r]]);export{F as __pageData,b as default};
