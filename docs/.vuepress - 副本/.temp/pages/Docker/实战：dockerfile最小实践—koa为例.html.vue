<template><h1 id="实战-dockerfile-最小实践——koa为例" tabindex="-1"><a class="header-anchor" href="#实战-dockerfile-最小实践——koa为例" aria-hidden="true">#</a> 实战：dockerfile 最小实践——koa为例</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>最小实践，意味着将链路打通，站在更高的层面看问题，问题就变得清晰，这一章，我将带你实现一个最简单的koa服务，并将其部署至服务器上。</p>
<p>先决知识：对<RouterLink to="/Docker/Docker/docker%E5%9F%BA%E6%9C%AC%E4%BB%8B%E7%BB%8D.html">docker有一定的了解</RouterLink></p>
<h2 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路" aria-hidden="true">#</a> 实现思路</h2>
<p>第一步：先启动一个 koa 应用，</p>
<p>第二步：再生成一个 dockerfile ，并编写它</p>
<p>第三步：基于 dockerfile 生成镜像（docker build）</p>
<p>第四步：基于此镜像生成（run）一个容器，检查在本机上是否跑的通</p>
<p>第五步：如果通，就导出此镜像</p>
<p>第六步：xshell连接服务器上（假设服务器上已安装docker），导入此镜像，通过此镜像生成一容器</p>
<p>这就是最小实现</p>
<p>这里还有一种实现方式：</p>
<p>在第五步时，把它发布到远端仓库，第六步，从远端拉取到镜像，但缺点是，你的镜像要公开（只有一个私有名额）</p>
<h2 id="第一步-先启动一个-koa-应用" tabindex="-1"><a class="header-anchor" href="#第一步-先启动一个-koa-应用" aria-hidden="true">#</a> 第一步：先启动一个 koa 应用</h2>
<p>新建一个 dockerfile_koa_demo 文件，npm init -y 生成package.json。下载koa包，新建 app.js</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> dockerfile_koa_demo
<span class="token builtin class-name">cd</span> dockerfile_koa_demo
<span class="token function">npm</span> init -y
<span class="token function">npm</span> i koa --save
<span class="token function">touch</span> app.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>再编写app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token parameter">ctx</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'hello, docker'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3010</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'3010端口已启动'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>修改package.json 的script</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>...
<span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"nodemon app.js"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
...
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>启动脚本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run start
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>看到如下图所示：</p>
<p><img src="@source/.vuepress/public/images/Docker/dockerfile最小实现/dockerfile_脚本.png" alt="dockerfile_脚本"></p>
<p>浏览器访问正常</p>
<h2 id="第二步-写个dockerfile文件" tabindex="-1"><a class="header-anchor" href="#第二步-写个dockerfile文件" aria-hidden="true">#</a> 第二步：写个Dockerfile文件</h2>
<p>新建一个 Dockerfile 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> Dockerfile
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>编写 Dockerfile</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># base image</span>
<span class="token comment"># FROM </span>
<span class="token instruction"><span class="token keyword">FROM</span> node</span>

<span class="token comment"># 复制文件到容器</span>
<span class="token instruction"><span class="token keyword">ADD</span> . /home/www</span>

<span class="token comment"># 进入工作目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /home/www</span>

<span class="token comment"># 安装项目依赖包</span>
<span class="token instruction"><span class="token keyword">RUN</span> npm install --registry=https://registry.npm.taobao.org</span>

<span class="token comment"># 暴露 端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 3010</span>

