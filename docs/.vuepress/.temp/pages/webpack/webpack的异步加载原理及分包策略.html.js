export const data = {
  "key": "v-c474b122",
  "path": "/webpack/webpack%E7%9A%84%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD%E5%8E%9F%E7%90%86%E5%8F%8A%E5%88%86%E5%8C%85%E7%AD%96%E7%95%A5.html",
  "title": "webpack的异步加载原理及分包策略",
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
  "filePathRelative": "webpack/webpack的异步加载原理及分包策略.md"
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
