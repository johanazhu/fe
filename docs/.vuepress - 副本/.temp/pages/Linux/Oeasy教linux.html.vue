<template><h1 id="oeasy教linux" tabindex="-1"><a class="header-anchor" href="#oeasy教linux" aria-hidden="true">#</a> Oeasy教linux</h1>
<h3 id="linux-是什么" tabindex="-1"><a class="header-anchor" href="#linux-是什么" aria-hidden="true">#</a> linux 是什么？</h3>
<p>这 <strong>linux</strong> 就是服务器的 <strong>内核 (kernel)</strong>。 咱平常所说的 <strong>linux</strong> 操作系统的全称是 GNU/linux. 单独的 <strong>linux</strong> 一般指的并不是操作系统，而是操作系统的 <strong><a href="https://baike.baidu.com/item/%E5%86%85%E6%A0%B8" target="_blank" rel="noopener noreferrer">kernel（内核）<ExternalLinkIcon/></a></strong> .linux 内核和 GNU 的组件合在一起，才是操作系统。</p>
<p>这 <strong>linux</strong> 就是服务器的 <strong>内核 (kernel)</strong>。 咱平常所说的 <strong>linux</strong> 操作系统的全称是 GNU/linux. 单独的 <strong>linux</strong> 一般指的并不是操作系统，而是操作系统的 <strong><a href="https://baike.baidu.com/item/%E5%86%85%E6%A0%B8" target="_blank" rel="noopener noreferrer">kernel（内核）<ExternalLinkIcon/></a></strong> .linux 内核和 GNU 的组件合在一起，才是操作系统。</p>
<h3 id="什么是内核-unmae" tabindex="-1"><a class="header-anchor" href="#什么是内核-unmae" aria-hidden="true">#</a> 什么是内核 unmae？</h3>
<h4 id="如何查找本机的内核" tabindex="-1"><a class="header-anchor" href="#如何查找本机的内核" aria-hidden="true">#</a> 如何查找本机的内核</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">uname</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里需要注意的是：</p>
<ul>
<li>linux 的命令是 <strong>大小写敏感 (case sensitive)</strong> 的，一般命令名都是 <strong>小写</strong>。</li>
<li>我们可以看到，内核的版本如 4/18.0-21-generic</li>
</ul>
<p>查找更多请输入选项 <strong>--help</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">uname</span> --help
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里需要注意的是：</p>
<ul>
<li>我们的命令还是小写的 <strong>uname</strong></li>
<li>我们的参数是 --help</li>
<li>在 <strong>命令 uname</strong> 和 <strong>参数 --help</strong> 之间有一个英文的 <strong>空格</strong> 隔开</li>
</ul>
<p>我们可以通过 uname -a 得到全部信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">uname</span> -a
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我们可以看到：</p>
<ul>
<li>当前的内核版本是 4.18.0-21-generic</li>
<li>cpu 架构指令集是 x86_64</li>
<li>当前的发行版是 <strong>ubuntu</strong></li>
</ul>
<h3 id="什么是发行版-distro" tabindex="-1"><a class="header-anchor" href="#什么是发行版-distro" aria-hidden="true">#</a> 什么是发行版 distro</h3>
<h4 id="什么是发行版" tabindex="-1"><a class="header-anchor" href="#什么是发行版" aria-hidden="true">#</a> 什么是发行版</h4>
<p>只靠 linux 内核，我们无法做任何事情，只有内核和各种应用程序在一起，我们才能使用。</p>
<p>发行版 (distro) 的英文原文是 distribution, 是内核和应用程序的集合。一个典型的 Linux 发行版包括：Linux 内核，一些 GNU 程序库和工具，命令行 shell, 也会包含图形界面。</p>
<p>发行版非常多，你可以去 <a href="https://distrowatch.com/" target="_blank" rel="noopener noreferrer">distrowatch<ExternalLinkIcon/></a> 去看看各种个样的发行版的介绍！</p>
<h4 id="不同种类的发行版" tabindex="-1"><a class="header-anchor" href="#不同种类的发行版" aria-hidden="true">#</a> 不同种类的发行版</h4>
<p>不同的发行版有不同的技能：</p>
<ul>
<li>debian, 适合系统管理和运维</li>
<li>ubuntu 安装简单，界面友好，社区活跃。</li>
<li>kali 就适合做网络安全方面的操作</li>
<li>deepin 国产的深度发行版，界面做的非常好看</li>
<li>centos 服务器</li>
<li>gentoo 深入底层，透明</li>
</ul>
<h4 id="linux-发行版三大家族" tabindex="-1"><a class="header-anchor" href="#linux-发行版三大家族" aria-hidden="true">#</a> Linux 发行版三大家族</h4>
<p>Linux 发行版虽然很多，但是大体上是三大家族：</p>
<ul>
<li>Debian 家族</li>
<li>Rhel 家族</li>
<li>Suse 家族</li>
</ul>
<p><img src="@source/.vuepress/public/images/Linux/distro_family.jpg" alt="distro_family"></p>
<h4 id="ubuntu-和-mint" tabindex="-1"><a class="header-anchor" href="#ubuntu-和-mint" aria-hidden="true">#</a> Ubuntu 和 Mint</h4>
<h4 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu" aria-hidden="true">#</a> Ubuntu</h4>
<p>其名称来自非洲 🌍 南部祖鲁语或豪萨语的“ubuntu&quot;一词，意思是“人性”“我的存在是因为大家的存在&quot;，是非洲传统的一种价值观。</p>
<p>发作“oo-boon-too”的音，如果你喜欢添加一些非洲撒哈拉的味道，你可以在第一个&quot;u&quot;，後面带些嗡嗡声：oom-boon-too。😮</p>
<p>Ubuntu 是 Canonical 公司在 debian 稳定版 (stable) 基础上做出的发行版。私营公司做开源软件为什么许的呢？</p>
<p>开源和商业并不是非黑即白的。</p>
<h4 id="canonical-公司的现金主要来源于" tabindex="-1"><a class="header-anchor" href="#canonical-公司的现金主要来源于" aria-hidden="true">#</a> Canonical 公司的现金主要来源于</h4>
<ul>
<li>服务器集群管理工具 Landscape 的服务支持</li>
<li>oem 设备的预装系统费用</li>
<li>Ubuntu 软件中心的付费位</li>
<li>代码托管平台 launchpad.net 服务费用</li>
<li>亚马逊云的相关广告</li>
<li>Ubuntu 手机预装软件收费</li>
<li><a href="https://sourceforge.net/projects/uck/" target="_blank" rel="noopener noreferrer">甚至 CD 包内容都可以自己定制<ExternalLinkIcon/></a></li>
</ul>
<p>Ubuntu 是非常流行的发行版，整体上来说善于推广，比较讨巧。</p>
<h4 id="mint" tabindex="-1"><a class="header-anchor" href="#mint" aria-hidden="true">#</a> Mint</h4>
<p>Mint 是基于 Ubuntu 的，Ubuntu 是基于 Debian 的，所以 ... Mint 很年轻。</p>
<p>Mint 也是长期霸榜的存在，收入主要靠 t 恤和赞助</p>
<h4 id="如何查看发行版的版本号" tabindex="-1"><a class="header-anchor" href="#如何查看发行版的版本号" aria-hidden="true">#</a> 如何查看发行版的版本号</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> /etc/*release
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>/etc/*release 是参数，指的是根（root）下的 etc 文件夹下的所有以 release 结尾的文件</li>
</ul>
<p><img src="@source/.vuepress/public/images/Linux/release.png" alt="release"></p>
<h3 id="我在哪-pwd" tabindex="-1"><a class="header-anchor" href="#我在哪-pwd" aria-hidden="true">#</a> 我在哪 pwd</h3>
<p><code>cd=change directory</code> 意思是改变文件夹。</p>
<h4 id="boot-的用法" tabindex="-1"><a class="header-anchor" href="#boot-的用法" aria-hidden="true">#</a> boot 的用法</h4>
<h5 id="在计算机系统中" tabindex="-1"><a class="header-anchor" href="#在计算机系统中" aria-hidden="true">#</a> 在计算机系统中</h5>
<ul>
<li>boot 是启动</li>
<li>bootstrap 是引导程序</li>
</ul>
<h5 id="启动-boot-是这样的-🤭" tabindex="-1"><a class="header-anchor" href="#启动-boot-是这样的-🤭" aria-hidden="true">#</a> 启动 boot，是这样的...🤭</h5>
<ol>
<li>关机状态中，内核和整个系统最开始在硬盘里</li>
<li>引导程序通过 cpu 把内核从硬盘的 /boot 目录加载到内存中</li>
<li>cpu 开始执行内存中的内核对应的指令</li>
<li>内核完成初始化</li>
<li>内核接管了系统资源（cpu、内存、外设）</li>
<li>操作系统完成启动过程</li>
<li>等待下一步输入的指令</li>
</ol>
<h4 id="什么是内存" tabindex="-1"><a class="header-anchor" href="#什么是内存" aria-hidden="true">#</a> 什么是内存</h4>
<p><strong>内存也称主存 Main Momeory</strong>。内存是能够直接被 cpu 操作的存储器。而硬盘光驱是外存，外存中的数据只有先调入内存后才能被中央处理器访问、处理。</p>
<h4 id="proc-是什么意思" tabindex="-1"><a class="header-anchor" href="#proc-是什么意思" aria-hidden="true">#</a> proc 是什么意思？</h4>
<p>proc 指的是 process（进程）， 进程就是被内核从硬盘加载到内存的，正在运行着的程序。</p>
<h3 id="灵魂之问-whatis" tabindex="-1"><a class="header-anchor" href="#灵魂之问-whatis" aria-hidden="true">#</a> 灵魂之问 whatis</h3>
<p><strong>用命令去记住命令，用魔法打败魔法</strong> 😎</p>
<ul>
<li><code>whatis</code> 就是我们今天要学的新命令。</li>
<li>顾名思义 <code>whatis</code> 你是干嘛的？</li>
<li><code>whatis</code> 可以告我们某条命令是干什么用的</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>whatis <span class="token function">uname</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/Linux/whatis.png" alt="whatis"></p>
<p><strong>这样就可以让 <code>whatis</code> 命令告诉我们命令用法。</strong></p>
<ul>
<li>一般结果是英文的</li>
<li><code>whatis</code> 会用最简单的语言形容该命令</li>
<li><code>whatis</code> 就像水晶球一样神奇 🥳</li>
</ul>
<h3 id="详查手册-man" tabindex="-1"><a class="header-anchor" href="#详查手册-man" aria-hidden="true">#</a> 详查手册 man</h3>
<p>查找手册</p>
<h3 id="这儿都有啥-ls" tabindex="-1"><a class="header-anchor" href="#这儿都有啥-ls" aria-hidden="true">#</a> 这儿都有啥 ls</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> -a
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这下我们看到隐藏文件（以&quot;.&quot;开头的）了！</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> -l
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>通过查询手册我们发现了 <code>-l</code> 这个参数，<code>l</code> 的意思是 list。这个参数可以以列表方式查询文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ls -l -a
ls -a -l
ls -al
ls -la
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>既能看到隐藏文件，又使用列表方式</p>
<p><strong>选项-h, 指的是人类可读：</strong></p>
<ul>
<li>原来的文件大小使用的是字节数量</li>
<li>字节数量不利于阅读</li>
<li>人们可以使用 k,m,g,t 等存储容量单位来观察了</li>
<li>h 的意思是 Human Readable</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> -h
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="递归查询文件" tabindex="-1"><a class="header-anchor" href="#递归查询文件" aria-hidden="true">#</a> 递归查询文件</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> -R
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="那啥在哪-whereis" tabindex="-1"><a class="header-anchor" href="#那啥在哪-whereis" aria-hidden="true">#</a> 那啥在哪 whereis</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">whereis</span> <span class="token function">ls</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="到底哪个-which" tabindex="-1"><a class="header-anchor" href="#到底哪个-which" aria-hidden="true">#</a> 到底哪个 which</h3>
<p>查看绝对路径</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">which</span> java
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>现在我们有了三个灵魂问题了： ✊</p>
<ul>
<li>whatis 你是谁</li>
<li>whereis 你在哪</li>
<li>which 到底在哪</li>
</ul>
<h4 id="灵魂三问" tabindex="-1"><a class="header-anchor" href="#灵魂三问" aria-hidden="true">#</a> 灵魂三问</h4>
<p>接下来我们来对 <code>cat</code> 命令，试试这个灵魂三问：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>whatis <span class="token function">cat</span>
<span class="token function">whereis</span> <span class="token function">cat</span>
<span class="token function">which</span> <span class="token function">cat</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="清屏chear" tabindex="-1"><a class="header-anchor" href="#清屏chear" aria-hidden="true">#</a> 清屏chear</h3>
<h3 id="命令行总结-summary" tabindex="-1"><a class="header-anchor" href="#命令行总结-summary" aria-hidden="true">#</a> 命令行总结 summary</h3>
<ul>
<li>Linux 的历史 ⌨️</li>
<li>各种发行版的生生灭灭</li>
<li>系统运作的过程 🖥</li>
<li>程序运行的过程</li>
<li>各种命令 ⌨️</li>
<li>命令行技巧 💡</li>
</ul>
<h4 id="命令-command🧐" tabindex="-1"><a class="header-anchor" href="#命令-command🧐" aria-hidden="true">#</a> 命令 Command🧐</h4>
<ul>
<li>uname</li>
<li>cd</li>
<li>ls</li>
<li>cat</li>
<li>pwd</li>
<li>灵魂三问
<ul>
<li>whatis</li>
<li>whereis</li>
<li>which</li>
</ul>
</li>
<li>man</li>
</ul>
<h4 id="命令行快捷方式-💡" tabindex="-1"><a class="header-anchor" href="#命令行快捷方式-💡" aria-hidden="true">#</a> 命令行快捷方式 💡</h4>
<ul>
<li>记忆命令
<ul>
<li>⬆️ 上一条命令</li>
<li>⬇️️ 下一条命令</li>
<li>ctrl+r 搜索历史命令</li>
</ul>
</li>
<li>快速移动
<ul>
<li>⬅️ 向左一格</li>
<li>➡️️ 向右一格</li>
<li>ctrl⬅️ 向左一个单词</li>
<li>ctrl➡ 向右一个单词</li>
<li>ctrla 直接到头</li>
<li>ctrle 直接到尾</li>
</ul>
</li>
<li>快捷键清屏
<ul>
<li>ctrl+l清屏</li>
</ul>
</li>
<li>快速删除
<ul>
<li>ctrl+c 忽略当前行</li>
<li>ctrl+u 从光标位置开始，删除左方所有的字符，直到该行开始的位置</li>
<li>ctrl+k 从光标位置开始，删除右方所有的字符，直到该行结束的位置</li>
</ul>
</li>
<li>登出系统
<ul>
<li>ctrl+d 快速退出终端</li>
</ul>
</li>
</ul>
<h3 id="软件包管理-apt" tabindex="-1"><a class="header-anchor" href="#软件包管理-apt" aria-hidden="true">#</a> 软件包管理 apt</h3>
<p>apt 是 advanced package tools 的意思，apt 是 debian 系发行版的软件包管理工具。红帽系的 yum、arch 系的 pacman 也是很好的管理工具。</p>
<h4 id="为什么要用这个工具-🔧" tabindex="-1"><a class="header-anchor" href="#为什么要用这个工具-🔧" aria-hidden="true">#</a> 为什么要用这个工具 🔧</h4>
<ul>
<li>不同的 cpu 架构要用不同的二进制文件</li>
<li>你可以有两种方法得到某种架构（比如 mips) 的二进制文件
<ul>
<li>直接下载这个架构的二进制文件</li>
<li>下载这个软件包的源文件，自己编译 ⚙️</li>
</ul>
</li>
</ul>
<p><strong>但是这个得到的二进制文件还是有可能不能用，比如：</strong></p>
<p>软件包之间是有依赖关系的，这个软件包依赖的软件包不存在，甚至被依赖的软件包所依赖的软件包不存在，这就形成了一条链路，我们就需要把这条链路上所有的软件包都下载下来。</p>
<p><strong>有没有更便捷的方法呢？当然有，我们可以：</strong></p>
<p>使用 apt 把相关操作封装成接口，我们直接调用 apt 就可以了，所以叫做高级包管理工具，当然你得有地方下载，这就需要镜像站</p>
<h4 id="镜像站-mirrors" tabindex="-1"><a class="header-anchor" href="#镜像站-mirrors" aria-hidden="true">#</a> 镜像站（mirrors）</h4>
<p><strong>可以理解为软件包放在网络上。</strong></p>
<p>我们可以自己访问 <a href="https://www.debian.org/mirror/list" target="_blank" rel="noopener noreferrer">debian 系的镜象列表<ExternalLinkIcon/></a> 查看，这里面其实对应的就是我们 <code>/etc/apt/sources.list</code>。</p>
<p><strong>镜像站一般也不只提供一个发行版的镜像。</strong></p>
<p>以 <a href="https://mirror.tuna.tsinghua.edu.cn/" target="_blank" rel="noopener noreferrer">清华镜像站<ExternalLinkIcon/></a> 为例：</p>
<ul>
<li>有好多发行版</li>
<li>点击发行版或软件包后面问号</li>
<li>可以获得 <code>sources.list</code> 的相关清华源配置代码</li>
</ul>
<h3 id="linuxlogo" tabindex="-1"><a class="header-anchor" href="#linuxlogo" aria-hidden="true">#</a> Linuxlogo</h3>
<p>下载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> linuxlogo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>展示</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>linuxlogo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>可以看到发行版的logo包括了：</p>
<ul>
<li>内核版本</li>
<li>发行版版本</li>
<li>编译日期</li>
<li>cpu 速度</li>
</ul>
<h3 id="字符画figlet" tabindex="-1"><a class="header-anchor" href="#字符画figlet" aria-hidden="true">#</a> 字符画Figlet</h3>
<p>查找</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> search large character
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>下载</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt install figlet
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>使用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>figlet elaine
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/.vuepress/public/images/Linux/figlet.png" alt="figlet"></p>
<p>查找所有的模板文字</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">find</span> / -name <span class="token string">"*.flf"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="风格文字-toilet" tabindex="-1"><a class="header-anchor" href="#风格文字-toilet" aria-hidden="true">#</a> 风格文字 toilet</h3>
<p>查找（搜索）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> search toilet
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>展示信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> show toilet
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>下载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> toilet
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>使用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>toilet elaine
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查找所有的模板文字</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">find</span> / -name <span class="token string">"*.tlf"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="蒸汽汽车-sl" tabindex="-1"><a class="header-anchor" href="#蒸汽汽车-sl" aria-hidden="true">#</a> 蒸汽汽车 sl</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> sl
sl
sl -l
sl -F
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>SL</code> 代表 <code>Steam Locomotive</code>，这个命令和 ls 很像，这个命令就是在 ls 打错的情况下提提神：😓</p>
<ul>
<li><code>-l</code> 选项:会出现一个小火车</li>
<li><code>-F</code> 选项:会让火车越飞越高，要注意是大写F</li>
<li><code>-e</code> 选项:允许中途被 ctrl+c 打断</li>
</ul>
<h3 id="黑客帝国-cmatrix" tabindex="-1"><a class="header-anchor" href="#黑客帝国-cmatrix" aria-hidden="true">#</a> 黑客帝国 cmatrix</h3>
<p>下载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> cmatrix
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li><code>-b</code>: 部分加粗头部变色 bold</li>
<li><code>-B</code>: 全部加粗头部变色 Bold</li>
<li><code>-o</code>: 老式的 old school</li>
<li><code>-s</code>: 屏保模式 Screensaver</li>
<li><code>-u</code>: 我们可以设置中间 0-9 的间隔时间 ⏲
<ul>
<li>0 为无间隔非常快</li>
<li>9 为比较慢</li>
</ul>
</li>
<li><code>-C</code>: 后面加上想要的颜色 (Color) 模式
<ul>
<li>目前支持红绿蓝青品黄黑白</li>
</ul>
</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cmatrix -b
cmatrix -u <span class="token number">9</span>
cmatrix -C blue
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="满屏乱码-bb" tabindex="-1"><a class="header-anchor" href="#满屏乱码-bb" aria-hidden="true">#</a> 满屏乱码 bb</h3>
<p>下载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> bb
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>使用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>bb
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="装酷屏幕-hollywood" tabindex="-1"><a class="header-anchor" href="#装酷屏幕-hollywood" aria-hidden="true">#</a> 装酷屏幕 hollywood</h3>
<p>显示和搜索</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> show hollywood
<span class="token function">apt</span> search hollywood
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>更新源信息及下载 hollywood</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update	<span class="token comment">#更新源信息</span>
<span class="token function">apt</span> show hollywood
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> hollywood
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>使用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>hollywood
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="aptitude" tabindex="-1"><a class="header-anchor" href="#aptitude" aria-hidden="true">#</a> aptitude</h3>
<p>软件包工具 apt</p>
<p>软件包哦不断能下载，也能升级，还能删除</p>
<p>专门管理软件包的 aptitude</p>
<h3 id="牛说-cowsay" tabindex="-1"><a class="header-anchor" href="#牛说-cowsay" aria-hidden="true">#</a> 牛说 cowsay</h3>
<p>下载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> cowsay
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>使用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cowsay johan
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li><code>-b</code> 极简主义 Borg Mode</li>
<li><code>-d</code> 死亡状态 dead</li>
<li><code>-g</code> 贪婪金钱 greedy</li>
<li><code>-p</code> 偏执狂 paranoia</li>
<li><code>-s</code> 石化 stone</li>
<li><code>-w</code> 紧张睁大眼 wired</li>
<li><code>-t</code> 闭眼的</li>
<li><code>-e</code> 设置眼睛 eye 字符 后面眼睛字符</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cowsay -p johan
cowsay -s johan
cowsay -e *- johan
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>除了 cowsay 之外，cowthink 也可以使用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cowthink -p joahan
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="管道-pipe" tabindex="-1"><a class="header-anchor" href="#管道-pipe" aria-hidden="true">#</a> 管道 pipe</h3>
<p>pipe 原理</p>
<ul>
<li>中间的那条竖线 | （在键盘回车上面）, 就是 pipe</li>
<li>pipe, 意思是管道</li>
<li>原来 figlet &quot;oeasy&quot;命令执行之后进行输出</li>
<li>输出流，直接流到屏幕 (stdout) 上</li>
<li>现在给他加了一个管道|</li>
<li>figlet 不直接输出到屏幕了</li>
<li>figlet 把输出结果流到了 cowsay 指令中</li>
<li>cowsay 接收到了流过来的 figlet 的结果做为参数</li>
<li>cowsay 的输出结果最终流到了屏幕 (stdout) 上</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>toilet  --gay oeasy <span class="token operator">|</span> cowthink -n
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>我对管道的理解：就是下一步</strong></p>
<p>后续就不用学了</p>
</template>
