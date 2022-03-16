# React SSR

## ssr 增量开发 难点以及解决方案

什么是 ssr

为什么要做 ssr

ssr 同构是什么？

难点在哪里？注水和脱水

如果用 hook 的话，有什么技术难点

为什么增量开发中加了后会有难度，

单页面和多页面应用的结合会有什么奇妙的化学反应

市场上有什么解决方案？

这位大哥的解决方案？

我的思考

我们现在公司出现的具体情况，

原本是 Node 模板渲染，现在像用单页面应用 React 来解决问题

一句话解释：

同构：客户端和服务端渲染的一个整合，让代码执行两次（其实就一次，通过一些算法标识如果 key 一致就不在渲染）。这句话很奇怪，为什么 key 一致就不渲染了

react 所写的单页面应用，通过 react-dom/server 中的 renderToString 把 React 组件转换成 字符串片段 A，用户访问浏览器路由 A（路由扔给客户端），浏览器返回 字符串片段 A，因为已经在服务端渲染过，所有浏览器（客户端）加载页面的时候只是渲染字符串而已，速度很快。

session 和 token

token 我直接存在客户端里，去请求接口的时候，通过 header 携带过去，因为加密过，别人无法篡改，到了服务器端，服务端端解析 token，再做判断

1.用户登录校验，校验成功后返回 token 给客户端，

2.客户端收到 token 后保存至客户端（一般用 localStorage 保存）

3.客户端每次访问 API 时携带 Token 到服务器端

4.服务器端校验 token，成功返回请求数据，失败返回错误码

Token 的优势：

无状态、可扩展

在客户端存储的 token 是无状态的，并且能够被扩展。如果用 session，负载均衡一弄你的用户信息从一个服务器到另一个服务器，你还需要在两个服务器中打个桥，如果服务器一多，你在服务器端做的时候就更多了。

而 token 本身就是无状态的，存储在客户端，一省了 session 服务器，二少了很多运维的操作，可扩展性完爆 session

安全性

请求中发送 token 而不再是发送 cookie 能够防止 CSRF（跨站请求伪造）。即使在客户端使用 cookie 存储 token，cookie 也仅仅是个存储机制而不是用于认证。不将信息存储在 Session 中，让我们少了对 session 操作

token 是有时效的，一段时间之后用户需要重新验证。我们

这个人有点牛逼 zz 小册作者

https://juejin.im/post/5d7deef6e51d453bb13b66cd

React 中同构（SSR）原理脉络梳理

https://juejin.im/post/5bc7ea48e51d450e46289eab

前端同构渲染的思考与实践

https://mp.weixin.qq.com/s?__biz=MzI2NjkxMjAxNQ==&mid=2247487580&idx=1&sn=50559bd9271eb28d3d9fad7adc1187ee&chksm=ea87b83cddf0312a3d7af7219b56c85a7817ced218acca835ed69ecebd5d580fbe521410d7ff&mpshare=1&scene=1&srcid=&sharer_sharetime=1586519527731&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd

React 代码需要经过打包编译才能执行

同构：客户端渲染和服务器端渲染的一个整合。让代码执行两次（其实就一次，通过一些算法标识如果 key 一致就不用再渲染）

同构：服务器一份代码，客户端一份代码

react 在 node 中写好，用 react-dom/server 中的 renderToString 把 React 组件转换成 字符串片段 A，用户访问浏览器路由 A，浏览器返回 字符串片段 A，因为已经在服务器端渲染过，所以这个字符串不用再重新渲染。

为什么模板不能共存。因为我要先打包文件，用 webpack 打包 node （express 搭起来的）服务。打包出来的是个 js 文件，就是用 webpack 打包出一个压缩过的 node 文件，里面的模板什么的就不能用了，为什么不能用。

模板依赖

react ssr 最终产物其实就是 SPA + SSR

其中 SSR 指的是在服务端渲染组件

而组件可以在服务端渲染的根本原因就是 虚拟 DOM

我们习惯使用 jsx 来编写 react 组件，但 jsx 只是一个抽象的语法糖，看上去是写组件，其实我们写的是对象。

react.hybrate

`hydrate` 是 React 中提供在初次渲染的时候，去复用原本已经存在的 DOM 节点，减少重新生成节点以及删除原本 DOM 节点的开销，来加速初次渲染的功能。

```javascript
{
  "presets": [
      [
          "@babel/preset-env",
          {
            "targets": {
                "browsers": [
                    ">1%",
                    "last 2 versions",
                    "not ie <= 8"
                ]
            }
          }
      ],
      "@babel/preset-react"
  ]
}
```

