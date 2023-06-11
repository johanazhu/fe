# 浏览器对象模型（BOM）

浏览器对象模型（BOM）





## navigator

**`Geolocation.getCurrentPosition()`** 方法用来获取设备当前位置

[api文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition)

```javascript
navigator.geolocation.getCurrentPosition(pos => console.log(pos), pos => console.log('err', pos))
```

js 获取浏览的版本

```
navigator.userAgent
```

