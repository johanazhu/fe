const jsSideBar = require('./jsSideBar')
const reactSideBar = require('./reactSideBar')
const bigFrondSideBar = require('./bigFrondSideBar')
const ArmorySideBar = require('./ArmorySideBar')
const HttpSideBar = require('./HttpSideBar')
const DockerSideBar = require('./DockerSideBar')
const frontEndBasicSideBar = require('./frontEndBasicSideBar')
const webpackSideBar = require('./webpackSideBar')
const nodeSideBar = require('./nodeSideBar')
const ES6SideBar = require('./ES6SideBar')
const BrowserSideBar = require('./BrowserSideBar')
const PerformanceSideBar = require('./PerformanceSideBar')
const designPatternSideBar = require('./designPatternSideBar')
const csBasicSideBar = require('./csBasicSideBar')
const aboutSideBar = require('./aboutSideBar')
const FrontEndSideBar = require('./FrontEndSideBar')

module.exports = {
  title: '五年前端三年面试',
  // 网页描述
  description: '前端技术，面试',
  head: [
    // icon
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // meta
    ['meta', { name: 'robots', content: 'all' }],
    ['meta', { name: 'author', content: 'johan' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'javascript知识体系, React框架, javascript学习路线,js, webpack, 前端的一切, 前端面试, 知识体系, js技术栈, git, http, 算法, 数据结构',
      },
    ],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ba0bbc21ba293c7cf67f60c2d4889ee5";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      
        `,
    ],
  ],
  // 端口号
  port: 3000,
  markdown: {
    // 代码块行号
    lineNumbers: true,
  },
  themeConfig: {
    // 最后更新时间
    lastUpdated: '最后更新时间',
    // 仓库链接label
    repoLabel: 'Github',
    sidebarDepth: 0,
    // 导航
    nav: [
      // { text: "导读", link: "/Introduction/" },
      { text: '前端基础', link: '/Introduction/前端基础文章目录.md' },
      //   {
      //     text: "前端基础",
      //     items: [
      //       { text: "JavaScript", link: "/JavaScript/" },
      //       { text: "ES6", link: "/ES6/" },
      //       { text: "Browser", link: "/Browser/" },
      //       { text: "HTML", link: "/HTML/" },
      //       { text: "CSS", link: "/CSS/" },
      //       { text: "Jquery", link: "/Jquery/高效jquery.md" },
      //     ],
      //   },
      { text: 'React', link: '/React/' },
      { text: '后端', link: '/Introduction/后端文章目录.md' },
      //   {
      //     text: "后端",
      //     items: [
      //       { text: "Node基础", link: "/Node/Node基本面.md" },
      //       { text: "Koa2", link: "/Koa2/koa2-teach.md" },
      //       { text: "Express", link: "/Express/express-teach.md" },
      //       { text: "PM2", link: "/Node/PM2.md" },
      //       { text: "Mongoose", link: "/Mongoose/mongoose-teach.md" },
      //       { text: "Mysql", link: "/Mysql/mysql-teach.md" },
      //       { text: "Redis", link: "/Redis/redis-teach.md" },
      //       { text: "Go", link: "/Go/go.md" },
      //     ],
      //   },
      { text: '大前端', link: '/Introduction/大前端文章目录.md' },
      //   {
      //     text: "大前端",
      //     items: [
      //       { text: "Performance", link: "/Performance/介绍.md" },
      //       { text: "webpack", link: "/webpack" },
      //       { text: "WebApp", link: "/WebApp/Foreword.md" },
      //       { text: "Flutter", link: "/Flutter/Foreword.md" },
      //       { text: "微信公众号", link: "/WeChat/Foreword.md" },
      //       { text: "微信小程序", link: "/WxApp/Foreword.md" },
      //       { text: "babel", link: "/webpack/babel/基础知识.md" },
      //       { text: "vite", link: "/webpack/vite/速度与激情之Vite初体验.md" },
      //       { text: "RN", link: "/RN/Foreword.md" },
      //     ],
      //   },
      {
        text: '多多益善',
        items: [
          //   { text: "数据结构与算法", link: "/DataStructure&Algorithm/" },
          {
            text: '数据结构与算法',
            link: 'https://github.com/johanazhu/leetcode',
          },
          { text: 'HTTP', link: '/HTTP/' },
          { text: 'Docker', link: '/Docker/' },
          { text: 'Git', link: '/Git/' },
          { text: 'Linux', link: '/Linux/' },
          { text: '设计模式', link: '/DesignPattern/' },
          { text: 'CS基础', link: '/CSBasic/' },
        ],
      },
      {
        text: '关于',
        link: '/About/about.md',
      },
    ],
    sidebar: {
      '/JavaScript': jsSideBar(),
      '/ES6': ES6SideBar(),
      '/Browser': BrowserSideBar(),
      '/Performance': PerformanceSideBar(),
      '/React': reactSideBar(),
      '/Node': nodeSideBar(),
      '/Express': nodeSideBar(),
      '/Koa2': nodeSideBar(),
      '/Mongoose': nodeSideBar(),
      '/Mysql': nodeSideBar(),
      '/Redis': nodeSideBar(),
      '/webpack': webpackSideBar(),
      '/WebApp': bigFrondSideBar(),
      '/Flutter': bigFrondSideBar(),
      '/RN': bigFrondSideBar(),
      '/WeChat': bigFrondSideBar(),
      '/WxApp': bigFrondSideBar(),
      '/HTML': frontEndBasicSideBar(),
      '/CSS': frontEndBasicSideBar(),
      '/Jquery': frontEndBasicSideBar(),
      '/HTTP': HttpSideBar(),
      '/Docker': DockerSideBar(),
      '/Git': ArmorySideBar(),
      '/Linux': ArmorySideBar(),
      '/DesignPattern': designPatternSideBar(),
      '/CSBasic': csBasicSideBar(),
      '/About': aboutSideBar(),
      '/Others': aboutSideBar(),
      '/Introduction': FrontEndSideBar(),
    },
  },
  configureWebpack: {
    resolve: {
      // 静态资源的别名
      alias: {
        '@images': './public/images',
        // "@public": "./public",
      },
    },
  },
  smoothScroll: true,
  // typora 中使用图片资源转译成乱码
  markdown: {
    // ......
    extendMarkdown: (md) => {
      md.use(require('markdown-it-disable-url-encode'))
    },
  },
  // 插件
  // plugins: ['@vuepress/back-to-top']
}

// ['@vuepress/back-to-top'],
// [
//   'copyright',
//   {
//     noCopy: true, // 选中的文字将无法被复制
//     minLength: 100, // 如果长度超过 100 个字符
//   },
// ],
