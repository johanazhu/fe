# 核心 API



从使用的频繁度来写

Component

PureComponent

memo

forwardRef

lazy

Suspense

Fragment

Profiler

StrictMode

context



工具类API

- createElement
- cloneElement
- createContext
- createFactory
- createRef
- isValidElement
- Children
  - map
  - forEach
  - count
  - toArray
  - only







### Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件数间进行数据传递的方法



先注册一个变量

const ThemeContext = React.createContext("light")



然后在要用的地方注入

```react
<ThemeContext.Provider value="dark">
    <Test />
</ThemeContext.Provider>
```

使用不知道那个地方使用的

```react
<ThemeContext.Consumer>
    {value => (
        <div>{value}</div>
    )}
</ThemeContext.Consumer>
```

Provider负责提供context，而Consumer用来消费Provider提供的context

React.context应用了 render props 模式，什么是 render props 。传入的props是一个render组件



context 的问题，如何管理context对象









## 参考资料

「React万字基础全面剖析」

https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w

React 系统复习如何做最高效

https://mp.weixin.qq.com/s/0SBeDkpp_DYS8uAnYL3AiQ
