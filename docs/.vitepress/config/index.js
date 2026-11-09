// 必须最先加载 .env，保证后续模块读取到的 process.env 已就绪
import './env';
import { execFileSync } from 'node:child_process';
import { withPwa } from "@vite-pwa/vitepress";
import { defineConfig } from "vitepress";
import themeConfig from "./themeConfig";
import { pwa } from '../script/pwa';
import { head, title, description } from './head';

const links = []

// vitepress 的 lastUpdated 会为每个 md 单独 spawn 一次 git log，
// 400+ 文件并发会耗尽构建沙箱（EdgeOne）的文件描述符（EMFILE 崩溃）。
// 改为启动时一次性批量获取各文件的最后提交时间，再经 transformPageData 注入。
// git log 按时间倒序，文件首次出现即最近一次提交。
function collectLastUpdated() {
    const map = new Map()
    try {
        const out = execFileSync(
            'git',
            ['-c', 'core.quotePath=false', 'log', '--pretty=format:%at', '--name-only', '--', 'docs'],
            { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
        )
        let ts = 0
        for (const line of out.split('\n')) {
            const s = line.trim()
            if (!s) continue
            if (/^\d+$/.test(s)) {
                ts = Number(s) * 1000
            } else if (s.startsWith('docs/')) {
                const rel = s.slice(5)
                if (!map.has(rel)) map.set(rel, ts)
            }
        }
    } catch {
        // 无 git 环境（如浅克隆外的纯导出目录）时静默降级，页面不显示更新时间
    }
    return map
}

const lastUpdatedMap = collectLastUpdated()

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
        // 关闭 vitepress 逐页 git log，改用上方批量收集 + transformPageData 注入
        lastUpdated: false,
        transformPageData(pageData) {
            const ts = lastUpdatedMap.get(pageData.relativePath)
            if (ts) return { lastUpdated: ts }
        },
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
