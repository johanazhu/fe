function ES6SideBar() {
    return [
        {
            text: "常见面试题",
            collapsable: false,
            sidebarDepth: 0,
            children: ["/ES6/面试题/", "/ES6/面试题/Promise面试题.md"],
        },
        {
            text: "ES6",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/ES6/",
                "/ES6/ES6完全指南.md",
                "/ES6/模块化历程.md",
                "/ES6/手写模块打包器.md",
                "/ES6/Class.md",
                "/ES6/Iterator&Generator.md",
                "/ES6/Let&Const.md",
                "/ES6/Map&Set.md",
                "/ES6/ES6+.md",
                "/ES6/Proxy.md",
            ],
        },
        {
            text: "Promise专栏",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/ES6/Promise/Promise.md",
                "/ES6/Promise/手写Promise.md",
                "/ES6/Promise/Async.md",
            ],
        },
    ];
}

module.exports = ES6SideBar;
