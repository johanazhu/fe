import { withPwa } from "@vite-pwa/vitepress";
import { defineConfig } from "vitepress";
import themeConfig from "./themeConfig";
import { pwa } from '../script/pwa';
import { head, title, description } from './head';

const links = []

export default withPwa(
    defineConfig({
        title,
        description,
        head,
        markdown: {
            // theme: 'dracula',
            math: true,
            codeTransformers: [
                // We use `[!!code` in demo to prevent transformation, here we revert it back.
                {
                    postprocess(code) {
                        return code.replace(/\[\!\!code/g, '[!code')
                    }
                }
            ]
        },

        themeConfig,

        pwa,
        sitemap: {
            hostname: 'https://fe.azhubaby.com',
            transformItems(items) {
                return items.filter((item) => !item.url.includes('migration'))
            }
        },
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
        // buildEnd: async ({ outDir }) => {
        //     const sitemap = new SitemapStream({ hostname: 'https://fe.azhubaby.com/' })
        //     const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
        //     sitemap.pipe(writeStream)
        //     links.forEach((link) => sitemap.write(link))
        //     sitemap.end()
        //     await new Promise((r) => writeStream.on('finish', r))
        // },
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
