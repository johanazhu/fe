# H5 移动端开发

### 需要关注的点

1像素问题

适配性
需要用到CSS的几种特性：vw单位、viewport规则和media规则，单页应用重点是逻辑页面解耦、独立开发
和发布和保持前进后退历史。

移动端适配问题

采用vw或者rem的方案，本质是布局等比例的缩放





```js
window.devicePixelRatio
```

dpr：设备像素比

一个css像素占多少个设备像素

想要达到移动端布局的效果

就要设置布局视口的宽度正好等于屏幕的宽度，意思就是在375的屏幕宽度下，将布局视口设置为屏幕宽度，也就是device-width，css像素横向375个单位，设置375px挤满满屏幕



https://www.open-open.com/lib/view/open1449325854077.html





移动端开发技巧

https://github.com/o2team/H5Skills/issues