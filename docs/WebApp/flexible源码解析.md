# flexible源码解析



执行 flexible 后，会在`<html>` 元素上增加一个 `data-dpr` 属性，以及一个`font-size` 样式，JS会根据不同的设备添加不同的 `data-dpr` 值，比如说 2 或者 3，同时会给 `html` 加上对应的 `font-size` 的值，比如 `75px`



```javascript
if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    scale = 1 / dpr;
}
```



### flexible 的实质

flexible 的实际上就是通过 JS 来动态改写 meta 标签，代码类似这样：

```javascript
var metaEl = doc.createElement('meta');
var scale = isRetina ? 0.5:1;
metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
if (docEl.firstElementChild) {
    document.documentElement.firstElementChild.appendChild(metaEl);
} else {
    var wrap = doc.createElement('div');
    wrap.appendChild(metaEl);
    documen.write(wrap.innerHTML);
}
```

他做了这样几件事：

- 动态改写 `<meta>` 标签
- 给 `<html> ` 元素添加 `data-dpr` 属性，并且动态改写 `data-dpr` 的值
- 给 `<html> ` 元素添加 `font-size` 属性，并且动态改写 `font-size` 的值



- ~~根据设备的 dpr 动态改写 `` 标签，设置 viewport 的缩放~~
- ~~给 `` 元素添加 data-dpr 属性，并且动态改写 data-dpr 的值~~
- 根据 `document.documentElement.clientWidth` 动态修改 `<html>` 的 font-size ，页面其他元素使用 rem 作为长度单位进行布局，从而实现页面的等比缩放

> 关于头两点，其实现在的 `lib-flexible` 库已经不这样做了，不再去缩放 Viewport，字体大小的设定也直接使用了 rem



flexible 作为屏幕宽度适配解决方案，是存在一些问题的：

- 动态修改 Viewport 存在一定的分线



## 参考资料

[前端基础知识概述 -- 移动端开发的屏幕、图像、字体与布局的兼容适配](https://github.com/chokcoco/cnblogsArticle/issues/25#)



