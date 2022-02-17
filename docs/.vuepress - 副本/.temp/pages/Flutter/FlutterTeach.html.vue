<template><h1 id="flutter" tabindex="-1"><a class="header-anchor" href="#flutter" aria-hidden="true">#</a> Flutter</h1>
<h2 id="flutter-1" tabindex="-1"><a class="header-anchor" href="#flutter-1" aria-hidden="true">#</a> Flutter</h2>
<h4 id="什么是flutter" tabindex="-1"><a class="header-anchor" href="#什么是flutter" aria-hidden="true">#</a> 什么是Flutter？</h4>
<p>谷歌出品的一款开源的跨平台移动UI框架</p>
<h4 id="有哪些人在用" tabindex="-1"><a class="header-anchor" href="#有哪些人在用" aria-hidden="true">#</a> 有哪些人在用</h4>
<p>http://flutter.dev/showcase</p>
<h4 id="对比" tabindex="-1"><a class="header-anchor" href="#对比" aria-hidden="true">#</a> 对比</h4>
<ul>
<li>Cordova</li>
<li>RN（React Native）</li>
<li>Flutter -Dart 120fps 性能高</li>
</ul>
<p>安装开发环境</p>
<p>https://flutter.cn/docs/get-started/install/windows</p>
<h3 id="flutter学习" tabindex="-1"><a class="header-anchor" href="#flutter学习" aria-hidden="true">#</a> Flutter学习</h3>
<h4 id="text-widget" tabindex="-1"><a class="header-anchor" href="#text-widget" aria-hidden="true">#</a> Text Widget</h4>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code>textAlign<span class="token punctuation">:</span>  <span class="token class-name">TextAlign</span><span class="token punctuation">.</span>left
maxLines<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
overflow<span class="token punctuation">:</span> <span class="token class-name">TextOverflow</span><span class="token punctuation">.</span>ellipsis
style<span class="token punctuation">:</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>
	fontSize<span class="token punctuation">:</span> <span class="token number">25.0</span><span class="token punctuation">,</span>
    color<span class="token punctuation">:</span> <span class="token class-name">Color</span><span class="token punctuation">.</span><span class="token function">fromARRB</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">125</span><span class="token punctuation">,</span> <span class="token number">125</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    decoration<span class="token punctuation">:</span> <span class="token class-name">TextDecoration</span><span class="token punctuation">.</span>underline<span class="token punctuation">,</span>
    decorationStyle<span class="token punctuation">:</span> <span class="token class-name">TextDecorationStyle</span><span class="token punctuation">.</span>solid<span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="container" tabindex="-1"><a class="header-anchor" href="#container" aria-hidden="true">#</a> Container</h4>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code>child<span class="token punctuation">:</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
	child<span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string">'hello, johanbo'</span><span class="token punctuation">,</span> style<span class="token punctuation">:</span> <span class="token class-name">TextStyle</span><span class="token punctuation">(</span>fontSize<span class="token punctuation">:</span> <span class="token number">40.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    alignment<span class="token punctuation">:</span> <span class="token class-name">Alignment</span><span class="token punctuation">.</span>center<span class="token punctuation">,</span>
    width<span class="token punctuation">:</span> <span class="token number">500.0</span><span class="token punctuation">,</span>
    height<span class="token punctuation">:</span> <span class="token number">400.0</span><span class="token punctuation">,</span>
    color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>lightBlue<span class="token punctuation">,</span>
    padding<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">EdgeInsets</span><span class="token punctuation">.</span><span class="token function">fromLTRB</span><span class="token punctuation">(</span><span class="token number">10.0</span><span class="token punctuation">,</span> <span class="token number">100.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    margin<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">EdgeInsets</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token number">10.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    decoration<span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token class-name">BoxDecoration</span><span class="token punctuation">(</span>
    	gradient<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">LinearGradient</span><span class="token punctuation">(</span>
        	colors<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token class-name">Colors</span><span class="token punctuation">.</span>lightBlue<span class="token punctuation">,</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>greenAccent<span class="token punctuation">,</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>purple<span class="token punctuation">]</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        border<span class="token punctuation">:</span> <span class="token class-name">Border</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>width<span class="token punctuation">:</span> <span class="token number">5.0</span><span class="token punctuation">,</span> color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>red<span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="image" tabindex="-1"><a class="header-anchor" href="#image" aria-hidden="true">#</a> Image</h4>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token class-name">Image</span> 有四种模式
    <span class="token function">asset</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> 项目中引入图片
    <span class="token function">file</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> 本地引入图片<span class="token punctuation">(</span>本地路径）
    <span class="token function">memory</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> 可以理解为内存形式的图片
    <span class="token function">network</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> 引入网络图片
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">network</span><span class="token punctuation">(</span>	<span class="token string">'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1483767998.76.webp'</span><span class="token punctuation">,</span>
 fit<span class="token punctuation">:</span><span class="token class-name">BoxFit</span><span class="token punctuation">.</span>contain <span class="token comment">// 是否填充图片至容器</span>
 color<span class="token punctuation">:</span> <span class="token class-name">Color</span><span class="token punctuation">.</span>greenAccent<span class="token punctuation">,</span>
 colorBlendMode<span class="token punctuation">:</span> <span class="token class-name">BlendMode</span><span class="token punctuation">.</span>modulate <span class="token comment">// 图片混合模式，也就是滤镜</span>
 repeat<span class="token punctuation">:</span> <span class="token class-name">ImageRepeat</span><span class="token punctuation">.</span>repeat <span class="token comment">// 是否重复</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="listview" tabindex="-1"><a class="header-anchor" href="#listview" aria-hidden="true">#</a> ListView</h4>
<p>自上到下排列</p>
<div class="language-dar ext-dar line-numbers-mode"><pre v-pre class="language-dar"><code>ListView(
	children: &lt;Widget&gt;[
        new ListTile(
        	leading: new Icons.perm_camera_mic,
        	title: new Text('perm_camera_mic')
        ),
         new ListTile(
        	leading: new Icons.add_call,
        	title: new Text('add_call')
        ),
	]
)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token class-name">ListView</span><span class="token punctuation">(</span>
    children<span class="token punctuation">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">></span></span><span class="token punctuation">[</span>
        <span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">network</span><span class="token punctuation">(</span><span class="token string">'http://t.cn/EM5Y4RF'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">network</span><span class="token punctuation">(</span><span class="token string">'http://t.cn/EM5Y4RF'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">network</span><span class="token punctuation">(</span><span class="token string">'http://t.cn/EM5Y4RF'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">network</span><span class="token punctuation">(</span><span class="token string">'http://t.cn/EM5Y4RF'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>横向列表</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token class-name">ListView</span><span class="token punctuation">(</span>
	scrollDirection<span class="token punctuation">:</span> <span class="token class-name">Axis</span><span class="token punctuation">.</span>horizontal<span class="token punctuation">,</span> <span class="token comment">// 横向</span>
    children<span class="token punctuation">:</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">></span></span><span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
        	width<span class="token punctuation">:</span> <span class="token number">180.0</span><span class="token punctuation">,</span>
            color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>lightBlue
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
        	width<span class="token punctuation">:</span> <span class="token number">180.0</span><span class="token punctuation">,</span>
            color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>lightBlue
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>
        	width<span class="token punctuation">:</span> <span class="token number">180.0</span><span class="token punctuation">,</span>
            color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>lightBlue
        <span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>技术胖的flutter教程</p>
<p>https://github.com/shenghy/flutter_shop</p>
<p>https://jspang.com/detailed?id=53</p>
<p>Flutter Dio 亲妈级别封装教程</p>
<p>https://mp.weixin.qq.com/s/D1cbiZkBrZbpsupHpcJbBg</p>
</template>
