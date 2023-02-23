import{_ as e,c as r,o as t,d as a}from"./app.590c1fbf.js";const F=JSON.parse('{"title":"Fiber 的作用和原理","description":"","frontmatter":{},"headers":[{"level":2,"title":"Fiber 的作用","slug":"fiber-的作用","link":"#fiber-的作用","children":[]},{"level":2,"title":"Fiber","slug":"fiber","link":"#fiber","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"React/Fiber.md"}'),i={name:"React/Fiber.md"},p=a('<h1 id="fiber-的作用和原理" tabindex="-1">Fiber 的作用和原理 <a class="header-anchor" href="#fiber-的作用和原理" aria-hidden="true">#</a></h1><p><a href="https://zh-hans.reactjs.org/docs/faq-internals.html" target="_blank" rel="noreferrer">官网解释</a>：</p><blockquote><p>Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染。</p></blockquote><p>为什么会有 Fiber</p><p>React 在 V16 之前会面临的主要性能问题是：当组件树很庞大时，更新状态可能造成页面卡顿，根本原因在于——更新流程是 【同步、不可中断的】</p><p>为了解决这个问题，React 提出 F</p><p>Fiber 架构怎么做的？</p><ul><li>让 React 渲染的过程可以被中断，可以将控制权交回浏览器，让浏览器及时地相应用户的交互——异步可中断</li><li>通过将工作任务拆分成一个个雄安的工作单元分别来执行——Fiber</li></ul><p>Fiber 即是一种数据结构，又是一个工作单位</p><p>Fiber 作为数据结构</p><p>React Fiber 机制的实现，就是依赖于下面的这种数据结构-链表实现的。其中每个节点都是一个 Fiber，一个 Fiber 包含了 child（第一个子节点）、sibling（兄弟节点）、parent（父节点）等属性。Fiber 节点中其实还会保存节点的类型、节点的信息（比如 state、props）、节点对应的值等</p><p>Fiber 作为工作单位</p><p>将它视作一个执行单元，每次执行完一个“执行单元”，React 就会检查现在还剩多少时间，如果没有时间就将控制权让出来</p><blockquote><p>React Fiber 本质上是为了解决 React 更新低效率的问题，不要期待 Fiber 能给你现有应用带来质的提升，如果性能问题是自己造成的，自己的锅还是得自己背</p><p>——尤雨溪</p></blockquote><p>调度的最小单位——Fiber</p><p>Fiber 架构</p><h2 id="fiber-的作用" tabindex="-1">Fiber 的作用 <a class="header-anchor" href="#fiber-的作用" aria-hidden="true">#</a></h2><h2 id="fiber" tabindex="-1">Fiber <a class="header-anchor" href="#fiber" aria-hidden="true">#</a></h2><p>Fiber 是对核心算法的一次重新实现</p><p>react 的组件设计，如果你的一个组件加载或者更新时，带动 200 个组件更新，那么它会等这 200 个组件更新完再让出进程，如果这个时候用户有交互，是没有反应的（如果说 200 个组件需要 200 毫秒，这 200 毫秒内交互无效），为了提高用户体验，引入了 Fiber</p><p>因为 javascript 是单线程的</p><p>在 react v16 之前版本，因为 react 的设计不符合大组件的</p><p>分片</p><p>fiber 就好像是包子，你不用知道包子是怎么做出来的，你只要吃就好。</p><p>fiber 的出现对生命周期的影响，有好几个生命周期需要多次被调用</p><p>render</p><p>componentWillReceiveProps</p><p>shouldComponentUpdate</p><p>componentWillMount</p><p>componentWillUpdate</p><p>componentWillMount 和 componentWillUpdate 往往有副作用</p><p>组件交互的流程，用 jsx 写 react 组件，render() 输出虚拟 dom（通过 babel 插件），虚拟 dom 转为 DOM，再在 DOM 上注册事件，事件触发 setState()修改数据，在每次调用 setState 方法时，React 会自动执行 render 方法来更新虚拟 dom，如果组件已经被渲染，那么还会更新到 DOM 中去</p><p>异步渲染中的 Fiber 的做法是：分片</p><p>把一个很耗时的任务分成很多小片，</p><p>Fiber 之前的架构是同步更新，遍历，从根组件开始到子节点，</p><p>假如更新一个组件需要 1 毫秒，如果有 200 个组件要更新，那就需要 200 毫秒，在这 200 毫秒的更新过程中，浏览器那个唯一的主线程都在专心运行更新操作，无暇去做任何其他的事情。想象一下，在这 200 毫秒内，用户往一个 input 元素中输入点什么，敲击键盘也不会获得响应，因为渲染输入按键结果也是浏览器主线程的工作，但是浏览器主线程被 React 占着呢，抽不出空，最后的结果就是用户敲了按键看不到反应，等 React 更新过程结束之后，咔咔咔那些按键一下子出现在 input 元素里了。</p><p>这就是所谓的界面卡顿，很不好的用户体验。</p><p>现有的 React 版本，当组件树很大的时候就会出现这种问题，因为更新过程是同步地一层组件套一层组件，逐渐深入的过程，在更新完所有组件之前不停止，函数的调用栈就像下图这样，调用得很深，而且很长时间不会返回。</p><p><img src="https://i.loli.net/2021/06/03/7ncbYMKSCjBkRfr.png" alt="image-20210429131950217"></p><p>因为 JavaScript 单线程的特点，每个同步任务不能耗时太长，不然就会让程序不会对其他输入作出相应，React 的更新过程就是犯了这个禁忌，而 React Fiber 就是要改变现状。</p><p>React Fiber 的方式：</p><p>破解 JavaScript 中同步操作时间过长的方法其实很简单——分片。</p><p>把一个耗时长的任务分成很多小任务，每一个小任务完成了，就把控制权交还给 React 负责任务协调的模块，看看有没有其他其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务</p><p><img src="https://i.loli.net/2021/06/03/GYqmfj2AFPZURMt.png" alt="image-20210429145248158"></p><p>如果一个任务还没完成（时间到了），就会被另一个更高优先级的更新过程打算，这个时候，优先级高的更新任务会优先处理，而低优先级更新任务所作的工作则会完全作废，然后等待机会重头再来</p><p>React Fiber 更新过程被分为两个阶段（Phase）：第一个阶段 Reconciliation Phase 和第二阶段 Commit Phase</p><p>第一阶段，Fiber 会找到需要更新哪些 DOM，这个阶段可以被打算；但到了第二阶段，就会一鼓作气把 DOM 更新完，绝不会被打断</p><p>因为第一阶段的过程会被打断而且“重头再来”，就会造成意想不到的情况。</p><p>比如说，一个低优先级的任务 A 正在执行，已经调用了某个组件的 componentWillUpdate 函数，接下来发现自己的时间分片已经用完了，于是冒出水面，看看有没有紧急任务，哎呀，真的有一个紧急任务 B，接下来 React Fiber 就会去执行这个紧急任务 B，任务 A 虽然进行了一半，但是没办法，只能完全放弃，等到任务 B 全搞定之后，任务 A 重头来一遍，注意，是重头来一遍，不是从刚才中段的部分开始，也就是说，componentWillUpdate 函数会被再调用一次。</p><p>虚拟 DOM 是由 JSX 转译过来的，JSX 的入口函数是 React.createElement, 可操作空间不大， 第三大的底层 API 也非常稳定，因此我们只能改变第二层。</p><p>React16 将内部组件层改成 Fiber 这种数据结构，因此它的架构名也改叫 Fiber 架构。Fiber 节点拥有 return, child, sibling 三个属性，分别对应父节点， 第一个孩子， 它右边的兄弟， 有了它们就足够将一棵树变成一个链表， 实现深度优化遍历。</p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="http://www.ayqy.net/blog/dive-into-react-fiber/" target="_blank" rel="noreferrer">完全理解 React Fiber</a></li><li><a href="https://zhuanlan.zhihu.com/p/57346388" target="_blank" rel="noreferrer">[译]深入 React fiber 架构及源码</a></li><li><a href="https://juejin.cn/post/6844903975112671239" target="_blank" rel="noreferrer">这可能是最通俗的 React Fiber(时间分片) 打开方式</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&amp;mid=2247484462&amp;idx=1&amp;sn=5dbd034c08a993f6ff7a65d62da0b9bd&amp;source=41#wechat_redirect" target="_blank" rel="noreferrer">看家本领来了：全面了解 React Suspense 和 Hooks</a></li><li><a href="https://juejin.cn/post/6937560479795511303" target="_blank" rel="noreferrer">走进 React Fiber 的世界</a></li><li><a href="https://zhuanlan.zhihu.com/p/26027085" target="_blank" rel="noreferrer">React Fiber 是什么</a></li><li><a href="https://zhuanlan.zhihu.com/p/37095662" target="_blank" rel="noreferrer">React Fiber 架构</a></li><li><a href="https://mp.weixin.qq.com/s/gz7_StDD151Qnt-ziSfmSw" target="_blank" rel="noreferrer">react fiber 到底有多细</a></li><li><a href="https://juejin.cn/post/6985058301184737287#heading-6" target="_blank" rel="noreferrer">你不知道的 React Virtual DOM</a></li><li><a href="https://juejin.cn/post/7005880269827735566" target="_blank" rel="noreferrer">React Fiber 架构浅析</a></li><li><a href="https://juejin.cn/post/6844903750658686983" target="_blank" rel="noreferrer">【译】React Fiber Architecture</a></li></ul>',53),l=[p];function n(c,o,b,h,s,d){return t(),r("div",null,l)}const _=e(i,[["render",n]]);export{F as __pageData,_ as default};
