export default function ArmorySideBar() {
    return [
        {
            text: 'Git',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Git导航',
                    link: '/Git/',
                },
                {
                    text: '常见命令',
                    link: '/Git/常见命令',
                },
                {
                    text: 'git工作流程',
                    link: '/Git/git工作流程',
                },
                {
                    text: 'git提交规范',
                    link: '/Git/git提交规范',
                },
                {
                    text: '教程',
                    link: '/Git/教程',
                },
                {
                    text: '原理',
                    link: '/Git/原理',
                },
                {
                    text: '工作中使用Git解决问题的场景',
                    link: '/Git/工作中使用Git解决问题的场景',
                },
            ],
        },
        {
            text: 'Linux',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Linux导航',
                    link: '/Linux/',
                },
                {
                    text: '基本概念',
                    link: '/Linux/基本概念',
                },
                {
                    text: '常用命令',
                    link: '/Linux/常用命令',
                },
                {
                    text: '目录结构',
                    link: '/Linux/目录结构',
                },
                {
                    text: '防火墙知一二',
                    link: '/Linux/防火墙知一二',
                },
                {
                    text: '远程服务器相关操作',
                    link: '/Linux/远程服务器相关操作',
                },
                {
                    text: 'Linux教程',
                    link: '/Linux/Linux教程',
                },
            ],
        },
        {
            text: 'DevOps',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'DevOps导航',
                    link: '/DevOps/',
                },
                {
                    text: 'DevOps',
                    link: '/DevOps/部署',
                },
                {
                    text: '建设前端性能监控系统',
                    link: '/DevOps/建设前端性能监控系统',
                },
                {
                    text: 'jenkins',
                    link: '/DevOps/jenkins',
                },
                {
                    text: 'sentry',
                    link: '/DevOps/sentry',
                },
            ],
        },
    ];
}
