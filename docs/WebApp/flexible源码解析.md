# flexible 源码解析

amlib-flexible 源码总共 44 行

```javascript
(function flexible(window, document) {
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1;

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = 12 * dpr + 'px';
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUnit();

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
})(window, document);
```

-   ~~根据设备的 dpr 动态改写 `` 标签，设置 viewport 的缩放~~
-   ~~给 `` 元素添加 data-dpr 属性，并且动态改写 data-dpr 的值~~
-   根据 `document.documentElement.clientWidth` 动态修改 `<html>` 的 font-size ，页面其他元素使用 rem 作为长度单位进行布局，从而实现页面的等比缩放

> 关于头两点，其实现在的 `lib-flexible` 库已经不这样做了，不再去缩放 Viewport，字体大小的设定也直接使用了 rem

flexible 作为屏幕宽度适配解决方案，是存在一些问题的：

-   动态修改 Viewport 存在一定的分线

两个版本

0.3.2 老的

通过 meta 标签改变页面的缩放比例，从而达到适配的目的，同时，这个方案解决 1px 问题

缺点是只对 ios 的 dpr 进去处理，对于 安卓机型都默认 dpr = 1

2.0 新的（2019）

两个问题存在，判断设备支不支持 0.5px，如果支持，就在 body 上面添加一个名为 hairlines 的 class，所以我们的代码这样写

```css
.line {
    border: 1px solid red;
}
/* dpr>=2且支持0.5px的时候*/
.hairlines .line {
    border: 0.5px solid red;
}
```

但这样有两个问题

-   对于那些 `dpr> 2 且不支持 0.5px` 的安卓机，我们应该如何统一处理？
-   如果 `dpr = 3` 那么 border 就应该是 `0.333px`，而不是 `0.5px` 了

https://juejin.cn/post/6896713964848152589

## 参考资料

[前端基础知识概述 -- 移动端开发的屏幕、图像、字体与布局的兼容适配](https://github.com/chokcoco/cnblogsArticle/issues/25#)
