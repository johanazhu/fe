export const data = {
  "key": "v-1f23f86a",
  "path": "/webpack/webpack%E9%85%8D%E7%BD%AE%E7%AF%87.html",
  "title": "Webpack 配置篇",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "参考资料",
      "slug": "参考资料",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1640996999000,
    "contributors": [
      {
        "name": "johanazhu",
        "email": "t511069160@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "webpack/webpack配置篇.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
