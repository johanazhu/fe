<template><h1 id="this-关键字" tabindex="-1"><a class="header-anchor" href="#this-关键字" aria-hidden="true">#</a> this 关键字</h1>
<p>先说结论：<strong>谁调用它，this就指向谁</strong>。</p>
<p>前言：在讲作用域的时候，我们讲到了this，因为JavaScript中的作用域是词法作用域，在哪里定义，就在那里形成作用域。而与词法作用域相对应的还有一个作用域叫动态作用域，调用时去寻找它所处的位置。那个时候我就说道 this机制 和动态作用域很像。</p>
<h2 id="关于this" tabindex="-1"><a class="header-anchor" href="#关于this" aria-hidden="true">#</a> 关于this</h2>
<h3 id="为什么使用-this" tabindex="-1"><a class="header-anchor" href="#为什么使用-this" aria-hidden="true">#</a> 为什么使用 this</h3>
<p>我们解释一下为什么要使用this，用一个例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> greeting <span class="token operator">=</span> <span class="token string">"Hello, I'm"</span> <span class="token operator">+</span> <span class="token function">identify</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>greeting<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> me <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'johan'</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> you <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'elaine'</span>
<span class="token punctuation">}</span>

<span class="token function">identify</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>me<span class="token punctuation">)</span> <span class="token comment">// JOHAN</span>
<span class="token function">identify</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>you<span class="token punctuation">)</span> <span class="token comment">// ELAINE</span>

<span class="token function">speak</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>me<span class="token punctuation">)</span> <span class="token comment">// Hello, I'm JOHAN</span>
<span class="token function">speak</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>you<span class="token punctuation">)</span> <span class="token comment">// Hello, I'm ELAINE</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>这段代码可以在不同的上下文对象（me 和 you）中重复使用函数identity() 和 speak()，不用针对每个对象编写不同版本的函数</p>
<p>如果不适用 this，那就需要给identify() 和 speak() 显式传入一个上下文对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">identify</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> context<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">speak</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> greeting <span class="token operator">=</span> <span class="token string">"Hello, I'm"</span> <span class="token operator">+</span> <span class="token function">identify</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>greeting<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">identify</span><span class="token punctuation">(</span>you<span class="token punctuation">)</span> <span class="token comment">// ELAINE</span>
<span class="token function">speak</span><span class="token punctuation">(</span>me<span class="token punctuation">)</span> <span class="token comment">// Hello, I'm JOHAN</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>看到这里你也许明白了，this 是一种更为优雅的”传递”对象引用的方式。这个例子还过于简单，当你遇到7.8个甚至10几个函数（或叫方法）之间的调用时，显式传值无疑会变得混乱。除此之外，在原型中，函数自动引入合适的上下文对象是极为重要的，这个我们放在原型章中在讲。</p>
<h3 id="this到底是什么" tabindex="-1"><a class="header-anchor" href="#this到底是什么" aria-hidden="true">#</a> this到底是什么</h3>
<p>this到底是一种什么样的机制。</p>
<ol>
<li>this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。</li>
<li>this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式</li>
<li>当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this就是这个记录的一个属性，会在函数执行的过程中用到。</li>
</ol>
<h2 id="调用位置" tabindex="-1"><a class="header-anchor" href="#调用位置" aria-hidden="true">#</a> 调用位置</h2>
<p>正如上面所讲，this是在运行时绑定的，它的上下文取决于函数调用时的各个条件。在JavaScript中函数的调用有以下几种方式：作为对象方法调用，作为函数调用，作为构造函数调用，和使用apply或者call调用。下面我们按照调用方式不同，分别讨论 this 的含义</p>
<h3 id="作为对象方法调用" tabindex="-1"><a class="header-anchor" href="#作为对象方法调用" aria-hidden="true">#</a> 作为对象方法调用</h3>
<p>在 JavaScript中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在调用这种调用方式时，this 被自然绑定到该对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> people <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'elaine'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
    <span class="token function-variable function">sayName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
