# CSS 面试题

> 面试过程思路清晰，面试官给出关键字，能够快速反应出相关的技术要点，但是也要避免滔滔不绝，说一堆无关紧要的东西。举例来说，当时勾股老师面试我的时候，问了我一个左图右文的布局做法，我的回答是：我自己总结过 7 种方案，其中比较好用的是基于 BFC 的，float 的以及 flex 的三种。之后把关键 CSS 口喷了一下，然后 CSS 就面完了

CSS 方面的知识点，说来说去就这几点：

[选择器](#选择器)

[伪类与伪元素](#伪类与伪元素)

[画个三角形](#画个三角形)

[盒模型](#盒模型)

[BFC](#BFC)

[清除浮动](#清除浮动)

[点击穿透](#点击穿透)

[设置元素不可见的几种方法](#设置元素不可见的几种方法)

[link和@import区别](#link和@import区别)

[各种布局](#布局)

-   [flex 布局](#flex)
-   [grid 布局](#grid)
-   [水平垂直居中](#水平垂直居中)
-   [左边固定宽，右边自适应](#左边固定宽，右边自适应)
-   [瀑布流效果](#瀑布流效果)
-   [圣杯、双飞翼](#圣杯、双飞翼)

## 选择器

-   通配选择器（\*）
-   标签选择器（div、p、span）
-   id 选择器（#foo）
-   class 选择器（.foo）
-   属性选择器（`a[href="https://example.org"]`）
-   相邻选择器（h1+p）
-   子选择器（ul>li）
-   后代选择器（li a）
-   伪类选择器（:last-child、:hover、:focus）
-   伪元素选择器（::before、::after）

根据 css 放置位置计算权重：

-   !important > 行内样式 > 内联样式 > 外联样式

根据 css 选择器性质计算权重

-   !important > id > 类、属性、伪类选择器 > 标签选择器、伪元素选择器 > 通配选择器

## 伪类与伪元素

w3c 引入这两个概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分

伪类用于当已有元素处于的某个状态时，为其添加对应的样式（:last-child、:hover、:focus）

伪元素用于创建一些不再文档树中的元素，并为其添加样式（::before、::after）

伪类和伪元素的区别在于：**有没有创建一个文档树之外的元素**

-   语法不同，伪类用冒号，伪元素用双冒号
-   可以同时使用多个伪类，但只能同时使用一个伪元素
-   在计算权重时，伪类与类优先级相同，伪元素与标签优先级相同

> PS：一些早期的伪元素曾使用单冒号的语法，所以你可能会在代码或者示例中看到。现代的浏览器为了保持后兼容，支持早期的带有单双冒号语法的伪元素

伪类思维导图

![伪类思维导图](https://i.loli.net/2021/10/08/2zSThQidZUqAtIf.png)

伪元素思维导图：

![伪元素思维导图](https://i.loli.net/2021/10/08/mSA8fvzoYdwGeCc.png)

## 画个三角形

宽高为 0，border 三边设置透明 transparent，一边设置颜色

必须设置宽高，不然 border-top或者 border-bottom 都是失效


```css
.sanjiaoxing {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left: 10px solid black;
}
```

[codepen demo](https://codepen.io/jojobo/pen/XWaKwMy)、[线上 demo](https://demo.azhubaby.com/三角形.html)

## 盒模型

盒模型由 margin、border、padding、content 组成

分两种

-   标准盒模型
    -   width = content 宽度
    -   height = content 高度
-   IE 模型
    -   width = border + padding + content 宽度
    -   height = border + padding + content 高度

在浏览器中，默认是标准盒模型，CSS 的写法是 `box-sizing: content-box`。如果要切换成 IE 模式（也叫怪异盒子），写法为 `box-sizing: border-box`。

## 外边距重叠

块的上边距(margin-top)和下外边距(margin-bottom)有时合并（折叠）为单个边距，其大小为单个边距的最大值（或如果它们相等，则仅为其中一个），这种行为称为**边距折叠**

有三种情况会引起外边距重叠

-   同一层相邻元素之间

    -   ```css
        <style>
        p:nth-child(1){
          margin-bottom: 13px;
        }
        p:nth-child(2){
          margin-top: 87px;
        }
        </style>
        
        <p>下边界范围会...</p>
        <p>...会跟这个元素的上边界范围重叠。</p>
        ```

    -   [线上 demo](https://codepen.io/jojobo/pen/MWvedqz?editors=1100)

-   没有内容将父元素和后代元素分开

    -   ```css
        <style type="text/css">
            section    {
                margin-top: 13px;
                margin-bottom: 87px;
            }
        
            header {
                margin-top: 87px;
            }
        
            footer {
                margin-bottom: 13px;
            }
        </style>
        
        <section>
            <header>上边界重叠 87</header>
            <main></main>
            <footer>下边界重叠 87 不能再高了</footer>
        </section>
        ```

    -   [线上 demo](https://codepen.io/jojobo/pen/WNExVwN?editors=1100)

-   空的块级元素

    -   ```css
        <style>
        p {
          margin: 0;
        }
        div {
          margin-top: 13px;
          margin-bottom: 87px;
        }
        </style>
        
        <p>上边界范围是 87 ...</p>
        <div></div>
        <p>... 上边界范围是 87</p>
        ```

    -   [线上 demo](https://codepen.io/jojobo/pen/qBXNzgX?editors=1100)

解决方案

-   将其设置为浮动元素、inline-block 元素、绝对定位元素、将父元素设置为 BFC（仅限第二种父中有子情况）

## BFC

什么是 BFC？

-   块级上下文作用域，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

怎么引起 BFC？

-   根元素（html ）
-   浮动元素（元素的 float 不是 none）
-   绝对定位元素（元素的 position 为 absolute 或 fixed）
-   display 的值为 table-cell、table-caption 和 inline-block、flex 、inline-flex、grid、 inline-grid 中的任何一个（表格单元格、表格单元格、行内块元素、弹性元素、网格元素）
-   overflow 不会 visible 的块级元素
-   匿名表格单元格元素

BFC 有什么用？

-   清除浮动
-   解决外边距重叠问题
-   自适应布局（最主要的问题）

BFC 有什么不足？

已经过时，现在用 flex 布局能代替 BFC 的作用，并且更加强大

具体分析可看——[CSS 世界中的解决——BFC](./BFC是什么.md)

## 清除浮动

在父元素后面添加一个伪元素，设置为 block，并清除左右浮动

```css
.container::after {
    content: '';
    display: block;
    clear: bothd;
}
```



## 点击穿透

当 pointer-events 的值为 none 时，表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西

```css
pointer-events: none
```



## 设置元素不可见的几种方法

`display: none` ：设置后元素（及其子元素）不占据空间，不可点击（会引起会流）

`visibility: hidden`：设置后元素（及其子元素）占据空间，不可点击（只会重绘）

`opacity: 0`：设置后元素（及其子元素）占据空间，可点击（只会重绘）

还有其他方案：

- z-index: -1
- font-size：0
- clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%);
- transform: scale(0)
- transform: translate(0 ,100%)
- width: 0、height: 0
- overflow: hidden

## link和@import区别

### 从属关系区别

@import 是 CSS 提供的语法规则，只能导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等

### 加载顺序区别

加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载

也就是说，如果 link 和 @import 同时加载的话，link 的优先级大于 @import

### 兼容性区别

@import 是 CSS2.1 提出的语法，所以在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题

### DOM可控性区别

可以通过 JS 操作 DOM ，插入link标签来改变样式；由于 DOM 方法是基于文档的，无法使用`@import`的方式插入样式



## 布局

### [flex 布局](./flex.md)

### [grid 布局](./grid.md)

### [水平垂直居中](./水平垂直居中.md)

### [左边固定宽，右边自适应](./左边固定宽，右边自适应.md)

### [瀑布流效果](./瀑布流效果.md)

### [圣杯、双飞翼](./圣杯、双飞翼.md)

## 参考资料

-   [总结伪类和伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

-   [【面试题】CSS 知识点整理(附答案)](https://juejin.cn/post/6844904117819850765)

-   [【建议收藏】css 晦涩难懂的点都在这啦](https://juejin.cn/post/6888102016007176200)

-   [margin: auto 的魔法](https://mp.weixin.qq.com/s/KoIpUnJtUp2Y5bComYRHHw)
