<template><h1 id="settimeout" tabindex="-1"><a class="header-anchor" href="#settimeout" aria-hidden="true">#</a> SetTimeout</h1>
<h4 id="_1-如果当前任务执行时间过久-会影响定时器任务的执行" tabindex="-1"><a class="header-anchor" href="#_1-如果当前任务执行时间过久-会影响定时器任务的执行" aria-hidden="true">#</a> 1.如果当前任务执行时间过久，会影响定时器任务的执行</h4>
<h4 id="_2-如果-settimeout-存在嵌套调用-那么系统会设置最短时间间隔为-4-毫秒" tabindex="-1"><a class="header-anchor" href="#_2-如果-settimeout-存在嵌套调用-那么系统会设置最短时间间隔为-4-毫秒" aria-hidden="true">#</a> 2.如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒</h4>
<h3 id="requestanimationframe的工作机制" tabindex="-1"><a class="header-anchor" href="#requestanimationframe的工作机制" aria-hidden="true">#</a> requestAnimationFrame的工作机制</h3>
<p>一般每 16.7ms 刷新一次</p>
<h3 id="requestanimationframe-vs-settimeout" tabindex="-1"><a class="header-anchor" href="#requestanimationframe-vs-settimeout" aria-hidden="true">#</a> requestAnimationFrame VS setTimeout</h3>
<p>requestAnimationFrame 是由系统来决定回调函数的执行时机，而 setTimeout 要先放入消息队列中，当主线程上的任务执行完才会去执行 setTimeout 里的，如果主线程会执行时间慢了，即使定时任务中的时间到了，还是要延迟执行</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s/ENU93_jSUaAONCkfTQTK-Q" target="_blank" rel="noopener noreferrer">字节面试官问粉丝，如何实现准时的setTimeout<ExternalLinkIcon/></a></li>
</ul>
</template>
