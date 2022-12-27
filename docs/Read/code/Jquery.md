# jQuery 源码学习笔记



在学习之前，先问问自己，有必要学吗，学的目的是什么？现在前端开发中，使用就 jQuery 的地方很少，但是还是有必要学，为什么？因为这个库写的好，我们学习这个库，不仅为了面试，更理想的设定是为以后写出这样的库先学习

笔者带以下几个问题来看 jQuery 的源码

- jQuery 的无 new 构造函数


- jQuery 有哪些设计模式


- jQuery 是如何实现 「重载」的？


- jQuery 缓存系统如何实现？


- jQuery 的插件系统如何设计的？
- jQuery 如何实现链式操作的？

- jQuery 是如何做浏览器特性检测的？


- 为什么有人认为 jQuery 的 API 设计很优雅？




## jQuery 的无 new 构造函数

先看看使用 jQuery 时的场景：

```javascript
// 无 new 构造
$(".p").text("hello, world")
// 使用 new 构造
var p = new $(".p")
p.text("hello, world")
```

一般情况下，我们都使用无 new 构造的方式使用 jQuery，在看 jQuery 源码之前，我们先尝试下，如果我们要做个库应该会先怎么做？

传统思路：

```javascript
function jQuery(name, age) {
    // 实例属性
    this.name = name;
    this.age = age;
    // 实例方法
    this.sayName = function () {
        console.log('My name is', this.name)
    }
 
}

// 静态方法
jQuery.sayGoodBye = function() {
    console.log('Good Bye')
}

jQuery.prototype = {
    // 构造器指向构造函数
    constructor: jQuery,
    // 原型方法
    sayHello: function () {
        console.log('say Hello')
    }
}
```

测试用例：

```javascript
let johnny = new jQuery("Johnny", 29)
let elaine = new jQuery("elaine", 29)
```

那有没有其他模式来创建实例呢？

> 这里有个小思考：为什么不使用 new 来创建 jQuery；而硬要用 无 new 构造呢？原因是提高使用者的开发体验，如果你用new 构造 jQuery，每拿一个 DOM 节点对象，就要 new，那代码中的 new 太多了，难看

有，工厂模式。在 《JavaScript 高级编程》的第八章介绍如何创建对象中，除了我们常见的原型+构造函数模式，还有工厂模式可创建对象：

```javascript
function createPerson(name, age) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function() {
        console.log(this.name)
    }
    return o;
}

let johnny = createPerson("Johnny", 29)
let elaine = createPerson("elaine", 29)
```

如果用工厂模式模拟 jQuery，就成了：

```javascript
function jQuery(name, age) {
  function init(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
      console.log("My name is", this.name);
    };
  }
  + this.sayHello = function () {
  +   console.log("hello");
  + };
  return new init(name, age);
}
```

测试用例：

```javascript
let johnny = jQuery("Johnny", 29)
johnny.sayName() // My name is johnny
johnny.sayHello() // johnny.sayHello is not a function
```

但这样会有个问题，jQuery 构造函数返回的是一个内部 init 构造函数，也就是说实例对象是一个 init 对象，那就不能调用 jQuery 上的方法了

那，那，那，那该如何是好呢？

将内部 init 构造函数转移至原型上，原型能继承啊

```javascript
function jQuery(name, age) {
  return new jQuery.prototype.init(name, age);
}

jQuery.prototype = {
  constructor: jQuery,
  init: function (name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
      console.log("My name is", this.name);
    };
  },
  sayHello: function () {
    console.log("hello");
  },
};

jQuery.prototype.init.prototype = jQuery.prototype;
```

测试用例：

```javascript
let johnny = jQuery("Johnny", 29)
johnny.sayName() // My name is johnny
johnny.sayHello() // Hello
```

