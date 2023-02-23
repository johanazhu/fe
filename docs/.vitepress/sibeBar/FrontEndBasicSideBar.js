export default function FrontEndBasicSideBar() {
    return [
        {
            text: 'HTML',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'HTML',
                    link: '/Basic/HTML/',
                },
            ],
        },
        {
            text: 'CSS',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'CSS',
                    link: '/Basic/CSS/',
                },
                {
                    text: 'BFC是什么',
                    link: '/Basic/CSS/BFC是什么',
                },
                {
                    text: 'flex',
                    link: '/Basic/CSS/flex',
                },
                {
                    text: 'grid',
                    link: '/Basic/CSS/grid',
                },
                {
                    text: '水平垂直居中',
                    link: '/Basic/CSS/水平垂直居中',
                },
                {
                    text: '左边固定宽，右边自适应',
                    link: '/Basic/CSS/左边固定宽，右边自适应',
                },
                {
                    text: '左图右文布局',
                    link: '/Basic/CSS/左图右文布局',
                },
                {
                    text: '瀑布流效果',
                    link: '/Basic/CSS/瀑布流效果',
                },
                {
                    text: '圣杯、双飞翼',
                    link: '/Basic/CSS/圣杯、双飞翼',
                },
                {
                    text: '动画',
                    link: '/Basic/CSS/动画',
                },
                {
                    text: 'CSS渲染以及优化策略',
                    link: '/Basic/CSS/CSS渲染以及优化策略',
                },
                {
                    text: 'CSS知多少',
                    link: '/Basic/CSS/CSS知多少',
                },
                {
                    text: '文本溢出',
                    link: '/Basic/CSS/文本溢出',
                },
            ],
        },
        {
            text: 'JQuery',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'JQuery导航',
                    link: '/Basic/JQuery/',
                },
                {
                    text: '高效jQuery',
                    link: '/Basic/JQuery/高效jQuery',
                },
                {
                    text: '如何设计一个JS插件',
                    link: '/Basic/JQuery/如何设计一个JS插件',
                },
                {
                    text: '阅读源码',
                    link: '/Basic/JQuery/阅读源码',
                },
            ],
        },
    ];
}
