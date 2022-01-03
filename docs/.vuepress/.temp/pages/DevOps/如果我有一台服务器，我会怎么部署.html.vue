<template><h1 id="如果我有一台服务器-我会怎么部署" tabindex="-1"><a class="header-anchor" href="#如果我有一台服务器-我会怎么部署" aria-hidden="true">#</a> 如果我有一台服务器，我会怎么部署</h1>
<p>linux常规命令</p>
<table>
<thead>
<tr>
<th>命令名</th>
<th>作用</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>df -h</td>
<td>面板使用情况</td>
<td></td>
</tr>
<tr>
<td>fdisk -l</td>
<td>数据盘</td>
<td></td>
</tr>
<tr>
<td>adduser hanbo_manager</td>
<td>添加用户</td>
<td></td>
</tr>
<tr>
<td>gpasswd -a hanbo_manager sudo</td>
<td>给 hanbo_manager sudo的权限</td>
<td></td>
</tr>
<tr>
<td>ps -ef | grep visudo</td>
<td>查到visudo的进程号</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>命令行</th>
<th>作用</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>useradd -m 用户名</td>
<td>添加用户</td>
<td></td>
</tr>
<tr>
<td>passwd 用户名</td>
<td>设置密码</td>
<td></td>
</tr>
<tr>
<td>userdel -r 用户名</td>
<td>删除用户</td>
<td></td>
</tr>
<tr>
<td>cat /etc/passwd</td>
<td>查看所有用户</td>
<td></td>
</tr>
<tr>
<td>cat /etc/group</td>
<td>查看用户组</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>centos7 操作ssh/sshd服务命令</p>
<table>
<thead>
<tr>
<th>命令行</th>
<th>作用</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>systemctl status sshd.service</td>
<td>查看状态</td>
<td></td>
</tr>
<tr>
<td>systemctl start sshd.service</td>
<td>启动服务</td>
<td></td>
</tr>
<tr>
<td>systemctl restart sshd.service</td>
<td>重启服务</td>
<td></td>
</tr>
<tr>
<td>systemctl enable sshd.service</td>
<td>开机自启</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>登录远程服务器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> -p <span class="token number">39999</span> elaine@47.102.152.19
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>修改环境变量的方法</p>
<p>https://blog.csdn.net/u011630575/article/details/49839893</p>
<p>方法二：</p>
<p>在用户目录下的.bash_profile文件中增加变量（对单一用户有效（永久的））</p>
<p>用vim修改完 .bash_profile 文件后</p>
<p>使用 source .bash_profile 就能让修改后的文件生效</p>
<p>如何在服务器上做配置，先登录 liunx 服务器，</p>
<p>给自己设立一个超级管理员johan</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>adduser johan
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如何查看用户信息呢？</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /etc/passwd
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>但是我们没有设置超级管理员 johan 的密码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">passwd</span> johan
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>给他权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> visudo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在 <code>Allow root to run any commands anywhere</code> 处添加</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>johan   ALL=(ALL)       ALL
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后我们需要给我们的服务添加无密码登录服务</p>
<h3 id="ssh密钥认证免密登录" tabindex="-1"><a class="header-anchor" href="#ssh密钥认证免密登录" aria-hidden="true">#</a> ssh密钥认证免密登录</h3>
<p>先给他设置个代理人 elaine，不要通过 root 来操作，而是给 代理人（elaine）超级管理员权限，右他来帮忙做操作。</p>
<p>接着登录 elaine 账号，生成公钥私钥</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ssh-keygen -t rsa -b <span class="token number">4096</span> -C <span class="token string">"t511069160@qq.com"</span>
<span class="token comment"># 结果</span>
<span class="token comment"># The key fingerprint is:                                               </span>
<span class="token comment"># SHA256:WA1p8jpMzSG/TKsZc5QlFbQIHfEh34bsCkblwHBKf9c t511069160@qq.com  </span>
<span class="token comment"># The key's randomart image is:                                         </span>
<span class="token comment"># +---[RSA 4096]----+                                                   </span>
<span class="token comment"># |    oo+.**=.     |                                                   </span>
<span class="token comment"># |   . ++=*O.*     |                                                   </span>
<span class="token comment"># |    . oO==O E    |                                                   </span>
<span class="token comment"># |     ..+Oo .     |                                                   </span>
<span class="token comment"># |     o+=So.      |                                                   </span>
<span class="token comment"># |     .*.=.       |                                                   </span>
<span class="token comment"># |       B.        |                                                   </span>
<span class="token comment"># |      o          |                                                   </span>
<span class="token comment"># |                 |                                                   </span>
<span class="token comment"># +----[SHA256]-----+                                                   </span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>生成后开启代理</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token builtin class-name">eval</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>ssh-agent -s<span class="token variable">)</span></span>"</span>
<span class="token comment"># Agent pid 11429</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>将钥匙添加至 id_rsa 中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ssh-add ~/.ssh/id_rsa
<span class="token comment"># Identity added: /home/elaine/.ssh/id_rsa (/home/elaine/.ssh/id_rsa)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>进入 .ssh 文件，编辑生成 authorized_keys 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vi</span> authorized_keys
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后将本地的公钥拿来</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># window 在C:\Users\Administrator\.ssh 文件中</span>
.ssh <span class="token function">cat</span> id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCmjUTPsPm7VAyAFynI8KDh/VUt1vD6/LrjAErSWcRUxDRDfDcNS8G5T+kU+89erxXSV4fulCpGBCa0cnzBvz4IdhMaASBE60DdMXzUE7ITCtKVWr2VHJpmqXnA75VXL4wS9e90z2+tShB++BcPlYGEfTugqiMfqpRJXn0S9QlAQ9GWGUnBKEiS3s58LRAM0m/GfQ9ad3xlf7EeMVCdXKy6+BKQx3FnYEA44hTiwxKZPh/hzb/K2zUHygVb04D8/NDw6270FVHNfwcmRWh+wMqJy5hCtKEKc9LoEtgo2CgOdyg7Z9Mtc/FtN8CKIT5UCU0DgIM5t9DEi8Ll5lbA9D5L t511069160@qq.com

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>复制本地公钥，拷贝到authorized_keys 中</p>
<p>接着修改 authorized_keys 的权限，<code>chmod 600 authorized_keys</code> ，并重启服务 <code>sudo systemctl restart sshd.service</code> （centos7 重启服务）。重开一个终端，看看是否需要登录</p>
<h3 id="修改默认端口-提高安全性" tabindex="-1"><a class="header-anchor" href="#修改默认端口-提高安全性" aria-hidden="true">#</a> 修改默认端口（提高安全性）</h3>
<p>默认端口是22，提高安全性，肯定不能用默认的端口，那么就需要在配置里修改</p>
<p>登录elaine超级管理员账号，</p>
<p>sudo vi /etc/ssh/sshd_config</p>
<p>修改端口号</p>
<p>port 22</p>
<p>修改为</p>
<p>port 39999</p>
<p>拉倒最下面</p>
<p>修改以下配置</p>
<p><img src="@source/.vuepress/public/images/Deploy/修改安全配置.png" alt="1592143197351"></p>
<p>PS： 需要注意的是，你如果买的是阿里云的服务器，需要在控制面板中的安全组里添加入方向端口</p>
<p><img src="@source/.vuepress/public/images/Deploy/阿里云网关配置.png" alt="1592220240860"></p>
<p>配置 iptable 防火墙</p>
<p>这集先不看</p>
<h3 id="安装所需环境" tabindex="-1"><a class="header-anchor" href="#安装所需环境" aria-hidden="true">#</a> 安装所需环境</h3>
<p>先更新yum</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum update <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> yum upgrade
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果你在ubuntu操作系统下，请用apt-get来代替</p>
<p>下载所需要的东西</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token function">vim</span> <span class="token function">git</span> openssl libssl-dev <span class="token function">wget</span> <span class="token function">curl</span> <span class="token function">git</span>
<span class="token function">sudo</span> yum groupinstall <span class="token string">"Development Tools"</span>
<span class="token comment"># 下载 nvm</span>
<span class="token function">curl</span> -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh <span class="token operator">|</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>https://github.com/nvm-sh/nvm</p>
<p>将nvm命令行配置进 环境中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nvm <span class="token function">install</span> v12.18.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="上传代码实现一个小服务" tabindex="-1"><a class="header-anchor" href="#上传代码实现一个小服务" aria-hidden="true">#</a> 上传代码实现一个小服务</h3>
<p>在本地新建一个新的js文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> HomePage <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;!DOCTYPE html>
&lt;html>
  &lt;head>
    &lt;meta charset='utf-8'>
    &lt;title>部署上线测试代码&lt;/title>
    &lt;style type="text/css">
        * { padding: 0; margin: 0; }
        body { padding: 30px 0; text-align: center; font-size: 16px; background-color: #333; }
        h1, h2 { color: #fff; }
        nav { margin-top: 20px; }
        a { color: #ccc; text-decoration: none; }
        a:hover { text-decoration: underline; }
    &lt;/style>
  &lt;/head>
  &lt;body>
    &lt;h1>Hello word&lt;/h1>
    &lt;h2>代码上线我最棒&lt;/h2>
  &lt;/body>
&lt;/html>
</span><span class="token template-punctuation string">`</span></span>


http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span>statusCode <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Content-Type'</span><span class="token punctuation">,</span> <span class="token string">'text/html'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>HomePage<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8001</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Server Running At 8001'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>在服务器端下载lrzsz</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> -y lrzsz
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>通过 lrzsz 上传 本地写好的 node 服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rz
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>上传至 johan 目录的根目录下，因为允许访问的是8001 端口，所以需要到阿里云服务器上配置 出入安全组</p>
<p>设置完后回到服务器上启动 node 服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>node app.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>就能直接访问了</p>
<p>但是为了让我们能在启动服务的同时再才做服务器，需要一个专门管理启动服务的包，那就是 pm2 ，可以理解为管家，我要启动、停止、重启服务，只用告诉它，它会去做</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i pm2 -g
pm2 start app.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>我们已经启动了一个服务了，一个很简单的，只有一个文件的服务，但是如果是5个项目呢？如果5个项目中有前端和后端该怎么做呢？</p>
<p>通过 nginx 代理 ，访问不同的二级域名，nginx 将用户的访问反向代理到 内部服务</p>
<p>图片缺失</p>
<p>也就是说，用户访问 azhubaby.com , nginx 会将请求转发给服务器内部的 8001 的服务，访问 fe.azhubaby.com ，nginx 会将请求转发给服务器内部的 8002 端口的服务，以此类推</p>
<p>而为什么要有反向代理，因为用户只访问80端口，他们不会再后面输入端口号，但是我们是开发者，我们可以释放很多接口，所以反向代理是为了方便用户，nginx 转发用户请求</p>
<p>既然我们知道了整个流程的理论知道，那么就开干，开干之前先买好域名和备案</p>
<h3 id="配置-nginx-实现反向代理" tabindex="-1"><a class="header-anchor" href="#配置-nginx-实现反向代理" aria-hidden="true">#</a> 配置 Nginx 实现反向代理</h3>
<p>先停止服务器中的apache2 或者 apache ，再删除它</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">service</span> apache2 stop
<span class="token function">sudo</span> <span class="token function">service</span> apache stop
update-rc.d -f apache2 remove
<span class="token function">sudo</span> yum remove apache2
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>更新下包列表</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum update
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>下载nginx</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>进入 etc/nginx</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>进入 conf.d 中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> conf.d
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在这里新建配置文件（以后的配置指向这里，一个文件代表一个服务代理）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vi</span> azhubaby-com-8081.conf
<span class="token comment"># 在里面配置</span>
upstream azhubaby <span class="token punctuation">{</span>
   server <span class="token number">127.0</span>.0.1:8081<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

server <span class="token punctuation">{</span>
   listen <span class="token number">80</span><span class="token punctuation">;</span>
   server_name <span class="token number">47.102</span>.152.19<span class="token punctuation">;</span>

   location / <span class="token punctuation">{</span>
        proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
        proxy_set_header X-Forward-Fr <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
        proxy_set_header Host <span class="token variable">$http_host</span><span class="token punctuation">;</span>
        proxy_set_header X-Nginx-Proxt <span class="token boolean">true</span><span class="token punctuation">;</span>

        proxy_pass http://azhubaby<span class="token punctuation">;</span>
        proxy_redirect off<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>检查 nginx 是否配置正确</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> nginx -t
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="服务器配置安装-mongodb" tabindex="-1"><a class="header-anchor" href="#服务器配置安装-mongodb" aria-hidden="true">#</a> 服务器配置安装 MongoDB</h3>
<p>安装（参考官网：https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/）</p>
<p>新建一个文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/yum.repos.d/mongodb-org-4.2.repo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>配置 yum 源</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mongodb-org-4.2<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>MongoDB Repository
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>https://repo.mongodb.org/yum/redhat/<span class="token variable">$releasever</span>/mongodb-org/4.2/x86_64/
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>https://www.mongodb.org/static/pgp/server-4.2.asc
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>安装 MongoDB（社区版）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> -y mongodb-org
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查看版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mongo --version
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>成功</p>
<p>我们现在需要做的是把本地的 mongo 数据导出上传至服务器上，该怎么做呢？</p>
<p>先在本地连接数据库，进入到mongodb的安装目录，启动 <code>mongod.exe</code> 文件，</p>
<p>接着备份数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mongodump -h <span class="token number">127.0</span>.0.1:27017 -d lipingerblog -o lipingerblog-backup
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>但可惜的是，我的数据库是 mysql 的，所以，我们这次部署mysql 的数据库，先导出</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> mysqldump -u root -p lipingerblog <span class="token operator">></span> lipingerblog_bak.sql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>登登，导出成功。</p>
<p>随便记录下如何导入数据库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mysql -u root -p <span class="token number">123456</span> lipingerblog <span class="token operator">&lt;</span> lipingerblog_bak.sql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>现在我们需要做的是，在服务器上安装mysql，并导入数据库，让它跑起来</p>
<p>https://www.jianshu.com/p/224a891932d8</p>
<p>附上安装教程，但是要记住一点，进入mysql后，记得每一行命令之后要加<code>;</code> ，不然它会理解为是一个命令</p>
<p>而且因为我用johan这个账号来下载mysql，所以有必要用 sudo</p>
<p>mysql常用命令</p>
<table>
<thead>
<tr>
<th>命令</th>
<th>意义</th>
<th>注释</th>
</tr>
</thead>
<tbody>
<tr>
<td>mysql -p root -u</td>
<td>连接数据库</td>
<td></td>
</tr>
<tr>
<td>show databases;</td>
<td>查看数据库</td>
<td>注意：<code>;</code> 表示结束的意思</td>
</tr>
<tr>
<td>use lipingerblog；</td>
<td>使用XX数据库</td>
<td></td>
</tr>
<tr>
<td>select database();</td>
<td>查看当前数据库</td>
<td></td>
</tr>
<tr>
<td>show tables;</td>
<td>查看数据库表</td>
<td></td>
</tr>
<tr>
<td>show full columns from user;</td>
<td>查看表中所有字段</td>
<td></td>
</tr>
<tr>
<td>flush privileges;</td>
<td>刷新数据库</td>
<td></td>
</tr>
<tr>
<td>exit;</td>
<td>退出</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>redis 的安装</p>
<p>https://redis.io/download</p>
<p>将redis 文件放入 一个指定的文件里，好做管理</p>
<p>然后将本地代码提交到git仓库，</p>
<p>因为之前在服务器上已经生成ssh，把ids.rsa.pub 上传至github 惭愧</p>
<p>这样你在服务器上就可以拉到github上的代码</p>
</template>
