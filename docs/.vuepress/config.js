const jsSideBar = require("./sibeBar/jsSideBar");
const reactSideBar = require("./sibeBar/reactSideBar");
const bigFrondSideBar = require("./sibeBar/bigFrondSideBar");
const ArmorySideBar = require("./sibeBar/ArmorySideBar");
const HttpSideBar = require("./sibeBar/HttpSideBar");
const DockerSideBar = require("./sibeBar/DockerSideBar");
const frontEndBasicSideBar = require("./sibeBar/frontEndBasicSideBar");
const webpackSideBar = require("./sibeBar/webpackSideBar");
const nodeSideBar = require("./sibeBar/nodeSideBar");
const ES6SideBar = require("./sibeBar/ES6SideBar");
const BrowserSideBar = require("./sibeBar/BrowserSideBar");
const PerformanceSideBar = require("./sibeBar/PerformanceSideBar");
const designPatternSideBar = require("./sibeBar/designPatternSideBar");
const csBasicSideBar = require("./sibeBar/csBasicSideBar");
const aboutSideBar = require("./sibeBar/aboutSideBar");
const FrontEndSideBar = require("./sibeBar/FrontEndSideBar");

module.exports = {
    title: "五年前端三年面试",
    keywords:
        "Jahan johnnyjoestar azhubaby js react webpack babel browser html css jquery git http docker weapp wxapp flutter RN designPattern cssbasic about JavaScript学习路线 JavaScript知识体系 React框架 前端的一切 前端面试 知识体系 前端工程化 大前端",
    // 网页描述
    description: "Johan的前端知识地图，名曰五年前端三年面试",
    head: [
        // icon
        ["link", { rel: "icon", href: "/favicon.ico" }],
        // meta
        ["meta", { name: "robots", content: "all" }],
        ["meta", { name: "author", content: "johan" }],
        [
            "meta",
            {
                name: "keywords",
                content:
                    "jahan johnnyjoestar azhubaby js react webpack babel browser html css jquery git http docker weapp wxapp flutter RN designPattern cssbasic about JavaScript学习路线 JavaScript知识体系 React框架 前端的一切 前端面试 知识体系 前端工程化 大前端"
            }
        ],
        ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
        [
            "script",
            {},
            `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?ba0bbc21ba293c7cf67f60c2d4889ee5";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
          `
        ]
    ],
    // 端口号
    port: 3000,
    markdown: {
        // 代码块行号
        lineNumbers: true
    },
    themeConfig: {
        // 最后更新时间
        lastUpdated: "最后更新时间",
        // 仓库链接label
        repoLabel: "Github",
        sidebarDepth: 0,
        // 导航
        nav: [
            { text: "导读", link: "/Introduction/" },
            { text: "前端基础", link: "/JavaScript/" },
            { text: "React", link: "/React/" },
            { text: "后端", link: "/Node/" },
            {
                text: "了解更多",
                items: [
                    //   { text: "数据结构与算法", link: "/DataStructure&Algorithm/" },
                    // {
                    //   text: '数据结构与算法',
                    //   link: 'https://github.com/johanazhu/leetcode',
                    // },
                    { text: "HTTP", link: "/HTTP/" },
                    { text: "Docker", link: "/Docker/" },
                    { text: "Git", link: "/Git/" },
                    { text: "Linux", link: "/Linux/" },
                    { text: "设计模式", link: "/DesignPattern/" },
                    { text: "计算机基础", link: "/CSBasic/" },
                    { text: "关于", link: "/About/about.md" }
                ]
            },
            {
                text: "Github",
                link: "https://github.com/johanazhu"
            }
        ],
        sidebar: {
            "/JavaScript": jsSideBar(),
            "/ES6": ES6SideBar(),
            "/Browser": BrowserSideBar(),
            "/Performance": PerformanceSideBar(),
            "/React": reactSideBar(),
            "/Node": nodeSideBar(),
            "/Koa2": nodeSideBar(),
            "/Express": nodeSideBar(),
            "/PM2": nodeSideBar(),
            "/MongoDB": nodeSideBar(),
            "/Mysql": nodeSideBar(),
            "/Redis": nodeSideBar(),
            "/GO": nodeSideBar(),
            "/webpack": webpackSideBar(),
            "/WebApp": bigFrondSideBar(),
            "/Flutter": bigFrondSideBar(),
            "/RN": bigFrondSideBar(),
            "/WeChat": bigFrondSideBar(),
            "/WxApp": bigFrondSideBar(),
            "/HTML": frontEndBasicSideBar(),
            "/CSS": frontEndBasicSideBar(),
            "/Jquery": frontEndBasicSideBar(),
            "/HTTP": HttpSideBar(),
            "/Docker": DockerSideBar(),
            "/Git": ArmorySideBar(),
            "/Linux": ArmorySideBar(),
            "/DesignPattern": designPatternSideBar(),
            "/CSBasic": csBasicSideBar(),
            "/About": aboutSideBar(),
            "/Others": aboutSideBar(),
            "/Introduction": FrontEndSideBar()
        }
    },
    configureWebpack: {
        resolve: {
            // 静态资源的别名
            alias: {
                "@images": "./public/images"
                // "@public": "./public",
            }
        }
    },
    smoothScroll: true,
    // typora 中使用图片资源转译成乱码
    markdown: {
        // ......
        extendMarkdown: md => {
            md.use(require("markdown-it-disable-url-encode"));
        }
    }
    // 插件
    //   plugins: ['@vuepress/back-to-top']
};

// ['@vuepress/back-to-top'],
// [
//   'copyright',
//   {
//     noCopy: true, // 选中的文字将无法被复制
//     minLength: 100, // 如果长度超过 100 个字符
//   },
// ],
