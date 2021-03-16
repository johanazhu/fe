function PerformanceSideBar() {
    return [
      {
        title: "性能优化",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "Performance/介绍.md",
          "Performance/网络层面.md",
          "Performance/构建层面.md",
          "Performance/浏览器渲染层面.md",
          "Performance/服务端层面.md",
          "Performance/总结.md",
        ],
      },
    ];
}

module.exports = PerformanceSideBar;