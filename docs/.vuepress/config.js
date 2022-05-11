const { defaultTheme } = require('@vuepress/theme-default');
const { sitemapPlugin } = require("vuepress-plugin-sitemap2");
const { pwaPlugin } = require('@vuepress/plugin-pwa');
const { pwaPopupPlugin } = require('@vuepress/plugin-pwa-popup')

const jsSideBar = require('./sibeBar/jsSideBar');
const reactSideBar = require('./sibeBar/reactSideBar');
const bigFrondSideBar = require('./sibeBar/bigFrondSideBar');
const AboutSideBar1 = require('./sibeBar/AboutSideBar1');
console.log('AboutSideBar1', AboutSideBar1)
const ArmorySideBar = require('./sibeBar/ArmorySideBar');
const HttpSideBar = require('./sibeBar/HttpSideBar');
const DockerSideBar = require('./sibeBar/DockerSideBar');
const frontEndBasicSideBar = require('./sibeBar/frontEndBasicSideBar');
const webpackSideBar = require('./sibeBar/webpackSideBar');
const nodeSideBar = require('./sibeBar/nodeSideBar');
const ES6SideBar = require('./sibeBar/ES6SideBar');
const BrowserSideBar = require('./sibeBar/BrowserSideBar');
const PerformanceSideBar = require('./sibeBar/PerformanceSideBar');
const designPatternSideBar = require('./sibeBar/designPatternSideBar');
const csBasicSideBar = require('./sibeBar/csBasicSideBar');
const FrontEndSideBar = require('./sibeBar/FrontEndSideBar');
const EngineeredSideBar = require('./sibeBar/EngineeredSideBar');
const ReadSideBar = require('./sibeBar/ReadSideBar');
const InterviewSideBar = require('./sibeBar/InterviewSideBar');

