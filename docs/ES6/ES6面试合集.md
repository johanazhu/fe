# ES6面试合集



### Q：箭头函数和普通函数有什么区别？

- 箭头函数没有自己的 this 对象，函数体内的 this 是定义时所在的对象而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以对箭头函数使用 new 命令，否者会抛出一个错误
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替（[ES6完全指南](../ES6完全指南.md)）
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数（[迭代器与生成器](../Iterator&Generator/md)）

### Q： class B 继承 class A 翻译成 es5 应该是什么样子



```javascript
function A() {}

function B() { A.call(this) }

B.prototype = Object.create(A.prototype)

B.prototype.constructor = B
```



















## Array的方法，那些会改变原数组，那些不会

改变数组：

shift、unshift、pop、push、reverse、sort、splice、fill、copyWidthin

不改变数组：

concat、join、slice、map、filter、forEach、some、every、reduce

## 垃圾回收



## 迭代器







## 类数组和数组的区别在哪里



类数组

1. 拥有 length 属性和所感索性属性的对象
2. 不具有数组所具有的的方法



类数组是一个普通对象，而真实的数组是 Array 类型



常见的类数组有：arguments、DOM 对象列表（document.querySelectorAll）



类数组转换为数组



1. Array.prototype.slice.call(arrayLike, 0)
2. [...arrayLike]
3. Array.from(arrayLike)





## 参考资料

- 