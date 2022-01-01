<template><h1 id="babel-的使用" tabindex="-1"><a class="header-anchor" href="#babel-的使用" aria-hidden="true">#</a> babel 的使用</h1>
<p>什么是babel？</p>
<p>用最新的标准编写的 javascript 代码向下编译成可以砸今天随处可用的版本</p>
<p>babel-core</p>
<p>核心包，把js代码分析为ast</p>
<p>babel-node</p>
<h3 id="plugins-插件" tabindex="-1"><a class="header-anchor" href="#plugins-插件" aria-hidden="true">#</a> plugins(插件)</h3>
<p>babel插件</p>
<h3 id="presets-预设" tabindex="-1"><a class="header-anchor" href="#presets-预设" aria-hidden="true">#</a> presets(预设)</h3>
<p>可以理解为plugins 的集合，不同的presets包含不同的plugins</p>
<p>比如 @babel-presets-react 包含了写react需要用到的 @babel/plugin-syntax-jsx, @babel/plugins-transform-react-jsx, @babel/plugins-transform-react-display-name等</p>
<p>而最为常用的，也是被官方推荐的，是@babel/presets-env。默认情况下，所有已被纳入规范的语法（ES2015,ES2016,ES2017,ES2018,Modules）所需要使用的plugins都包含在env这个presets中。</p>
<h3 id="polyfill-代码填充-兼容性补丁" tabindex="-1"><a class="header-anchor" href="#polyfill-代码填充-兼容性补丁" aria-hidden="true">#</a> Polyfill(代码填充，兼容性补丁)</h3>
<p>babel 插件专注于对语法做转换，而有些浏览器不识别某些api，最简答的方法就是用浏览器能识别的方法为Array写一个静态方法isArray</p>
<p>ps:某些浏览器没有isArray api，polyfill用浏览器能识别的方法为Array写一个isArray函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Array<span class="token punctuation">.</span><span class="token function-variable function">isArray</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> toString <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">.</span>toString<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">'Array'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>webpack</p>
<p>一个问题</p>
<p>如何使用在react-route中使用require(&quot;./app.js&quot;)</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> &lt;Route path="/app" component={require("./app.js")}/>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我知道肯定用了babel的一个插件</p>
<p>但是试了好多，都不对</p>
<h1 id="treeshaking" tabindex="-1"><a class="header-anchor" href="#treeshaking" aria-hidden="true">#</a> treeShaking</h1>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-merge" target="_blank" rel="noopener noreferrer">webpack-merge<ExternalLinkIcon/></a>: 用于合并webpack的公共配置和环境配置(合并webpack.config.js和webpack.development.js或者webpack.production.js)</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fyargs-parser" target="_blank" rel="noopener noreferrer">yargs-parser<ExternalLinkIcon/></a>: 用于将我们的npm scripts中的命令行参数转换成键值对的形式如 --mode development会被解析成键值对的形式mode: &quot;development&quot;，便于在配置文件中获取参数</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclean-webpack-plugin" target="_blank" rel="noopener noreferrer">clean-webpack-plugin<ExternalLinkIcon/></a>: 用于清除本地文件，在进行生产环境打包的时候，如果不清除dist文件夹，那么每次打包都会生成不同的js文件或者css文件堆积在文件夹中，因为每次打包都会生成不同的hash值导致每次打包生成的文件名与上次打包不一样不会覆盖上次打包留下来的文件</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fprogress-bar-webpack-plugin" target="_blank" rel="noopener noreferrer">progress-bar-webpack-plugin<ExternalLinkIcon/></a>: 打包编译的时候以进度条的形式反馈打包进度</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-build-notifier" target="_blank" rel="noopener noreferrer">webpack-build-notifier<ExternalLinkIcon/></a>: 当你打包之后切换到别的页面的时候，完成时会在本地系统弹出一个提示框告知你打包结果(成功或失败或警告)</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhtml-webpack-plugin" target="_blank" rel="noopener noreferrer">html-webpack-plugin<ExternalLinkIcon/></a>: 自动生成html,并默认将打包生成的js、css引入到html文件中</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmini-css-extract-plugin" target="_blank" rel="noopener noreferrer">mini-css-extract-plugin<ExternalLinkIcon/></a>: webpack打包样式文件中的默认会把样式文件代码打包到bundle.js中，<a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmini-css-extract-plugin" target="_blank" rel="noopener noreferrer">mini-css-extract-plugin<ExternalLinkIcon/></a>这个插件可以将样式文件从bundle.js抽离出来一个文件，并且支持chunk css</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fadd-asset-html-webpack-plugin" target="_blank" rel="noopener noreferrer">add-asset-html-webpack-plugin<ExternalLinkIcon/></a>: 从命名可以看出，它的作用是可以将静态资源css或者js引入到<a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhtml-webpack-plugin" target="_blank" rel="noopener noreferrer">html-webpack-plugin<ExternalLinkIcon/></a>生成的html文件中</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fuglifyjs-webpack-plugin" target="_blank" rel="noopener noreferrer">uglifyjs-webpack-plugin<ExternalLinkIcon/></a>: 代码丑化，用于js压缩(可以调用系统的线程进行<strong>多线程压缩</strong>，优化webpack的<strong>压缩速度</strong>)</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Foptimize-css-assets-webpack-plugin" target="_blank" rel="noopener noreferrer">optimize-css-assets-webpack-plugin<ExternalLinkIcon/></a>: css压缩，主要使用 <a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fcssnano%2Fcssnano" target="_blank" rel="noopener noreferrer">cssnano<ExternalLinkIcon/></a> 压缩器(webpack4的执行环境内置了cssnano，所以不用安装)</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffriendly-errors-webpack-plugin" target="_blank" rel="noopener noreferrer">friendly-errors-webpack-plugin<ExternalLinkIcon/></a>: 能够更好在终端看到webapck运行的警告和错误</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhappypack" target="_blank" rel="noopener noreferrer">happypack<ExternalLinkIcon/></a>: 多线程编译，加快编译速度(加快loader的编译速度)，注意，thread-loader不可以和 mini-css-extract-plugin 结合使用</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fsplit-chunks-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx" target="_blank" rel="noopener noreferrer">splitChunks<ExternalLinkIcon/></a>: CommonChunkPlugin 的后世，用于对bundle.js进行chunk切割(webpack的内置插件)</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fdll-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx" target="_blank" rel="noopener noreferrer">DllPlugin<ExternalLinkIcon/></a>: 将模块预先编译，它会在第一次编译的时候将配置好的需要预先编译的模块编译在缓存中，第二次编译的时候，解析到这些模块就直接使用缓存，而不是去编译这些模块(webpack的内置插件)</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fdll-plugin%2F%23dllreferenceplugin" target="_blank" rel="noopener noreferrer">DllReferencePlugin<ExternalLinkIcon/></a>: 将预先编译好的模块关联到当前编译中，当 webpack 解析到这些模块时，会直接使用预先编译好的模块(webpack的内置插件)</p>
<p><a href="https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fhot-module-replacement-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx" target="_blank" rel="noopener noreferrer">HotModuleReplacementPlugin<ExternalLinkIcon/></a>: 实现局部热加载(刷新)，区别与在webpack-dev-server的全局刷新(webpack的内置插件)</p>
</template>
