
function reactSideBar() {
    return [
      {
        title: "React基础",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "React/大纲.md",
          "React/常见面试题.md",
          "React/component.md",
          "React/生命周期.md",
          "React/setState.md",
          "React/VirtualDOM.md",
          "React/Hooks.md",
          "React/Refs.md",
          "React/Fiber.md",
          "React/事件机制.md",
          "React/各种不常见的特性.md",
          "React/性能优化.md",
        ],
      },
      {
        title: "React全家桶",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "React/ReactRouter.md",
          "React/Redux.md",
          "React/Mobx.md",
          "React/Redux-sage.md",
          "React/Dva.md",
          "React/各个状态管理.md",
          "React/ReactSSR.md",
        ],
      },
      {
        title: "React源码手写",
        collapsable: false,
        sidebarDepth: 0,
        children: ["React/手写React.md", "React/手写Redux.md", "React/Preact.md"],
      },
      {
        title: "React实战",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "React/应用篇React代码整洁.md",
          "React/应用篇TodoList.md",
          "React/应用篇UI组件.md",
          "React/应用篇搭建React全家桶.md",
        ],
      },
    ];
}
  

module.exports = reactSideBar;

  