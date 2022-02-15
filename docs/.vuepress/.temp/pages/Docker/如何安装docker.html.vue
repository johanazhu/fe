<template><h1 id="如何安装docker" tabindex="-1"><a class="header-anchor" href="#如何安装docker" aria-hidden="true">#</a> 如何安装docker</h1>
<p>具体可看 <a href="https://zhuanlan.zhihu.com/p/85048683" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a> ,19年10月份写的，在未来几年里，够用。</p>
<p>也可以直接去官网的<a href="https://download.docker.com" target="_blank" rel="noopener noreferrer">下载地址<ExternalLinkIcon/></a>下载</p>
<p>值得注意的是，必须要开启 <strong>Hyper-V</strong></p>
<p>下载安装好docker后，运行 Docker Desktop ，右下角会出现小鲸鱼的logo，打开终端</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker version
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/Docker/docker_version.png" alt="docker_version"></p>
<p>从打印出的信息中我们可以看出，它的Server里的OS（操作系统）是linux，也正式我们想要的，如果是window，需要切换小鲸鱼图标</p>
<p>看到 Switch to Window containers ... 说明是 Liunx 版本</p>
<p>看到 Switch to Linux containers ... 说明是 window 版本</p>
<p><img src="@source/.vuepress/public/images/Docker/set_linux环境.png" alt="set_linux环境"></p>
<p>如下是Docker切换成window后的样子（看OS/Arch）</p>
<p><img src="@source/.vuepress/public/images/Docker/docker_version_window.png" alt="docker_version_window"></p>
<p>点击小鲸鱼，登录账号，以后发布自己的docker 镜像就可以命令行直接推送至docker hub，原理跟git一样</p>
</template>
