<template><h2 id="widget" tabindex="-1"><a class="header-anchor" href="#widget" aria-hidden="true">#</a> widget</h2>
<h3 id="text" tabindex="-1"><a class="header-anchor" href="#text" aria-hidden="true">#</a> Text</h3>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">const</span> <span class="token class-name">Text</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data，<span class="token comment">// 内容</span>
<span class="token punctuation">{</span>			<span class="token class-name">Key</span> key<span class="token punctuation">,</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>style<span class="token comment">//样式</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>textAlign<span class="token comment">//对齐方式,</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>textDirection<span class="token comment">//文本方向,</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>softWrap<span class="token comment">//是否换行显示,</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>overflow<span class="token comment">//超出文本的处理方式,</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>textScaleFactor<span class="token comment">//每个逻辑像素的字体像素数，控制字体大小,</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>maxLines<span class="token comment">//最大行数,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul>
<li>key	//</li>
<li>style  //样式</li>
<li>textAlign  // 对齐方式</li>
<li>textDirection // 文本方向</li>
<li>softWrap   // 是否换行显示</li>
<li>overflow  // 超出文本的处理方式</li>
<li>textScaleFactor  // 每个逻辑像素的字体像素数，控制字体大小</li>
<li>maxLines  // 最大行数</li>
</ul>
<h3 id="textstyle" tabindex="-1"><a class="header-anchor" href="#textstyle" aria-hidden="true">#</a> TextStyle</h3>
<ul>
<li>inherit  // true</li>
<li>color  // 颜色</li>
<li>fontFamily // 字体</li>
<li>fontSize // 大小，默认10像素</li>
<li>fontWeight // 字重</li>
<li>fontStyle // 字体样式</li>
<li>letterSpacing  // 字间距</li>
<li>wordSpaceing  // 字符间距</li>
<li>textBaseline  // 基线</li>
<li>height // 高度</li>
<li>decoration  // 装饰</li>
<li>decorationColor  // 装饰颜色</li>
<li>decorationStyle  // 装饰样式</li>
<li>debugLabel</li>
<li></li>
</ul>
<div class="language-dar ext-dar line-numbers-mode"><pre v-pre class="language-dar"><code>body: Text(&quot;夜晚走在喧闹的小街上，反而心能更加的平静，&quot;
        &quot;或许这就是物极必反的缘故吧，&quot;
        &quot;总喜欢在最吵闹的地方去寻找那一份属于自己的宁静，&quot;
        &quot;可以不思考所有的困扰，也可以闭着眼睛静听来自远方的人间天堂的呼唤，&quot;
        &quot;然后在忽明忽暗的灯光下丢弃心中的包袱，和一脸的苦闷，&quot;
        &quot;再走到起点时，又翻去了一页，也尘封了以往。&quot;,
        style: new TextStyle(
          fontStyle: FontStyle.italic,
          fontWeight: FontWeight.bold,
          decoration: TextDecoration.underline,
          decorationColor: Colors.red,
          letterSpacing: 8.0
        ),
 )
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="icon" tabindex="-1"><a class="header-anchor" href="#icon" aria-hidden="true">#</a> Icon</h3>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">const</span> <span class="token class-name">Icon</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>icon<span class="token punctuation">,</span> <span class="token comment">//IconDate </span>
<span class="token punctuation">{</span>
    	   <span class="token class-name">Key</span> key
           <span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token comment">// 大小</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token comment">// 颜色</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>semanticLabel <span class="token comment">//标志位</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>textDirection <span class="token comment">// 绘制方向，一般使用不到</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="container" tabindex="-1"><a class="header-anchor" href="#container" aria-hidden="true">#</a> Container</h3>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token class-name">Container</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    	<span class="token class-name">Key</span> key
        <span class="token keyword">this</span><span class="token punctuation">.</span>alignment<span class="token punctuation">,</span> <span class="token comment">// 内部widget对齐方式</span>
    	<span class="token keyword">this</span><span class="token punctuation">.</span>padding<span class="token punctuation">,</span>	<span class="token comment">// 内边距</span>
    	<span class="token class-name">Color</span> color<span class="token punctuation">,</span> 	<span class="token comment">// 背景颜色，与decoration只能存在一个</span>
    	<span class="token class-name">Decoration</span> decoration <span class="token comment">// 背景装饰，与color只能存在一个</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>foregroundDecoration  <span class="token comment">// 前景装饰</span>
        double width<span class="token punctuation">,</span>	<span class="token comment">// 容器的宽</span>
    	double height 	<span class="token comment">// 容器的高</span>
        <span class="token class-name">BoxConstraints</span> constraints 
        <span class="token keyword">this</span><span class="token punctuation">.</span>margin<span class="token punctuation">,</span>
 		<span class="token keyword">this</span><span class="token punctuation">.</span>transform<span class="token punctuation">,</span>
    	<span class="token keyword">this</span><span class="token punctuation">.</span>child
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></template>
