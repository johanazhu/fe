<template><h1 id="代码规范" tabindex="-1"><a class="header-anchor" href="#代码规范" aria-hidden="true">#</a> 代码规范</h1>
<p>​</p>
<h2 id="html-规范" tabindex="-1"><a class="header-anchor" href="#html-规范" aria-hidden="true">#</a> HTML 规范</h2>
<h4 id="基础脚手架-pc" tabindex="-1"><a class="header-anchor" href="#基础脚手架-pc" aria-hidden="true">#</a> 基础脚手架 PC</h4>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 统一使用HTML5的DOCTYPE --></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- lang使用zh-CN，考虑设备兼容 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>zh-CN<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
	<span class="token comment">&lt;!-- 页面编码使用UTF-8 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	
	<span class="token comment">&lt;!-- 采用IE=Edge, chrome=1 浏览器兼容模式 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=Edge,chrome=1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	
	<span class="token comment">&lt;!-- keywords,description 必须 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>keywords<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>description<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	
	<span class="token comment">&lt;!-- title 必须 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>

	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

	<span class="token comment">&lt;!-- @author [yourname] | @design [designer name] | @pm [pm name] --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>

	<span class="token comment">&lt;!-- start 模块名称 --></span>
	<span class="token comment">&lt;!-- end 模块名称 --></span>

	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h4 id="基础脚手架-m站" tabindex="-1"><a class="header-anchor" href="#基础脚手架-m站" aria-hidden="true">#</a> 基础脚手架 M站</h4>
<div class="language-HTML ext-HTML line-numbers-mode"><pre v-pre class="language-HTML"><code>&lt;!-- 统一使用HTML5的DOCTYPE --&gt;
&lt;!DOCTYPE html&gt;
&lt;!-- lang使用zh-CN，考虑设备兼容 --&gt;
&lt;html lang=&quot;zh-CN&quot;&gt;
&lt;head&gt;
	&lt;!-- 页面编码使用UTF-8 --&gt;
	&lt;meta charset=&quot;UTF-8&quot;&gt;
	
	&lt;!-- viewport --&gt;
	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,user-scalable=no&quot;&gt;

	&lt;!-- keywords,description 必须 --&gt;
	&lt;meta name=&quot;keywords&quot; content=&quot;&quot;&gt;
	&lt;meta name=&quot;description&quot; content=&quot;&quot;&gt;
	
	&lt;!-- title 必须 --&gt;
	&lt;title&gt;Document&lt;/title&gt;

	&lt;link rel=&quot;stylesheet&quot; href=&quot;index.css&quot;&gt;

	&lt;!-- @author [yourname] | @design [designer name] | @pm [pm name] --&gt;
&lt;/head&gt;
&lt;body&gt;

	&lt;!-- start 模块名称 --&gt;
	&lt;!-- end 模块名称 --&gt;

	&lt;script src=&quot;index.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="css-规范" tabindex="-1"><a class="header-anchor" href="#css-规范" aria-hidden="true">#</a> CSS 规范</h2>
<div class="language-scss ext-scss line-numbers-mode"><pre v-pre class="language-scss"><code>.
└── scss
    ├── _init
    │   ├── _init.scss      <span class="token comment">// 每个scss都需要引用这个文件，这个文件引用了下面两个文件</span>
    │   ├── _mixin.scss     <span class="token comment">// 封装的一些辅助方法</span>
    │   └── _variable.scss  <span class="token comment">// 全局用到的参数</span>
    ├── global              <span class="token comment">// 全局样式</span>
    │   ├── _acss.scss      <span class="token comment">// 原子化CSS</span>
    │   ├── _reset.scss     <span class="token comment">// 样式重置</span>
    │   ├── _base.scss      <span class="token comment">// 基础样式</span>
    │   └── index.scss      <span class="token comment">// 这个文件引用了以上所有文件</span>
    └── index
        └── index.scss
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>- src
	- api			//	接口管理目录
	- assets		//	图片资源目录
	- common		// 	公共资源目录（函数库、请求封装）
	- components	// 	组件库
	
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="命名规范" tabindex="-1"><a class="header-anchor" href="#命名规范" aria-hidden="true">#</a> 命名规范</h2>
<h4 id="组件命名" tabindex="-1"><a class="header-anchor" href="#组件命名" aria-hidden="true">#</a> 组件命名：</h4>
<p>​	文件与组件命名保持一致，使用 <code>PascalCase</code>，即驼峰命名法，如 <code>Timeline.tsx</code> 为时间轴组件</p>
<h4 id="页面命名" tabindex="-1"><a class="header-anchor" href="#页面命名" aria-hidden="true">#</a> 页面命名：</h4>
<p>​</p>
<h4 id="变量命名" tabindex="-1"><a class="header-anchor" href="#变量命名" aria-hidden="true">#</a> 变量命名：</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>常量-全大写+下划线，如：

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>https://github.com/Buddhas/ele-admin-vue/blob/master/ele-admin-vue/README.md</p>
<p>我认为移动端没必要和ant design pro 硬绑定到一起，理由如下</p>
<p>（一）移动端</p>
<p>最原始版本的ant design pro 不仅有权限，有国际化，有ant design pro 有 pro table 等，还有与umi ui 的结合，是软绑定观点，</p>
<p>如果说ant design 是开源的UI框架，那么 ant design pro 更以阿里脚手架为核心的聚合产品，</p>
<p>他更适用于做后台，</p>
<p>两者有什么是同通的，权限，</p>
<p>用 umi 开发，已经很大程度上的规避掉原生开发的一些列问题，</p>
<p>约定式路由，</p>
<table>
<thead>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>现在的重构版与紫菜的项目的区别在于</p>
<p>重构版用hook来写组件，样式用的是sass，jqb design 用的也是 sass</p>
<p>紫菜用class类写组件，样式用css in js，</p>
<p>像其他的，大多数都是看的懂的</p>
<p>随着版本的升级，pro 现在已经有5了，紫菜用的是4，那是否为了新而追求新。共赢和咨询用的是umi2，现在重构版的用的是umi3，是否也要统一呢？</p>
<p>就像我现在去写惠选宝业务一样，让我写，一天就上手了，写的无非是业务逻辑和组件拼接，这些在原有页面已经有，找起来很方便。</p>
<p>而命名是个大问题，正如我下面所说，我们需要的是代码规范，而非项目统一，项目是没发统一的，</p>
<p>umi 的特点是强约束、配置化和约定化</p>
<h4 id="强约束" tabindex="-1"><a class="header-anchor" href="#强约束" aria-hidden="true">#</a> 强约束</h4>
<p>React 框架 + TypeScript + Eslint + Prettier + 固定配置 + dva</p>
<p>你写的代码的格式，类型，写法都被限制</p>
<p>如果提高代码质量，</p>
<p>搭建 gitlab，上传至仓库，发布前需将代码给前端同事review，既能提高自己的review代码的能力，也能找到一些明显的bug</p>
</template>
