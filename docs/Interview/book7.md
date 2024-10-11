# 模拟题七



## 1.双飞翼/圣杯布局

考察点：双飞翼/圣杯布局

双飞翼布局：浮动+margin-left+中间部分再包裹一层

圣杯布局：浮动+margin-left+自身相对定位



## 2. 手写 ajax

```javascript
var xhr = new XMLHttpRequest();

xhr.open('GET', '/xxx', true)
// false 异步
// true 同步

xhr.setRequestHeader("Content-Type", "application/json")

xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200 || xhr.status === 304) {
       	console.log('响应数据:', xhr.responseText);
    } else {
        console.error('请求失败，状态码：' + xhr.status);
    }
}

 xhr.send();
```

衍生问题：如何取消请求

### 如何取消请求

```javascript
xhr.abort();
```

- 只能取消当前正在进行的请求。如果请求已经完成或已被取消，则 `abort()` 方法不会产生任何效果。
- 调用 `abort()` 方法后，将触发 `error` 回调函数。

> `fetch.abort()` 也能取消请求，axios 的取消原理就是基于 `xhr.abort` 和 `fetch.abort`
>

## 3.什么是立即执行函数

IIFE，立即执行函数，声明一个匿名函数，并马上调用这个匿名函数。只有一个作用，创建一个独立的作用域

衍生问题：模块化

模块化的发展历程

IIFE ——> CommonJS ——> AMD ——> ES Modules 

## 4.Map 和 Set

Map 是字典，Set 是集合

Map 是一组键值对的结构，具有极快的查找速度。数据结构是 hash-table（哈希表）

Map 是一个带键的数据项的集合，就像一个 Object 一样，但是它们最大的差别是 Map 允许任何类型的键（key）

Set 作为最简单的集合，有着如下几个特点：

-   Set 可以存储任何类型的值，遍历顺序与 插入顺序相同
-   **Set 内无重复的值**
    -   可以做去重
    -   去重后要把 Set 转换为数组


### WeakMap

与 Map 类似，但又有点击区别：

- WeakMap 只接受对象作为 key（null除外），如果设置其他类型的数据作为 key，会报错。`Map` 的键可以是任意类型
- WeakMap 是弱引用，key 所指向的对象可以被垃圾回收；Map 的 key 实际上和内存地址绑定
- WeakMap 不能被遍历，Map 可以被遍历



衍生问题：map 和 对象的区别

### map 和 对象的区别

对象的键只能是字符串

map的键可以是任意类型

```javascript
var map = new Map();
map.set(1, 2);
map.set({ name: 'johan' }, true);
```



## 5.修改深层对象有什么解决方案

例如如下数据结构，如何修改数据，让其不要过多渲染

> 这涉及到state 的数据不可变，因为object 是引用类型，修改值会影响到之前的值

```javascript
state = {
 	user: {
        objA: {
          name: 'A',
          age: 20
        }
    }
}

```

有四种解决方案：

一：使用展开运算符（Spread Operator）

```
this.setState(prevState => ({
  user: {
    ...prevState.user,
    objA: {
      ...prevState.user.objA,
      name: '新名字',
      age: 25
    }
  }
}));
```

二：Object.assign()

```javascript
this.setState(prevState => 
  Object.assign({}, prevState, {
    user: Object.assign({}, prevState.user, {
      objA: Object.assign({}, prevState.user.objA, {
        name: '新名字',
        age: 25
      })
    })
  })
);
```

三：使用深克隆

```javascript
import _ from 'lodash';

const updatedUser = _.cloneDeep(this.state.user);
updatedUser.objA.name = '新名字';
updatedUser.objA.age = 25;

this.setState({ user: updatedUser });
```

四：使用不可变数据结构（如immer.js）

```javascript
import produce from 'immer';

this.setState(prevState => 
  produce(prevState, draft => {
    draft.user.objA.name = '新名字';
    draft.user.objA.age = 25;
  })
);
```

