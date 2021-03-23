# Fiber 是什么

完全理解React Fiber

http://www.ayqy.net/blog/dive-into-react-fiber/

深入React Fiber 架构

https://zhuanlan.zhihu.com/p/57346388



这可能是最通俗的 Fiber 打开方式

https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&mid=2247484348&idx=1&sn=7730b71b1b4c7eae2c1a16bfdb43abb1&chksm=9782cd35a0f54423e7791ffe7e0e8b3989a2842109fed15ce3ab2ea74f50b89559ce1e1b7a41&mpshare=1&scene=1&srcid=&sharer_sharetime=1571714540896&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



## Fiber

Fiber 是对核心算法的一次重新实现

react的组件设计，如果你的一个组件加载或者更新时，带动200个组件更新，那么它会等这200个组件更新完再让出进程，如果这个时候用户有交互，是没有反应的（如果说200个组件需要200毫秒，这200毫秒内交互无效），为了提高用户体验，引入了Fiber

因为javascript是单线程的

在react v16之前版本，因为react的设计不符合大组件的

分片

fiber就好像是包子，你不用知道包子是怎么做出来的，你只要吃就好。

fiber的出现对生命周期的影响，有好几个生命周期需要多次被调用

render

componentWillReceiveProps

shouldComponentUpdate

componentWillMount

componentWillUpdate

componentWillMount和componentWillUpdate 往往有副作用



组件交互的流程，用jsx写react组件，render() 输出虚拟dom（通过babel插件），虚拟dom转为DOM，再在DOM上注册事件，事件触发setState()修改数据，在每次调用setState方法时，React会自动执行render方法来更新虚拟dom，如果组件已经被渲染，那么还会更新到DOM中去



看家本领来了：全面了解 React Suspense 和 Hooks

https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484462&idx=1&sn=5dbd034c08a993f6ff7a65d62da0b9bd&source=41#wechat_redirect

异步渲染中的 Fiber的做法是：分片

把一个很耗时的任务分成很多小片，





Suspense要解决两个问题

1. 代码分片
2. 异步获取数据



走进 React Fiber 的世界

https://juejin.cn/post/6937560479795511303



































































