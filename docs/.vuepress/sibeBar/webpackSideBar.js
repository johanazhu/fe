function webpackSideBar() {
    return [
        {
            title: "webpack教程",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "webpack/webpack从零到总结.md",
                "webpack/常见面试题.md",
                "webpack/webpack持久化缓存.md",
                "webpack/webpack配置篇.md",
                "webpack/深入理解webpack文件打包机制.md",
                "webpack/loader和plugin做什么.md",
                "webpack/webpack如何做优化.md",
                "webpack/webpack深入总结.md",
                "webpack/Polyfill 方案的过去、现在和未来.md",
                "webpack/使用ProloadPrefetch优化你的应用.md",
                "webpack/实现一个简单的webpack.md",
                "webpack/为什么webpack4默认支持ES6语法的压缩.md",
                "webpack/webapck热更新解读.md",
                "webpack/webpack-dev-middleware源码解读.md",
                "webpack/happy-pack原理解析.md",
                "webpack/实战-webpack大型项目实战.md",
                "webpack/实战-动手打一个自己的脚手架.md"
            ]
        },
        {
            title: "babel",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "webpack/babel/基础知识.md",
                "webpack/babel/如何写一个babel.md",
                "webpack/babel/深入理解babel生态.md"
            ]
        },
        {
            title: "vite",
            collapsable: false,
            sidebarDepth: 0,
            children: ["webpack/vite/速度与激情之Vite初体验.md"]
        },
        {
            title: "AST抽象语法树",
            collapsable: false,
            sidebarDepth: 0,
            children: ["webpack/AST.md"]
        }
    ];
}

module.exports = webpackSideBar;
