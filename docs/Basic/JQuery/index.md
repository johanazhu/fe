# jQuery 导航



在线文档：https://devdocs.io/jquery/

https://api.jquery.com/

jQuery 别人都说它已经过时了，但技术虽然过时，但设计理念还一直在，我们要学的是其设计理念

这一章我们着重学习它的源码以及如何设计一个插件

## 前言

jQuery 学习通常会经历三个阶段

-   会用 jQuery
-   能抽象成插件
-   让插件足够灵活强大
-   阅读源码，学习源码的写法



## 什么是 jQuery?

jQuery 是一个 JavaScript 函数库。

jQuery 是一个轻量级的"写的少，做的多"的 JavaScript 库。

jQuery 库包含以下功能：

- HTML 元素选取
- HTML 元素操作
- CSS 操作
- HTML 事件函数
- JavaScript 特效和动画
- HTML DOM 遍历和修改
- AJAX
- Utilities



## 用法

### 选择器

```javascript
$(this) // 选择当前HTML元素
$("p") // 选择所有 <p> 元素
$(".left") // 选择 class="left" 的元素
$("p.left") // 选择所有 class="left" 的 <p> 元素
$("#main") // 选择 id="main" 的元素
$("#main p") // 选择 id="main" 下的所有 p 元素
$("ul li:first") // 选择 <ul> 中的第一个 <li> 元素
$("ul li:last") // 选择 <ul> 中的最后一个 <li> 元素
```

### 操作DOM



### 事件

```javascript
ready() // 文档准备就绪事件
click() // 单击事件
dblclick() // 双击事件
focus() // 获取焦点事件
blur() // 失去焦点事件
mouseover() // 鼠标经过事件
change() // 改变事件
scroll() // 滚动事件
toggle()
```



### 动画



### 工具





### 各种组合

```javascript
$(this).hide() // 隐藏当前元素
$("p").hide() // 隐藏所有 p 标签元素
$("p.test").hide() // 隐藏所有 class=”test" 的 p 标签元素
$("#test").hide() // 隐藏 id="test" 的元素
```













## 参考资料

-   [如何动手写一个 jQuery 插件](http://i5ting.github.io/How-to-write-jQuery-plugin/build/jquery.plugin.html#1)
-   [jQuery 都过时了，那我还学它干嘛？](https://fangyinghang.com/why-still-jquery/)
