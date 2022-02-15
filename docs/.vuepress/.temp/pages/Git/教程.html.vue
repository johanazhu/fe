<template><h1 id="教程" tabindex="-1"><a class="header-anchor" href="#教程" aria-hidden="true">#</a> 教程</h1>
<blockquote>
<p>学习一个知识，就去论坛上回答十个问题</p>
</blockquote>
<ul>
<li>Git的四大工作区域</li>
<li>Git的工作流程</li>
<li>Git文件的四种状态</li>
<li>一张图解释Git的工作原理</li>
</ul>
<h2 id="git的四大工作区域" tabindex="-1"><a class="header-anchor" href="#git的四大工作区域" aria-hidden="true">#</a> Git的四大工作区域</h2>
<p><img src="https://i.loli.net/2021/06/03/1pBMUbkOPAGNWjH.jpg" alt="工作区域"></p>
<ul>
<li>Workspace：就是你在电脑上看到的目录</li>
<li>Index/Stage：暂存区，一般存放在 .git 目录下。执行 <code>git add</code>，改动添加到这个区域</li>
<li>Repository：本地仓库，git clone 到本地的仓库地址，执行 <code>git commit</code>，文件改动就到本地仓库了</li>
<li>Remote：远程仓库。顾名思义</li>
</ul>
<h3 id="如何理解工作区与暂存区的区别" tabindex="-1"><a class="header-anchor" href="#如何理解工作区与暂存区的区别" aria-hidden="true">#</a> 如何理解工作区与暂存区的区别？</h3>
<p>工作区：就是你在电脑上看到的目录，比如目录下gittest里的文件（.git隐藏目录版本库除外）。或者以后需要再新建的目录文件等都属于工作区范畴</p>
<p>版本库（Repository）：工作区有一个隐藏目录.git，这个不属于工作区，这是版本库。其中版本库里面存了很多东西，其中最重要的就是stage（暂存区）</p>
<p>先使用<code>git init</code>，初始化一个新的git项目，并查看该目录下的 <code>.git</code> 隐藏目录。使用 <code>ls</code>  查看目录下的文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
<span class="token function">ls</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzk0MzIyMDA1OA==&amp;mid=2247494230&amp;idx=4&amp;sn=44a9a3f11382f748f6aede13ab644d7a&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">程序员必备基础：Git 命令全方位学习<ExternalLinkIcon/></a></li>
<li><a href="https://www.cnblogs.com/selimsong/p/9059964.html" target="_blank" rel="noopener noreferrer">好代码是管出来的——Git的分支工作流与Pull Request<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651235750&amp;idx=1&amp;sn=bdc3d6938b34638c3868d3c69e763f8b&amp;chksm=bd497c228a3ef53478d4c6e9cf3f266f684dc76525917674d0bfa91d50e757837e7545480492&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1582329694574&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">【第1864期】手撕Git，告别盲目记忆<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/521xueweihan/git-tips" target="_blank" rel="noopener noreferrer">Git 的奇技淫巧<ExternalLinkIcon/></a></li>
<li><a href="https://learngitbranching.js.org/?locale=zh_CN" target="_blank" rel="noopener noreferrer">在线学习Git网站<ExternalLinkIcon/></a></li>
<li><a href="https://git-scm.com/book/zh/v2" target="_blank" rel="noopener noreferrer">git 官方文档<ExternalLinkIcon/></a></li>
<li><a href="https://my.oschina.net/xdev/blog/114383" target="_blank" rel="noopener noreferrer">图解Git<ExternalLinkIcon/></a></li>
<li><a href="http://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html" target="_blank" rel="noopener noreferrer">git-flow 备忘清单<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzg5NDEyMzA2NQ==&amp;mid=2247485885&amp;idx=1&amp;sn=fb026c79d62160e30c8a573b88292ada&amp;chksm=c02524ebf752adfd0d5d8a779ab4935a1c3bf7c3d6c901a816c52847c4f0083ddd0576a486f4&amp;mpshare=1&amp;scene=1&amp;srcid=09157qmCiBiWZ7XiqTZVoupe&amp;sharer_sharetime=1600137668493&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&amp;key=6614a0a10b7b6719893163c2d47988f8f6b7aba22cad0bb980c58ef9ad491d18382e59e4eca8a3980f277546c047004649a36c251ab70e6a4da0fc3258912d709dd732ea16a9ffe66140f1cdd3e234c6ced69b8c599b71a9dcc7fd3411ff83c1fb7c16f255065b8872178dee43d7c7518cd2e9c8a3290958d1932ff28baa8c4d&amp;ascene=1&amp;uin=MTA0NTY0NDM2MQ%3D%3D&amp;devicetype=Windows+10+x64&amp;version=62090529&amp;lang=zh_CN&amp;exportkey=AYO1EPBf4skwaROMxz490bI%3D&amp;pass_ticket=X3VNYNXcDTVwNpUtGAVXbhnocc4It3ssOIqIC%2FA7FS4fnHhcGPBP0sZBFjnUOpnH&amp;wx_header=0" target="_blank" rel="noopener noreferrer">「一劳永逸」一张脑图带你全面掌握 Git 命令<ExternalLinkIcon/></a></li>
<li><a href="https://labuladong.gitee.io/algo/4/34/147/" target="_blank" rel="noopener noreferrer">我用四个命令概括了 GIT 的所有套路<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/41z7RPUXSYenhfDqmaXInA" target="_blank" rel="noopener noreferrer">图解Git工作原理<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000018272902" target="_blank" rel="noopener noreferrer">图解git原理与日常实用指南<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/uqEL6cqRWRXu2hH1ySNAIQ" target="_blank" rel="noopener noreferrer">我在工作中是如何使用Git的<ExternalLinkIcon/></a></li>
<li><a href="https://www.zhihu.com/question/20070065/answer/16021641?utm_source=wechat_session&amp;utm_medium=social&amp;utm_oi=56197411504128&amp;utm_content=sec" target="_blank" rel="noopener noreferrer">天猪对 git 的理解<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/7eLcoFTHwMETH-Sqb4ysKg" target="_blank" rel="noopener noreferrer">图解 Git 各种用法，简单明了，一目了然！<ExternalLinkIcon/></a></li>
<li><a href="https://www.zhihu.com/topic/19557710/hot" target="_blank" rel="noopener noreferrer">GIT<ExternalLinkIcon/></a></li>
</ul>
</template>
