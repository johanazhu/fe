function reactSideBar() {
  return [
    {
      title: 'React基础',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        // 'React/README.md',
        'React/面试题/常见面试题.md',
        // 'React/component.md',
        'React/生命周期.md',
        'React/setState.md',
        'React/VirtualDOM.md',
        'React/Hooks.md',
        'React/Hooks踩坑.md',
        'React/Refs.md',
        'React/Fiber.md',
        'React/事件机制.md',
        // 'React/各种不常见的特性.md',
        'React/性能优化.md',
        // 'React/ReactSSR.md',
      ],
    },
    {
      title: 'React源码分析',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'React/源码分析/手写React.md',
        'React/源码分析/手写Redux.md',
        'React/源码分析/源码分析React.md',
        'React/源码分析/源码分析ReactRedux.md',
        'React/源码分析/Preact.md',
      ],
    },
    {
      title: 'React状态库',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'React/状态库/Redux.md',
        'React/状态库/Mobx.md',
        'React/状态库/Dva.md',
        'React/状态库/各个状态库对比.md',
      ],
    },
    {
      title: 'React实战',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'React/实战/React代码整洁.md',
        'React/实战/React + TypeScript 实践.md',
        'React/实战/TodoList.md',
        'React/实战/UI组件.md',
        'React/实战/搭建React全家桶.md',
        'React/实战/React全栈+服务器渲染（ssr）打造社区webapp.md',
        'React/实战/React实战-自动化测试.md',
      ],
    },
  ]
}

module.exports = reactSideBar
