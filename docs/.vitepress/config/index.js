// const { defaultTheme } = require('@vuepress/theme-default');
// const { sitemapPlugin } = require('vuepress-plugin-sitemap2');
// const { pwaPlugin } = require('@vuepress/plugin-pwa');
// const { pwaPopupPlugin } = require('@vuepress/plugin-pwa-popup');
// const { docsearchPlugin } = require('@vuepress/plugin-docsearch');
// const { seoPlugin } = require('vuepress-plugin-seo2');
import { defineConfig } from 'vitepress';
import themeConfig from './themeConfig';

export default defineConfig({
    title: '五年前端三年面试',
    keywords:
        'Jahan johnnyjoestar azhubaby js react webpack babel browser html css jquery git http docker weapp miniapp flutter RN designPattern cssbasic about JavaScript学习路线 JavaScript知识体系 React框架 前端的一切 前端面试 知识体系 前端工程化 大前端',
    description: '元前端，前端宇宙，前端知识地图',

    // lastUpdated: true,
    // cleanUrls: 'without-subfolders',

    // base: process.env.BASE || '/',
    head: [
        // icon
        [
            'link',
            {
                rel: 'alternate icon',
                href: '/favicon-16x16.png',
                type: 'image/png',
                sizes: '16x16',
            },
        ],
        // ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        [
            'link',
            {
                rel: 'mask-icon',
                href: '/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
        // meta
        ['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { name: 'robots', content: 'all' }],
        ['meta', { name: 'author', content: 'johan' }],
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
        [
            'script',
            {
                src: 'https://hm.baidu.com/hm.js?d62573a82a77fc885b0f1cbf8a6ab5e4',
            },
        ],
    ],

    // 端口号
    // port: 3000,
    markdown: {
        // 代码块行号
        lineNumbers: true,
        linkify: true,
    },

    themeConfig,
});

// module.exports = {

//     smoothScroll: true,
//     plugins: [
//         pwaPlugin({
//             // 配置项
//             skipWaiting: true,
//         }),
//         pwaPopupPlugin({
//             // 配置项
//             message: '发现新内容可用',
//             buttonText: '刷新',
//         }),
//         sitemapPlugin({
//             // 配置选项
//             hostname: 'https://fe.azhubaby.com/',
//         }),
//         docsearchPlugin({
//             // 配置项
//             appId: 'LE7T3Q08D4',
//             apiKey: 'b1b28febea61eaf77ca3c462d41cb629',
//             indexName: 'azhubaby',
//             // searchParameters: {
//             //     facetFilters: ['tags:v2'],
//             // },
//             locales: {
//                 placeholder: '搜索文档',
//             },
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
