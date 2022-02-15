<template><h1 id="python" tabindex="-1"><a class="header-anchor" href="#python" aria-hidden="true">#</a> Python</h1>
<p>一切皆对象（Object）</p>
<p>有自己从属的数据类型</p>
<p>有属性（attribute）和方法（method）/函数（function）</p>
<h3 id="python-标准的数据类型-data-types" tabindex="-1"><a class="header-anchor" href="#python-标准的数据类型-data-types" aria-hidden="true">#</a> Python 标准的数据类型 Data Types</h3>
<ul>
<li>数字（Number）</li>
<li>字符（String）</li>
<li>列表（List）</li>
<li>字典（Dictionary）</li>
<li>元组（Tuple）</li>
<li>集合（Set）</li>
</ul>
<h3 id="number" tabindex="-1"><a class="header-anchor" href="#number" aria-hidden="true">#</a> Number</h3>
<h4 id="整数-integer" tabindex="-1"><a class="header-anchor" href="#整数-integer" aria-hidden="true">#</a> 整数（integer）</h4>
<ul>
<li>0.1</li>
</ul>
<p>浮点数（float）</p>
<h1 id="python-1" tabindex="-1"><a class="header-anchor" href="#python-1" aria-hidden="true">#</a> Python</h1>
<p>展哥视频课程：</p>
<p>https://www.bilibili.com/video/av23687046</p>
<p>书：</p>
<p>笨方法学python</p>
<p>廖雪峰的python3 教程</p>
<p>https://www.liaoxuefeng.com/wiki/1016959663602400/1016966022717728</p>
<h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h3>
<h4 id="整数" tabindex="-1"><a class="header-anchor" href="#整数" aria-hidden="true">#</a> 整数</h4>
<h4 id="浮点数" tabindex="-1"><a class="header-anchor" href="#浮点数" aria-hidden="true">#</a> 浮点数</h4>
<h4 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h4>
<h4 id="布尔值" tabindex="-1"><a class="header-anchor" href="#布尔值" aria-hidden="true">#</a> 布尔值</h4>
<p>布尔值可以用 <code>and</code> 、 <code>or</code> 和 <code>not</code> 运算。</p>
<h4 id="空值" tabindex="-1"><a class="header-anchor" href="#空值" aria-hidden="true">#</a> 空值</h4>
<p>空值是Python里一个特殊的值，用<code>None</code>表示。<code>None</code>不能理解为<code>0</code>，因为<code>0</code>是有意义的，而<code>None</code>是一个特殊的空值。</p>
<h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3>
<p>变量不仅可以是数字，还可以是任意数据类型。</p>
<p>它是个动态语言</p>
<p>本量本身类型不固定</p>
<h4 id="内存" tabindex="-1"><a class="header-anchor" href="#内存" aria-hidden="true">#</a> 内存</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a <span class="token operator">=</span> <span class="token string">'ABC'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>python 解释器干了两件事请：</p>
<ol>
<li>在内存中创建了一个<code>'ABC'</code> 的字符串；</li>
<li>在内存中创建了一个名为 <code>a</code> 的变量，并把它指向 <code>'ABC'</code></li>
</ol>
<h4 id="常数" tabindex="-1"><a class="header-anchor" href="#常数" aria-hidden="true">#</a> 常数</h4>
<p>所谓常量就是不能变的变量，比如常用的数学常数π就是一个常量。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>PI <span class="token operator">=</span> <span class="token number">3.14159265359</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>注意：Python的整数没有大小限制，而某些语言的整数根据其存储长度是有大小限制的，例如Java对32位整数的范围限制在<code>-2147483648</code>-<code>2147483647</code>。</p>
<p>Python的浮点数也没有大小限制，但是超出一定范围就直接表示为<code>inf</code>（无限大）</p>
</template>
