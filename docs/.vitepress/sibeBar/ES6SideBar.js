export default function ES6SideBar() {
    return [
        {
            text: '常见面试题',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '面试题汇总',
                    link: '/ES6/面试题/',
                },
                {
                    text: 'Promise面试题',
                    link: '/ES6/面试题/Promise面试题',
                },
            ],
        },
        {
            text: 'ES6',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'ES6导航',
                    link: '/ES6/',
                },
                {
                    text: 'ES6完全指南',
                    link: '/ES6/ES6完全指南',
                },
                {
                    text: '模块化历程',
                    link: '/ES6/模块化历程',
                },
                {
                    text: '手写模块打包器',
                    link: '/ES6/手写模块打包器',
                },
                {
                    text: 'Class',
                    link: '/ES6/Class',
                },
                {
                    text: 'Iterator&Generator',
                    link: '/ES6/Iterator&Generator',
                },
                {
                    text: 'Let&Const',
                    link: '/ES6/Let&Const',
                },
                {
                    text: 'Map&Set',
                    link: '/ES6/Map&Set',
                },
                {
                    text: 'ES6至ES12的新特性',
                    link: '/ES6/ES6至ES12的新特性',
                },
                {
                    text: 'Proxy',
                    link: '/ES6/Proxy',
                },
            ],
        },
        {
            text: 'Promise专栏',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Promise汇总',
                    link: '/ES6/Promise/Promise',
                },
                {
                    text: '手写Promise',
                    link: '/ES6/Promise/手写Promise',
                },
                {
                    text: 'Async',
                    link: '/ES6/Promise/Async',
                },
            ],
        },
    ];
}
