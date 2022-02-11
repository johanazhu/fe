<template><h1 id="实战-李瓶儿博客开发" tabindex="-1"><a class="header-anchor" href="#实战-李瓶儿博客开发" aria-hidden="true">#</a> 实战：李瓶儿博客开发</h1>
<p><img src="https://i.loli.net/2021/06/03/TzJV3jixZlL4NdW.png" alt="TIM截图20200123173701"></p>
<h3 id="http-请求概述" tabindex="-1"><a class="header-anchor" href="#http-请求概述" aria-hidden="true">#</a> http 请求概述</h3>
<p>从输入url到页面显示中间发生了什么</p>
<ul>
<li>
<p>DNS 解析，建立TCP连接，发送http请求</p>
</li>
<li>
<p>server 接收到 http 请求，处理，并返回</p>
</li>
<li>
<p>客户端接收到返回数据，处理数据（如渲染页面，执行js）</p>
</li>
</ul>
<p>nodejs 处理 http 请求</p>
<ul>
<li>get 请求和 querystring</li>
<li>post请求和postdata</li>
<li>路由</li>
</ul>
<p><img src="https://i.loli.net/2021/06/03/WJGHqvZMAtyapSf.png" alt="TIM截图20200123223412"></p>
<h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> MySQL</h3>
<ul>
<li>mysql介紹、安裝和使用</li>
<li>nodejs连接mysql</li>
<li>API连接mysql</li>
</ul>
<p>为什么使用mysql而不是mogondb</p>
<ul>
<li>mysql是企业内最常见的存储工具，一般都有专人运维</li>
<li>mysql也是社区内最常用的存储工具，有问题可以随时可查</li>
<li>另：mysql本身是一个复杂的数据库软件，本课只讲基本使用</li>
</ul>
<h4 id="mysql介绍" tabindex="-1"><a class="header-anchor" href="#mysql介绍" aria-hidden="true">#</a> mysql介绍</h4>
<ul>
<li>web server 中最流行的关系型数据库</li>
<li>官网可免费下载，用于学习</li>
<li>轻量级，易学易用</li>
</ul>
<p>mysql workbench 可视化数据库</p>
<p>mysql命令</p>
<p>show databases 显示所有的数据库表</p>
<h3 id="mysql安装步骤" tabindex="-1"><a class="header-anchor" href="#mysql安装步骤" aria-hidden="true">#</a> mysql安装步骤</h3>
<p>https://zhuanlan.zhihu.com/p/37152572</p>
<h3 id="操作数据库" tabindex="-1"><a class="header-anchor" href="#操作数据库" aria-hidden="true">#</a> 操作数据库</h3>
<ul>
<li>
<h5 id="建库" tabindex="-1"><a class="header-anchor" href="#建库" aria-hidden="true">#</a> 建库</h5>
</li>
<li>
<h5 id="建表" tabindex="-1"><a class="header-anchor" href="#建表" aria-hidden="true">#</a> 建表</h5>
</li>
<li>
<h5 id="表操作" tabindex="-1"><a class="header-anchor" href="#表操作" aria-hidden="true">#</a> 表操作</h5>
</li>
</ul>
<p>操作表</p>
<p><strong>增、删、改、查</strong></p>
<p>使用sql语句（入门简单，一学就会）</p>
<p>增</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>insert into users(username, `password`, realname) values('lisi', '123', '李四')
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查</p>
<p>查users表所有信息</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from users;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查users表中其中id和username的信息</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select id, username from users;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查符合条件的项 where</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from users where username='zhangsan'
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查符合条件的项多个条件 <code>and</code> 和 <code>or</code></p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from users where username='zhangsan' and realname='111'
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>模糊查询 <code>like</code></p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from users where username like '%zhang%'
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>查 排序 <code>order by id</code> 默认正序，如果倒序 在id后加 desc <code>order by id desc</code></p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from users where username like '%zhang%' order by id desc;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>ps：一般不用 * ，耗性能</p>
<p>改</p>
<p>更新 id为3的realname为张三</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>update users set realname='张三' where id='3'
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>删</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>delete from users where realname='李四'
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>但一般来说不用delete，二是在users表中加一个状态，通过状态来判断他是否被删除。这种技术又称软删除</p>
<p>PS:如果你的更新和删除出现 error：1175处于安全模式，先使用以下代码解除安全模式</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SET SQL_SAFE_UPDATES=0;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="登录" tabindex="-1"><a class="header-anchor" href="#登录" aria-hidden="true">#</a> 登录</h3>
<ul>
<li>cookie 和 session</li>
<li>session 写入 redis</li>
<li>开发登录功能，和前端联调（用到 nginx 反向代理）</li>
</ul>
<h4 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> cookie</h4>
<ul>
<li>什么是cookie</li>
<li>javascript 操作 cookie，浏览器中查找 cookie</li>
<li>server 端操作 cookie，实现登录验证</li>
</ul>
<p>什么是cookie？</p>
<ul>
<li>存储在浏览器中的一段字符串（最大4KB）</li>
<li>跨域不共享</li>
<li>格式如 k1=v1；k2=v2；k3=v3；因此可以存储结构化数据</li>
<li>特点一：每次发送http请求，会将请求域的 cookie 一起发送给 server</li>
<li>特点二：server 可以修改 cookie 并返回给浏览器</li>
<li>特点三：浏览器中也可以通过 javascript 修改 cookie （有限制）</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> res<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'Set-Cookie'</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">username=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>data<span class="token punctuation">.</span>username<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">; path=/; httpOnly; expires=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">getCookieExpires</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>path：根域名下cookie共享</p>
<p>httpOnly：只能服务器修改，浏览器不能修改</p>
<p>expires：设置过期时间</p>
<h4 id="session" tabindex="-1"><a class="header-anchor" href="#session" aria-hidden="true">#</a> session</h4>
<p>cookie的缺点，会暴露username，很危险，不安全</p>
<p>cookie可以存储userid，server端对应username</p>
<p>cookie 放不重要的数据，放userid（一个标识）对应server端的username</p>
<p>就能做到数据的保密</p>
<p>解决方案：session，即 server 端存储用户信息</p>
<h4 id="session造成的问题" tabindex="-1"><a class="header-anchor" href="#session造成的问题" aria-hidden="true">#</a> session造成的问题</h4>
<p>目前session直接是js变量，放在 nodejs 进程内存中</p>
<p>第一，进程内存有限，访问量过大，内存暴增怎么办？</p>
<p>第二，正式线上运行是多线程，进程之间内存无法共享</p>
<p><img src="https://i.loli.net/2021/06/03/6S8tiBYEocybL4w.png" alt="TIM截图20200206165902"></p>
<p>系统内存之间有多个线程，线程之间不共享内存</p>
<h4 id="解决方案-redis" tabindex="-1"><a class="header-anchor" href="#解决方案-redis" aria-hidden="true">#</a> 解决方案 redis</h4>
<ul>
<li>web server 最常用的缓存数据库，数据库放在内存中</li>
<li>相比于 mysql，访问速度快（内存和硬盘不是一个数量级的）</li>
<li>但是成本更高，可存储的数量更小（内存硬伤）</li>
</ul>
<p>如果解决</p>
<ul>
<li>将 web server 和 redis 拆分为两个独立的服务</li>
<li>双方都是独立的，都是可扩展的（例如都扩展成集群）</li>
<li>（包括mysql，也是一个单独的服务，可扩展）</li>
</ul>
<p><img src="https://i.loli.net/2021/06/03/OojsGEuLMgWACZJ.png" alt="TIM截图20200206170732"></p>
<p>登录等数据放在redis，数据有关的放在mysql，都是相对独立的服务</p>
<p>数据分离，可以扩展</p>
<h4 id="为什么session适合用redis" tabindex="-1"><a class="header-anchor" href="#为什么session适合用redis" aria-hidden="true">#</a> 为什么session适合用redis？</h4>
<ul>
<li>session 访问频繁，对性能要求高（redis内存数据库，速度快）</li>
<li>session 可不考虑断电丢失数据的问题（内存的硬伤）</li>
<li>session 数据量不会太大（内存小，相比mysql中的数据小的多）</li>
</ul>
<h4 id="安装redis" tabindex="-1"><a class="header-anchor" href="#安装redis" aria-hidden="true">#</a> 安装redis</h4>
<p>https://www.runoob.com/redis/redis-install.html</p>
<p>启动redis</p>
<p><code>redis-server</code> ,要一直连接状态（服务在线）</p>
<p>在命令行中敲 <code>redis-cli</code>，进入redis操作中</p>
<h4 id="常见的redis操作" tabindex="-1"><a class="header-anchor" href="#常见的redis操作" aria-hidden="true">#</a> 常见的redis操作</h4>
<table>
<thead>
<tr>
<th>命令</th>
<th>解释</th>
<th>例子</th>
</tr>
</thead>
<tbody>
<tr>
<td>set key value</td>
<td>设置key</td>
<td>set myname hanbo</td>
</tr>
<tr>
<td>get key</td>
<td>得到key</td>
<td>get myname</td>
</tr>
<tr>
<td>del key</td>
<td>删除key</td>
<td>del myname</td>
</tr>
<tr>
<td>keys *</td>
<td>显示所有的key</td>
<td>keys *</td>
</tr>
</tbody>
</table>
<p>为何要用redis？不用redis会出现什么问题？</p>
<p>redis适合什么场景？mysql适合什么场景？</p>
<p>要保存状态机，如果你要一直保存登录状态，就要从内存中读取数据，而不是去请求数据库</p>
<p>请求数据库需要花时间，</p>
<p>redis适合登录 状态这种情况</p>
<h4 id="与前端联调" tabindex="-1"><a class="header-anchor" href="#与前端联调" aria-hidden="true">#</a> 与前端联调</h4>
<ul>
<li>登录功能依赖 cookie ，必须用浏览器来联调</li>
<li>cookie 跨域不共享，前端和 server 端必须同域</li>
<li>需要用到 nginx 做代理，让前后端同域</li>
</ul>
<p>使用nginx 反向代理请求</p>
<h4 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h4>
<ul>
<li>高性能的 web 服务器，开源免费</li>
<li>一般用于做静态服务、负载均衡</li>
<li>反向代理</li>
</ul>
<p><img src="https://i.loli.net/2021/06/03/qoZFE1t8fvy6rKD.png" alt="TIM截图20200207152320"></p>
<h2 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h2>
<ul>
<li>系统没有日志，就等于人没有眼睛——抓瞎</li>
<li>第一，访问日志 access log （server 端最重要的日志）</li>
<li>第二，自定义日志（包括自定义事件、错误记录等）</li>
</ul>
<h4 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h4>
<ul>
<li>nodejs 文件操作，nodejs stream</li>
<li>日志功能开发和使用</li>
<li>日志文件拆分，日志内容分析</li>
</ul>
<h4 id="nodejs文件操作" tabindex="-1"><a class="header-anchor" href="#nodejs文件操作" aria-hidden="true">#</a> nodejs文件操作</h4>
<ul>
<li>日志要存放到文件中</li>
<li>为何不存储到 mysql 中？</li>
<li>为何不存储到 redis 中？</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> fileName <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'data.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 读取文件内容</span>
<span class="token comment">// fs.readFile(fileName, (err, data) => {</span>
<span class="token comment">//   if (err) {</span>
<span class="token comment">//     console.log(err)</span>
<span class="token comment">//     return;</span>
<span class="token comment">//   }</span>
<span class="token comment">//   console.log(data.toString())</span>
<span class="token comment">// })</span>

