<template><h1 id="webview" tabindex="-1"><a class="header-anchor" href="#webview" aria-hidden="true">#</a> webview</h1>
<p>webview的原理</p>
<p>如何实现webview</p>
<h4 id="hybrid是什么-为何会是用hybrid" tabindex="-1"><a class="header-anchor" href="#hybrid是什么-为何会是用hybrid" aria-hidden="true">#</a> hybrid是什么，为何会是用hybrid？</h4>
<p>hybrid即“混合”，即前端和客户端的混合开发</p>
<p>需要前端开发人员和客户端开发人员配合完成</p>
<p>某些环节也可能涉及到server端</p>
<h5 id="存在价值" tabindex="-1"><a class="header-anchor" href="#存在价值" aria-hidden="true">#</a> 存在价值</h5>
<p>可以快速迭代更新【关键】（无需app审核）</p>
<h4 id="webview-1" tabindex="-1"><a class="header-anchor" href="#webview-1" aria-hidden="true">#</a> webview</h4>
<p>是app中的一个组件（app可以有webview，也可以不要）</p>
<p>用于加载h5页面，即一个小型的浏览器内核</p>
<h4 id="file协议" tabindex="-1"><a class="header-anchor" href="#file协议" aria-hidden="true">#</a> file协议</h4>
<p>https协议（远程的），file协议（文件协议，加载本地的）</p>
<p>file协议：本地文件，快</p>
<p>http(s)协议：网络加载，慢</p>
<h4 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现" aria-hidden="true">#</a> 具体实现：</h4>
<p>前端做好页面，客户端开启webview，用file协议加载静态页面</p>
<h4 id="完整流程" tabindex="-1"><a class="header-anchor" href="#完整流程" aria-hidden="true">#</a> 完整流程</h4>
<p>分版本号</p>
<p>将静态文件压缩成zip包，上传到服务端</p>
<p>客户端每次启动，都去服务端检查版本号</p>
<p>如果服务端版本号与客户端不同，就去下载最新的包</p>
<p>下载完之后解压包，然后将现有文件覆盖</p>
<p>hybrid和H5的区别</p>
<p>优点：体验更好，更NA体验基本一致</p>
<p>可快速迭代，无需app审核【关键】</p>
<p>缺点：开发成本高。联调、测试、查bug比较麻烦</p>
<p>运维成本高</p>
</template>
