# 手写汇总导航



[拷贝的秘密](./拷贝的秘密.md)

[模拟call和apply的实现](./模拟call和apply的实现)





## 手写 ajax

## 手写 call

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}
var person = new Person('zhang', 23)
var obj = {}
Person.call(obj,'wang',30) // this指向obj
// obj = {age:30,name:"wang"}
```

## 手写apply

## 手写 bind

## 手写 new

1.新生成了一个对象

2.链接到原型

3.绑定 this

4.返回新对象

```javascript
function create(){
    // 创建一个空的对象
    let obj = new Object()
    // 获得构造函数
    let Con = [].shift.call(arguments)
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments)
    // 确保 new 出来是个对象
    return typeof result === 'object' ? result : obj
}
```

## 手写 防抖

## 手写 节流

https://segmentfault.com/a/1190000018257074





死磕 36 个 JS 手写题

https://mp.weixin.qq.com/s/Fra63OYWVN4_rQehTn6o7w