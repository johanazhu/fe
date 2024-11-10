export default function BackEndSideBar() {
    return [
        {
            text: 'Node专区',
            // collapsable: false,
            // sidebarDepth: 0,
            items: [
                {
                    text: 'Node专区',
                    link: '/Node/',
                },
            ],
        },
        {
            text: '前端学后端',
            collapsable: false,
            // sidebarDepth: 0,
            items: [
                {
                    text: '后端导航',
                    link: '/BackEnd/',
                },
                {
                    text: 'RESTful',
                    link: '/BackEnd/RESTful',
                },
                {
                    text: 'session与JWT',
                    link: '/BackEnd/session与JWT',
                },
            ],
        },
        {
            text: 'Ruby',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Ruby导航',
                    link: '/BackEnd/Ruby/',
                },
                {
                    text: '前端学Ruby：安装Ruby、Rails',
                    link: '/BackEnd/Ruby/前端学Ruby：安装Ruby、Rails',
                },
                {
                    text: '前端学Ruby：熟悉Ruby语法',
                    link: '/BackEnd/Ruby/前端学Ruby：熟悉Ruby语法',
                },
                {
                    text: '前端学Ruby：熟悉Rails',
                    link: '/BackEnd/Ruby/前端学Ruby：熟悉Rails',
                },
                {
                    text: '前端学Ruby：唐诗API项目',
                    link: '/BackEnd/Ruby/前端学Ruby：唐诗API项目',
                },
                {
                    text: '前端学Ruby：唐诗项目部署优化',
                    link: '/BackEnd/Ruby/前端学Ruby：唐诗项目部署优化',
                },
                {
                    text: '前端学Ruby：论坛全栈项目一',
                    link: '/BackEnd/Ruby/前端学Ruby：全栈论坛（地宫）项目一',
                },
                {
                    text: '前端学Ruby：论坛全栈项目二',
                    link: '/BackEnd/Ruby/前端学Ruby：全栈论坛（地宫）项目二',
                },
            ],
        },
        {
            text: 'Go',
            collapsable: false,
            // sidebarDepth: 0,
            items: [
                {
                    text: 'Go导航',
                    link: '/BackEnd/Go/',
                },
                {
                    text: 'Go语法基础',
                    link: '/BackEnd/Go/Go语法基础',
                },
                {
                    text: 'Go项目学习',
                    link: '/BackEnd/Go/Go项目学习',
                },
            ],
        },
        {
            text: 'Python',
            collapsable: false,
            // sidebarDepth: 0,
            items: [
                {
                    text: 'Python导航',
                    link: '/BackEnd/Python/',
                },
                {
                    text: 'Python基础',
                    link: '/BackEnd/Python/Python基础',
                },
            ],
        },
        {
            text: '数据库',
            collapsable: false,
            // sidebarDepth: 0,
            items: [
                {
                    text: 'Mysql',
                    link: '/BackEnd/Mysql',
                },
                {
                    text: 'Postgresql',
                    link: '/BackEnd/Postgresql',
                },
                {
                    text: 'MongoDB',
                    link: '/BackEnd/MongoDB',
                },
                {
                    text: 'SQLite',
                    link: '/BackEnd/SQLite',
                },
                {
                    text: 'Redis',
                    link: '/BackEnd/Redis',
                },
            ],
        },
    ];
}