module.exports = {
    title: '五年前端三年面试',
    keywords:
        'Jahan johnnyjoestar azhubaby js react webpack babel browser html css jquery git http docker weapp miniapp flutter RN designPattern cssbasic about JavaScript学习路线 JavaScript知识体系 React框架 前端的一切 前端面试 知识体系 前端工程化 大前端',
    // 网页描述
    description: '元前端，前端宇宙，前端知识地图',
    head: [
        // icon
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
        // meta
        ['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { name: 'robots', content: 'all' }],
        ['meta', { name: 'author', content: 'johan' }],
        [
            'meta',
            { name: 'baidu-site-verification', content: 'code-46tFIW7e9e' },
        ],
        [
            'meta',
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
        ],
        [
            'meta',
            {
                name: 'keywords',
                content:
                    'jahan johnnyjoestar azhubaby js react webpack babel browser html css jquery git http docker weapp miniapp flutter RN designPattern cssbasic about JavaScript学习路线 JavaScript知识体系 React框架 前端的一切 前端面试 知识体系 前端工程化 大前端',
            },
        ],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        // [
        //     'script',
        //     {},
        //     `
        // var _hmt = _hmt || [];
        // (function() {
        //   var hm = document.createElement("script");
        //   hm.src = "https://hm.baidu.com/hm.js?ba0bbc21ba293c7cf67f60c2d4889ee5";
        //   var s = document.getElementsByTagName("script")[0];
        //   s.parentNode.insertBefore(hm, s);
        // })();
        //   `,
        // ],
    ],
    // 端口号
    port: 3000,
    markdown: {
        // 代码块行号
        lineNumbers: true,
    },

    // 主题和它的配置
    theme: defaultTheme({
        // 在这里进行配置
        // logo:"/logo.png",
        // contributors:false,
        // contributorsText: '贡献者',
        // lastUpdatedText:'上次更新',
        // notFound:['这就戳碰到我知识的盲点了'],
        // editLinkText:"编辑页面",
        // docsRepo:"https://github.com/shengxinjing/it-roadmap",
        // docsBranch:"main",
        // docsDir:"docs",
        // 最后更新时间
        lastUpdated: '最后更新时间',
        // 仓库链接label
        repoLabel: 'Github',
        sidebarDepth: 0,
        // 导航
        navbar: [
            { text: 'Introduction', link: '/Introduction/' },
            { text: 'JavaScript', link: '/JavaScript/' },
            { text: 'React', link: '/React/' },
            { text: 'Interview', link: '/Interview/' },
            // { text: "Node", link: "/Node/" },
            // {
            //     text: "More",
            //     children: [
            //         //   { text: "数据结构与算法", link: "/DataStructure&Algorithm/" },
            //         // {
            //         //   text: '数据结构与算法',
            //         //   link: 'https://github.com/johanazhu/leetcode',
            //         // },
            //         { text: "HTTP", link: "/HTTP/" },
            //         { text: "Docker", link: "/Docker/" },
            //         { text: "Git", link: "/Git/" },
            //         { text: "Linux", link: "/Linux/" },
            //         { text: "DesignPattern", link: "/DesignPattern/" },
            //         { text: "CSBasic", link: "/CSBasic/" },
            //         { text: "About", link: "/About/about.md" },
            //     ],
            // },
            {
                text: 'Github',
                link: 'https://github.com/johanazhu/fe',
            },
        ],
        sidebar: {
            '/JavaScript': jsSideBar(),
            '/ES6': ES6SideBar(),
            '/Browser': BrowserSideBar(),
            '/Performance': PerformanceSideBar(),
            '/React': reactSideBar(),
            '/Node': nodeSideBar(),
            '/Koa2': nodeSideBar(),
            '/Express': nodeSideBar(),
            '/PM2': nodeSideBar(),
            '/MongoDB': nodeSideBar(),
            '/Mysql': nodeSideBar(),
            '/Redis': nodeSideBar(),
            '/GO': nodeSideBar(),
            '/webpack': webpackSideBar(),
            '/WebApp': bigFrondSideBar(),
            '/Flutter': bigFrondSideBar(),
            '/ReactNative': bigFrondSideBar(),
            '/WeChat': bigFrondSideBar(),
            '/MiniApp': bigFrondSideBar(),
            '/Interview': InterviewSideBar(),
            '/HTML': frontEndBasicSideBar(),
            '/CSS': frontEndBasicSideBar(),
            '/Jquery': frontEndBasicSideBar(),
            '/HTTP': HttpSideBar(),
            '/Docker': DockerSideBar(),
            '/Git': ArmorySideBar(),
            '/Linux': ArmorySideBar(),
            '/DevOps': ArmorySideBar(),
            '/Engineered': EngineeredSideBar(),
            '/MicroFrontend': EngineeredSideBar(),
            '/StandardGuide': EngineeredSideBar(),
            '/DesignPattern': designPatternSideBar(),
            '/CSBasic': csBasicSideBar(),
            '/Read': ReadSideBar(),
            // '/About': AboutSideBar(),
            // '/Others': AboutSideBar(),
            '/Introduction': FrontEndSideBar(),
        },
    }),
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
    markdown: {
        linkify: true,
    },
    plugins: [
        pwaPlugin({
            // 配置项
            skipWaiting: true,
        }),
        pwaPopupPlugin({
            // 配置项
            message: '发现新内容可用',
            buttonText: '刷新',
        }),
        sitemapPlugin({
            // 配置选项
            hostname: 'https://fe.azhubaby.com/'
        }),
        [
            '@vuepress/plugin-docsearch',
            {
                appId: 'LE7T3Q08D4',
                apiKey: 'b1b28febea61eaf77ca3c462d41cb629',
                indexName: 'azhubaby',
                // searchParameters: {
                //     facetFilters: ['tags:v2'],
                // },
                locales: {
                    placeholder: "搜索文档"
                },
            },
        ],
        [
            'seo', {
                siteTitle: (_, $site) => '五年前端三年面试',
                title: $page => $page.title,
                description: $page => $page.frontmatter.description,
                author: (_, $site) => '约翰',
                twitterCard: _ => 'summary_large_image',
                type: $page => 'article',
                url: (_, $site, path) => 'https://fe.azhubaby.com' + path,
                image: ($page, $site) => "https://fe.azhubaby.com/favicon.ico",
                publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
                modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
            }
        ]
    ]
    // plugins: [
    //     '@vuepress/search',
    //     [
    //         '@vuepress/plugin-docsearch',
    //         {
    //             apiKey: '3f380ab4ce077e42f47b8ccd34e94a65',
    //             indexName: 'shengxinjing',
    //             searchParameters: {
    //                 facetFilters: ['tags:v2'],
    //             },
    //             locales: {
    //                 placeholder: "搜索文档"
    //             },
    //         },
    //     ],
    // ],
    // typora 中使用图片资源转译成乱码
    // markdown: {
    //     // ......
    //     extendMarkdown: (md) => {
    //         md.use(require("markdown-it-disable-url-encode"));
    //     },
    // },
    // 插件
    //   plugins: ['@vuepress/back-to-top']
    // plugins: [
    //     [
    //         'vuepress-plugin-comment',
    //         {
    //             choosen: 'gitalk',
    //             options: {
    //                 clientID: '4686cfa8a5bef7222000',
    //                 clientSecret: '563d381c24ec5979c421b700ccd0920277c9c3a6',
    //                 repo: 'fe',
    //                 owner: 'johanazhu',
    //                 admin: ['johanazhu'],
    //                 distractionFreeMode: false,
    //             },
    //         },
    //     ],
    // ],
};

// ['@vuepress/back-to-top'],
// [
//   'copyright',
//   {
//     noCopy: true, // 选中的文字将无法被复制
//     minLength: 100, // 如果长度超过 100 个字符
//   },
// ],
