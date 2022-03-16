# SetTimeout

#### 1.如果当前任务执行时间过久，会影响定时器任务的执行

#### 2.如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒

### requestAnimationFrame 的工作机制

一般每 16.7ms 刷新一次

### requestAnimationFrame VS setTimeout

requestAnimationFrame 是由系统来决定回调函数的执行时机，而 setTimeout 要先放入消息队列中，当主线程上的任务执行完才会去执行 setTimeout 里的，如果主线程会执行时间慢了，即使定时任务中的时间到了，还是要延迟执行

## 参考资料

-   [字节面试官问粉丝，如何实现准时的 setTimeout](https://mp.weixin.qq.com/s/ENU93_jSUaAONCkfTQTK-Q)
