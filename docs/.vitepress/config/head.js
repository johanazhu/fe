// 敏感配置从根目录 .env 读取（见 .env.example），未配置时对应项不注入 head
const {
    BAIDU_SITE_VERIFICATION,
    BAIDU_ANALYTICS_ID,
    GOOGLE_ANALYTICS_ID,
    PLAUSIBLE_DOMAIN,
    PLAUSIBLE_SCRIPT_SRC,
    CLARITY_ID,
} = process.env;

export const title = "五年前端三年面试";
export const socialTitle = "五年前端三年面试 - Johnny 的前端知识地图";
export const description =
    "这里是 Johnny 的前端知识地图——五年前端三年面试，内容包括 JavaScript、React、前端、后端、浏览器、HTTP、性能优化、面试真题、前端面试、React面试等方面的编程知识";
const keywords =
    "Johnny的编程知识库,azhubaby,javascript,js,React,browser,git,JavaScript知识体系,面试,前端面试,react面试题,web前端面试,js面试题";
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
    ...(BAIDU_SITE_VERIFICATION
        ? [["meta", { name: "baidu-site-verification", content: BAIDU_SITE_VERIFICATION }]]
        : []),
    // ["meta", { name: "shenma-site-verification", content: process.env.SHENMA_SITE_VERIFICATION }],
    ...(BAIDU_ANALYTICS_ID
        ? [["script", { src: `https://hm.baidu.com/hm.js?${BAIDU_ANALYTICS_ID}` }]]
        : []),
    // google 统计
    ...(GOOGLE_ANALYTICS_ID
        ? [
              [
                  'script',
                  {
                      async: '',
                      src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`,
                  },
              ],
              [
                  'script',
                  {},
                  `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${GOOGLE_ANALYTICS_ID}');`,
              ],
          ]
        : []),
    // google 广告
    // ...(process.env.GOOGLE_ADSENSE_CLIENT
    //     ? [
    //           [
    //               'script',
    //               {
    //                   async: '',
    //                   crossorigin: 'anonymous',
    //                   src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADSENSE_CLIENT}`,
    //               },
    //           ],
    //       ]
    //     : []),
    // 自定义埋点
    // ...(process.env.UMAMI_WEBSITE_ID && process.env.UMAMI_SCRIPT_SRC
    //     ? [
    //           [
    //               'script',
    //               {
    //                   defer: true,
    //                   'data-website-id': process.env.UMAMI_WEBSITE_ID,
    //                   src: process.env.UMAMI_SCRIPT_SRC,
    //               },
    //           ],
    //       ]
    //     : []),
    // plausible
    ...(PLAUSIBLE_DOMAIN && PLAUSIBLE_SCRIPT_SRC
        ? [
              [
                  'script',
                  {
                      defer: true,
                      'data-domain': PLAUSIBLE_DOMAIN,
                      src: PLAUSIBLE_SCRIPT_SRC,
                  },
              ],
          ]
        : []),
    // microsoft analytics
    ...(CLARITY_ID
        ? [
              [
                  'script',
                  {},
                  `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}")`,
              ],
          ]
        : []),
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
