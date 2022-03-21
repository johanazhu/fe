## Picker 组件开发

#### 样式

```html
<div class="jingqb-picker">
    <div class="jingqb-picker__header">header</div>
    <div class="jingqb-picker__columns">
        <div class="jingqb-picker-column">
            <ul class="jingqb-picker-column__wrapper">
                <li class="jingqb-ellipsis jingqb-picker-column__item">杭州</li>
                <li class="jingqb-ellipsis jingqb-picker-column__item">宁波</li>
                <li class="jingqb-ellipsis jingqb-picker-column__item">温州</li>
            </ul>
        </div>
        <div class="jingqb-picker-column">
            每一个colum，遍历数组，生成 column
        </div>
        <div class="jingqb-picker__mask"></div>
        <div class="jingqb-picker__frame">固定在一行的选中的一条杠</div>
    </div>
</div>
```

#### 写组件

##### header 部分

-   show-toolbar 是否展示顶部栏

-   title 顶部栏标题

-   cancel-button-text 取消按钮文字

-   confirm-button-text 确认按钮文字
-   cancel 点击取消按钮的回调
-   confirm 点击确认按钮的回调

```jsx
<div class="jingqb-picker__header">
    <button type="button" class="jingqb-picker__cancel" onClick={this.cancel}>
        {this.cancel - button - text || 取消}
    </button>
    <div class="jingqb-ellipis jingqb-picker__title">{title || 标题}</div>
    <button type="button" class="jingqb-picker__confirm" onClick={this.confirm}>
        {this.confirm - button - text || 确认}
    </button>
</div>
```

##### 主体 column 部分

首先要计算高度

column item 的高度以及 column 自身的高度

需要的 props

-   item-height 选项高度
-   visible-item-count 可见的选项个数

只要 这两个值后算出外容器的高度 wrapHeight = this.itemHeight \* this.visibleItemCount

```jsx
const frameStyle = {
    height: `${itemHeight}px`,
};

const columnsStyle = {
    height: `${wrapHeight}px`,
};

const maskStyle = {
    backgroundSize: `100% ${(wrapHeight - itemHeight) / 2}px`,
};
<div class="jingqb-picker">
    {this.toolbar ? this.renderToolbar() : null}
    {this.loading ? <Loading class="jingqb-picker__loading" /> : null}
    <div
        class="jingqb-picker__columns"
        style={columnStyle}
        onTouchmove={preventDefault}
    >
        {this.renderColumns()}
        <div class="jingqb-picker__mask" style={maskStyle} />
        <div class="jingqb-picker__frame" style={frameStyle} />
    </div>
</div>;
```

现在我们只剩下 renderColumns 这也是大头，牵扯的东西很多，也是 Picker 组件的核心所在

人总是这样，在遇到问题时，总是避免正面去刚。把大问题分解，分解为一个又一个小问题，针对小问题，逐个击破，问题自然迎刃而解。目前的 Picker 组件已经破解了头部和其他的 mask，frame，loading 等。

现在的是 columns

我们先看样式

```html
<div class="jingqb-picker-column">
    <ul class="jingqb-picker-column__wrapper">
        <li class="jingqb-ellipsis jingqb-picker-column__item">杭州</li>
        <li class="jingqb-ellipsis jingqb-picker-column__item">宁波</li>
        <li class="jingqb-ellipsis jingqb-picker-column__item">温州</li>
    </ul>
</div>
```

每一个选择器 column 都是这样的 html 结构，只是他会按照 props 的传值而显示渲染多少个 column 组件

我们可以先写 column 单个组件，再用循环的方式渲染 columns

##### 组件 column

```jsx
const wrapperStyle = {
    transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`,
    transitionDuration: `${this.duration}ms`,
    transitionProperty: this.duration ? 'all' : 'none',
    lineHeight: `${this.itemHeight}px`,
};
<div class="jingqb-picker-column">
    <ul class="jingqb-picker-column__wrapper" style={wrapperStyle}>
        ...
    </ul>
</div>;
```

##### 禁止选项 、选择、普通

```html
<li
    class="jingqb-ellipsis jingqb-picker-column__item jingqb-picker-column__item--disabled"
>
    杭州
</li>
<li
    class="jingqb-ellipsis jingqb-picker-column__item jingqb-picker-column__item--selected"
>
    宁波
</li>
<li class="jingqb-ellipsis jingqb-picker-column__item">温州</li>
```

```jsx
<div
    class="jingqb-picker-column"
    onTouchstart={this.onTouchStart}
    onTouchmove={this.onTouchMove}
    onTouchend={this.onTouchEnd}
    onTouchcancel={this.onTouchEnd}
>
    <ul>
        <li>...</li>
    </ul>
</div>
```

每一个 li 上面有 onClick 事件

点击选择 setIndex

options 所有的参数

currentIndex 当前选择的索引

滑动，改变 transform 中的 translateY

transform: translate3d(0px, 28px, 0px);

transition-duration: 0ms;

transition-property: none;

刚

```
onTouchStart(event) {
	startY = event.touches[0].clientY;
	startOffset = offset;
	duration = 0
}
```

offset: 偏移

除此之外还需要的 props

-   loading 是否显示加载状态

onTouchStart

onTouchMove

onTouchEnd

当前索引

onTouchStart 获取 y

onTouchMove 的时候改变 translate 的 y 值，从而让页面滚动

onTouchEnd 要做的限制是 当用户把页面滑到很底部的时候要反弹至最后一个元素，同理，滑到顶部也是如此，所以需要做个最大值和最小值，滑动是在这个区间内

默认是

react 和 vue 的区别，vue 传入数据，react 组件化

```jsx
<Picker>
    <Picker.Item>萝卜</Picker.Item>
    <Picker.Item>香蕉</Picker.Item>
    <Picker.Item>苹果</Picker.Item>
    <Picker.Item>大象</Picker.Item>
</Picker>
```

后记，需要注意的是如今的手机有全面屏和刘海屏，在 css 上需要注意下，安全边际...

#### 文档
