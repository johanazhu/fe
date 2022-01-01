export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "lang": "en-US",
  "frontmatter": {
    "home": true,
    "heroImage": "./logo.png",
    "actionText": "快速了解 →",
    "actionLink": "/Introduction/",
    "features": [
      {
        "title": "Nothing is simple",
        "details": "Things Change Roll With It"
      },
      {
        "title": "允许一切如其所是",
        "details": "参差百态乃幸福之本源"
      },
      {
        "title": "不解释，不后悔，不抱怨",
        "details": "想要佩服谁，我就照镜子"
      }
    ],
    "footer": "Copyright © 2021-present johan"
  },
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": "README.md"
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
