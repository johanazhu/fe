<template><h1 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h1>
<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3>
<p>为什么会有Map？像对象Object，是由key:value集合组成的，但是<strong>key只能是字符串</strong>。map的作用就是可以用其他类型的数据做key。</p>
<p>例如</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">'johan'</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token comment">// set(key, value)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="map是什么" tabindex="-1"><a class="header-anchor" href="#map是什么" aria-hidden="true">#</a> Map是什么</h3>
<p><code>Map</code>  在其他语言中被翻译为字典，在ES6规范中引入了新的数据类型 <code>Map</code> 就是对字典这类数据结构的一种补充。</p>
<p><code>Map</code> 是一组键值对的结构，具有极快的查找速度。数据结构是hash-table（哈希表）</p>
<p>Map 是一个带键的数据项的集合，就像一个 Object 一样，但是它们最大的差别是 Map 允许任何类型的键（key）</p>
<h3 id="方法与属性" tabindex="-1"><a class="header-anchor" href="#方法与属性" aria-hidden="true">#</a> 方法与属性</h3>
<ul>
<li>new Map() —— 创建 map</li>
<li>map.set(key, value) —— 根据键存储值</li>
<li>map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined</li>
<li>map.has(key) —— 如果 key 存在则返回 true，否则返回 false</li>
<li>map.delete(key) —— 删除指定键的值</li>
<li>map.clear() —— 清空 map</li>
<li>map.size —— 返回当前元素个数</li>
</ul>
<h3 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'Johan'</span><span class="token punctuation">,</span> <span class="token number">26</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'Elaine'</span><span class="token punctuation">,</span> <span class="token number">26</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'Bob'</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
m<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'Johan'</span><span class="token punctuation">)</span> <span class="token comment">// 26</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="算法中是使用" tabindex="-1"><a class="header-anchor" href="#算法中是使用" aria-hidden="true">#</a> 算法中是使用</h3>
<p>最常见的是求两数之和和三数之和。无论是哪一种，本质都是目标数与循环数的差</p>
<p>例题：https://leetcode-cn.com/problems/two-sum/</p>
<blockquote>
<p>给定一个整数数组 <code>nums</code> 和一个整数目标值 <code>target</code>，请你在该数组中找出 <strong>和为目标值</strong> <em><code>target</code></em> 的那 <strong>两个</strong> 整数，并返回它们的数组下标</p>
</blockquote>
<p>示例1：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">target</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> diff <span class="token operator">=</span> target <span class="token operator">-</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>diff<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">[</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>diff<span class="token punctuation">)</span><span class="token punctuation">,</span> i<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>num<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="窥视map" tabindex="-1"><a class="header-anchor" href="#窥视map" aria-hidden="true">#</a> 窥视Map</h3>
<p>之前在将Promise时，我们已经自己手写了Promise，那么Map（字典）我们是否也能手写一个呢？</p>
<p>老规矩，先打印它具体有哪些参数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>Map<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/ES6/Map构造函数结构.png" alt="Map构造函数结构"></p>
<p>肉眼分析可得，它是基于Object创建的对象实例（<code>__proto__</code>指向Object，不懂的可以去 JavaScript中的原型篇中了解一二），其次它的原型上有<code>clear</code>、<code>delete(key)</code>、<code>entries</code>、<code>forEach(callbackFn[, thisArg])</code>、<code>get(key)</code>、<code>set(key, valye)</code>、<code>has(key)</code>、<code>keys</code>、<code>values</code>、<code>[@@iterator]</code> 等十个方法，还有两个原型属性 <code>constructor</code> 和 <code>size</code>。各个方法和属性对应的解释不做说明，懂的人自然懂，不懂的可以去查</p>
<p>我们手写一个Map</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">MyMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
<span class="token class-name">MyMap</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
    constructor<span class="token operator">:</span> MyMap<span class="token punctuation">;</span>
    <span class="token function-variable function">clear</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">delete</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">entries</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">forEach</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">has</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">values</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="weakmap" tabindex="-1"><a class="header-anchor" href="#weakmap" aria-hidden="true">#</a> WeakMap</h3>
<p>与Map类似，但又几点区别：</p>
<ul>
<li>WeakMap 只接受对象作为key，如果设置其他类型的数据作为key，会报错</li>
</ul>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>
<ul>
<li><a href="https://zh.javascript.info/map-set" target="_blank" rel="noopener noreferrer">Map and Set（集合和映射）<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/ax-Lec-wam0pptpRTH5Log" target="_blank" rel="noopener noreferrer">「 Map最佳实践」什么时候适合使用 Map 而不是 Object<ExternalLinkIcon/></a></li>
</ul>
</template>
