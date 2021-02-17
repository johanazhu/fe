# 模拟bind的实现



为什么





前端下午茶的bind模拟

testBind 创建并返回新的函数，在新的函数中将真正要执行业务的函数绑定到实参传入的上下文，延迟执行了

```javascript
Function.prototyoe.testBind = function(scope) {
    return () => this.apply(scope)
}
var foo = { x: 888 }
var bar = function() {
    console.log(this.x)
}.testBind(foo)			// 绑定
bar()				// 88
```





https://juejin.cn/post/6844903846829883399





