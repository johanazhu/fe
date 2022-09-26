# JavaScript 是什么？

Brendan Eich 花了 10 天时间，设计完成的一门语言。它是个大杂烩，参考了多个语言，例如：

- 基本语法：借鉴 C 语言和 Java 语言
- 数据结构：借鉴 Java 语言，包括将值分成原始值和对象两大类
- 函数的用法：借鉴 Scheme 语言和 Awk 语言，将函数当作第一等公民，并引入闭包
- 原型继承模型：借鉴 Self 语言（Smalltalk 的一种变种）
- 正则表达式：借鉴 Perl 语言
- 字符串和数组处理：借鉴 Python 语言

与此同时，它是一门动态、弱类型的编程语言，非常适合面向对象和函数式的编程风格

> 动态语言，与之对应的是静态语言，静态语言在编译时变量的数据类型就确定的；而动态语言则是在运行时确定数据类型
>
> 强类型与弱类型，强类型语言一旦变量的类型被确定，就不能被转化，而弱类型的变量类型由应用上下文确定

## 特点

基于原型继承，即每个对象拥有一个原型对象，对象又以其原型为模板，从原型继承方法和属性。原型对象也是对象，也拥有原型，并从它的原型继承方法和属性，如此类型，形成原型链。我们会在后文对原型、继承分别进行详细介绍

函数是一等公民，不仅能像对象一样使用，还拥有函数传值、作为返回值返回。我们亦在后文介绍

函数作用域，函数作用域为词法作用域，可形成闭包，我们会在后文继续

## 由什么组成

JavaScript = ECMAScript + 文档对象模型（DOM）+  浏览器对象模型（BOM）

ECMAScript：语言本身，由语法、类型、语句、关键字、保留字、操作符、全局对象组成

文档对象模型（DOM）：操作 HTML 的 API，名字又多又长，可查文档——[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

浏览器对象模型（BOM）：操作 浏览器的 API，如 Window、Screen、Location、History、Navigator、弹出框、Timing、Cookies

## ECMAScript 版本

| 时间点  | 版本                                               |
| ------- | -------------------------------------------------- |
| 1997.7  | ECMAScript 1.0发布                                 |
| 1998.6  | ECMAScript 2.0发布                                 |
| 1999.12 | ECMAScript 3.0发布                                 |
| 2007.10 | ECMAScript 4.0草案发布，发生分歧                   |
| 2008.7  | 改善一部分4.0功能，发布ECMAScript 3.1              |
| 2009.12 | ECMAScript 5.0正式发布                             |
| 2011.6  | ECMAScript 5.1版发布                               |
| 2013.12 | ECMAScript 6 草案发布                              |
| 2015.6  | ECMAScript 6 正式发布，并且更名为“ECMAScript 2015” |

自此之后，往后每年发版一个版本，在那年发版就带上年份，如 2022年发布，称为”ECMAScript 2022“，2023年发布”ECMAScript 2023“

## 参考资料

-   [「复习」所以 JavaScript 到底是什么？我居然懵了](https://mp.weixin.qq.com/s/I3wVe5-Ukhb5NluFB7ksnQ)
-   [JavaScript 语言的历史](https://wangdoc.com/javascript/basic/history.html)
