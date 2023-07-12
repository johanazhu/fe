import { withPwa } from "@vite-pwa/vitepress";
import { defineConfig } from "vitepress";
import themeConfig from "./themeConfig";
import { pwa } from '../script/pwa';

export default withPwa(
    defineConfig({
        title: "五年前端三年面试",
        description: "约翰的前端前端，元前端，前端知识地图，取名为五年前端三年面试。这里记录着一个（前端）程序员的自我成长史",
        head: [
            // icon
            [
                "link",
                {
                    rel: "alternate icon",
                    href: "/favicon-16x16.png",
                    type: "image/png",
                    sizes: "16x16",
                },
            ],
            [
                "link",
                { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
            ],
            ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
            [
                "link",
                {
                    rel: "mask-icon",
                    href: "/safari-pinned-tab.svg",
                    color: "#5bbad5",
                },
            ],
            // meta
            ["meta", { name: "msapplication-TileColor", content: "#da532c" }],
            ["meta", { name: "theme-color", content: "#ffffff" }],
            ["meta", { name: "robots", content: "all" }],
            ["meta", { name: "author", content: "johan" }],
            [
                "meta",
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
            [
                "meta",
                {
                    name: "keywords",
                    content:
                        `Jahan johnnyjoestar Johnny的编程知识库
                    azhubaby javascript js React webpack babel
                    browser html css jquery git http docker webapp
                    miniapp flutter ReactNative designPattern
                    Ruby on Rails goland python 实战
                   JavaScript学习路线 JavaScript知识体系 面试 前端面试 知识体系 前端工程化 大前端`,
                },
            ],
            ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
            // 百度搜索
            ["meta", { name: "baidu-site-verification", content: "codeva-nBcDOxSAzM" }],
            ["meta", { name: "sogou_site_verification", content: "InAQmyzgXB" }],
            [
                "script",
                {
                    src: "https://hm.baidu.com/hm.js?d62573a82a77fc885b0f1cbf8a6ab5e4",
                },
            ],
            // google analytics
            [
                'script',
                {
                    async: '',
                    src: 'https://www.googletagmanager.com/gtag/js?id=G-03YTWDXVL1',
                },
            ],
            [
                'script',
                {},
                "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-03YTWDXVL1');",
            ],
        ],

        // 端口号
        // port: 3000,
        markdown: {
            // 代码块行号
            lineNumbers: true,
            linkify: true,
            externalLinks: {
                target: '_blank', rel: 'nofollow noopener noreferrer'
            }
        },

        themeConfig,

        pwa,
    })
);

// module.exports = {

//     smoothScroll: true,
//     plugins: [
//         sitemapPlugin({
//             // 配置选项
//             hostname: 'https://fe.azhubaby.com/',
//         }),
//         seoPlugin({
//             hostname: 'https://fe.azhubaby.com/',
//             siteTitle: (_, $site) => '五年前端三年面试',
//             title: ($page) => $page.title,
//             description: ($page) => $page.frontmatter.description,
//             author: (_, $site) => '约翰',
//             twitterCard: (_) => 'summary_large_image',
//             type: ($page) => 'article',
//             url: (_, $site, path) => 'https://fe.azhubaby.com' + path,
//             image: ($page, $site) => 'https://fe.azhubaby.com/favicon.ico',
//             publishedAt: ($page) =>
//                 $page.frontmatter.date && new Date($page.frontmatter.date),
//             modifiedAt: ($page) =>
//                 $page.lastUpdated && new Date($page.lastUpdated),
//         }),
//     ],

// };
