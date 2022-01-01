## Picker组件开发

#### 样式

```html
<div class="jingqb-picker">
    <div class="jingqb-picker__header">
        header
    </div>
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
        <div class="jingqb-picker__mask">
            
        </div>
        <div class="jingqb-picker__frame">
            固定在一行的选中的一条杠
        </div>
    </div>
</div>
```

#### 写组件

##### header部分

- show-toolbar 是否展示顶部栏

- title 顶部栏标题

- cancel-button-text  取消按钮文字

- confirm-button-text 确认按钮文字
- cancel 点击取消按钮的回调
- confirm 点击确认按钮的回调

```jsx
<div class="jingqb-picker__header">
    <button type="button" class="jingqb-picker__cancel" onClick={this.cancel}> 
        { this.cancel-button-text || 取消}
    </button>
    <div class="jingqb-ellipis jingqb-picker__title">{title || 标题}</div>
    <button type="button" class="jingqb-picker__confirm" onClick={this.confirm}>
        { this.confirm-button-text || 确认}
    </button>
</div>
```

##### 主体column部分

首先要计算高度

column item的高度以及column自身的高度

需要的props

- item-height  选项高度
- visible-item-count 可见的选项个数

只要 这两个值后算出外容器的高度 wrapHeight = this.itemHeight *  this.visibleItemCount



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
    <div class="jingqb-picker__columns" style={columnStyle} onTouchmove={preventDefault}>
    	{this.renderColumns()}
        <div class="jingqb-picker__mask" style={maskStyle} />
        <div class="jingqb-picker__frame" style={frameStyle} />
    </div>
</div>
```

现在我们只剩下 renderColumns 这也是大头，牵扯的东西很多，也是Picker组件的核心所在

人总是这样，在遇到问题时，总是避免正面去刚。把大问题分解，分解为一个又一个小问题，针对小问题，逐个击破，问题自然迎刃而解。目前的Picker组件已经破解了头部和其他的mask，frame，loading等。

现在的是columns

我们先看样式

```html
<div class="jingqb-picker-column" >
    <ul class="jingqb-picker-column__wrapper">
        <li class="jingqb-ellipsis jingqb-picker-column__item">杭州</li>
        <li class="jingqb-ellipsis jingqb-picker-column__item">宁波</li>
        <li class="jingqb-ellipsis jingqb-picker-column__item">温州</li>
    </ul>
</div>
```

每一个选择器column都是这样的html结构，只是他会按照props的传值而显示渲染多少个column组件

我们可以先写column单个组件，再用循环的方式渲染columns

##### 组件column

```jsx
const wrapperStyle = {
    transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`,
    transitionDuration: `${this.duration}ms`,
    transitionProperty: this.duration ? 'all' : 'none',
    lineHeight: `${this.itemHeight}px`,
};
<div class="jingqb-picker-column">
	<ul class="jingqb-picker-column__wrapper" style={wrapperStyle}>...</ul>
</div>
```



##### 禁止选项 、选择、普通

```html
<li class="jingqb-ellipsis jingqb-picker-column__item jingqb-picker-column__item--disabled">杭州</li>
<li class="jingqb-ellipsis jingqb-picker-column__item jingqb-picker-column__item--selected">宁波</li>
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



每一个li 上面有onClick 事件

点击选择 setIndex 



options 所有的参数

currentIndex	当前选择的索引



滑动，改变transform中的 translateY

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







除此之外还需要的props

- loading 是否显示加载状态





onTouchStart

onTouchMove

onTouchEnd

当前索引



onTouchStart 获取y

onTouchMove的时候改变translate的y值，从而让页面滚动

onTouchEnd 要做的限制是 当用户把页面滑到很底部的时候要反弹至最后一个元素，同理，滑到顶部也是如此，所以需要做个最大值和最小值，滑动是在这个区间内



默认是







react和vue的区别，vue传入数据，react组件化

```jsx
<Picker>
	<Picker.Item>萝卜</Picker.Item>
    <Picker.Item>香蕉</Picker.Item>
    <Picker.Item>苹果</Picker.Item>
    <Picker.Item>大象</Picker.Item>
</Picker>
```







后记，需要注意的是如今的手机有全面屏和刘海屏，在css上需要注意下，安全边际...







#### 文档