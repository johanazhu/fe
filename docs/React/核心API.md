# React 核心API

这里对重要的 React API 做介绍

## 概览

- [`createContext`](https://zh-hans.react.dev/reference/react/createContext) API 可以创建一个 context，你可以将其提供给子组件，通常会与 [`useContext`](https://zh-hans.react.dev/reference/react/useContext) 一起配合使用。
- [`forwardRef`](https://zh-hans.react.dev/reference/react/forwardRef) 允许组件将 DOM 节点作为 ref 暴露给父组件。
- [`lazy`](https://zh-hans.react.dev/reference/react/lazy) 允许你延迟加载组件，直到该组件需要第一次被渲染。
- [`memo`](https://zh-hans.react.dev/reference/react/memo) 允许你在 props 没有变化的情况下跳过组件的重渲染。通常 [`useMemo`](https://zh-hans.react.dev/reference/react/useMemo) 与 [`useCallback`](https://zh-hans.react.dev/reference/react/useCallback) 会一起配合使用。
- [`startTransition`](https://zh-hans.react.dev/reference/react/startTransition) 允许你可以标记一个状态更新是不紧急的。类似于 [`useTransition`](https://zh-hans.react.dev/reference/react/useTransition)。
- [`act`](https://zh-hans.react.dev/reference/react/act) 允许你在测试中包装渲染和交互，以确保在断言之前已完成更新。



## forwardRef

`forwardRef` 允许组件使用 [ref](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 将 DOM 节点暴露给父组件。

```jsx
const SomeComponent = forwardRef(render)
```

#### 返回值 

`forwardRef` 返回一个可以在 JSX 中渲染的 React 组件。与作为纯函数定义的 React 组件不同，`forwardRef` 返回的组件还能够接收 `ref` 属性。

#### 用法：将 DOM 节点暴露给父组件

子组件

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

父组件：

```jsx
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        编辑
      </button>
    </form>
  );
}
```



## memo

`memo` 允许你的组件在 props 没有改变的情况下跳过重新渲染

```jsx
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

#### 参数 

- **可选参数** `arePropsEqual`：一个函数，接受两个参数：组件的前一个 props 和新的 props。如果旧的和新的 props 相等，即组件使用新的 props 渲染的输出和表现与旧的 props 完全相同，则它应该返回 `true`。否则返回 `false`。通常情况下，你不需要指定此函数。默认情况下，React 将使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较每个 prop。

### 用法 

#### 当 props 没有改变时跳过重新渲染 





## 过时的 API 

- [`Children`](https://zh-hans.react.dev/reference/react/Children) 允许你处理和转化作为 `children` 的 JSX。[查看替代方案](https://zh-hans.react.dev/reference/react/Children#alternatives)。
- [`cloneElement`](https://zh-hans.react.dev/reference/react/cloneElement) 允许你使用一个元素作为初始值创建一个新的 React 元素。[查看替代方案](https://zh-hans.react.dev/reference/react/cloneElement#alternatives)。
- [`Component`](https://zh-hans.react.dev/reference/react/Component) 允许你定义一个 JavaScript class 作为 React 类式组件。[查看替代方案](https://zh-hans.react.dev/reference/react/Component#alternatives)。
- [`createElement`](https://zh-hans.react.dev/reference/react/createElement) 允许你创建一个 React 元素，但是一般会使用 JSX。
- [`createRef`](https://zh-hans.react.dev/reference/react/createRef) 允许你创建一个可以包含任何值的 ref 对象。[查看替代方案](https://zh-hans.react.dev/reference/react/createRef#alternatives)。
- [`isValidElement`](https://zh-hans.react.dev/reference/react/isValidElement) 检测参数值是否为 React 元素，通常会与 [`cloneElement`.](https://zh-hans.react.dev/reference/react/cloneElement) 一起使用。
- [`PureComponent`](https://zh-hans.react.dev/reference/react/PureComponent) 与 [`Component`](https://zh-hans.react.dev/reference/react/Component) 类似，但是当 props 相同时会跳过重新渲染。[查看替代方案](https://zh-hans.react.dev/reference/react/PureComponent#alternatives)。





## 参考资料

-   [React 官网](https://zh-hans.react.dev/reference/react)

-   [React 万字基础全面剖析](https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w)

-   [React 系统复习如何做最高效](https://mp.weixin.qq.com/s/0SBeDkpp_DYS8uAnYL3AiQ)
