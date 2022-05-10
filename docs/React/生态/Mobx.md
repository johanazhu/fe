# Mobx

## Mobx 是什么

-   Mobx 是一个简单的、可扩展的、经过测试的状态管理解决方案

-   简单到令人发指的状态管理解决方案

-   掌握核心 API
    -   observable
    -   action

## Mobx 的实现原理

![image-20210913062914362](https://i.loli.net/2021/09/13/dtewNqa1rEUylR2.png)

## 为什么要用 Mobx

-   学习成本低
-   方便管理
-   效果比肩 Redux

## Mobx 要点

-   使用 mobx 让一个应用变成响应式只需要 3 步
    -   定义状态并使其可观察
        -   Observable 定义数据结构，可以为对象，数组，类等等
-   创建视图以响应状态的变化
    -   @observer 观察
-   更改状态
    -   @action 动作

## 概念与原则

1. state（状态）
    - state 就是驱动应用的数据
2. derivations（衍生）
    - 任何源自状态并且不会有任何进一步的相互作用的东西就是衍生
        - 用户界面
        - 衍生数据
        - 后端集成
3. action（动作）
    - 动作是任一一段可以改变状态的代码。用户事件、后端数据推送、预定事件、等等

## 核心 API

-   Observable：可以为 JS 的基本数据类型、引用类型、普通类型、类实例、数组和映射
-   Computed：计算值（自动响应状态的值）
-   Reactions： 反应 （自动响应状态的副作用）——在 mobx-react 中以 observer 为例
-   Actions：动作，动作用来修改状态

## Mobx 与 React 的应用场景

## Mobx 原理

## 参考资料

-   [mobx 官网](https://zh.mobx.js.org/the-gist-of-mobx.html)
-   [Mobx 简明教程](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651234690&idx=2&sn=2aa41bd2804a25aa5a9052ff940a5757&chksm=bd4978068a3ef1100c0be3f27edb7c5c9353eb011610a576930b17e010685620b4d16ecbfb6a&mpshare=1&scene=1&srcid=&sharer_sharetime=1574207008025&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [从零开始用 proxy 实现 mobx](https://github.com/ascoders/blog/issues/19)
-   [MobX 入门教程](https://github.com/sorrycc/blog/issues/2)
-   [MobX 原理](https://github.com/sorrycc/blog/issues/3)
-   https://github.com/chenxiaochun/blog/issues/51
-   [MobX 的实现原理是？](https://mp.weixin.qq.com/s/zWp-qSVeOjzHKiOYLi2s0g)