![测试用例](https://s2.loli.net/2022/12/26/vZfy8lqhtak19U7.png)

这里需要分步骤理解：

```javascript
function jQuery(name, age) {
    // 返回原型上的构造函数init
  return new jQuery.prototype.init(name, age);
}

jQuery.prototype = {
   // 保持 jQuery 的原型指针正常
  constructor: jQuery,
   // init 为构造函数
  init: function (name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
      console.log("My name is", this.name);
    };
  },
   // jQuery 上的原型，可供实例对象调用
  sayHello: function () {
    console.log("hello");
  },
};
// 最重要的是这句话，将 jQuery.prototype 赋值给 jQuery.prototype.init.prototype
jQuery.prototype.init.prototype = jQuery.prototype;
```

笔者不知道理解的对不对，看到这一源码，脑子里出现的第一场景是——“代孕”，后来想想，用养父母的角度理解或许更为恰达

我们一开始以为 `jQuery` 和 `jQuery.prototype` 是实例的"父母"，其实不是。实例对象由 `jQuery.prototype.init` new 而来，而 `jQuery.prototype.init.prototype` 则是 `jQuery.prototype` 赋值，所以实例对象才能调用 jQuery 原型上的方法

换句话说，我们先通过 jQuery 原型上的一个构造函数（init）来简化无 new 创建对象；再通过改变它原型的指针（将 `init.prototype` 赋值为 `jQuery.prototype`）实现实例对象能调原型属性和方法（简单来说是修正 this 指向）

### 看看 jQuery 构造器源码

接下来看看 jQuery 的简化版源码吧

```javascript
// 定义 jQuery 的类
var jQuery = function(selector, context) {
    // return new jQuery.prototype.init(selector, context, rootjQuery)
    // jQuery 用 init 方法创建的，它是 jQuery.fn.init 的实例而非 jQuery 的实例
    return new jQuery.fn.init(selector, context, rootjQuery)
}
// 静态方法和实例方法共享设计
// 定义 jQuery 原型的方法
jQuery.fn = jQuery.prototype = {
    jquery: 'X.X.X',
    constructor: jQuery,
    // 内部 init 类
    init: function(selector, context, rootjQuery) {
        ...
        return this;
    },
    // 原型属性，jQuery 对象的默认长度为 0
    length: 0,
    // 原型方法，略
    size: function() {},
    push: function() {},
    splice: function() {},
}
// 把 jQuery.prototype 的能力搬运到 jQuery.prototype.init.prototype 上
// 即 jQuery.prototype.init.prototype = jQuery.prototype
// 因为 jQuery.fn = jQuery.prototype，所以就用以下代码赋值（效果一样）
jQuery.fn.init.prototype = jQuery.fn
```

和我们之前所写的 jQuery 的区别在于，多了 `jQuery.fn`，它的作用是提供静态方法给 jQuery。 jQuery 中有一种写法是`$.fn`，它能直接调用 jQuery 原型上的一些方法：

![原型方法](https://s2.loli.net/2022/12/26/UuKDy1RJTlhC3mM.png)

> 既然可以用 $.prototype 来表示原型，为什么还要定义个 $.fn 呢，笔者猜测因为 fn 是 function 的简写，名字好理解，又短，写起来比  $.prototype 更舒服

如此一来，我们就解决了 jQuery 无 new 构造的疑问

概括地讲：通过工厂模式 + 将 jQuery 的构造函数附着于原型链上实现无 new 构造

## jQuery 是如何实现 「重载」的？

先不谈设计模式，顺着前文源码，我们看到 jQuery 的构造函数其实是 `jQuery.prototype.init`（或者叫 `jQuery.fn.init`，后续为书写方便，用此单词）

要想回答 jQuery 是如何重载的，就要看 `jQuery.fn.init`

先来看看 jQuery 的使用方法：

```javascript
// 9种方法的重载
// 接受一个字符串，其中包含了用于匹配元素集合的 CSS 选择器
jQuery([selector,[context]])
// 单个 DOM
jQuery(element) // $("p")
// DOM 数组
jQuery(elementArray)
// JS 对象
jQuery(object)
// 传入空参数
jQuery()
// jQuery 对象
jQuery(jQuery object) // $.ajax $.extend
// 传入原始 HTML 的字符串来创建 DOM 元素
jQuery(html,[ownerDocument]) 
jQuery(html,[attributes]) // $( "<p id='test'>My <em>new</em> text</p>" ).appendTo( "body" );
// 绑定一个在 DOM 文档载入完成后执行的函数
jQuery(callback) // $(fn) 等同于 $(document).ready(fn);
```

> 具体可在官网中查看[jQuery](https://api.jquery.com/jQuery/)
>

这九种用法整体上分为三大块：选择器、dom处理、dom加载。因为 jQuery 内部采用的是类数组对象的方式存储结构，所以我们即能可以像对对象一样处理 jQuery，也可以像数组一样使用 push、pop、shift、unshift、sort、each、map（这些API框架自己写的）等类数组的方法操作 jQuery 对象

通过用法我们也能看出，jQuery 的构造函数接受两个参数：选择器 selector 和 上下文 context，而我们的重载正是通过对这两个参数的有无，所属的类型来实现

```javascript
var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context, rootjQuery)
}
jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function(selector, context, rootjQuery) {
    	var match, elem, doc;

		// 如果是 $(""), $(null), $(undefined), $(false) 返回 jQuery 实例
		if ( !selector ) {
			return this;
		}

		// 如果是个 dom 节点的话
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// 如果 seletor 是个字符串的话
		if ( typeof selector === "string" ) {
			// 做很多判断，针对每一个情况，用 if else 来隔离	
            // ...
        // 如果是函数
		} else if ( jQuery.isFunction( selector ) ) {
            // $(document).ready(fn)
			return rootjQuery.ready( selector );
		}
        // 如果选择器中的选择器没有的话，就赋值
		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
    },
	// ...
}
```

概括地讲：所谓的重载，就是做各种 if else 判断，不过这里也有技巧，把空、只有一种场景放在最前面

## jQuery 有哪些设计模式

像前文说所的，它用了工厂模式实现了无 new 构造，它还使用了订阅模式实现数据绑定，使用了插件系统、事件委托、链式调用 等等





## jQuery 缓存系统如何实现

司徒正美的 缓存机制

weakSet 实现





## jQuery 的插件系统如何设计的？

jquery.extend



## jQuery 如何实现链式操作的？

```javascript
$("#p1").css("color","red").slideUp(2000).slideDown(2000);
```

返回 this

## jQuery 是如何做浏览器特性检测的？

## 为什么有人认为 jQuery 的 API 设计很优雅？











## 其他知识点

### IIFE营造的沙箱模式

IIFE 是为了保护变量，如何保护变量的呢？

你既然是一个库，那就有不同的方法之类，如果都写在一个文件中，引入后，方法名也许就和其他库的方法名冲突，用 IIFE 能保护库的变量不被外部函数影响

IIFE的意思是立即调用函数表达式，关键在于它首先是个函数，其次立即调用。因为是函数，所以函数中的变量收到函数作用域的保护；其次立即调用即引入就执行代码

模块加载的发展，IIFE，为什么要用这个，现代用打包工具来打包库

IIFE——AMD/CMD——ESM——ES model——现代打包工具打包库



### 命名冲突

```javascript
//jQuery1.2
var _jQuery = window.jQuery, _$ = window.$;//先把可能存在的同名变量保存起来
jQuery.extend({
    noConflict: function(deep) {
        window.$ = _$;//这时再放回去
        if (deep)
            window.jQuery = _jQuery;
        returnjQuery;
    }
})
```



core 核心模块

动画引擎：原型下的 Animation

事件：原型下的 Event



#### 多库共存

`noConflict` 

https://api.jquery.com/jQuery.noConflict/



## 换个思路理解

jQuery库的写法是工厂模式的写法，即它相当于一个工厂，你需要衣服，放入衣料（原材料），返回一件衣服；投入一块猪肉，返回猪罐头；jQuery 是你传入一个 selector，返回一个对应的实例对象。这种模式的好处是使用者不用使用 new 就能拿到一个实例对象，这个 new 的调用是框架里面实现了，直接返回给调用者一个 new 好了的实例，对于需要频繁拿多个实例的库来说，使用起来更方便

jQuert 使用的是 工厂模式，他的











## 总结

笔者也没读完所有的源码，一是已经很久没用 jQuery...





要知道无论是人，还是库，都会在抢占市场中努力，现阶段的打包器webpack、vite，前端时间的 tubrutsx 说自己的速度是 vite 的10倍，这不久被 尤大批了吗

jQuery 用 $ 符号，难道其他库没想到吗？它之前也有不少库用 $，jQuery 用 $ 一来降低开发者的学习成本，二来因为方便所以更让人接受，

在 jQuery 最开始的版本，jQuery 是支持传参的，在 v1.4 之后，jQuery 就不支持传参了，直接用 `$()` 构建一个实例，在通过`ajax()`、`.css()`、`.add()`、`.hide()` 之类的方法来操作 DOM 节点

jQuery 最核心的功能是操作 DOM，所有疑似 DOM 的东西都可以扔进`$()` 里，然后他就是 DOM 了



## 参考资料

-   [前端的jquery在2022年还适合学习吗?](https://www.zhihu.com/question/538344155/answer/2550522380)
-   [【深入浅出jQuery】源码浅析--整体架构 ](https://www.cnblogs.com/coco1s/p/5261646.html)
-   [jQuery源码剖析（五）——jQuery对象](http://rapheal.sinaapp.com/2013/01/31/jquery-src-obj/)
-   [司徒正美-jQuery源码学习笔记系列文章](https://www.cnblogs.com/rubylouvre/archive/2009/11/20/1606470.html)
-   司徒正美-JavaScript框架设计
