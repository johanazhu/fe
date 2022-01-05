<template><h1 id="_0-1-0-2为什么不等于0-3" tabindex="-1"><a class="header-anchor" href="#_0-1-0-2为什么不等于0-3" aria-hidden="true">#</a> 0.1+0.2为什么不等于0.3</h1>
<p><strong>第一部分</strong></p>
<p>早些年在学js的时候这个问题确实碰到过，最后也只是取整而已，知道有这么回事从来不去思考为什么，因为毕竟是非科班出身。但是最近在学c++的时候，和这个问题杠上了，倒不是因为会阻塞学习流程，主要还是想弄懂；</p>
<p>回答这个问题之前首先我们等学习下计算机存储的模式；很简单不要怕；</p>
<p>计算机在硬件上存储数据的时候，大家都知道是二进制1010101010，这样；</p>
<p>比如说每个字节是8位，int类型占4个字节，也就是32位精度；那么32位的计算机精度可以存2的32次方个数据；如下图：</p>
<p><img src="https://s2.loli.net/2022/01/05/ImJCa2rFz6jN5vg.png" alt="image"></p>
<p>每个位上面可以放两个二进制数值也就是 0 或者 1；一般最高位上是符号位(1表示负数，0表示正数)，所以带符号类型数据应该是31个2</p>
<p>2 * 2 * 2 *...... * 2(31个2)   ，加上符号范围就是-2147483648 ~ 2147483647；当然也有无符号整型，暂不讨论；</p>
<p>好理解吧；</p>
<p>继续，那么小数怎么存呢，小数在计算机当中叫浮点型，JS最终会由浏览器引擎转成C++，但是js当中只有一种数值类型，那就是 <strong>number</strong>，那么number在c++是什么类型呢；</p>
<p>我们暂且认为他是双精度类型，也就是double，c++中占四个字节，也就是 64 位存储；整数存储参考上面就行；重点说说浮点存储；</p>
<p>同样64位可以分为三部分；</p>
<p>什么是 IEEE 754？</p>
<p>第一部分：符号位(S)，占1位即第63位；</p>
<p>第二部分：指数域(E)，占11位即第52位到62位，含52和62；</p>
<p>第三部分：尾数域(F)，占52位即第0位到51位，含51；</p>
<p><img src="https://i.loli.net/2021/07/28/bFDXJ3NcyMk6lgm.png" alt="img"></p>
<p>现在我要把一个小数变成二进制64位怎么表示呢？比如说   12.52571；</p>
<p>先转换成二进制（十进制如何转换二进制）是</p>
<p>1100.100001101001010011101110001110010010111000011111 =&gt;</p>
<p>1.100100001101001010011101110001110010010111000011111 * 2^3 （小数点向左偏移了三位）（为什么要偏移呢？）</p>
<p><strong>得出结论(<strong>IEEE 754标准</strong>)</strong></p>
<p>1、因为是正数，所以符号位S是0；</p>
<p>2、因为向左偏移了三位，所以E = 1023 + 3 = 1026 (转化为二进制)=&gt; 10000000010 ，有11位，不够前面补0；（为什么要加1023呢？为什么左移是加3，不是减3？）</p>
<p>3、尾数是（F）（小数点后面）100100001101001010011101110001110010010111000011111；</p>
<p>最终表示： 0 10000000010 100100001101001010011101110001110010010111000011111；</p>
<p>上面总长度是63位，差一位，最后面补零，即</p>
<p><strong>0 10000000010 1001000011010010100111011100011100100101110000111110；</strong></p>
<p>那么12.52571的64位计算机存储形式就是上面了；</p>
<p><strong>第二部分</strong></p>
<p>上面肯定有些问题，大家会迷惑，暂且不表；那么0.1和0.2大家就知道怎么转了；</p>
<p>但是这里有个问题，0.1和0.2转成二进制小数点后面是循环的；</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token comment">// 0.1 转化为二进制</span>
<span class="token number">0.0</span> <span class="token number">0011</span> <span class="token number">0011</span> <span class="token number">0011</span> <span class="token number">0011.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token number">0011</span>无限循环）
<span class="token comment">// 0.2 转化为二进制</span>
<span class="token number">0.0011</span> <span class="token number">0011</span> <span class="token number">0011</span> <span class="token number">0011</span> <span class="token number">0011.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token number">0011</span>无限循环）
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>由于尾数只有52位（52位之后的被计算机截掉了）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>E = -4; F =1001100110011001100110011001100110011001100110011010 (52位)
E = -3; F =1.1001100110011001100110011001100110011001100110011010 (52位)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>要让两个数相加，首先E需要相同，于是得出下面</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>E = -3; F =0.1100110011001100110011001100110011001100110011001101 (52位) //多余位截掉
E = -3; F =1.1001100110011001100110011001100110011001100110011010 (52位)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上面两个相加得出</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>E = -3; F = 10.0110011001100110011001100110011001100110011001100111
-------------------------------------------------------------------
E = -2; F = 1.00110011001100110011001100110011001100110011001100111
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>把第六行转成10进制之后就是：0.30000000000000004；</p>
<p>剩余</p>
<p>比如在转的时候还要考虑E的取值情况</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://www.barretlee.com/blog/2016/09/28/ieee754-operation-in-js/" target="_blank" rel="noopener noreferrer">揭秘 0.1 + 0.2 != 0.3<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzIzOTkwMjM0OQ==&amp;mid=2247484123&amp;idx=1&amp;sn=dea6a74f6010c32e1dd79a50d2c00206&amp;chksm=e9224939de55c02fb8ad467c5a728ba72deca543135146766762d319f06d8a2380a01f67808d&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1567574623469&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">浮点数0.1+0.2为何不等于0.3<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
