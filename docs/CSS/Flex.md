# flex



flex 是一种布局方式，在 CSS3 之后开始有。它主要由由父容器和子项组成，父容器有六个属性，分别为：

- 控制主轴轴向：flex-direction
  - row：横轴（默认）
  - row-reverse：倒过来的横轴
  - column：竖轴
  - column-reverse：倒过来的竖轴
- 换行方式：flex-wrap
  - nowrap：不换行（默认）
  - wrap：换行
  - wrap-reverse：反着换行
- 主轴排列：justify-content
- 交叉轴排列：align-items
- 轴向与换行组合设置：flex-flow（流向）
  - 一般很少用这个属性，即改变子项的布局顺序，正着来，倒着来



子项也有六个属性，分别为：

- 基础尺寸：flex-basis
  - 定义分配剩余之前项目占据的主轴空间，默认值为 auto
- 伸展方式：flex-grow
- 收缩方式：flex-shrink
- **缩写：flex**
  - 定义子项分配剩余空间，用 flex 表示占多少分数
- 主轴顺序：order
- 交叉轴对齐方式：align-self





总的来说，**父容器控制整体，子项控制个体布局**。

其他不用讲，都比较好理解，这里着重讲一下 flex。

flex默认值为0 1 auto;

flex:none，等同于 flex: 0 0 auto;

flex: auto，等同于 flex:1 1 auto;

flex:1 的意思是flex: 1 1 0%;







## flex: 0 1 auto 怎么理解？

flex 属性是 flex-grow、flex-shrink、flex-basis 的缩写，其中第二个、第三个参数（flex-shrink、flex-basis）是可选的，默认值为 0 1 auto;

flex-grow：是扩展的意思，扩展的是flex子项所占据的宽度，扩展所侵蚀的空间是除去元素外剩余的空白间隙。默认值0，表示不占用剩余空白间隙扩展自己的宽度

flex-shrink：是收缩的意思，主要处理当flex容器空间不足时，单个元素的收缩比例。默认值1，默认所有的flex子项都会收缩，如果为0，则都不收缩

flex-basis：定义了分配剩余空间之前元素的大小。默认值auto，就是自动







## flex: 1具体代表什么, 有什么应用场景

flex 是子项的属性，是flex-grow、flex-shrink、flex-basis三个属性的缩写

flex 的默认值为 0 1 auto

flex:1 的意思是flex: 1 1 0%

flex: auto的意思等于设置flex: 1 1 auto;

如果想让每个子项等宽，用flex:1就能做到

当希望元素充分利用剩余空间，同时不会侵占其他元素应有的宽度的时候

flex:auto多用于内容固定，或者内容可控的布局场景，例如导航数量不固定，每个导航文字数量也不固定的导航效果就适合使用flex:auto效果来实现







## 参考资料

[一劳永逸的搞定 flex 布局](https://juejin.cn/post/6844903474774147086)
