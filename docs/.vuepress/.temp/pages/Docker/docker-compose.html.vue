<template><h1 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker-compose</h1>
<p>服务（<code>service</code>）：一个应用的容器，实际上可以包括若干相同镜像的容器实例</p>
<p>项目（<code>project</code>）：由一组关联的应用容器组成的一个完整业务单元，在 <code>docker-compose.yml</code> 文件中定义</p>
<p><code>compose</code>  的默认管理对象是项目，通过子命令对项目的一组容器进行便捷的生命周期管理</p>
<p>创建<code>docker-compose.yml</code> 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>version: <span class="token string">"3"</span>
services:

   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - <span class="token string">"5555:80"</span>
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
volumes:
  db_data:
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="构建并运行项目" tabindex="-1"><a class="header-anchor" href="#构建并运行项目" aria-hidden="true">#</a> 构建并运行项目</h2>
<p>运行 <code>docker-compose up -d</code> Compose 就会拉取镜像再创建我们所需要的镜像，然后启动 <code>wordpress</code> 和数据库容器。 接着浏览器访问 <code>127.0.0.1:5555</code> 端口就能看到 <code>WordPress</code> 安装界面了。</p>
<h3 id="什么是docker-compose" tabindex="-1"><a class="header-anchor" href="#什么是docker-compose" aria-hidden="true">#</a> 什么是docker-compose</h3>
<p>通过 docker-compose 用户可以很容器地用一个配置文件定义一个多容器的应用</p>
<p>docker-compose 解决了容器与容器之间如何管理编排的问题</p>
</template>
