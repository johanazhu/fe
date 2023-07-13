import { withPwa } from "@vite-pwa/vitepress";
import Container from 'markdown-it-container'
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
        markdown: {
            lineNumbers: true,
            linkify: true,
            externalLinks: {
                target: '_blank', rel: 'nofollow noopener noreferrer'
            },
            theme: 'monokai',
            config: md => {
                md.use(Container, 'card', {
                    render: (tokens, idx) => {
                        const token = tokens[idx]

                        const title = token.info.trim().slice(5).trim()

                        const isCardBordered = token.attrs && token.attrs.some(([key, _]) => key === 'bordered')

                        const titleHtml = md.render(`## ${title}`)
                        const demoContent = title ? `<template #title>${titleHtml}</template>` : ''

                        return token.nesting === 1 ? `<Demo :class="[${isCardBordered} && 'vp-demo-bordered']">${demoContent}` : '</Demo>\n'
                    },
                })

                md.use(Container, 'code', {
                    render: (tokens, idx) => {
                        const token = tokens[idx]

                        // console.log('token :>> ', token)
                        const demoName = token.info.trim().slice(5).trim()

                        return token.nesting === 1 ? `<template #demo><${demoName} /></template><template #code>` : '</template>\n'
                    },
                })

                md.use(Container, 'after-demo', {
                    render: (tokens, idx) => {
                        const token = tokens[idx]

                        return token.nesting === 1 ? '<template #after-demo>' : '</template>\n'
                    },
                })
            },
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
        // 等待官方完善
        // async transformHead({ pageData }) {
        //     const head = []

        //     head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
        //     head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])

        //     return head
        // }
    })
    // https://github.com/vuejs/vitepress/issues/883
    // application/ld+json 暂停等待官方支持
);