<span class="token comment">// 写入文件内容</span>
<span class="token comment">// const content = '这是新写入的内容\n';</span>
<span class="token comment">// const opt = {</span>
<span class="token comment">//   flag: 'a'   // 追加写入。覆盖用'w'</span>
<span class="token comment">// }</span>
<span class="token comment">// fs.writeFile(fileName, content, opt, (err) => {</span>
<span class="token comment">//   if (err) {</span>
<span class="token comment">//     console.log(err)</span>
<span class="token comment">//   }</span>
<span class="token comment">// })</span>

<span class="token comment">// 判断文件是否存在</span>
fs<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">exist</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'exist'</span><span class="token punctuation">,</span> exist<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="io操作的性能瓶颈" tabindex="-1"><a class="header-anchor" href="#io操作的性能瓶颈" aria-hidden="true">#</a> IO操作的性能瓶颈</h4>
<ul>
<li>IO包括”网络IO”和“文件IO”</li>
<li>相比于 CPU 计算和内存读写， IO 的突出特点就是：慢！</li>
<li>如何在有限的硬件资源下提高 IO 的操作效率？</li>
</ul>
<p><img src="https://i.loli.net/2021/06/03/bl2kaADutYdqGzH.png" alt="TIM截图20200214145700"></p>
<p>stream 流，一点点流过去，一点点读取</p>
<h4 id="日志分析" tabindex="-1"><a class="header-anchor" href="#日志分析" aria-hidden="true">#</a> 日志分析</h4>
<ul>
<li>
<p>如针对 access.log 日志，分析 chrome 的占比</p>
</li>
<li>
<p>日志是按行存储的，一行就是一条日志</p>
</li>
<li>
<p>使用 nodejs 的 readline（基于 stream ，效率高）</p>
</li>
</ul>
<p>readline 可以分析 数据，做数据统计用</p>
<h3 id="安全" tabindex="-1"><a class="header-anchor" href="#安全" aria-hidden="true">#</a> 安全</h3>
<ul>
<li>sql 注入：窃取数据库内容</li>
<li>XSS 攻击：窃取前端的 cookie 内容</li>
<li>密码加密：保障用户信息安全（重要！）加盐</li>
</ul>
<h4 id="sql-注入" tabindex="-1"><a class="header-anchor" href="#sql-注入" aria-hidden="true">#</a> sql 注入</h4>
<ul>
<li>最原始、最简单的攻击，从有了 web2.0 就有了 sql 注入攻击</li>
<li>攻击方式：输入一个 sql 片段，最终拼接成一段攻击代码</li>
<li>预防措施：使用 mysql 的 escape 函数处理输入内容即可</li>
</ul>
<h4 id="xss-攻击" tabindex="-1"><a class="header-anchor" href="#xss-攻击" aria-hidden="true">#</a> XSS 攻击</h4>
<ul>
<li>前端最熟悉的攻击方式， 方式 server 端更应该掌握</li>
<li>攻击方式：在页面展示内容中掺杂 js 代码，以获得网页信息</li>
<li>预防措施： 转换生成 js 的特殊字符</li>
</ul>
<h4 id="密码加密" tabindex="-1"><a class="header-anchor" href="#密码加密" aria-hidden="true">#</a> 密码加密</h4>
<ul>
<li>万一数据库被用户攻破，最不应该泄露的就是用户信息</li>
<li>攻击方式：获取用户名和密码，再去尝试登录其他系统</li>
<li>预防措施：将密码加密，即便拿到密码也不知道明文</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结：</h3>
<h4 id="功能模块" tabindex="-1"><a class="header-anchor" href="#功能模块" aria-hidden="true">#</a> 功能模块</h4>
<ul>
<li>处理 http 接口</li>
<li>连接数据库</li>
<li>实现登录</li>
<li>安全</li>
<li>日志</li>
<li>上线</li>
</ul>
<h4 id="核心知识" tabindex="-1"><a class="header-anchor" href="#核心知识" aria-hidden="true">#</a> 核心知识</h4>
<ul>
<li>http，nodejs 处理 http、处理路由、mysql</li>
<li>cookie，session，redis，nginx做反向代理</li>
<li>sql注入，xss 攻击，加密</li>
<li>日志，stream，contrab，readline</li>
<li>线上环境的知识</li>
</ul>
<h2 id="使用express来开发web-server" tabindex="-1"><a class="header-anchor" href="#使用express来开发web-server" aria-hidden="true">#</a> 使用express来开发web server</h2>
<p>express.json() 	解析post请求</p>
<h4 id="中间件机制" tabindex="-1"><a class="header-anchor" href="#中间件机制" aria-hidden="true">#</a> 中间件机制</h4>
<ul>
<li>有很多 app.use</li>
<li>代码中的 next 参数是什么？</li>
<li>带着这些疑问，先看一段代码演示</li>
</ul>
<h4 id="express-总结" tabindex="-1"><a class="header-anchor" href="#express-总结" aria-hidden="true">#</a> express 总结</h4>
<h4 id="中间件原理介绍" tabindex="-1"><a class="header-anchor" href="#中间件原理介绍" aria-hidden="true">#</a> 中间件原理介绍</h4>
<h5 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h5>
<ul>
<li>app.use 用来注册中间件，先收集起</li>
<li>遇到 http 请求，根据 path 和 method 判断触发哪些</li>
<li>实现 next 机制，即上一个通过 next 触发下一个</li>
</ul>
<h3 id="使用-koa2" tabindex="-1"><a class="header-anchor" href="#使用-koa2" aria-hidden="true">#</a> 使用 Koa2</h3>
<ul>
<li>express 中间件是异步回调，koa2原生支持 async/await</li>
<li>新开发框架和系统，都开始基于 koa2，例如 egg.js</li>
<li>express 虽然未过时，但是 koa2 肯定是未来趋势</li>
</ul>
<h4 id="目录-1" tabindex="-1"><a class="header-anchor" href="#目录-1" aria-hidden="true">#</a> 目录</h4>
<ul>
<li>async/await 语法介绍，安装和使用 koa2</li>
<li>开发接口，链接数据库，实现登录，日志记录</li>
<li>分析 koa2 中间件原理</li>
</ul>
<h4 id="async-await要点" tabindex="-1"><a class="header-anchor" href="#async-await要点" aria-hidden="true">#</a> async await要点：</h4>
<ol>
<li>await 后面可以追加 promise 对象，获取 resolve 的值</li>
<li>await 必须包裹在 async 函数里面</li>
<li>async 函数执行返回的也是一个 promise 对象</li>
<li>try-catch 截获 promise 中 reject 的值</li>
</ol>
<h4 id="中间件机制-1" tabindex="-1"><a class="header-anchor" href="#中间件机制-1" aria-hidden="true">#</a> 中间件机制</h4>
<ul>
<li>有很多 app.use</li>
<li>代码中的 next 参数是什么？</li>
</ul>
<p>app.use 和 express一致，使用中间件</p>
<p>洋葱模型</p>
<h4 id="实现登录" tabindex="-1"><a class="header-anchor" href="#实现登录" aria-hidden="true">#</a> 实现登录</h4>
<ul>
<li>和 express 类似</li>
<li>基于 koa-generic-session 和 koa-redis</li>
</ul>
<h4 id="线上环境" tabindex="-1"><a class="header-anchor" href="#线上环境" aria-hidden="true">#</a> 线上环境</h4>
<ul>
<li>服务器稳定性</li>
<li>重温利用服务器硬件资源，以便提高性能</li>
<li>线上日志记录</li>
</ul>
<h4 id="pm2" tabindex="-1"><a class="header-anchor" href="#pm2" aria-hidden="true">#</a> PM2</h4>
<ul>
<li>进程守护，系统奔溃自动重启</li>
<li>启动多进程，充分利用CPU和内存</li>
<li>自带日志记录功能</li>
</ul>
<h4 id="pm2介绍" tabindex="-1"><a class="header-anchor" href="#pm2介绍" aria-hidden="true">#</a> PM2介绍</h4>
<ul>
<li>
<p>下载安装</p>
<ul>
<li><code>npm install pm2 -g</code></li>
<li><code>pm2 --version</code></li>
</ul>
</li>
<li>
<p>基本使用</p>
</li>
<li>
<p>常用命令</p>
<p><code>pm2 start [app.js]</code> 启动</p>
<p><code>pm2 restart [app.js]</code> 重启</p>
<p><code>pm2 stop [app.js]</code> 停止</p>
<p><code>pm2 list</code> 查看启动列表</p>
<p><code>pm2 info &lt;AppName&gt;/&lt;id&gt; </code>查看基本信息</p>
<p><code>pm2 log &lt;AppName&gt;/&lt;id&gt;</code> 查看日志打印</p>
<p><code>pm2 monit &lt;AppName&gt;/&lt;id&gt; </code>监控这个进程的CPU和内存信息</p>
</li>
</ul>
<h4 id="pm2进程守护" tabindex="-1"><a class="header-anchor" href="#pm2进程守护" aria-hidden="true">#</a> PM2进程守护</h4>
<h3 id="课程总结" tabindex="-1"><a class="header-anchor" href="#课程总结" aria-hidden="true">#</a> 课程总结</h3>
<p><img src="https://i.loli.net/2021/06/03/lMGSgBwmDiUzrTP.png" alt="课程总结"></p>
</template>
