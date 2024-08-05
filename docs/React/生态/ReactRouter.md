# React Router 的实现原理

本文分两部分，一说前端路由的基本原理，二说 React Router 的实现原理



## 前端路由的基本原理

不说屁话，从时间线上讲，Web 应用原本是后端渲染，后来随着技术的发展，有了单页面应用，慢慢从后端渲染发展成前端渲染

在博客[前端路由hash、history的实现](https://blog.azhubaby.com/2023/01/09/2023-01-09-%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1hash%E3%80%81history%E7%9A%84%E5%AE%9E%E7%8E%B0/) 一问中我已经介绍过这两种模式

hash 模式

- 通过监听 hashchange 事件，匹配 hash 值并渲染页面模块

history 模式

- 利用 `history.pushState` + `popState` 实现
- `history.pushState` 能实现不刷新页面，但往历史栈中新增一个记录
- `popState` 则会在历史记录条目被更改时，触发
- `pushState` 只会改变历史栈，修改它没有什么API可以监听，所以要与 `popState`配合

简单来说，前端路由的基本原理无非要实现两个功能：

- 监听记录路由变化
- 匹配路由变化并渲染内容

### hash模式

hash 模式的实现比较简单，我们通过 `hashChange` 事件就能直接监听到路由 hash 的变化，并根据匹配到的 hash 的不同来渲染不同的内容。

```html
<body>
    <a href="#/home">Home</a>
    <a href="#/user">User</a>
    <a href="#/about">About</a>
    <div id="view"></div>
  </body>
  <script>
    function onHashChange() {
      const view = document.getElementById("view");
      switch (location.hash) {
        case "#/home":
          view.innerHTML = "Home";
          break;
        case "#/user":
          view.innerHTML = "User";
          break;
        case "#/about":
          view.innerHTML = "About";
          break;
        default:
          view.innerHTML = "Home";
          break;
      }
    }
    window.addEventListener("hashchange", onHashChange);
  </script>
```

### history模式

1. 拦截 a 标签的点击事件，阻止它的默认跳转行为
2. 使用 H5 的 history API 更新 URL
3. 监听和匹配路由改变以更新页面

利用 `pushState` 往历史栈中添加记录且不刷新页面的特性 + 监听 `popstate` 浏览器操作导致的 URL 变化

- `window.history.pushState(state, title, path)`

- `window.addEventListener("popstate", onPopState)`

```html
<body>
    <a href="/home">Home</a>
    <a href="/user">User</a>
    <a href="/about">About</a>
    <div id="view"></div>
</body>
<script>
    const elements = document.querySelectorAll("a[href]");
    elements.forEach(el =>
      el.addEventListener("click", e => {
        e.preventDefault();
        const test = el.getAttribute("href");
        history.pushState(null, null, el.getAttribute("href"));
        onPopState();
      })
    );

    function onPopState() {
        const view = document.getElementById("view");
        switch (location.pathname) {
            case "/home":
                view.innerHTML = "Home";
                break;
            case "/user":
                view.innerHTML = "User";
                break;
            case "/about":
                view.innerHTML = "About";
                break;
            default:
                view.innerHTML = "Home";
                break;
        }
    }
    window.addEventListener("popstate", onPopState);
</script>
```

### hash模式 VS History模式

| 模式    | 优点                                 | 缺点    |
| ------- | ------------------------------------ | ------- |
| Hash    | 浏览器兼容性更好，不需要后端路由支持 | 有 # 号 |
| History | 需要现代浏览器，需要后端路由支持     | 无 # 号 |



## React Router 的实现原理

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

正常情况下，当 URL 发生变化时，浏览器会像服务端发送请求，但使用以下 3 种办法不会向服务端发送请求：

-   基于 ajax（实现起来很麻烦）
-   基于 hash
-   基于 history

react-router 使用了 [history](https://github.com/ReactTraining/history) 这个核心库。它本质是屏蔽不同模式下载监听实现上的差异，使用`发布订阅模式` 来实现，这里不做探究



## 总结

从后端路由到前端路由，最大的改变是体验，体验更良好了

前端路由模式有两种：hash 模式 和 history 模式，两者分别利用浏览器自由特性实现单页面导航

-   hash 模式：window.location 或 a 标签改变锚点值，window.hashchange() 监听锚点变化
-   history 模式：history.pushState()、history.replaceState() 定义目标路由，window.popstate() 监听浏览器操作导致的 URL 变化

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
