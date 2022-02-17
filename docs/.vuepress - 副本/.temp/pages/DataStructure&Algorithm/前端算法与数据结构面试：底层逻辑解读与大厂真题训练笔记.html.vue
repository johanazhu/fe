<template><h1 id="前端算法与数据结构面试笔记" tabindex="-1"><a class="header-anchor" href="#前端算法与数据结构面试笔记" aria-hidden="true">#</a> 前端算法与数据结构面试笔记</h1>
<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3>
<p>学习观念：<strong>前端工程师如果不是为了面试，那么不建议花大力气折腾算法（尤其是在业余时间本身非常有限的情况下），你应该考虑把更多的时间用来做工程</strong>。</p>
<p><strong>所谓工程能力，本质是“解决问题的能力”，无论是硬编码实力、还是架构思想，其本质都是为了解决问题这个终极目标而服务</strong> 。</p>
<h3 id="快速上手——从0到1掌握面试需要的数据结构-一" tabindex="-1"><a class="header-anchor" href="#快速上手——从0到1掌握面试需要的数据结构-一" aria-hidden="true">#</a> 快速上手——从0到1掌握面试需要的数据结构（一）</h3>
<p>数据结构层面需掌握</p>
<ul>
<li>数组</li>
<li>栈</li>
<li>队列</li>
<li>链表</li>
<li>树（主要讲二叉树）</li>
</ul>
<h3 id="快速上手——从0到1掌握面试需要的数据结构-二" tabindex="-1"><a class="header-anchor" href="#快速上手——从0到1掌握面试需要的数据结构-二" aria-hidden="true">#</a> 快速上手——从0到1掌握面试需要的数据结构（二 ）</h3>
<p>在涉及链表删除操作的题目中，重点不是定位目标结点，而是<strong>定位目标结点的前驱结点</strong></p>
<p>JS 数组未必是真正的数组</p>
<p>何谓“真正的数组”？在各大教材（包括百科词条）对数组的定义中，都有一个“存储在连续的内存空间里”这样的必要条件。</p>
<p>链表的插入/删除效率较高，而访问效率较低；数组的访问效率较高，而插入效率较低</p>
<h3 id="快速上手——从0到1掌握算法面试需要的数据结构-三" tabindex="-1"><a class="header-anchor" href="#快速上手——从0到1掌握算法面试需要的数据结构-三" aria-hidden="true">#</a> 快速上手——从0到1掌握算法面试需要的数据结构（三）</h3>
<h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h4>
<h4 id="理解二叉树结构" tabindex="-1"><a class="header-anchor" href="#理解二叉树结构" aria-hidden="true">#</a> 理解二叉树结构</h4>
<p>二叉树是指满足以下要求的树：</p>
<ul>
<li>它可以没有根结点，作为一棵空树存在</li>
<li>如果它不是空树，那么<strong>必须由根结点、左子树和右子树组成，且左右子树都是二叉树</strong>。如下图：</li>
</ul>
<p>二叉树构造函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 二叉树结点的构造函数</span>
<span class="token keyword">function</span> <span class="token function">TreeNode</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="递归初相见——二叉树递归遍历的三种姿势" tabindex="-1"><a class="header-anchor" href="#递归初相见——二叉树递归遍历的三种姿势" aria-hidden="true">#</a> 递归初相见——二叉树递归遍历的三种姿势</h3>
<p>遍历方式有以下四种：</p>
<ul>
<li>先序遍历</li>
<li>中序遍历</li>
<li>后序遍历</li>
<li>层次遍历</li>
</ul>
<p>那么遍历的可能顺序也不过三种：</p>
<ul>
<li>根结点 -&gt; 左子树 -&gt; 右子树	先序遍历</li>
<li>左子树 -&gt; 根结点 -&gt; 右子树    中序遍历</li>
<li>左子树 -&gt; 右子树 -&gt; 根结点    后序遍历</li>
</ul>
<p>先序遍历的编码实现：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 所有遍历函数的入参都是树的根节点对象</span>
<span class="token keyword">function</span> <span class="token function">preorder</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 递归边界，root 为空</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 输出当前遍历的节点值</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'当前遍历的结点值是：'</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
    <span class="token comment">// 递归遍历左子树</span>
    <span class="token function">preorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
    <span class="token comment">// 递归遍历右子树</span>
    <span class="token function">preorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>各位现在完全可以再回过头来看一下我们前面示例的这棵二叉树：</p>
<p><img src="https://user-gold-cdn.xitu.io/2020/4/6/1714ec60340dc2db?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>当前遍历的结点值是： <span class="token constant">A</span>
当前遍历的结点值是： <span class="token constant">B</span>
当前遍历的结点值是： <span class="token constant">D</span>
当前遍历的结点值是： <span class="token constant">E</span>
当前遍历的结点值是： <span class="token constant">C</span>
当前遍历的结点值是： <span class="token constant">F</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="中序遍历" tabindex="-1"><a class="header-anchor" href="#中序遍历" aria-hidden="true">#</a> 中序遍历：</h4>
<p>左子树 -&gt; 根结点 -&gt; 右子树：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 所有遍历函数的入参都是树的根结点对象</span>
<span class="token keyword">function</span> <span class="token function">inorder</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 递归边界，root 为空</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> 
    <span class="token punctuation">}</span>
     
    <span class="token comment">// 递归遍历左子树 </span>
    <span class="token function">inorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>  
    <span class="token comment">// 输出当前遍历的结点值</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'当前遍历的结点值是：'</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span>  
    <span class="token comment">// 递归遍历右子树  </span>
    <span class="token function">inorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>当前遍历的结点值是： <span class="token constant">D</span>
当前遍历的结点值是： <span class="token constant">B</span>
当前遍历的结点值是： <span class="token constant">E</span>
当前遍历的结点值是： <span class="token constant">A</span>
当前遍历的结点值是： <span class="token constant">C</span>
当前遍历的结点值是： <span class="token constant">F</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="后序遍历" tabindex="-1"><a class="header-anchor" href="#后序遍历" aria-hidden="true">#</a> 后序遍历</h4>
<p>左子树 -&gt; 右子树 -&gt; 根结点</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">postorder</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 递归边界， root 为空</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> 
    <span class="token punctuation">}</span>
    <span class="token comment">// 递归遍历左子树</span>
    <span class="token function">postorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
    <span class="token comment">// 递归遍历右子树</span>
    <span class="token function">postorder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
    <span class="token comment">// 输出当前遍历的结点值</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'当前遍历的结点值是：'</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>输出结果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>当前遍历的结点值是： <span class="token constant">D</span>
当前遍历的结点值是： <span class="token constant">E</span>
当前遍历的结点值是： <span class="token constant">B</span>
当前遍历的结点值是： <span class="token constant">F</span>
当前遍历的结点值是： <span class="token constant">C</span>
当前遍历的结点值是： <span class="token constant">A</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></template>
