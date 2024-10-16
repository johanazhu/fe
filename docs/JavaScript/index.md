# JavaScript 导航

> 一生的知识积累，自学的起码占 90%

我们站在五年工作的基础上，脑子里能想到哪些与 JavaScript 相关的关键字

类型、对象、函数、原型、原型链、继承、词法作用域、作用域链、执行上下文、执行上下文栈、this、闭包、垃圾回收、事件循环...

这些知识点之间有什么联系呢？笔者认为：

每一个知识点之间互相是有关联的，就像一座座城市，城市有城市群，大的城市群就是一个大的知识点，每个小的知识点之间也是有联系的

如果把前端知识点类比中国地图上的城市省份， JavaScript 基础就是”长三角地区“，这是中国最重要的地方之一，也是一名高级前端必备的知识点


<RoadMap :data="[
    { title:'JavaScript', x:300, y:80 ,download:true},
    { title:'JavaScript 是什么', link:'/JavaScript/JavaScript是什么', 
    // y:1, x:240, 
        right: [
            ['由什么组成'],
            ['ES版本'],
        ],
    },
    { title:'由什么组成',  link:'/JavaScript/JavaScript由什么组成',
        left: [
            ['数据类型'],
            ['类型区别'],
            [{ title: '类型判断' },
                // [-50],
                [
                    ['typeof'],
                    [{ title: '🔥instanceof',  link:'/JavaScript/instanceof——找祖籍' }],
                    ['constructor'],
                    ['Object.prototype'],
                ]
            ],
        ]
    },
    { title:'一切皆对象',  link:'/JavaScript/一切皆对象',
        right: [
            ['定义'],
            ['基本包装类型'],
        ]
    },
    { title:'Object（对象）',  link:'/JavaScript/Object',
        left: [
            ['属性与方法'],
            [{ title: '创建对象' },
                // [-50],
                [
                    ['对象直接量'],
                    [{ title: '🔥关键字 new',  link:'/JavaScript/new做了什么' }],
                    [{ title: '🔥Object.create',  link:'/JavaScript/Object.create' }],
                ]
            ],
        ],
         right: [
           [{ title: '🔥拷贝的秘密'},
                [
                    ['深浅拷贝的区别'],
                    ['扩展运算符'],
                    ['Object.assign'],
                    ['slice'],
                    ['concat'],
                    ['Array.from'],
                    ['JSON.stringify'],
                    ['structuredClone'],
                ]
           ]
        ]
    },
    { title:'原型',  link:'/JavaScript/原型',
        left: [
            ['原型是什么'],
            ['为什么要有原型'],
            ['原型链又是什么'],
        ]
    },
    { title:'继承',  link:'/JavaScript/继承',
        left: [
            ['原型链继承'],
            ['构造函数继承'],
            ['组合继承'],
            ['原型式继承']
        ],
        right: [
            ['寄生式继承'],
            ['寄生组合式继承'],
            ['类继承'],
        ]
    },
    { title:'Function（函数）',  link:'/JavaScript/Function',
        left: [
           [{ title: '🔥JS中的始皇',  link:'/JavaScript/JavaScript中的始皇' }],
        ],
        right: [
            ['属性和方法'],
            ['创建函数'],
            ['调用函数'],
            ['一等公民'],
        ],
    },
    { title:'作用域',  link:'/JavaScript/作用域',
        left: [
            ['作用域是什么'],
            ['词法/动态作用域'],
            [{ title: '作用域中的分类'},
                [
                    ['块级作用域'],
                    [{ title: '🔥立即执行函数',  link:'/JavaScript/立即执行函数（IIFE）' }]
                ]
            ],
        ],
    },
    { title:'this 关键字',  link:'/JavaScript/this关键字',
        right: [
            [{ title: '调用方式'},
                [
                    ['对象方法调用'],
                    ['函数调用'],
                    ['箭头函数调用'],
                    ['构造函数调用'],
                    ['call'],
                    ['apply'],
                    ['bind'],
                ]
            ],
            ['函数的执行环境'],
            ['this的作用'],
        ],
    },
    { title: 'call、apply、bind',  link:'/JavaScript/call、apply、bind三大将',
        left: [
            ['call'],
            ['apply'],
            ['bind'],
        ],
    },
    { title: '词法环境',  link:'/JavaScript/词法环境',
        right: [
            ['JS编译过程'],
            ['由什么组成'],
            ['变量提升'],
        ],
    },
    { title: '上下文与调用栈',  link:'/JavaScript/执行上下文与调用栈',
        left: [
            ['上下文是什么'],
            ['执行生命周期'],
            ['执行步骤'],
            [{ title: '🔥作用域VS上下文',  link:'/JavaScript/作用域与执行上下文' }],
        ],
    },
    { title: '闭包',  link:'/JavaScript/闭包',
        right: [
            ['闭包的定义'],
            ['原理'],
            [{ title: '应用'},
                [
                    ['作为返回值'],
                    ['作为参数传递'],
                    ['私有实例变量'],
                    [{ title: '🔥防抖与节流',  link:'/JavaScript/防抖与节流' }],
                    [{ title: '🔥函数式编程',  link:'/JavaScript/函数式编程' }],
                    ['面向事件编程'],
                    ['模块化'],
                    ['React hooks'],
                ]
            ],
        ],
    },
    { title: '垃圾回收机制',  link:'/JavaScript/垃圾回收机制',
        left: [
            ['新生代'],
            ['老生代'],
            ['引用计数'],
        ],
    },
    { title: '数组（Array）',  link:'/JavaScript/数组',
        right: [
            ['属性和方法'],
            ['哪些是纯函数'],
            ['判断是否是数组'],
        ],
    },
       { title: '循环都来这儿',  link:'/JavaScript/循环都来这儿',
        left: [
            ['for 循环'],
            ['for(reverse) 循环'],
            ['for...in'],
            ['for...of'],
            ['forEach'],
            ['map'],
        ],
    },
    { title:'完' },
]" />