<span class="token comment"># 开始命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"node"</span>, <span class="token string">"./app.js"</span>]</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>第二步写完了</p>
<h2 id="第三步-基于-dockerfile-生成镜像" tabindex="-1"><a class="header-anchor" href="#第三步-基于-dockerfile-生成镜像" aria-hidden="true">#</a> 第三步：基于 dockerfile 生成镜像</h2>
<p>为了加快构建速度，我们先生成 <code>.dockerignore</code> ，并往里写上 <code>node_modules</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> .dockerignore
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在 <code>.dockerignore</code>  里写入 <code>node_modules</code> ，意思是说当你 <code>docker build</code> 的时候忽略 <code>node_modules</code> 文件，加快构建速度</p>
<p>通过命令行生成镜像，命名 johan/koa_server:v1.0.0</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker build <span class="token builtin class-name">.</span> -t johan/koa_server:v1.0.0
<span class="token comment"># -t 就是给镜像起名</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>效果如下图所示：</p>
<p><img src="@source/.vuepress/public/images/Docker/dockerfile最小实现/docker_build.png" alt="docker_build"></p>
<p>查看镜像是否有了</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker images
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="第四步-基于此镜像生成一容器" tabindex="-1"><a class="header-anchor" href="#第四步-基于此镜像生成一容器" aria-hidden="true">#</a> 第四步：基于此镜像生成一容器</h2>
<p>命令行生成一容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -d --name koa_server_container -p <span class="token number">3010</span>:3010 johan/koa_server:v1.0.0
<span class="token comment"># -d 后台运行 </span>
<span class="token comment"># --name 给容器起名字</span>
<span class="token comment"># -p 本机端口隐射镜像中的端口</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>查看镜像是否生成</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker <span class="token function">ps</span> -a 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在浏览器中输入<code>http://localhost:3010/</code> ,bingo</p>
<h2 id="第五步-导出此镜像" tabindex="-1"><a class="header-anchor" href="#第五步-导出此镜像" aria-hidden="true">#</a> 第五步：导出此镜像</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker save johan/koa_server:v1.0.0 <span class="token operator">></span> koa_server.tar
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/Docker/dockerfile最小实现/导出镜像.png" alt="导出镜像"></p>
<h2 id="第六步-在服务器上跑通" tabindex="-1"><a class="header-anchor" href="#第六步-在服务器上跑通" aria-hidden="true">#</a> 第六步：在服务器上跑通</h2>
<p>这里我们假设服务器上已经安装了 docker 以及 lrzsz 包（本文具体不展开）</p>
<p>通过xshell连接服务器，通过命令rz上传 tar包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rz
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/Docker/dockerfile最小实现/lrzsz上传镜像.png" alt="lrzsz上传镜像"></p>
<p>解开此压缩包（导入）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker load <span class="token operator">&lt;</span> koa_server.tar
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/Docker/dockerfile最小实现/导入镜像.png" alt="导入镜像"></p>
<p>基于此容器生成容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -d --name koa_server_container -p <span class="token number">3010</span>:3010 johan/koa_server:v1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>并查看跑通的容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker <span class="token function">ps</span> -a 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在浏览器中输入域名，bingo</p>
<p>以上就是一个 <code>dockerfile</code> 的最小实现，是不是很简单。当然，你可以再第五步时将镜像上传至<code>docker hub</code>，第六步从 <code>dockerfile</code> 拉取镜像，再生成容器。如下</p>
<h2 id="另一种方法第五步-上传镜像" tabindex="-1"><a class="header-anchor" href="#另一种方法第五步-上传镜像" aria-hidden="true">#</a> 另一种方法第五步：上传镜像</h2>
<p>命令行登录 dockerhub（首先要先注册）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker login
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>给镜像命名</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker tag johan/koa_server:v1.0.0 johanbo/koa_server:v1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>将镜像上传至 docker hub</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker push johanbo/koa_server:v1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/Docker/dockerfile最小实现/docker_push.png" alt="docker_push"></p>
<h2 id="另一种方法第六步-拉取镜像" tabindex="-1"><a class="header-anchor" href="#另一种方法第六步-拉取镜像" aria-hidden="true">#</a> 另一种方法第六步：拉取镜像</h2>
<p>登录服务器，并拉取镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker pull johanbo/koa_server:v1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/Docker/dockerfile最小实现/docker_pull.png" alt="docker_pull"></p>
<blockquote>
<p><strong>注意</strong>：这里需要打标签，否则会默认拉取latest</p>
</blockquote>
<p>启动容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -d --name koa_server_container -p <span class="token number">3010</span>:3010 johan/koa_server:v1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在浏览器中输入域名，bingo</p>
<blockquote>
<p>注意：服务器开发端口需要去云服务商那里开发相应端口（安全组配置规则）</p>
</blockquote>
<h2 id="后续" tabindex="-1"><a class="header-anchor" href="#后续" aria-hidden="true">#</a> 后续</h2>
<p>你可以在 <code>dockerfile</code> 里配置你所需的环境变量，镜像生成的容器是个 &quot;mini 服务器&quot;，怎么倒腾都行，和整个服务器没有关系，所以你的应用不受环境影响。</p>
<p>在这里说一个痛点：即使你解决了环境问题，但是CICD也是个问题，如何更快捷的集成呢？接下来的一节我会介绍下，docker与jenkins 的结合，通过docker生成jenkins，jenkins 赋能CICD</p>
</template>
