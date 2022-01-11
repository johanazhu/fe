# JavaScript相关面试题



### js延迟加载的方式有哪些？

defer 和 async

​	什么是defer？

​	什么是async？

动态创建DOM方式

按需异步载入js



### 如何解决跨域问题?





### 如何统计当前页面出现过多少种 html 标签

```javascript
new Set([...document.getElementsByTagName("*")].map(v=>v.tagName)).size
```



### 求一个网页中出现次数最多的三种标签

```javascript
const html = document.querySelector('html');
const htmlChild = html.children;
let obj = {};
function fn(children) {
    for (let i of children) {
        if (obj.hasOwnProperty(i.tagName)) {
            obj[i.tagName] = obj[i.tagName] + 1
        } else {
            obj[i.tagName] = 1;
        }
        const child = i.children;
        if(child.length!== 0) {
            fn(child)
        }
    }
}
fn(htmlChild)
let tag = Object.entries(obj).sort((a, b) => b[1] - a[1])

function result(array) {
    return array.slice(0, 3)
}
console.log(result(tag))

```



问：介绍defineProperty方法，什么时候需要用到









## 参考资料

- [夯实JS主要知识点](https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046276&idx=1&sn=b54360af4eaa853699f6ebda2d2be822&chksm=87cbe694b0bc6f8238b645cbffe7c3ef7c4b3f6a6899670e5a306b494e819af2d4dd1cf052f1&mpshare=1&scene=1&srcid=&sharer_sharetime=1566830719714&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
- [44道JS难题，做对一半就是高手](https://www.jianshu.com/p/e161bd720e64)
- [JS 20道概念虽老但也略有收获的JS基础题](https://www.cnblogs.com/echolun/p/13363457.html)
- [精选十道前端面试题](https://zhuanlan.zhihu.com/p/373484984)
- [字节跳动最爱考的前端面试题：JavaScript 基础](https://mp.weixin.qq.com/s/kh8H5YkFiJOgRH7hAzXfGQ)