<template><p>1.void是什么</p>
<p>没有返回值</p>
<p>2.main()方法是Dart的入口方法，和java中的main方法类似</p>
<p>3.常量</p>
<p>final：</p>
<p>const</p>
<p>4.内置类型</p>
<ul>
<li>numberts</li>
<li>strings</li>
<li>booleans</li>
<li>lists(和數組是一個概念)</li>
<li>maps 字典</li>
<li>runes（Unicode字符串）</li>
<li>symbols 符号</li>
</ul>
<p>5.方法（函数）</p>
<p>6.可选 参数</p>
<p>7.什么叫有状态的部件（stateful widget)</p>
<p>Stateless widgets 是不可变的，这意味着它们的属性不能改变 - 所有的值都是最终的</p>
<p>Stateful widgets 持有的状态可能在widget生命周期中发生变化。实现一个stateful widget 至少需要两个类</p>
<p>1.一个 StatefulWidget类</p>
<p>2.一个 State 类。 StatefulWidget 类本身是不变的，但是 State 类在widget生命周期中始终存在</p>
<p>8.Divider  分割线</p>
<p>Scaffold： 脚手架</p>
<p>trailing： 尾部</p>
<p>drawer: 左侧面板</p>
<p>gradle</p>
<p>9.Container也是一个Widget，允许你自定义子Widget</p>
<p>10.对齐widget</p>
<p>你可以控制行或列如何使用<code>mainAxisAlignment</code>和<code>crossAxisAlignment</code>属性来对齐其子项。 对于行(Row)来说，主轴是水平方向，横轴垂直方向。对于列（Column）来说，主轴垂直方向，横轴水平方向。</p>
<p>11.import 为什么要 <code>import 'package:face9app/utilities/fetch.dart';</code></p>
<p>引入自身的package包</p>
<p>为什么不能用相对路径呢</p>
<p>因为绝对路径性能更好，而且可以避免当你内部移动文件时造成的位置变化</p>
<p>12.@override</p>
<p>覆盖</p>
<p>一个基础类定义了一个属性，这个属性是必写的</p>
<p>其他继承这个类的方法也必须写，但是可以用override覆盖它</p>
<p>13.项目环境配置+1</p>
<p>在android——build.gradle文件中，如下图</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildscript <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        // google<span class="token punctuation">(</span><span class="token punctuation">)</span>
        // jcenter<span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/repository/google'</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    dependencies <span class="token punctuation">{</span>
        classpath <span class="token string">'com.android.tools.build:gradle:3.0.1'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

allprojects <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        // google<span class="token punctuation">(</span><span class="token punctuation">)</span>
        // jcenter<span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span> url <span class="token string">'https://maven.aliyun.com/repository/google'</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>5天 将近 1500 star 的Flutter UI 模板</p>
<p>https://mp.weixin.qq.com/s?__biz=MjM5NDkxMTgyNw==&amp;mid=2653061943&amp;idx=2&amp;sn=2c7c0c62089742937df7f9adf0f81b05&amp;chksm=bd56a00b8a21291d73a868c2ddf2b37727d672771854592b336bfe12d7b0dbb1d0f05be40d4a&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1568853197337&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd</p>
<p>写给前端工程师的 Flutter 详细教程</p>
<p>https://mp.weixin.qq.com/s?__biz=MjM5ODYwMjI2MA==&amp;mid=2649745013&amp;idx=1&amp;sn=b8f3b5b6a015a608e27c2f074e9021cc&amp;chksm=bed3750e89a4fc189c9f78265c99ec8a5154c4dbdb8d9adc90316d922fbd840a7f047e2cc6de&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1576494520195&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd</p>
</template>
