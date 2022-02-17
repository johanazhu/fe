function reactSideBar() {
    return [
        {
            text: "常见面试题",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/React/面试题/",
                "/React/面试题/代码题.md",
                "/React/面试题/渲染十万条数据解决方案.md",
            ],
        },
        {
            text: "React各种知识点",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/React/",
                "/React/React快速了解.md",
                "/React/核心API.md",
                "/React/VirtualDOM.md",
                "/React/Diff.md",
                "/React/快问快答setState.md",
                "/React/函数式组件与类组件有何不同.md",
                "/React/Hooks.md",
                "/React/Hooks踩坑.md",
                "/React/事件机制.md",
                "/React/Fiber.md",
                "/React/性能优化.md",
                "/React/Refs.md",
                "/React/生命周期.md",
                "/React/为什么我们要写super(props).md",
            ],
        },
        {
            text: "生态",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/React/生态/Immutable.md",
                "/React/生态/从Redux说起，到手写，再到状态管理.md",
                "/React/生态/ReactRedux.md",
                "/React/生态/Redux-Sage.md",
                "/React/生态/Redux-thunk.md",
                "/React/生态/Dva.md",
                "/React/生态/Mobx.md",
                "/React/生态/各个状态库对比.md",
                "/React/生态/ReactRouter.md",
                "/React/生态/ReactSSR.md",
            ],
        },
        {
            text: "手写",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/React/手写/手写React.md",
                // 'React/手写/手写Redux.md',
                // 'React/手写/源码分析React.md',
                // 'React/手写/源码分析ReactRedux.md',
                "/React/手写/Preact.md",
            ],
        },
        {
            text: "实战",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/React/实战/React代码整洁之道.md",
                "/React/实战/搭建我的React+TS最佳实践.md",
                "/React/实战/自动化测试.md",
                "/React/实战/TodoList.md",
                "/React/实战/UI组件.md",
                "/React/实战/MovMov.md",
                "/React/实战/仿TapTap默认颜色取海报颜色.md",
            ],
        },
    ];
}

module.exports = reactSideBar;
