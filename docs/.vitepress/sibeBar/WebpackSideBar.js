export default function webpackSideBar() {
    return [
        {
            text: '常见面试题',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '常见面试题',
                    link: '/webpack/面试题/',
                },
            ],
        },
        {
            text: 'webpack',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'webpack导航',
                    link: '/webpack/',
                },
                {
                    text: '工程化、Babel、AST',
                    link: '/webpack/工程化、Babel、AST',
                },
                {
                    text: 'loader以及原理解析',
                    link: '/webpack/loader以及原理解析',
                },
                {
                    text: '手写plugin',
                    link: '/webpack/手写plugin',
                },
                {
                    text: '手写webpack',
                    link: '/webpack/手写webpack',
                },
                {
                    text: 'webpack其他文章',
                    link: '/webpack/webpack其他文章',
                },
                {
                    text: 'vite',
                    link: '/webpack/vite',
                },
            ],
        }
    ];
}
