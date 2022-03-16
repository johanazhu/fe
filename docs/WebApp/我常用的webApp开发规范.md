# 我常用的 webApp 开发规范

### Meta 头

### 字体

```css
font-family: PingFangSC-Regular, Helvetica, STHeiti STXihei, Microsoft YaHei,
    Microsoft JhengHei, Arial;
```

### css 与 javascript 分离

## 移动端页面默认样式重置

1. -webkit-tap-heiglight-color（这个属性只用于 IOS（iphone 和 ipad））

    当你点击一个链接或者通过 js 定义的可点击的元素时，他会出现一个半透明的灰色背景，要重置这个表现，可以通过设置-webkit-tap-highlight-color 调整

    el：设置高亮色为 50%透明的红色

    ​ -webkit-tap-highlight-color: rgba(255, 0, 0, .5);

2. outlint: none

    属性值设置为：

    ​ a.取消 webkit 内核浏览器下默认的文本框聚焦样式（input,textarea{online: noine}）

    ​ b.在 pc 端为 a 标签定义此样式，是为了取消 IE 浏览器下点击 a 标签时出现的虚线，IE7 及以下版本还不识别此属性，需要在 a 标签上调价 hidefocus=“true”

## 参考资料

-   [H5 项目常见问题汇总及解决方案](https://www.open-open.com/lib/view/open1449325854077.html)
