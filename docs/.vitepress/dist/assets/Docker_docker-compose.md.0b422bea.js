import{_ as s,c as n,o as a,d as p}from"./app.590c1fbf.js";const A=JSON.parse('{"title":"docker-compose","description":"","frontmatter":{},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]},{"level":2,"title":"语法","slug":"语法","link":"#语法","children":[]}],"relativePath":"Docker/docker-compose.md"}'),l={name:"Docker/docker-compose.md"},e=p(`<h1 id="docker-compose" tabindex="-1">docker-compose <a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-hidden="true">#</a></h2><p>软件设计和开发，有单一职责原则。Docker 也一样，每个容器只负责一个服务</p><p>如果开发环境需要多个服务（nodejs mysql mongodb redis），就需要启动多个 Docker 容器</p><p>要连同着多个 Docker 容器，就需要 docker-compose</p><p>docker-compose 解决了容器与容器之间如何管理编排的问题</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h2><p>一行命令即可安装。完成之后运行 <code>docker-compose --version</code> 可以看到当前版本</p><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-hidden="true">#</a></h2><p>新建 <code>docker-compose.yml</code> 文件</p><div class="language-yml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F07178;">version</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">3</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">services</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">db</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql:5.7</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">volumes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">db_data:/var/lib/mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">restart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">always</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">environment</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">MYSQL_ROOT_PASSWORD</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">somewordpress</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">MYSQL_DATABASE</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wordpress</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">MYSQL_USER</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wordpress</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">MYSQL_PASSWORD</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wordpress</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">wordpress</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">depends_on</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">db</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wordpress:latest</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">5555:80</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">restart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">always</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">environment</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">WORDPRESS_DB_HOST</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">db:3306</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">WORDPRESS_DB_USER</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wordpress</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">WORDPRESS_DB_PASSWORD</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wordpress</span></span>
<span class="line"><span style="color:#F07178;">volumes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">db_data</span><span style="color:#89DDFF;">:</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>docker-cpmpose 基本结构</p><p><img src="https://i.loli.net/2021/09/13/EpdCZlwPauW5tBU.png" alt="docker-cpmpose 基本结构"></p><h2 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-hidden="true">#</a></h2><p>服务（<code>service</code>）：一个应用的容器，实际上可以包括若干相同镜像的容器实例</p><p>项目（<code>project</code>）：由一组关联的应用容器组成的一个完整业务单元，在 <code>docker-compose.yml</code> 文件中定义</p><p><code>compose</code> 的默认管理对象是项目，通过子命令对项目的一组容器进行便捷的生命周期管理</p>`,17),o=[e];function r(c,t,D,i,y,d){return a(),n("div",null,o)}const F=s(l,[["render",r]]);export{A as __pageData,F as default};