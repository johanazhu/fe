<template><h1 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h1>
<p>研发必须知道的服务器Linux知识</p>
<h3 id="linux是什么" tabindex="-1"><a class="header-anchor" href="#linux是什么" aria-hidden="true">#</a> Linux是什么</h3>
<p>开源，服务器</p>
<h3 id="linux能做什么" tabindex="-1"><a class="header-anchor" href="#linux能做什么" aria-hidden="true">#</a> Linux能做什么</h3>
<p>企业服务器</p>
<p>嵌入式开发（安卓手机，路由器，机顶盒）</p>
<h2 id="linux命令" tabindex="-1"><a class="header-anchor" href="#linux命令" aria-hidden="true">#</a> Linux命令</h2>
<h4 id="服务器硬件资源信息" tabindex="-1"><a class="header-anchor" href="#服务器硬件资源信息" aria-hidden="true">#</a> 服务器硬件资源信息</h4>
<ul>
<li>内存：free -m</li>
<li>硬盘：df -h</li>
<li>负债：w/top</li>
<li>cpu个数和核数</li>
</ul>
<h4 id="文件操作命令" tabindex="-1"><a class="header-anchor" href="#文件操作命令" aria-hidden="true">#</a> 文件操作命令</h4>
<ul>
<li>
<p>Linux文件的目录结构</p>
</li>
<li>
<p>文件基本操作</p>
</li>
<li>
<p>文本编辑神器Vim</p>
</li>
<li>
<p>文件权限 421</p>
</li>
<li>
<p>文件搜索，查找，读取</p>
</li>
<li>
<p>文件压缩与解压</p>
</li>
</ul>
<h5 id="liunx-文件目录结构" tabindex="-1"><a class="header-anchor" href="#liunx-文件目录结构" aria-hidden="true">#</a> Liunx 文件目录结构</h5>
<ul>
<li>根目录 /</li>
<li>家目录 /home</li>
<li>临时目录 /tmp</li>
<li>配置目录 /etc</li>
<li>用户程序目录 /usr</li>
</ul>
<h5 id="文件操作基本命令" tabindex="-1"><a class="header-anchor" href="#文件操作基本命令" aria-hidden="true">#</a> 文件操作基本命令</h5>
<table>
<thead>
<tr>
<th>命令</th>
<th>解释</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>ls</td>
<td>查看目录下的文件</td>
<td></td>
</tr>
<tr>
<td>touch</td>
<td>新建文件</td>
<td></td>
</tr>
<tr>
<td>mkdir</td>
<td>新建文件夹</td>
<td>mkdir -p imooc_dir/test1/test2 层级创建</td>
</tr>
<tr>
<td>cd</td>
<td>进入目录</td>
<td></td>
</tr>
<tr>
<td>rm</td>
<td>删除文件和目录</td>
<td></td>
</tr>
<tr>
<td>cp</td>
<td>复制</td>
<td></td>
</tr>
<tr>
<td>mv</td>
<td>移动</td>
<td></td>
</tr>
<tr>
<td>pwd</td>
<td>显示路径</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>文件搜索，查找，读取</p>
<table>
<thead>
<tr>
<th>命令</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>less</td>
<td>可控分页</td>
</tr>
<tr>
<td>grep</td>
<td>搜索关键字</td>
</tr>
<tr>
<td>find</td>
<td>查找文件</td>
</tr>
<tr>
<td>wc</td>
<td>统计个数</td>
</tr>
<tr>
<td>tail</td>
<td>从文件尾部开始读</td>
</tr>
<tr>
<td>head</td>
<td>从文件头部读</td>
</tr>
<tr>
<td>cat</td>
<td>读取整个文件</td>
</tr>
<tr>
<td>more</td>
<td>分页读取</td>
</tr>
</tbody>
</table>
<p>文件解压缩</p>
<ul>
<li>tar 命令</li>
</ul>
<p>系统用户操作命令</p>
<table>
<thead>
<tr>
<th>命令</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>useradd</td>
<td>添加用户</td>
</tr>
<tr>
<td>adduser</td>
<td>添加用户</td>
</tr>
<tr>
<td>userdel</td>
<td>删除用户</td>
</tr>
<tr>
<td>passwd</td>
<td>设置密码</td>
</tr>
</tbody>
</table>
<h3 id="防火墙" tabindex="-1"><a class="header-anchor" href="#防火墙" aria-hidden="true">#</a> 防火墙</h3>
<ul>
<li>作用：保护服务器安全</li>
<li>设置防火墙规则
<ul>
<li>开放80，22端口</li>
</ul>
</li>
<li>关闭防火墙</li>
</ul>
<h3 id="防火墙设置" tabindex="-1"><a class="header-anchor" href="#防火墙设置" aria-hidden="true">#</a> 防火墙设置</h3>
<ul>
<li>安装：yum install firewalld</li>
<li>启动：service firewalld start</li>
<li>查找状态：service firewalld status</li>
<li>关闭或禁用防火墙：service firewalld stop/disable</li>
</ul>
<h3 id="提权-和-文件-上传下载操作" tabindex="-1"><a class="header-anchor" href="#提权-和-文件-上传下载操作" aria-hidden="true">#</a> 提权 和 文件 上传下载操作</h3>
<ul>
<li>提权： sudo
<ul>
<li>visudo</li>
</ul>
</li>
<li>文件下载
<ul>
<li>wget、curl</li>
</ul>
</li>
<li>文件上传
<ul>
<li>scp（mac）</li>
<li>lrzsz（window）</li>
</ul>
</li>
</ul>
<h2 id="webserver" tabindex="-1"><a class="header-anchor" href="#webserver" aria-hidden="true">#</a> WebServer</h2>
<p>APACHE</p>
<p>NGINX</p>
<h4 id="apache基本操作" tabindex="-1"><a class="header-anchor" href="#apache基本操作" aria-hidden="true">#</a> Apache基本操作</h4>
<table>
<thead>
<tr>
<th>解释</th>
<th>命令</th>
</tr>
</thead>
<tbody>
<tr>
<td>安装</td>
<td>yum install httpd</td>
</tr>
<tr>
<td>启动</td>
<td>service httpd start</td>
</tr>
<tr>
<td>停止</td>
<td>service httpd stop</td>
</tr>
</tbody>
</table>
<p>Linux系统</p>
<p>Linux命令</p>
<p>SSH</p>
<p>WebServer</p>
<p>数据库</p>
<p>缓存</p>
<p>PHP,Python,Java</p>
<p>必备服务</p>
<p>https://mp.weixin.qq.com/s/iiEuNnSeWlHPBiuvVuXklg</p>
<p>https://juejin.cn/post/6844904080972709901</p>
<p>教程：</p>
<p>https://www.bilibili.com/video/av55883609</p>
</template>
