function bigFrondSideBar() {
    return [
        {
            text: "WebApp",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/WebApp/",
                "/WebApp/常见问题.md",
                "/WebApp/分辨率浅析.md",
                "/WebApp/1px问题.md",
                "/WebApp/H5页面的适配方案.md",
                "/WebApp/适配方案.md",
                "/WebApp/flexible源码解析.md",
                "/WebApp/offset、scroll、client.md",
                "/WebApp/滚动穿透.md",
                "/WebApp/缓动动画.md",
                "/WebApp/一个简洁、有趣的无限下拉方案.md",
                "/WebApp/webview.md",
                "/WebApp/Hybrid.md",
                "/WebApp/JSBridge.md",
                // 'WebApp/主题色提取.md',
                "/WebApp/我常用的webApp开发规范.md",
                "/WebApp/最佳实践.md",
                "/WebApp/mobileHack.md",
            ],
        },
        {
            text: "微信公众号",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/WeChat/",
                "/WeChat/微信服务端开发.md",
                "/WeChat/微信网页授权.md",
                "/WeChat/微信网页开发之JS-SDK.md",
                "/WeChat/微信网页开发之常见问题.md",
            ],
        },
        {
            text: "微信小程序",
            collapsable: false,
            sidebarDepth: 0,
            children: ["/MiniApp/"],
        },
        {
            text: "Flutter",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Flutter/",
                "/Flutter/dart.md",
                "/Flutter/FlutterTeach.md",
                "/Flutter/Widget.md",
                "/Flutter/StatefulWidget.md",
            ],
        },
        {
            text: "RN",
            collapsable: false,
            sidebarDepth: 0,
            children: ["/RN/"],
        },
    ];
}

module.exports = bigFrondSideBar;
