<template><h1 id="linux-常用命令" tabindex="-1"><a class="header-anchor" href="#linux-常用命令" aria-hidden="true">#</a> Linux 常用命令</h1>
<p>目录结构</p>
<table>
<thead>
<tr>
<th>目录名</th>
<th>意思</th>
<th>注解</th>
</tr>
</thead>
<tbody>
<tr>
<td>/bin</td>
<td>存放二进制可执行文件（ls、cat、mkdir等），常用命令一般都在这里</td>
<td></td>
</tr>
<tr>
<td>/etc</td>
<td>存放系统管理和配置文件</td>
<td></td>
</tr>
<tr>
<td>/home</td>
<td>存放所有用户文件的根目录，是用户主目录的基点，比如johan的主目录是/home/johan，可以用~johan表示</td>
<td></td>
</tr>
<tr>
<td>/usr</td>
<td>用于存放系统的应用程序，比较重要的目录是 /usr/local 本地系统管理员软件安装目录（安装系统级的应用）。这是最庞大的目录，要用到的应用程序和文件几乎都在这个目录</td>
<td></td>
</tr>
<tr>
<td>/opt</td>
<td>额外安装的可选应用程序包所放置的位置。一般情况下，我们可以把安装包放在这里</td>
<td></td>
</tr>
<tr>
<td>/proc</td>
<td>虚拟文件系统目录，是系统内存的映射。可直接访问这个目录来获取系统信息</td>
<td></td>
</tr>
<tr>
<td>/root</td>
<td>超级用户（系统管理员）的主目录</td>
<td></td>
</tr>
<tr>
<td>/sbin</td>
<td>存放二进制可执行文件，只有root才能访问。这里存放是系统管理员使用的系统级别的管理命令和程序。如ifconfig等</td>
<td></td>
</tr>
<tr>
<td>/dev</td>
<td>用于存放设备文件</td>
<td></td>
</tr>
<tr>
<td>/mnt</td>
<td>系统管理员安装临时文件系统的安装点，系统提供这个目录是让用户临时挂载其他的文件系统</td>
<td></td>
</tr>
<tr>
<td>/boot</td>
<td>存放用于系统引导时使用的各种文件</td>
<td></td>
</tr>
<tr>
<td>/lib</td>
<td>存放跟文件系统中的程序运行所需要的共享库及内核模型</td>
<td></td>
</tr>
<tr>
<td>/tmp</td>
<td>用于存放各种临时文件，是公用的临时文件存储点</td>
<td></td>
</tr>
<tr>
<td>/var</td>
<td>用于存放运行时需要改变数据的文件，也是某些大文件的溢出区，比如说各种服务的日志文件（系统启动日志等）</td>
<td></td>
</tr>
<tr>
<td>/lost+found</td>
<td>这个目录平时是空的，系统非正常关机而留下“无家可归”的文件</td>
<td></td>
</tr>
</tbody>
</table>
<p>查看linux的版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">uname</span> -r
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>重启linux</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">reboot</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/28674639" target="_blank" rel="noopener noreferrer">写代码怎能不会这些 Linux 命令<ExternalLinkIcon/></a></li>
<li><a href="https://www.thegeekstuff.com/2010/11/50-linux-commands/" target="_blank" rel="noopener noreferrer">50-linux-commands<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/22654634" target="_blank" rel="noopener noreferrer">linux学习资源整理<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903971815948296" target="_blank" rel="noopener noreferrer">Linux基础命令总结<ExternalLinkIcon/></a></li>
</ul>
</template>
