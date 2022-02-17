function ArmorySideBar() {
    return [
        {
            text: "Git",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Git/",
                "/Git/常用命令.md",
                "/Git/工作流.md",
                "/Git/教程.md",
                "/Git/原理.md",
                "/Git/专题：时光穿梭机.md",
            ],
        },
        {
            text: "Linux",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Linux/",
                "/Linux/基本概念.md",
                "/Linux/常用命令.md",
                "/Linux/目录结构.md",
                "/Linux/防火墙知一二.md",
                "/Linux/远程服务器相关操作.md",
                "/Linux/Oeasy教linux.md",
                "/Linux/shell.md",
            ],
        },
    ];
}

module.exports = ArmorySideBar;
