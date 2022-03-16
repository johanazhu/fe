# CSS 世界中的结界——BFC

## BFC 是什么

BFC 全称为 block formattng context，中文为“块级格式化上下文”。相对应的还有 IFC，也就是 inline formatting context，中文为“内联格式化上下文”。

是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性

BFC 的特征如结界一般，里面的人出不去，外面的人进不来

表现原则：如果一个元素具有 BFC，内部子元素再怎么翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠时会影响外面的元素；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度坍塌，必然会影响后面元素布局和定位**这显然有违 BFC 元素的子元素不会影响外部元素的设定**。

如何触发 BFC 呢？常见的情况如下：

-   根元素（html ）
-   浮动元素（元素的 float 不是 none）
-   绝对定位元素（元素的 position 为 absolute 或 fixed）
-   行内块元素（元素的 display 为 inline-block）
-   表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认该值）
-   表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
-   匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 ` table、``table-row `、 ` table-row-group、``table-header-group、``table-footer-group `（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 `inline-table`）
-   overflow 不会 visible 的块级元素
-   弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
-   网格元素（display 为 grid 或 inline-grid 元素的直接子元素）

还有其他的可以到[这里](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)查看

换言之，只要元素符合上面任意一个元素，就无须使用 clear: both 属性去清除浮动的影响了。因为，不要见到一个 `<div>` 元素就加上类似.clearfix 的类名，否则只能暴雷你孱弱的 CSS 基本功

## BFC 的作用

### 1.清除内部浮动

在布局时我们经常会遇到这种情况，对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。解决这个问题，只需要将父元素变成一个 BFC 就行。常用的做法如给父元素设置 overflow: hidden 属性

### 2.垂直 margin 合并

外边距合并的问题。

主要用到

```
盒子垂直方向的距离由margin决定。属于同一个BFC的两个相邻盒子的margin会发生重叠
```

属于同一个 BFC 的两个相邻盒子的 margin 会发生重叠，那么我们创建不属于同一个 BFC，就不会发生 margin 重叠了。

<img src="https://i.loli.net/2021/06/03/YLG6tZU1J5RjluT.png" />

### 3.自适应布局

如下

#### BFC 与流式布局

**BFC 的结界特性最重要的用途其实不是去 margin 重叠或者是清除 float 影响，而是实现更健壮、更智能的自适应布局**

我们从最基本的文字环绕效果说起，

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .box {
            width: 200px;
            border: 1px solid #000;
        }
        .zhanan {
            width: 50px;
            height: 50px;
            background: yellow;
            float: left;
        }
        .info {
            background: #f1f1f1;
            color: #222;
        }
    </style>
    <body>
        <div class="box">
            <div class="zhanan">渣男</div>
            <p class="info">
                资产100000000，上海三套房，劳斯莱斯两辆，上市公司CEO,肖战相貌，彭于晏身材，只爱你一个人...
            </p>
        </div>
    </body>
</html>
```

我们看到这样的场景：

![BFC1](https://i.loli.net/2021/06/03/uKSvxCOnWcyLPG3.png)

给 info 加上 overflow：hidden

![BFC1](https://i.loli.net/2021/06/03/oPjbLkCtgpwdZGI.png)

因为我们将 info 元素改造成了 BFC，所以具有 BFC 特性的元素的子元素不会受到外部元素影响，也不会影响外部元素，于是，这里的 info 元素为了不和浮动元素产生任何交集，顺着浮动边缘形成自己的封闭上下文

## BFC 的局限

有了 BFC 自适应布局，纯流体特性布局基本上没有了存在的价值。然后，只是理论上如此。如果 BFC 自适应布局真那么超能，那为何并没有口口相传呢？

因为绝大多数出发 BFC 的属性自身有一些古怪的特性，所以，实操时，能兼顾流体特性和 BFC 特性来实现自适应布局的属性并不多。接下来我们一个一个来看，

1. float: left。浮动元素本身 BFC 化，然后浮动元素有破坏性和包裹性，失去了元素本身的流体自适应。因此无法用来实现自动填满容器的自适应布局。不过兼容性尚可，在 IE 时代被大肆使用，也就是常说的“浮动布局”
2. position: absolute。严重脱离文档流
3. overflow: hidden。最为常见的 BFC 使用属性。唯一的问题就是容器盒子外的元素可能会被隐藏掉
4. display: inline-block。在 IE6 和 IE7 上古浏览器中，兼容性比 overflow: hidden 更好
5. display: table-cell。兼容性要在 IE8 及以上版本的浏览器；二是应付连续英文字符换行有些吃力，适用场景比 overflow:hidden 更为宽泛
6. display: table-row。对 width 无感，无法自适应剩余容器空间。
7. display: table-caption。此属性一无是处

还有其他声明对自适应布局也都一无是处，就不展开细说

总结一下。我们对 BFC 声明家族大致过了一边，能担任自适应布局重任的也就是一下几个：

-   overflow: auto/hidden，适用于 IE7 及以上版本浏览器；
-   display: inline-block，适用于 IE6 和 IE7
-   display: table-cell，适用于 IE8 及以上版本浏览器

最后，我们提炼出两套 IE7 及以上版本浏览器适配的自适应解决方案。

1. 借助 overflow 属性，如下：

```css
.lbf-content {
    overflow: hidden;
}
```

2. 融合 display: table-cell 和 display: inline-block，如下：

```css
.lbf-content {
    display: table-cell;
    width: 9999px;
    /* 如果不需要兼容IE7，以下样式可以省略 */
    *display: inline-block;
    *width: auto;
}
```

这两种基于 BFC 的自适应方案均支持无限桥套，因此，多栏自适应可以通过嵌套方式实现。这两种方案均有一点不足，前者如果子元素要定位到父元素的外面可能会被隐藏，后者无法直接让连续英文字符换行。

最后，关于 display: table-cell 元素内连续英文字符无法换行的问题，事实上是可以解决的，就是使用类似下面的 CSS 代码：

```css
.word-break {
    display: table;
    width: 100%;
    table-layout: fixed;
    word-break: break-all;
}
```

## 总结

BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。包括浮动，和外边距合并等等，因此，有了这个特性，我们布局的时候就不会出现意外情况了。

但在我看来，BFC 已成过去式，现在有更好的自适应布局手段——flex，在现代手机 H5 遍地的世界里，flex 的兼容性已经足够了，

## 参考资料

-   [【CSS】深入理解 BFC 原理及应用](https://www.jianshu.com/p/acf76871d259)
-   [CSS 世界：张鑫旭](https://book.douban.com/subject/27615777/)
-   [Web 开发者指南](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
