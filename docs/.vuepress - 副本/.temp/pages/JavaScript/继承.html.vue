<template><h1 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h1>
<p>JavaScript 的主流继承方式，选择了隐式原型继承，它提供了几个内置的 constructor 函数，如 Object，Array，Boolean，String，Number 等</p>
<p>当我们使用对象字面量创建一个新对象时，它有两层隐式行为。</p>
<p>（1）隐式的通过 new Object() 去创建对象</p>
<p>（2）隐式的进行原型继承</p>
<p>可以说，JS 原型之所以难以理解，主要原因是设计上的问题，而非技术难度。</p>
<p>如果将 constructor 函数的 prototype 改名为 properties 。问题可能少很多。或者进一步简写成 props，理解上将更加简单。不就是 new Constructor 时，自带了它的 Constructor.props 对象嘛</p>
<p>https://github.com/mqyqingfeng/Blog/issues/16</p>
<p>不对</p>
<p>因此，他就把new命令引入了Javascript，用来从原型对象生成一个实例对象。但是，Javascript没有&quot;类&quot;，怎么来表示原型对象呢？</p>
<p>原型对象本身是一个函数，</p>
<p>实例 = new 原型对象</p>
<p>原型对象是实例的妈妈</p>
<p>Brendan Eich 决定为构造函数设置一个 prototype 属性</p>
<p>这个属性包含一个对象（以下简称“prototype对象”），所有实例对象需要共享的属性和方法，都放在这个对象里面；那么不需要共享的属性和方法，就放在构造函数里面</p>
<p>由于所有的实例对象共享同一个prototype 对象，那么从外界看起来，prototype 对象就好像是实例对象的原型，而实例对象则好像“继承”了prototype 对象一样</p>
<p>所谓&quot;构造函数&quot;，其实就是一个普通函数，但是内部使用了<a href="http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html" target="_blank" rel="noopener noreferrer"><code>this</code>变量<ExternalLinkIcon/></a>。对构造函数使用<code>new</code>运算符，就能生成实例，并且<code>this</code>变量会绑定在实例对象上。</p>
<p>每个构造函数都有 prototype 属性，是不是说每个函数都有 prototype 属性</p>
<p>这意味着，我们可以把那些不变的属性和方法，直接定义在 <code>prototyoe</code> 对象上</p>
<p>问：两个构造函数之间如何继承？</p>
<p>或者问：ConstructorB 如何继承 ConstructorA？</p>
<p>JS 里的继承，是对象跟对象之间的继承。constructor 的主要用途是初始化对象的属性。</p>
<p>因此，两个Constructor 之间的继承，需要分开两个步骤。</p>
<p>第一步：编写constructor，将两个 constructor 通过 call/apply 的方法，合并它们的属性初始化。按照超类优先的顺序进行</p>
<p>第二步：取出超类和之类的原型对象，通过 Object.create/Object.setPrototypeOf 显式原型继承的方式，设置子类的原型为超类原型。</p>
<h4 id="class的方式继承" tabindex="-1"><a class="header-anchor" href="#class的方式继承" aria-hidden="true">#</a> class的方式继承：</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token punctuation">}</span>
    <span class="token function">sayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">PrimaryStudent</span> <span class="token keyword">extends</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> grade</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> grade<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">sayGrade</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>grade<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h4 id="prototype-的方式继承" tabindex="-1"><a class="header-anchor" href="#prototype-的方式继承" aria-hidden="true">#</a> prototype 的方式继承：</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">Student</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">PrimaryStudent</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> grade</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Student</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> grade<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">PrimaryStudent</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Student</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PrimaryStudent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> PrimaryStudent<span class="token punctuation">;</span>
<span class="token class-name">PrimaryStudent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayGrade</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>grade<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>继承的回答</p>
<p>https://www.zhihu.com/question/492027996</p>
</template>
