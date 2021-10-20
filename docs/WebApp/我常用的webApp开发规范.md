# 我常用的webApp开发规范



### Meta头



### 字体

```css
font-family: PingFangSC-Regular,Helvetica,STHeiti STXihei,Microsoft YaHei,Microsoft JhengHei,Arial;
```



### css与javascript 分离

https://www.open-open.com/lib/view/open1449325854077.html



## 移动端页面默认样式重置

1. -webkit-tap-heiglight-color（这个属性只用于IOS（iphone和ipad））

   当你点击一个链接或者通过js定义的可点击的元素时，他会出现一个半透明的灰色背景，要重置这个表现，可以通过设置-webkit-tap-highlight-color调整

   el：设置高亮色为50%透明的红色

   ​	-webkit-tap-highlight-color: rgba(255, 0, 0, .5);

2. outlint: none

   属性值设置为：

   ​	a.取消webkit内核浏览器下默认的文本框聚焦样式（input,textarea{online: noine}）

   ​	b.在pc端为a标签定义此样式，是为了取消IE浏览器下点击a标签时出现的虚线，IE7及以下版本还不识别此属性，需要在a标签上调价hidefocus=“true”

   

