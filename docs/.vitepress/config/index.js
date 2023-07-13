import { withPwa } from "@vite-pwa/vitepress";
import { defineConfig, PageData } from "vitepress";
import themeConfig from "./themeConfig";
import { pwa } from '../script/pwa';
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'

const links = []

export default withPwa(
    defineConfig({
        title: "五年前端三年面试 | Johnny的编程知识库",
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
                    content: `Jahan johnnyjoestar Johnny的编程知识库 azhubaby javascript js React webpack babel browser html css jquery git http docker webapp miniapp flutter ReactNative designPattern Ruby on Rails goland python 实战 JavaScript学习路线 JavaScript知识体系 面试 前端面试 知识体系 前端工程化 大前端`,
                },
            ],
            ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
            // 百度搜索
            ["meta", { name: "baidu-site-verification", content: "codeva-nBcDOxSAzM" }],
            ["meta", { name: "shenma-site-verification", content: "fe411010541768632c2c0f87027a13c6_1689208054" }],
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
        lastUpdated: "上次更新",
        // sitemap https://github.com/vuejs/vitepress/issues/520
        // https://github.com/maomao1996/daily-notes/issues/39
        transformHtml: (_, id, { pageData }) => {
            if (!/[\\/]404\.html$/.test(id))
                links.push({
                    // you might need to change this if not using clean urls mode
                    url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
                    lastmod: pageData.lastUpdated
                })
        },
        buildEnd: async ({ outDir }) => {
            const sitemap = new SitemapStream({ hostname: 'https://fe.azhubaby.com/' })
            const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
            sitemap.pipe(writeStream)
            links.forEach((link) => sitemap.write(link))
            sitemap.end()
            await new Promise((r) => writeStream.on('finish', r))
        }
    })
);
