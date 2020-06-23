# 防抖函数

什么是防抖
使用场景
防抖原理
手写防抖
对比lodash

#### 防抖

```javascript
const debounce = (func, wait = 50) => {
	let timer = 0;
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this, args)
        }, wait)
    }
}
```

