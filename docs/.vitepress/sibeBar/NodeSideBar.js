export default function NodeSideBar() {
    return [
        {
            text: 'Node基础',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Node导航',
                    link: '/Node/',
                },
                {
                    text: 'Node基础',
                    link: '/Node/Node基础',
                },
                {
                    text: '事件触发器events模块',
                    link: '/Node/事件触发器events模块',
                },
                {
                    text: 'module模块',
                    link: '/Node/module模块',
                },
                {
                    text: '脚手架',
                    link: '/Node/脚手架',
                },
                {
                    text: '包管理器',
                    link: '/Node/npm',
                },
            ],
        },
        {
            text: 'Koa2',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Koa2导航',
                    link: '/Node/Koa2/',
                },
                {
                    text: 'Koa2基础',
                    link: '/Node/Koa2/Koa2基础',
                },
                {
                    text: '实战：Koa2从零到脚手架',
                    link: '/Node/Koa2/实战：Koa2从零到脚手架',
                },
                {
                    text: '源码分析',
                    link: '/Node/Koa2/源码分析',
                },
                {
                    text: '手写Koa2',
                    link: '/Node/Koa2/手写Koa2',
                },
                {
                    text: '对比Express、Koa2、Redux',
                    link: '/Node/Koa2/对比Express、Koa2、Redux',
                },
            ],
        },
        {
            text: 'Express',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Express导航',
                    link: '/Node/Express/',
                },
                {
                    text: 'Express源码解析',
                    link: '/Node/Express/Express源码解析',
                },
                {
                    text: '手写Express',
                    link: '/Node/Express/手写express',
                },
            ],
        },
        {
            text: 'PM2',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'PM2',
                    link: '/Node/PM2',
                },
            ],
        },
    ];
}
