React 代码需要经过打包编译才能执行



同构：客户端渲染和服务器端渲染的一个整合。让代码执行两次（其实就一次，通过一些算法标识如果key一致就不用再渲染）



同构：服务器一份代码，客户端一份代码



react 在 node中写好，用react-dom/server 中的 renderToString 把React组件转换成 字符串片段A，用户访问浏览器路由A，浏览器返回 字符串片段A，因为已经在服务器端渲染过，所以这个字符串不用再重新渲染。

为什么模板不能共存。因为我要先打包文件，用webpack 打包node （express搭起来的）服务。打包出来的是个js文件，就是用webpack打包出一个压缩过的node文件，里面的模板什么的就不能用了，为什么不能用。

模板依赖







react ssr 最终产物其实就是 SPA + SSR

其中 SSR 指的是在服务端渲染组件

而组件可以在服务端渲染的根本原因就是 虚拟DOM

我们习惯使用jsx来编写 react 组件，但 jsx 只是一个抽象的语法糖，看上去是写组件，其实我们写的是对象。



react.hybrate

`hydrate`是 React 中提供在初次渲染的时候，去复用原本已经存在的 DOM 节点，减少重新生成节点以及删除原本 DOM 节点的开销，来加速初次渲染的功能。



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



直接webpack-dev-server

loading的坑

react-loadable 源码分析



数据同构

componentDidMount	生命周期只会在浏览器端执行



会话保持，如果用localStorage的话session就存在客户端

每次进入页面的时候，传数据会不会太麻烦？

但是好像也就这个方法



刚开始做的数据同构时，我在前端代码中模拟请求，然后抱起来后，浏览器支持ComponentDidMount，我不知道服务器支不支持，但是浏览器报错

react-dom.development.js:88 Warning: Did not expect server HTML to contain the text node "
            " in <div>.



数据同构，就是将前端（客户端）的数据请求转移到服务端进行，将数据请求的行为写成一个静态方法，

等匹配对路由的情况下（例如在list页面），将数据写入到 html上，用的是 react-router中的StaticRouter，用它的context，但是这有个问题，服务端得到的html和客户端的不一致（客户端通过react 的虚拟dom生成新的dom结构，但是因为没有数据，没有请求所以他会呈现另一个dom结构）。所以它会一闪之后（刚开始是有html，后来被客户端接管），又变成了暂无数据。

我们需要让客户端的dom结构和服务端的一致。有很多方式，为了防止xss，用textarea来注入数据。

这一过程，叫做 `数据脱水`，意思是将直出组件客户端的时候再传数据给客户端。

我们要讲数据赋值给react 的虚拟dom，这个过程叫做 `数据注水` 

但还有有一个问题，如果当你从一个有数据的页面跳转到另一个页面，再从这个页面跳回去，数据会没有，因为我们现在的数据是通过服务端传递数据，做一下兼容，在初始化（componentDidMount）的时候，判断如果this.state.data中没有数据，那么就去请求数据



增量开发——从模板渲染到react ssr

成为父亲





打包上线 ok

路由切换管理 ok

从hbs跳到单页面路由上，再从单页面路由跳回hbs上 

可以用window.location跳转但是不是一本万利的

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

babel 把es6 的语言转换为 es5

如果webpack 也想要用 需要配置 babel-loader

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











react-router 如果要加二级路由，记得在webpack output 处加 publicPath: '/'



Scroll 做成高阶组件



出现一个问题的时候要看一看是否是因为 没引入



跨域：

没有服务器帮忙的情况下

本地开发

webpack里加devServer 代理

https://juejin.im/post/5b972664f265da0a9624b50c



ssr react 组件加载



@type 类型错误

https://gist.github.com/oyvindym/ebd63bfa21fa5b07a9b31b2a4a5b3655



pre-render

后续添加



webpack 配置alias 后 ts 找不到模块

https://www.xiejiahe.com/blog/detail/5cb2ec342bbcb67b4a5f3ed6



把session 当做一个接口来调用	



星期一：将js文件转换为ts文件。页面processful 完成

星期二：数据窃取 模板页面与ssr页面的数据交互，页面 address 完成一半

























滑动效果以后再做

https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/