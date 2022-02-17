<template><h1 id="flutter导航" tabindex="-1"><a class="header-anchor" href="#flutter导航" aria-hidden="true">#</a> Flutter导航</h1>
<h2 id="flutter-的安装" tabindex="-1"><a class="header-anchor" href="#flutter-的安装" aria-hidden="true">#</a> Flutter 的安装</h2>
<p>直接去<a href="https://flutter.cn/docs/get-started/install/windows" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a>下载，放好位置，我放在<code>D://</code></p>
<p>配置环境，环境变量的 path 中添加 <code>D://</code>，这样我们就能在任何地方运行 flutter 指令了</p>
<p>运行 <code>flutter doctor</code></p>
<p><img src="https://i.loli.net/2021/09/29/a9ONX47sbPUVTz5.png" alt="flutter doctor"></p>
<p>接下来就是启动 android studio</p>
<p>开启第一个 flutter 项目</p>
<p>查看 flutter 、dart 安装目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>where flutter dart
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查看flutter</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>flutter doctor
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>验证 flutter 是否识别你连接的 Android 设备</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>flutter devices
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>运行启动项目</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>flutter run
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>起一个 flutter 项目</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>flutter create my_app
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>运行 flutter</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>flutter run XX
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>https://flutterawesome.com/</p>
<p>Flutter是什么？</p>
<p>Flutter 能做什么？</p>
<p>Flutter与React Native 的对比</p>
<p>Flutter 的最小实现</p>
<p>状态管理</p>
<p>Bloc - redux - mobx</p>
<p>https://github.com/FlutterDance/movie</p>
<p>https://mp.weixin.qq.com/s/rUcWz7Rx5T34WyYoCDLh8Q</p>
<p>怎样写好Flutter代码</p>
<p>https://mp.weixin.qq.com/s/Xsp4pdxqdyGovXQmXcKk7A</p>
<p>flutter 是近些年流行的跨端方案，跨的端包括安卓、ios、web 等。它最大的特点是渲染不是基于操作系统的组件，而是直接基于绘图库（skia）来绘制的，这样做到了渲染的跨端。逻辑的跨端也不是基于 js 引擎，而是自研的 dart vm 来跨端，通过 dart 语言来写逻辑，</p>
<p>页面切换添加动画</p>
<p>https://flutter.cn/docs/cookbook/animation/page-route-animation</p>
<p>flutter 基本介绍</p>
<p>dart 语法介绍</p>
<p>从 redux 到 flutter 数据管理</p>
<p>​	redux ：咸鱼的 flutter-redux</p>
<p>​	官方推荐的 bloc</p>
<p>​	其他的方式</p>
<p>实战一个项目需要注意什么</p>
<p>demo，需要学习什么</p>
<ul>
<li>
<p>状态管理怎么做</p>
</li>
<li>
<p>页面切换的动画效果</p>
</li>
<li>
<p>与原生的交互</p>
</li>
<li>
<p>webview的介入</p>
</li>
</ul>
<p>Dart基础知识</p>
<p>什么是声明式UI</p>
<p>Flutter 入门基础知识</p>
<p>项目结构、资源、依赖和本地化</p>
<p>认识视图（Views）</p>
<p>布局与列表</p>
<p>状态管理</p>
<p>路由与导航</p>
<p>线程和异步UI</p>
<p>手势检测及触摸事件</p>
<p>主题和文字处理</p>
<p>表单输入与富文本</p>
<p>调用硬件、第三方服务以及平台交互、通知</p>
</template>
