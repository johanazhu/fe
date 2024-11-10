# 后端知识点汇总

作为一名前端出生的程序开发者，要如何学习后端方面的知识点呢？这里分享笔者对后端知识点的理解，


<RoadMap :data="[
    // { title:'三五路线图',x:320,y:200 ,download:true},
    { title:'⭐后端之海', x:320,y:240,
    // download:true,
        link:'/BackEnd/',
        left:[
            [{ title: 'Ruby',  link:'./Ruby/' },[
                ['rails']
            ]],
            [{ title: 'Goland',  link:'./Go/' }],
            [{ title: 'Python', link:'./Python/' },[
                ['Flask'],
                ['Django']
            ]],
        ],
        right:[
            ['数据库',[
                [{ title: 'Mysql', link:'./Mysql'}],
                [{ title: 'Postgresql', link:'./Postgresql'}],
                [{ title: 'MongoDB', link:'./MongoDB'}],
                [{ title: 'SQLite', link:'./SQLite'}],
                 [{ title: 'Redis', link:'./Redis'}],
            ]],
            // ['内存'],
            // ['进程线程'],
            // ['缓存缓存系统'],
        ],
    },
    {title:'共同知识点',
        left:[
            [{ title: 'HTTP 协议', link:'/HTTP/'}],
            [{ title: 'Session', link:'./session与JWT'}],
            [{ title: 'RESTful', link:'./RESTful'}]
        ]
    },
    {title:'全栈开发者'}
]" />

在 前端学习完之后，学习 [Node](../Node/)，对后端有所认知后，去了解其他语言，例如 Ruby、Go、Python 等

[session 与 JWT](./session与JWT)

[Web API 设计](./RESTful)

[HTTP 协议](../HTTP/)

## 数据库

- [Mysql](./Mysql)

- [Postgresql](./Postgresql)

- [MongoDB](./MongoDB)

- [SQLite](./SQLite)

- [Redis](./Redis)

