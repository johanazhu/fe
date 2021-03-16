
function nodeSideBar() {
    return [
      {
        title: "node基础",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "Node/Node基本面.md",
          "Node/事件触发器events模块.md",
          "Node/本地路径path模块.md",
          "Node/文件操作系统fs模块.md",
          "Node/全局对象process进程.md",
          "Node/http模块.md",
          "Node/统一资源定位符url模块.md",
          "Node/压缩zlib模块.md",
          "Node/流stream模块.md",
          "Node/逐行读取readline模块.md",
          "Node/查询字符串querystring模块.md",
          "Node/module模块.md",
          "Node/缓冲器Buffer模块.md",
          "Node/域名服务器dns模块.md",
          "Node/进程与线程.md",
          "Node/脚手架.md",
          "Node/cookie、session、token、jwt.md",
          "Node/require和import.md",
          "Node/export.md",
          "Node/Node-mysql实践.md",
        ],
      },
      {
        title: "Express",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "Express/express-teach.md",
          "Express/express-mongoose实践.md",
          "Express/手写express.md",
        ],
      },
      {
        title: "Koa2",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "Koa2/koa2-teach.md",
          "Koa2/源码分析.md",
          "Koa2/对比Express、Koa.md",
          "Koa2/手写koa2.md",
          "Koa2/koa2+MongoDB+JWT实战.md",
          "Koa2/Serverless+Egg.js后台管理系统实战.md",
        ],
      },
      {
        title: "PM2",
        collapsable: false,
        sidebarDepth: 0,
        children: ["Node/PM2.md"],
      },
      {
        title: "Mongoose",
        collapsable: false,
        sidebarDepth: 0,
        children: ["Mongoose/mongoose-teach.md"],
      },
      {
        title: "Mysql",
        collapsable: false,
        sidebarDepth: 0,
        children: ["Mysql/mysql-teach.md"],
      },
      {
        title: "Redis",
        collapsable: false,
        sidebarDepth: 0,
        children: ["Redis/redis-teach.md"],
      },
    ];
}

module.exports = nodeSideBar;