people<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// elaine</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="作为函数调用" tabindex="-1"><a class="header-anchor" href="#作为函数调用" aria-hidden="true">#</a> 作为函数调用</h3>
<p>函数也可以直接被调用，此时 this 绑定到全局对象。在浏览器中，window 就是该全局对象。比如下面的例子：函数被调用时，this 被绑定到全局对象，接下来执行赋值语句，相当于隐式的声明了一个全局变量，这显然不是调用者希望的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sayAge</span><span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">sayAge</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment">// age 已经成为一个值为 5 的全局变量</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>对于内部函数，即声明在另外一个函数体内的函数，这种绑定到全局对象的方式会产生另外一个问题。我们仍然以前提到的 people 对象为例，这次我们希望在 sayName 方法内定义一个函数，函数打印年龄。结果可能出乎大家意料，不仅年龄没有打印出，反而多了一个全局变量 age</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> people <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'elaine'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
    <span class="token function-variable function">sayName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> <span class="token function-variable function">sayAge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">sayAge</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
people<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
people<span class="token punctuation">.</span>age <span class="token comment">// 26</span>
age <span class="token comment">// 5</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>这属于 JavaScript 的设计缺陷，正确的设计方式是内部函数的 this 应该绑定到其外层函数对应的对象上，为了规避这一设计缺陷，聪明的 JavaScript 程序员想出了变量代替的方式，约定俗成，该变量一般被称为 that</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> people <span class="token operator">=</span> <span class="token punctuation">{</span>
	name<span class="token operator">:</span> <span class="token string">'elaine'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
    <span class="token function-variable function">sayName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> that <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> <span class="token function-variable function">sayAge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            that<span class="token punctuation">.</span>age <span class="token operator">=</span> age
        <span class="token punctuation">}</span>
        <span class="token function">sayAge</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
people<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
people<span class="token punctuation">.</span>age <span class="token comment">// 5</span>
age <span class="token comment">// 没有定义</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>当然，当我们使用ES6中的箭头函数时，我们会发现箭头函数也能做到相同的效果</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> people <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'elaine'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
    <span class="token function-variable function">sayName</span><span class="token operator">:</span> <span class="token parameter">age</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> <span class="token function-variable function">sayAge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
        <span class="token punctuation">}</span>
        <span class="token function">sayAge</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
