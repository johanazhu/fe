function HTTPSideBar() {
    return [
        {
            text: '常见面试题',
            collapsable: false,
            sidebarDepth: 0,
            children: ['/HTTP/面试题/'],
        },
        {
            text: 'HTTP',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/HTTP/',
                '/HTTP/HTTP是什么.md',
                '/HTTP/HTTP历史.md',
                '/HTTP/TCP.md',
                '/HTTP/三次握手和四次挥手.md',
                '/HTTP/HTTP协议.md',
                '/HTTP/HTTP缓存.md',
                '/HTTP/HTTP状态码.md',
                '/HTTP/输入网址再按下回车，后面究竟发生了什么.md',
                '/HTTP/HTTPS.md',
                // '/HTTP/web安全.md',
                // '/HTTP/RESTful.md',
                // '/HTTP/session.md',
            ],
        },
    ];
}

module.exports = HTTPSideBar;
