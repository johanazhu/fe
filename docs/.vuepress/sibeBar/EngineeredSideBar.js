function EngineeredSideBar() {
    return [
        {
            text: "代码规范",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Engineered/StandardGuide/",
                "/Engineered/StandardGuide/代码规范.md",
                "/Engineered/StandardGuide/CSS规范.md",
                "/Engineered/StandardGuide/UI主题规范.md",
                "/Engineered/StandardGuide/CodeReview规范.md",
                "/Engineered/StandardGuide/git提交规范.md",
                "/Engineered/StandardGuide/VSCode配置.md",
            ],
        },
        {
            text: "微前端",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Engineered/MicroFrontend/",
                "/Engineered/MicroFrontend/微前端调研.md",
                "/Engineered/MicroFrontend/最容易看懂的微前端知识.md",
            ],
        },
    ];
}

module.exports = EngineeredSideBar;
