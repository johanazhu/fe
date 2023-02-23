export default function EngineeredSideBar() {
    return [
        {
            text: '前端工程化',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '前端工程化',
                    link: '/Engineered/',
                },
            ],
        },
        {
            text: '代码规范',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '代码规范导航',
                    link: '/Engineered/StandardGuide/',
                },
                {
                    text: '代码规范',
                    link: '/Engineered/StandardGuide/代码规范',
                },
                {
                    text: '字体设置最佳实践',
                    link: '/Engineered/StandardGuide/代码规范',
                },
                {
                    text: 'CSS规范',
                    link: '/Engineered/StandardGuide/CSS规范',
                },
                {
                    text: 'CodeReview规范',
                    link: '/Engineered/StandardGuide/CodeReview规范',
                },
                {
                    text: 'git提交规范',
                    link: '/Engineered/StandardGuide/git提交规范',
                },
                {
                    text: 'VSCode配置',
                    link: '/Engineered/StandardGuide/VSCode配置',
                },
            ],
        },
        {
            text: '微前端',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '微前端导航',
                    link: '/Engineered/MicroFrontend/',
                },
                {
                    text: '微前端调研',
                    link: '/Engineered/MicroFrontend/微前端调研',
                },
                {
                    text: '最容易看懂的微前端知识',
                    link: '/Engineered/MicroFrontend/最容易看懂的微前端知识',
                },
            ],
        },
    ];
}
