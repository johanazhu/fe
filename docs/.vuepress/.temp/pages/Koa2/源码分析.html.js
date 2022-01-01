export const data = {
  "key": "v-d1da2792",
  "path": "/Koa2/%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.html",
  "title": "从浅入深了解Koa2源码",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "简单回顾下",
      "slug": "简单回顾下",
      "children": [
        {
          "level": 3,
          "title": "什么是koa2",
          "slug": "什么是koa2",
          "children": []
        },
        {
          "level": 3,
          "title": "源码重点",
          "slug": "源码重点",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "源码结构",
      "slug": "源码结构",
      "children": []
    },
    {
      "level": 2,
      "title": "application",
      "slug": "application",
      "children": [
        {
          "level": 3,
          "title": "先看 listen",
          "slug": "先看-listen",
          "children": []
        },
        {
          "level": 3,
          "title": "callback",
          "slug": "callback",
          "children": []
        },
        {
          "level": 3,
          "title": "错误处理",
          "slug": "错误处理",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "context.js",
      "slug": "context-js",
      "children": []
    },
    {
      "level": 2,
      "title": "request.js 和 response.js",
      "slug": "request-js-和-response-js",
      "children": []
    },
    {
      "level": 2,
      "title": "参考资料",
      "slug": "参考资料",
      "children": []
    }
  ],
  "git": {},
  "filePathRelative": "Koa2/源码分析.md"
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
