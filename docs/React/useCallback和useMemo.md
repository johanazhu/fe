# useCallback 和 useMemo 使用场景

一切为了性能，无论是 useCallback 还是 useMemo 还是 memo，**都是为了让不该渲染的组件不去渲染**

在学习 useCallback、useMemo  之前，我们需要知道一点，React 的渲染是自顶而下，如果父组件渲染了，那么子组件也会渲染，其子孙组件“世世代代”都要渲染

但如果父组件的渲染与子组件的 props 无关呢？设想一下父组件改变样式颜色，关我子组件的数据请求什么关系？

而这正是 useCallback 、useMemo、memo 的作用所在，将子组件用 memo 包住，如果 props 和上次渲染时相同，那么子组件就跳过了重新渲染，useCallback 缓存父组件传给子组件的函数，useMemo 缓存父组件传给子组件的（计算）值

如今 React19 提出 Compiler，不需要再写 useCallback 、useMemo、memo 扰乱心智了

![ React Compiler](https://s2.loli.net/2024/06/14/LY4zQwWZsMcR71P.png)



## useMemo

useMemo 是一个 React Hook，它在每次重新渲染时都能缓存计算的结果

```jsx
const cachedValue = useMemo(calculateValue, dependencies)
```

第一个参数是 ()=> value

第二个参数是依赖项

只有当依赖项变化时，才会计算出新的 value，如果依赖项不变，那就用之前的 value

如果你的 value 是个函数，那么你就要写成 `useMemo(() => x => console.log(x))`

### 用法 

#### 跳过代价昂贵的重新计算

在组件顶层调用 useMemo 以在重新渲染之间缓存计算结果：

```jsx
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

你需要给 useMemo 传递两样东西：

1. 一个没有任何参数的 calculation 函数，像这样`() =>`，并且返回任何你想要的计算结果
2. 一个由包含在你的组件中并且 calculation 中使用的所有值组成的依赖列表

在初次渲染时，你从 useMemo 得到的 值 将会是你的 calculation 函数执行的结果

随后的每次渲染中，React 会比较前后两次渲染中的所有依赖项是否相同，如果通过 Object.is 比较所有依赖项都没有发生变化，那么他会返回之前计算过的值；否则，React 会重新执行 calculation 函数并且返回一个新的值

### 使用场景

#### 跳过组件的重新渲染

某些情况下，useMmeo 可以帮助你优化重新渲染子组件的性能。假设这个 `TodoList` 组件将 `visibleTodos` 作为 props 传递给子 `List` 组件：

```jsx
export default function TodoList({ todos, tab, theme }) {
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      <List items={visibleTodos} />
    </div>
  );
}
```

将 List 用 memo 包裹住后，保持 props 不变就能实现 List 不渲染

所以我们使用 useMemo 缓存 filterTodos 的值

```jsx
export default function TodoList({ todos, tab, theme }) {
  // 告诉 React 在重新渲染之间缓存你的计算结果...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...所以只要这些依赖项不变...
  );
  return (
    <div className={theme}>
      {/* ... List 也就会接受到相同的 props 并且会跳过重新渲染 */}
      <List items={visibleTodos} />
    </div>
  );
}
```

通过将 visibleTodos 的计算函数包裹在 useMemo 中，你就可以确保它在重新渲染之间具有相同值，直到依赖项发生变化。



## useCallback

useCallback 是一个允许你在多次渲染中缓存函数的 React Hook

```jsx
const cachedFn = useCallback(fn, dependencies)
```

### 用法

它和 useMemo 出自一脉

useCallback( x => log(x), [m]) 等价于 useMemo(() => x => log(x), [m])

#### 跳过组件的重新渲染

当你优化渲染性能时，有时需要缓存传递给子组件的函数。为了缓存组件中多次渲染的函数，你需要将其定义在 useCallback Hook 里：

```jsx
import { useCallback } from 'react';

