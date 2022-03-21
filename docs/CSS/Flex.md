# flex 从总结到了解

flex 是一种布局方式，在 CSS3 之后开始有。它主要由父容器和子项组成，父容器有六个属性，分别为：

-   控制主轴轴向：`flex-direction`
    -   row：横轴（默认）
    -   row-reverse：倒过来的横轴
    -   column：竖轴
    -   column-reverse：倒过来的竖轴
-   换行方式：`flex-wrap`
    -   nowrap：不换行（默认）
    -   wrap：换行
    -   wrap-reverse：反着换行
-   主轴排列：`justify-content`
-   交叉轴排列：`align-items`
-   轴向与换行组合设置：`flex-flow`（流向）
    -   一般很少用这个属性，即改变子项的布局顺序，正着来，倒着来

子项也有六个属性，分别为：

-   弹性扩展：`flex-grow`
    -   指定容器剩余空间多余时的分配规则
    -   默认值为 0，多余空间不分配
-   弹性收缩：`flex-shrink`
    -   指定容器剩余空间不足时的分配规则
    -   默认值为 1，空间不足要分配；如果为 0，表示不分配
-   基础尺寸：`flex-basis`
    -   指定 flex 元素在主轴方向上的初始大小（基础尺寸）
    -   默认值为 auto，即项目本身大小
    -   浏览器会根据 flex-basis 计算主轴是否有剩余空间，与宽度有关，优先级如何划分
        -   max-width/min-width > flex-basis > width > box
-   **缩写：`flex`**
    -   flex-grow、flex-shrink、flex-basis 的缩写
    -   默认值为 0 1 auto
-   主轴顺序：`order`
-   交叉轴对齐方式：`align-self`

总的来说，**父容器控制整体布局，子项控制子项布局**

在面试中，常常不会问怎么宽泛，最常见的 flex 面试题为：

-   `flex: 0 1 auto` 怎么理解？
-   `flex: 1`具体代表什么，有什么应用场景
-   `flex: 0`、`flex: 1`、`flex: none`、`flex: auto`，表示什么意思，并应用在什么场景下使用？

要想回答这些问题，我们必须了解子项中的 flex 属性

## flex 语法

```css
flex: none | auto | [< 'flex-grow' > < 'flex-shrink' >? || < 'flex-basis' > ];
```

单管道符 `|` ，表示排他。也就是这个符号前后的属性值都是支持的，且不能同时出现。因此，下面这些语法都是支持的：

```css
flex: auto;
flex: none;

flex: [< 'flex-grow' > < 'flex-shrink' >? || < 'flex-basis' >];
```

方括号 `[...]` 表示范围。支持的属性在这个范围内

其中 `?` ，表示 0 个或者 1 个，也就是说 `flex-shrink` 属性可有可无。因为 flex 属性值也可以是 2 个值

```css
flex: auto;
flex: none;
/* 2个值 */
flex: 1 100px;
/* 3个值 */
flex: 1 1 100px;
```

双管道 `||` ，表示”或者“的意思。表示前后可以分开独立使用，也就是 `flex: flex-grow flex-shrink?` 和 `flex-basis` 都是合法的。于是我们又多了 2 种合法的写法：

```css
/* 1个值，flex-basis */
flex: 100px;
/* 2个值，flex-grow 和 flex-shrink */
flex: 1 1;
```

### 转为文字表述

单值语法：

​ 如果 flex 的属性值只有一个值，有三种情况

-   一个无单位数，例如例如 `flex: 1`，表示 `flex-shrink: 1`，剩余空间扩展。此时，`flex-shrink` 和 `flex-basis` 的值分别是 1 和 0%。注意，这里的 `flex-basis` 的值是 0%，而不是默认值 `auto`

    -   只要改变 `flex: 数字`，`flex-basis` 的值就为 0

-   一个有效的宽度（width）值，表现形式为长度值，例如 `flex: 100px`，表示`flex-basis: 100px`，基础尺寸为 100px。此时，`flex-grow` 和 `flex-shrink` 的值都是 1，注意，这里的 `flex-grow` 的值是 1，而不是默认值 0
-   关键字 `none`，`auto` 或 `initial`