直接 webpack-dev-server

loading 的坑

react-loadable 源码分析

数据同构

componentDidMount 生命周期只会在浏览器端执行

会话保持，如果用 localStorage 的话 session 就存在客户端

每次进入页面的时候，传数据会不会太麻烦？

但是好像也就这个方法

刚开始做的数据同构时，我在前端代码中模拟请求，然后抱起来后，浏览器支持 ComponentDidMount，我不知道服务器支不支持，但是浏览器报错

```javascript
react-dom.development.js:88 Warning: Did not expect server HTML to contain the text node "
            " in <div>.
```

数据同构，就是将前端（客户端）的数据请求转移到服务端进行，将数据请求的行为写成一个静态方法，

等匹配对路由的情况下（例如在 list 页面），将数据写入到 html 上，用的是 react-router 中的 StaticRouter，用它的 context，但是这有个问题，服务端得到的 html 和客户端的不一致（客户端通过 react 的虚拟 dom 生成新的 dom 结构，但是因为没有数据，没有请求所以他会呈现另一个 dom 结构）。所以它会一闪之后（刚开始是有 html，后来被客户端接管），又变成了暂无数据。

我们需要让客户端的 dom 结构和服务端的一致。有很多方式，为了防止 xss，用 textarea 来注入数据。

这一过程，叫做 `数据脱水`，意思是将直出组件客户端的时候再传数据给客户端。

我们要讲数据赋值给 react 的虚拟 dom，这个过程叫做 `数据注水`

但还有有一个问题，如果当你从一个有数据的页面跳转到另一个页面，再从这个页面跳回去，数据会没有，因为我们现在的数据是通过服务端传递数据，做一下兼容，在初始化（componentDidMount）的时候，判断如果 this.state.data 中没有数据，那么就去请求数据

增量开发——从模板渲染到 react ssr

成为父亲

打包上线 ok

路由切换管理 ok

从 hbs 跳到单页面路由上，再从单页面路由跳回 hbs 上

可以用 window.location 跳转但是不是一本万利的

redux

热更新

按需加载 ok

高阶组件

eslint +prettie

sever 端压缩 production ok

cookie session 传值还没好

等级用户

ts

装饰器

生成一个中间件

放入到 express 中，使用这个中间件

ssr 的坑

less 不支持

按需加载不支持（起码以我的实力看不支持，主要自己太菜）

actions 异步

函数式写法

eslint

eslint-config-airbnb

eslint-config-prettier

eslint-plugin-prettier

eslint-plugin-react

```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
```

登录好了

权限问题

babel webpack 打包问题

babel 把 es6 的语言转换为 es5

如果 webpack 也想要用 需要配置 babel-loader

但是导出的文件是，你写什么导出什么

```javascript
   output: {
        filename: 'app.js',
        path: resolvePath('../dist/server'),
        +libraryTarget: 'commonjs2',
    },
```

```jsx
<List /> // 基础组件
<List.Group /> // “组”组件(主要是样式问题，上下划线，子组件的最后一项没有下划线)
<List.Addon /> // 前缀组件
<List.Suffix /> // 后缀组件
<List.Desc /> // 描述组件
<List.CardSelect /> // <CheckBox /> + <List.Group />
<List.Dashboard /> // <List.Addon>

// 使用
    <div>
    	{
            data.map((item) => {
                <List.Group>
                   	<List.Row></List.Row>
                    <List.Row></List.Row>
                    <List.Row></List.Row>
                    <List.Radio></List.Radio>
                </List.Group>
            })
        }
    </div>
```

Group 是强关联

react-router 如果要加二级路由，记得在 webpack output 处加 publicPath: '/'

Scroll 做成高阶组件

出现一个问题的时候要看一看是否是因为 没引入

跨域：

没有服务器帮忙的情况下

本地开发

webpack 里加 devServer 代理

https://juejin.im/post/5b972664f265da0a9624b50c

ssr react 组件加载

@type 类型错误

https://gist.github.com/oyvindym/ebd63bfa21fa5b07a9b31b2a4a5b3655

pre-render

后续添加

webpack 配置 alias 后 ts 找不到模块

https://www.xiejiahe.com/blog/detail/5cb2ec342bbcb67b4a5f3ed6

把 session 当做一个接口来调用

星期一：将 js 文件转换为 ts 文件。页面 processful 完成

星期二：数据窃取 模板页面与 ssr 页面的数据交互，页面 address 完成一半
