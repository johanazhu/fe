function HTTPSideBar() {
    return [
        {
            text: "阅读源码",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Read/code/",
                "/Read/code/JQuery.md",
                "/Read/code/Redux.md",
                "/Read/code/Underscore.md",
            ],
        },
        {
            text: "读书",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Read/book/",
                "/Read/book/程序员修炼之道.md",
                "/Read/book/凤凰项目：一个IT运维的创奇故事.md",
                "/Read/book/黑客与画家.md",
                "/Read/book/JavaScript 20 年.md",
                "/Read/book/JavaScript高级程序编程第四版.md",
                "/Read/book/JavaScript函数式编程.md",
                "/Read/book/JavaScript启示录.md",
                "/Read/book/JavaScript权威指南.md",
                "/Read/book/JsvaScript语言精粹.md",
                "/Read/book/UNIX编程艺术.md",
            ],
        },
        {
            text: "课程笔记",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Read/course/",
                "/Read/course/前端算法与数据结构面试：底层逻辑解读与大厂真题训练笔记.md",
                "/Read/course/透视HTTP协议.md",
                "/Read/course/重学前端.md",
                "/Read/course/HTTP协议原理+实践 Web开发工程师必学.md",
                "/Read/course/JavaScript设计模式核⼼原理与应⽤实践.md",
            ],
        },
    ];
}

module.exports = HTTPSideBar;
