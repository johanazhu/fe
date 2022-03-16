ios srcoll height

首先，iframe 嵌套的元素被子元素的宽度撑开，

在 react componentDidMount 中 找到 iframe 把宽设置为 client 宽度

```javascript
componentDidMount() {
    document.getElementsByTagName('iframe')[0].style.width = document.body.clientWidth + 'px'
}
```

下滑情况下，页面自动刷新到顶部

是因为 iframe 的高度问题，下滑超过 iframe 的 2 倍高度，页面就会受不了自动刷新

怎么办

```css
height：10000px
```

测试真的可以

```html
<div className="scroll-wrapper">
    <iframe
            className="iframe"
            frameBorder="0"
            scolling={isIos() ? 'no' : 'yes'}
            src="https://item.m.jd.com/product/206735.html">

    </iframe>
</div>

```

```less
.scroll-wrapper {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    width: 100%;
    .iframe {
        height: calc(100% - 88px);
        padding-bottom: 88px; // 针对ios
    }
}
```
