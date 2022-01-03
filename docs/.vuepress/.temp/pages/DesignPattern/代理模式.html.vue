<template><h1 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h1>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<p>使用者无权访问目标对象</p>
<p>中间加代理，通过代理做授权和控制</p>
<h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3>
<p>科学上网，访问 facebook.com</p>
<p>明星经纪人</p>
<h3 id="代码演示" tabindex="-1"><a class="header-anchor" href="#代码演示" aria-hidden="true">#</a> 代码演示</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ReadImg</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">fileName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fileName <span class="token operator">=</span> fileName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadFromDisk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 初始化从硬盘中加载，模拟</span>
    <span class="token punctuation">}</span>
    <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'display... '</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fileName<span class="token punctuation">)</span> 
    <span class="token punctuation">}</span>
    <span class="token function">loadFromDisk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'loading... '</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fileName<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ProxyImg</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">fileName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>readImg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReadImg</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>readImg<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> proxyImg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProxyImg</span><span class="token punctuation">(</span><span class="token string">'1.png'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
proxyImg<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h3>
<p>网页事件代理（在事件中叫：事件委托）</p>
<p>jQuery $.proxy</p>
<p>ES6 Proxy</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> stat <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'张XX'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
    phone<span class="token operator">:</span> <span class="token string">'star: 13200000130'</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> agent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>star<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'phone'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 返回经纪人自己的电话</span>
            <span class="token keyword">return</span> <span class="token string">'agent: 13706887375'</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'price'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 明星不报价，经纪人报价</span>
            <span class="token keyword">return</span> <span class="token number">12000</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'customPrice'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span>val <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'价格太低'</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            	target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>agent<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>agent<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>agent<span class="token punctuation">.</span>phone<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>agent<span class="token punctuation">.</span>price<span class="token punctuation">)</span>

agent<span class="token punctuation">.</span>customPrice <span class="token operator">=</span> <span class="token number">15000</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>agent<span class="token punctuation">.</span>customPrice<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="代理模式-vs-适配器模式" tabindex="-1"><a class="header-anchor" href="#代理模式-vs-适配器模式" aria-hidden="true">#</a> 代理模式 vs 适配器模式</h3>
<p>适配器模式：提供一个不同的接口（如不同版本的插头）</p>
<p>代理模式：提供一模一样的接口</p>
<h3 id="代理模式-vs-装饰器模式" tabindex="-1"><a class="header-anchor" href="#代理模式-vs-装饰器模式" aria-hidden="true">#</a> 代理模式 VS 装饰器模式</h3>
<p>装饰器模式：扩展功能，原有功能不变且可直接使用</p>
<p>代理模式：显示原有功能，但是经过限制或者阉割之后的</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://refactoringguru.cn/design-patterns/singleton" target="_blank" rel="noopener noreferrer">深入设计模式<ExternalLinkIcon/></a></li>
</ul>
</template>
