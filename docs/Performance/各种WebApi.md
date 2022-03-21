# 各种 Web Api

### 监听视窗激活状态

![原型](https://i.loli.net/2021/11/24/I4elPJRbA8W639F.gif)

```javascript
// 窗口激活状态监听
let vEvent = 'visibilitychange';
if (document.webkitHidden != undefined) {
    vEvent = 'webkitvisibilitychange';
}

function visibilityChanged() {
    if (document.hidden || document.webkitHidden) {
        document.title = '客官，别走啊~';
        console.log('Web page is hidden.');
    } else {
        document.title = '客官，你又回来了呢~';
        console.log('Web page is visible.');
    }
}

document.addEventListener(vEvent, visibilityChanged, false);
```

### 观察长任务（performance 中 Task）

```javascript
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log(entry);
    }
});

observer.observe({ entryTypes: ['longtask'] });
```

### 监听网络变化

网络变化时给用户反馈网络问题，有时候看直播的时候自己的网路卡顿，直播平台也会提醒你或者自动给你切换清晰度

```javascript
var connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
var type = connection.effectiveType;

function updateConnectionStatus() {
    console.log(
        'Connection type changed from ' +
            type +
            ' to ' +
            connection.effectiveType,
    );
    type = connection.effectiveType;
}

connection.addEventListener('change', updateConnectionStatus);
```
