# 模块化的发展
我想说的就是模块化的发展啊

介绍模块化发展历程

IIFE(声明即执行的函数表达式)，特点：**在一个单独的函数作用于中执行代码，避免变量冲突**

```javascript
(function(){
    return {
        data: []
    }
})()
```

**AMD:** 使用requireJS 来编写模块化，特点：**依赖必须提前声明好**

```javascript
define('./index.js', function(code) {
    // code 就是index.Js 返回的内容
})
```

**CMD:** 使用seaJS 来编写模块化，特点： **支持动态引入依赖**

```javascript
define(function(require, exports, moduke) {
    var indexCode = require('./index.js')
})
```

**CommonJS:**  nodejs 中自带的模块化

```javascript
var fs = require('fs')
```

 exports指向module.exports，即exports = model.exports

**UMD:**  是AMD 和 CommonJS 的糅合，跨平台的解决方案

**ES Modeles：** ES6引入的模块化，支持import来引入另一个js


ES6模块与CommonJS模块的差异

CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

CommonJS 模块是运行时加载，ES6 模块是编译时输出接口



https://github.com/mqyqingfeng/Blog/issues/108