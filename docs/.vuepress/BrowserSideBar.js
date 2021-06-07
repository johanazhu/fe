function BrowserSideBar() {
    return [
      {
        title: "Browser",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "Browser/",
          "Browser/浏览器架构.md",
          "Browser/渲染进程中的线程.md",
          "Browser/浏览器的渲染原理.md",
          "Browser/从url输入到返回请求的过程.md",
          "Browser/渲染机制.md",
          "Browser/回流与重绘.md",
          "Browser/事件循环系统.md",
          "Browser/事件冒泡.md",
          "Browser/事件Api.md",
          "Browser/跨域.md",
          "Browser/前端性能优化.md",
          "Browser/localStorage.md",
          "Browser/学习async,defer和动态脚本.md",
        ],
      },
    ];
}

module.exports = BrowserSideBar;
  