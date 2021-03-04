function bigFrondSideBar() {
    return [
      {
        title: "WebApp",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "WebApp/Foreword.md",
          "WebApp/常见问题.md",
          "WebApp/分辨率浅析.md",
          "WebApp/1px问题.md",
          "WebApp/移动端布局.md",
          "WebApp/适配方案.md",
          "WebApp/flexible源码解析.md",
          "WebApp/offset、scroll、client.md",
          "WebApp/滚动穿透.md",
          "WebApp/缓动动画.md",
          "WebApp/一个简洁、有趣的无限下拉方案.md",
          "WebApp/webview.md",
          "WebApp/Hybrid.md",
          "WebApp/JSBridge.md",
          "WebApp/主题色提取.md",
          "WebApp/我常用的webApp开发规范.md",
          "WebApp/最佳实践.md",
          "WebApp/mobileHack.md",
        ],
      },
      {
        title: "Flutter",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "Flutter/Foreword.md",
          "Flutter/dart.md",
          "Flutter/FlutterTeach.md",
          "Flutter/Widget.md",
          "Flutter/StatefulWidget.md",
        ],
      },
      {
        title: "微信公众号",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "WeChat/Foreword.md",
          "WeChat/微信分享.md",
          "WeChat/微信服务端开发.md",
        ],
      },
      {
        title: "微信小程序",
        collapsable: false,
        sidebarDepth: 0,
        children: ["WxApp/Foreword.md"],
      },
      {
        title: "RN",
        collapsable: false,
        sidebarDepth: 0,
        children: ["RN/Foreword.md"],
      },
    ];
}


module.exports = bigFrondSideBar;