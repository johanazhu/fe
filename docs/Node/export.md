# export 与 module.export 的区别

导出多个成员（必须在对象中）

exports.a = 123
exports.b = 'hello'
exports.c = function(){
console.log('ccc')
}
exports.d = {
foo: 'bar'
}
导出多个成员也可以这样写

module.exports = {
foo: 'bar',
add: function () {
console.log('aa')
}
}
导出单个成员（拿到的就是：函数，字符串）
module.exports = 'hello'
以下情况会覆盖：

module.exports = 'hello'

// 以这个为准，后者会覆盖前者
module.exports = function(x, y) {
return x + y
}
exports 是 module.exports 的一个引用

console.log(exports === module.exports) // => true

exports.foo = 'bar'

// 等价于
module.exports.foo = 'bar'