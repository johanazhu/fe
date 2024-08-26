# useCallback 和 useMemo 使用场景

一切为了性能，无论是 useCallback 还是 useMemo 还是 memo，**都是为了让不该渲染的组件不去渲染**

在学习 useCallback、useMemo  之前，我们需要知道一点，React 的渲染是自顶而下，如果父组件渲染了，那么子组件也会渲染，其子孙组件“世世代代”都要渲染

但如果父组件的渲染与子组件的 props 无关呢？设想一下父组件改变样式颜色，关我子组件的数据请求什么关系？

而这正是 useCallback 、useMemo、memo 的作用所在，将子组件用 memo 包住，如果 props 和上次渲染时相同，那么子组件就跳过了重新渲染，useCallback 缓存父组件传给子组件的函数，useMemo 缓存父组件传给子组件的（计算）值

如今 React19 提出 Compiler，不需要再写 useCallback 、useMemo、memo 扰乱心智了

![ React Compiler](https://s2.loli.net/2024/06/14/LY4zQwWZsMcR71P.png)

在讲 useMemo 是什么之前，我们先了解下什么是 Memo

## Memo

官方定义：React.memo 是一个高阶组件（HOC），其主要目的是优化函数组件的性能。它通过记忆组件的渲染输出，使得当组件的 props 没有变化时，可以跳过该组件的重新渲染，从而提升性能

它会进行浅层对比，即对比两个对象或数组时只检查其第一层属性的相等性方法，在此比较中，仅比较对象的直接属性值，而不递归地深入到镶嵌的对象或数组中

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = obj1;

console.log(obj1 === obj2); // false，因为 obj1 和 obj2 指向不同的内存地址
console.log(obj1 === obj3); // true，因为 obj3 引用同一个 obj1
```

> 和浅拷贝一个道理，只考察第一层属性，不递归更深层的对象和数组

举个栗子🌰

```jsx
...
function App() {
    const [n, setN] = useState(0)
    const [m, setM] = useState(0)
    const onClick = () => {
        setN(n + 1)
    }
    
    return (
    	<div className="App">
			<div>
            	<button onClick={onClick}>update n {n}</button>
            </div>	
            <Child data={m} />
        </div>
    )
}

function Child(props) {
    console.log("child 执行了")
    return <div>child: {props.data}</div>
}
...
```

当我们什么都不做时，点击 button，Child 组件会重新 re-render，Child 组件为什么会重新 re-render，因为 button 点击后，n变化，导致 App re-render，所以 App 中的 Child 组件也跟着重新渲染

但这不对，因为 Child 的依赖项是 m，m没变化，Child 不需要重新渲染才对，所以我们需要加上 React.memo

```jsx
...
function App() {
    const [n, setN] = useState(0)
    const [m, setM] = useState(0)
    const onClick = () => {
        setN(n + 1)
    }
    
    return (
    	<div className="App">
			<div>
            	<button onClick={onClick}>update n {n}</button>
            </div>	
            <Child2 data={m} />
        </div>
    )
}

function Child(props) {
    console.log("child 执行了")
    return <div>child: {props.data}</div>
}

const Child2 = React.memo(Child)
```

如此一来，Child2 就不会重新 re-render 了

也就是说，如果 props 不变，就没必要再此执行一个函数组件了

但这个做法有个 bug，加上监听函数后，一秒破功

```jsx
...
function App() {
    const [n, setN] = useState(0)
    const [m, setM] = useState(0)
    const onClick = () => {
        setN(n + 1)
    }
    
    const onChildClick = () => {
        console.log('点击 child')
    }
    
    return (
    	<div className="App">
			<div>
            	<button onClick={onClick}>update n {n}</button>
            </div>	
            <Child2 onClick={onChildClick} data={m} />
        </div>
    )
}

function Child(props) {
    console.log("child 执行了")
    return <div onClick={props.onClick}>child: {props.data}</div>
}

const Child2 = React.memo(Child)
```

当加上函数后，Child2 就会重新 re-render，理由也很简单

- button 点击后，触发 App re-render
- 生成的 onChildClick 是一个新的函数
- 函数属于对象，对象都是引用类型，所以心的 onChildClick 和之前的 onChildClick 不是同一个引用
- 故 Child 即使用 memo 包裹了，但是会因为 props（onClick）变化而重新渲染

这时就要用到 useMemo

```jsx
 
...
const onChildClick = useMemo(() => {
    return () => {
        console.log('点击 child')
    }
}, [m])
 ...
```

如此就缓存住了 onChildClick

## useMemo

useMemo 是一个 React Hook，它在每次重新渲染时都能缓存计算的结果

```jsx
const cachedValue = useMemo(calculateValue, dependencies)
```

第一个参数是 ()=> value

第二个参数是依赖项 [m,n]

只有当依赖项变化时，才会计算出新的 value

如果依赖项不变，那就用之前的 value

如果你的 value 是个函数，那么你就要写成 `useMemo(() => x => console.log(x))`

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

如果 useMemo 是个值还好说，如果是返回函数的函数，如`useMmeo(()=>(x) => console.log(x))` 不仅难用，而且难以理解，于是 React 团队就写了语法糖——useCallback

最开始的案例我们修改下：

```jsx
 
...
const onChildClick = useCallback(() => {
    console.log('点击 child')
}, [m])
 ...
```

它的作用和 useMemo 一模一样，只是针对的是函数

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
