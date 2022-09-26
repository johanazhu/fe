function nodeSideBar() {
    return [
        {
            text: 'Node基础',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/Node/',
                '/Node/Node基础.md',
                '/Node/事件触发器events模块.md',
                '/Node/module模块.md',
                '/Node/脚手架.md',
                '/Node/npm.md',
                '/Node/RESTful.md',
                '/Node/session与JWT.md',
            ],
        },
        {
            text: 'Koa2',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/Koa2/',
                '/Koa2/Koa2基础.md',
                '/Koa2/实战：Koa2从零到脚手架.md',
                '/Koa2/源码分析.md',
                '/Koa2/手写Koa2.md',
                '/Koa2/对比Express、Koa2、Redux.md',
            ],
        },
        {
            text: 'Express',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/Express/',
                '/Express/Express源码解析.md',
                '/Express/手写Express.md',
            ],
        },
        {
            text: 'PM2',
            link: '/Node/PM2.md',
        },
        {
            text: 'MongoDB',
            link: '/Node/MongoDB.md',
        },
        {
            text: 'Mysql',
            link: '/Node/Mysql.md',
        },
        {
            text: 'Redis',
            link: '/Node/Redis.md',
        },
        {
            text: 'Go',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/Node/Go/',
                '/Node/Go/极简学习.md',
                '/Node/Go/Go项目学习.md',
            ],
        },
        {
            text: 'Python',
            collapsable: false,
            sidebarDepth: 0,
            children: ['/Node/Python/', '/Node/Python/Python基础.md'],
        },
        {
            text: 'Nest.js',
            link: '/Node/Nest.js.md',
        },
    ];
}

module.exports = nodeSideBar;
