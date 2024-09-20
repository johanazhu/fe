export default function PerformanceSideBar() {
    return [
        {
            text: '常见面试题',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '常见面试题',
                    link: '/Performance/面试题/',
                },
            ],
        },
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
                    text: '网络层面优化',
                    link: '/Performance/网络层面优化',
                },
                {
                    text: '工程化层面优化',
                    link: '/Performance/工程化层面优化',
                },
                {
                    text: 'React层面优化',
                    link: '/Performance/React层面优化',
                },
                {
                    text: '页面渲染层面优化',
                    link: '/Performance/页面渲染层面优化',
                },
                {
                    text: '性能优化从零到一',
                    link: '/Performance/性能优化从零到一',
                },
                {
                    text: '性能优化指标',
                    link: '/Performance/性能优化指标',
                },
            ],
        },
    ];
}
