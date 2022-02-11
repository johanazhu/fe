<template><h1 id="用-node-搭建最小实现脚手架" tabindex="-1"><a class="header-anchor" href="#用-node-搭建最小实现脚手架" aria-hidden="true">#</a> 用 Node 搭建最小实现脚手架</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>本节讲解使用 Node 来做一个脚手架，便于快速开发项目。我们开发的是脚手架，而非项目，目前本人只有一个基础 <a href="https://github.com/johanazhu/koa-basic" target="_blank" rel="noopener noreferrer">Koa 脚手架<ExternalLinkIcon/></a> ，后续写到 React、webpack 时，会搭建属于自己的一套 H5 端的开发模板。本文以实现最小脚手架为出发点展开写作，后续也会再次基础上添砖加瓦</p>
<h2 id="引子" tabindex="-1"><a class="header-anchor" href="#引子" aria-hidden="true">#</a> 引子</h2>
<p>A：大B哥，Node 能做什么？</p>
<p>B：搭建 Web 服务噜</p>
<p>A：不仅如此，它还能操作系统</p>
<p>B：怎么说？</p>
<p>A：知道 Webpack 吗？它就是用 Node 写的。还有像<a href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer"> create-react-app<ExternalLinkIcon/></a>、 <a href="https://github.com/vuejs/vue-cli" target="_blank" rel="noopener noreferrer">vue-cli<ExternalLinkIcon/></a>、<a href="https://github.com/NervJS/taro/tree/next/packages/taro-cli" target="_blank" rel="noopener noreferrer">@tarojs/cli<ExternalLinkIcon/></a> 这些，都是用 Node 写的，这些 cli 被称为脚手架，你只要使用一些命令就能下载模板快速开发</p>
<p>B：（各种羡慕、吹捧后），我也想做一套自己的脚手架</p>
<p>A：我教你啊</p>
<h2 id="一个脚手架的思路" tabindex="-1"><a class="header-anchor" href="#一个脚手架的思路" aria-hidden="true">#</a> 一个脚手架的思路</h2>
<p>看 <a href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer"> create-react-app<ExternalLinkIcon/></a>、 <a href="https://github.com/vuejs/vue-cli" target="_blank" rel="noopener noreferrer">vue-cli<ExternalLinkIcon/></a>、<a href="https://github.com/NervJS/taro/tree/next/packages/taro-cli" target="_blank" rel="noopener noreferrer">@tarojs/cli<ExternalLinkIcon/></a> 的各自的仓库，我们能出一些共同点，例如多套模板、友好的交互、优美的UI等等。我们这里以 taro 为例，先用用，看看，再仿着做一个</p>
<p><img src="https://i.loli.net/2021/08/31/8NhJZHDseSbmncq.png" alt="使用taro-cli创建项目"></p>
<p>它是怎么做到选择不同的模板，能生成不同的文件呢？明明只有一个基础模板啊，选择 scss 就生成 scss 文件，选择 TypeScript 生成 TS 文件，现在还看不懂源码，以后写完 webpack 再来看看，我们这里只先做一个最简单的脚手架</p>
<h2 id="创建工程" tabindex="-1"><a class="header-anchor" href="#创建工程" aria-hidden="true">#</a> 创建工程</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> azhu-cli
<span class="token builtin class-name">cd</span> azhu-cli
<span class="token function">npm</span> init -y
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>然后在 package.json 中写点项目信息</p>
<h2 id="需要安装的-npm-包" tabindex="-1"><a class="header-anchor" href="#需要安装的-npm-包" aria-hidden="true">#</a> 需要安装的 npm 包</h2>
<p>我们先列个表格，查看一下各个 npm 包是什么，有什么用，后续在写代码时一步步添加进去</p>
<table>
<thead>
<tr>
<th>包名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://www.npmjs.com/package/commander" target="_blank" rel="noopener noreferrer">commander<ExternalLinkIcon/></a></td>
<td>执行复杂的命令</td>
</tr>
<tr>
<td><a href="https://www.npmjs.com/package/inquirer" target="_blank" rel="noopener noreferrer">inquirer<ExternalLinkIcon/></a></td>
<td>问答交互</td>
</tr>
<tr>
<td><a href="https://www.npmjs.com/package/download-git-repo" target="_blank" rel="noopener noreferrer">download-git-repo<ExternalLinkIcon/></a></td>
<td>下载远程模板</td>
</tr>
<tr>
<td><a href="https://www.npmjs.com/package/chalk" target="_blank" rel="noopener noreferrer">chalk<ExternalLinkIcon/></a></td>
<td>让你 console.log 出来的字带颜色，比如成功时的绿色字</td>
</tr>
<tr>
<td><a href="https://www.npmjs.com/package/ora" target="_blank" rel="noopener noreferrer">ora<ExternalLinkIcon/></a></td>
<td>loading</td>
</tr>
</tbody>
</table>
<h2 id="创建一个命令" tabindex="-1"><a class="header-anchor" href="#创建一个命令" aria-hidden="true">#</a> 创建一个命令</h2>
<p>先创建 <code>index.js</code>，在代码中写入</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token hashbang comment">#!/usr/bin/env node</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在终端中运行 node 程序，输入 node 命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>node index.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>可以正确输出 <code>hello world</code> ，代码顶部的 <code>#!/usr/bin/env node</code> 是告诉终端，这个文件要使用 node 去执行</p>
<p>一般 cli 都有一个特定的命令，例如 <code>taro</code>，<code>git</code> 等，我们设置我们的命令—— <code>azhu</code>。如何让终端识别这个命令呢？很简单，在 package.json 文件中添加一个字段 <code>bin</code>，并且声明一个命令关键字和对应执行的文件：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code># package.json
...
<span class="token property">"bin"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"azhu"</span><span class="token operator">:</span> <span class="token string">"index.js"</span>
<span class="token punctuation">}</span>
...
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后我们测试一番，在终端中输入 <code>azhu</code>，会提示：</p>
<p><img src="https://i.loli.net/2021/08/31/Ua9hHfQcjwxYAV3.png" alt="azhu错误"></p>
<p>为什么会这样呢？通常我们在使用 cli 工具时，都需要先安装它，比如 vue-cli，@tarojs/cli，使用前需要全局安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i vue-cli -g
<span class="token function">npm</span> <span class="token function">install</span> -g @tarojs/cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>而我们的 azhu-cli 并没有发布到 npm 上，当然也没有安装过，所以终端现在还不认识这个命令。通常我们想本地测试一个 npm 包，可以使用 <code>npm link</code> 这个命令，本地安装这个包，我们执行一下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">link</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>再执行 <code>azhu</code> 命令，就看到 <code>hello world</code> 了</p>
<blockquote>
<p>注：npm unlink 卸载本地包</p>
</blockquote>
<h2 id="执行复杂的命令" tabindex="-1"><a class="header-anchor" href="#执行复杂的命令" aria-hidden="true">#</a> 执行复杂的命令</h2>
<p>commander：处理命令行交互</p>
<ul>
<li>自带了 -V，-h 交互</li>
<li>可以通过 <code>program.command</code> 添加交互</li>
<li><code>program.parse</code> 将命令参数传入 commander 管道中，一般放在最后执行</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i commander --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>改造 <code>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token hashbang comment">#!/usr/bin/env node</span>

