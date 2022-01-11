function HTTPSideBar() {
    return [
        {
            text: "HTTP",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/HTTP/",
                "/HTTP/常见面试题.md",
                "/HTTP/HTTP是什么.md",
                "/HTTP/HTTP的由来.md",
                "/HTTP/TCP.md",
                "/HTTP/三次握手和四次挥手.md",
                "/HTTP/HTTP缓存.md",
                "/HTTP/HTTPS怎么就安全了.md",
                "/HTTP/网络优化.md",
                "/HTTP/web安全.md",
                "/HTTP/RESTful.md",
                "/HTTP/session与token登录.md",
                "/HTTP/axios是如何封装HTTP请求的.md",
            ],
        },
    ];
}

module.exports = HTTPSideBar;
