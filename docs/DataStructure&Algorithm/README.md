# 数据结构与算法

算法目前在前端面试中常出现，有什么办法可以提升呢？

我的方法是每天练习

做了一个实验，每天早起写一个 leetcode 题，并且公开我的库练习库 [leetcode](https://github.com/johanazhu/leetcode)

这里，我对一些数据结构与算法做一分钟解释，具体练习可以看我的算题记录

## 复杂度分析

时间复杂度

空间复杂度

## 数据结构

[字符串](#字符串)

[数组](#数组)

[链表](#链表)

[栈](#栈（Stack）)

[队列](#队列（Queue）)

[哈希表](#哈希表)

[堆](#堆)

跳表

图

二叉树

Tire 数

## 算法

递归

排序

二分查找

BFS

DFS

滑动窗口（双指针）

搜索

哈希

贪心

分治

回溯

动态规划

### 字符串

字符串概述

### 数组

数组（Array）是一种线性表数据结构。它用一组连续的内存空间，来存储一组具有相同类型的数据

### 链表

链表和数组相似，他们都是有序的列表、都是线性结构（有且仅有一个前驱、有且仅有一个后继）。不同点在于，链表中，数据单位的名称叫做“结点”，而结点和结点的分布，在内存中可以是**离散**的

### 栈（Stack）

栈是一种后进先出（LIFO，Last In First Out）的数据结构

只用 pop 和 push 完成增删的“数组”

它由两个特征：

-   只允许从尾部添加元素
-   只允许从尾部取出元素

**对应到数组的方法，刚好就是 push 和 pop。因此我们可以认为在 JavaScript 中，栈就是限制只能用 push 来添加元素，同事只能用 pop 来移除元素的一种特殊的数组**

除了 pop 和 push 之外，栈相关的面试题中往往还会涉及到取栈顶元素的操作。所谓栈顶元素，实际上它值得就是数组尾部的元素

### 队列（Queue）

队列是一种先进先出（FIFO，First In First Out）的数据结构

只用 push 和 shift 完成增删的“数组”

它就像我们去排队（没有插队的情况下）。先排队的人先轮到，后排到的人后轮到

两个特征：

-   只允许从尾部添加元素
-   只允许从头部移除元素

整个过程只涉及了数组的 push 和 shift 方法

在栈元素入栈时，我们关系的是栈顶元素（数组的最后一个元素）；队列元素出栈时，我们关心的则是队头元素（数组的第一个元素）

```javascript
const queue = [];
queue.push("first son");
queue.push("second son");
queue.push("third son");

while (queue.length) {
    const top = queue[0];
    console.log(top, "轮到你");
    queue.shift(); // 出栈
}

queue;
```

## 参考资料

-   [前端算法与数据结构面试](https://juejin.im/book/6844733800300150797/section/6844733800342093832)
-   [十大经典排序算法汇总](https://mp.weixin.qq.com/s?__biz=MjM5NDkxMTgyNw==&mid=2653061880&idx=2&sn=1d704d7f84bfa7264d02a509f96b5839&chksm=bd56a1c48a2128d25b23c0b33525a31f225f47a4ca84e32e4e31397ab653b48f12f0a6ae23c8&mpshare=1&scene=1&srcid=&sharer_sharetime=1567569370392&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [在 JavaScript 中学习数据结构与算法](https://juejin.cn/post/6844903482432962573)
