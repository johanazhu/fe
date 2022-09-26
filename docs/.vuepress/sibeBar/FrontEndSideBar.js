function FrontEndSideBar() {
    return [
        {
            text: '目录',
            link: '/Introduction/',
        },
        {
            text: 'JavaScript',
            children: [
                '/JavaScript/面试题/',
                '/JavaScript/',
                '/JavaScript/原理/',
                '/JavaScript/高阶/',
            ],
        },
        {
            text: 'React',
            children: [
                '/React/面试题/',
                '/React/',
                '/React/手写/',
                '/React/生态/',
                '/React/实战/',
            ],
        },
        {
            text: '大前端',
            children: [
                '/WebApp/',
                '/WeChat/',
                '/MiniApp/',
                '/Flutter/',
                '/ReactNative/',
            ],
        },
        {
            text: '前端工程化',
            children: [
                '/webpack/',
                '/Engineered/MicroFrontend/',
                '/Engineered/StandardGuide/',
            ],
        },
        {
            text: 'ES6',
            children: ['/ES6/面试题/', '/ES6/', '/ES6/Promise/'],
        },
        {
            text: '浏览器',
            children: ['/Browser/面试题/', '/Browser/'],
        },
        {
            text: 'HTTP',
            children: ['/HTTP/面试题/', '/HTTP/'],
        },
        {
            text: '后端',
            children: [
                '/Node/',
                '/Koa2/',
                '/Express/',
                '/Node/PM2.md',
                '/Node/MongoDB.md',
                '/Node/Mysql.md',
                '/Node/Redis.md',
                '/Node/Python/',
                '/Node/Go/',
                '/Node/Nest.js.md',
            ],
        },
        {
            text: '性能优化',
            link: '/Performance/',
        },
        {
            text: '面试真题',
            link: '/Interview/',
        },
        {
            text: '运维部署',
            children: ['/Docker/', '/Git/', '/Nginx', '/Linux/', '/DevOps/'],
        },
        {
            text: '计算机基础打底',
            children: ['/CSBasic/', '/DesignPattern/'],
        },
        {
            text: '前端基础三件套',
            children: ['/HTML/', '/CSS/', '/Jquery/'],
        },
        {
            text: '源码读书课程',
            children: ['/Read/code/', '/Read/book/', '/Read/course/'],
        },
        {
            text: '其他',
            children: ['/Others/', '/About/'],
        },
    ];
}

module.exports = FrontEndSideBar;
