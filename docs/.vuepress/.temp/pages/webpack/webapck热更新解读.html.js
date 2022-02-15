export const data = {
  "key": "v-0df75183",
  "path": "/webpack/webapck%E7%83%AD%E6%9B%B4%E6%96%B0%E8%A7%A3%E8%AF%BB.html",
  "title": "webpack 热更新 原理解析",
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
  "filePathRelative": "webpack/webapck热更新解读.md"
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
