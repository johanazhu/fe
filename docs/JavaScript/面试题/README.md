# JavaScript 面试题

JavaScript 的基本功面试题无非包括 闭包、原型链、继承、作用域、执行栈、class 实现继承

它的手写面试题包括

# 数组扁平化、去重、排序

已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```javascript
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// 扁平化
let flatArr = arr.flat(Infinity);
// 去重
let disArr = Array.from(new Set(flatArr));
// 排序
let result = disArr.sort(function (a, b) {
    return a - b;
});
console.log(result);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
// Array.from 将类数组转成数组实例
```

### 数组去重

#### ES5

```javascript
function unique(arr) {
    var res = arr.filter((item, index, array) => {
        return array.indexOf(item) === index;
    });
    return res;
}
```

#### ES6

```javascript
function unique(arr) {
    return [...new Set(arr)];
}
```

### 数组扁平化

使用 Array.prototype.flat 就可以将多层数组拍平一层

```javascript
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]
```

#### ES5：递归

```javascript
function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
```

#### ES6

```javascript
function flatten(arr) {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```

## 如何实现浏览器内多个标签页之间的通信?

三种。监听 localStorage、webworker、sharedworker

```javascript
window.onstorage = (e: any) => {
    console.log(e);
};
```

### js 延迟加载的方式有哪些？

defer 和 async

什么是 defer？

什么是 async？

动态创建 DOM 方式

按需异步载入 js

### 如何解决跨域问题?

### 如何统计当前页面出现过多少种 html 标签

```javascript
new Set([...document.getElementsByTagName('*')].map((v) => v.tagName)).size;
```

### 求一个网页中出现次数最多的三种标签

```javascript
const html = document.querySelector('html');
const htmlChild = html.children;
let obj = {};
function fn(children) {
    for (let i of children) {
        if (obj.hasOwnProperty(i.tagName)) {
            obj[i.tagName] = obj[i.tagName] + 1;
        } else {
            obj[i.tagName] = 1;
        }
        const child = i.children;
        if (child.length !== 0) {
            fn(child);
        }
    }
}
fn(htmlChild);
let tag = Object.entries(obj).sort((a, b) => b[1] - a[1]);

function result(array) {
    return array.slice(0, 3);
}
console.log(result(tag));
```

问：介绍 defineProperty 方法，什么时候需要用到

## Array 的方法，那些会改变原数组，那些不会

改变数组：

shift、unshift、pop、push、reverse、sort、splice、fill、copyWidthin

不改变数组：

concat、join、slice、map、filter、forEach、some、every、reduce

## 垃圾回收

## 迭代器

## 类数组和数组的区别在哪里

相同点：都可用下标访问每个原生，都有 length 属性

不同点：数组的类型是 Array，类数组的类型是 object。即数组遍历可以用 for in 或 for，类数组只能用 for 循环

常见的类数组有：arguments、DOM 对象列表（document.querySelectorAll）

类数组转换为数组

1. Array.prototype.slice.call(arrayLike, 0)
2. [...arrayLike] 扩展运算符
3. Array.from(arrayLike)

数组转换为类数组

```javascript
var arr = [1, 2, 3, 4]
var obj = {}
[].push.apply(obj, arr)
```

## 参考资料

-   [夯实 JS 主要知识点](https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046276&idx=1&sn=b54360af4eaa853699f6ebda2d2be822&chksm=87cbe694b0bc6f8238b645cbffe7c3ef7c4b3f6a6899670e5a306b494e819af2d4dd1cf052f1&mpshare=1&scene=1&srcid=&sharer_sharetime=1566830719714&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [44 道 JS 难题，做对一半就是高手](https://www.jianshu.com/p/e161bd720e64)
-   [JS 20 道概念虽老但也略有收获的 JS 基础题](https://www.cnblogs.com/echolun/p/13363457.html)
-   [精选十道前端面试题](https://zhuanlan.zhihu.com/p/373484984)
-   [字节跳动最爱考的前端面试题：JavaScript 基础](https://mp.weixin.qq.com/s/kh8H5YkFiJOgRH7hAzXfGQ)
-   [一网打尽那些经常被问到的手写题](https://mp.weixin.qq.com/s/YhPAOl1blr03XyiNpKTcKw)
-   [三刷红宝书之 JavaScript 的引用类型](https://juejin.cn/post/6844903910541361165)
