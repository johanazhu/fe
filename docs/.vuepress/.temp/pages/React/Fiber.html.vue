<template><h1 id="fiber-笔记" tabindex="-1"><a class="header-anchor" href="#fiber-笔记" aria-hidden="true">#</a> Fiber 笔记</h1>
<h2 id="fiber" tabindex="-1"><a class="header-anchor" href="#fiber" aria-hidden="true">#</a> Fiber</h2>
<p>Fiber 是对核心算法的一次重新实现</p>
<p>react的组件设计，如果你的一个组件加载或者更新时，带动200个组件更新，那么它会等这200个组件更新完再让出进程，如果这个时候用户有交互，是没有反应的（如果说200个组件需要200毫秒，这200毫秒内交互无效），为了提高用户体验，引入了Fiber</p>
<p>因为javascript是单线程的</p>
<p>在react v16之前版本，因为react的设计不符合大组件的</p>
<p>分片</p>
<p>fiber就好像是包子，你不用知道包子是怎么做出来的，你只要吃就好。</p>
<p>fiber的出现对生命周期的影响，有好几个生命周期需要多次被调用</p>
<p>render</p>
<p>componentWillReceiveProps</p>
<p>shouldComponentUpdate</p>
<p>componentWillMount</p>
<p>componentWillUpdate</p>
<p>componentWillMount和componentWillUpdate 往往有副作用</p>
<p>组件交互的流程，用jsx写react组件，render() 输出虚拟dom（通过babel插件），虚拟dom转为DOM，再在DOM上注册事件，事件触发setState()修改数据，在每次调用setState方法时，React会自动执行render方法来更新虚拟dom，如果组件已经被渲染，那么还会更新到DOM中去</p>
<p>异步渲染中的 Fiber的做法是：分片</p>
<p>把一个很耗时的任务分成很多小片，</p>
<p>Fiber之前的架构是同步更新，遍历，从根组件开始到子节点，</p>
<p>假如更新一个组件需要1毫秒，如果有200个组件要更新，那就需要200毫秒，在这200毫秒的更新过程中，浏览器那个唯一的主线程都在专心运行更新操作，无暇去做任何其他的事情。想象一下，在这200毫秒内，用户往一个input元素中输入点什么，敲击键盘也不会获得响应，因为渲染输入按键结果也是浏览器主线程的工作，但是浏览器主线程被React占着呢，抽不出空，最后的结果就是用户敲了按键看不到反应，等React更新过程结束之后，咔咔咔那些按键一下子出现在input元素里了。</p>
<p>这就是所谓的界面卡顿，很不好的用户体验。</p>
<p>现有的React版本，当组件树很大的时候就会出现这种问题，因为更新过程是同步地一层组件套一层组件，逐渐深入的过程，在更新完所有组件之前不停止，函数的调用栈就像下图这样，调用得很深，而且很长时间不会返回。</p>
<p><img src="https://i.loli.net/2021/06/03/7ncbYMKSCjBkRfr.png" alt="image-20210429131950217"></p>
<p>因为JavaScript单线程的特点，每个同步任务不能耗时太长，不然就会让程序不会对其他输入作出相应，React的更新过程就是犯了这个禁忌，而React Fiber就是要改变现状。</p>
<p>React Fiber 的方式：</p>
<p>破解JavaScript中同步操作时间过长的方法其实很简单——分片。</p>
<p>把一个耗时长的任务分成很多小任务，每一个小任务完成了，就把控制权交还给React负责任务协调的模块，看看有没有其他其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务</p>
<p><img src="https://i.loli.net/2021/06/03/GYqmfj2AFPZURMt.png" alt="image-20210429145248158"></p>
<p>如果一个任务还没完成（时间到了），就会被另一个更高优先级的更新过程打算，这个时候，优先级高的更新任务会优先处理，而低优先级更新任务所作的工作则会完全作废，然后等待机会重头再来</p>
<p>React Fiber更新过程被分为两个阶段（Phase）：第一个阶段 Reconciliation Phase 和第二阶段 Commit Phase</p>
<p>第一阶段，Fiber会找到需要更新哪些DOM，这个阶段可以被打算；但到了第二阶段，就会一鼓作气把DOM更新完，绝不会被打断</p>
<p>因为第一阶段的过程会被打断而且“重头再来”，就会造成意想不到的情况。</p>
<p>比如说，一个低优先级的任务A正在执行，已经调用了某个组件的componentWillUpdate函数，接下来发现自己的时间分片已经用完了，于是冒出水面，看看有没有紧急任务，哎呀，真的有一个紧急任务B，接下来React Fiber就会去执行这个紧急任务B，任务A虽然进行了一半，但是没办法，只能完全放弃，等到任务B全搞定之后，任务A重头来一遍，注意，是重头来一遍，不是从刚才中段的部分开始，也就是说，componentWillUpdate函数会被再调用一次。</p>
<p>虚拟DOM是由JSX转译过来的，JSX的入口函数是React.createElement, 可操作空间不大， 第三大的底层API也非常稳定，因此我们只能改变第二层。</p>
<p>React16将内部组件层改成Fiber这种数据结构，因此它的架构名也改叫Fiber架构。Fiber节点拥有return, child, sibling三个属性，分别对应父节点， 第一个孩子， 它右边的兄弟， 有了它们就足够将一棵树变成一个链表， 实现深度优化遍历。</p>
<p>React Fiber架构浅析</p>
<p>https://juejin.cn/post/7005880269827735566</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="http://www.ayqy.net/blog/dive-into-react-fiber/" target="_blank" rel="noopener noreferrer">完全理解React Fiber<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/57346388" target="_blank" rel="noopener noreferrer">[译]深入React fiber架构及源码<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903975112671239" target="_blank" rel="noopener noreferrer">这可能是最通俗的 React Fiber(时间分片) 打开方式<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&amp;mid=2247484462&amp;idx=1&amp;sn=5dbd034c08a993f6ff7a65d62da0b9bd&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">看家本领来了：全面了解 React Suspense 和 Hooks<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6937560479795511303" target="_blank" rel="noopener noreferrer">走进 React Fiber 的世界<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/26027085" target="_blank" rel="noopener noreferrer">React Fiber是什么<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/37095662" target="_blank" rel="noopener noreferrer">React Fiber架构<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/gz7_StDD151Qnt-ziSfmSw" target="_blank" rel="noopener noreferrer">react fiber 到底有多细<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6985058301184737287#heading-6" target="_blank" rel="noopener noreferrer">你不知道的 React Virtual DOM<ExternalLinkIcon/></a></li>
</ul>
</template>
