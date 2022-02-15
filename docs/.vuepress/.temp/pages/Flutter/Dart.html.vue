<template><h1 id="dart" tabindex="-1"><a class="header-anchor" href="#dart" aria-hidden="true">#</a> Dart</h1>
<p>要学习 Flutter，就必须先学会 dart。这就好比你要先会 JavaScript 才能写 React/Vue。因为 Flutter 是基于 dart 来写的</p>
<p>这里可以看看：</p>
<p><a href="https://dart.cn/" target="_blank" rel="noopener noreferrer">中文 dart 网站<ExternalLinkIcon/></a></p>
<p>可以在 DartPad 上练习</p>
<blockquote>
<p>DartPad 是 Dart 的一个线上 playground</p>
</blockquote>
<h3 id="程序入口" tabindex="-1"><a class="header-anchor" href="#程序入口" aria-hidden="true">#</a> 程序入口</h3>
<p>JavaScript 没有预定义的入口函数，但是在 Dart 中，每个 app 都必须有一个顶级的 <code>main()</code> 函数作为应用程序的入口点</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="控制台输出" tabindex="-1"><a class="header-anchor" href="#控制台输出" aria-hidden="true">#</a> 控制台输出</h3>
<p>想打印到控制台，使用关键字 <code>print</code>：</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">'Hello world'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>PS：javascript 是 console.log；python 是 print。语法不同罢了</p>
</blockquote>
<h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3>
<p>Dart 的变量必须是明确的，像 TS 那样，需要给一个变量加类型</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">'dart'</span><span class="token punctuation">;</span>
int number <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h4>
<p><code>final</code></p>
<p><code>const</code></p>
<h4 id="内置类型" tabindex="-1"><a class="header-anchor" href="#内置类型" aria-hidden="true">#</a> 内置类型</h4>
<ul>
<li>numbers</li>
<li>strings</li>
<li>booleans</li>
<li>lists(和数组一个概念)</li>
<li>maps 字典</li>
<li>runes(Unicode字符串)</li>
<li>symbols 符号</li>
</ul>
<div class="language-dar ext-dar line-numbers-mode"><pre v-pre class="language-dar"><code>vord main(){
    String str1 = &quot;str1&quot;;
    int num1 = 1;
    double double1 = 10.2;
    bool flag1 = false;
    lists list1 = [1, 3, 5, 7, 9];
    maps map1 = {&quot;name&quot;: &quot;hello&quot;, &quot;age&quot;: 12};
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="方法-函数" tabindex="-1"><a class="header-anchor" href="#方法-函数" aria-hidden="true">#</a> 方法（函数）</h4>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code>bool <span class="token function">isEvenNumber</span><span class="token punctuation">(</span>int num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span><span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token function">isEvenNumber</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="可选参数" tabindex="-1"><a class="header-anchor" href="#可选参数" aria-hidden="true">#</a> 可选参数</h4>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">printStr1</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> int age<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"Name is $name age is $age"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果形参不写，那个值就会被赋为null</p>
<h4 id="可选择名称的函数-具名函数" tabindex="-1"><a class="header-anchor" href="#可选择名称的函数-具名函数" aria-hidden="true">#</a> 可选择名称的函数（具名函数）</h4>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">printStr3</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> int age<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print3</span><span class="token punctuation">(</span><span class="token string">"Name is $name age is $age"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">printStr3</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> sex<span class="token punctuation">,</span> <span class="token class-name">String</span> address<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"Name is $name sex is $sex address is $address"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>printStr3(sex: &quot;男&quot;)</p>
<p>输出：</p>
<div class="language-shel ext-shel line-numbers-mode"><pre v-pre class="language-shel"><code>Name is null sex is 男 address is null
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="函数参数的默认值" tabindex="-1"><a class="header-anchor" href="#函数参数的默认值" aria-hidden="true">#</a> 函数参数的默认值</h4>
<h5 id="可选参数-1" tabindex="-1"><a class="header-anchor" href="#可选参数-1" aria-hidden="true">#</a> 可选参数</h5>
<div class="language-dar ext-dar line-numbers-mode"><pre v-pre class="language-dar"><code>void printStr1([String name, int age=25]) {
    print(&quot;Name is $name age is $age&quot;)
}
printStr1(&quot;男&quot;)
输出：
Name is 男 age is 25
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h5 id="具名函数" tabindex="-1"><a class="header-anchor" href="#具名函数" aria-hidden="true">#</a> 具名函数</h5>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">void</span> <span class="token function">printStr3</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> int age<span class="token operator">=</span><span class="token number">25</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print3</span><span class="token punctuation">(</span><span class="token string">"Name is $name age is $age"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">printStr3</span><span class="token punctuation">(</span><span class="token string">"男"</span><span class="token punctuation">)</span>；
输出：
<span class="token class-name">Name</span> <span class="token operator">is</span> 男 age <span class="token operator">is</span> <span class="token number">25</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></template>
