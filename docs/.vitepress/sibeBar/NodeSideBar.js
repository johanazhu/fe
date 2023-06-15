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
                    link: '/Node/Node走马观花',
                },
                {
                    text: 'NPM包管理器',
                    link: '/Node/NPM包管理器',
                },
                {
                    text: '脚手架',
                    link: '/Node/脚手架',
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
                    text: '实战：vercel部署node服务',
                    link: '/Node/Koa2/实战：vercel部署node服务',
                },
                {
                    text: '对比Express、Koa2、Redux',
                    link: '/Node/Koa2/对比Express、Koa2、Redux',
                },
            ],
        },
        {
            text: '其他',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Express',
                    link: '/Node/Express',
                },
                {
                    text: 'PM2',
                    link: '/Node/PM2',
                },
            ],
        },
    ];
}
