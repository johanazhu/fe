import{_ as s,c as n,o as a,d as p}from"./app.590c1fbf.js";const l="/assets/statefulwidget生命周期.1d669185.png",b=JSON.parse('{"title":"StatefulWidget","description":"","frontmatter":{},"headers":[],"relativePath":"Flutter/StatefulWidget.md"}'),e={name:"Flutter/StatefulWidget.md"},o=p('<h1 id="statefulwidget" tabindex="-1">StatefulWidget <a class="header-anchor" href="#statefulwidget" aria-hidden="true">#</a></h1><p>statefulWidget 实现步骤</p><p>1.首先继承 StagefulWidget</p><p>2.实现 createState()的放大，返回一个 State</p><p>StatefulWidgetD 生命周期</p><p><img src="'+l+`" alt="statefulwidget生命周期"></p><div class="language-dart line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">XXXState</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">State</span><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">XXX</span><span style="color:#A6ACCD;">&gt; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">@override</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">initState</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// TODO: implement initState</span></span>
<span class="line"><span style="color:#A6ACCD;">    super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">initState</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;initState&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    context</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">runtimeType</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">@override</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">didChangeDependencies</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// TODO: implement didChangeDependencies</span></span>
<span class="line"><span style="color:#A6ACCD;">    super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">didChangeDependencies</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;didChangeDependencies&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">@override</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">didUpdateWidget</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">MyApp</span><span style="color:#A6ACCD;"> oldWidget) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// TODO: implement didUpdateWidget</span></span>
<span class="line"><span style="color:#A6ACCD;">    super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">didUpdateWidget</span><span style="color:#A6ACCD;">(oldWidget)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;didUpdateWidget&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">@override</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Widget</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">build</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">BuildContext</span><span style="color:#A6ACCD;"> context) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;build&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">@override</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">dispose</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// TODO: implement dispose</span></span>
<span class="line"><span style="color:#A6ACCD;">    super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dispose</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;dispose&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">@override</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">reassemble</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// TODO: implement reassemble</span></span>
<span class="line"><span style="color:#A6ACCD;">    super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reassemble</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;reassemble&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p>我有疑问</p><p>StatefulWidget 是有状态的，有 state</p><p>而 StatelessWidget 是无状态的</p><p>呢么 StatelessWidget 是无状态组件吗</p><p>StatefulWidget 是由 State 的，StatelessWidget 是无 State 的</p><p>五类 Widget</p><p>基础 Widget</p><p>手势识别 Widget</p><p>布局 Widget</p><p>容器类 Widget</p><p>可滚动 Widget</p>`,18),t=[o];function r(c,i,A,C,y,D){return a(),n("div",null,t)}const u=s(e,[["render",r]]);export{b as __pageData,u as default};