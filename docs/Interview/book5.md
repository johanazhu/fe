# 模拟题五





## 1.CSS 选择器有哪些

考察点：CSS 选择器
id 选择器、class 选择器、标签选择器、通用选择器、属性选择器、相连选择器、子选择器、后代选择器、伪类选择器



## 2.手写源码：数组去重

给定一个数组 ` [1,2,2,4,null,null,'3','abc',3,5,4,1,2,2,4,null,null,'3','abc',3,5,4]`， 去除重复项

> PS：面试的时候一般不会允许你使用 ES6语法和 JS API 或者即使允许你也会让你写出多个方法越多越好，这里我们都写

```javascript
const arr =  [1,2,2,4,null,null,'3','abc',3,5,4,1,2,2,4,null,null,'3','abc',3,5,4]

// Array.from + new Set 
const unique = function (arr) {
    // new Set 返回的是集合
    return Array.from(new Set(arr)) 
}

// 展开运算符 + new Set
const unique = function (arr) {
    // new Set 返回的是集合
    return [...new Set(arr)]
}

// Map 
const unique = function (arr) { 
	let map = new Map()
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (map.has(item)) {
            continue;
        }
        map.set(item, true)
        result.push(item)
    }
	return result
}
// PS：map 和 对象的区别在于 map 的 key 可以是任何值

// 双 for 循环
const unique = function (arr) {
     for (let i = 0; i < arr.length; i++) {
        for (let j=i+1; j <arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1)
                j--;
            }
        }
    }
    return arr
}

// indexOf
const unique = function (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (result.indexOf(item) < 0) {
            result.push(item)
        }
    }
    return result
}

// filter 
const unique = function (arr) {
    let res = arr.filter((item, index, array) => {
        return array.indexOf(item) === index;
    });
    return res;
}

// includes
const unique = function (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (!result.includes(item)) {
            result.push(item)
        }
    }
    return result
}

// reduce + includes
const unique = function (arr) {
    const res = arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], [])
    return res;
}
// PS: reduce callback 中的 prev 为上一次调用callback 的结果，cur 为当前值
```

> map 和 对象的区别在于 map 的key可以是任何值

衍生问题：对象中的去重、数组中包含多层嵌套对象去重

### 数组对象去重

```javascript
const arr = [
    { id: 1, name: 'John' },
    { id: 1, name: 'elaine' },
    { id: 2, name: 'johnny' },
    { id: 3, name: 'react' },
    { id: 3, name: 'vue' },
    { id: 4, name: 'javascript' },
    { id: 5, name: 'css' },
];
      
// 双循环
const unique = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i].id === arr[j].id) {
                arr.splice(j, 1);
                j--
            }
        }
    }
 	return arr
}


// new Set + JSON.stringyify
const unique = function (arr) {
    // 先把每一项转成字符串，再在数组中通过 Set 去重
    const set = new Set(arr.map(JSON.stringify))
    // Array.from 将 Set 后的对象转换成 Array
    const _arr = Array.from(set).map(JSON.parse)
    return _arr
}


// reduce
const unique = function (arr) {
    const result = arr.reduce((prev, cur) => {
        prev[cur.id] = cur
        return prev
    }, {})
    console.log(result)
    return Object.values(result)
}
// PS: Object.values() 对象转数组

// filter
const unique = function (arr) {
    return arr.filter((item, index, arr) => {
        return arr.findIndex(t => t.id === item.id) === index
    })
}

// Map + for 
const unique = function (arr) {
    let map = new Map;
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (map.has(item.id)) {
            continue;
        }
        map.set(item.id, true)
        result.push(item)
    }
    return result
}
```



## 3. 作用域

考察点：作用域
JavaScript 的作用域是词法作用域，其特点是在那里定义它就作用在那里，与定义位置有关而与调用位置无关

作用域分为全局作用域、函数作用域、块级作用域

全局作用域顾名思义，全局中只有一个

函数作用域只作用于函数中，函数内的变量函数外不能调用。

块级作用域仅在 let、const 声明时才会形成

因为函数作用域的特点使得作用域有链状，即作用域链

作用域又有闭包的产生



## 4.Es Module 和 CommonJs

类似问题：前端模块化机制有哪些

考察点：模块化历程 

顺序：commonJS-ADM/CMD-ES6

ES6 import 模块引入 ESModule

node commonJS

AMD 使用 requireJS 来编写模块化，依赖必须提前申明好；推崇返回值的方式对外输出

CMD 玉伯提出，使用 seajs 来编写模块化，支持动态引入依赖，推崇通过给 module.exports 赋值的方式对外输出

CommonJS 与 ES6 模块的区别？

CommonJS 输出的是一个值的拷贝，ES6 模块输出的是值的引用

CommonJS 模块是运行时加载，ES6 模块是编译时输出接口







## 5.React： useMemo、useCallback是什么

考察点：useCallback、useMemo

useCallback：缓存函数，结合 memo 能让子组件不重复渲染

useMemo：缓存值，结合 memo 能让子组件不重复渲染

衍生问题：除了useCallback和 useMemo，React 还有那些性能优化的点



### 除了useCallback和 useMemo，React 还有那些性能优化的点







## 6. React：说说你做的组件





## 7.html缓存了怎么更新，js和css缓存是怎么更新的





## 8.babel 是什么，怎么做到的 ⭐

考察点： babel 原理

babel 是什么？一个 javascript 编译器
babel 是一个转译器，感觉相对于编译器 compiler，叫转译器 transpiler 更准确



## 9.进程和线程的区别

考察点：进程和线程
进程是一个应用起来的实例，线城是运行在进程中的最小单位

7. tcp 滑动窗口是什么

考察点：tcp

## 10. 算法题：无重复字符的最长子串

考察点：无重复字符的最长子串
