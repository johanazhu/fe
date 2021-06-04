
const jsSideBar = require("./jsSideBar");
const reactSideBar = require("./reactSideBar");
const bigFrondSideBar = require("./bigFrondSideBar");
const AlgorithmAndDataStructure = require("./AlgorithmAndDataStructure");
const ArmorySideBar = require("./ArmorySideBar");
const DockerSideBar = require("./DockerSideBar");
const frontEndBasicSideBar = require("./frontEndBasicSideBar");
const webpackSideBar = require("./webpackSideBar");
const nodeSideBar = require("./nodeSideBar");
const ES6SideBar = require("./ES6SideBar");
const BrowserSideBar = require("./BrowserSideBar");
const PerformanceSideBar = require("./PerformanceSideBar");
const designPatternSideBar = require("./designPatternSideBar");
const csBasicSideBar = require("./csBasicSideBar");
const aboutSideBar = require("./aboutSideBar");

module.exports = {
  title: "五年前端三年面试",
  // 网页描述
  description: "前端技术，面试",
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
          "javascript知识体系, React框架, javascript学习路线,js, webpack, 前端的一切, 前端面试, 知识体系, js技术栈, git, http, 算法, 数据结构",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  ],
  // 端口号
  port: 3000,
  markdown: {
    // 代码块行号
    lineNumbers: true,
  },
  themeConfig: {
    // 最后更新时间
    lastUpdated: "最后更新时间",
    // 仓库链接label
    repoLabel: "Github",
    sidebarDepth: 0,
    // 导航
    nav: [
      // { text: "导读", link: "/Introduction/" },
      {
        text: "前端基础",
        items: [
          { text: "JavaScript", link: "/JavaScript/Foreword.md" },
          { text: "ES6", link: "/ES6/完全指南.md" },
          { text: "Browser", link: "/Browser/总纲.md" },
          { text: "Performance", link: "/Performance/介绍.md" },
          { text: "HTML", link: "/HTML/HTML.md" },
          { text: "CSS", link: "/CSS/Foreword.md" },
          { text: "Jquery", link: "/Jquery/高效jquery.md" },
        ],
      },
      { text: "React", link: "/React/" },
      {
        text: "Node",
        items: [
          { text: "Node", link: "/Node/Node基本面.md" },
          { text: "Express", link: "/Express/express-teach.md" },
          { text: "Koa2", link: "/Koa2/koa2-teach.md" },
          { text: "PM2", link: "/Node/PM2.md" },
          { text: "Mongoose", link: "/Mongoose/mongoose-teach.md" },
          { text: "Mysql", link: "/Mysql/mysql-teach.md" },
          { text: "Redis", link: "/Redis/redis-teach.md" },
        ],
      },
      { text: "webpack", link: "/webpack/" },
      {
        text: "大前端",
        items: [
          { text: "WebApp", link: "/WebApp/Foreword.md" },
          { text: "Flutter", link: "/Flutter/Foreword.md" },
          { text: "微信公众号", link: "/WeChat/Foreword.md" },
          { text: "微信小程序", link: "/WxApp/Foreword.md" },
          { text: "RN", link: "/RN/Foreword.md" },
        ],
      },
      {
        text: "数据结构与算法",
        items: [
          { text: "数据结构", link: "/DataStructure/什么是数据结构.md" },
          { text: "算法", link: "/Algorithm/什么是算法.md" },
        ],
      },
      {
        text: "多多益善",
        items: [
          { text: "设计模式", link: "/DesignPattern/" },
          { text: "HTTP", link: "/HTTP/" },
          { text: "Docker", link: "/Docker/docker基础介绍.md" },
          { text: "Git", link: "/Git/git-teach.md" },
          { text: "Linux", link: "/Linux/shell.md" },
          { text: "CS基础", link: "/CSBasic/计算机的起源.md" },
        ],
      },
      {
        text: "关于",
        link: "/About/about.md",
      },
    ],
    sidebar: {
      "/JavaScript": jsSideBar(),
      "/ES6": ES6SideBar(),
      "/Browser": BrowserSideBar(),
      "/Performance": PerformanceSideBar(),
      "/React": reactSideBar(),
      "/Node": nodeSideBar(),
      "/Express": nodeSideBar(),
      "/Koa2": nodeSideBar(),
      "/Mongoose": nodeSideBar(),
      "/Mysql": nodeSideBar(),
      "/Redis": nodeSideBar(),
      "/webpack": webpackSideBar(),
      "/WebApp": bigFrondSideBar(),
      "/Flutter": bigFrondSideBar(),
      "/RN": bigFrondSideBar(),
      "/WeChat": bigFrondSideBar(),
      "/WxApp": bigFrondSideBar(),
      "/HTML": frontEndBasicSideBar(),
      "/CSS": frontEndBasicSideBar(),
      "/Jquery": frontEndBasicSideBar(),
      "/Algorithm": AlgorithmAndDataStructure(),
      "/DataStructure": AlgorithmAndDataStructure(),
      "/HTTP": ArmorySideBar(),
      "/Docker": DockerSideBar(),
      "/Git": ArmorySideBar(),
      "/Linux": ArmorySideBar(),
      "/DesignPattern": designPatternSideBar(),
      "/CSBasic": csBasicSideBar(),
      "/About": aboutSideBar(),
      "/Others": aboutSideBar(),
    },
  },
  configureWebpack: {
    resolve: {
      // 静态资源的别名
      alias: {
        "@images": "./public/images",
        // "@public": "./public",
      },
    },
  },
  smoothScroll: true,
  // typora 中使用图片资源转译成乱码
  markdown: {
    // ......
    extendMarkdown: (md) => {
      md.use(require("markdown-it-disable-url-encode"));
    },
  },
  // 插件
  // plugins: ['@vuepress/back-to-top']
};

// ['@vuepress/back-to-top'],
// [
//   'copyright',
//   {
//     noCopy: true, // 选中的文字将无法被复制
//     minLength: 100, // 如果长度超过 100 个字符
//   },
// ],
