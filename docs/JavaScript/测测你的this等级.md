# 测测你的this等级



### Example 7

```javascript
var obj = {
    a: 1,
    foo: function(fn) {
        console.log(this);
        fn()
    }
}

obj.foo(function() {
    console.log(this);
})
```

函数 `function() {console.log(this)}` 被当作一个参数传入了 `obj.foo()` 中

最开始，我也中招了，

后来想了像，this 的准则是什么，谁调用我，我就指向谁，在这一题中，我们将 `function() {conole.log(this)}` 当作一个参数传入了 `obj.foo()` 中，在这里， `fn()` 调用，谁调用它呢？

`obj.foo()` 吗？NO。他只是把函数 `function() {console.log(this)}` 传到 `obj` 中，而 `fn` 被独立调用，所以真正调用它的是 window



我们实际上是将属性分配给了在调用函数时绑定到”this“上的新创建的空对象

一旦函数执行完成，就会返回这个刚被创建的对象





参考资料： 

this测试第一部分  https://juejin.cn/post/6844903652209999886

this测试第二部分https://juejin.cn/post/6844903652583276552