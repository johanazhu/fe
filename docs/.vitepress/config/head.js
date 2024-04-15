
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
            content: `Jahan johnnyjoestar Johnny的编程知识库 azhubaby javascript js React webpack babel browser html css jquery git http docker webapp miniapp flutter ReactNative designPattern Ruby on Rails goland python 实战 JavaScript学习路线 JavaScript知识体系 面试 前端面试 知识体系 前端工程化 大前端`,
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
            'data-website-id': 'dd16c39f-869b-4ff1-b117-43d88cd93eb4',
            src: 'https://analytics.azhubaby.com/script.js'
        }
    ],
    // microsoft analytics
    [
        'script',
        {},
        `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "i1lhwlg2q4")`
    ],
    // google analytics
    [
        'script',
        {},
        "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-03YTWDXVL1');",
    ],

    // 社交媒体
    [
        'meta',
        { property: 'og:type', content: 'website' }
    ],
    [
        'meta',
        { property: 'og:site_name', content: '五年前端三年面试' }
    ],
    [
        'meta',
        { property: 'og:title', content: '五年前端三年面试' }
    ],
    [
        'meta',
        { property: 'og:image', content: 'https://fe.azhubaby.com/site_logo.png' }
    ],
    [
        'meta',
        { property: 'og:description', content: '这里是 Johnny 的前端知识地图，名曰五年前端三年面试，记录 JavaScript、React、大前端、后端、浏览器、HTTP、性能优化等方面的编程知识' }
    ],
    [
        'meta',
        { property: 'og:url', content: 'https://fe.azhubaby.com' }
    ],
    [
        'meta',
        { name: 'twitter:card', content: 'summary_large_image' }
    ]
]
