# TabBar 组件

首先，我们会想如何做一个 TabBar 组件，该如何规划，让我们逆向思维，如果我们用 TabBar 组件时我们希望它是怎么样的写法以及需要传递什么值（props）来展示。

如果按照开发的思想看思路走

我们也许会做出像这种的

```jsx
<TabBar
    currentIndex={0}
    onClick={(index) => {
        console.log(index);
    }}
    list={[
        { id: '1', title: '理财产品' },
        { id: '2', title: '我的资产' },
    ]}
/>
```

```jsx
<TabBar activeIndex={active}>
    <TabBar.Item icon="back" onClick={() => console.log('aa')}>
        标签1
    </TabBar.Item>
    <TabBar.Item icon="setting">标签2</TabBar.Item>
    <TabBar.Item icon="clock">标签3</TabBar.Item>
    <TabBar.Item icon="close">标签4</TabBar.Item>
</TabBar>
```

我们当然可以把 click 事件绑定到 Item 标签上，但是如果你的 Item 多了，你不是要复制很多次吗？

这个时候聪明的你会不会联想到 雅虎军规中 代码优化中的减少 dom 操作，通过事件冒泡的形式来让子元素上的事件委托给父元素，让父元素代子元素点击，因为子元素为兄弟关系（结构相同，内容不同），只用绑定父元素就能很好的减少 dom 操作。

写到这里，如果是基本情况的 Tabbar 就已经差不多了，修改下 css 就通用了。但是我们的要求是希望功能更全面。比如他既可以当做底部的 Tabbar 用，也可以在页面中当做顶部导航切换，切换的时候能加下划线标识。当 Item 超过 4 个之后希望它能滑动。

只有让它先滑动起来，下划线跟着滑动就是，所以滑动是其中的重点。

按照这两个思路去想，需要改造 css，布局将不采用 flex 布局，而是采用 position 定位。且需要有个 wrapper 包裹主 Item

React.Children.count(this.props.children)

查看子元素的数量

<details open>
    <summary> 我是标题</summary>
    <p>Requires a computer running an operating system. The computer
  must have some memory and ideally some kind of long-term storage.
  An input device as well as some form of output device is
  recommended.</p>
</details>

如果有不明白的童靴，可以去了解下什么是 TabBar？

组件开发

文档写法 react-markdown-loader 也许可以，不知道

作者：金瓶世家

柯里化（curry）

概念：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

flex 布局

Mixin（混入）是一种通过扩展手机功能的方式，它本质上是将一个对象的属性拷贝到另一个对象上，不过你可以拷贝 `任意多` 个对象的 `任意个` 方法到一个新对象上，这是 `继承` 所不能实现的。它的出现主要就是为了解决代码复用问题。

umi3 乾坤

做一个大的框架，包裹了 jquery 现在的二合一项目，然后点击的时候跳转到其他的项目中。