<span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'commander'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token keyword">package</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./package.json'</span><span class="token punctuation">)</span>
program<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token keyword">package</span><span class="token punctuation">.</span>version<span class="token punctuation">)</span>
program<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>运行 <code>azhu -h</code></p>
<p><img src="https://i.loli.net/2021/08/31/a2B5ng9rfWT8zks.png" alt="commander处理"></p>
<h2 id="添加问答操作" tabindex="-1"><a class="header-anchor" href="#添加问答操作" aria-hidden="true">#</a> 添加问答操作</h2>
<p>inquirer 添加问答操作</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i inquirer --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>语法很简单，直接看代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>inquirer
    <span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        type<span class="token operator">:</span> <span class="token string">'input'</span><span class="token punctuation">,</span>
        message<span class="token operator">:</span> <span class="token string">'请输入项目名称'</span><span class="token punctuation">,</span>
        name<span class="token operator">:</span> <span class="token string">'name'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        type<span class="token operator">:</span> <span class="token string">'list'</span><span class="token punctuation">,</span>
        message<span class="token operator">:</span> <span class="token string">'请选择项目模板'</span><span class="token punctuation">,</span>
        name<span class="token operator">:</span> <span class="token string">'template'</span><span class="token punctuation">,</span>
        choices<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'koa-basic'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">answers</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'answers'</span><span class="token punctuation">,</span> answers<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>每个选项中的 name 为答案输出的值</p>
