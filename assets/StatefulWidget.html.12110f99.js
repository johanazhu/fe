import{_ as n,e as s}from"./app.873f0dc8.js";var a="/assets/statefulwidget\u751F\u547D\u5468\u671F.1d669185.png";const p={},t=s('<h1 id="statefulwidget" tabindex="-1"><a class="header-anchor" href="#statefulwidget" aria-hidden="true">#</a> StatefulWidget</h1><p>statefulWidget \u5B9E\u73B0\u6B65\u9AA4</p><p>1.\u9996\u5148\u7EE7\u627F StagefulWidget</p><p>2.\u5B9E\u73B0 createState()\u7684\u653E\u5927\uFF0C\u8FD4\u56DE\u4E00\u4E2A State</p><p>StatefulWidgetD \u751F\u547D\u5468\u671F</p><p><img src="'+a+`" alt="statefulwidget\u751F\u547D\u5468\u671F"></p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">XXXState</span> <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span>XXX<span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

  <span class="token metadata function">@override</span>
  <span class="token keyword">void</span> <span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement initState</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;initState&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span>runtimeType<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token metadata function">@override</span>
  <span class="token keyword">void</span> <span class="token function">didChangeDependencies</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement didChangeDependencies</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">didChangeDependencies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;didChangeDependencies&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token metadata function">@override</span>
  <span class="token keyword">void</span> <span class="token function">didUpdateWidget</span><span class="token punctuation">(</span><span class="token class-name">MyApp</span> oldWidget<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement didUpdateWidget</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">didUpdateWidget</span><span class="token punctuation">(</span>oldWidget<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;didUpdateWidget&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>


  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;build&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>

  <span class="token metadata function">@override</span>
  <span class="token keyword">void</span> <span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement dispose</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;dispose&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token metadata function">@override</span>
  <span class="token keyword">void</span> <span class="token function">reassemble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement reassemble</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">reassemble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;reassemble&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p>\u6211\u6709\u7591\u95EE</p><p>StatefulWidget \u662F\u6709\u72B6\u6001\u7684\uFF0C\u6709 state</p><p>\u800C StatelessWidget \u662F\u65E0\u72B6\u6001\u7684</p><p>\u5462\u4E48 StatelessWidget \u662F\u65E0\u72B6\u6001\u7EC4\u4EF6\u5417</p><p>StatefulWidget \u662F\u7531 State \u7684\uFF0CStatelessWidget \u662F\u65E0 State \u7684</p><p>\u4E94\u7C7B Widget</p><p>\u57FA\u7840 Widget</p><p>\u624B\u52BF\u8BC6\u522B Widget</p><p>\u5E03\u5C40 Widget</p><p>\u5BB9\u5668\u7C7B Widget</p><p>\u53EF\u6EDA\u52A8 Widget</p>`,18);function e(c,o){return t}var i=n(p,[["render",e],["__file","StatefulWidget.html.vue"]]);export{i as default};
