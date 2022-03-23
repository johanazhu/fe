# 模拟题四

1. react 为什么需要 fiber

考察点： fiber

react 16 提出的架构，又是工作单位，又是数据结构
因为 react 16 之前的架构会在大组件更新时出现卡顿问题，所以 react 16 之后就采用异步更新的架构，这个架构就叫 fiber。同样，它可以作为静态的数据结构，每个 fiber 节点对应一个 React element，保存了该组件的类型、对应的 DOM 节点等信息；它作为动态的工作单位来说，每个 fiber 节点保存了本次更新中该组件改变的状态、要执行的工作（需要删除、插入、更新）

2. redux 中间件机制

考察点：redux 核心逻辑

增强器
applyMiddleware 函数，装饰器模式

3. bind 的实现

考察点：bind 的实现

```javascript
function mybind(context = window, ...args) {
  if (this === Function.prototype) {
    return new TypeError('不能使用');
  }
  let _this = this;
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    } else {
      return this.apply(this, ...args, ...arguments);
    }
  };
}
```

4. 说下 generator 原理

考察点： generator 原理

生成器
yield 生成一个断点
next 继续执行

5. flex 布局有什么好处

考察点： flex 布局

flex 弹性布局，布局更加简单

flex: 1 是什么意思，flex：1 1 0
扩展时剩余部分等比，收缩时，剩余部分等比
flex 默认： 0 1 auto

6. 如何定位内存泄漏

考察点： 内容泄露

看 F12 内存-快照-closure

7. 渲染合成层是什么

考察点：渲染合成层

页面渲染时，dom 树和 css 树的结合
浏览器渲染的三个步骤，解析，渲染，绘制
解析:HTML 被解析为 DOM 树，CSS 被解析为 CSS 规则树，JavaScript 通过 DOM API 和 CSSOM API 来操作 DOM 树和 CSS 规则树
渲染：浏览器引擎通过 DOM 树和 CSS 规则树构建 渲染树，这其中进行大量的回流和重绘
绘制：最后调用操作系统的 Native GUI 的 API 绘制画面

那么什么是渲染合成层呢？页面是由一个个层叠加组成，

8. babel 是什么，怎么做到的

考察点： babel 原理

babel 是什么？一个 javascript 编译器
babel 是一个转译器，感觉相对于编译器 compiler，叫转译器 transpiler 更准确

9. http2 有哪些不足，http3 是什么

考察点： http2 、http3
http2 的缺点：tcp 的队头阻塞，
http3 解决 tcp 的队头阻塞
基于 UDP 协议的“QUIC”协议

10. 实现一个发布订阅模式

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
