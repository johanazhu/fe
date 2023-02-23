import{_ as s,c as e,o as a,d as n}from"./app.590c1fbf.js";const C=JSON.parse('{"title":"Redis","description":"","frontmatter":{},"headers":[{"level":2,"title":"什么是 Redis","slug":"什么是-redis","link":"#什么是-redis","children":[]},{"level":2,"title":"特点","slug":"特点","link":"#特点","children":[]},{"level":2,"title":"应用场景","slug":"应用场景","link":"#应用场景","children":[{"level":3,"title":"如何后台启动 redis","slug":"如何后台启动-redis","link":"#如何后台启动-redis","children":[]}]},{"level":2,"title":"常见命令行","slug":"常见命令行","link":"#常见命令行","children":[]},{"level":2,"title":"实战","slug":"实战","link":"#实战","children":[]}],"relativePath":"BackEnd/Redis.md"}'),l={name:"BackEnd/Redis.md"},i=n(`<h1 id="redis" tabindex="-1">Redis <a class="header-anchor" href="#redis" aria-hidden="true">#</a></h1><h2 id="什么是-redis" tabindex="-1">什么是 Redis <a class="header-anchor" href="#什么是-redis" aria-hidden="true">#</a></h2><p>Redis 是一个开源（BSD 许可）的内存数据结构存储，用作数据库，缓存和消息代理。</p><p>它支持的数据结构：string，list，set，sorted set，hash</p><ul><li>Redis 是由 C 语言写的</li><li>数据模型为 key-value</li></ul><h2 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-hidden="true">#</a></h2><ul><li>速度快，因为数据存在内存中，类似于 HashMap <ul><li>HashMap 的特点是查找和操作的时间复杂度为 O(1)</li></ul></li><li>可持久化</li><li>可用于缓存，消息，按 key 设置过期时间，过期后将自动删除</li></ul><h2 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-hidden="true">#</a></h2><p>目前的场景就是当作缓存用</p><p><code>redis.cli -v</code>：查看 redis 版本</p><p>启动 reids</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">redis-server</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看 reids 是否启动</p><p>重新开个窗口</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">redis-cli</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>以上命令将打开以下终端：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">redis</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">127.0.0.1:</span><span style="color:#F78C6C;">637</span><span style="color:#89DDFF;">9&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>127.0.0.1 是本机 IP ，6379 是 redis 服务端口。现在我们输入 PING 命令。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">redis</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">127.0.0.1:</span><span style="color:#F78C6C;">637</span><span style="color:#89DDFF;">9&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ping</span></span>
<span class="line"><span style="color:#FFCB6B;">PONG</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>退出 redis 终端</p><p>CTRL+C 或者 exit</p><p><img src="https://s2.loli.net/2022/09/26/UzI9sCcKW3ERO1p.png" alt="redis命令"></p><h3 id="如何后台启动-redis" tabindex="-1">如何后台启动 redis <a class="header-anchor" href="#如何后台启动-redis" aria-hidden="true">#</a></h3><p>修改 redis.conf 文件中的 daemonize</p><p>开启 <code>daemonize yes</code> 报错退出</p><p>如何找到 redis.conf</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">find</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">redis.conf</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用 redis-server 启动 redis.conf 配置文件</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">redis-server</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./redis.conf</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>PS：redis-server 为 bin 命令，在 redis.conf 目录下</p></blockquote><p><img src="https://s2.loli.net/2022/09/26/8gFKCVcT3UqG5H4.png" alt="redis.conf"></p><h2 id="常见命令行" tabindex="-1">常见命令行 <a class="header-anchor" href="#常见命令行" aria-hidden="true">#</a></h2><table><thead><tr><th>命令名</th><th>描述</th></tr></thead><tbody><tr><td>keys *</td><td>查看所有的 key</td></tr><tr><td>set key value</td><td>设置 key-value</td></tr><tr><td>get key</td><td>得到某个 key</td></tr><tr><td>del key</td><td>删除某个 key</td></tr></tbody></table><h2 id="实战" tabindex="-1">实战 <a class="header-anchor" href="#实战" aria-hidden="true">#</a></h2><p>到现在还没用到</p>`,35),r=[i];function t(p,d,c,o,h,u){return a(),e("div",null,r)}const m=s(l,[["render",t]]);export{C as __pageData,m as default};