双值语法：

​ 如果 flex 的属性值有两个值，则第 1 个值一定是 `flex-grow`，第 2 个根据值的类型不同表示不同的 CSS 属性，具体规则如下：

-   数值：例如`flex: 1 2`，则这个 2 表示 `flex-shrink`，此时 `flex-basis` 的值为 0%，而非默认值 auto
-   长度值，例如`flex: 1 100px`，则这个 `100px` 值 `flex-basis`，此时 `flex-shrink` 默认值为 0

三值语法：

​ 如果 flex 的属性值有 3 个值，则长度值表示 `flex-basis`，其余 2 个数值分别表示`flex-grow` 和 `flex-shrink`。下面两行 CSS 语句的语法都是合法的，且含义也是一样的：

```css
flex: 1 2 50%;
flex: 50% 1 2;
```

## flex 属性值场景应用

flex 默认值为 0 1 auto。除此之外，还有各种其他值

-   flex: none，等同于 flex: 0 0 auto;

-   flex: auto，等同于 flex: 1 1 auto;

-   flex: 1，等同于 flex: 1 1 0%;
-   flex: 0，等同于 flex 0 1 0%;

张鑫旭大神画过一张图：

| 单值语法      | 等同于         | 备注         |
| ------------- | -------------- | ------------ |
| flex: initial | flex: 0 1 auto | 初始值，常用 |
| flex: 0       | flex: 0 1 0%   | 适用场景少   |
| flex: none    | flex: 0 0 auto | 推荐         |
| flex: 1       | flex: 1 1 0%   | 推荐         |
| flex: auto    | flex: 1 1 auto | 适用场景少   |

### 默认值 flex: initial

它等同于 `flex:0 1 auto`，表示 flex 容器有剩余空间时尺寸不增长（`flex-grow: 0`），flex 容器尺寸不足时尺寸会收缩变小（`flex-shrink:1`），尺寸自适应于内容（`flex-basis:auto`）

我的理解：子项总长度小于总容器时，不会去撑满（`flex-grow:0`），而按实际宽高度存在(`flex-basis:auto`)；当子项总长度大于总容器时，子项会相对于的收缩相对比例（`flex-shrink:1`）

#### 适用场景

适用于子项总长度小于总容器的场景，例如按钮、标题、小图标等小部件的排版布局

### flex: 0 和 flex: none 的区别

`flex: 0` 等同于设置 `flex: 0 1 0%`，`flex:none` 等同于 `flex: 0 0 auto`

`flex: 0`，因为是一个值且为数值，所以它表示 `flex-grow`，后续我发现只用设置了`flex: 数字`，那么 `flex-basis` 就自动成了 0%，所以，设置`flex:0` 的元素的最终尺寸表示为最小内容宽度；

> 注意：
>
> flex: 1 === flex: 1 1 0%
>
> flex: 0 === flex: 0 1 0%
>
> flex 设置为数字后，虽然 `flex-basis` 为最小宽度，但是前者的 `flex-grow` 有值，可以把子项扩充满容器，后者为 0，不扩展

`flex: none`，既不是数值也不是长度值，`none` 关键字。`flex: 0 0 auto` 表示元素尺寸不会收缩也不会扩展，再加上 `flex-basis: auto` 表示固定尺寸由内容决定，由于元素不具有弹性，因为，元素内的元素不会换行，最终尺寸通常表现为最大内容宽度

#### 适用使用 flex: 0 的场景

