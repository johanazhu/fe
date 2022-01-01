function aboutSideBar() {
    return [
        {
            text: "关于",
            collapsable: false,
            sidebarDepth: 0,
            children: ["/About/about.md", "/About/book.md"],
        },
        {
            text: "关于简历",
            collapsable: false,
            sidebarDepth: 0,
            children: ["/About/Resume.md", "/About/TalkHr.md"],
        },
        {
            text: "术与道",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Others/代码和人生.md",
                "/Others/学习原则.md",
                "/Others/知识与技能.md",
            ],
        },
        {
            text: "留言本站",
            collapsable: false,
            sidebarDepth: 0,
            children: ["/About/Question.md"],
        },
        {
            text: "markdown语法",
            collapsable: false,
            sidebarDepth: 0,
            children: ["/About/markdown语法.md"],
        },
    ];
}

module.exports = aboutSideBar;
