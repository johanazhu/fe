# 用 setTimeout 实现 setInterval

```javascript
setInterval(function () {
    console.log("1");
}, 1000);
// 每隔1秒打印一个1

function mySetInterval(func, wait) {
    setTimeout(func, wait);
}
// 带清理功能
// 返回值
```

## 参考资料

-   [用 setTimeout 实现 setInterval，阐述实现的效果与 setInterval 的差异](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/259)
