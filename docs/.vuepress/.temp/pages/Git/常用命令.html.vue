<template><h1 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h1>
<p>列出所有 git 当时能找到的配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config --list
<span class="token comment"># diff.astextplain.textconv=astextplain</span>
<span class="token comment"># filter.lfs.clean=git-lfs clean -- %f</span>
<span class="token comment"># filter.lfs.smudge=git-lfs smudge -- %f</span>
<span class="token comment"># filter.lfs.process=git-lfs filter-process</span>
<span class="token comment"># filter.lfs.required=true</span>
<span class="token comment"># http.sslbackend=openssl</span>
<span class="token comment"># http.sslcainfo=D:/Program Files (x86)/Git/mingw64/ssl/certs/ca-bundle.crt</span>
<span class="token comment"># core.autocrlf=true</span>
<span class="token comment"># core.fscache=true</span>
<span class="token comment"># core.symlinks=false</span>
<span class="token comment"># pull.rebase=false</span>
<span class="token comment"># credential.helper=manager</span>
<span class="token comment"># user.email=t511069160@qq.com</span>
<span class="token comment"># user.name=johanazhu</span>
<span class="token comment"># core.repositoryformatversion=0</span>
<span class="token comment"># core.filemode=false</span>
<span class="token comment"># core.bare=false</span>
<span class="token comment"># core.logallrefupdates=true</span>
<span class="token comment"># core.symlinks=false</span>
<span class="token comment"># core.ignorecase=true</span>
<span class="token comment"># remote.origin.url=git@10.139.108.213:/mnt/datadisk/git_repo/jingqb-web.git</span>
<span class="token comment"># remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*</span>
<span class="token comment"># branch.master.remote=origin</span>
<span class="token comment"># branch.master.merge=refs/heads/master</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>也可以通过输入<code>git config &lt;key&gt;</code>：检查 Git 的某一项配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config user.name
<span class="token comment"># johanazhu</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="设置全局git用户名和邮箱" tabindex="-1"><a class="header-anchor" href="#设置全局git用户名和邮箱" aria-hidden="true">#</a> 设置全局git用户名和邮箱</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config --global user.name johan
<span class="token function">git</span> config --global user.email xxx@github.com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="查看git用户名和邮箱" tabindex="-1"><a class="header-anchor" href="#查看git用户名和邮箱" aria-hidden="true">#</a> 查看git用户名和邮箱</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config user.name
<span class="token function">git</span> config user.email
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout -- readme.txt
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>丢弃工作区的修改</p>
<h4 id="git-branch" tabindex="-1"><a class="header-anchor" href="#git-branch" aria-hidden="true">#</a> git branch</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch 查看本地所有的分支
<span class="token function">git</span> branch -f 查看所有远程的分支
<span class="token function">git</span> branch -a 查看所有远程分支和本地分支
<span class="token function">git</span> branch -D <span class="token operator">&lt;</span>分支名<span class="token operator">></span> 删除本地分支
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="git-checkout" tabindex="-1"><a class="header-anchor" href="#git-checkout" aria-hidden="true">#</a> git checkout</h4>
<p>如果文件还在工作区，还没添加到暂存区，可以使用git checkout撤销</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token punctuation">[</span>file<span class="token punctuation">]</span> 丢弃某个文件file
<span class="token function">git</span> checkout <span class="token builtin class-name">.</span> 丢弃所有的文件
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>git强制提交本地分支覆盖远程分支</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git push origin raw --force
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://missing-semester-cn.github.io/2020/version-control/" target="_blank" rel="noopener noreferrer">版本控制(Git)<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/521xueweihan/git-tips" target="_blank" rel="noopener noreferrer">Git 的奇技淫巧<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&amp;mid=2451046316&amp;idx=1&amp;sn=8034a23e3367d14ba02565d0dd2c5634&amp;chksm=87cbe6bcb0bc6faa8e7c3dab7604392dd4fe7ce3af125a2a695ea15c3a1caefd08cd374f0133&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1567210777793&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">珍藏多年的 Git 问题和操作清单<ExternalLinkIcon/></a></li>
<li><a href="https://dev.to/domagojvidovic/11-git-commands-i-use-every-day-43eo" target="_blank" rel="noopener noreferrer">11 Git Commands I Use Every Day<ExternalLinkIcon/></a></li>
</ul>
</template>
