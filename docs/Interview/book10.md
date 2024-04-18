# 模拟题十



## 1.介绍下盒子模型

考察点：盒子模型

盒子模型由 margin、border、padding、content 组成
分两种
标准盒子模型
width= content 宽度
height= content 高度
IE 模型
width=border+content+padding
height=border+content+padding
标准盒子模型：box-sizing:content-box
IE 盒子模型：box-sizing:border-box



## 2. 手写 instanceof 

考察点：instanceof 原理



## 3.history 和 hash 两种路由最大的区别是什么

考察点：history 和 hash 两种路由最大的区别是什么



## 6. React 合成事件是什么

考察点：合成事件

为什么需要合成事件？和原生事件相比有什么不同

目的：封装事件，实现跨平台，把差异封装在底层
将事件全部统一冒泡到 document 再进行触发
可以统一命名，这样子命名符合 react 编程习惯

抹平不同浏览器的差异、与内部优先级机制绑定、需要考虑所有浏览器事件

在 react 中，我们绑定的事件并不是原生事件，而是由原生事件合成的 react 事件，比如 click 事件合成为 onClick 事件；比如 blur、change、input 等，合成为 onChange 事件，它统一绑定在 document 上统一管理（react 17 之后就绑定在 root 根节点上，这样做的好处是利于微前端）

衍生：事件冒泡



## 8.monorepo是怎么做的





## 9.当用户反馈页面加载慢，你是前端怎么排查这个问题









## 10.算法题：合并两个有序数组

考察点：合并两个有序数组
