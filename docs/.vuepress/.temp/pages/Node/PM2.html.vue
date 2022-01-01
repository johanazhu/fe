<template><h1 id="pm2" tabindex="-1"><a class="header-anchor" href="#pm2" aria-hidden="true">#</a> PM2</h1>
<h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2>
<ul>
<li>进程守护，系统奔溃自动重启</li>
<li>启动多进程，充分利用CPU和内存</li>
<li>自带日志记录功能</li>
</ul>
<h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装" aria-hidden="true">#</a> 下载安装</h2>
<ul>
<li><code>npm install pm2 -g</code></li>
<li><code>pm2 --version</code></li>
</ul>
<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2>
<p><code>pm2 start [app.js]</code> 启动</p>
<p><code>pm2 restart [app.js]</code> 重启</p>
<p><code>pm2 stop [app.js]</code> 停止</p>
<p><code>pm2 list</code> 查看启动列表</p>
<p><code>pm2 info &lt;AppName&gt;/&lt;id&gt; </code>查看基本信息</p>
<p><code>pm2 log &lt;AppName&gt;/&lt;id&gt;</code> 查看日志打印</p>
<p><code>pm2 monit &lt;AppName&gt;/&lt;id&gt; </code>监控这个进程的CPU和内存信息</p>
</template>
