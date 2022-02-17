<template><h1 id="实战-docker-jenkins" tabindex="-1"><a class="header-anchor" href="#实战-docker-jenkins" aria-hidden="true">#</a> 实战：docker-jenkins</h1>
<p>上篇，我们讲到了dockerfile 的最小实现，但也抛出了一个问题，即使 docker 解决了环境和部署问题，但CICD还是让人感到心累，本章通过 docker 生成 jenkins 容器，并将 jenkins 与 github 结合，实现 一定程度上的 CI</p>
<h2 id="希望达到的效果" tabindex="-1"><a class="header-anchor" href="#希望达到的效果" aria-hidden="true">#</a> 希望达到的效果</h2>
<p>我希望我再 git push 后，代码推送至 jenkins ，在jenkins 点击 发布，就能将我的代码推送至 服务器，我浏览页面，马上就能看到效果</p>
<p>git push 到仓库，在 jenkins 上点击发布就能发布。</p>
<p>jenkins 绑定 远端仓库 和 服务器</p>
<p>git push 到 仓库后，jenkins 监听到，执行脚本</p>
<p>删除原来的容器，并生成一个新的容器 映射出端口</p>
<h2 id="jenkins-快速入门" tabindex="-1"><a class="header-anchor" href="#jenkins-快速入门" aria-hidden="true">#</a> jenkins 快速入门</h2>
<p>它是java语言写的cicd，</p>
<p>他是一套用java写的cicd 系统，通过 ssh可以与服务器打交道</p>
<h2 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路" aria-hidden="true">#</a> 实现思路</h2>
<p>jenkins</p>
<h2 id="实现步骤" tabindex="-1"><a class="header-anchor" href="#实现步骤" aria-hidden="true">#</a> 实现步骤</h2>
<p>第一步：拉取 jenkins 镜像，以此为镜像生成容器</p>
<p>第二步：安装配置 jenkins</p>
<p>第三步：准备 node 服务</p>
<p>第四步：jenkins 部署 node 服务</p>
<h2 id="第一步-生成jenkins容器" tabindex="-1"><a class="header-anchor" href="#第一步-生成jenkins容器" aria-hidden="true">#</a> 第一步：生成jenkins容器</h2>
<p>先从dockerhub上拉取jenkins</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker pull jenkins/jenkins:lts
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>创建一个 jenkins 目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /home/johan/www/jenkins
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>提高此文件的权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> -R <span class="token number">777</span> /home/johan/www/jenkins
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>以 jenkins/jenkins:lts 为镜像生成一容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run --name jenkins -p <span class="token number">8080</span>:8080 -p <span class="token number">50000</span>:50000 -d -v /home/johan/www/jenkins:/var/jenkins_home jenkins/jenkins:lts
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><code>-d</code>： 后台运行</p>
<p><code>-v</code>： 数据卷，将容器中的内容映射到本机上</p>
<p>查看容器内部日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker logs jenkins
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>输入域名网址查看 <code>jenkins</code> 是否安装成功</p>
<p>看到 解锁 jenkins，输入logs 中的密码，即能解锁</p>
<h2 id="第二步-安装配置jenkins" tabindex="-1"><a class="header-anchor" href="#第二步-安装配置jenkins" aria-hidden="true">#</a> 第二步：安装配置jenkins</h2>
<p>按照安装推荐插件安装jenkins 的插件</p>
<h3 id="配合-jenkins" tabindex="-1"><a class="header-anchor" href="#配合-jenkins" aria-hidden="true">#</a> 配合 jenkins</h3>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/docker_jenkins安装推荐的插件.png" alt="docker_jenkins安装推荐的插件"></p>
<p>需要等一段时间，下载这些插件</p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/docker_jenkins新手.png" alt="docker_jenkins新手"></p>
<p><strong>报错就重试，咔咔就是干</strong></p>
<h3 id="创建管理员账号" tabindex="-1"><a class="header-anchor" href="#创建管理员账号" aria-hidden="true">#</a> 创建管理员账号</h3>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/docker_jenkins创建账号.png" alt="docker_jenkins创建账号"></p>
<p>保存成功，开始使用 jenkins</p>
<h3 id="换源" tabindex="-1"><a class="header-anchor" href="#换源" aria-hidden="true">#</a> 换源</h3>
<p><code>https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json</code></p>
<p>前往 系统管理 ——&gt; 插件管理 ——&gt; 高级 ——&gt; 拉到最下面</p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/docker_jenkins换源.png" alt="docker_jenkins换源"></p>
<h3 id="下载-ssh-插件" tabindex="-1"><a class="header-anchor" href="#下载-ssh-插件" aria-hidden="true">#</a> 下载 ssh 插件</h3>
<p>前往 系统管理 ——&gt; 插件管理 ——&gt; 可选插件</p>
<p>搜索 &quot;Publish over SSH&quot;，并安装</p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/docker_jenkins下载ssh插件.png" alt="docker_jenkins下载ssh插件"></p>
<h3 id="配置ssh" tabindex="-1"><a class="header-anchor" href="#配置ssh" aria-hidden="true">#</a> 配置ssh</h3>
<p>前往 系统管理 ——&gt; 系统配置——&gt; 拉到最下面（Publish over SSH）</p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/docker_jenkins配置ssh2.png" alt="docker_jenkins配置ssh2"></p>
<p>使用密码</p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/docker_jenkins设置服务器上的ssh.png" alt="docker_jenkins设置服务器上的ssh"></p>
<p>点击 Test Configuration，已经和服务器接通</p>
<h3 id="安装-nodejs-插件" tabindex="-1"><a class="header-anchor" href="#安装-nodejs-插件" aria-hidden="true">#</a> 安装 nodejs 插件</h3>
<p>node插件在跑node项目时需要使用，这里先安装好</p>
<p>前往 系统管理 ——&gt; 插件管理 ——&gt; 可选插件</p>
<p>搜索node，并安装</p>
<h3 id="全局配置node" tabindex="-1"><a class="header-anchor" href="#全局配置node" aria-hidden="true">#</a> 全局配置node</h3>
<p>前往 系统管理 ——&gt; 全局工具配置 ——&gt; NodeJS</p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/docker_jenkins安装node插件1.png" alt="docker_jenkins安装node插件1"></p>
<p>应用并保存它</p>
<p>关于jenkins 的搭建到此告一段落</p>
<h2 id="第三步-准备-node-服务" tabindex="-1"><a class="header-anchor" href="#第三步-准备-node-服务" aria-hidden="true">#</a> 第三步：准备 node 服务</h2>
<p>我们拿上一章讲的koa为例子讲解</p>
<p>生成 <code>.gitignore</code> 文件，并写入 <code>node_modules</code></p>
<p>将 dockerfile_koa_demo 上传至 github</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -m <span class="token string">'first_commit'</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/johanazhu/dockerfile_koa_server.git
<span class="token function">git</span> push -u origin master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="第四步-jenkins-部署-node-服务" tabindex="-1"><a class="header-anchor" href="#第四步-jenkins-部署-node-服务" aria-hidden="true">#</a> 第四步： jenkins 部署 node 服务</h2>
<h3 id="创建一个任务" tabindex="-1"><a class="header-anchor" href="#创建一个任务" aria-hidden="true">#</a> 创建一个任务</h3>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins新建任务.png" alt="jenkins新建任务"></p>
<h3 id="起任务名" tabindex="-1"><a class="header-anchor" href="#起任务名" aria-hidden="true">#</a> 起任务名</h3>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins起任务名字.png" alt="jenkins起任务名字"></p>
<h3 id="任务描述" tabindex="-1"><a class="header-anchor" href="#任务描述" aria-hidden="true">#</a> 任务描述</h3>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins任务描述1.png" alt="jenkins任务描述1"></p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins任务描述2.png" alt="jenkins任务描述2"></p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins任务描述3.png" alt="jenkins任务描述3"></p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins任务描述5.png" alt="jenkins任务描述5"></p>
<p>代码如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker stop koa_server_container 
docker <span class="token function">rm</span> koa_server_container 
docker rmi johanbo/koa_server:v.1.0.0
<span class="token builtin class-name">cd</span> /home/johan/www/jenkins/workspace/dockerfile_koa_server
docker build <span class="token builtin class-name">.</span> -t johanbo/koa_server:v1.0.0
docker run -d --name koa_server_container -p <span class="token number">3011</span>:3010  johanbo/koa_server:v1.0.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>解读以上代码：</p>
<p>第一行：停止 koa_server_container 容器</p>
<p>第二行：删除此容器</p>
<p>第三行：删除生成此容器的镜像</p>
<p>第四行：进入服务器中的jenkins数据卷相对于的目录</p>
<p>注意：<code>dockerfile_koa_server</code>为你一开始创建该项目时的名字</p>
<p>第五行：生成一个名叫johanbo/koa_server:v1.0.0 的镜像</p>
<p>第六行：生成一个以johanbo/koa_server:v1.0.0为镜像的名字叫做 koa_server_container 的容器，并将本机的3011端口与容器的3010做映射</p>
<p>应用并保存</p>
<h3 id="立即构建服务" tabindex="-1"><a class="header-anchor" href="#立即构建服务" aria-hidden="true">#</a> 立即构建服务</h3>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins控制台输出.png" alt="jenkins控制台输出"></p>
<p>发现成功，并且能看到“hello，docker“</p>
<p>在本地更改原文件app.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token parameter">ctx</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'hello, docker, jenkins'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>提交代码至github</p>
<p>通过jenkins 再次部署 node 服务</p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins立即构建.png" alt="jenkins立即构建"></p>
<p>构建完成，刷新浏览器，发现内容已经更换</p>
<p><img src="@source/.vuepress/public/images/Docker/jenkins/jenkins部署成功.png" alt="jenkins部署成功"></p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>在实际开发中其实踩了很多坑，虽然有很好的别人写过的教程，但自己动手做时却有各种限制，比如操作系统不同，秘钥，jenkins的SSH插件，jenkins里支持docker命令的插件集成问题等等</p>
<p>网上关于两种的教程也有很多，但大多数是默认：jenkins 和应用部署在同一台服务器上，这样就能在相对应的文件中构建镜像，</p>
<p>但如果 jenkins 和应用程序是部署在两台服务器上该如何操作呢？留给下一个挑战者</p>
<h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>
<ul>
<li><a href="https://www.infoq.cn/article/0sueQNsY9tLDVi79UZms" target="_blank" rel="noopener noreferrer">怎样用 Jenkins、Docker 和 CI/CD 构建无服务器应用程序？<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.im/post/6844903984419831815" target="_blank" rel="noopener noreferrer">【手把手系列之】Jenkins+Docker自动化部署vue项目<ExternalLinkIcon/></a></li>
<li><a href="http://www.wallcopper.com/linux/3689.html" target="_blank" rel="noopener noreferrer">Failed to add SSH key. Message “invalid privatekey” 问题<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/39549204" target="_blank" rel="noopener noreferrer">jenkins配置publish over ssh遇到的问题<ExternalLinkIcon/></a></li>
<li><a href="https://www.slideshare.net/Docker/build-publish-deploy-and-test-docker-images-and-containers-with-jenkins-workflow" target="_blank" rel="noopener noreferrer">Build, Publish, Deploy and Test Docker images and containers with Jenkins Workflow<ExternalLinkIcon/></a></li>
<li><a href="https://www.youtube.com/watch?v=mszE-OCI2V4" target="_blank" rel="noopener noreferrer">Building Docker Images using Jenkins step by step | Devops Integration Live Demo | JavaTechie<ExternalLinkIcon/></a></li>
</ul>
</template>
