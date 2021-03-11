# 模拟instanceof的实现



什么是intanceof

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)上的解释：

>  **`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。 

它的特点在于能迎着原型链一直找，找到返回true，找不到返回 false

特点二：左边 instanceof 右边的结构



别人的写法：

拉勾：若离

```javascript
function myInstanceof(left, right){
    // 这里先用 typeof 来判断基本数据类型，如果是，直接返回 false
    if (typeof left !== 'object' || left === null) return false
	// getProtypeOf 是 Object 对象自带的 API，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left)
    while(true) {		// 循环往下寻找，知道找到相同的对象
        if(proto === null) return false
        if(proto === right.prototype) return true // 找到相同的原型对象，返回 true
        proto = Object.getPrototypeOf(proto);
    }
}
```



 Nealyang ：

```javascript
function instance_of(L, R) { // L 表示做表达式，R 表示右表达式
    var O = R.prototype; // 取 R 的显示原型
    L = L.__proto__; // 取 L 的隐式原型
    while (true) {
        if (L === null) return false;
        if (O === L) return true; // 这里重点：当 0 严格等于 L 时，返回 true
        L = L.__proto__;
    }
    
}
```















