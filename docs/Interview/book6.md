# 模拟题六



## 1. CSS 优先级是怎么计算的

考察点：CSS 优先级

!important > 内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

CSS 相关性能优化



## 2. 手写 apply、call、bind 

考察点：主动修改 this 的指向

相关文章：[call、apply、bind三大将](../JavaScript/call、apply、bind三大将)

### apply

```javascript
Function.prototype.myapply = function (context = window, args) {
    if (this === Function.prototype) {
        return undefined;
    }
    const fn = Symbol()
    context[fn] = this
    
    let result;
    if (!Array.isArray(args)) {
        result = context[fn]()
    } else {
        result = context[fn](...args)
    }
    
    delete context[fn]
    return result
}
```



### call

```javascript
Function.prototype.mycall = function (context = window, ...args) {
    if (this === Function.prototype) {
        return undefined;
    }
    const fn = Symbol();
    context[fn]= this;
    const result = context[fn](...args)
    delete context[fn]
    return result
}
```



### bind

```javascript
Function.prototype.mybind = function (context, ...args1) {
    if (this === Function.prototype) {
        return new TypeError('Error')
    }
    const _this = this;
    return function F(...args2) {
        if (this instanceof F) {
            return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
    }
}
```

> 一个绑定函数也能使用 new 操作符创建对象，就像把原函数当做构造器。



### 衍生问题

Symbol、数据类型、instanceof、new



#### Symbol

唯一值，ES6新增



#### 数据类型

分为基本类型和引用类型

基本类型包含：undefined、null、string、number、boolean、symbol（ES6 新增）、bigint（ES10 新增）

引用类型：object

基本类型存在栈内存中，引用类型存在堆内存中

判断数据类型的方式有四种： typeof、instanceof、constructor、Object.prototype.toString.call()



#### 手写 instanceof

```javascript
function myInstanceof (left, right) {
    if (typeof left !== 'object' || typeof left === null) return false;
    
   	let proto = Object.getPrototypeOf(left);
    while(true) {
        if (proto === null) return false
        
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}
```



#### 手写 new

```javascript
function new2(Constructor, ...args) {
    let obj = Object.create(null);
    obj.__proto__ = Constructor.prototype;
    const result = Constructor.apply(obj, args)
    return typeof result === 'object' ? result : obj
}
```



## 3. 谈谈变量提升

考察点：变量提升
变量是会提升的。var 申明的变量会提升至顶部，然后赋值时在执行
函数提升的权重大于变量提升



## 4. let 和 const

类似问题：let、var、const的区别



## 5.React 中的多次渲染如何优化





## 6. useEffect useLayoutEffect useLayoutEffect使用场景







## 7.  WebApp：适配方案

1px怎么实现



## 8. 浏览器：Cookie、localStorage、sessionStorage、IndexedDB的区别





## 9. 谈下 webpack loader 机制

考察点：webpack loader 机制



## 10.算法题：有效的括号