function ProductPage({productId, referer, theme}) {
    const handleSubmit = useCallback((orderDetails) => {
        post('/product/' + productId + '/buy', {
            referer,
            orderDetails
        })
    }, [productId, referer])
}
```

你需要传递两个参数给 useCallback：

1. 在多次渲染中需要缓存的函数
2. 函数内部需要使用的所有组件内部值的依赖值

初次渲染时，在 useCallback 处接受的 返回函数 将会是已经传入的函数

在之后的渲染中，React 将会使用 `Object.is` 把当前的依赖和已传入之前的依赖进行比较。如果没有任何依赖改变，`useCallback` 在多次渲染中缓存一个函数，直到这个函数的依赖发生变化

简而言之，`useCallback` 在多次渲染中缓存一个函数，直至这个函数的变化

### 使用场景

假设你正在从 `ProductPage` 传递一个 `handleSubmit` 函数到 `ShippingForm` 组件中：

```jsx
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**默认情况下，当一个组件重新渲染时， React 将递归渲染它的所有子组件**。因此每当因 theme 改变时而 ProductPage 组件重新渲染时， ShippingForm 子组件也会重新渲染

但按照我们的设想，ShippingForm 组件没有 props 和 state 变化，所以它应该不需要再次渲染，所以我们需要用到 React.memo 和 useCallback，将 ShippingForm 组件包裹在 memo 中，如果 props 和上次渲染时相同，那么 ShippingForm 组件将跳过重新渲染

```
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

**当代码像上面一样改变后，如果 props 与上一次渲染时相同，ShippingForm 组件将跳过重新渲染**。这时缓存函数就变得很重要。假设定义了 handleSubmit 而没有定义 useCallback：

```jsx
function ProductPage({ productId, referrer, theme }) {
  // 每当 theme 改变时，都会生成一个不同的函数
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }
  
  return (
    <div className={theme}>
      {/* 这将导致 ShippingForm props 永远都不会是相同的，并且每次它都会重新渲染 */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

如上所示：每当修改 theme，ProductPage 组件重新渲染，生成一个新的 handleSubmit（**函数式组件会捕获渲染时的值**），因为 handleSubmit 变化，ShippingForm  props 永远会不同，这意味着 memo 对性能的优化永远不会生效，而这就是 useCallback 起作用的地方：

```jsx
function ProductPage({ productId, referrer, theme }) {
  // 在多次渲染中缓存函数
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // 只要这些依赖没有改变

  return (
    <div className={theme}>
      {/* ShippingForm 就会收到同样的 props 并且跳过重新渲染 */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

将 handleSubmit 传递给 useCallback 就可以确保它在多次重新渲染之间是相通的函数，直到依赖发生改变



## useCallback 与 useMemo 有何关系？ 

useCallback 经常和 useMemo 一同出现。当尝试优化子组件时，它们都很有用。因为它们会记住（或者说：缓存）正在传递的东西：

```jsx
import { useMemo, useCallback } from 'react';

function ProductPage({ productId, referrer }) {
  const product = useData('/product/' + productId);

  const requirements = useMemo(() => { //调用函数并缓存结果
    return computeRequirements(product);
  }, [product]);

  const handleSubmit = useCallback((orderDetails) => { // 缓存函数本身
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm requirements={requirements} onSubmit={handleSubmit} />
    </div>
  );
}
```

区别在于你需要缓存什么：

- useMemo 缓存函数调用的结果。在这里，它缓存了调用 `computeRequirements(product)` 的结果。
- useCallback 缓存函数本身。不像 `useMemo`，它不会调用你传入的函数。相反，它缓存此函数。

如果你已经熟悉了 useMemo，你会发现 useCallback 就是 useMemo 所实现：

```js
// 在 React 内部的简化实现
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

### 是否应该在任何地方添加 useCallback？

大部分业务代码不需要使用缓存，但如果你的应用更像是一个绘制编辑器，需要用到大量交互，缓存会很有用
