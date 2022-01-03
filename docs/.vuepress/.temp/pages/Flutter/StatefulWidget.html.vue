<template><h1 id="statefulwidget" tabindex="-1"><a class="header-anchor" href="#statefulwidget" aria-hidden="true">#</a> StatefulWidget</h1>
<p>statefulWidget实现步骤</p>
<p>1.首先继承StagefulWidget</p>
<p>2.实现createState()的放大，返回一个State</p>
<p>StatefulWidgetD 生命周期</p>
<p><img src="@source/.vuepress/public/images/Flutter/statefulwidget生命周期.png" alt="statefulwidget生命周期"></p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">XXXState</span> <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span>XXX<span class="token punctuation">></span></span> <span class="token punctuation">{</span>

  <span class="token metadata symbol">@override</span>
  <span class="token keyword">void</span> <span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement initState</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"initState"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span>runtimeType<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token metadata symbol">@override</span>
  <span class="token keyword">void</span> <span class="token function">didChangeDependencies</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement didChangeDependencies</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">didChangeDependencies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"didChangeDependencies"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token metadata symbol">@override</span>
  <span class="token keyword">void</span> <span class="token function">didUpdateWidget</span><span class="token punctuation">(</span><span class="token class-name">MyApp</span> oldWidget<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement didUpdateWidget</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">didUpdateWidget</span><span class="token punctuation">(</span>oldWidget<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"didUpdateWidget"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>


  <span class="token metadata symbol">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"build"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>

  <span class="token metadata symbol">@override</span>
  <span class="token keyword">void</span> <span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement dispose</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"dispose"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token metadata symbol">@override</span>
  <span class="token keyword">void</span> <span class="token function">reassemble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: implement reassemble</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">reassemble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"reassemble"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p>我有疑问</p>
<p>StatefulWidget是有状态的，有state</p>
<p>而StatelessWidget是无状态的</p>
<p>呢么 StatelessWidget 是无状态组件吗</p>
<p>StatefulWidget是由State的，StatelessWidget是无State的</p>
<p>五类Widget</p>
<p>基础 Widget</p>
<p>手势识别 Widget</p>
<p>布局 Widget</p>
<p>容器类 Widget</p>
<p>可滚动 Widget</p>
</template>
