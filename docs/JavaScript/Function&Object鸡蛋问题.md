# Function&Object鸡蛋问题



`Function.__proto__ === Function.prototype` 引发的鸡生蛋蛋生鸡问题

Object.prototype、Function.prototype、function Object、function Function 之间的关系



```javascript
Object instanceof Function 		// true
Function instanceof Object 		// true

Object instanceof Object 		// true
Function instanceof Function    // true
```

`Object` 构造函数继承了 `Function.prototype`，同时 `Function` 构造函数继承了`Object.prototype`。这里就产生了 **鸡和蛋** 的问题。为什么会出现这种问题，因为 `Function.prototype` 和 `Function.__proto__` 都指向 `Function.prototype`。

```javascript
// Object instanceof Function 	即
Object.__proto__ === Function.prototype 					// true

// Function instanceof Object 	即
Function.__proto__.__proto__ === Object.prototype	// true

// Object instanceof Object 		即 			
Object.__proto__.__proto__ === Object.prototype 	// true

// Function instanceof Function 即	
Function.__proto__ === Function.prototype	
```





### 参考资料

[JS 究竟是先有鸡还是有蛋](https://www.cnblogs.com/echolun/p/12384935.html)

[JavaScript 世界万物诞生记](https://zhuanlan.zhihu.com/p/22989691)