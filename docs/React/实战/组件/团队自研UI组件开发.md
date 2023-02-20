最近团队在开发组件 UI 化，笔者正参与其中，团队内使用的是阿里巴巴开源的 UmiJS，脚手架提供了文件编写和组件开发所需要的所有配置，加上以 typescript 来写组件，由 rollup 打包应用，使得组件的质量和体积有了一定的保障。

但，作为一名开发，不能仅仅满足对业务组件的实现，更应该对其原理进行探索。本文不对 UmiJS 的源码进行探讨，浅析一个微小组件如何开发到展示，实现从零到发布一个组件的全过程。

所需知识量：了解 webpack 基本配置，npm 以及 react

第一步：npm init

首先我们需要初始化一个项目，

```bash
npm init -y
```

再在生成的 package.json 中填上必要的信息。例如 作者名，关键字等等

如下配置

```javascript
{
  "name": "react-azhu-btn",
  "version": "1.0.0",
  "description": "一个微小的组件",
  "main": "lib/index.js",
  "scripts": {
  },
  "keywords": [
    "react",
    "react-dom",
    "azhu",
    "component",
    "btn",
  ],
  "files": [
    "lib"
  ],
  "repository": {
    "type": "git",
    "url": "git@github.com:azhubaby/react-azhu-btn.git"
  },
  "bugs": {
    "url": "https://github.com/azhubaby/react-azhu-btn/issues"
  },
}
```

第二步：配置 webpack

我们知道 webpack 是资源打包器，他打包所有的静态资源，但他本身只能打包 JavaScript，如果你要打包图片，css 甚至是字体，都需要配置相对应的 loader。例如以下这次脚手架中所需要的 loader

| loader 名      | 作用                                                   |
| -------------- | ------------------------------------------------------ |
| babel-loader   | 解析 babel                                             |
| style-loader   | 讲 css 挂载到文档上                                    |
| css-loader     | 解析 css                                               |
| postcss-loader | 配置 postcss 中的 autoprefixer，可给浏览器加前缀，省去 |
|                |                                                        |
|                |                                                        |
|                |                                                        |

笔者最近在开发团队中的 UI

用的是 umi 来开发组件库

umi 的优点罗列出来

umi 很好，虽然他很好用，但是我们需要知其所以然，

本文将从零打造一 UI 组件脚手架，跟上节奏

配置环境，

本次教程采用 webpack4 来打包（rollup 和 webpack 各有千秋，工作中 webpack 使用更多，故用之）

html-webpack-plugin

clean-webpack-plugin

css 我们用 scss

postcss

对于图标我们使用

file-loader

我们再做一个启动文件来查看我们所做的组件

webpack.example.js

webpack.build.js

打包文件

再将打包上传至 npm 上，

npm login XX

npm publish

我们甚至可以将它写成一个脚本，需要发布时可以 npm pushlish

好了，这就是本篇的所有内容，如果觉得还行，请不要吝啬你的“再看”

这是一件简单的微小组件的开发，

如果需要完善，其实还可以加上测试用例，文档撰写功能

测试用例推荐使用 jest，这是目前比较流行的测试工具

文档就有多种选择，如果想单独开发一个库，可使用阿里 rc-tools 工具，

如果你和我样觉得 rc-tools 的 example 样式太难看，可以看看 docz，它也很方便

如果是是个造轮子主义者，不妨看看 markdown-it，将它集成在 webpack 中，我的文档我做主

总之，方案很多，供君细品

babel 相关

https://github.com/Kehao/Blog/issues/1
