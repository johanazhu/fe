<template><h1 id="package-json" tabindex="-1"><a class="header-anchor" href="#package-json" aria-hidden="true">#</a> package.json</h1>
<h2 id="属性说明" tabindex="-1"><a class="header-anchor" href="#属性说明" aria-hidden="true">#</a> 属性说明</h2>
<ul>
<li>name 包名</li>
<li>version 版本</li>
<li>description 描述</li>
<li>homepage 官网url</li>
<li>author 作者</li>
<li>dependencies 生产依赖包列表</li>
<li>devDependencies 开发依赖包列表</li>
<li>...</li>
</ul>
<h2 id="如何升级项目中的包" tabindex="-1"><a class="header-anchor" href="#如何升级项目中的包" aria-hidden="true">#</a> 如何升级项目中的包</h2>
<p>使用 <code>npm outdated</code> 查看有哪些过时的包</p>
<p>若要将所有软件包更新到新的主版本，则全局地安装 <code>npm-check-updates</code> 软件包：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g npm-check-updates
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ncu -u
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这会升级 <code>package.json</code> 文件的 <code>dependencies</code> 和 <code>devDependencies</code> 中的所有版本，以便 npm 可以安装新的主版本。</p>
<p>现在可以运行更新了：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> update
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果只是下载了项目还没有 <code>node_modules</code> 依赖包，并且想先安装新的版本，则运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>https://mp.weixin.qq.com/s/0mnWUd-Wvmunx7mUqJmgLQ</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="http://nodejs.cn/website2/learn/update-all-the-nodejs-dependencies-to-their-latest-version/" target="_blank" rel="noopener noreferrer">nodejs中文文档<ExternalLinkIcon/></a></li>
</ul>
</template>
