function ArmorySideBar() {
    return [
        {
            text: 'Git',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/Git/',
                '/Git/常见命令.md',
                '/Git/git工作流程.md',
                '/Git/git提交规范.md',
                '/Git/教程.md',
                '/Git/原理.md',
                '/Git/工作中使用Git解决问题的场景.md',
            ],
        },
        {
            text: 'Linux',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/Linux/',
                '/Linux/基本概念.md',
                '/Linux/常用命令.md',
                '/Linux/目录结构.md',
                '/Linux/防火墙知一二.md',
                '/Linux/远程服务器相关操作.md',
                '/Linux/Oeasy教linux.md',
                '/Linux/shell.md',
            ],
        },
        {
            text: 'DevOps',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/DevOps/',
                '/DevOps/部署.md',
                '/DevOps/异常监控系统.md',
                '/DevOps/jenkins.md',
                '/DevOps/sentry.md',
            ],
        },
    ];
}

module.exports = ArmorySideBar;
