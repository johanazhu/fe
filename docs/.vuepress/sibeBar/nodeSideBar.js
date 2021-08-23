function nodeSideBar() {
    return [
        {
            title: "node基础",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "Node/",
                "Node/脚手架.md",
                "Node/cookie、session、token、jwt.md",
                "Node/require和import.md",
                "Node/export.md",
                "Node/Node-mysql实践.md"
            ]
        },
        {
            title: "Koa2",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "Koa2/",
                "Koa2/源码分析.md",
                "Koa2/对比 Koa 和 Redux.md",
                "Koa2/对比Express、Koa.md",
                "Koa2/手写koa2.md",
                "Koa2/实战李瓶儿博客开发.md",
                "Koa2/koa2+MongoDB+JWT实战.md",
                "Koa2/Serverless+Egg.js后台管理系统实战.md",
                "Koa2/Koa2开发微信小程序服务端笔记.md",
                "Koa2/JWT.md"
            ]
        },
        {
            title: "Express",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "Express/",
                "Express/express-mongoose实践.md",
                "Express/手写express.md"
            ]
        },
        {
            title: "PM2",
            path: "Node/PM2.md"
        },
        {
            title: "Mongoose",
            path: "Node/Mongoose.md"
        },
        {
            title: "Mysql",
            path: "Node/Mysql.md"
        },
        {
            title: "Redis",
            path: "Node/Redis.md"
        },
        {
            title: "Go",
            path: "Node/Go.md"
        }
    ];
}

module.exports = nodeSideBar;
