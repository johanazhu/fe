<template><h1 id="防火墙知一二" tabindex="-1"><a class="header-anchor" href="#防火墙知一二" aria-hidden="true">#</a> 防火墙知一二</h1>
<p>写在前言：本人Linux操作系统为 CentOS7</p>
<p><strong>作用：设置防火墙能避免来自网络的攻击</strong></p>
<h4 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令：</h4>
<p>查看状态</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --state
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>开启防火墙</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start firewalld.service
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>关闭防火墙</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl stop firewalld.service
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>重载防火墙</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --reload 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>开机启动防火墙</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> firewalld.service
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>禁止开机启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl disable firewalld.service
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>命令行打开端口（以80端口为例）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --zone<span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp --permanent <span class="token comment"># 开放端口命令</span>
systemctl restart firewalld.service <span class="token comment"># 重启防火墙</span>
<span class="token comment"># 命令含义：</span>
--zone <span class="token comment"># 作用域</span>
--add-port<span class="token operator">=</span><span class="token number">80</span>/tcp <span class="token comment"># 添加端口，格式为：端口/通讯协议</span>
--permanent <span class="token comment"># 永久生效，没有此参数重启后失效</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>查看开发的端口</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --list-ports
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>进入 /etc/sysconfig 中，编辑 iptables-config，写入规则</p>
<p>写入规则</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>-A INPUT -m state –state NEW -m tcp -p tcp –dport <span class="token number">8080</span> -j ACCEPT <span class="token comment">#允许8080端口通过防火墙</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查看规则</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>iptables --list -n
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查看防火墙版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --version
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查看防火墙帮助</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --help
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
