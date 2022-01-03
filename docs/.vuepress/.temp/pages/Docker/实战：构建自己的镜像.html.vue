<template><h1 id="实战-构建自己的镜像" tabindex="-1"><a class="header-anchor" href="#实战-构建自己的镜像" aria-hidden="true">#</a> 实战：构建自己的镜像</h1>
<p>构建镜像有两种，一种是在命令行中实现，一种通过dockerfile实现</p>
<p>这里，我们以ubuntu为例，构建自己的镜像</p>
<h2 id="命令行中实现" tabindex="-1"><a class="header-anchor" href="#命令行中实现" aria-hidden="true">#</a> 命令行中实现</h2>
<p>思路：</p>
<p>第一步：进入容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -it --name ubuntu_node_johanbo ubuntu:latest /bin/bash
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>解释：以 <code>ubuntu:latest</code> 为镜像构建名字为 ubuntu_node_johanbo 的容器，并进入容器中</p>
<p>第二步：在容器中安装 nodejs, npm 和 pm2</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt-get</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">apt-get</span> <span class="token function">install</span> -y nodejs <span class="token function">npm</span> <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> <span class="token function">install</span> pm2 -g
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>第三步：退出容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>按住 Ctrl + p + q
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>第四步： 将修改后的容器打包为镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker <span class="token function">ps</span> 查看正在运行的容器，找到刚刚启动的容器Id
docker commit <span class="token operator">&lt;</span>容器ID<span class="token operator">></span> <span class="token operator">&lt;</span>自定义的镜像名<span class="token operator">></span>
docker images 查看镜像
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>此时，我们的镜像已经生成了。这个镜像中以ubuntu为底层，并安装了node，npm和pm2等包。如果你愿意，可以通过命令<code>docker push &lt;自定义镜像名&gt;</code> 推送至远端仓库</p>
<p>但这种方法，你需要在容器中做多次操作，一不小心也许就有出错。所以，大多数情况下，推荐第二种，使用 dockerfile 来规范你的镜像</p>
<h2 id="dockerfile-构建镜像" tabindex="-1"><a class="header-anchor" href="#dockerfile-构建镜像" aria-hidden="true">#</a> dockerfile 构建镜像</h2>
<p>第一步：编写 dockerfile</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 基于Ubuntu image</span>
FROM daocloud.io/library/ubuntu:latest

<span class="token comment"># MAINTAINER</span>
LABEL <span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token string">"1.0"</span> <span class="token assign-left variable">by</span><span class="token operator">=</span><span class="token string">"johan"</span>

<span class="token comment"># 设置时区</span>
RUN <span class="token function">sudo</span> <span class="token function">sh</span> -c <span class="token string">"echo 'Asia/Shanghai' > /etc/timezone"</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token function">sudo</span> dpkg-reconfigure -f noninteractive tzdata

<span class="token comment"># 更换 Ubuntu 镜像</span>
RUN <span class="token builtin class-name">echo</span> <span class="token string">'\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n'</span><span class="token punctuation">\</span>
<span class="token operator">></span> /etc/apt/sources.list

<span class="token comment"># 安装Node.js与NPM</span>
RUN <span class="token function">apt-get</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">apt-get</span> -y <span class="token function">install</span> nodejs <span class="token function">npm</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>第二步：构建镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker build <span class="token builtin class-name">.</span> -t ubuntu_node_johan:v1.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>完</p>
<p>以上两种为构建镜像的两种方式</p>
</template>
