<template><h1 id="前端性能优化" tabindex="-1"><a class="header-anchor" href="#前端性能优化" aria-hidden="true">#</a> 前端性能优化</h1>
<h2 id="快问快答" tabindex="-1"><a class="header-anchor" href="#快问快答" aria-hidden="true">#</a> 快问快答</h2>
<p>如何做页面的性能优化</p>
<p>1.减少体积（打包优化、babel 优化）</p>
<p>​	webpack打包，使用webpack content-hash</p>
<p>​	文件指纹是打包后输出的文件名的后缀</p>
<ul>
<li><code>Hash</code> ：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改</li>
<li><code>Chunkhash</code>：和 webpack 打包的 chunk 有关，不同的入口会有不同的 chunkhash</li>
<li><code>Contenthash</code>：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变</li>
</ul>
<p>2.延迟加载（资源的异步加载）</p>
<p>​	react 懒加载</p>
<p>3.网络加速（cdn、dns 预解析、http 并发数）</p>
<p>4.首屏渲染 （ssr、骨架图）</p>
<p>5.利用缓存（http 缓存）</p>
<p>前端性能优化</p>
<p>https://www.zhihu.com/question/40505685</p>
<p>天猪的2014年的文章</p>
<p>https://github.com/fouber/blog/issues/3</p>
<p>聊一聊前端性能与体验的优化</p>
<p>https://mp.weixin.qq.com/s/du8IG-pVo2c_z3P4lyBuWw</p>
<p>前端性能优化</p>
<p>https://mp.weixin.qq.com/s/J60NkG8A_E-vI3RpKQSTmw</p>
<p>从 10 多秒到 1.05 秒！前端性能优化实践</p>
<p>https://mp.weixin.qq.com/s/f4pA8xcRr5p_RHd076rA6Q</p>
<p><a href="https://github.com/amfe/article/issues/47#" target="_blank" rel="noopener noreferrer">CSS Animation性能优化<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/amfe/article/issues/21#" target="_blank" rel="noopener noreferrer">15年双11手淘前端技术巡演 - H5性能最佳实践<ExternalLinkIcon/></a></p>
</template>
