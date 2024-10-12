export default function FrontEndSideBar() {
    return [
        {
            text: '目录',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '关于网站',
                    link: '/Introduction/',
                },
            ],
        },
        {
            text: 'JavaScript',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '面试题',
                    link: '/JavaScript/面试题/',
                },
                {
                    text: 'JavaScript基础',
                    link: '/JavaScript/',
                },
                {
                    text: '原理',
                    link: '/JavaScript/原理/',
                },
                {
                    text: '高阶',
                    link: '/JavaScript/高阶/',
                },
                {
                    text: '🔥TypeScript',
                    link: '/JavaScript/TypeScript/',
                },
            ],
        },
        {
            text: 'ES6',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '面试题',
                    link: '/ES6/面试题/',
                },
                {
                    text: 'ES6',
                    link: '/ES6/',
                },
                {
                    text: '🔥Promise',
                    link: '/ES6/Promise/Promise',
                },
            ],
        },
        {
            text: 'React',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '面试题',
                    link: '/React/面试题/',
                },
                {
                    text: 'React',
                    link: '/React/',
                },
                {
                    text: '生态',
                    link: '/React/生态/',
                },
            ],
        },
        {
            text: '浏览器',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '面试题',
                    link: '/Browser/面试题/',
                },
                {
                    text: '🔥Browser',
                    link: '/Browser/',
                },
                {
                    text: '🔥HTTP',
                    link: '/HTTP/',
                },
                {
                    text: '🔥性能优化',
                    link: '/Performance/',
                },
            ],
        },
        {
            text: '⭐后端之海',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Node',
                    link: '/Node/',
                },
                {
                    text: 'Koa2',
                    link: '/Node/Koa2/',
                },
                {
                    text: 'Express',
                    link: '/Node/Express',
                },
                {
                    text: 'PM2',
                    link: '/Node/PM2',
                },
                {
                    text: 'Ruby',
                    link: '/BackEnd/Ruby/',
                },
                {
                    text: 'Go',
                    link: '/BackEnd/Go/',
                },
                {
                    text: 'Python',
                    link: '/BackEnd/Python/',
                },
                {
                    text: 'MongoDB',
                    link: '/BackEnd/MongoDB',
                },
                {
                    text: 'Mysql',
                    link: '/BackEnd/Mysql',
                },
                {
                    text: 'Redis',
                    link: '/BackEnd/Redis',
                },
            ],
        },
        {
            text: '前端工程化',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'webpack',
                    link: '/webpack/',
                },
                {
                    text: '🔥微前端',
                    link: '/Engineered/MicroFrontend/',
                },
                {
                    text: '代码规范',
                    link: '/Engineered/StandardGuide/',
                },
            ],
        },
        {
            text: '大前端',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '移动H5开发',
                    link: '/WebApp/',
                },
                {
                    text: '微信公众号',
                    link: '/WebApp/WeChat/',
                },
                {
                    text: '微信小程序',
                    link: '/WebApp/MiniApp/',
                },
                {
                    text: '🍋Flutter',
                    link: '/WebApp/Flutter/',
                },
                {
                    text: '🍋ReactNative',
                    link: '/WebApp/ReactNative/',
                },
            ],
        },
        {
            text: '🔥前端十面',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '面试真题',
                    link: '/Interview/',
                },
                {
                    text: '面试向我看齐',
                    link: '/Interview/talk',
                },
            ],
        },
        {
            text: '运维部署',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Docker',
                    link: '/Docker/',
                },
                {
                    text: 'Git',
                    link: '/Git/',
                },
                {
                    text: 'Linux',
                    link: '/Linux/',
                },
                {
                    text: 'DevOps',
                    link: '/DevOps/',
                },
                {
                    text: 'Nginx',
                    link: '/DevOps/Nginx/',
                    // collapsable: false,
                    // items: [
                    //     {
                    //         text: 'Nginx',
                    //         link: '/DevOps/Nginx/',
                    //     },
                    // ],
                },
            ],
        },
        {
            text: '计算机基础',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'CSBasic',
                    link: '/CSBasic/',
                },
                {
                    text: '设计模式',
                    link: '/DesignPattern/',
                },
            ],
        },
        {
            text: '前端基础',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'HTML',
                    link: '/Basic/HTML/',
                },
                {
                    text: 'CSS',
                    link: '/Basic/HTML/',
                },
                {
                    text: 'JQuery',
                    link: '/Basic/JQuery/',
                },
            ],
        },
        {
            text: '源码&读书',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '阅读源码',
                    link: '/Read/code/',
                },
                {
                    text: '读书',
                    link: '/Read/book/',
                },
            ],
        },
        {
            text: '其他',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '关于',
                    link: '/About/',
                },
            ],
        },
    ];
}
