# React 导航

> 学习一个东西之前，首先在大脑中积累充分的”疑惑感“。即弄清面临的问题到底是什么，在浏览方法本身之前，最好先使劲问问自己都想到什么方法。一个公认的事实是，你对问题的疑惑越大，在之前做的自己的思考越多，当看到解答之后印象就越深刻

俺是做 React 开发的，React 的知识点有很多，延伸出的点更多，该如何做取舍？我们是要做到事无巨细逐个分析，还是针对常见问题进行讲解。我认为，没有一个全面的指导思路路会走窄，而一味求全只做蜻蜓点水式的了解根本进不了大厂。所以俺不得既要全，又要深。本章节以常见面试题为抓手，测量自己对 React 的了解程度，再对每个知识点进行分析讲解，能做多少就做多少，尽量都写到



<RoadMap :data="[
    { title:'React', x:300, y:80 ,download:true},
    { title:'React面试题', 
    // y:1, x:240, 
        right: [
            [{ title: '🔥常见面试题',  link:'/React/面试题' }],
            [{ title: '代码题',  link:'/React/面试题/代码题' }],
            [{ title: '十万条数据',  link:'/React/面试题/渲染十万条数据解决方案' }]
        ],
    },
    { title:'React快速了解',  link:'/React/React快速了解',
        left: [
            [{ title: '哲学' },
                [-50],
                [
                    ['单向数据流'],
                    ['不可变特性'],
                ]
            ],
            [{ title: '特征' },
                // [-50],
                [
                    ['UI = f(data)'],
                    ['一切都是组件'],
                    ['声明式编程'],
                ]
            ],
        ]
    },
    { title:'Fiber',  link:'/React/Fiber',
        right: [
            ['Fiber 是什么'],
            ['Fiber 的作用'],
            ['为什么有 Fiber'],
            ['Fiber 理论实现'],
            ['Fiber 实现原理'],
            ['Fiber 如何工作'],
        ]
    },
    { title:'VirtualDOM',  link:'/React/VirtualDOM',
        left: [
            ['什么是 VM'],
            ['为什么需要 VM'],
            ['如何实现 VM'],
        ]
    },
    { title:'Diff算法',  link:'/React/Diff',
        right: [
            ['是什么'],
            ['有什么用'],
        ]
    },
    { title:'Hooks',  link:'/React/Hooks',
        left: [
            ['基础介绍'],
            ['由来'],
            ['是什么'],
        ],
        right: [
            [{ title: '各种 Hooks'},
                [
                    ['useState'],
                    ['useEffect'],
                    ['useContext'],
                    ['useReducer'],
                    [{ title: '🔥useMemo',  link:'/React/useCallback和useMemo' }],
                    [{ title: '🔥Ref以及useRef',  link:'/React/Ref以及useRef' }],
                    [{ title: '🔥Hooks 踩坑',  link:'/React/Hooks踩坑' }],
                    [{ title: '🔥Hooks实现原理',  link:'/React/Hooks实现原理' }],
                    [{ title: '🔥自定义Hooks',  link:'/React/手写自定义HooksS' }]
                ]
            ],
        ],
    },
    { title:'快问快答 setState',
        right: [
            ['为什么这么用'],
            [{ title: 'setState原理',  link:'/React/setState' }],
        ]
    },
    { title:'其他知识点',  link:'/React/Diff',
        left: [
            [{ title: '🔥函数式VS类组件', link:'/React/函数式组件与类组件有何不同' }],
            [{ title: '性能优化',  link:'/React/性能优化' }],
            [{ title: '事件机制',  link:'/React/事件机制' }],
            [{ title: '版本更新',  link:'/React/React版本更新' }],
        ]
    },
    { title:'生态',  link:'/React/生态/',
        right: [
            [{ title: '🔥Redux', link:'/React/从Redux说起，到手写，再到状态管理' }],
            [{ title: 'ReactRedux',  link:'/React/ReactRedux' }],
            [{ title: 'ReactRouter',  link:'/React/ReactRouter' }],
        ]
    },
    { title:'完' },
]" />


## React 面试题

这些面试题基本和基础知识点中的知识点有所联系，

-   [常见面试题](./面试题/)
-   [代码题](./面试题/代码题)
-   [渲染十万条数据解决方案](./面试题/渲染十万条数据解决方案)

## React 各种知识点

-   [React 快速了解](./React快速了解)
-   [Fiber](./Fiber)
    -   Fiber 是什么
    -   Fiber 的作用
    -   为什么会有 Fiber
    -   Fiber 理论实现
    -   Fiber 实现原理
    -   Fiber 是如何工作的
-   [VirtualDOM](./VirtualDOM)
    -   什么是 VM
    -   为什么需要 VM
    -   如何实现 VM
-   [Diff](./Diff)
    -   是什么？
    -   有什么用？
-   [Hooks](./Hooks)
    -   基础介绍
    -   由来
    -   各个 Hooks
        -   useState（状态）
        -   useEffect（副作用）
            -   与 useLayoutEffect 的区别
        -   useContext（上下文）
        -   useReducer（Redux）
    -   [useCallback、useMemo](./useCallback和useMemo)
    -   [Ref以及useRef](./Ref以及useRef)
    -   [Hooks 踩坑](./Hooks踩坑)
    -   [Hooks实现原理](./Hooks实现原理)
    -   [手写自定义Hooks](./手写自定义Hooks)
-   [快问快答setState](./快问快答setState)
    -   为什么要用 setState，而不是直接 `this.statet.xx == oo`？
    -   [setState 异步的原理](./setState)
-   [函数式组件与类组件有何不同](./函数式组件与类组件有何不同)
-   [性能优化](./性能优化)
-   [事件机制](./事件机制)
-   [里程碑](./里程碑)
    -   React 从13年开始到V15的Class组件 + 生命周期 再到Function + Hooks 的时间节点里程碑
-   [React版本更新](./React版本更新)
-   [生命周期](./生命周期)（已过时）
    -   class 才有生命周期
    -   15 的生命周期
    -   16.3 的生命周期
    -   16.4 及以上的生命周期

## 生态

-   [Redux](./生态/从Redux说起，到手写，再到状态管理)
    -   Redux 是什么
    -   它的作用

-   [ReactRedux](./生态/ReactRedux)
    -   是什么？ 单向数据流
    -   有什么用？
    -   手写
    -   连接 React 与 Redux
-   [ReactRouter](./生态/ReactRouter)
-   [Redux-Sage](./生态/Redux-Sage)：还未写
-   [Redux-thunk](./生态/Redux-thunk)：还未写
-   [Dva](./生态/Dva)：还未写
-   [Mobx](./生态/Mobx)：还未写
-   [各个状态库对比](./生态/状态管理)：还未写
-   [Immutable](./生态/Immutable)：还未写