![flex：0的应用场景](https://i.loli.net/2021/10/19/PpGRc8WHfSVTw9a.png)

无论文字的内容给如何设置，左侧内容的宽度都是图像的宽度

#### 适合使用 flex: none 的场景

当 flex 子项的宽度就是内容的宽度，且内容永远不会换行，则适合使用 `flex:none`，例如如下的场景，图片和按钮固定长度，内容弹性

![flex:none适用场景](https://i.loli.net/2021/10/19/ANQzfkuT4xiaXsO.png)

### flex: 1 和 flex: auto 的区别和适用场景

`flex:1` 等同于设置 `flex: 1 1 0%` ，`flex: auto` 等同于 `flex: 1 1 auto`

可以看出两者的 `flex-grow` 和 `flex-shrink` 都是一样的，意味着它们都可以弹性扩展以及弹性收缩，区别在于 `flex: 1` 中 `flex-basis` 为 0，即子项的初始大小（宽度）为 0。`flex:auto` 中的 `flex-basis`为 auto，即宽度为自身宽度

表现的样子为：

![flex:1](https://i.loli.net/2021/10/19/SKf1ap8zXUxWiMP.png)

这里需要解释一下，因为我最开始也不理解，其公式为：

**每个子项的宽度 = （总宽度 - `flex-basis` 的初始大小）/ 子项个数**

以这个例子为例，

当`flex:1` 时，即`flex: 1 1 0%`， `flex-basis` 为 0，初始大小为 0，所以每个子项等分

当 `flex:auto` 时，即 `flex: 1 1 auto`， `flex-basis` 为 auto，初始大小为自身大小，总宽度 - 每个子项的宽度后，剩余的空间等分给每一项

#### 适用于 flex: 1 的场景

当希望元素充分利用剩余空间，同时不会侵占其他元素应用的宽度的适用，适合适用 `flex:1`，例如所有的等分列表

之前适用 `flex: none` 的例子，同样设置文字部分`flex: 1` 也能实现类似的效果

![flex:1](https://i.loli.net/2021/10/19/xjmG7w3JEhv86Ms.png)

#### 适用于 flex: auto 的场景

当希望元素充分利用剩余空间，但是各自的尺寸按照各自内容进行分配的时候，适用于 `flex: auto`

例如导航数量不固定，每个导航文字数量页不固定的导航效果就适合适用 `flex: auto`

![flex-auto](https://i.loli.net/2021/10/19/z5jdOucg6e3UxHq.png)

回过头来看之前说的面试题

1. `flex: 0 1 auto` 怎么理解？
2. `flex: 1`具体代表什么，有什么应用场景
3. `flex: 0`、`flex: 1`、`flex: none`、`flex: auto`，表示什么意思，并应用在什么场景下使用？

第一个问题回答

flex 的默认值为 0 1 auto，表示容器剩余空间有多余的时候不扩展，不足的时候收缩，子项的宽度根据自身的宽度来展示

第二个问题回答

脑子思考 flex 的值如果是一个值且为数字，说明是 `flex-grow:1`，当它为数字时，`flex-basis` 会自动变成 0，所以它具体表示为 `flex:1 1 0%`，表示容器剩余空间有多余的时候扩展，不足的时候收缩，子项的宽度为 0。它一般适用于充分利用剩余空间，又不侵占其他元素的宽度，例如等分布局

第三个问题回答

`flex:0`，表示 `flex: 0 1 0%`，表示容器剩余空间有多余的时候不扩展，不足的时候收缩，子项的宽度为 0，适用设置在替换元素的父元素上

`flex:1`，看第二个回答

`flex: none`，表示 `flex: 0 0 auto`，表示容器剩余空间有多余的时候不扩展，不足的时候也不收缩，子项的宽度为自身宽度，适用于不换行的内容或者较少的小控件元素上

`flex: auto`，表示 `flex: 1 1 auto`，表示容器剩余空间有多余的时候扩展，不足的时候收缩，子项的宽度为自身宽度，适用于基于内容动态适配的布局（例如导航数量文字长度不固定）

`flex:initial`，表示 `flex: 0 1 auto`，表示容器剩余空间有多余的时候不扩展，不足的时候收缩，子项的宽度为自身宽度，适用于小控件元素的分布布局，或者某一项内容动态变化的布局

## 参考资料

-   [flex:0 flex:1 flex:none flex:auto 应该在什么场景下使用？](https://www.zhangxinxu.com/wordpress/2020/10/css-flex-0-1-none/)
-   [CSS flex 属性深入理解](https://www.zhangxinxu.com/wordpress/2019/12/css-flex-deep/)
-   [MDN Web Docs flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

-   [一劳永逸的搞定 flex 布局](https://juejin.cn/post/6844903474774147086)
