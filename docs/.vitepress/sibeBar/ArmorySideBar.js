export default function ArmorySideBar() {
    return [
        {
            text: 'Linux',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Linux 导航',
                    link: '/Linux/',
                },
                {
                    text: 'Linux 基本概念',
                    link: '/Linux/基本概念',
                },
                {
                    text: 'Linux 包管理器',
                    link: '/Linux/包管理器',
                },
                {
                    text: 'Linux 系统目录结构',
                    link: '/Linux/系统目录结构',
                },
                {
                    text: 'Linux 常用命令',
                    link: '/Linux/常用命令',
                },
                {
                    text: 'Linux 文件目录及权限',
                    link: '/Linux/文件目录及权限',
                },
                {
                    text: 'Linux 用户和用户组管理',
                    link: '/Linux/用户和用户组管理',
                },
                {
                    text: 'Linux 其他命令',
                    link: '/Linux/其他命令',
                },
                {
                    text: 'Shell 命令大全',
                    link: '/Linux/shell命令大全',
                },
                {
                    text: '云服务器初始化脚本',
                    link: '/Linux/云服务器初始化脚本',
                }
            ],
        },
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
                    text: '常用命令',
                    link: '/Git/常用命令',
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
            text: '运维部署',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'DevOps',
                    link: '/DevOps',
                },
                {
                    text: 'Nginx',
                    link: '/DevOps/Nginx',
                },
                {
                    text: 'Nginx 常用命令及配置',
                    link: '/DevOps/Nginx/常用命令及配置',
                },
            ],
        },
    ];
}
