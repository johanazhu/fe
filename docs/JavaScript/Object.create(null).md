# Object.create(null)

前言：

> 在 Vue和Vuex的源码中，作者都是用了`Object.create(null)` 来初始化一个对象。为什么不是用更简洁的 {} 呢



先说结论：

1. 你如果需要一个非常干净且高度可定制的对象当做数据字典的话，可以使用 Object.create(null)
2. 想节省 `hasOwnProperty` 带来的一丢丢性能损失并且可以偷懒少些一点代码的时候



```javascript
const create = (proto) => {
  let Noop = function () {};
  Noop.prototype = proto;
  return new Noop();
};
```





## 参考资料

- [详解Object.create(null)](https://juejin.cn/post/6844903589815517192)