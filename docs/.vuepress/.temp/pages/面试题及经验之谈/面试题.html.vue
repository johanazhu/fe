<template><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>55555</p>
<p>为什么？</p>
<p>setTimeout 是异步，延迟1秒后执行，for循环打印了5个console.log(i)，但是i是全局变量，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>来源：https://zhuanlan.zhihu.com/p/25855075</p>
<h3 id="如何面试前端工程师" tabindex="-1"><a class="header-anchor" href="#如何面试前端工程师" aria-hidden="true">#</a> 如何面试前端工程师</h3>
<p>文章：https://segmentfault.com/a/1190000000375138?page=1</p>
<h3 id="javascript面试知识点" tabindex="-1"><a class="header-anchor" href="#javascript面试知识点" aria-hidden="true">#</a> javascript面试知识点</h3>
<p>https://mp.weixin.qq.com/s?__biz=MzA4MjA1MDM3Ng==&amp;mid=2450811185&amp;idx=1&amp;sn=8ce9f6f239e8cd8e7621c1e6a992dca6&amp;chksm=886b6516bf1cec00039bac3cb807423e8787ed340f0731a962d651581d10b165bc1298e68378&amp;mpshare=1&amp;scene=1&amp;srcid=1202S0AkjEUxiib4HnkoH3E5&amp;sharer_sharetime=1606918141172&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&amp;key=29495e6e9fe7db13caa8ce7421fac63ff2ad4b4946a7dadbf81b6fff12c70e2e21d90a87d45e2e35aa72bb2eda8ba2c25cf4b6009d45159f923e2bb79ab97c8880d421e3d01eef392459fa37dc990e7094631a9622d335ec8ec8e52b630a3b72586877f447a9452169fbfc6d0f293d57ec057b7da4bdd9723e0c0405adea5bbe&amp;ascene=1&amp;uin=MTA0NTY0NDM2MQ%3D%3D&amp;devicetype=Windows+10+x64&amp;version=6300002f&amp;lang=zh_CN&amp;exportkey=AWufsuBZ3KQZ9bZa8%2FJTjS8%3D&amp;pass_ticket=dJJbETIHx9S7wMpl3KgE%2Bcnfp%2BqiPOgMnPBA%2FynqLsvUphrugj8alrLHAIcPmGzR&amp;wx_header=0</p>
<p>面试题：</p>
<p>https://mp.weixin.qq.com/mp/homepage?__biz=Mzg5ODA5NTM1Mw==&amp;hid=3&amp;sn=1c1c922b421e8d4dde1195112362d245&amp;scene=1&amp;devicetype=iOS12.1.1&amp;version=17001233&amp;lang=zh_CN&amp;nettype=3G+&amp;ascene=7&amp;session_us=gh_dababc073852&amp;fontScale=100&amp;wx_header=1</p>
<p>formData和ajax有什么区别
介绍下表单提交，和formData有什么关系</p>
<p>页面上有1万个button如何绑定事件</p>
<p>如何判断是button</p>
<p>页面上生成1万个button，并绑定事件，如何做（使用原生操作DOM）</p>
<p>浮点数0.1+0.2为什么不等于0.3</p>
<p>js执行过程分哪些阶段</p>
<p>介绍defineProperty方法，什么时候需要用到</p>
<p>for...in和object.keys的区别</p>
<p>知道axios或同级别网络请求库，知道axios的核心功能。
能口喷xhr用法，知道网络请求相关技术和技术底层，包括但不限于：content-type，不同type的作用；restful设计理念；cors处理方案，以及浏览器和服务端执行流程；口喷文件上传实现；
知道如何完成登陆模块，包括但不限于：登陆表单如何实现；cookie登录态维护方案；token base登录态方案；session概念</p>
<p>能说明白接口请求的前后端整体架构和流程，包括：业务代码，浏览器原理，http协议，服务端接入层，rpc服务调用，负载均衡。
知道websocket用法，包括但不限于：鉴权，房间分配，心跳机制，重连方案等。
知道pc端与移动端登录态维护方案，知道token base登录态实现细节，知道服务端session控制实现，关键字：refresh token。
知道oauth2.0轻量与完整实现原理。
知道移动端api请求与socket如何通过native发送，知道如何与native进行数据交互，知道ios与安卓jsbridge实现原理。</p>
<p>知道移动端webview和基础能力，包括但不限于：iOS端uiwebview与wkwebview差异；webview资源加载优化方案；webview池管理方案；native路由等。
登陆抽象层，能够给出完整的前后端对用户体系的整体技术架构设计，满足多业务形态用户体系统一。考虑跨域名、多组织架构、跨端、用户态开放等场景。
mock方案，能够设计出满足各种场景需要的mock数据方案，同时能说出对前后端分离的理解。考虑mock方案的通用性、场景覆盖度，以及代码或工程侵入程度。
埋点方案，能够说明白前端埋点方案技术底层实现，以及技术选型原理。能够设计出基于埋点的数据采集和分析方案，关键字包括：分桶策略，采样率，时序性，数据仓库，数据清洗等</p>
</template>
