# ReactRouter

# 源码分析 React Router 源码

## 前端路由前世今生

前端路由发展到今天，经历了后端路由、前后端路由过渡、前端路由的过程

### 后端路由

这个时期，不管 Web 后端是什么语言的框架，都会有一个专门开辟出来的路由模块或者路由区域，用来匹配用户给出的 URL 地址，以及一些表单提交、页面请求地址。用户进行页面切换时，浏览器发送不同的 URL 请求，服务器接收到浏览器的请求时，通过解析不同的 URL 地址进行后端路由匹配，将模板拼接好后将之返回给前端完整的 HTML，浏览器拿到这个 HTML 文件后直接解析展示了，也就是所谓的服务端渲染

![后端路由过程](https://i.loli.net/2021/06/16/Fit7zNHclqfOTKZ.png)

服务端渲染页面，后端有完整的 HTML 页面，爬虫更容易获取信息，有利于 SEO 优化。对于客户端的资源占用更少，尤其是移动端，可以更省流量

### 过渡

Ajax 的基本概念（XMLHttpRequest 的前身）

单页应用不仅在页面交互是无刷新的，连页面跳转都是无刷新的，为了配合实现单页面应用跳转，前端路由孕育而生。

### 前端路由

前端路由的兴起，使得页面渲染由服务器渲染变成了前端渲染。为什么这么说呢！请求一个 URL 地址时，服务器不需要拼接模板，只需返回一个 HTML 即可，一般浏览器拿到的 HTML 是这样的：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Demo</title>
        <link href="app.css" rel="stylesheet" />
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="app.js"></script>
    </body>
</html>
```

这里空荡荡的只有一个` <div id="app"></div>`，以及一系列的 js 文件，所以说这个 HTML 是不完整的。我们看到的页面是通过这一系列的 js 渲染出来的，也就是前端渲染。前端渲染通过客户端的算力来解决页面的构建，很大程度上缓解了服务端的压力

![前端路由过程](https://i.loli.net/2021/06/16/xw5eLQZEt2KCiyq.png)

单页面开发是趋势，但也不能避重就轻，忽略前端渲染的缺点。由于服务器没有保留完整的 HTML，通过 js 进行动态 DOM 拼接，需要耗费额外的时间，不如服务端渲染速度快，也不利于 SEO 优化。所以说，实际开发中，不能盲目选择渲染方式，一定要基于业务场景。对于没有复杂交互，SEO 要求严格的网站，服务器渲染也是正确的选择

## 核心原理解析

### react-router-dom

react-router 的注入方式是在组件树顶层放一个 Router 组件，然后在组件树种散落着很多 Route 组件，顶层的 Router 组件负责分析监听 URL 的变化，在其下面的 Route 组件渲染对应的组件

### React Router 用法回顾

![React-router组件](https://i.loli.net/2021/06/16/HvP9UhJQyToRij8.png)

-   **路由器组件**: `<BrowserRouter>` 和 `<HashRouter>`，路由器组件的作为根容器组件，`<Route>` 等路由组件必须被包裹在内才能够使用。
-   **路由匹配组件**: `<Route>` 和 `<Switch>`，路由匹配组件通过匹配 path，渲染对应组件。
-   **导航组件**: `<Link>` 和 `<NavLink>`，导航组件起到类似 `a` 标签跳转页面的作用。在后续对源码的讲解中，也将分别以这六个组件代码的解析为线索，来一窥 React Router 的整体实现。看回我们的代码，对于我们开头实现的原生路由，如果用 React Router 改写，应该是怎样的写法呢：

```jsx
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
// HashRouter 和 BrowserRouter 二者的使用方法几乎没有差别，这里只演示其一

const App = () => {
  return (
    <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/user">User</Link>

        <Switch>
            <Route path="/about"><About /></Route>
            <Route path="/user"> <User /></Route>
            <Route path="/"><Home /></Route>
        </Switch>
    </BrowserRouter>
  );
}

const Home = () => (<h2>Home</h2>);
const About = () => (<h2>About</h2>);
const User = () => (<h2>User</h2>);

export default App;
```

## React Router 源码实现

先用最简单的话来概括一下 React Router 到底做了什么？

**本质上， React Router 就是在页面 URL 发生变化的时候，通过我们写的 path 去匹配，然后渲染对应的组件。**

那么，我们想一下如何分步骤实现：

1. 如何监听 url 的变化 ？
2. 如何匹配 path ？
3. 渲染对应的组件

换句话说，也是一个组件，通过渲染不同的组件来控制路由切换

### 整体设计

我们用一张图来理解一下整个 react-router 是怎么实现的：

接下来我们看看每一个步骤是怎么实现的。

![640](https://i.loli.net/2021/06/16/LdX43GNEtSCMjI2.png)

### 如何监听 url 的变化 ？

正常情况下，当 URL 发生变化时，浏览器会像服务端发送请求，但使用以下 2 种办法不会向服务端发送请求：

-   基于 hash
-   基于 history

react-router 使用了 history 这个核心库。

而 history 库的本质是通过前文所说的

要想了解 React-Router 的本质，就要依次解决这三个问题

1. 单页面应用路由的实现原理是什么？
2. React-router 是如何跟 React 结合起来的？

而后我们可以实现一个简单的 React-router

React-Router 借用了 history 解决了第一个问题

用 React.createContext 解决了第二个问题

`<Router>` 只做了两件事，一是给子组件包了一层 `context`，让路由信息（ history 和 location 对象）能传递给其下所有子孙组件；二是绑定了路由监听事件，使每次路由的改变都触发`setState`

实现 ReactRouter 前，先去看一下 ReactRouter 的写法

```jsx
<Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics} />
      <Route render={(props) => {
        return <pre>URL: {JSON.stringify(props.match.url)}</pre>
      }} />
