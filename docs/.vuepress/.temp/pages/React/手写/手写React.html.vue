<template><h1 id="手写react" tabindex="-1"><a class="header-anchor" href="#手写react" aria-hidden="true">#</a> 手写React</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>巴拉巴拉，如何下手</p>
<p>jsx会被转译成用 <code>React.createElement</code> 方法包裹的代码。所以第一步，我们来实现这个<code>React.createElement</code> 方法</p>
<p>从 jsx 转译结果来看，createElement 方法的参数是这样：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">createElement</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> child1<span class="token punctuation">,</span> child2<span class="token punctuation">,</span> child3<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="jsx和虚拟dom" tabindex="-1"><a class="header-anchor" href="#jsx和虚拟dom" aria-hidden="true">#</a> JSX和虚拟DOM</h2>
<h2 id="组件和生命周期" tabindex="-1"><a class="header-anchor" href="#组件和生命周期" aria-hidden="true">#</a> 组件和生命周期</h2>
<h2 id="diff算法" tabindex="-1"><a class="header-anchor" href="#diff算法" aria-hidden="true">#</a> diff算法</h2>
<p>节点之间的对比</p>
<h2 id="异步的setstate" tabindex="-1"><a class="header-anchor" href="#异步的setstate" aria-hidden="true">#</a> 异步的setState</h2>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzU0ODk0MDg4Nw==&amp;mid=2247483951&amp;idx=1&amp;sn=b4fbae59bd89c442c7c8fdaa97d0eca7&amp;chksm=fbb63f17ccc1b60187019619a7ae0c8eee9e9a6a0ac12d02bb5d882b97f0426eb2d5c1a288ae&amp;mpshare=1&amp;scene=1&amp;srcid=1219E4YN8Tw4TU6zNCpHO6Qi&amp;sharer_sharetime=1576748110521&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">Preact（React）核心原理详解<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/ykforerlang/tinyreact" target="_blank" rel="noopener noreferrer">从0实现一个tiny react<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/C4pjEzYPZocRnJOaF1q0Jg" target="_blank" rel="noopener noreferrer">手写系列-实现一个铂金段位的 React<ExternalLinkIcon/></a></li>
<li><a href="https://react.iamkasong.com/" target="_blank" rel="noopener noreferrer">React技术揭秘<ExternalLinkIcon/></a></li>
<li><a href="https://www.html.cn/web/javascript/19259.html" target="_blank" rel="noopener noreferrer">用90行javascript代码构建自己的react<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/hujiulong/simple-react" target="_blank" rel="noopener noreferrer">simple-react<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&amp;mid=2247490304&amp;idx=1&amp;sn=ff1210a10d747ee4a467572cb479003e&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">从零开始的 React 再造之旅<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/28697362" target="_blank" rel="noopener noreferrer">React 源码解析<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&amp;mid=2247496377&amp;idx=1&amp;sn=0949ca28eee0fac69c8afcce76424cae&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">从0实现React 系列(一)：React的架构设计<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/AttackXiaoJinJin/reactExplain" target="_blank" rel="noopener noreferrer">React源码解析<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000021689852" target="_blank" rel="noopener noreferrer">从零开始的 React 再造之旅<ExternalLinkIcon/></a></li>
<li><a href="https://pomb.us/build-your-own-react/" target="_blank" rel="noopener noreferrer">build-your-own-react<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/kmJWbNriGouztcGx4be8BQ" target="_blank" rel="noopener noreferrer">自己造一个ReactDOM<ExternalLinkIcon/></a></li>
</ul>
</template>
