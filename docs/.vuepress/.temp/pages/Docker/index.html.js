export const data = {
  "key": "v-3a3c60d6",
  "path": "/Docker/",
  "title": "docker 导航",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "推荐视频课程",
      "slug": "推荐视频课程",
      "children": []
    },
    {
      "level": 2,
      "title": "参考资料",
      "slug": "参考资料",
      "children": []
    }
  ]
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
