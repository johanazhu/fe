<template><h1 id="分辨率、像素比" tabindex="-1"><a class="header-anchor" href="#分辨率、像素比" aria-hidden="true">#</a> 分辨率、像素比</h1>
<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3>
<p>单反，手机中看到的分辨率</p>
<p>可以看到，iPhone12 的分辨率是 <code>1334 x 750</code>，这里描述的就是屏幕实际的物理像素</p>
<p>物理像素，又称为设备像素。显示屏是由一个个物理像素点组成的， <code>1334 x 750</code> 表示手机分别在垂直和水平上所具有的像素点数。通过控制每个像素点的颜色，就可以使屏幕显示出不同的图像，屏幕从工厂出来那天起，它上面的物理像素点就固定不变了，单位为pt</p>
<p><strong>设备像素 = 物理像素</strong></p>
<h3 id="设备独立像素-density-independent-pixel" tabindex="-1"><a class="header-anchor" href="#设备独立像素-density-independent-pixel" aria-hidden="true">#</a> 设备独立像素（density-independent pixel）</h3>
<p>设备独立像素 = css 像素 = 逻辑像素</p>
<h3 id="物理像素-physical-pixel" tabindex="-1"><a class="header-anchor" href="#物理像素-physical-pixel" aria-hidden="true">#</a> 物理像素（physical pixel）</h3>
<p>这里描述的是屏幕实际的物理像素</p>
<p>设备像素 = 物理像素</p>
<h3 id="设备像素比-device-pixel-ratio" tabindex="-1"><a class="header-anchor" href="#设备像素比-device-pixel-ratio" aria-hidden="true">#</a> 设备像素比（device pixel ratio）</h3>
<h4 id="dpr-物理像素-设备独立像素" tabindex="-1"><a class="header-anchor" href="#dpr-物理像素-设备独立像素" aria-hidden="true">#</a> DPR = 物理像素/ 设备独立像素</h4>
<p>打开Chrome开发者工具，能看到这里的 <code>375*667</code>，表示的是设备独立像素（DIP）,也可以理解为css像素，也称为逻辑像素</p>
<p><strong>设备独立像素 = CSS 像素 = 逻辑像素</strong></p>
<p>这里使用 CSS 像素来记忆，也就是说。我们设计一个宽度为 375px 的 div，刚好可以充满这个设备的一行，配合高度 667px，则 div 的大小刚好可以充满整个屏幕。</p>
<h3 id="设备像素比-device-pixel-ratio-1" tabindex="-1"><a class="header-anchor" href="#设备像素比-device-pixel-ratio-1" aria-hidden="true">#</a> 设备像素比（device pixel ratio）</h3>
<p>由了以上两个概念，就可以引出下一个概念。DPR（设备像素比），这个与我们通常说的视网膜屏（多倍屏， Retina屏）有关</p>
<p>设备像素比描述的是<strong>未缩放状态下</strong>，物理像素和设备独立像素的初始比例关系</p>
<p>简单的计算公式：</p>
<p><strong>DPR = 物理像素 / 设备独立像素</strong></p>
<p>我们还是以 iPhone12 为例：</p>
<p>iPhone12 的DPR = iPhone12 物理像素宽度 / iPhone12 设备独立像素</p>
<blockquote>
<p>750 / 375 = 2</p>
<p>或者是 1334 / 667 = 2</p>
</blockquote>
<p>可以得到 iPhone12 的 dpr 为 2。也就是我们常说的视网膜屏幕</p>
<p>视网膜（Retina）屏幕是苹果公司“发明”的一个营销术语。苹果公司将 dpr &gt; 1 的屏幕称为视网膜屏幕</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://github.com/chokcoco/cnblogsArticle/issues/25" target="_blank" rel="noopener noreferrer">前端基础知识概述 -- 移动端开发的屏幕、图像、字体与布局的兼容适配<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/jawil/blog/issues/21" target="_blank" rel="noopener noreferrer">CSS像素、物理像素、逻辑像素、设备像素比、PPI、Viewport<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
