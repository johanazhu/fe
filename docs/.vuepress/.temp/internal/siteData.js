export const siteData = {
  "base": "/",
  "lang": "en-US",
  "title": "五年前端三年面试",
  "description": "前端知识地图",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "robots",
        "content": "all"
      }
    ],
    [
      "meta",
      {
        "name": "author",
        "content": "johan"
      }
    ],
    [
      "meta",
      {
        "name": "keywords",
        "content": "jahan johnnyjoestar azhubaby js react webpack babel browser html css jquery git http docker weapp miniapp flutter RN designPattern cssbasic about JavaScript学习路线 JavaScript知识体系 React框架 前端的一切 前端面试 知识体系 前端工程化 大前端"
      }
    ],
    [
      "meta",
      {
        "name": "apple-mobile-web-app-capable",
        "content": "yes"
      }
    ],
    [
      "script",
      {},
      "\n        var _hmt = _hmt || [];\n        (function() {\n          var hm = document.createElement(\"script\");\n          hm.src = \"https://hm.baidu.com/hm.js?ba0bbc21ba293c7cf67f60c2d4889ee5\";\n          var s = document.getElementsByTagName(\"script\")[0];\n          s.parentNode.insertBefore(hm, s);\n        })();\n          "
    ]
  ],
  "locales": {}
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
