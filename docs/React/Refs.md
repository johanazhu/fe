# Ref

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建 React 元素

Ref 就是能获取到该元素的原始 dom



## 作用

- 在函数组件中，当我们希望能够记住某些信息，但不希望该信息触发信的渲染时，就可以使用 ref 来存储，典型的例子是 Hooks 的 [Capture Value](./Hooks踩坑)
- 用于访问真实 DOM 元素
- 当父组件需要获取子组件实例对象时，也可通过 `ref` 来获得



## 获取真实 DOM 的三个方法

1.推荐使用 API

- React.createRef()：类组件
- useRef：函数组件

2.ref 回调函数方法

```jsx
// 类组件
bindRef = ele => {
  this.bodyRef = ele;
};

<div ref={this.bindRef}></div>


// 函数组件
const bindRef = useCallback((ele) => {
  
}, []);
<div ref={bindRef}></div>
```

3.字符串（仅限类组件中使用），不推荐是用

```jsx
// 会自动在 this 上绑定 bodyRef, 等于当前元素
<div ref="bodyRef"></div>
```

## 获得子组件实例

1.字组件为类组件，直接绑定 ref，就能拿到整个子组件的实例对象

```jsx
class A extends Component {}

const App = () => {
  const ref = useRef()
  return (<A ref={ref}/>)
}
```

2.函数组件：forwardRef + useImperativeHandle

forwardRef：允许组件使用 ref 将 DOM 节点暴露给付组件

useImperativeHandle：暴露实例对象方法

```jsx
import { forwardRef, useImperativeHandle } from 'react';

const A = (props, ref) => {
  useImperativeHandle(ref, () => {
    // 返回要绑定的实例对象
    return {};
  }, []);
}

const App = forwardRef(A);

```





## 参考资料

-   [你想知道的关于 Refs 的知识都在这了](https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&mid=2247484399&idx=1&sn=e865eb3f967639477a05262d0ddf09af&chksm=9782cd66a0f544700894ede3a1b02882585a738a0b3c31a56a8b297bd4b878d6f57d8c790fea&mpshare=1&scene=1&srcid=&sharer_sharetime=1572998605426&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)

-   [React ref 从原理到应用](#https://mp.weixin.qq.com/s/Y6rCRrv0H92cKnvZsn1c0g)
-   [React 进阶实践指南](https://juejin.cn/book/6945998773818490884/section/6953939191776411689)
