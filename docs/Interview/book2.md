# 模拟题二



## 1. CSS：如何实现垂直居中？

考察点：div 居中

分三种情况，水平居中，垂直居中，水平垂直居中

单水平居中而言，居中元素不定宽高
absolute+transform
flex 属性居中
flex + 子项 margin auto
grid 属性居中
grid 子项 margin auto
grid 子项属性居中
-webkit-box 属性居中
table-cell + text-align
line-height + text-align
writeing-mode
table
居中元素需定宽高
须知宽高+absolute+负 margin
须知宽高+absolute+calc
须知宽高+absolute+margin auto
局限性较大的全局居中
须知宽高+fixed+transform
须知宽高+fixed+负 margin
须知宽高+fixed+calc
须知宽高+fixed+margin auto



## 2. 手写源码：深拷贝

深拷贝的原理以及最新的解决方案





## 3. 原型和原型链

原型链考点

颜的原型图







## 5. Fiber 是什么，为什么需要 Fiber

考察点：fiber
在 react 16 之前面临的主要性能问题是：当组件很庞大时，更新状态可能造成页面卡顿，根本原因在于更新流程是同步、不可中断的。react 16 重写了代码，提出 fiber 架构，它是可异步中断的

react 为什么需要 fiber

react 16 提出的架构，又是工作单位，又是数据结构
因为 react 16 之前的架构会在大组件更新时出现卡顿问题，所以 react 16 之后就采用异步更新的架构，这个架构就叫 fiber。同样，它可以作为静态的数据结构，每个 fiber 节点对应一个 React element，保存了该组件的类型、对应的 DOM 节点等信息；它作为动态的工作单位来说，每个 fiber 节点保存了本次更新中该组件改变的状态、要执行的工作（需要删除、插入、更新）



考察点：fiber

react fiber 是 React16 提出的新的 React 架构，是为了解决 React 16 之前大组件渲染更新时出现的卡顿问题，之所以出现这个问题是因为之前的架构是同步不可中断的执行，react fiber 是 react 16 的新架构，其特点是异步可中断。







## 6.为什么有时 react 两次 setState，只执行了一次

考察点：批处理







## 8.Webpack构建的原理 ⭐



## 9.OSI七层模型 ⭐



## 10. 算法题：三数之和
