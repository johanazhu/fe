import{_ as r,r as t,o as l,c,a as n,d as e,F as i,e as o,b as a}from"./app.873f0dc8.js";const p={},m=o(`<h1 id="\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> \u5E38\u7528\u547D\u4EE4</h1><p>\u5217\u51FA\u6240\u6709 git \u5F53\u65F6\u80FD\u627E\u5230\u7684\u914D\u7F6E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> config --list
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>\u4E5F\u53EF\u4EE5\u901A\u8FC7\u8F93\u5165<code>git config &lt;key&gt;</code>\uFF1A\u68C0\u67E5 Git \u7684\u67D0\u4E00\u9879\u914D\u7F6E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> config user.name
<span class="token comment"># johanazhu</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="\u8BBE\u7F6E\u5168\u5C40-git-\u7528\u6237\u540D\u548C\u90AE\u7BB1" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u5168\u5C40-git-\u7528\u6237\u540D\u548C\u90AE\u7BB1" aria-hidden="true">#</a> \u8BBE\u7F6E\u5168\u5C40 git \u7528\u6237\u540D\u548C\u90AE\u7BB1</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> config --global user.name johan
<span class="token function">git</span> config --global user.email xxx@github.com
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="\u67E5\u770B-git-\u7528\u6237\u540D\u548C\u90AE\u7BB1" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B-git-\u7528\u6237\u540D\u548C\u90AE\u7BB1" aria-hidden="true">#</a> \u67E5\u770B git \u7528\u6237\u540D\u548C\u90AE\u7BB1</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> config user.name
<span class="token function">git</span> config user.email
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> checkout -- readme.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u4E22\u5F03\u5DE5\u4F5C\u533A\u7684\u4FEE\u6539</p><h4 id="git-branch" tabindex="-1"><a class="header-anchor" href="#git-branch" aria-hidden="true">#</a> git branch</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> branch \u67E5\u770B\u672C\u5730\u6240\u6709\u7684\u5206\u652F
<span class="token function">git</span> branch -f \u67E5\u770B\u6240\u6709\u8FDC\u7A0B\u7684\u5206\u652F
<span class="token function">git</span> branch -a \u67E5\u770B\u6240\u6709\u8FDC\u7A0B\u5206\u652F\u548C\u672C\u5730\u5206\u652F
<span class="token function">git</span> branch -D <span class="token operator">&lt;</span>\u5206\u652F\u540D<span class="token operator">&gt;</span> \u5220\u9664\u672C\u5730\u5206\u652F
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="git-checkout" tabindex="-1"><a class="header-anchor" href="#git-checkout" aria-hidden="true">#</a> git checkout</h4><p>\u5982\u679C\u6587\u4EF6\u8FD8\u5728\u5DE5\u4F5C\u533A\uFF0C\u8FD8\u6CA1\u6DFB\u52A0\u5230\u6682\u5B58\u533A\uFF0C\u53EF\u4EE5\u4F7F\u7528 git checkout \u64A4\u9500</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token punctuation">[</span>file<span class="token punctuation">]</span> \u4E22\u5F03\u67D0\u4E2A\u6587\u4EF6file
<span class="token function">git</span> checkout <span class="token builtin class-name">.</span> \u4E22\u5F03\u6240\u6709\u7684\u6587\u4EF6
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>git \u5F3A\u5236\u63D0\u4EA4\u672C\u5730\u5206\u652F\u8986\u76D6\u8FDC\u7A0B\u5206\u652F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git push origin raw --force
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>git alias</p><div class="language-.gitconfig ext-.gitconfig line-numbers-mode"><pre class="language-.gitconfig"><code>[alias]
    st = status -sb
    co = checkout
    br = branch
    mg = merge
    ci = commit
    ds = diff --staged
    dt = difftool
    mt = mergetool
    last = log -1 HEAD
    latest = for-each-ref --sort=-committerdate --format=\\&quot;%(committername)@%(refname:short) [%(committerdate:short)] %(contents)\\&quot;
    ls = log --pretty=format:\\&quot;%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\\&quot; --decorate --date=short
    hist = log --pretty=format:\\&quot;%C(yellow)%h %C(red)%d %C(reset)%s %C(green)[%an] %C(blue)%ad\\&quot; --topo-order --graph --date=short
    type = cat-file -t
    dump = cat-file -p
    lg = log --color --graph --pretty=format:&#39;%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset&#39; --abbrev-commit
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h2>`,21),b={href:"https://missing-semester-cn.github.io/2020/version-control/",target:"_blank",rel:"noopener noreferrer"},d=a("\u7248\u672C\u63A7\u5236(Git)"),u={href:"https://github.com/521xueweihan/git-tips",target:"_blank",rel:"noopener noreferrer"},h=a("Git \u7684\u5947\u6280\u6DEB\u5DE7"),g={href:"https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046316&idx=1&sn=8034a23e3367d14ba02565d0dd2c5634&chksm=87cbe6bcb0bc6faa8e7c3dab7604392dd4fe7ce3af125a2a695ea15c3a1caefd08cd374f0133&mpshare=1&scene=1&srcid=&sharer_sharetime=1567210777793&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd",target:"_blank",rel:"noopener noreferrer"},f=a("\u73CD\u85CF\u591A\u5E74\u7684 Git \u95EE\u9898\u548C\u64CD\u4F5C\u6E05\u5355"),k={href:"https://dev.to/domagojvidovic/11-git-commands-i-use-every-day-43eo",target:"_blank",rel:"noopener noreferrer"},v=a("11 Git Commands I Use Every Day");function _(x,C){const s=t("ExternalLinkIcon");return l(),c(i,null,[m,n("ul",null,[n("li",null,[n("a",b,[d,e(s)])]),n("li",null,[n("a",u,[h,e(s)])]),n("li",null,[n("a",g,[f,e(s)])]),n("li",null,[n("a",k,[v,e(s)])])])],64)}var q=r(p,[["render",_],["__file","git\u5E38\u89C1\u547D\u4EE4.html.vue"]]);export{q as default};
