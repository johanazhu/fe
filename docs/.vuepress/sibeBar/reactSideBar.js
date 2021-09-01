function reactSideBar() {
  return [
    {
      title: '常见面试题',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'React/面试题/',
        'React/面试题/React有哪些坑点.md',
        'React/面试题/动态渲染组件：懒加载 React 长页面.md',
      ],
    },
    {
      title: 'React基础',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'React/',
        'React/函数式组件与类组件有何不同.md',
        'React/生命周期.md',
        'React/setState.md',
        'React/VirtualDOM.md',
        'React/Hooks.md',
        'React/Hooks踩坑.md',
        'React/Refs.md',
        'React/Fiber.md',
        'React/事件机制.md',
        'React/性能优化.md',
        'React/ReactSSR.md',
      ],
    },
    {
      title: '源码分析',
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
      title: '生态',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'React/生态/Immutable.md',
        'React/生态/Redux.md',
        'React/生态/Mobx.md',
        'React/生态/Dva.md',
        'React/生态/各个状态库对比.md',
      ],
    },
    {
      title: '实战',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'React/实战/React代码整洁之道.md',
        'React/实战/搭建React全家桶.md',
        'React/实战/TodoList.md',
        'React/实战/React实战-自动化测试.md',
        'React/实战/UI组件.md',
      ],
    },
  ]
}

module.exports = reactSideBar
