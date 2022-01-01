<template><h1 id="快速入门flutter开发" tabindex="-1"><a class="header-anchor" href="#快速入门flutter开发" aria-hidden="true">#</a> 快速入门Flutter开发</h1>
<p>Dart基础知识</p>
<p>什么是声明式UI</p>
<p>Flutter入门基础知识</p>
<p>认识视图（Views）</p>
<p>布局与列表</p>
<p>状态管理</p>
<p>路由与导航</p>
<p>线程和异步UI</p>
<p>手势检测及触摸事件处理</p>
<h2 id="dart基础知识" tabindex="-1"><a class="header-anchor" href="#dart基础知识" aria-hidden="true">#</a> Dart基础知识</h2>
<h3 id="程序入口" tabindex="-1"><a class="header-anchor" href="#程序入口" aria-hidden="true">#</a> 程序入口</h3>
<p>JavaScript没有预定义的入口函数，但在 Dart 中，每个 app 都必须有一个顶级的 <code>main()</code> 函数作为应用程序的入口</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="控制台输出" tabindex="-1"><a class="header-anchor" href="#控制台输出" aria-hidden="true">#</a> 控制台输出</h3>
<p>要在 Dart 中打印到控制台，可使用 <code>print</code>：</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token comment">// JavaScript</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello World'</span><span class="token punctuation">)</span>
<span class="token comment">// Dart</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">'Hello World'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3>
<p>Dart 是类型安全的-它使用静态类型检查和运行时的组合，可使用类型，也可以不使用类型</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code>int a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span> <span class="token comment">// a 的类型为整数</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">124</span><span class="token punctuation">;</span> <span class="token comment">// b 的类型没设置，在运行时引擎自己推断类型</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="创建和分配变量" tabindex="-1"><a class="header-anchor" href="#创建和分配变量" aria-hidden="true">#</a> 创建和分配变量</h3>
<p>在 JavaScript 中，无法定义变量类型</p>
<p>在 Dart 中，变量必须是明确的类型或系统能够解析的类型</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token comment">// JavaScript</span>
<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">"JavaScript"</span>
<span class="token comment">// Dart</span>
<span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">'dart'</span> <span class="token comment">// 明确 String 类型</span>
<span class="token keyword">var</span> otherName <span class="token operator">=</span> <span class="token string">'Dart'</span> <span class="token comment">// 推断 String 类型</span>
<span class="token comment">// 在 Dart 中两种都可以接受</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="默认值" tabindex="-1"><a class="header-anchor" href="#默认值" aria-hidden="true">#</a> 默认值</h3>
<p>在 JavaScript 中，未初始化的变量是 <code>undefined</code></p>
<p>在 Dart 中，未初始化的变量的初始值为 <code>null</code></p>
<blockquote>
<p>PS：Number 在 Dart 中也被视为对象，所以只要是带有数字类型的初始化变量的值都是“null”</p>
</blockquote>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token comment">// JavaScript</span>
<span class="token keyword">var</span> name<span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token comment">// Dart</span>
<span class="token keyword">var</span> name<span class="token punctuation">;</span> <span class="token comment">// null</span>
int x<span class="token punctuation">;</span> <span class="token comment">// null</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="检查null或零" tabindex="-1"><a class="header-anchor" href="#检查null或零" aria-hidden="true">#</a> 检查null或零</h3>
<p>在 JavaScript 中，1 或任何非 null 对象的值都被视为 true</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// JavaScript</span>
<span class="token keyword">var</span> myNull <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>myNull<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'null为false'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> zero <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>zero<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'0是false'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>在 Dart 中，只有布尔值“true”被视为 true</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token comment">// Dart</span>
<span class="token keyword">var</span> myNull <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>myNull <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"myNull的值就是null"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> zero <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>zero <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"zero的值就是0"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="dart-null检查最佳实践" tabindex="-1"><a class="header-anchor" href="#dart-null检查最佳实践" aria-hidden="true">#</a> Dart null检查最佳实践</h3>
<p>null-aware 运算符</p>
<ul>
<li><code>?.</code> 运算符在左边为 null 的情况下会阻断右边的调用</li>
<li><code>??</code> 运算符主要作用是在左侧表达式为 null 时为其设置默认值</li>
</ul>
<h3 id="functions-函数" tabindex="-1"><a class="header-anchor" href="#functions-函数" aria-hidden="true">#</a> Functions（函数）</h3>
<p>Dart 和 JavaScript 函数类似，主要区别是声明：</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token comment">// ES5</span>
function <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Dart</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 也可以这样写，设置返回结果</span>
bool <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="异步编程" tabindex="-1"><a class="header-anchor" href="#异步编程" aria-hidden="true">#</a> 异步编程</h3>
<p>与 JavaScript 一样， Dart 支持单线程执行。在 JavaScript 中，Promise 对象表示异步操作的最终完成（失败）及其结果值，Dart使用 <code>Future</code> 来表示异步操作</p>
<h3 id="async-和-await" tabindex="-1"><a class="header-anchor" href="#async-和-await" aria-hidden="true">#</a> async 和 await</h3>
<p>async 函数声明定义了一个异步函数</p>
<p>在 JavaScript 中，async 函数返回一个 Promise。await 运算符是用来等待 Promise：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// JavaScript</span>
<span class="token keyword">async</span> <span class="token function">_getIPAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">"http://httpbin.org/ip"</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>在 Dart 中， async 函数返回一个 Future，函数的主体是稍后执行。await 运算符用于等待 Future：</p>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token comment">// Dart</span>
<span class="token function">_getIPAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> url <span class="token operator">=</span> <span class="token string">"http://httpbin.org/ip"</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> request <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="什么是声明式ui" tabindex="-1"><a class="header-anchor" href="#什么是声明式ui" aria-hidden="true">#</a> 什么是声明式UI</h2>
<p>什么是声明式UI</p>
<p>像 React 那样</p>
<h2 id="flutter-入门基础知识" tabindex="-1"><a class="header-anchor" href="#flutter-入门基础知识" aria-hidden="true">#</a> Flutter 入门基础知识</h2>
<h3 id="如何创建-flutter-项目" tabindex="-1"><a class="header-anchor" href="#如何创建-flutter-项目" aria-hidden="true">#</a> 如何创建 Flutter 项目</h3>
<ul>
<li>
<p>命令行</p>
<ul>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>flutter create <span class="token operator">&lt;</span>projectname<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
</ul>
</li>
<li>
<p>使用安装了 Flutter 和 Dart 插件的 IDE</p>
</li>
</ul>
<h3 id="如何运行-flutter-项目" tabindex="-1"><a class="header-anchor" href="#如何运行-flutter-项目" aria-hidden="true">#</a> 如何运行 Flutter 项目</h3>
<ul>
<li>
<p>命令行</p>
<ul>
<li>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>flutter run -d <span class="token string">'iPhone X'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li>
<li>
<p>-d 后面跟的是具体的设备名称</p>
</li>
</ul>
</li>
<li>
<p>在 IDE 中使用“run”选项</p>
</li>
</ul>
<h3 id="如何导入widget" tabindex="-1"><a class="header-anchor" href="#如何导入widget" aria-hidden="true">#</a> 如何导入Widget？</h3>
<p>Widget 可以理解为组件，三部分 Widget，系统默认主题（安卓风和iOS风）、基础组件 widget、自定义 widget</p>
<p>在 Flutter 中，有两种 UI 库</p>
<ul>
<li>Material Design 样式，导入 <code>material.dart</code> 包</li>
<li>iOS样式，导入 <code>Cupertino</code> 库</li>
</ul>
<div class="language-dart ext-dart line-numbers-mode"><pre v-pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string">'package:flutter/material.dart'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'package:flutter/cupertino.dart'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'package:flutter/widgets.dart'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'package:flutter/my_widgets.dart'</span><span class="token punctuation">;</span> <span class="token comment">// 自定义 widget</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="认识视图-views" tabindex="-1"><a class="header-anchor" href="#认识视图-views" aria-hidden="true">#</a> 认识视图（Views）</h2>
<p>Widget 就像 React 中的 组件概念</p>
<p>有状态Widget —— 有状态组件</p>
<p>无状态Widget —— 无状态组件</p>
<h2 id="布局与列表" tabindex="-1"><a class="header-anchor" href="#布局与列表" aria-hidden="true">#</a> 布局与列表</h2>
<p>一切皆为 Widget，布局与列表有相应的 Widget</p>
<p>Row：水平方向的布局</p>
<p>Column：垂直方向的布局</p>
<p>Stack Widget：分层 ，类似于CSS 中的 position ，坐Z轴方向的布局</p>
<p>没有样式，样式也是 widget 组成</p>
<p>Padding 、Center、TextStyle 都是 widget</p>
<p>ListView：滚动组件，适用于列表滚动</p>
<ul>
<li>
<p>如何更新 widget 列表，setState()</p>
</li>
<li>
<p>ListView.Builder 构建动态列表或者拥有大量数据时使用</p>
</li>
</ul>
<h2 id="状态管理" tabindex="-1"><a class="header-anchor" href="#状态管理" aria-hidden="true">#</a> 状态管理</h2>
<p>StatelessWidget：无状态组件，只做渲染，不对状态进行处理</p>
<ul>
<li>例如 AboutDialog、Text、CircleAvator等</li>
</ul>
<p>StatefulWiget：有状态组件，通过setState 更新状态，状态更新后，视图会重新渲染</p>
<ul>
<li>例如Checkbox、Radio、Slider、Form等</li>
</ul>
<h2 id="路由与导航" tabindex="-1"><a class="header-anchor" href="#路由与导航" aria-hidden="true">#</a> 路由与导航</h2>
<p>有两个主要的 widget 用于页面之间导航：</p>
<ul>
<li>Route 是一个应用程序抽象的屏幕或页面</li>
<li>Navigator 是一个管理路由的 widget</li>
</ul>
<h2 id="线城和异步ui" tabindex="-1"><a class="header-anchor" href="#线城和异步ui" aria-hidden="true">#</a> 线城和异步UI</h2>
<p>async/await</p>
<p>Isolate 是分离的运行线程</p>
<p>如何进行网络请求：http package 请求插件</p>
<h2 id="手势检测及触摸事件处理" tabindex="-1"><a class="header-anchor" href="#手势检测及触摸事件处理" aria-hidden="true">#</a> 手势检测及触摸事件处理</h2>
<p>两种方法来添加点击监听</p>
<ol>
<li>
<p>如果 widget 本身支持事件检测，直接传递给它一个函数，并在这个函数里实现响应方法。例如 RaisedButton widget 拥有一个 onPressed 参数</p>
</li>
<li>
<p>如果 widget 本身不支持事件监测，则在外面包裹一个 GestureDetector，并给它的 onTap 属性传递一个函数</p>
</li>
</ol>
<h3 id="如何处理-widget-上的其他手势" tabindex="-1"><a class="header-anchor" href="#如何处理-widget-上的其他手势" aria-hidden="true">#</a> 如何处理 widget 上的其他手势</h3>
<p>使用 GestureDetector，可以监听多种手势，例如</p>
<ul>
<li>点击
<ul>
<li>onTapDown：在特定位置轻触手势接触了屏幕</li>
<li>onTapUp：在特定位置产生了一个轻触手势，并停止接触屏幕</li>
<li>onTap：产生了一个轻触手势</li>
<li>onTapCancel：触发了 onTapDown 但没能触发 tap</li>
</ul>
</li>
<li>双击
<ul>
<li>onDoubleTap：用户在同一个位置快速点击了两下屏幕</li>
</ul>
</li>
<li>长按
<ul>
<li>onLongPress：用户在同一个位置长时间接触屏幕</li>
</ul>
</li>
<li>垂直拖动
<ul>
<li>onVerticalDragStart：接触了屏幕，并且可能会垂直移动</li>
<li>onVerticalDragUpdate：接触了屏幕，并继续在垂直方向移动</li>
<li>onVerticalDragEnd：之前接触了屏幕并垂直移动，并在停止接触屏幕前以某个垂直的速度移动</li>
</ul>
</li>
<li>水平拖动
<ul>
<li>onHorizontalDragStart：接触了屏幕，并且可能会水平移动</li>
<li>onHorizontalDragUpdate：接触了屏幕，并继续在水平方向移动</li>
<li>onHorizontalDragEnd：之前接触了屏幕并水平移动的触摸点与屏幕分离</li>
</ul>
</li>
</ul>
</template>
