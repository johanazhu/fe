function FrontEndSideBar() {
    return [
        {
            text: "目录",
            link: "/Introduction/",
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
            link: "/ES6/",
        },
        {
            text: "浏览器",
            link: "/Browser/",
        },
        {
            text: "HTTP",
            link: "/HTTP/",
        },
        {
            text: "HTML",
            link: "/HTML/",
        },
        {
            text: "CSS",
            link: "/CSS/",
        },
        {
            text: "Docker",
            link: "/Docker/",
        },
        {
            text: "Git",
            link: "/Git/",
        },
        {
            text: "Linux",
            link: "/Linux/",
        },
        {
            text: "计算机基础",
            link: "/CSBasic/",
        },
        {
            text: "设计模式",
            link: "/DesignPattern/发布订阅模式.md",
        },
        {
            text: "Jquery",
            link: "/Jquery/",
        },
        {
            text: "读书目录",
            link: "/Read/book/",
        },
        {
            text: "源码目录",
            link: "/Read/code/",
        },
        {
            text: "关于我",
            link: "/About/about.md",
        },
    ];
}

module.exports = FrontEndSideBar;
