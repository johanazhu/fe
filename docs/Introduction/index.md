# 写在前面

打造知识体系，这不是件容易的事。在 19 年时，笔者看到不少同行在说一个词——**前端体系**。前端不单单只是 HTML、CSS、JavaScript、NodeJS 以及各种构建工具和三大框架，它更包括小程序、微信生态、跨平台、大前端概念等等。随着工龄的提升，知识面被不断打开，笔者也逐渐从一个小小开发者成长为能够独立完成项目的人

在此写下对前端及其他编程知识的理解


<RoadMap :data="[
    { title:'三五知识图谱', x:300, y:80 ,download:true},
    { title:'JavaScript', y:130, link:'/JavaScript/',
    left: [
      [{ title: '面试篇',  link:'/JavaScript/面试题/' }],
      [{ title: '基础篇',  link:'/JavaScript/' }],
      [{ title: '原理篇', link:'/JavaScript/原理/' }],
      [{ title: '高阶篇', link:'/JavaScript/高阶/' }],
    ],
    right: [
        [{ title: 'TypeScript', link:'/TypeScript/' }],
    ],
    } ,
    { title:'React',  link:'/React/',
        right: [
            [{ title: '面试篇',  link:'/React/面试题/' }],
            [{ title: '基础篇',  link:'/React/' }],
            [{ title: '生态篇', link:'/React/生态/' }],
        ]
    },
    { title:'大前端',  link:'/WebApp/', y:220, x:-100,
        left: [
            [{ title: '移动H5开发',  link:'/WebApp/' }],
            [{ title: '微信公众号',  link:'/WebApp/WeChat/' }],
            [{ title: '微信小程序', link:'/WebApp/MiniApp/' }],
            [{ title: 'Flutter',  link:'/WebApp/Flutter/' }],
            [{ title: 'ReactNative',  link:'/WebApp/ReactNative/' }],
        ],
    },
    { title:'前端工程化', y:1, x:240,
        right: [
              [{ title: 'webpack',  link:'/webpack/' }],
            [{ title: '微前端',  link:'/Engineered/MicroFrontend/' }],
            [{ title: '代码规范',  link:'/Engineered/StandardGuide/' }],
        ],
    },
    { title:'ES6', link:'/ES6/', x:-162,y:170,
        right: [
            [{ title: 'ES6 面试题',  link:'/ES6/面试题/' }],
            [{ title: 'ES6 知识点',  link:'/ES6/' }],
            [{ title: 'Promise 专栏', link:'/ES6/Promise/' }],
        ],
    },
    { title:'浏览器', link:'/Browser/',
        left: [
            [{ title: 'Browser 面试题',  link:'/Browser/面试题/' }],
            [{ title: 'Browser 知识点',  link:'/Browser/' }],
        ],
        right: [
            [{ title: 'HTTP', link:'/HTTP/'}],
            [{ title: '性能优化',  link:'/Performance/' }]
        ]
    },
    { title:'⭐后端之海', x: 10, y:200, link:'/Browser/',
        left: [
            [{ title: '本命 Node',  link:'/Node/' },
                [-50],
                [
                    [{ title: 'Node 基础',  link:'/Node/' }],
                    [{ title: 'Koa2',  link:'/Node/Koa2/' }],
                    [{ title: 'Express',  link:'/Node/Express' }],
                    [{ title: 'PM2',  link:'/Node/PM2' }]
                ]
            ],
            [{ title: '其他语言',   },
                [50],
                [
                    [{ title: 'Ruby',  link:'/BackEnd/Ruby/' }],
                    [{ title: 'Go',  link:'/BackEnd/Go/' }],
                    [{ title: 'Python',  link:'/BackEnd/Python/' }],
                ]
            ],
        ],
        right: [
            [{ title: '数据库' },
                // [-50],
                [
                    [{ title: 'Mysql', link:'/BackEnd/Mysql'}],
                    [{ title: 'MongoDB', link:'/BackEnd/MongoDB'}],
                ]
            ],
            // ['内存'],
            // ['进程线程'],
            // ['缓存缓存系统'],
            [{ title: 'Redis', link:'/BackEnd/Redis'}],
            [{ title: '共同知识点' },
                [
                    [{ title: 'HTTP', link:'/HTTP/'}],
                    [{ title: 'Session', link:'/BackEnd/session与JWT'}],
                    [{ title: 'RESTful', link:'/BackEnd/RESTful'}]
                ]
            ],
        ],
    },
    { title:'运维天下', y:220,
        left: [
            [{ title: 'Linux',  link:'/Linux/' }],
            [{ title: 'DevOps',  link:'/DevOps/' }],
            [{ title: 'Nginx',  link:'/DevOps/Nginx/' }],
        ],
        right: [
            [{ title: 'Docker', link:'/Docker/' }],
            [{ title: 'Git',  link:'/Git/' }],
        ]
    },
    { title:'计算机基础打底',
        left: [
            [{ title: '计算机基础',  link:'/CSBasic/' }]
        ],
        right: [
            [{ title: '设计模式',  link:'/DesignPattern/' }],
        ]
    },
    { title:'基础三件套',
        left: [
            [{ title: 'HTML',  link:'/Basic/HTML/' }],
            [{ title: 'CSS',  link:'/Basic/CSS/' }],
            [{ title: 'JQuery',  link:'/Basic/JQuery/' }]
        ],
        right: [
            [{ title: '面试真题',  link:'/Interview/' }],
            [{ title: '提问技巧',  link:'/Interview/talk/' }],
        ]
    },
    { title:'源码读书课程',
        left: [
            [{ title: '阅读源码', link:'/Read/code/',  },
                [
                    [{ title: 'Jquery', link:'/Read/code/Jquery'}],
                    [{ title: 'Redux', link:'/Read/code/Redux'}],
                    [{ title: 'Underscore', link:'/Read/code/Underscore'}],
                ]
            ],
        ],
        right: [
            [{ title: '读书笔记',  link:'/Read/book/' }],
        ]
    },
    { title:'其他',
        right: [
            [{ title: '关于本网站',  link:'/About/' }]
        ],
    },
    { title:'程序员的归宿' }
]" />
