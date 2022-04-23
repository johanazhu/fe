function DockerSideBar() {
    return [
        {
            text: 'Docker',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/Docker/',
                '/Docker/docker基本介绍.md',
                '/Docker/如何安装docker.md',
                '/Docker/docker常见命令.md',
                '/Docker/dockerfile指令.md',
                '/Docker/namespace与cgroup.md',
                '/Docker/docker-compose.md',
                '/Docker/实战：构建自己的镜像.md',
                '/Docker/实战：dockerfile最小实践—koa为例.md',
                '/Docker/实战：docker-jenkins.md',
                '/Docker/教程：李瓶儿讲docker.md',
            ],
        },
    ];
}

module.exports = DockerSideBar;
