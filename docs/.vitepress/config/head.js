

export const title = "五年前端三年面试";
export const socialTitle = "五年前端三年面试 - Johnny 的前端知识地图";
export const description =
    "这里是 Johnny 的前端知识地图——五年前端三年面试，内容包括 JavaScript、React、大前端、后端、浏览器、HTTP、性能优化、面试真题等方面的编程知识";
const keywords =
    "Johnny的编程知识库,azhubaby,javascript,js,React,browser,html5,css3,jquery,git,react,JavaScript学习路线,JavaScript知识体系,面试,前端面试,知识体系,大前端";
const socialOgImage = "https://fe.azhubaby.com/og.jpg";

export const head = [
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
            content: keywords,
        },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    // 百度搜索
    ["meta", { name: "baidu-site-verification", content: "codeva-nBcDOxSAzM" }],
    // ["meta", { name: "shenma-site-verification", content: "fe411010541768632c2c0f87027a13c6_1689208054" }],
    [
        "script",
        {
            src: "https://hm.baidu.com/hm.js?d62573a82a77fc885b0f1cbf8a6ab5e4",
        },
    ],
    // google 统计
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
    // google 广告
    [
        'script',
        {
            async: '',
            crossorigin: 'anonymous',
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8924495239960816',
        },
    ],
    // 自定义埋点
    [
        'script',
        {
            defer: true,
            'data-website-id': '234eb9cc-9737-415a-95ca-ee8ab0c57bc7',
            src: 'https://us.umami.is/script.js'
        }
    ],
    // plausible
    [
        'script',
        {
            defer: true,
            'data-domain': 'fe.azhubaby.com',
            src: 'https://click.pageview.click/js/script.js'
        }
    ],
    // microsoft analytics
    [
        'script',
        {},
        `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "i1lhwlg2q4")`
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['meta', { property: 'og:title', content: socialTitle }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:image', content: socialOgImage }],
    ['meta', { property: 'og:url', content: 'https://fe.azhubaby.com/' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image', }],
    ['meta', { property: 'twitter:title', content: socialTitle }],
    ['meta', { property: 'twitter:description', content: description }],
    ['meta', { property: 'twitter:image', content: socialOgImage }],
    ['meta', { property: 'twitter:site', content: "@JOJOhanbo" }],
]
