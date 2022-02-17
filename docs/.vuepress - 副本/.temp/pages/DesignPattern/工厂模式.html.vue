<template><h1 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h1>
<p>我之前讲原型的时候就讲过，构造函数，一种认为的规定的函数，一般首字母大写，为大家共用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> career</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>career <span class="token operator">=</span> career<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>以上的 User , 就是一个构造器（构造函数）。</p>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<p>将 new 操作单独封装</p>
<p>遇到 new 时，就要考虑是否该使用工厂模式</p>
<h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3>
<p>你去购买汉堡，直接点餐，取餐，不会自己亲手做</p>
<p>商店要“封装”做汉堡的工作，做好直接给买着</p>
<h3 id="代码演示" tabindex="-1"><a class="header-anchor" href="#代码演示" aria-hidden="true">#</a> 代码演示</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token punctuation">}</span>
    <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'init'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'fun1'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">fun2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'fun2'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Creator</span> <span class="token punctuation">{</span>
    <span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> creator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Creator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> p <span class="token operator">=</span> creator<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">'p1'</span><span class="token punctuation">)</span>
p<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
p<span class="token punctuation">.</span><span class="token function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h3>
<p>jquery - ${'div'}</p>
<p>React.createElement</p>
<p>vue 异步组件</p>
<h4 id="jquery" tabindex="-1"><a class="header-anchor" href="#jquery" aria-hidden="true">#</a> jQuery</h4>
<p>${'div'} 和 new $('div') 有何区别？</p>
<p>第一：书写麻烦，jQuery 的链式操作将成为噩梦</p>
<p>第二：一旦 jQuery 名字变化，将是灾难性的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">jQuery</span> <span class="token punctuation">{</span>
    <span class="token function">consturctor</span><span class="token punctuation">(</span><span class="token parameter">selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> slice <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>slice<span class="token punctuation">;</span>
        <span class="token keyword">let</span> dom <span class="token operator">=</span> <span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> len <span class="token operator">=</span> dom <span class="token operator">?</span> dom<span class="token punctuation">.</span>length <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> dom<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">=</span> len
        <span class="token keyword">this</span><span class="token punctuation">.</span>selector <span class="token operator">=</span> selector <span class="token operator">||</span> <span class="token string">''</span>
    <span class="token punctuation">}</span>
    <span class="token function">append</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
    <span class="token function">addClass</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
    <span class="token function">html</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span><span class="token function-variable function">$</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">jQuery</span><span class="token punctuation">(</span>selector<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 工厂函数的应用</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h4 id="react-createelement" tabindex="-1"><a class="header-anchor" href="#react-createelement" aria-hidden="true">#</a> React.createElement</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vnode</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
Rect<span class="token punctuation">.</span><span class="token function-variable function">createElement</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">tag<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Vnode</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> children<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://refactoringguru.cn/design-patterns/singleton" target="_blank" rel="noopener noreferrer">深入设计模式<ExternalLinkIcon/></a></li>
</ul>
</template>
