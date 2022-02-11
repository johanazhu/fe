<template><h1 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> Mysql</h1>
<h2 id="mysql安装步骤" tabindex="-1"><a class="header-anchor" href="#mysql安装步骤" aria-hidden="true">#</a> <a href="https://zhuanlan.zhihu.com/p/37152572" target="_blank" rel="noopener noreferrer">mysql安装步骤<ExternalLinkIcon/></a></h2>
<h2 id="mysql介绍" tabindex="-1"><a class="header-anchor" href="#mysql介绍" aria-hidden="true">#</a> mysql介绍</h2>
<ul>
<li>web server 中最流行的关系型数据库</li>
<li>官网可免费下载，用于学习</li>
<li>轻量级，易学易用</li>
</ul>
<h2 id="命令行" tabindex="-1"><a class="header-anchor" href="#命令行" aria-hidden="true">#</a> 命令行</h2>
<table>
<thead>
<tr>
<th>命令</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>show databases</td>
<td>显示所有的数据库表</td>
</tr>
<tr>
<td>create database blog</td>
<td>创建数据库</td>
</tr>
<tr>
<td>use blog</td>
<td>使用数据库</td>
</tr>
<tr>
<td>show tables</td>
<td>显示数据库中所有表</td>
</tr>
<tr>
<td>show columns from customers</td>
<td>查看表结构</td>
</tr>
<tr>
<td>drop database blog</td>
<td>删除数据库</td>
</tr>
<tr>
<td>mysqldump -h localhost -u root -p blog &gt; D:\blog.sql</td>
<td>导出数据库 blog 的结构和数据</td>
</tr>
<tr>
<td>mysqldump -h localhost -u root -p blog -d&gt; D:\blog_stru.sql</td>
<td>导出数据库 blog 的结构（加-d参数）</td>
</tr>
<tr>
<td>mysqldump -h localhost -u root -p blog customers &gt; D:\customers.sql</td>
<td>导出数据库 blog 中的 customers 表的结构和数据</td>
</tr>
<tr>
<td>mysql -h localhost -u root -p blog &lt; D:\blog.sql</td>
<td>向数据库 blog 导入数据库文件 blog.sql</td>
</tr>
</tbody>
</table>
<h2 id="操作数据库" tabindex="-1"><a class="header-anchor" href="#操作数据库" aria-hidden="true">#</a> 操作数据库</h2>
<ul>
<li>
<p>建库</p>
</li>
<li>
<p>建表</p>
</li>
<li>
<p>表操作</p>
</li>
</ul>
<h3 id="操作表" tabindex="-1"><a class="header-anchor" href="#操作表" aria-hidden="true">#</a> 操作表</h3>
<p><strong>增、删、改、查</strong></p>
<p>使用sql语句（入门简单，一学就会）</p>
<h4 id="增" tabindex="-1"><a class="header-anchor" href="#增" aria-hidden="true">#</a> 增</h4>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>insert into users(username, `password`, realname) values('lisi', '123', '李四')
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="查" tabindex="-1"><a class="header-anchor" href="#查" aria-hidden="true">#</a> 查</h4>
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
<h4 id="改" tabindex="-1"><a class="header-anchor" href="#改" aria-hidden="true">#</a> 改</h4>
<p>更新 id为3的realname为张三</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>update users set realname='张三' where id='3'
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="删" tabindex="-1"><a class="header-anchor" href="#删" aria-hidden="true">#</a> 删</h4>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>delete from users where realname='李四'
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>但一般来说不用delete，二是在users表中加一个状态，通过状态来判断他是否被删除。这种技术又称软删除</p>
<p>PS:如果你的更新和删除出现 error：1175处于安全模式，先使用以下代码解除安全模式</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SET SQL_SAFE_UPDATES=0;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
