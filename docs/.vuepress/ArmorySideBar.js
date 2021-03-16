
function ArmorySideBar() {
    return [
      {
        title: "HTTP",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "HTTP/常见面试题.md",
          "HTTP/HTTP是什么.md",
          "HTTP/HTTP的前世今生.md",
          "HTTP/网络是怎样连接的.md",
          "HTTP/restful.md",
          "HTTP/TCP.md",
          "HTTP/session与token登录.md",
          "HTTP/HTTP1,2,3的对比.md",
          "HTTP/GET和POST请求的本质区别是什么.md",
        ],
      },
      {
        title: "Git",
        collapsable: false,
        sidebarDepth: 0,
        children: ["Git/git-teach.md", "Git/git-shell.md"],
      },
      {
        title: "Linux",
        collapsable: false,
        sidebarDepth: 0,
        children: ["Linux/shell.md"],
      },
    ];
}

module.exports = ArmorySideBar;