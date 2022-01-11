<template><h1 id="面向对象编程" tabindex="-1"><a class="header-anchor" href="#面向对象编程" aria-hidden="true">#</a> 面向对象编程</h1>
<p>面对对象有三个耳熟能闻的特性。继承，封装，多态</p>
<h3 id="面向对象-oop-之类的继承-extend" tabindex="-1"><a class="header-anchor" href="#面向对象-oop-之类的继承-extend" aria-hidden="true">#</a> 面向对象（OOP）之类的继承（extend）</h3>
<h4 id="_1-类的继承、封装、多态" tabindex="-1"><a class="header-anchor" href="#_1-类的继承、封装、多态" aria-hidden="true">#</a> 1.类的继承、封装、多态</h4>
<ul>
<li>封装：低耦合高内聚</li>
<li>多态：重载和重写</li>
<li>继承：子类继承父类上的方法</li>
<li>为什么要继承？</li>
</ul>
<h4 id="_2-继承常用的四种方法" tabindex="-1"><a class="header-anchor" href="#_2-继承常用的四种方法" aria-hidden="true">#</a> 2.继承常用的四种方法</h4>
<ul>
<li>原型继承</li>
<li>call继承</li>
<li>寄生组合继承</li>
<li>ES6中的extend继承（extend和super）</li>
</ul>
<p>Js是面向对象语言。</p>
<p>面向对象特点是什么？</p>
<p>​	继承，</p>
<p>​	封装，	低耦合高内聚</p>
<p>​	多态，重载和重写</p>
<p>​		重载：方法名相同，形参个数或者类型不一样（JJs中不存在真正意义上的重载）</p>
<p>​		重写：在类的继承中，子类可以重写父类中的方法</p>
<p>​		Java的例子，java就是典型的的面向对象语言</p>
<p>Js的面向对象，是通过什么方式实现的。基于原型和原型链机制处理</p>
<p>java中重载的例子</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">void</span> function <span class="token function">addSomeNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>javascript中没有重载</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">addSomeNumber</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num <span class="token operator">+</span> <span class="token number">100</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">addSomeNumber</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num <span class="token operator">+</span> <span class="token number">200</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">addSomeNumber</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token comment">// 300</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>可以通过传入的参数类型和数量做不同的反应来模拟重载</p>
<p>JavaScript中的继承</p>
<p>为什么要使用继承。</p>
<p>继承是一个非常常见的概念，在现实生活中许多事物都是具有继承性的</p>
<p><img src="https://i.loli.net/2021/06/03/Ucs9d2yWIjarLMg.png" alt="继承"></p>
<p>可以看出来</p>
<h4 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h4>
<p>每个对象都是基于一个引用类型创建的</p>
<p>js的继承</p>
<p>面向对象思维导图</p>
<p><img src="https://i.loli.net/2021/06/03/5CkBqewOFa3sG89.png" alt="面向对象思维导图"></p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://coolshell.cn/articles/6441.html" target="_blank" rel="noopener noreferrer">JAVASCRIPT 面向对象编程<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000020319171" target="_blank" rel="noopener noreferrer">面向对象之七大基本原则（JavaScript）<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844903780035592205" target="_blank" rel="noopener noreferrer">面试官问：JS的继承<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/CqXmu4n6aZsqB-jJ0O0t-g" target="_blank" rel="noopener noreferrer">征服 JavaScript 面试：类继承和原型继承的区别<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
