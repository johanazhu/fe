<template><h1 id="数据结构与算法" tabindex="-1"><a class="header-anchor" href="#数据结构与算法" aria-hidden="true">#</a> 数据结构与算法</h1>
<p>算法目前在前端面试中常出现，有什么办法可以提升呢？</p>
<p>我的方法是每天练习</p>
<p>做了一个实验，每天早起写一个 leetcode 题，并且公开我的库练习库 <a href="https://github.com/johanazhu/leetcode" target="_blank" rel="noopener noreferrer">leetcode<ExternalLinkIcon/></a></p>
<p>这里，我对一些数据结构与算法做一分钟解释，具体练习可以看我的算题记录</p>
<h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h2>
<p>时间复杂度</p>
<p>空间复杂度</p>
<h2 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h2>
<p><a href="#%E5%AD%97%E7%AC%A6%E4%B8%B2">字符串</a></p>
<p><a href="#%E6%95%B0%E7%BB%84">数组</a></p>
<p><a href="#%E9%93%BE%E8%A1%A8">链表</a></p>
<p><a href="#%E6%A0%88%EF%BC%88Stack%EF%BC%89">栈</a></p>
<p><a href="#%E9%98%9F%E5%88%97%EF%BC%88Queue%EF%BC%89">队列</a></p>
<p><a href="#%E5%93%88%E5%B8%8C%E8%A1%A8">哈希表</a></p>
<p><a href="#%E5%A0%86">堆</a></p>
<p>跳表</p>
<p>图</p>
<p>二叉树</p>
<p>Tire数</p>
<h2 id="算法" tabindex="-1"><a class="header-anchor" href="#算法" aria-hidden="true">#</a> 算法</h2>
<p>递归</p>
<p>排序</p>
<p>二分查找</p>
<p>BFS</p>
<p>DFS</p>
<p>滑动窗口（双指针）</p>
<p>搜索</p>
<p>哈希</p>
<p>贪心</p>
<p>分治</p>
<p>回溯</p>
<p>动态规划</p>
<h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h3>
<p>字符串概述</p>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<p>数组（Array）是一种线性表数据结构。它用一组连续的内存空间，来存储一组具有相同类型的数据</p>
<h3 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h3>
<p>链表和数组相似，他们都是有序的列表、都是线性结构（有且仅有一个前驱、有且仅有一个后继）。不同点在于，链表中，数据单位的名称叫做“结点”，而结点和结点的分布，在内存中可以是<strong>离散</strong>的</p>
<h3 id="栈-stack" tabindex="-1"><a class="header-anchor" href="#栈-stack" aria-hidden="true">#</a> 栈（Stack）</h3>
<p>栈是一种后进先出（LIFO，Last In First Out）的数据结构</p>
<p>只用 pop 和 push 完成增删的“数组”</p>
<p>它由两个特征：</p>
<ul>
<li>只允许从尾部添加元素</li>
<li>只允许从尾部取出元素</li>
</ul>
<p><strong>对应到数组的方法，刚好就是 push 和 pop。因此我们可以认为在 JavaScript 中，栈就是限制只能用 push 来添加元素，同事只能用 pop 来移除元素的一种特殊的数组</strong></p>
<p>除了 pop 和 push 之外，栈相关的面试题中往往还会涉及到取栈顶元素的操作。所谓栈顶元素，实际上它值得就是数组尾部的元素</p>
<h3 id="队列-queue" tabindex="-1"><a class="header-anchor" href="#队列-queue" aria-hidden="true">#</a> 队列（Queue）</h3>
<p>队列是一种先进先出（FIFO，First In First Out）的数据结构</p>
<p>只用 push 和 shift 完成增删的“数组”</p>
<p>它就像我们去排队（没有插队的情况下）。先排队的人先轮到，后排到的人后轮到</p>
<p>两个特征：</p>
<ul>
<li>只允许从尾部添加元素</li>
<li>只允许从头部移除元素</li>
</ul>
<p>整个过程只涉及了数组的 push 和 shift 方法</p>
<p>在栈元素入栈时，我们关系的是栈顶元素（数组的最后一个元素）；队列元素出栈时，我们关心的则是队头元素（数组的第一个元素）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'first son'</span><span class="token punctuation">)</span>
queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'second son'</span><span class="token punctuation">)</span>
queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'third son'</span><span class="token punctuation">)</span>

<span class="token keyword">while</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> top <span class="token operator">=</span> queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>top<span class="token punctuation">,</span> <span class="token string">'轮到你'</span><span class="token punctuation">)</span>
    queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 出栈</span>
<span class="token punctuation">}</span>

queue
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://juejin.im/book/6844733800300150797/section/6844733800342093832" target="_blank" rel="noopener noreferrer">前端算法与数据结构面试<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MjM5NDkxMTgyNw==&amp;mid=2653061880&amp;idx=2&amp;sn=1d704d7f84bfa7264d02a509f96b5839&amp;chksm=bd56a1c48a2128d25b23c0b33525a31f225f47a4ca84e32e4e31397ab653b48f12f0a6ae23c8&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1567569370392&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">十大经典排序算法汇总<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903482432962573" target="_blank" rel="noopener noreferrer">在 JavaScript 中学习数据结构与算法<ExternalLinkIcon/></a></li>
</ul>
</template>
