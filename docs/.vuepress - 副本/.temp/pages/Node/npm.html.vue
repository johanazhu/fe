<template><h1 id="npm的基本知识" tabindex="-1"><a class="header-anchor" href="#npm的基本知识" aria-hidden="true">#</a> NPM的基本知识</h1>
<h2 id="npm-是什么" tabindex="-1"><a class="header-anchor" href="#npm-是什么" aria-hidden="true">#</a> NPM 是什么</h2>
<p>NPM（node package manager），通常称为node包管理器。顾名思义，它的主要功能就是管理node包，包括：安装、卸载、更新、查看、搜索、发布等</p>
<p>一般伴随着 Node 一起被下载来，就是说你下载了 Node，意味着也下载了 NPM</p>
<p>npm 官网：<a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/<ExternalLinkIcon/></a></p>
<p>npm 官网文档：<a href="https://docs.npmjs.com/" target="_blank" rel="noopener noreferrer">https://docs.npmjs.com/<ExternalLinkIcon/></a></p>
<p>npm 中文教程：<a href="https://www.npmjs.cn/" target="_blank" rel="noopener noreferrer">https://www.npmjs.cn/<ExternalLinkIcon/></a></p>
<p>npm 菜鸟教程：<a href="https://www.runoob.com/nodejs/nodejs-npm.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/nodejs/nodejs-npm.html<ExternalLinkIcon/></a></p>
<h2 id="npm-常用命令行" tabindex="-1"><a class="header-anchor" href="#npm-常用命令行" aria-hidden="true">#</a> NPM 常用命令行</h2>
<table>
<thead>
<tr>
<th>命令</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>npm init</td>
<td>初始化，加 -y 一键</td>
</tr>
<tr>
<td>npm install npm@latest -g</td>
<td>升级到最新</td>
</tr>
<tr>
<td>npm cache clean -f</td>
<td>npm 清除缓存</td>
</tr>
<tr>
<td>npm publist</td>
<td>讲包推送到远程仓库</td>
</tr>
<tr>
<td>npm update</td>
<td>升级包</td>
</tr>
<tr>
<td>npm audit fix</td>
<td>修复包的安全漏洞并升级</td>
</tr>
</tbody>
</table>
<h2 id="cnpm" tabindex="-1"><a class="header-anchor" href="#cnpm" aria-hidden="true">#</a> cnpm</h2>
<p>因为 npm 的服务器在国外，使用 npm 下载太慢，一般使用 cnpm 加速</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">-</span>g cnpm <span class="token operator">--</span>registry<span class="token operator">=</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>registry<span class="token punctuation">.</span>npm<span class="token punctuation">.</span>taobao<span class="token punctuation">.</span>org
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="save-与-save-dev-的区别" tabindex="-1"><a class="header-anchor" href="#save-与-save-dev-的区别" aria-hidden="true">#</a> --save 与 --save-dev 的区别</h2>
<p>只要 npm install X，就会把 X 包安装到 node_modules 中，区别在于</p>
<ul>
<li>什么都不写，不会添加到 package.json</li>
<li>--save（或者 -S），会在 dependencies 属性下添加 X
<ul>
<li>生产环境下使用</li>
</ul>
</li>
<li>--save-dev（或者 -D），会在 devDependencies 属性下添加X
<ul>
<li>开发环境下使用</li>
</ul>
</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="http://nodejs.cn/website2/learn/update-all-the-nodejs-dependencies-to-their-latest-version/" target="_blank" rel="noopener noreferrer">nodejs中文文档<ExternalLinkIcon/></a></li>
</ul>
</template>
