<template><h1 id="执行上下文与调用栈" tabindex="-1"><a class="header-anchor" href="#执行上下文与调用栈" aria-hidden="true">#</a> 执行上下文与调用栈</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>在说一个概念前，我们需要确定它的前提，此文以ECMAScript5为基础撰写</p>
<h2 id="一句话解释" tabindex="-1"><a class="header-anchor" href="#一句话解释" aria-hidden="true">#</a> 一句话解释</h2>
<p>执行上下文就是一段代码执行时所带的所有信息</p>
<h2 id="执行上下文是什么" tabindex="-1"><a class="header-anchor" href="#执行上下文是什么" aria-hidden="true">#</a> 执行上下文是什么</h2>
<p>《重学前端》的作者winter 曾经对什么是执行上下文做过这样的解释：</p>
<blockquote>
<p>JavaScript标准把一段代码（包括函数），执行所需的所有信息定义为：“执行上下文</p>
</blockquote>
<p>并且他整理出在不同ECMAScript版本中执行上下文所代表的含义，</p>
<blockquote>
<p><strong>执行上下文在ES3中</strong>，包含三个部分。</p>
<ul>
<li>scope：作用域，也常常被叫做作用域链</li>
<li>variable object：变量对象，用来存储变量的对象</li>
<li>this value： this值</li>
</ul>
<p><strong>在ES5中</strong>，我们改进了命名方式，把执行上下文最初的三个部分改成下面这个样子</p>
<ul>
<li>lexical environment：词法环境，当获取变量时使用</li>
<li>variable environment：变量环境，当声明变量时使用</li>
<li>this value： this值</li>
</ul>
<p><strong>在ES2018中</strong>，执行上下文又变成了这个样子，this值被归入 lexical environment，但是增加了不少内容</p>
<ul>
<li>lexical environment：词法环境，当获取变量或者this值时使用</li>
<li>variable environment：变量环境，当声明变量时使用</li>
<li>code evaluation state: 用于恢复代码执行位置</li>
<li>Function：执行的任务是函数时使用，表示正在被执行的函数</li>
<li>ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码</li>
<li>Realm：使用的基础库和内置对象实力</li>
<li>Generator：仅生成器上下文有这个属性，表示当前生成器</li>
</ul>
</blockquote>
<p>总结的很完整，按照 <code>选新不选旧</code> 原则，本文应该以 ES2021为切入点展开，最次也要 ES2018，但主流的解释执行上下文都以 ES3 为例，权衡之后，笔者将以 ES5 为基础撰写执行上下文，并在后续补充说明 ES3 中的执行上下文</p>
<h2 id="执行生命周期" tabindex="-1"><a class="header-anchor" href="#执行生命周期" aria-hidden="true">#</a> 执行生命周期</h2>
<p>我们在讲 <RouterLink to="/JavaScript/%E8%AF%8D%E6%B3%95%E7%8E%AF%E5%A2%83.html">词法环境</RouterLink> 时，曾经画过一张执行生命周期图，当时所讲的词法环境是在<strong>编译阶段</strong>产生，现在讲的执行上下文是在引擎<strong>执行阶段</strong>进行。</p>
<p>一段代码如果要执行，首先会往调用栈（call stack）中压入全局执行上下文；再创建词法环境，此时变量该提升提升，函数该提升提升，并将这些变量登记到词法环境中（编译阶段）；接着进入执行阶段，执行可执行代码，该赋值赋值，遇到函数，就创建一个函数执行上下文，并往调用栈中压入该函数的执行上下文；而后创建该函数的词法环境，当该函数执行完后，从调用栈中弹出；反复循环，到最后调用栈中只剩一个全局执行上下文，除非你关闭浏览器，不然全局执行上下文不会弹出</p>
<p>我们要往调用栈中压入执行上下文，调用栈的数据结构为 <code>栈</code> 。特点为先进后出。</p>
<p>如果我们的代码是这样的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>那么执行过程应该是这样：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/执行上下文周期.png" alt="执行上下文-example"></p>
<p>图中的蓝色方块为 <code>执行上下文</code> ，外面黑框白底的区域就是模拟 <code>调用栈</code>。整个过程遵循先进后出的原则</p>
<ul>
<li>在任何代码执行之前，先创建全局执行上下文，并往调用栈中压栈（编译阶段）</li>
<li>创建词法环境，登记函数声明和变量声明（编译阶段）</li>
<li>引擎执行到 <code>baz()</code> ，创建 <code>baz()</code> 的函数执行上下文，并往调用栈中压栈</li>
<li>函数 <code>baz()</code> 调用 <code>foo()</code> ，创建 <code>foo()</code> 执行上下文，并将其压入调用栈中，</li>
<li>函数 <code>foo()</code> 调用 <code>bar()</code> ，创建<code>bar()</code> 执行上下文，并将其压入调用栈，</li>
<li>函数 <code>bar()</code> 执行<code>console.log()</code> ，同理将其压入调用栈，</li>
<li>执行完<code>console.log()</code>后，被弹出</li>
<li>函数 <code>bar()</code> 执行完毕，弹出调用栈</li>
<li>函数 <code>foo()</code> 也执行完毕，弹出调用栈</li>
<li>函数 <code>baz()</code> 同样执行完毕，弹出调用栈</li>
</ul>
<p>只剩下全局执行上下文，留在栈底</p>
<p>在这里，我们看到 <code>console.log()</code> 也被压入到执行栈中，不禁有个思考，哪些代码元素会被执行到调用栈中呢？</p>
<h2 id="可执行代码" tabindex="-1"><a class="header-anchor" href="#可执行代码" aria-hidden="true">#</a> 可执行代码</h2>
<p>事实上，不仅仅是 function 可以作为执行上下文在执行栈中运行，在 JavaScript 里定义了四种可执行代码：</p>
<ul>
<li>global code：整个 js 文件</li>
<li>function code：函数代码</li>
<li>module：模块代码</li>
<li>eval code：放在 eval 的代码</li>
</ul>
<p>所以才会看到 <code>console.log()</code> 被压入调用栈中，因为它属于 global code</p>
<h2 id="执行步骤" tabindex="-1"><a class="header-anchor" href="#执行步骤" aria-hidden="true">#</a> 执行步骤</h2>
<p>JS 引擎室按照可执行代码来执行代码的，每次执行步骤如下：</p>
<ol>
<li>创建一个新的执行上下文（Execution Context）</li>
<li>创建一个新的词法环境（Lexical Environment）</li>
<li>把 LexicalEnvironment 和 VariableEnvironment 指向新创建的词法环境</li>
<li>把这个执行上下文压入执行栈并成为正在运行的执行上下文</li>
<li>执行代码</li>
<li>执行结束后，把这个执行上下文弹出执行栈</li>
</ol>
<h2 id="如何创建执行上下文" tabindex="-1"><a class="header-anchor" href="#如何创建执行上下文" aria-hidden="true">#</a> 如何创建执行上下文</h2>
<p>到现在，我们已经知道 JavaScript 是如何管理执行上下文的，现在让我们了解一下 JavaScript 引擎是怎样创建执行上下文的</p>
<p>创建执行上下文有两个阶段：<strong>1) 创建阶段</strong> 和 <strong>2) 执行阶段</strong></p>
<h2 id="创建阶段" tabindex="-1"><a class="header-anchor" href="#创建阶段" aria-hidden="true">#</a> 创建阶段</h2>
<p>在 JavaScript 代码执行前，执行上下文将经历创建阶段。在创建阶段会发生以下三件事：</p>
<ul>
<li>
<p><strong>this</strong> 值的确定，即我们所熟知的 <strong>this 绑定</strong>。</p>
</li>
<li>
<p>创建<strong>词法环境组件（LexicalEnvironment component ）</strong></p>
</li>
<li>
<p>创建<strong>变量环境组件（VariableEnvironment component ）</strong></p>
</li>
</ul>
<p>所以执行上下文在概念上表示如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ExecutionContext <span class="token operator">=</span> <span class="token punctuation">{</span>
    ThisBinding <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token keyword">this</span> value<span class="token operator">></span><span class="token punctuation">,</span>
    LexicalEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    VariableEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这里需要再多嘴一句：</p>
<p>在很多文章中我们看到 执行上下文 只有 LexicalEnvironment 和 VariableEnvironment ，并没有this。那是因为在 ES2018 后，this 就归纳到 LexicalEnvironment （如上文winter所说），但本文是以 ES5 为基础撰写，故此版本的执行上下文中是有 this 的</p>
<h3 id="this-绑定" tabindex="-1"><a class="header-anchor" href="#this-绑定" aria-hidden="true">#</a> this 绑定</h3>
<p>this的指向很简单，谁调用我，我只想谁</p>
<p>在执行上下文中，this 就指向那个调用者</p>
<h3 id="词法环境组件-和-变量环境组件" tabindex="-1"><a class="header-anchor" href="#词法环境组件-和-变量环境组件" aria-hidden="true">#</a> 词法环境组件 和 变量环境组件</h3>
<p>这两”姐妹“有点像，只是分工不同。</p>
<p><strong>变量环境组件（VariableEnvironment component ）</strong> 用来登记 <code>var</code> 、<code>function</code> 等变量声明</p>
<p><strong>词法环境组件（LexicalEnvironment component ）</strong> 用来登记 <code>let</code> 、<code>const</code>  、<code>class</code> 等变量声明</p>
<p>按上例可以这么画图：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/执行上下文的构成.png" alt="执行上下文-example"></p>
<p><code>LexicalEnvironment</code> 和 <code>VariableEnvironment</code> 则都是词法环境（Lexical Environment）。很多文章中常把 <code>LexicalEnvironment </code>  理解成 <strong><RouterLink to="/JavaScript/%E8%AF%8D%E6%B3%95%E7%8E%AF%E5%A2%83.html">词法环境</RouterLink></strong>，这是不对的，<code>LexicalEnvironment</code> 是一个单词，表示执行上下文中的是标识 <code>let</code> 、<code>const</code>  、<code>class</code> 等变量声明，而 <code>VariableEnvironment </code> 则是标识 <code>var</code> 、<code>function</code>  等变量声明</p>
<p>如果非要用中文来表示<code>LexicalEnvironment</code> 的话，我更愿意用 <strong>词法环境组件</strong> 来表示；同理，<code>VariableEnvironment</code> 则用 <strong>变量环境组件</strong> 来表示</p>
<p>对我而言，变量环境组件和词法环境组件就好比”装黄豆瓶“和”装绿豆瓶“，一个负责装黄豆（var，function），一个负责装绿豆（let，const，class），它们指向词法环境，本质是从词法环境中拿数据。</p>
<p>所以无论是词法环境组件还是变量环境组件，都有一个环境记录器和一个outer对象，其中环境记录器记录变量，outer指向父级作用域</p>
<p>具体可以看 <a href="https://262.ecma-international.org/6.0/" target="_blank" rel="noopener noreferrer">ECMAScript 6 标准中的第八节<ExternalLinkIcon/></a> 详细了解一下</p>
<p>回头看上述例子：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/执行上下文中的词法环境.png" alt="执行上下文-example"></p>
<p><code>bar()</code> 函数中的 <code>console.log(a)</code> ，本环境记录器中找不到，就引着 <code>outer</code> 找，在 window 中找到变量 a ，赋值后，弹出，<code>foo()</code> 执行完后也弹出，<code>baz()</code> 执行完弹出，留下全局执行上下文在栈底</p>
<p>之前在说 <RouterLink to="/JavaScript/%E8%AF%8D%E6%B3%95%E7%8E%AF%E5%A2%83.html">词法环境</RouterLink> 时，我们曾下过这样的定义：<strong>outer 就是指向词法环境的父级词法环境（作用域）</strong></p>
<p>但是本人有一点不是很明白，outer 既然指词法环境的父级作用域，那 <code>作用域链</code> 从那里来？</p>
<p>以上面的 demo 为例，bar 的执行上下文的伪代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>BarExecutionContext <span class="token operator">=</span> <span class="token punctuation">{</span>
    ThisBinding <span class="token operator">=</span> <span class="token operator">&lt;</span>Global Object<span class="token operator">></span><span class="token punctuation">,</span>
    LexicalEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span> 
   		EnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        outer<span class="token operator">:</span> <span class="token operator">&lt;</span>FooLexicalEnvironment<span class="token operator">></span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
    VariableEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span> 
        EnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        outer<span class="token operator">:</span> <span class="token operator">&lt;</span>FooLexicalEnvironment<span class="token operator">></span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>bar 的 outer 指向 <code>foo</code> 执行上下文， <code>foo</code> 的 outer 指向 window，变量先从当前执行作用域查找变量，如果找不到，就引着 outer 继续查找。这一过程中，bar作用域—foo作用域—window作用域。</p>
<p>当代码要访问一个变量时——首先会搜索当前词法环境，然后搜索外部环境，然后搜索更外部的环境，以此类推，直到全局词法环境。</p>
<p>而我们潜意识中的”作用域链“是在ES3中的才有的，因为那个时候的执行上下文中有scope（作用域），当前作用域找不到变量，就往外层作用域中找，然后再到更外层的作用域找，知道全局作用域，作用域与作用域之间以<strong>链表</strong>的形式连接着，这就是作用域链。</p>
<h2 id="执行上下文有几种" tabindex="-1"><a class="header-anchor" href="#执行上下文有几种" aria-hidden="true">#</a> 执行上下文有几种？</h2>
<p>分三种</p>
<ul>
<li>
<p>全局执行上下文</p>
</li>
<li>
<p>函数执行上下文</p>
</li>
<li>
<p>eval执行上下文</p>
</li>
</ul>
<h2 id="ecmascript3-中的执行上下文" tabindex="-1"><a class="header-anchor" href="#ecmascript3-中的执行上下文" aria-hidden="true">#</a> ECMAScript3 中的执行上下文</h2>
<p>如果你喜欢看有关执行上下文的文章，应该常看到这样的描述，执行上下文由变量对象（Variable object，VO）、作用域链（Scope chain） , this 构成。</p>
<p>其实我们可以把 变量对象（VO） 看成是 ES5 中的 词法环境，scope 为 词法环境中的 outer</p>
<h2 id="如何追踪执行上下文栈" tabindex="-1"><a class="header-anchor" href="#如何追踪执行上下文栈" aria-hidden="true">#</a> 如何追踪执行上下文栈</h2>
<p>例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">foo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">foo3</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">foo4</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">lg</span><span class="token punctuation">(</span><span class="token string">'foo4'</span><span class="token punctuation">)</span> 
<span class="token punctuation">}</span>
<span class="token function">foo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>得到错误提示如图：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/如何查看执行上下文栈.png" alt="执行上下文-example"></p>
<p>或者在 Chrome 中执行代码，打断点得到：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/在chrome中查看执行上下文栈.png" alt="执行上下文-example"></p>
<h2 id="关于变量与活动对象" tabindex="-1"><a class="header-anchor" href="#关于变量与活动对象" aria-hidden="true">#</a> 关于变量与活动对象</h2>
<p>笔者最开始了解执行上下文、执行上下文栈以及闭包时，大家是用变量对象和互动对象来解释的，即</p>
<p>XXX</p>
<p>在开头的时候笔者已经强调过，以ES5为标准展开。</p>
<p>简单来说，变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。而在函数上下文中，我们用活动对象（activation object，AO）来表示变量对象</p>
<p>作用域在预编译阶段确定，但是作用域链是在执行上下文的创建阶段完成生产的。因为函数在调用时，才会开始创建对应的执行上下文。执行上下文包括了：变量对象、作用域链以及 <code>this</code> 的指向</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>执行上下文可以理解为函数的执行环境，当函数执行时，都会创建一个执行环境</p>
<p>每次只能有一个执行上下文处于运行状态，因为 JavaScript 是单线程语言，它由执行栈或（叫）调用栈来管理</p>
<p>创建一个函数，就生成了一个作用域（对吗）</p>
<p>执行上下文创建阶段分为绑定this，创建词法环境，变量环境三步</p>
<p>调用函数时，创建一个新的词法环境</p>
<p>词法环境这个说法，是ES5规范中的内容，可以理解为 ES3中的变量对象，scope 为 词法环境中的 outer</p>
<p>在ES5中，<strong>词法环境</strong> 和 <strong>变量环境</strong> 的一个不同就是前者被用来存储函数声明和变量（<code>let</code> 和 <code>const</code>）绑定，而后者只用来存储 <code>var</code> 变量绑定</p>
<h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q&amp;A</h2>
<p>Q：是不是说在定义时确认了作用域，在调用时确认了作用域链？</p>
<p>A： yes，这里需要注意的是每一个执行上下文都会进行提升操作</p>
<p>Q： ES5 中的执行上下文的词法环境和编译阶段的词法环境有什么不同？</p>
<p>A：一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进行执行阶段，大致流程如下：
<img src="https://i.loli.net/2021/05/08/tyq8YZBsQSPWkf4.png" alt="JavaScript 的执行流程图"></p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://github.com/xitu/gold-miner/blob/master/TODO1/understanding-execution-context-and-execution-stack-in-javascript.md" target="_blank" rel="noopener noreferrer">理解 JavaScript 中的执行上下文和执行栈<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0" target="_blank" rel="noopener noreferrer">Understanding Execution Context and Execution Stack in JavaScript<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://262.ecma-international.org/6.0/" target="_blank" rel="noopener noreferrer">官方ES<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/Ad7L8j9ezj_g1xTa0wAMHQ" target="_blank" rel="noopener noreferrer">JavaScript 执行上下文 · 变量对象<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a9a3ccb24267c1d01960" target="_blank" rel="noopener noreferrer">老司机也会在闭包相关知识点翻车（上）<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.cnblogs.com/echolun/p/11438363.html" target="_blank" rel="noopener noreferrer">一篇文章看懂JS执行上下文<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
