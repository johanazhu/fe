export default function HTTPSideBar() {
    return [
        {
            text: '常见面试题',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '常见面试题',
                    link: '/HTTP/面试题/',
                },
            ],
        },
        {
            text: 'HTTP',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: 'HTTP导航',
                    link: '/HTTP/',
                },
                {
                    text: 'HTTP是什么',
                    link: '/HTTP/HTTP是什么',
                },
                {
                    text: 'TCPIP协议及网络分层模型',
                    link: '/HTTP/TCPIP协议及网络分层模型',
                },
                {
                    text: '三次握手和四次挥手',
                    link: '/HTTP/三次握手和四次挥手',
                },
                {
                    text: 'HTTP报文组成',
                    link: '/HTTP/HTTP报文组成',
                },
                {
                    text: 'HTTP缓存',
                    link: '/HTTP/HTTP缓存',
                },
                {
                    text: 'HTTP状态码',
                    link: '/HTTP/HTTP状态码',
                },
                {
                    text: 'HTTPS',
                    link: '/HTTP/HTTPS',
                },
                // '/HTTP/web安全.md',
                // '/HTTP/RESTful.md',
                // '/HTTP/session.md',
            ],
        },
    ];
}