people<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
people<span class="token punctuation">.</span>age <span class="token comment">// 26</span>
age <span class="token comment">// 5</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>可答案却让我匪夷所思，箭头函数难道不应该把this指向它的上一层吗？这个我们在后面会解释</p>
<h3 id="作为构造函数调用" tabindex="-1"><a class="header-anchor" href="#作为构造函数调用" aria-hidden="true">#</a> 作为构造函数调用</h3>
<p>JavaScript 支持面向对象式编程，与主流的面向对象式编程语言不同， JavaScript并没有类（Class）的概念，而是使用基于原型（prototype-base）的继承方式（ES6中的Class其实是原型继承的语法糖）。相应的，JavaScript中的构造函数也很特殊，如果不适用new调用，则和普通函数一样。作为又一项约定俗成的准则，构造函数以大写字母开头，提醒调用者使用正确的方式调用。如果调用正确，this绑定到新创建的对象上。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="使用-apply-或-call-调用" tabindex="-1"><a class="header-anchor" href="#使用-apply-或-call-调用" aria-hidden="true">#</a> 使用 apply 或 call 调用</h3>
<p>让我们再一次重申，在 JavaScript 中函数也是对象，对象则有方法，apply 和 call 就是函数对象的方法。这两个方法异常强大，他们允许切换函数执行的上下文环境（context）,即 this 绑定的对象。很多 JavaScript 中的技巧以及类库都用到了该方法。让我们看一个具体的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> elaine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token string">'elaine'</span><span class="token punctuation">,</span> <span class="token number">26</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> johan <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">'johan'</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
elaine<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token string">'elaine1'</span><span class="token punctuation">,</span> <span class="token number">261</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
elaine<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>johan<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'johan1'</span><span class="token punctuation">,</span> <span class="token number">261</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elaine<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// elaine1;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elaine<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token comment">// 261</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token parameter">johan</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"johan1"</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">261</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>在上面的例子中，我们使用构造函数生成了一个对象elaine，该对象同时具有 sayName 方法；使用对象字面量创建了另一个对象 johan，我们看到使用apply 可以将 elaine 上的方法应用到 johan 上，这时候 this 也被绑定到对象 johan 上，另一个 call 也具备相同的功能，不同的是最后的参数不是作为一个数组统一传入，而是分开传入的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>elaine<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>johan<span class="token punctuation">,</span> <span class="token string">'johan1'</span><span class="token punctuation">,</span> <span class="token number">261</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>回过头来看，apply 和 call 的语义就是 elaine 的方法 sayName 作用于 johan ，sayName 需要传入的参数，我从第二个参数开始传值；或者说 johan 调用 elaine 的 sayName 方法，从第二个参数开始传值</p>
<p><strong>call和apply具有掰弯this指向的能力</strong></p>
<h3 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h3>
<p>与箭头函数相关的语法和特征我们会在ES6篇中着重描述，这里，我们只讲箭头函数与 this 的关系。在“作为函数调用”小节中我们使用箭头函数，试图让它绑定，但是却感觉错了</p>
<p>网上对箭头函数与this 关系的解释是：箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中的this的值和外层的this是一样的。这个解释很困扰我，就好比你看高中政治课本，一谈到马克思主义思想浪潮时虽然文字都看的懂，但是连在一起却那么的神奇，让人疑惑不止。</p>
<p>其实箭头函数很简单，和我们之前说作用域时谈到的动态作用域和静态作用域（词法作用域）有关系。this本身的机制和动态作用域很像，而箭头函数的出现，某种程度上规避了JavaScript 的设计缺陷（正确的设计方式应该是内部函数的 this 应该绑定到其外层函数对应的对象上）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">'use strict'</span><span class="token punctuation">;</span> <span class="token comment">// 严格模式下</span>
<span class="token keyword">var</span> people <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'eliane'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
    <span class="token function-variable function">sayName</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function-variable function">sayName2</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
people<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// undefined Window {...}</span>
people<span class="token punctuation">.</span><span class="token function">sayName2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// elaine, peole {...}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>使用箭头函数后，就不用管调用者是谁，它只关心在哪里调用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
	bar<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">a</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
