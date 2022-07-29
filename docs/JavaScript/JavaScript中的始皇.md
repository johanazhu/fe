# JavaScript 中的始皇

## 前言

笔者在[继承](./继承.md)中发了一题关于原型链关系图的题，题目来源自颜海镜的[如何回答面试中的JavaScript原型链问题](https://zhuanlan.zhihu.com/p/356980105)，这题确实很好，当画完它时，会有种看到这幅图的感觉

![Object Layout](https://i.loli.net/2021/06/08/BjVYFWQr1lfkHd8.png)

确实，这图一看很懵，搞不懂。再来看看这几段代码

```javascript
Object instanceof Object // true
Function instanceof Function // true
Object instanceof Function // true
Function instanceof Object // true
```

为什么会如此，Object 和 Function 谁才是始皇，还有 Object.prototype 处于什么位置，Function.prototype 呢？

在知乎曾讨论过这个话题，[JS中先有Object还是先有Function？](https://www.zhihu.com/question/35442532)

这里，笔者写一写谁才是最先出现的始皇

## 正文

在写[一切皆对象](./一切皆对象.md)时，笔者阐释 JavaScript 中的对象有内置对象，而这些内置对象是语言内部创建，这些内置对象都是构造函数，即又被称为内置构造函数，它们存在的目的是为了让开发者更方便的书写代码。这些内置构造函数包括 Object、Function、Array、String、Number、RegExp 等等

因为它们是构造函数，所以它们必然属于函数，因为是函数，所以它们都是 Function 创建的，因为是 Function 创建的，所以它们都是 Function 的实例，即

```javascript
String instanceof Function // true
Array instanceof Function // true
Function instanceof Function // true
Object instanceof Function // true
```

所以它们的原型链关系图是

![image-20220728150703060](C:/Users/hanbo/AppData/Roaming/Typora/typora-user-images/image-20220728150703060.png)

又因为 Function 是函数，所以它有 prototype 属性。因为函数也是对象，所以 Function 也有 constructor 和 [[Prototype]]，它的关系图是

![image-20220728150837979](C:/Users/hanbo/AppData/Roaming/Typora/typora-user-images/image-20220728150837979.png)

所以就有了

```javascript
Function.__proto__ === Function.prototype
```

即：

![image-20220729102217620](C:/Users/hanbo/AppData/Roaming/Typora/typora-user-images/image-20220729102217620.png)

在 [原型](./原型.md) 中，我们讲到了原型链，因为每个对象都有[[Prototype]]属性，它会指向它的原型对象，一层一层，最终指向 null。而 null 的上一站是 Object.prototype

无论你是构造函数的原型，还是自定义对象的原型，都会先指向 Object.prototype，再由 Object.prototype 指向 null

```javascript
String.prototype.__proto__ === Object.prototype // true
Number.prototype.__proto__ === Object.prototype // true
Array.prototype.__proto__ === Object.prototype // true
Function.prototype.__proto__ === Object.prototype // true
Object.prototype.__proto__ === null // true

var obj = {};
var arr = [];
function func() {}
obj.__proto__ ===  Object.prototype // true
arr.__proto__.__proto__ === Object.prototype // true
// arr.__proto__ 指向 Array.prototype
func.__proto__.__proto__ === Object.prototype // true
// func.__proto__ 指向 Function.prototype
```

它们的原型链关系图如下所示：

![image-20220728153704151](C:/Users/hanbo/AppData/Roaming/Typora/typora-user-images/image-20220728153704151.png)

![image-20220729092451094](C:/Users/hanbo/AppData/Roaming/Typora/typora-user-images/image-20220729092451094.png)

所以看代码和图我们知道，所有原型继承的源头都在 Object.prototype，Object.prototype 对象上的属性，会被任何值使用，所以判断类型最准确的办法是 `Object.prototype.toString.call(source)`

如果我们将构造函数的源头和原型的源头结合一下，就成了这样：

![image-20220729094113885](C:/Users/hanbo/AppData/Roaming/Typora/typora-user-images/image-20220729094113885.png)

此图和 Object Layout 的图大差不差，关键在于 Object 和 Function

Object.prototype 的原型之母，任何原型都源自它

Function.prototype 是构造函数之母，任何构造函数都由它创建，包括它自己

理解了这两点，我们再回过头看这个问题

```javascript
Object instanceof Object // true
// Object 由 Function.prototype 创建，Function.prototype 的原型对象指向 Object.prototype
Function instanceof Function // true
// Function 由 Function.prototype 创建
Object instanceof Function // true
// Object 由 Function.prototype 创建
Function instanceof Object // true
// Function 由 Function.prototype 创建，Function.prototype 的原型对象指向Object.prototype
```

注意一点：构造函数也是实例，找出创建他们的构造函数和原型就能明白



## 总结

谁是始皇，无疑。Object.prototype 才是真正的始皇，任何原型都源自它；而 Function.prototype 是仅次于 Object.prototype 的存在，它是内置构造函数的创建者，任何构造函数都由它



