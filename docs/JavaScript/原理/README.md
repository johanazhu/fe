# JavaScript 源码实现

其实也是导航

[拷贝的秘密](./拷贝的秘密.md)

[模拟 call 和 apply 的实现](./模拟call和apply的实现)







## 手写 ajax

## 手写 call

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}
var person = new Person("zhang", 23);
var obj = {};
Person.call(obj, "wang", 30); // this指向obj
// obj = {age:30,name:"wang"}
```

## 手写 apply

## 手写 bind

## 手写 new

1.新生成了一个对象

2.链接到原型

3.绑定 this

4.返回新对象

```javascript
function create() {
    // 创建一个空的对象
    let obj = new Object();
    // 获得构造函数
    let Con = [].shift.call(arguments);
    // 链接到原型
    obj.__proto__ = Con.prototype;
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments);
    // 确保 new 出来是个对象
    return typeof result === "object" ? result : obj;
}
```

## 手写 防抖

## 手写 节流

## 参考资料

-   [各种源码实现，你想要的这里都有](https://juejin.cn/post/6844903989083897870)
-   [高阶函数，你怎么那么漂亮呢！](https://juejin.cn/post/6844903592822833160)
-   [彻底分清 JS 数组的 forEach()和 map()](https://mp.weixin.qq.com/s?__biz=MzAxOTAzNjUwMg==&mid=2448541544&idx=1&sn=4a48245e6b86c4bfe5a8c9d961843d1c&chksm=8fc84751b8bfce47e4a7917b171e9b7aa22c2e76cff2b3378cd4f5d3f0ed5fffc28e4fa50bf8&mpshare=1&scene=1&srcid=&sharer_sharetime=1582765351996&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [关于 JS 中一些重要的 api 实现, 巩固你的原生 JS 功底](https://mp.weixin.qq.com/s?__biz=MzA3MzA5MDY2NA==&mid=2247485500&idx=1&sn=45b0e7a9025ee98c8355d5f2035d4cd2&chksm=9f151b3ba862922da1ef47692a2c841042f990cd173ca75ee5e481887f8c5938345ed79059d5&mpshare=1&scene=1&srcid=&sharer_sharetime=1566983688644&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [50 行代码的 MVVM，理解闭包的艺术](https://github.com/imaoda/js-front-end-practice/blob/master/50%E8%A1%8C%E4%BB%A3%E7%A0%81%E7%9A%84MVVM%EF%BC%8C%E7%90%86%E8%A7%A3%E9%97%AD%E5%8C%85%E7%9A%84%E8%89%BA%E6%9C%AF.md)
