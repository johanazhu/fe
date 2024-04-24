# 模拟题八

## 1.行内元素、块级元素有哪些，区别是什么

考察点：行内元素、块级元素



## 2. 实现一个发布订阅 

考察点：常用设计模式

观察者模式需要知道被观察者

发布订阅模式无需知道对方，通过监听数据

```javascript
class EventPubSub {
    constructor() {
        this.event = {};
    }

    on(type, callback) {
        if (!this.event[type]) {
            this.event[type] = [callback];
        } else {
            this.event[type].push(callback);
        }
    }

    off(type, callback) {
        if (!this.event[type]) {
            return;
        }
        this.event[type] = this.event[type].filter((item) => {
            return item != callback;
        });
    }

    emit(type, ...args) {
        if (!this.event[type]) {
            return;
        }
        this.event[type].forEach((callback) => {
            callback.apply(this, args);
        });
    }

    once(type, callback) {
        function f() {
            callback();
            this.off(type, f);
        }
        this.on(tyoe, f);
    }
}
```



## 3.垃圾回收机制

考察点：v8 垃圾回收

https://febook.hzfe.org/awesome-interview/book2/browser-garbage



## 4.ES6特性：箭头函数和普通函数的区别

考察点：箭头函数

哪些地方不能使用箭头函数



## 5.react中一个父组件，两个子组件，一个传props，一个不传props，父组件重新渲染，两个子组件会不会都重新渲染



## 6.React17、18 更新以及什么是服务端组件



## 7. interface 和 type 的区别



## 8.项目构建工具有考虑换vite吗？vite有什么优势？









## 9.3 次握手过程

第一次握手客户端向服务端发送一个报文，第二次是服务端收到报文后，会应答一个报文给客户端。第三次是客户端收到报文后再给服务端发送一个报文，三次握手久成功了

考察点：tcp



## 10.算法题：最大子序和
