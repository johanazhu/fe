<template><h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h1>
<p><strong>保证一个类仅有一个实例，并提供一个访问它的全局访问点</strong>，这样的模式就叫做单例模式。</p>
<p>例子：redux，vuex 等唯一状态数据库</p>
<p>全局只能有一个实例</p>
<p>为什么</p>
<p>一实现唯一性</p>
<p>二减少内存空间</p>
<p>如何实现：</p>
<h4 id="静态函数版" tabindex="-1"><a class="header-anchor" href="#静态函数版" aria-hidden="true">#</a> 静态函数版</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">SingleDog</span> <span class="token punctuation">{</span>
    <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我是一个单例对象'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> s1 <span class="token operator">=</span> <span class="token function">SingleDog</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="闭包版" tabindex="-1"><a class="header-anchor" href="#闭包版" aria-hidden="true">#</a> 闭包版</h4>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<p>系统中被唯一使用</p>
<p>一个类只有一个实例</p>
<h3 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h3>
<p>单例模式需要用到java的特性（private）</p>
<p>ES6 中没有（typescript 里有）</p>
<h3 id="js-使用单例模式" tabindex="-1"><a class="header-anchor" href="#js-使用单例模式" aria-hidden="true">#</a> JS 使用单例模式</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">SingleObject</span> <span class="token punctuation">{</span>
    <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'login...'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
SingleObject<span class="token punctuation">.</span>getInstance <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> instance
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SingleObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>验证</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj1 <span class="token operator">=</span> SingleObject<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
obj1<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> obj2 <span class="token operator">=</span> SingleObject<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
obj2<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1 <span class="token operator">===</span> obj2<span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h3>
<p>JQuery 只有一个$</p>
<p>模拟登录框</p>
<p>vuex 和 redux 的 store</p>
<h4 id="jquery" tabindex="-1"><a class="header-anchor" href="#jquery" aria-hidden="true">#</a> jQuery</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>jQuery <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> window<span class="token punctuation">.</span>jQuery
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>jQuery主要展示了单例模式的思维</p>
<h4 id="模拟登录框" tabindex="-1"><a class="header-anchor" href="#模拟登录框" aria-hidden="true">#</a> 模拟登录框</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">LoginForm</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">'hide'</span>
    <span class="token punctuation">}</span>
    <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">'show'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'已经显示'</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">'show'</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'登录框已显示'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">'hide'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'已经隐藏'</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">'hide'</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'登录框已隐藏'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
LoginForm<span class="token punctuation">.</span>getInstance <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> instance<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LoginForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h4 id="vuex-和-redux-的-store" tabindex="-1"><a class="header-anchor" href="#vuex-和-redux-的-store" aria-hidden="true">#</a> vuex 和 redux 的 store</h4>
<h3 id="设计原则验证" tabindex="-1"><a class="header-anchor" href="#设计原则验证" aria-hidden="true">#</a> 设计原则验证</h3>
<p>符合单一职责原则，只实例化唯一的对象</p>
<p>没有具体开发封闭原则，但是绝对不违反开发封装原则</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>使用TypeScript 实现单例模式</p>
<p>有个点不太明白，既然登录框是</p>
<p>为什么要弄两个登录框，一个不久够了</p>
<p>让他显示和隐藏</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://refactoringguru.cn/design-patterns/singleton" target="_blank" rel="noopener noreferrer">深入设计模式<ExternalLinkIcon/></a></li>
</ul>
</template>
