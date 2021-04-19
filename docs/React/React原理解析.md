# React原理解析



知识点

​	虚拟dom

​	JSX

​	React核心api

​	ReactDOM

​		render()

​	实现React.createElement，ReactDom.render，Component

​		CreateElement

​		ReactDOM.render





# JSX和虚拟DOM



问题：

**在定义React组件或者书写React相关代码，不管代码中有没有用到React这个对象，我们都必须将其import进来，这是为什么？**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App/>, document.getElementById('app'))
```

因为React将 App 解析成 vnode

ReactDOM的作用就是将用jsx写成的对象映射到真实的DOM上，引入 React，自然能解析 `<App />` 语法



jsx转换成abstract dom tree的时候，需要 `React.createElement`，引入React，因为babel的缘故，自动转换为 抽象语法树对象





## 组件和声明周期





```react
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

![image-20210419171455659](https://i.loli.net/2021/04/19/V9e5gtmZcUkojnS.png)











