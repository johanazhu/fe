# 模拟题七

1. react fiber 有哪些优点？怎么做到的

考察点：fiber

react fiber 是 React16 提出的新的 React 架构，是为了解决 React 16 之前大组件渲染更新时出现的卡顿问题，之所以出现这个问题是因为之前的架构是同步不可中断的执行，react fiber 是 react 16 的新架构，其特点是异步可中断。

2. 谈下你的作用域的理解

考察点：作用域
js 的作用域是词法作用域，其特点是在那里定义它就作用在那里，与定义位置有关而与调用位置无关
作用域分为全局作用域、函数作用域、块级作用域
全局作用域顾名思义，全局中只有一个
函数作用域只作用于函数中，函数内的变量函数外不能调用。
块级作用域仅在 let、const 声明时才会形成
因为函数作用域的特点使得作用域有链状，即作用域链
作用域又有闭包的产生

3. 双飞翼/圣杯布局

考察点：双飞翼/圣杯布局

双飞翼布局：浮动+margin-left+中间部分再包裹一层
圣杯布局：浮动+margin-left+自身相对定位

4. 浮动元素会造成什么影响，如何清除浮动

考察点：浮动

浮动布局
如何清除浮动

```css
.parent:after {
    content: '';
    clear: both;
    display: block;
}
```

5. 网站首页有大量的图片，加载很慢，如何优化呢？

考察点：大量图片优化
图片懒加载，显示的图片显示出来，还没出现的图片先用小图标展示
图片放在 oss 上

6. 描述下浏览器从输入网址到页面展示的整个过程

考察点：描述浏览器从输入网址到页面展示的整个过程

输入 url，浏览器判断是否是网址，如果是前往网址，如果不是，通过浏览器默认搜索引擎搜索输入的字符；
构建请求时判断是否有强缓存，如果有则返回强缓存资源；如果没有，判断是否有协商缓存，如果有，走协商缓存，如果没有继续请求。判断是否有 DNS 缓存，没有就 DNS 解析，缓存 DNS，获取 ip 地址，建立 TCP 连接，发送 HTTP 请求，服务器响应，断开 TCP 连接。判断是否与打开的网站是同一个站点，是，使用相同站点的渲染进程渲染页面，否，浏览器解析 HTML/CSS/JS，引起重绘回流

7. uglify 原理的是什么

考察点：uglify 原理

8. tcp 重试机制

考察点：tcp

9. 层次遍历二叉树

考察点：二叉树

10. 实现节流函数

考察点：节流函数

```javascript
function throttle(event, wait) {
    let pre = 0,
        timer = null;
    return function (...args) {
        if (new Date() - pre > wait) {
            clearTimeout(timer);
            timer = null;
            pre = new Date();
            event.apply(this, args);
        } else {
            timer = setTimeout(() => {
                event.apply(this, args);
            }, wait);
        }
    };
}
```

```javascript
function debounce(event, wait, flag) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        if (flag && !timer) {
            event.apply(this, args);
        } else {
            timer = setTimeout(() => {
                event.apply(this, args);
            }, wait);
        }
    };
}
```
