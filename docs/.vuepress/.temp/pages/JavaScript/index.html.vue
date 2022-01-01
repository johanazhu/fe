<template><h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h1>
<blockquote>
<p>一生的知识积累，自学的起码占90%</p>
</blockquote>
<p>抛开其他的，我们站在3年工作的基础上，你脑子里能想到那些与 JavaScript 语言有关的关键字。</p>
<p>类型、对象、函数、原型、原型链、this、词法作用域、作用域链、执行上下文、闭包、垃圾回收、事件循环...</p>
<p>每一个知识点与知识点间互相联系，互相交叉引用，这就像一座座城市，城市有城市群，大的城市群就是一个大的知识点，每个小的知识点之间也是有联系的</p>
<p>如果把前端知识点比作中国地图，我想 JavaScript 基础就像是长三角地区，这是中国最重要的地方之一，也是一名五年前端必考的知识点</p>
<p>我会先讲</p>
<p><RouterLink to="/JavaScript/JavaScript%E6%98%AF%E4%BB%80%E4%B9%88.html">JavaScript是什么</RouterLink></p>
<ul>
<li>JavaScript精粹中的核心部分，概括的讲。他的难点在哪里，需要注意的是什么等等</li>
</ul>
<p><a href="./JavaScript%E7%94%B1%E4%BB%80%E4%B9%88%E7%BB%84%E6%88%90">JavaScript由什么组成</a></p>
<ul>
<li>基本类型和引用类型
<ul>
<li>基本类型是直接克隆</li>
<li>引用对象是引用，所以也被称为引用类型
<ul>
<li>引用类型又分为Object，Function，Array等数据类型</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>知道了JavaScript的所有数据类型后，我们要判断每个数据类型，比如用typeof 来判断，instanceof，Object.prototype.toString.call(source)方法判断，它们的优缺点是什么。综上总结自己手写一个判断数据类型的库，isType()</p>
<p>这时，我们隆重介绍引用类型（基本类型没什么好介绍了），也就是所谓的<RouterLink to="/JavaScript/%E4%B8%80%E5%88%87%E7%9A%86%E5%AF%B9%E8%B1%A1.html">一切皆对象</RouterLink></p>
<p>在这一节里，我们分析对象的组成，对象间是如何存值的，以及对象的....。最主要了解的是如何复制对象，也就是深拷贝的内容，这里会与浅拷贝做比较，并且做对比，再后面<RouterLink to="/JavaScript/%E5%8E%9F%E7%90%86/%E6%8B%B7%E8%B4%9D%E7%9A%84%E7%A7%98%E5%AF%86.html">手写深拷贝</RouterLink>，一步一步了解深拷贝的制作过程</p>
<p>我们已经大致上了解对象这个概念了，接下来我们就挨个来认识引用类型中的数据类型，先从最广泛的 <RouterLink to="/JavaScript/%E5%AF%B9%E8%B1%A1.html">Object</RouterLink> 来谈起，Object 的各个方法和属性（附上脑图）</p>
<p>接着我们聊聊 <RouterLink to="/JavaScript/%E4%BD%9C%E7%94%A8%E5%9F%9F.html">Function</RouterLink>，为什么说函数是第一公民，函数凭什么在 JavaScript 中这么吃香（因为它，有人以函数式编程的思维写代码，JS本身是面向对象的编程语言，函数的强大让他的写法多了一种）</p>
<p>同样的，我们也从Function的方法和属性讲起，逐个讲解，这其中牵扯到 难点 This，作用域，原型链</p>
<p>Function()</p>
<p>重难点突破</p>
<p>​	什么是作用域，首先你要知道什么是词法作用域</p>
<p>​	手写call，apply，bind，手写new，手写节流和防抖，手写深浅拷贝</p>
<p>也就是所谓的提纲</p>
<p>要确认好</p>
<p>珠峰架构课里对javascript 高级的课程安排</p>
<ul>
<li>call、apply、bind、new等手写实现</li>
<li>原型链和闭包深入</li>
<li>执行上下文和作用域链</li>
<li>深拷贝和浅拷贝</li>
<li>防抖和节流</li>
<li>词法分析和语法分析</li>
<li>常量、解析、模板字符串、解构操作符、箭头函数、数组新方法、生成器和迭代器等ES6语法</li>
<li>Symbol 愿变成、Set和Map应用以及 WeakMap、Object.defineProperty 以及下一代的 Proxy&amp; Reflect、ESModule实现、浏览器和Node.js中的EventLoop</li>
<li>V8 内存管理、垃圾收集、引用记数、标记清除、标记整理和增量标记</li>
<li>高阶函数、发布订阅和观察者模式、Promise核心应用、generator和实现co库、async+await原理、实现完整的PromiseA+类库、包括reduce、all、finally、tru等方法</li>
</ul>
<p>原型和原型链(typeof &amp;&amp; instanceof)
this的指向（apply, call, bind）
作用域
闭包</p>
<p>深拷贝和浅拷贝</p>
<p>以前面试的时候常害怕别人问：<strong>原型</strong> 、<strong>原型链</strong> 、<strong>闭包</strong> 、<strong>继承</strong>、<strong>构造函数</strong> ，<strong>this</strong> ， 后来过了一年，我害怕别人问 防抖和节流、promise、深拷贝和浅拷贝、react、webpack的优化，再后来就是 基础的算法问题，</p>
<p>说不知道，是撒谎。但也谈不上章口就来。说到底，还是基础不扎实，其本质没理解到位，所以需要写点东西加深自己的印象。</p>
<p>要将这些盘活，连成一个大网</p>
<p>常见面试题：</p>
<p>https://mp.weixin.qq.com/s/kh8H5YkFiJOgRH7hAzXfGQ</p>
</template>
