<template><p>最近团队在开发组件UI化，笔者正参与其中，团队内使用的是阿里巴巴开源的UmiJS，脚手架提供了文件编写和组件开发所需要的所有配置，加上以typescript来写组件，由rollup打包应用，使得组件的质量和体积有了一定的保障。</p>
<p>但，作为一名开发，不能仅仅满足对业务组件的实现，更应该对其原理进行探索。本文不对UmiJS的源码进行探讨，浅析一个微小组件如何开发到展示，实现从零到发布一个组件的全过程。</p>
<p>所需知识量：了解webpack基本配置，npm以及react</p>
<p>第一步：npm init</p>
<p>首先我们需要初始化一个项目，</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init -y
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>再在生成的package.json中填上必要的信息。例如 作者名，关键字等等</p>
<p>如下配置</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string">"name"</span><span class="token operator">:</span> <span class="token string">"react-azhu-btn"</span><span class="token punctuation">,</span>
  <span class="token string">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
  <span class="token string">"description"</span><span class="token operator">:</span> <span class="token string">"一个微小的组件"</span><span class="token punctuation">,</span>
  <span class="token string">"main"</span><span class="token operator">:</span> <span class="token string">"lib/index.js"</span><span class="token punctuation">,</span>
  <span class="token string">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"react"</span><span class="token punctuation">,</span>
    <span class="token string">"react-dom"</span><span class="token punctuation">,</span>
    <span class="token string">"azhu"</span><span class="token punctuation">,</span>
    <span class="token string">"component"</span><span class="token punctuation">,</span>
    <span class="token string">"btn"</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string">"files"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"lib"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string">"repository"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">"type"</span><span class="token operator">:</span> <span class="token string">"git"</span><span class="token punctuation">,</span>
    <span class="token string">"url"</span><span class="token operator">:</span> <span class="token string">"git@github.com:azhubaby/react-azhu-btn.git"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">"bugs"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">"url"</span><span class="token operator">:</span> <span class="token string">"https://github.com/azhubaby/react-azhu-btn/issues"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>第二步：配置webpack</p>
<p>我们知道webpack是资源打包器，他打包所有的静态资源，但他本身只能打包JavaScript，如果你要打包图片，css甚至是字体，都需要配置相对应的loader。例如以下这次脚手架中所需要的loader</p>
<table>
<thead>
<tr>
<th>loader名</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>babel-loader</td>
<td>解析babel</td>
</tr>
<tr>
<td>style-loader</td>
<td>讲css挂载到文档上</td>
</tr>
<tr>
<td>css-loader</td>
<td>解析css</td>
</tr>
<tr>
<td>postcss-loader</td>
<td>配置postcss中的autoprefixer，可给浏览器加前缀，省去</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>笔者最近在开发团队中的UI</p>
<p>用的是umi来开发组件库</p>
<p>umi 的优点罗列出来</p>
<p>umi很好，虽然他很好用，但是我们需要知其所以然，</p>
<p>本文将从零打造一UI组件脚手架，跟上节奏</p>
<p>配置环境，</p>
<p>本次教程采用webpack4来打包（rollup和webpack各有千秋，工作中webpack使用更多，故用之）</p>
<p>html-webpack-plugin</p>
<p>clean-webpack-plugin</p>
<p>css 我们用scss</p>
<p>postcss</p>
<p>对于图标我们使用</p>
<p>file-loader</p>
<p>我们再做一个启动文件来查看我们所做的组件</p>
<p>webpack.example.js</p>
<p>webpack.build.js</p>
<p>打包文件</p>
<p>再将打包上传至 npm 上，</p>
<p>npm login XX</p>
<p>npm publish</p>
<p>我们甚至可以将它写成一个脚本，需要发布时可以npm pushlish</p>
<p>好了，这就是本篇的所有内容，如果觉得还行，请不要吝啬你的“再看”</p>
<p>这是一件简单的微小组件的开发，</p>
<p>如果需要完善，其实还可以加上测试用例，文档撰写功能</p>
<p>测试用例推荐使用 jest，这是目前比较流行的测试工具</p>
<p>文档就有多种选择，如果想单独开发一个库，可使用阿里rc-tools工具，</p>
<p>如果你和我样觉得 rc-tools 的 example 样式太难看，可以看看docz，它也很方便</p>
<p>如果是是个造轮子主义者，不妨看看markdown-it，将它集成在webpack中，我的文档我做主</p>
<p>总之，方案很多，供君细品</p>
<p>babel 相关</p>
<p>https://github.com/Kehao/Blog/issues/1</p>
</template>
