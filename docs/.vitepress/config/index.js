import { withPwa } from "@vite-pwa/vitepress";
import { defineConfig, PageData } from "vitepress";
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import themeConfig from "./themeConfig";
import { pwa } from '../script/pwa';
import { head } from './head';

const links = []

export default withPwa(
    defineConfig({
        title: "五年前端三年面试",
        description: "约翰的前端前端，元前端，前端知识地图，取名为五年前端三年面试。这里记录着一个（前端）程序员的自我成长史",
        head,

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
        lastUpdated: true,
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
        },
        // https://vitepress.dev/reference/site-config#transformhead
        async transformHead({ pageData }) {
            const head = []

            head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
            head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])

            return head
        }
    })
);
