export default function PerformanceSideBar() {
    return [
        {
            text: '性能优化',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '性能优化导航',
                    link: '/Performance/',
                },
                {
                    text: '网络层面',
                    link: '/Performance/网络层面',
                },
                {
                    text: '构建层面',
                    link: '/Performance/构建层面',
                },
                {
                    text: '页面渲染层面',
                    link: '/Performance/页面渲染层面',
                },
                {
                    text: '服务端层面',
                    link: '/Performance/服务端层面',
                },
                {
                    text: '总结',
                    link: '/Performance/总结',
                },
            ],
        },
    ];
}
