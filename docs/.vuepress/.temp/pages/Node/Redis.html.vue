<template><h1 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h1>
<h2 id="什么是redis" tabindex="-1"><a class="header-anchor" href="#什么是redis" aria-hidden="true">#</a> 什么是Redis</h2>
<p>Redis 是一个开源（BSD许可）的内存数据结构存储，用作数据库，缓存和消息代理。</p>
<p>它支持的数据结构：string，list，set，sorted set，hash</p>
<ul>
<li>Redis 是由 C 语言写的</li>
<li>数据模型为 key-value</li>
</ul>
<h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2>
<ul>
<li>速度快，因为数据存在内存中，类似于 HashMap
<ul>
<li>HashMap的特点是查找和操作的时间复杂度为O(1)</li>
</ul>
</li>
<li>可持久化</li>
<li>可用于缓存，消息，按 key 设置过期时间，过期后将自动删除</li>
</ul>
<h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<p>目前的场景就是当作缓存用</p>
<h2 id="常见命令行" tabindex="-1"><a class="header-anchor" href="#常见命令行" aria-hidden="true">#</a> 常见命令行</h2>
<table>
<thead>
<tr>
<th>命令名</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>keys *</td>
<td>查看所有的key</td>
</tr>
<tr>
<td>set key value</td>
<td>设置key-value</td>
</tr>
<tr>
<td>get key</td>
<td>得到某个key</td>
</tr>
<tr>
<td>del key</td>
<td>删除某个key</td>
</tr>
</tbody>
</table>
<h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2>
<p>到现在还没用到</p>
</template>
