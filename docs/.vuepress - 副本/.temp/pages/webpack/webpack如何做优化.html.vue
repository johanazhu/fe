<template><h1 id="webpack如何做优化" tabindex="-1"><a class="header-anchor" href="#webpack如何做优化" aria-hidden="true">#</a> webpack如何做优化</h1>
<p>开发环境：</p>
<ol>
<li>
<p>值得去配置的：</p>
<ol>
<li>
<p>优化开发体验</p>
<ol>
<li>
<p>自动刷新 -&gt; 模块热更新</p>
<ol>
<li>
<p>实时预览反应更快，等待时间更短</p>
</li>
<li>
<p>不刷新浏览器能保留当前网页的运行状态</p>
<p>需要在入口文件进行配置：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 入口文件 </span>
<span class="token keyword">if</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>hot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'./App'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>PS: 模块热更新机制</p>
<pre><code>1. 当子模块发生更新时，更新事件会一层层往上传递，也就是从 App.js 文件传递到 main.js 文件，直到有某层的文件接受了当前变化的模块，也就是 main.js 文件中定义的 module.hot.appept(['./App', callback])，这时就会调用 callback 函数去执行自定义逻辑
2. 如果事件一直往上抛到最外层都没有文件接受它，就会直接刷新网页
</code></pre>
<p>webpack方面也有相应的开启热跟新的处理</p>
<p>​</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> HotModuleReplacementPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack/lib/HotModuleReplacementPlugin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">webpackMerge</span><span class="token punctuation">(</span>baseConfig<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HotModuleReplacementPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  devServer<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 每次构建时候自动打开浏览器并访问网址</span>
    open<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 开启热更新</span>
    hot<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 设置静态资源地址如：/public，从这获取你想要的一些外链资源，图片。</span>
    contentBase<span class="token operator">:</span> <span class="token constant">DIST_PATH</span><span class="token punctuation">,</span>
    <span class="token comment">// 设置端口号</span>
    port<span class="token operator">:</span> <span class="token number">9000</span><span class="token punctuation">,</span>
    <span class="token comment">// 将热更新代码注入到模块中</span>
    inline<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 如果你希望服务器外部可访问</span>
    host<span class="token operator">:</span> <span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span>
    <span class="token comment">// 设置 proxy 代理</span>
    proxy<span class="token operator">:</span> <span class="token punctuation">{</span>
      context<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'/api'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      target<span class="token operator">:</span> <span class="token string">"//www.proxy.com"</span><span class="token punctuation">,</span>
      pathRewrite<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string">"^/api"</span> <span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 设置 https</span>
    https<span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><ol start="2">
<li>配置 sourcemap，方便调试</li>
</ol>
</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  devtool<span class="token operator">:</span> <span class="token string">'source-map'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>PS: devtool 有各种选择，不同的选项构建速度不同</p>
</li>
</ol>
</li>
<li>
<p>尽可能减少构建时间</p>
<ol>
<li>
<p>减少模块朝招范围，缩小 Babel 的编译范围，并使用 webpack cache 缓存模块</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 减小模块的查找范围</span>
  resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
    modules<span class="token operator">:</span> <span class="token punctuation">[</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'node_modules'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js?$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          loader<span class="token operator">:</span> <span class="token string">'babel-loader'</span><span class="token punctuation">,</span>
          query<span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token comment">// 将 babel 编译过的模块缓存在 webpack_cache 目录下，下次优先复用</span>
            cacheDirectory<span class="token operator">:</span> <span class="token string">'./webpack_cache/'</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 减少 babel 编译范围，忘记设置会让 webpack 编译慢上好几倍</span>
        include<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'src'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ol start="2">
<li>
<p>使用 DllPlugin 预先打包好第三方库</p>
<pre><code>  	1. ```javascript
 // dll.config.js
 const webpack = require('webpack');
 const path = require('path');
 const DllPlugin = require('webpack/lib/DllPlugin')
 const vendors = [
   'react',
   'react-dom',
   'react-router',
   'redux',
   'react-redux',
   'jquery',
   'antd',
   'lodash',
 ]
 module.exports = {
   entry: {
     'dll': vendors,
   },
   output: {
     filename: '[name].js',
     path: path.resolve(__dirname, 'public'),
     library: '__[name]__lib',
   },
   plugins: [
     new DllPlugin({
       name: '__[name]__lib',
       path: path.join(__dirname, 'build', '[name].manifest.json'),
     }),
   ]
 }
</code></pre>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
 具体配置

 3. 使用 Happypack 多线程加快构建

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
</ol>
<p>​	webpack 构建慢是因为要解析和处理大量的文件，它需要一件件去做。 Happypack 的核心原理就是把这部分任务分解到多个进程去并行处理，从而减少总的构建时间</p>
<p>​	 需要配置哪些 loader 使用 Happypack 就要改写那些配置，比如你想要修改 babel 为多核编译:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  module<span class="token operator">:</span> <span class="token punctuation">{</span>
    rules<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        test<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js?$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        use<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'happypack/loader?id=babel'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        include<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'src'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">HappyPack</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      id<span class="token operator">:</span> <span class="token string">'babel'</span><span class="token punctuation">,</span>
      loaders<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        loader<span class="token operator">:</span> <span class="token string">'babel-loader'</span><span class="token punctuation">,</span>
        query<span class="token operator">:</span> <span class="token punctuation">{</span>  
          cacheDirectory<span class="token operator">:</span> <span class="token string">'./webpack_cache/'</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ol start="4">
<li>
<p>不使用 webpack css 模块方案</p>
<p>css in js 会增加机器的编译时间，所以不使用</p>
</li>
</ol>
</li>
</ol>
</li>
<li>
<p>不值得去配置的</p>
<pre><code> 1. 代码丑化
 	2. 模块拆包，持久化缓存
     	3. 减少打包文件大小
</code></pre>
</li>
</ol>
</li>
</ol>
<p>生存环境：</p>
<pre><code>1. 值得去配置的
  	1. 模块拆包
  	2. 尽可能减少打包文件大小
  	3. 代码丑化压缩
  	4. 尽可能减少构建时间
2. 不值得去配置
    	1. 优化开发体验
              	2. 开发环境才需要的配置
</code></pre>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/33377189" target="_blank" rel="noopener noreferrer">webpack 大型应用优化实践<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/O5GYyd70Toe010f18SOkWA" target="_blank" rel="noopener noreferrer">前端性能优化——webpack篇<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MjM5NTk4MDA1MA==&amp;mid=2458073274&amp;idx=1&amp;sn=c9b763bf04624a39d06c8ef620f29983&amp;chksm=b187aec786f027d19a1fa53885e86f87fd2968655715f0f600c2389ad5e419c28e0809cfdba6&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1583157673155&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">玩转 webpack，使你的打包速度提升 90%<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/twinkle77/Knowledge-sharing/issues/81" target="_blank" rel="noopener noreferrer">webpack优化笔记<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&amp;mid=2247487301&amp;idx=1&amp;sn=66f1ffad37081f1da2755102637c10bb&amp;chksm=ea0d45bfdd7acca9096a8664b8ab1dd3ffd0f14fa4a59a6467a20faf18178458a6ed8c1a72c6&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1582717204519&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">腾讯 IMWeb 团队的前端构建秘籍<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&amp;mid=2247484435&amp;idx=1&amp;sn=8b6fa24209f18864c26023e9171bd6cf&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">Webpack 打包太慢怎么办? 试试 Dllplugin<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&amp;mid=2247484358&amp;idx=1&amp;sn=cbccc1bb47ef230816d770b5741691c5&amp;chksm=c0668250f7110b4646833f93072bacadee06edf3e43e760244689a0436523b3d3ac2d93cb2ef&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1567384391143&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">Webpack 优化技巧，构建效率提升 50%<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903924806189070" target="_blank" rel="noopener noreferrer">Webpack优化——将你的构建效率提速翻倍<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/33377189" target="_blank" rel="noopener noreferrer">webpack 大型应用优化实践<ExternalLinkIcon/></a></li>
</ul>
</template>