<p><img src="https://i.loli.net/2021/09/01/5dD3YqCer76Pmzl.png" alt="inquirer"></p>
<h2 id="克隆模板" tabindex="-1"><a class="header-anchor" href="#克隆模板" aria-hidden="true">#</a> 克隆模板</h2>
<p>download-git-repo</p>
<ul>
<li>下载远程模板</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i download-git-repo --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>原本使用 shelljs，但是死活下载不下来，只能选择另一个工具</p>
<p>当我们下载写好项目名字，选择好模板后，下一步就要从远程仓库上把模板下载过来</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">answers</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'正在拷贝项目，请稍等'</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> remote <span class="token operator">=</span> <span class="token string">'https://github.com:johanazhu/koa-basic#master'</span>
      <span class="token keyword">const</span> tarName <span class="token operator">=</span> answers<span class="token punctuation">.</span>name
      <span class="token function">download</span><span class="token punctuation">(</span>remote<span class="token punctuation">,</span> tarName<span class="token punctuation">,</span> <span class="token punctuation">{</span> clone<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'成功'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="添加ui交互" tabindex="-1"><a class="header-anchor" href="#添加ui交互" aria-hidden="true">#</a> 添加UI交互</h2>
<p>有时候下载远程仓库时会花很多时间，我们必须为了体验，需要加一些 UI 效果优化体验</p>
<p>chalk &amp; ora</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i chalk ora --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>chalk 是给 console 加颜色</p>
<p>ora 是加 loading 效果的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">answers</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'正在拷贝项目，请稍等'</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> remote <span class="token operator">=</span> <span class="token string">'https://github.com:johanazhu/koa-basic#master'</span>
    <span class="token keyword">const</span> tarName <span class="token operator">=</span> answers<span class="token punctuation">.</span>name
    <span class="token operator">+</span> <span class="token keyword">const</span> spinner <span class="token operator">=</span> <span class="token function">ora</span><span class="token punctuation">(</span><span class="token string">'download template......'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">download</span><span class="token punctuation">(</span>remote<span class="token punctuation">,</span> tarName<span class="token punctuation">,</span> <span class="token punctuation">{</span> clone<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token operator">+</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span><span class="token function">red</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span>
            spinner<span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token operator">+</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span><span class="token function">green</span><span class="token punctuation">(</span><span class="token string">'成功'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            spinner<span class="token punctuation">.</span><span class="token function">succeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>效果如下：</p>
<p><img src="https://i.loli.net/2021/09/01/tTVFrSi431Xy6dH.png" alt="chalk&amp;ora"></p>
<h2 id="发布-npm" tabindex="-1"><a class="header-anchor" href="#发布-npm" aria-hidden="true">#</a> 发布 npm</h2>
<p>先登录 npm，再发布</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> login
<span class="token punctuation">..</span>.
<span class="token function">npm</span> publish
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="额外知识点" tabindex="-1"><a class="header-anchor" href="#额外知识点" aria-hidden="true">#</a> 额外知识点</h2>
<h3 id="包管理方式" tabindex="-1"><a class="header-anchor" href="#包管理方式" aria-hidden="true">#</a> 包管理方式</h3>
<p><img src="https://i.loli.net/2021/08/31/BbwqCXi4p2h7Ttd.png" alt="包管理方式对比"></p>
<h4 id="monorepo" tabindex="-1"><a class="header-anchor" href="#monorepo" aria-hidden="true">#</a> monorepo</h4>
<ul>
<li>
<p>将多个项目代码存储在一个仓库力的软件开发策略</p>
</li>
<li>
<p>把所有的项目相关都放在一个仓库（比如React，Babel，Umi，Taro）</p>
</li>
<li>
<p>集中管理</p>
</li>
<li>
<p>优势</p>
<ul>
<li>统一工作流</li>
<li>降低基建成本</li>
<li>提高团队协作效率</li>
</ul>
</li>
<li>
<p>劣势</p>
<ul>
<li>体积问题</li>
<li>权限问题</li>
<li>版本控制</li>
</ul>
</li>
</ul>
<h4 id="multirepo" tabindex="-1"><a class="header-anchor" href="#multirepo" aria-hidden="true">#</a> multirepo</h4>
<ul>
<li>按模块放在为多个仓库（webpack、rollup）</li>
<li>优势
<ul>
<li>灵活</li>
<li>安全</li>
</ul>
</li>
<li>劣势
<ul>
<li>代码复用</li>
<li>版本管理</li>
<li>开发调试</li>
<li>搭建基础架构</li>
</ul>
</li>
</ul>
<p>大的项目可以使用monorepo，独立性比较强的可以采用 multirepo</p>
<p>我个人更喜欢 multirepo 的哲学</p>
<p>有人上升到哲学层面，其实按觉得是不用的项目采用适合自己的管理方式，像 webpack、rollup 之类，项目独立想比较强，就可以用使用 multirepo ，而像 React，Umi，Taro 之类的框架，它首先要拆分功能点，其次每个子库之间需要与主库有所依赖，如果采用 multirepo 方式，关联起来会很麻烦，采用统一管理的方式能节省很多时间</p>
<h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2>
<p>一：使用 <code>shelljs</code> 常有报错，暂时解决不了，所以用 <code>download-git-repo</code> 这种方式</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>fatal: unable to access <span class="token string">'https://github.com/johanazhu/koa-basic/'</span><span class="token builtin class-name">:</span> OpenSSL SSL_read: Connection was reset, errno <span class="token number">10054</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>解决方案</p>
<p>打开 Git 命令页面，执行 git 命令脚本：修改设置，解除 ssl 验证</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config --global http.sslVerify <span class="token string">"false"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>注：git config --list 查看你的 config 信息</p>
</blockquote>
<p>二：<code>download-git-repo</code> 报错误</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token string">'git clone'</span> failed with status <span class="token number">128</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>解决方案：<a href="https://github.com/wuqiong7/Note/issues/17" target="_blank" rel="noopener noreferrer">https://github.com/wuqiong7/Note/issues/17<ExternalLinkIcon/></a></p>
<p>我将 remote 地址改成：<a href="https://github.com:johanazhu/koa-basic#master" target="_blank" rel="noopener noreferrer">https://github.com:johanazhu/koa-basic#master<ExternalLinkIcon/></a> 就好了</p>
<p>Github已发布：<a href="https://github.com/johanazhu/azhu-cli" target="_blank" rel="noopener noreferrer">https://github.com/johanazhu/azhu-cli<ExternalLinkIcon/></a></p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<p><a href="https://github.com/imaoda/js-front-end-practice/blob/master/%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E4%BC%81%E4%B8%9A%E7%BA%A7%E8%84%9A%E6%89%8B%E6%9E%B6.md" target="_blank" rel="noopener noreferrer">搭建一个企业级脚手架<ExternalLinkIcon/></a></p>
<p><a href="https://mp.weixin.qq.com/s/CO6La0NCHnsfXN4MHgiBag" target="_blank" rel="noopener noreferrer">从零开发一个node命令行工具<ExternalLinkIcon/></a></p>
</template>
