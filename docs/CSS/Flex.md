# flex布局



flex布局原理



flex 布局父项常见属性



flex 布局子项常见属性



flex属性

flex 属性定义子项目分配剩余空间，用 flex 来表示占多少份数



flex: 0 1 auto 表示什么意思？



flex 属性是flex-grow、flex-shrink、flex-basic 的缩写，其中第二个、第三个参数（flex-shrink、flex-basic）是可选的，默认值为 0 1 auto;



flex-grow：是扩展的意思，扩展的是flex子项所占据的宽度，扩展所侵蚀的空间是除去元素外剩余的空白间隙。默认值0，表示不占用剩余空白间隙扩展自己的宽度

flex-shrink：是收缩的意思，主要处理当flex容器空间不足时，单个元素的收缩比例。默认值1，默认所有的flex子项都会收缩，如果为0，则都不收缩

flex-basic：定义了分配剩余空间之前元素的大小。默认值auto，就是自动



flex默认值为0 1 auto;

flex:none，等同于 flex: 0 0 auto;

flex: auto，等同于 flex:1 1 auto;



flex: 1具体代表什么, 有什么应用场景

flex-basic 是什么含义



flex是一种布局方式，css3之后开始有，主要分为两部分，由父容器和子项组成，父容器有六个属性，能控制布局方向、是否换行、主轴排列、交叉轴排列等；子项也有六个属性，可以说父容器是控制整体，而子项控制的是个体的布局





flex: 1具体代表什么, 有什么应用场景

flex 是子项的属性，是flex-grow、flex-shrink、flex-basis三个属性的缩写

flex 的默认值为 0 1 auto

flex:1 的意思是flex: 1 1 0%

flex: auto的意思等于设置flex: 1 1 auto;

如果想让每个子项等宽，用flex:1就能做到

当希望元素充分利用剩余空间，同时不会侵占其他元素应有的宽度的时候

flex:auto多用于内容固定，或者内容可控的布局场景，例如导航数量不固定，每个导航文字数量也不固定的导航效果就适合使用flex:auto效果来实现



flex-basic 是什么含义

定义分配剩余空间之前原生的默认大小，默认值为 auto



https://juejin.im/tag/flexbox





https://www.yuque.com/linxz/flex/736d092d211170007383692628e3b941





## 参考资料

