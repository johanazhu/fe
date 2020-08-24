# Class 
你还好吗

ES6 class的静态方法、属性和实例属性

https://www.jianshu.com/p/8678895ebb1c



https://segmentfault.com/a/1190000021285915





ES6中最容易误会的语法糖Class - 基本用法

https://medium.com/enjoy-life-enjoy-coding/javascript-es6-%E4%B8%AD%E6%9C%80%E5%AE%B9%E6%98%93%E8%AA%A4%E6%9C%83%E7%9A%84%E8%AA%9E%E6%B3%95%E7%B3%96-class-%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95-23e4a4a5e8ed







class 与 prototype 继承

之前讲原型的时候说过，基于原型（prototype）的继承是继承了结构，数据，行为；而class的继承，继承的是行为和结构，但没有继承数据。并且我们举了个例子

```javascript
class Test {
    a: 1;
	constructor() {
        this.b = 1;
    }
	show() {
        return a + b;
    }
}
const test = new Test();
```

**为了迎合 class 的基本行为， prototype 继承数据的能力被屏蔽了**

![prototype屏蔽继承数据能力迎合class](..\.vuepress\public\images\JavaScript\prototype屏蔽继承数据能力迎合class.png)

而如果想要让继承者继承数据，就要在prototype上写

在React源码中，也有这样的代码出现。React 有两种写法（createElement已经摒弃），基于类的写法和基于函数的写法。如何判断两者呢?

```javascript
class Component {
    constructor() {}
    
    componentDidMount() {}
    
    setState(partialState) {}
    
    render() {}
}
// 给 Componet 组件的原型上添加属性，让其继承，来区分函数还是类
Component.prototype.isReactComponet = true
```

```javascript
// src/index.js
...
const createElement = (type, props = {}, ...children) => {
    /**
     * 如果是类组件
     * 1.创建一个实例
     * 2.调用实例的 render 方法
     */
    if (type.prototype && type.prototype.isReactComponent) {
        const componentInstance = new type(props);

        return componentInstance.render();
    }
    //如果是函数组件，那么调用它，并返回执行结果
    if (typeof (type) == 'function') {
        return type(props);
    }
    return h(type, { props }, children);
};
...
```

