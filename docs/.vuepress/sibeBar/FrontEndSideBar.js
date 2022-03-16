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
                "/React/手写/",
                "/React/生态/",
                "/React/实战/",
            ],
        },
        {
            text: "大前端",
            children: [
                "/WebApp/",
                "/WeChat/",
                "/MiniApp/",
                "/Flutter/",
                "/ReactNative/",
            ],
        },
        {
            text: "前端工程化",
            children: [
                "/webpack/",
                "/Engineered/MicroFrontend/",
                "/Engineered/StandardGuide/",
            ],
        },
        {
            text: "ES6",
            children: ["/ES6/面试题/", "/ES6/", "/ES6/Promise/"],
        },
        {
            text: "浏览器",
            children: ["/Browser/面试题/", "/Browser/"],
        },
        {
            text: "HTTP",
            children: ["/HTTP/面试题/", "/HTTP/"],
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
            text: "DevOps",
            link: "/DevOps/",
        },
        {
            text: "计算机基础",
            link: "/CSBasic/",
        },
        {
            text: "设计模式",
            link: "/DesignPattern/",
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
            text: "JQuery",
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
            text: "软实力",
            link: "/Others/",
        },
        {
            text: "关于我",
            link: "/About/",
        },
    ];
}

module.exports = FrontEndSideBar;