foo<span class="token punctuation">.</span>bar<span class="token punctuation">.</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// window</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="函数的执行环境" tabindex="-1"><a class="header-anchor" href="#函数的执行环境" aria-hidden="true">#</a> 函数的执行环境</h2>
<p>我们之前一直在讲一件事，this是如何被调用的，也说了this是什么，那么我们来看看，一个函数被执行时会发生什么？</p>
<p>一个函数被执行时，会创建一个执行环境（或叫活动记录，或叫执行上下文，英文名 ExecutionContext），函数所有的行为都发生在此执行环境中，构建该执行环境时，JavaScript 首先会创建 arguments 变量，其中包含调用函数时传入的参数。接下来创建作用域链。然后初始化变量，首先初始化函数的形参表，值为 arguments 变量中对应的值，如果 arguments 变量中没有对应值，则该形参初始化为 undefined。如果该函数中含有内部函数，则初始化这些内部函数。如果没有，继续初始化该函数内定义的局部变量，需要注意的是此时这些变量初始化为 undefined，其赋值操作在执行环境（ ExecutionContext ）创建成功后，函数执行时才会执行，这点对于我们理解JavaScript中的变量作用域非常重要。</p>
<p>最后是 this 变量赋值，如前所述，会根据函数调用方式的不同，赋给 this 全局对象，当前对象等。至此函数的执行环境（ ExecutionContext ）创建成功，函数开始逐行执行，所需变量均从之前构建好的执行环境（  ExecutionContext ）中读取</p>
<h2 id="this有什么作用" tabindex="-1"><a class="header-anchor" href="#this有什么作用" aria-hidden="true">#</a> this有什么作用</h2>
<p>全局执行上下文中：this 指向了 <code>window</code> 对象，方便我们来调用全局 <code>window</code> 对象</p>
<p>函数执行上下文中：this 指向了调用该函数的对象，减少的参数的传递，原来如何需要在函数内部操作被调用对象，当然还需要将对象作为参数传递进去，而又了 <code>this</code>，就不需要了，直接拿 <code>this</code> 就可以操作该调用对象的属性</p>
<h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2>
<p>结语就留给后面的自己吧</p>
<p>构造函数就是个模式，this未来会指向new出来的对象。创建 Person 的实例时，this.name 将引用新创建的对象，并将一个名为 <code>name</code> 的属性放入新对象中。</p>
<p>this 其实很好理解，它就是一个代词，表示”这个“。</p>
<p>生活中遇到一些事物规律，我们归纳总结，得出结论，用一个名词代替这个规律，例如马太效应，墨菲定律，我们约定俗成，这个词就是表示这些意。这样一抽象，彼此信息消耗就减少了。this 其实很好理解，this 就是”这个“。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>调用函数bar，函数中的 this 就默认代指 window。window上没有value，那结果就是 undefined。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>call 能硬核掰弯this指向，将this指向第一个参数，所以这段代码中，this 代指 foo ， foo 上有value，所以打印结果是 1</p>
<p>针对 js 中的 this 指向问题，知乎上有人曾经回答过：</p>
<p>https://www.zhihu.com/question/412637481/answer/1539325572</p>
<ul>
<li>this 的灵活指向，属于 JS 自己发明的语言</li>
<li>this 指向存在的问题是公认的</li>
<li>this 的这种设计既不利于代码可读性，也不利于性能优化，完全可对其世家强制性</li>
<li>this 设计问题的更远，是产品营销需求与设计师个人偏好之间的冲突</li>
</ul>
<p>this 是万恶之源，大家都是（词法）静态作用域，就他是动态的.</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&amp;mid=2247484231&amp;idx=1&amp;sn=36db9c6d78b541e73a40cf3e496691fe&amp;chksm=f9910596cee68c80f6d81196644fe5e2ebf84a6e66b11df36276542aa6ab11135affcc23d662&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1567987883759&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">重学 this 关键字<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzA3MTI3Mjk3NA==&amp;mid=2247483660&amp;idx=1&amp;sn=4cc5c66b988e79f39587af46f51b9e95&amp;chksm=9f315e6da846d77b89863afbab30e3dc5d0396bac49aad6e7c9da72882ba378e782a8cd8f61b&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1566956479051&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">完整梳理 this 指向<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzI1MDU0Mjc4Mg==&amp;mid=2247484550&amp;idx=1&amp;sn=af613bef12e5bc102c18ddf676f07a34&amp;chksm=e981eb57def66241ae4bb7cc5e13ec1da19366c4c91d3e2e165fd1c5b1bdfad6ac16a7cbbf56&amp;mpshare=1&amp;scene=1&amp;srcid=1125l5w8RfTcp1c9J9kwF8J3&amp;sharer_sharetime=1606309812635&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&amp;key=ace5dede87a40e70e8ec3f2b27f8d5f648045f478663a9b5bdb970b747a925858c239a1fadb7a1e65e20df924ad496d9cba48daffdb2519236be9316b87a50632a9c4921dbea221ee67b52f84f84c40366c3eb9f76a65d5626d5b01457cd9c07c8c506d8797fa045ff7eb415daf60cd87275db57cee345515e5b12a43d76e811&amp;ascene=1&amp;uin=MTA0NTY0NDM2MQ%3D%3D&amp;devicetype=Windows+10+x64&amp;version=6300002f&amp;lang=zh_CN&amp;exportkey=AeAM2n1g%2B%2Bpt8l519bMnx0E%3D&amp;pass_ticket=NobQ5TAx7Olw6LadlkMu5zuU5DSWS1XhNGE4KCNN4gFe7KsugULfw02vrvAelJJ5&amp;wx_header=0" target="_blank" rel="noopener noreferrer">面试三板斧——this<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
