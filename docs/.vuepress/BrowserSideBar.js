function BrowserSideBar() {
    return [
      {
        title: "Browser",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "Browser/browser.md",
          "Browser/localStorage.md",
          "Browser/页面构建过程.md",
          "Browser/渲染机制.md",
          "Browser/渲染树的形成原理.md",
          "Browser/回流与重绘.md",
          "Browser/跨域.md",
          "Browser/事件循环.md",
          "Browser/事件Api.md",
          "Browser/浏览器性能优化.md",
          "Browser/缓存.md",
          "Browser/浏览器原理.md",
        ],
      },
    ];
}

module.exports = BrowserSideBar;
  