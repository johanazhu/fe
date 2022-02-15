<template><h1 id="mongodb" tabindex="-1"><a class="header-anchor" href="#mongodb" aria-hidden="true">#</a> MongoDB</h1>
<h2 id="什么是-mongodb" tabindex="-1"><a class="header-anchor" href="#什么是-mongodb" aria-hidden="true">#</a> 什么是 MongoDB</h2>
<ul>
<li>
<p>MongoDB 是一个基于分布式文件存储的开源数据库系统</p>
</li>
<li>
<p>MongoDB 将数据存储为一个文档，数据结构由键值（key=&gt;value）对组成。MongoDB 文档类似于 JSON 兑现。字段值可以包含其他文档，数组及文档数组</p>
</li>
</ul>
<h2 id="mongodb-基本概念" tabindex="-1"><a class="header-anchor" href="#mongodb-基本概念" aria-hidden="true">#</a> MongoDB 基本概念</h2>
<ul>
<li><strong>数据库</strong> MongoDB 的单个实例可以容纳多个独立的数据库，比如一个学生管理系统就可以对应一个数据库实例</li>
<li><strong>集合</strong> 数据库是由集合组成，一个集合用来表示一个实体，如学生集合</li>
<li><strong>文档</strong> 集合是由文档组成，一个文档表示一条<strong>记录</strong>，比如一位同学</li>
</ul>
<p>MongoDB 与 Mysql 的区别</p>
<table>
<thead>
<tr>
<th>Mongodb</th>
<th>Mysql</th>
</tr>
</thead>
<tbody>
<tr>
<td>文档（document）（单个文档最大 16M）</td>
<td>记录（row）</td>
</tr>
<tr>
<td>集合（collection）</td>
<td>表（table）</td>
</tr>
<tr>
<td>数据库（database）</td>
<td>数据库（database）</td>
</tr>
</tbody>
</table>
<h3 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h3>
<h4 id="使用数据库" tabindex="-1"><a class="header-anchor" href="#使用数据库" aria-hidden="true">#</a> 使用数据库</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>use database_name
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>database_name 代表数据库的名字</li>
<li>注：如果此数据库存在，则切换到此数据库下，如果此数据库不存在也可以切过来，但是并不能立刻创建数据库</li>
</ul>
<p>切换到 scholl 数据库下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>use school
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="查看所有数据库" tabindex="-1"><a class="header-anchor" href="#查看所有数据库" aria-hidden="true">#</a> 查看所有数据库</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>show dbs
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>备注：我们刚创建的数据库 <code>school</code> 如果不在列表内，要显示它，我们需要向 <code>school</code> 数据库插入一些数据</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>db.students.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>name: <span class="token string">'johan'</span>, age: <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="查看当前使用的数据库" tabindex="-1"><a class="header-anchor" href="#查看当前使用的数据库" aria-hidden="true">#</a> 查看当前使用的数据库</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>db
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>注：db 代表的是当前数据库 也就是 school 数据库</li>
</ul>
<h4 id="删除数据库" tabindex="-1"><a class="header-anchor" href="#删除数据库" aria-hidden="true">#</a> 删除数据库</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>db.dropDatabase<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="集合操作" tabindex="-1"><a class="header-anchor" href="#集合操作" aria-hidden="true">#</a> 集合操作</h3>
<h4 id="查找集合帮助" tabindex="-1"><a class="header-anchor" href="#查找集合帮助" aria-hidden="true">#</a> 查找集合帮助</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>db.students.help<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="插入文档" tabindex="-1"><a class="header-anchor" href="#插入文档" aria-hidden="true">#</a> 插入文档</h3>
<h4 id="insert" tabindex="-1"><a class="header-anchor" href="#insert" aria-hidden="true">#</a> insert</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>db.student.insert<span class="token punctuation">(</span><span class="token punctuation">{</span>name: <span class="token string">"elaine"</span>, age: <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="save" tabindex="-1"><a class="header-anchor" href="#save" aria-hidden="true">#</a> save</h4>
<p>保存</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>db.student.save<span class="token punctuation">(</span><span class="token punctuation">{</span>name: <span class="token string">"elaine"</span>, age: <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="什么是-mongoose" tabindex="-1"><a class="header-anchor" href="#什么是-mongoose" aria-hidden="true">#</a> 什么是 Mongoose</h3>
<ul>
<li>
<p>Mongoose 是 MongoDB 的一个对象模型工具</p>
</li>
<li>
<p>同时它也是针对 MongoDB 操作的一个对象模型库，封装了 MongoDB 对文档的一些增删改查等常用方法</p>
</li>
</ul>
<h2 id="使用-monggose" tabindex="-1"><a class="header-anchor" href="#使用-monggose" aria-hidden="true">#</a> 使用 monggose</h2>
<h3 id="安装-mongoose" tabindex="-1"><a class="header-anchor" href="#安装-mongoose" aria-hidden="true">#</a> 安装 mongoose</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cnpm i mongoose -S
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="使用-mongoose" tabindex="-1"><a class="header-anchor" href="#使用-mongoose" aria-hidden="true">#</a> 使用 mongoose</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"mongoose"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// const db = mongoose.connect("mongodb://user:pass@ip:port/database")</span>

mongoose<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token string">"mongodb://localhost:27017/school"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    useNewUrlParser<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    useUnifiedTopology<span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mongoose<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"error"</span><span class="token punctuation">,</span> <span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mongoose<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"open"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Mongoose连接成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="schema" tabindex="-1"><a class="header-anchor" href="#schema" aria-hidden="true">#</a> Schema</h3>
<p>Schema 是数据库集合的模型骨架 定义了集合中的字段的名称和类型以及默认值信息</p>
<h4 id="schema-type" tabindex="-1"><a class="header-anchor" href="#schema-type" aria-hidden="true">#</a> Schema.Type</h4>
<p>NodeJS 中的基本数据类型都属于 Schema.Type 另外 Mongoose 还定义了自己的类型</p>
<p>基本属性类型有：</p>
<ul>
<li>String</li>
<li>Number</li>
<li>Date</li>
<li>Boolean</li>
<li>数组</li>
<li>nul</li>
<li>内嵌文档</li>
</ul>
<h4 id="定义-schema" tabindex="-1"><a class="header-anchor" href="#定义-schema" aria-hidden="true">#</a> 定义 Schema</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> personSchema <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Schema</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token punctuation">{</span> Type<span class="token operator">:</span> String <span class="token punctuation">}</span><span class="token punctuation">,</span>
    binary<span class="token operator">:</span> <span class="token punctuation">{</span> Type<span class="token operator">:</span> Buffer <span class="token punctuation">}</span><span class="token punctuation">,</span>
    living<span class="token operator">:</span> <span class="token punctuation">{</span> Type<span class="token operator">:</span> Boolean <span class="token punctuation">}</span><span class="token punctuation">,</span>
    birthday<span class="token operator">:</span> <span class="token punctuation">{</span> Type<span class="token operator">:</span> Date <span class="token punctuation">}</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token punctuation">{</span> Type<span class="token operator">:</span> Number <span class="token punctuation">}</span><span class="token punctuation">,</span>
    _id<span class="token operator">:</span> Schema<span class="token punctuation">.</span>Types<span class="token punctuation">.</span>ObjectId<span class="token punctuation">,</span> <span class="token comment">// 主键</span>
    _fk<span class="token operator">:</span> Schema<span class="token punctuation">.</span>Types<span class="token punctuation">.</span>ObjectId<span class="token punctuation">,</span> <span class="token comment">// 外键</span>
    array<span class="token operator">:</span> <span class="token punctuation">{</span> Type<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token comment">// 不确定</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="model" tabindex="-1"><a class="header-anchor" href="#model" aria-hidden="true">#</a> Model</h4>
<p>Model 是由通过 Schema 构造而成 除了具有 Schema 定义的数据库骨架以外，还可以操作数据库。如何通过 Schema 来创建 Modal，如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> User <span class="token operator">=</span> mongoose<span class="token punctuation">.</span><span class="token function">model</span><span class="token punctuation">(</span><span class="token string">"User"</span><span class="token punctuation">,</span> schema<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="图形工具推荐" tabindex="-1"><a class="header-anchor" href="#图形工具推荐" aria-hidden="true">#</a> 图形工具推荐</h3>
<p><a href="https://robomongo.org/download" target="_blank" rel="noopener noreferrer">Robo 3T（推荐）<ExternalLinkIcon/></a>（免费）</p>
<p><a href="https://robomongo.org/" target="_blank" rel="noopener noreferrer">Studio 3T<ExternalLinkIcon/></a>（付费）</p>
<p>NoSQLBooster for MongoDB</p>
</template>
