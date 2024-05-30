export default function BrowserSideBar() {
    return [
        {
            text: '常见面试题',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '浏览器面试题',
                    link: '/Browser/面试题/',
                },
            ],
        },
        {
            text: '浏览器',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '浏览器导航',
                    link: '/Browser/',
                },
                {
                    text: '浏览器架构',
                    link: '/Browser/浏览器架构',
                },
                {
                    text: '渲染进程中的线程',
                    link: '/Browser/渲染进程中的线程',
                },
                {
                    text: '浏览器的渲染原理',
                    link: '/Browser/浏览器的渲染原理',
                },
                {
                    text: '从url输入到返回请求的过程',
                    link: '/Browser/从url输入到返回请求的过程',
                },
                {
                    text: '渲染机制',
                    link: '/Browser/渲染机制',
                },
                {
                    text: '回流与重绘',
                    link: '/Browser/回流与重绘',
                },
                {
                    text: '事件循环机制',
                    link: '/Browser/事件循环机制',
                },
                {
                    text: '事件冒泡',
                    link: '/Browser/事件冒泡',
                },
                {
                    text: '事件Api',
                    link: '/Browser/事件Api',
                },
                {
                    text: '跨域',
                    link: '/Browser/跨域',
                },
                {
                    text: 'DOM',
                    link: '/Browser/DOM',
                },
                {
                    text: 'BOM',
                    link: '/Browser/BOM',
                },
                {
                    text: 'localStorage',
                    link: '/Browser/localStorage',
                },
                // "/Browser/前端性能优化.md",
            ],
        },
    ];
}