本章会讲解 JavaScript 中的基础知识，例如会在开篇讲 [JavaScript 是什么](./JavaScript是什么.md)，介绍它是什么，语言的特点等等。之后再讲 [JavaScript 由什么组成](./JavaScript由什么组成.md)。这里会讲解语言的构成，引出数据类型。JavaScript 的数据类型由基本类型和引用类型构成，从两者的差异到如何辨别两者，引出四种辨别方法：typeof（操作符）、instanceof（运算符）、constructor（构造方法）、Object.prototype.toString.call(source) （原型方法），总结它们的优缺点，最后手写一个判断数据类型的方法——isType

有句话说：在 JavaScript 中，一切皆对象。理解了对象，就理解了 JavaScript。所以我们会以[一切皆对象](./一切皆对象.md) 为话题验证此观点是否正确

在对对象有所了解后，我们知道了 JavaScript 中的「对象」具有多种涵义，它既包括了 Object、Function、Array 等内置对象，也包括宿主对象，自定义对象

既然如此，我们就从内置构造函数  [Object](./Object.md) 讲起，从属性讲到方法，再从创建对象到拷贝对象。其中创建对象方法中的  [new](./new做了什么.md) 、[Object.create](./Object.create.md) 单开一文进行阐述，[拷贝对象](./拷贝的秘密.md)也非一两句能说明白，所以亦会写篇文章介绍

而从 JavaScript 中的绝大多数“元素”是对象（除了null、undefined之外）为契机，思考这是为什么。原因是 JavaScript 是基于原型继承的语言，从而了解[原型](./原型.md)以及[继承](./继承.md)（我们在 new 中也会提及原型）。在继承一文中，画原型链关系图时，对 `Function.__proto__ === Function.prototype` 此关系感到疑惑，并对原型链的源头是谁感到好奇，到底是谁在继承的源头，所以就有了 [JavaScript 中的始皇](./JavaScript中的始皇.md) 一文

对原型和继承有所了解后，会对它的应用感到好奇，这里以 instanceof 为例子，会写一篇 [instanceof——找祖籍](./instanceof——找祖籍.md)

如此，我们讲完了 Object，接着讲 Function，说说为什么 [函数是一等公民](./Function.md)，和 Object 一样，我们从属性讲到方法，并介绍了创建函数、调用函数的使用。有了这些基础后，再介绍为什么函数是一等公民。它身为一等公民不仅是因为它是对象（能赋值给变量），更因为它有函数特有的”天赋“，函数可以作为别的函数的参数、函数有返回值。除此之外，它还有[函数作用域](./作用域)、[this](this关键字.md)、[立即执行函数](./立即执行函数（IIFE）.md)、arguments 等函数独有的特性

如此，我们就挨个讲解这些特性，讲到 this 时，我们会就它的用法“谁调用我，我指向谁”，衍生到 Function 原型上的三个原型方法：call/apply/bind，它们是如何实现的，又如何手写，我们单独写一篇——[call、apply、bind 三大将](./call、apply、bind三大将.md) 

至于 this 为什么是动态的，而不是像作用域那样，根据所写的位置而定下的呢，要想了解此现象，就需要了解 [执行上下文与调用栈](./执行上下文与调用栈.md)，而在讲执行上下文前，需要再了解一个概念——[词法环境](./词法环境.md)

也就是说当我们知道了词法环境、执行上下文后，才能解释清楚 this 的经典名言，我们甚至可以对比下[作用域与执行上下文](./作用域与执行上下文.md)。说了这么多，知道了诸多概念后，我们就可以去介绍[闭包](./闭包.md)了，而由闭包衍生出来的应用，如[防抖与节流](./防抖与节流.md)、[函数式编程](./函数式编程.md)，以及它造成的影响——[垃圾回收机制](./垃圾回收机制.md)。又是一个个好问题，会单独列出来讲解

如此，就讲完了 Object 和 Function，再讲 [Array](./Array.md)、[String](./String.md)，其余的内置构造函数则无需细讲。在讲 Array 时，有个话题不得不提到，那就是循环，各种循环的使用和差异是怎么样的，我们单独写一篇：[循环都来这儿](./循环都来这儿.md)

总的来说，笔者希望能一环扣一环，因为有这些那样的问题，所以才有相应的解决之道。就像如果要理解闭包，就必须要知道作用域和执行上下文，而执行上下文则是由 this 引出，而介绍它（执行上下文）又要先引出词法环境和执行代码阶段的知识点

对比一下 Function 能引出的知识点是最多的，其次是 Object，而 Array、String 能有一些常见的方法出来就不错了，你看，知识的非均衡性体现的淋漓尽致

笔者始终认为，要明白一个知识点，应该从想知道它是什么，能做什么开始，然后再去了解它的背景知识等，而不是先去了解它的背景知识，然后再告诉你它能做什么。因为我们是从需求出发，要先会做，再去了解原理

## 笔者心得

刚毕业那一年面试，害怕被人问：原型、原型链、闭包、执行上下文、继承...过了一年，开始问 ES6 各类问题、React/Vue，再后来，开始问手写防抖节流、深拷贝、webpack 的打包原理等，现在前端开始面算法。总之，总有人比你懂的多，总有问题会把你问住，而我们要做的，就是把基础打好

一步一个脚印，每天完善一点，把这份五三答卷交付
