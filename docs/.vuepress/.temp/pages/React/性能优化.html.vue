<template><h1 id="react-性能优化" tabindex="-1"><a class="header-anchor" href="#react-性能优化" aria-hidden="true">#</a> React 性能优化</h1>
<p>性能优化的话要知道一点</p>
<p>减少没必要的组件的渲染</p>
<p>把 React 比喻成一个大家族，假设妈妈在做饭，做好后，通知一声，大家来</p>
<p>如果做好一道，就喊一次：我做了 XX 菜，还有几道菜，其他人喊好的。其他人在这其中就是没必要说的，按照 React 的说法，就是没必要渲染</p>
<p>废话不多说，亮代码：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span>

<span class="token keyword">const</span> <span class="token function-variable function">Son</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'son render'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">我是儿子，在玩电脑</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Daughter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'daughter render'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">我是女儿，在刷小红书</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Mother</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'mother render'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">我是妈妈，在炒菜</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Father</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'father render'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">我是爸爸，在看NBA</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Uncle</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'uncle render'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">我是叔叔，在研究虚拟货币</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Aunt</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'aunt render'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">我是婶婶，在带货直播</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Grandfather</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'grandfather render'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">我是爷爷，在发呆</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">GrandMother</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'grandmother render'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">我是奶奶，在打电话</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Family</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">GrandMother</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Family</span></span> <span class="token punctuation">/></span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><p>memo 就是减少组件的没必要的渲染，做浅对比</p>
<p>函数式性能优化</p>
<p>​ 主要是 hooks</p>
<p>​ useMemo、useCallback、memo</p>
<p>类组件性能优化</p>
<p>​ shouldComponentUpdate、pureComponent</p>
<p>shouldComponentUpdate 与 memo 的区别</p>
<p>案例分析</p>
<p>1000 条数据的解决方案——跳转</p>
<p>「性能优化」的核心应当是「不订阅视图无关的数据，以避免重复渲染」</p>
<p>而不是「订阅了视图无关的数据，用 useCallback/useMemo 来缓解性能问题」</p>
<p>React 渲染性能优化有三个方向：</p>
<ul>
<li>减少计算的量
<ul>
<li>即减少渲染的节点或者降低组件渲染的复杂度</li>
</ul>
</li>
<li>利用缓存
<ul>
<li>如何避免重新渲染，利用函数式编程的 memo 方式来避免组件重新渲染</li>
</ul>
</li>
<li>精确重新计算的范围
<ul>
<li>绑定组件和状态关系，精确判断更新的”时机“和”范围“，只重新渲染”脏“的组件，或者说降低渲染范围</li>
</ul>
</li>
</ul>
<h3 id="memo" tabindex="-1"><a class="header-anchor" href="#memo" aria-hidden="true">#</a> memo</h3>
<p>与 shouldComponentUpdate 的效果一样</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>const areEqual = (prevProps, nextProps) =&gt; {
   // 返回结果和shouldComponentUpdate正好相反
   // 访问不了state
};
React.memo(Foo, areEqual);
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/74229420" target="_blank" rel="noopener noreferrer">浅谈 React 性能优化的方向<ExternalLinkIcon/></a></li>
<li><a href="https://liyang0207.github.io/2018/10/11/%E3%80%8A%E8%AE%B0%E5%BF%86%E5%8C%96%E6%8A%80%E6%9C%AFmemoize-one%E3%80%8B/" target="_blank" rel="noopener noreferrer">记忆化技术 memoize-one<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&amp;mid=2247484658&amp;idx=1&amp;sn=8a71fd214af39a450a301c2338acad33&amp;chksm=ce6ec05ef91949488d55bf4eca89b30336027541d12042bd16fdc9e531814eca6f7a58085a45&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1568075495674&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">「框架篇」React 中 的 9 种优化技术<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/fi3ework/blog/issues/15" target="_blank" rel="noopener noreferrer">React 高效渲染策略<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzkwODIwMDY2OQ==&amp;mid=2247488384&amp;idx=1&amp;sn=72499c2347a8b0bd43192942ab608d92&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">如何全方位优化你的超大型 React 应用 【原创精读】<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzkwODIwMDY2OQ==&amp;mid=2247488326&amp;idx=1&amp;sn=3c00c2ee434e95df1795e9bdebf2ede6&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">干货：深入了解 React 渲染原理及性能优化<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&amp;mid=2247487358&amp;idx=1&amp;sn=99298d0c25e9906c82fe01cc29f59950&amp;chksm=ea0d4584dd7acc92d2e26299feeb5b59b515bb0f866a415688b9d64fc566580a1b8f53be411b&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1582717186505&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">可能你的 react 函数组件从来没有优化过<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&amp;mid=2247484801&amp;idx=1&amp;sn=093d31f10f791728272cfd50d96b3338&amp;chksm=90320663a7458f75961aef9dd819ed96e3d6a2fcb3e48bbce2b526990d55aeee2de8173fec4e&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1583667940585&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">React 函数式组件性能优化指南<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/8qfxKV9euWg9DcOoTbgleg" target="_blank" rel="noopener noreferrer">打造高性能的 React 应用的几种方式总结<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/x3Eqd4D8CDkm0ZTd7XCUwQ" target="_blank" rel="noopener noreferrer">「react 进阶」react 开发者的不得不知道的八条优化建议<ExternalLinkIcon/></a></li>
<li><a href="https://jishuin.proginn.com/p/763bfbd5d4d0" target="_blank" rel="noopener noreferrer">这可能是全网最全的 react 性能优化知识锦集<ExternalLinkIcon/></a></li>
<li><a href="https://cloud.tencent.com/developer/news/833663" target="_blank" rel="noopener noreferrer">从源码中来，到业务中去，React 性能优化终极指南<ExternalLinkIcon/></a></li>
<li><a href="https://dev.to/harshdand/react-performance-optimization-tips-4238" target="_blank" rel="noopener noreferrer">React Performance Optimization Tips<ExternalLinkIcon/></a></li>
<li><a href="https://www.zhihu.com/question/390974405/answer/2001530387" target="_blank" rel="noopener noreferrer">新版 react 中，usecallback 和 usememo 是不是值得大量使用？<ExternalLinkIcon/></a></li>
</ul>
</template>
