export const data = {
  "key": "v-3e214e9b",
  "path": "/About/",
  "title": "关于我",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1629886487000,
    "contributors": [
      {
        "name": "johan",
        "email": "t511069160@qq.com",
        "commits": 1
      },
      {
        "name": "johanazhu",
        "email": "t511069160@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "About/README.md"
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