其实就是让赋值的对象和之前的对象的值不同，如果数据结构简单，可以用浅拷贝（扩展运算符或者Object.assign），数据结构复杂，则用深拷贝来做。但推荐的方案是用不可变数据结构，如 immer.js 库来做，保持值的唯一性

## 6. useEffect 第二个参数是对象如何处理

保持依赖项为数组

```jsx
const [state, setState] = useState({ a: 1, b: 2 });

useEffect(() => {
    // 处理副作用
    console.log("状态改变了", state);
}, [state.a, state.b]);  // 依赖项数组应包含对象的具体属性
```

使用 JSON.stringify

```jsx
const [state, setState] = useState({ a: 1, b: 2 });

useEffect(() => {
    // 处理副作用
    console.log("状态改变了", state);
}, [JSON.stringify(state)]);  // 使用 JSON.stringify 作为依赖项
```

使用不可变数据结构（如immer.js）使用自定义钩子

写个类似 useSetState 这样的 hooks，判断复杂对象的变化

使用不可变数据结构（如immer.js）

```jsx
import produce from 'immer';
const [state, setState] = useState({ a: 1, b: 2 });

useEffect(() => {
    console.log("状态改变了", state);
}, [produce(state)]); 
```



## 7.遇到白屏问题如何分析和解决

相关问题：前端性能优化指标、前端性能优化手段、白屏、大量图片加载优化

常见的白屏问题有

1.资源加载失败页面依赖的关键资源（CSS、JS、图片等）加载失败，导致页面无法正常渲染

2.资源加载延迟资源加载（或阻塞），导致页面长时间等待资源加载完毕，出现空白

3.代码执行中出现未被补货的错误，如 JS 错误、Promise 错误，导致页面无法正常打开

4.浏览器兼容性问题

### 如何监测页面白屏

1.检测根节点是否渲染

这种方法的原理是在当前主流 SPA 框架下，DOM 一般挂载在一个根节点之下（比如 `<div id="app"></div>` ），发生白屏后通常是根节点下所有 DOM 被卸载。

2.Mutation Observer 监听 DOM 变化

可以通过 Mutation Observer 来监听 DOM 树变化，从而判断页面是否白屏。

3.页面截图

通过对网页进行截图，对截图进行像素点分析，判断页面是否白屏。

衍生问题：前端性能指标

### 前端性能指标

web core vitals

LCP（最大内容渲染时间）、INP（从交互到下一次绘制的时间）、FID（首次输入延迟）、CLS（累积布局偏移）

以用户为中心的性能指标

FP（首次绘制）、FCP（首次内容绘制时间）、TTI（可交互时间）、TBT（总阻塞时间）、LCP（最大内容渲染时间）、INP（从交互到下一次绘制的时间）、FID（首次输入延迟）、CLS（累积布局偏移）



## 8.网站首页有大量的图片，加载很慢，如何优化呢？

图片懒加载，显示的图片显示出来，还没出现的图片先用小图标展示

图片放在 oss 上

最开始用placeholder图或者loading图来代替，真正的图片放在data-img属性上，等到图片需要展示的时候再替换img.src

监听所有scroll，为了性能，200ms 拉动一次

循环所有的图片，判断他们的偏移高度与视窗高度+滚动高度之和，如果小于，则说明图片已经显示在视图中，那么就展示

通过 getBoundingClientRect，也是循环所有图片，但是是通过拿到该元素的getBoundingClientRect 来判断是否出现再视图中

intersectionObserver 交叉观察器，异步



## 9.微前端：如何防止一个应用没有被卸载掉造成内存泄露





衍生问题：CSS 可能会造成全局污染？怎么避免样式互相冲突

### CSS 可能会造成全局污染？怎么避免样式互相冲突





## 10.算法题：全排列

```javascript
var permute = function(nums) {
    const list = []
    backtrack(list, [], nums)
    return list;
};

function backtrack(list, tempList, nums) {
    if (tempList.length === nums.length) return list.push([...tempList])
    for (let i = 0; i < nums.length; i++) {
        if (tempList.includes(nums[i])) continue;
        tempList.push(nums[i])
        backtrack(list, tempList, nums)
        tempList.pop()
    }
}
```

