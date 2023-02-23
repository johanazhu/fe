import{_ as s,c as a,o as n,d as l}from"./app.590c1fbf.js";const d=JSON.parse('{"title":"React 性能优化","description":"","frontmatter":{},"headers":[{"level":3,"title":"优化技巧","slug":"优化技巧","link":"#优化技巧","children":[]},{"level":3,"title":"跳过不必要的组件更新","slug":"跳过不必要的组件更新","link":"#跳过不必要的组件更新","children":[]},{"level":3,"title":"memo","slug":"memo","link":"#memo","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"React/性能优化.md"}'),p={name:"React/性能优化.md"},e=l(`<h1 id="react-性能优化" tabindex="-1">React 性能优化 <a class="header-anchor" href="#react-性能优化" aria-hidden="true">#</a></h1><p>触发 React 组件的 Render 过程目前有三种方式，分别为 forceUpdate、State 更新、父组件 Render 触发子组件 Render 过程</p><h3 id="优化技巧" tabindex="-1">优化技巧 <a class="header-anchor" href="#优化技巧" aria-hidden="true">#</a></h3><ol><li>跳过不必要的组件更新。这类优化是在组件状态发生变更后，通过减少不必要的组件更新来实现</li><li>提交阶段优化。这类优化的目的是减少提交阶段耗时</li><li>前端通用优化。这类优化在所有前端框架中都存在</li></ol><h3 id="跳过不必要的组件更新" tabindex="-1">跳过不必要的组件更新 <a class="header-anchor" href="#跳过不必要的组件更新" aria-hidden="true">#</a></h3><h4 id="purecomponent、react-memo" tabindex="-1">PureComponent、React.memo <a class="header-anchor" href="#purecomponent、react-memo" aria-hidden="true">#</a></h4><p>在 React 工作流中，如果只有父组件发生状态更新，即使父组件传给子组件的所有 Props 都没有修改，也会引起子组件的 Render 过程。从 React 的声明式设计理念来看，如果子组件的 Props 和 State 都没有改变，那么其生成的 DOM 结构和副作用也不应该发生改变。当子组件符合声明式设计理念时，就可以忽略子组件本次的 Render 过程。PureComponent 和 React.memo 就是应对这种场景的，PureComponent 是对类组件的 Props 和 State 进行浅比较，React.memo 是对函数组件的 Props 进行浅比较</p><h4 id="shouldcomponentupdate" tabindex="-1">shouldComponentUpdate <a class="header-anchor" href="#shouldcomponentupdate" aria-hidden="true">#</a></h4><p>仅在「子组件使用的属性」发生改变时才返回 <code>true</code>，便能避免子组件重新 Render。</p><h4 id="usememo、usecallback-实现稳定的-props-值" tabindex="-1">useMemo、useCallback 实现稳定的 Props 值 <a class="header-anchor" href="#usememo、usecallback-实现稳定的-props-值" aria-hidden="true">#</a></h4><h4 id="hooks-按需更新" tabindex="-1">Hooks 按需更新 <a class="header-anchor" href="#hooks-按需更新" aria-hidden="true">#</a></h4><p>性能优化的话要知道一点</p><p>减少没必要的组件的渲染</p><p>把 React 比喻成一个大家族，假设妈妈在做饭，做好后，通知一声，大家来</p><p>如果做好一道，就喊一次：我做了 XX 菜，还有几道菜，其他人喊好的。其他人在这其中就是没必要说的，按照 React 的说法，就是没必要渲染</p><p>废话不多说，亮代码：</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> React </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">react</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Son </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">son render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">我是儿子，在玩电脑</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Daughter </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">daughter render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">我是女儿，在刷小红书</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Mother </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">mother render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">我是妈妈，在炒菜</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Father </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">father render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">我是爸爸，在看NBA</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Uncle </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">uncle render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">我是叔叔，在研究虚拟货币</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Aunt </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">aunt render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">我是婶婶，在带货直播</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Grandfather </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">grandfather render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">我是爷爷，在发呆</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> GrandMother </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">grandmother render</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">我是奶奶，在打电话</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Family </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> (</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&lt;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">GrandMother</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/&gt;</span></span>
<span class="line"><span style="color:#F07178;">    )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> App </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Family</span><span style="color:#89DDFF;"> /&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><p>memo 就是减少组件的没必要的渲染，做浅对比</p><p>函数式性能优化</p><p>主要是 hooks</p><p>useMemo、useCallback、memo</p><p>类组件性能优化</p><p>shouldComponentUpdate、pureComponent</p><p>shouldComponentUpdate 与 memo 的区别</p><p>案例分析</p><p>1000 条数据的解决方案——跳转</p><p>「性能优化」的核心应当是「不订阅视图无关的数据，以避免重复渲染」</p><p>而不是「订阅了视图无关的数据，用 useCallback/useMemo 来缓解性能问题」</p><p>React 渲染性能优化有三个方向：</p><ul><li>减少计算的量 <ul><li>即减少渲染的节点或者降低组件渲染的复杂度</li></ul></li><li>利用缓存 <ul><li>如何避免重新渲染，利用函数式编程的 memo 方式来避免组件重新渲染</li></ul></li><li>精确重新计算的范围 <ul><li>绑定组件和状态关系，精确判断更新的”时机“和”范围“，只重新渲染”脏“的组件，或者说降低渲染范围</li></ul></li></ul><h3 id="memo" tabindex="-1">memo <a class="header-anchor" href="#memo" aria-hidden="true">#</a></h3><p>与 shouldComponentUpdate 的效果一样</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> areEqual </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">prevProps</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">nextProps</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;font-style:italic;">// 返回结果和shouldComponentUpdate正好相反</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;font-style:italic;">// 访问不了state</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">React</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">memo</span><span style="color:#A6ACCD;">(Foo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> areEqual)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="https://zhuanlan.zhihu.com/p/74229420" target="_blank" rel="noreferrer">浅谈 React 性能优化的方向</a></li><li><a href="https://liyang0207.github.io/2018/10/11/%E3%80%8A%E8%AE%B0%E5%BF%86%E5%8C%96%E6%8A%80%E6%9C%AFmemoize-one%E3%80%8B/" target="_blank" rel="noreferrer">记忆化技术 memoize-one</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&amp;mid=2247484658&amp;idx=1&amp;sn=8a71fd214af39a450a301c2338acad33&amp;chksm=ce6ec05ef91949488d55bf4eca89b30336027541d12042bd16fdc9e531814eca6f7a58085a45&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1568075495674&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">「框架篇」React 中 的 9 种优化技术</a></li><li><a href="https://github.com/fi3ework/blog/issues/15" target="_blank" rel="noreferrer">React 高效渲染策略</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzkwODIwMDY2OQ==&amp;mid=2247488384&amp;idx=1&amp;sn=72499c2347a8b0bd43192942ab608d92&amp;source=41#wechat_redirect" target="_blank" rel="noreferrer">如何全方位优化你的超大型 React 应用 【原创精读】</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzkwODIwMDY2OQ==&amp;mid=2247488326&amp;idx=1&amp;sn=3c00c2ee434e95df1795e9bdebf2ede6&amp;source=41#wechat_redirect" target="_blank" rel="noreferrer">干货：深入了解 React 渲染原理及性能优化</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&amp;mid=2247487358&amp;idx=1&amp;sn=99298d0c25e9906c82fe01cc29f59950&amp;chksm=ea0d4584dd7acc92d2e26299feeb5b59b515bb0f866a415688b9d64fc566580a1b8f53be411b&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1582717186505&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">可能你的 react 函数组件从来没有优化过</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&amp;mid=2247484801&amp;idx=1&amp;sn=093d31f10f791728272cfd50d96b3338&amp;chksm=90320663a7458f75961aef9dd819ed96e3d6a2fcb3e48bbce2b526990d55aeee2de8173fec4e&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1583667940585&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">React 函数式组件性能优化指南</a></li><li><a href="https://mp.weixin.qq.com/s/8qfxKV9euWg9DcOoTbgleg" target="_blank" rel="noreferrer">打造高性能的 React 应用的几种方式总结</a></li><li><a href="https://mp.weixin.qq.com/s/x3Eqd4D8CDkm0ZTd7XCUwQ" target="_blank" rel="noreferrer">「react 进阶」react 开发者的不得不知道的八条优化建议</a></li><li><a href="https://jishuin.proginn.com/p/763bfbd5d4d0" target="_blank" rel="noreferrer">这可能是全网最全的 react 性能优化知识锦集</a></li><li><a href="https://cloud.tencent.com/developer/news/833663" target="_blank" rel="noreferrer">从源码中来，到业务中去，React 性能优化终极指南</a></li><li><a href="https://dev.to/harshdand/react-performance-optimization-tips-4238" target="_blank" rel="noreferrer">React Performance Optimization Tips</a></li><li><a href="https://www.zhihu.com/question/390974405/answer/2001530387" target="_blank" rel="noreferrer">新版 react 中，usecallback 和 usememo 是不是值得大量使用？</a></li><li><a href="https://juejin.cn/post/6935584878071119885" target="_blank" rel="noreferrer">React 性能优化 | 包括原理、技巧、Demo、工具使用</a></li></ul>`,35),o=[e];function r(t,c,i,D,F,y){return n(),a("div",null,o)}const b=s(p,[["render",r]]);export{d as __pageData,b as default};
