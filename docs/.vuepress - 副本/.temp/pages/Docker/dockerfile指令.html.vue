<template><h1 id="dockerfile-指令" tabindex="-1"><a class="header-anchor" href="#dockerfile-指令" aria-hidden="true">#</a> dockerfile 指令</h1>
<h2 id="指令速查" tabindex="-1"><a class="header-anchor" href="#指令速查" aria-hidden="true">#</a> 指令速查</h2>
<p><code>FROM</code> 	基于什么</p>
<p><code>LABEL</code> 	制作者的信息</p>
<p><code>ADD . xx</code>  	复制文件至容器</p>
<p><code>WORKDIR xx</code>	进入工作目录</p>
<p><code>RUN npm install</code>	安装依赖包</p>
<p><code>EXPOSE</code> 	端口</p>
<p><code>COPY</code>		复制</p>
<p><code>RUN</code>	后面跟着命令行命令</p>
<p><code>CMD</code> 	类似于RUN 指令，用于运行程序</p>
<ul>
<li>CMD 在 docker run 时运行</li>
<li>RUN 是在docker build</li>
</ul>
<p><code>VOLUME</code> 	定义匿名数据卷</p>
<h2 id="volume" tabindex="-1"><a class="header-anchor" href="#volume" aria-hidden="true">#</a> VOLUME</h2>
<p><code>VOLUME</code> 	定义匿名数据卷。在启动容器是</p>
<p>作用：</p>
<ul>
<li>避免重要的数据，因容器重启而丢失，这是非常致命的</li>
<li>避免容器不断变大</li>
</ul>
<p>格式：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>VOLUME <span class="token punctuation">[</span><span class="token string">"&lt;路径1>"</span>, <span class="token string">"路径2"</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在启动容器 docker run 的时候，我们可以通过 -v 参数修改挂载点</p>
<h2 id="label" tabindex="-1"><a class="header-anchor" href="#label" aria-hidden="true">#</a> LABEL</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>LABEL version="1.0" description="这是一个Web服务器" by="IT笔录
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h2>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># base image</span>
<span class="token instruction"><span class="token keyword">FROM</span> johanbo/ubuntu_node:v1</span>

<span class="token comment"># 复制文件到容器</span>
<span class="token instruction"><span class="token keyword">ADD</span> . /var/www</span>

<span class="token comment"># 进入工作目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /var/www</span>

<span class="token comment"># 安装项目依赖包</span>
<span class="token instruction"><span class="token keyword">RUN</span> npm install --registry=https://registry.npm.taobao.org</span>

<span class="token comment"># 暴露 端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 3010</span>

<span class="token comment"># 开始命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"pm2"</span>, <span class="token string">"start"</span>, <span class="token string">"app.js"</span>, <span class="token string">"--no-daemon"</span>]</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div></template>
