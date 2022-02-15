<template><h1 id="immutable" tabindex="-1"><a class="header-anchor" href="#immutable" aria-hidden="true">#</a> Immutable</h1>
<h2 id="_1-什么是-immutable" tabindex="-1"><a class="header-anchor" href="#_1-什么是-immutable" aria-hidden="true">#</a> 1. 什么是 Immutable ？</h2>
<p>Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。主要原理是采用了 Persistent Data Structure（持久化数据结构)，就是当每次修改后我们都会得到一个新的版本，且旧版本可以完好保留，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），就是对于本次操作没有修改的部分，我们可以直接把相应的旧的节点拷贝过去，这其实就是结构共享。</p>
<h2 id="为什么要不可变" tabindex="-1"><a class="header-anchor" href="#为什么要不可变" aria-hidden="true">#</a> 为什么要不可变</h2>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s/8-xfY45DLqKDKAhvP16sUw" target="_blank" rel="noopener noreferrer">15 分钟学会 Immutable<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/APqvWcqhT5GSYsho_-sEtA" target="_blank" rel="noopener noreferrer">不能修葺的房子<ExternalLinkIcon/></a></li>
</ul>
</template>
