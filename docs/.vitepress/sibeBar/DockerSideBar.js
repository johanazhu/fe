export default function DockerSideBar() {
    return [
        {
            text: 'Docker',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'Docker导航',
                    link: '/Docker/',
                },
                {
                    text: 'docker基本介绍',
                    link: '/Docker/docker基本介绍',
                },
                {
                    text: '如何安装docker',
                    link: '/Docker/如何安装docker',
                },
                {
                    text: 'docker常见命令',
                    link: '/Docker/docker常见命令',
                },
                {
                    text: 'docker的原理',
                    link: '/Docker/docker的原理',
                },
                {
                    text: 'dockerfile指令',
                    link: '/Docker/dockerfile指令',
                },
                {
                    text: 'docker-compose',
                    link: '/Docker/docker-compose',
                },
                {
                    text: '实战：构建自己的镜像',
                    link: '/Docker/实战：构建自己的镜像',
                },
                {
                    text: '实战：dockerfile最小实践',
                    link: '/Docker/实战：dockerfile最小实践',
                },
                {
                    text: '实战：docker-jenkins',
                    link: '/Docker/实战：docker-jenkins',
                },
            ],
        },
    ];
}
