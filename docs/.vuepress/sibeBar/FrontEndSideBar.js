function FrontEndSideBar() {
    return [
        {
            text: "目录",
            path: "/Introduction/",
        },
        {
            text: "JavaScript",
            children: [
                "/JavaScript/面试题/",
                "/JavaScript/",
                "/JavaScript/原理/",
                "/JavaScript/高阶/",
            ],
        },
        {
            text: "React",
            children: [
                "/React/面试题/",
                "/React/",
                "/React/生态/Immutable.md",
                "/React/手写/手写React.md",
                "/React/实战/React代码整洁之道.md",
            ],
        },
        {
            text: "后端",
            children: [
                "/Node/",
                "/Koa2/",
                "/Express/",
                "/Node/PM2.md",
                "/Node/MongoDB.md",
                "/Node/Mysql.md",
                "/Node/Redis.md",
                "/Node/Python/",
                "/Node/Go.md",
                "/Node/Nest.js.md",
            ],
        },
        {
            text: "大前端",
            children: [
                "/WebApp/",
                "/WeChat/",
                "/MiniApp/",
                "/Flutter/",
                "/RN/",
            ],
        },
        {
            text: "ES6",
            path: "/ES6/",
        },
        {
            text: "浏览器",
            path: "/Browser/",
        },
        {
            text: "HTTP",
            path: "/HTTP/",
        },
        {
            text: "HTML",
            path: "/HTML/",
        },
        {
            text: "CSS",
            path: "/CSS/",
        },
        {
            text: "Docker",
            path: "/Docker/",
        },
        {
            text: "Git",
            path: "/Git/",
        },
        {
            text: "Linux",
            path: "/Linux/",
        },
        {
            text: "计算机基础",
            path: "/CSBasic/",
        },
        {
            text: "设计模式",
            path: "/DesignPattern/发布订阅模式.md",
        },
        {
            text: "Jquery",
            path: "/Jquery/",
        },
        {
            text: "读书目录",
            path: "/Read/book/",
        },
        {
            text: "源码目录",
            path: "/Read/code/",
        },
        {
            text: "关于我",
            path: "/About/about.md",
        },
    ];
}

module.exports = FrontEndSideBar;