</Switch>
```

> BrowseHistory 必须依赖服务器让 url 都映射到 index.html ，否则会 404 。

注意到了没，Switch 是一个组件，Route 也是一个组件

这就好比

```jsx
class Route extends React.Component {
   render() {
       const { exact, path, component, children,render } = this.props;

       const match = matchPath(location.pathname, {
           path,
           exact
       })

       if (!match) {
           return null
       }

       if (component) {
           return React.createElement(component, { match })
       }

       if (render) {
           return (
               render({ match })
           )
       }
       return (
         null
       )
   }
}
```

主要是

```jsx
<RouterContext.Provider
    value={{
        history: this.props.history,
            location: this.state.location,
                match: Router.computeRootMatch(this.state.location.pathname),
                    staticContext: this.props.staticContext
    }}
    >
    <HistoryContext.Provider
        children={this.props.children || null}
        value={this.props.history}
    />
</RouterContext.Provider>
```

### Route 的实现

我们前面提到，前端路由的核心在于监听和匹配，上面我们使用 `<Router>` 实现了监听，那么本小节就来分析 `<Route>` 是如何做匹配的，同样地我们先回顾 `<Route>` 的用法：

匹配模式：

```jsx
// 精确匹配
// 严格匹配
// 大小写敏感
<Route path="/user" exact component={User} />
<Route path="/user" strict component={User} />
<Route path="/user" sensitive component={User} />
```

路径 path 写法：

```jsx
// 字符串形式
// 命名参数
// 数组形式
<Route path="/user" component={User} />
<Route path="/user/:userId" component={User} />
<Route path={["/users", "/profile"]} component={User} />
```

渲染方式：

```jsx
// 通过子组件渲染
// 通过 props.component 渲染
// 通过 props.render 渲染
<Route path='/home'><Home /></Route>
<Route path='/home' component={Home}></Route>
<Route path='/home' render={() => <p>home</p>}></Route>

// 例子: 这里最终的渲染结果是User, 优先级是子组件 > component > render
<Route path='/home' component={Home} render={() => <p>About</p>}>
  <User />
</Route>
```

`<Route>` 所做的事情也很简单，匹配到传入的 path，渲染对应的组件。此外 `<Route>` 还提供了几种不同的匹配模式、path 写法以及渲染方式

Route 提供了三种渲染方式：子组件、`props.component`、`props.render`，三者之间又存在优先级，因此就形成了我们看到了多层三元表达式渲染的结构。

## 总结

从后端路由到前端路由，最大的改变是体验，体验更良好了

前端路由模式有两种：hash 模式 和 history 模式，两者分别利用浏览器自由特性实现单页面导航

-   hash 模式：window.location 或 a 标签改变锚点值，window.hashchange() 监听锚点变化
-   history 模式：history.pushState()、history.replaceState() 定义目标路由，window.onpopstate() 监听浏览器操作导致的 URL 变化

React Router 匹配路由由 `mathPath` 通过 `path-to-regexp` 进行，`<Route>` 相当于一个高阶组件，以不同的优先级和匹配模式渲染匹配到的子组件

React Router 的主要组件源码，整体的实现：

-   对于**监听**功能的实现，React Router 引入了 `history` 库，以屏蔽了不同模式路由在监听实现上的差异, 并将路由信息以 `context` 的形式，传递给被 `<Router> ` 包裹的组件, 使所有被包裹在其中的路由组件都能**感知到路由的变化, 并接收到路由信息**
-   在**匹配**的部分， React Router 引入了 `path-to-regexp` 来拼接路径正则以实现不同模式的匹配，路由组件·`<Route>`作为一个高阶组件包裹业务组件, 通过比较当前路由信息和传入的 path，以不同的优先级来渲染对应组件

## 参考资料

-   [深入浅出解析 React Router 源码](https://mp.weixin.qq.com/s/hcAMubPlse4cK9y_-mS5yQ)

-   [单页面应用路由实现原理：以 React-Router 为例](https://github.com/youngwind/blog/issues/109)

-   [剖析单页面应用路由实现原理](https://github.com/happylindz/blog/issues/4)

-   [SPA 路由三部曲之核心原理](https://juejin.cn/post/6895882310458343431)

-   [SPA 路由三部曲之实战演练](https://mp.weixin.qq.com/s/SJXwhTo4j6I3WMmQuOOs7A)

-   [图解 React-router 带你深入理解路由本质](https://mp.weixin.qq.com/s/xyk9Qla6p2lDsRoqrvasTA)
