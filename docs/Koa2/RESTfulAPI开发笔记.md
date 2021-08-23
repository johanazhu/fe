# 本项目为使用Node.js开发问答类网站的RESTful API接口实践

# 第一与第二部分为项目环境搭建等内容，略

# 3-2 安装搭建第一个 Koa 程序

```
npm init

npm i koa --save
```

新建 index.js

```
const Koa = require('koa')
const app = new Koa

app.use((ctx) => {
  ctx.body = 'Hello Koa!'
})

app.listen(8081)
```

运行

```
node index.js
```

为了方便，安装 nodemon

```
npm i nodemon --save-dev
```

表示在开发阶段安装.

安装完毕在 package.json 的 scripts 里面加入

```
  "scripts": {
    "start": "nodemon index.js"
  },
```

# 3-3 Koa 中间件与洋葱模型

在 Chrome 的 Console 写代码

```
fetch('//api.github.com/users').then(res => res.json()).then(json => {
  console.log(json)
})
```

这样很麻烦，使用 async await 语法

```
(async () => {
  const res = await fetch('//api.github.com/users')
  const json = await res.json()
  console.log(json)
})
```

使用 next async 语法，执行下一个中间件

```
const Koa = require('koa')
const app = new Koa

app.use(async (ctx, next) => {
  await next()
  console.log('1')
  ctx.body = 'Hello Zhihu API'
})
app.use(async (ctx) => {
  console.log('2')
})

app.listen(8081)
```

在 Chrome 里面使用 fetch 再试一次

```
fetch('/').then(res => res.text()).then(console.log)
```

# 4-1 路由

路由存在的意义

- 处理不同的URL
- 处理不同的HTTP方法
- 解析URL上的参数

# 4-2 自己编写 Koa 路由中间件

## 4.2.1 处理不同的URL

```
const Koa = require('koa')
const app = new Koa

app.use(async (ctx) => {
  if (ctx.url === '/') {
    ctx.body = '这是主页'
  } else if (ctx.url === '/users') {
    ctx.body = '这是用户列表页'
  } else {
    ctx.status = 404
  }
})

app.listen(8081)
```

## 4.2.2 处理不同的HTTP方法

```
const Koa = require('koa')
const app = new Koa

app.use(async (ctx) => {
  if (ctx.url === '/') {
    ctx.body = '这是主页'
  } else if (ctx.url === '/users') {
    if (ctx.method === 'GET') {
      ctx.body = '这是用户列表页'
    } else if (ctx.method === 'POST') {
      ctx.body = '创建用户'
    } else {
      ctx.status = 405
    }
  } else if (ctx.url.match(/\/users\/\w+/)) {
    const userId = ctx.url.match(/\/users\/(\w+)/)[1]
    ctx.body = `这是用户 ${userId}`
  } else {
    ctx.status = 405
  }
})

app.listen(8081)
```

# 4-3 使用 Koa-router 实现路由

安装 koa-router

```
npm i koa-router --save
```

```
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa
const router = new Router()
const usersRouter = new Router({
  prefix: '/users'
})

router.get('/', (ctx) => {
  ctx.body = '这是主页'
})

usersRouter.get('/', (ctx) => {
  ctx.body = '这是 router 实现的用户列表'
})

usersRouter.post('/', (ctx) => {
  ctx.body = '这是创建用户'
})

usersRouter.get('/:id', (ctx) => {
  ctx.body = `这是用户 ${ctx.params.id}`
})

app.use(router.routes())
app.use(usersRouter.routes())

app.listen(8081)
```

多中间件功能

```
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa
const router = new Router()
const usersRouter = new Router({
  prefix: '/users'
})

const auth = async (ctx, next) => {
  if (ctx.url !== '/users') {
    ctx.throw(401)
  }
  await next()
}

router.get('/', (ctx) => {
  ctx.body = '这是主页'
})

usersRouter.get('/', auth, (ctx) => {
  ctx.body = '这是 router 实现的用户列表'
})

usersRouter.post('/', auth, (ctx) => {
  ctx.body = '这是创建用户'
})

usersRouter.get('/:id', auth, (ctx) => {
  ctx.body = `这是用户 ${ctx.params.id}`
})

app.use(router.routes())
app.use(usersRouter.routes())

app.listen(8081)
```

# 4-4 HTTP option 方法的作用

> 1. 检测服务器所支持的请求方法
> 2. CORS中的预检请求

## 4.4.2 allowedMethods 的作用

1. 响应 option 方法，告诉它所支持的请求方法
2. 相应地返回405（不允许）和501（没实现）

# 4-5 RESTful API - 增删改查应该返回什么响应

- 实现增删改查
- 返回正确的响应

```
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa
const router = new Router()
const usersRouter = new Router({
  prefix: '/users'
})


router.get('/', (ctx) => {
  ctx.body = '这是主页'
})

usersRouter.get('/', (ctx) => {
  ctx.body = [{ name: '李雷' }, { name: '韩梅梅' }]
})

usersRouter.post('/', (ctx) => {
  ctx.body = { name: '李雷' }
})

usersRouter.get('/:id', (ctx) => {
  ctx.body = { name: '李雷' }
})

usersRouter.put('/:id', (ctx) => {
  ctx.body = { name: '李雷2' }
})

usersRouter.delete('/:id', (ctx) => {
  ctx.status = 204
})

app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen(8081)
```

# 5-1 控制器简介

## 5.1.1为什么要用控制器？

- 获取HTTP请求参数
- 处理业务逻辑
- 发送HTTP响应

### 5.1.1-1 获取HTTP请求参数

- Query String，如

> ?q=keyword

- Router Params， 如

> /users/:id

- Body，如

> { name:  "李雷" }

- Header，如

> Accept、Cookie

### 5.1.1-2 发送HTTP请求

- 发送 Status，如 200 400 等

- Body，如

> { name:  "李雷" }

- 发送Header，如

> Allow、Content-Type

### 5.1.1-3 编写控制器的最佳实践

- 每个资源的控制器放在不同的文件里
- 金陵使用类+类方法的形式编写控制器

- 严谨的错误处理

# 5-2 获取HTTP请求参数

安装解析请求体的中间件

```
npm i koa-bodyparser --save
```

```
const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const app = new Koa
const router = new Router()
const usersRouter = new Router({
  prefix: '/users'
})


router.get('/', (ctx) => {
  ctx.body = '这是主页'
})

usersRouter.get('/', (ctx) => {
  ctx.body = [{ name: '李雷' }, { name: '韩梅梅' }]
})

usersRouter.post('/', (ctx) => {
  ctx.body = { name: '李雷' }
})

usersRouter.get('/:id', (ctx) => {
  ctx.body = { name: '李雷' }
})

usersRouter.put('/:id', (ctx) => {
  ctx.body = { name: '李雷2' }
})

usersRouter.delete('/:id', (ctx) => {
  ctx.status = 204
})

app.use(bodyparser())
app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen(8081)
```

# 5-3 发送HTTP响应

操作步骤：

> - 发送 status
> - 发送body
> - 增删改查

```
const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const app = new Koa
const router = new Router()
const usersRouter = new Router({
  prefix: '/users'
})

const db = [{ name:"李雷" }]


router.get('/', (ctx) => {
  ctx.body = '这是主页'
})

usersRouter.get('/', (ctx) => {
  // ctx.set('Allow', 'GET, POST')
  // ctx.body = [{ name: '李雷' }, { name: '韩梅梅' }]
  ctx.body = db
})

usersRouter.post('/', (ctx) => {
  db.push(ctx.request.body)
  ctx.body = ctx.request.body
})

usersRouter.get('/:id', (ctx) => {
  ctx.body = db[ctx.params.id * 1]
})

usersRouter.put('/:id', (ctx) => {
  db[ctx.params.id * 1] = ctx.request.body
  ctx.body = ctx.request.body
})

usersRouter.delete('/:id', (ctx) => {
  db.splice(ctx.params.id * 1, 1)
  ctx.status = 204
})

app.use(bodyparser())
app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen(8081)
```

# 5-4 更合理的目录结构

- 将路由单独放在一个目录
- 将控制器单独放在一个目录
- 使用 类+方法 的方式组织控制器

添加自动化脚本，批量注册。

```
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new Koa

const routing = require('/routes')

app.use(bodyparser())
routing(app)

app.listen(8081)
```

# 6-1 错误处理简介

# 6-2 Koa自带的错误处理

- 制造 404、412、500三种错误
- 了解Koa自带的错误处理做了什么

# 6-3 自己编写错误处理中间件

# 6-4 使用 Koa-json-error 进行错误处理

安装 koa-json-error

```
npm i koa-json-error --save
```

Windows营造生产环境：

```
npm i cross-env --save-dev
```

修改 package.json

```
"scripts": {
  "start": "cross-env NODE_ENV=production node app",
  "dev": "nodemon app
},
```

修改配置使其在生产环境下禁用错误堆栈的返回

# 6-5 使用koa-parameter校验参数

安装 koa-parameter

```
npm i koa-parameter --save
```

app\controllers\users.js

```
const db = [{
  name: "李雷"
}]

class UsersCtl {
  find(ctx) {
    ctx.body = db
  }
  
  findById(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412)
    }
    ctx.body = db[ctx.params.id * 1]
  }
  
  create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      age: { type: 'number', required: false }
    })
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }
  
  update(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412)
    }
    ctx.verifyParams({
      name: { type: 'string', required: true },
      age: { type: 'number', required: false }
    })
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }
  
  delete(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412)
    }
    db.splice(ctx.params.id * 1, 1)
    ctx.status = 204
  }
}

module.exports = new UsersCtl()
```

# 7-3 云数据库 MongoDB Atlas

# 7-4 用 Mongoose 连接 MongoDB

安装 Mongoose

```
npm i mongoose --save
```

# 7-5 设计用户模块的 Schema

- 分析用户模块的属性
- 编写用户模块的 Schema
- 使用 Schema 生成用户 Model

app下新建models文件夹

app\models\users.js

```
const mongoose = require('mongoose')

const {
  Schema,
  model,
} = mongoose

const userScema = new Schema({
  name: {
    type: String,
    required: true
  },
})

module.exports = model('User', userScema)
```

```
model('User', userScema)

"User"即为MongoDB里面存储集合的名字
```

# 7-6 用 MongoDB 实现用户的增删改查

- 用 Mongoose 实现增删改查接口
- 用 Postman 测试增删改查接口

## 警告：此节开始出现插入无效！！！

# 8-1 Session简介

## Session的优势

- 相比 JWT，最大的优势在于可以主动清除Session
- session保存在服务器端，相对较为安全
- 结合 cookie 使用，较为灵活，兼容性较好

## Session的劣势

- cookie + session 在跨域场景表现并不好
- 如果是分布式部署，需要做多机共享 session 机制
- 基于 cookie 的机制很容易被 CSRF
- 查询 session 信息可能会有数据库查询操作

# 8-2 JWT简介

## 什么是JWT

- JSON Web Token 是一个开放标准(RFC 7519)
- 定义了一个紧凑且相对独立的方式，可以将各方之间的信息作为JSON对象进行安全传输
- 该信息可以验证和信任，因为啥经过数字签名的

## JWT的构成

### 头部（Header）

- typ：token的类型，这里固定位JWT
- alg：使用的hash算法，例如：HMAC SHA256 或者RSA

### Payload（有效载荷）

- 存储需要传递的信息，如用户ID 用户名等
- 包含元数据，如过期时间、发布人等
- 与Header不同 Payload可以加密

### Signature（签名）

- 对Header和Payload部分进行签名
- 保证Token在传输的过程中没有被篡改或者损坏

# 8-4 在 Node.js 中使用 JWT

安装 jsonwebtoken

```
npm i jsonwebtoken
```

# 8-5 实现用户注册

#10-2 个人资料的 Schema 设计

# 10-3 个人资料的参数校验

# 10-4 RESTful-API 最佳实践——字段过滤

- 设计 Schema 默认隐蔽部分字段
- 通过查询字符串显示隐藏字段

# 11-1 关注与分析需求分析

- 关注、取消关注
- 获取关注人、粉丝列表（用户-用户多对多关系）

# 11-2 关注与粉丝的 Schema 设计

- 关注与粉丝的数据结构（也就是一个列表）
- 设计关注与粉丝 schema（关注可以设置为属性，列表）

```
app\models\users.js

...
  following: {
    type:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false
  },
```

# 11-3 -4 RESTful风格的关注与粉丝接口

- 实现获取关注人和粉丝列表接口
- 实现关注和取消关注接口
- 使用 Postman 测试

```
app\controllers\users.js

const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const { secret } = require('../config')


class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }

  async findById(ctx) {
    const { fields } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    const user = await User.findById(ctx.params.id).select(selectFields)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }

  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true,
      },
    })
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) { ctx.throw(409, '已经存在该用户')}
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }

  async checkOwner(ctx, next) {
    if (ctx.params.id != ctx.state.user._id) {
      ctx.throw(403, '授权错误，没有权限')
    }
    await next()
  }

  async update(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: false
      },
      password: {
        type: 'string',
        required: false,
      },
      avatar_url: {
        type: 'string',
        required: false,
      },
      gender: {
        type: 'string',
        required: false,
      },
      headline: {
        type: 'string',
        required: false,
      },
      locations: {
        type: 'array',
        itemType: 'string',
        required: false,
      },
      business: {
        type: 'string',
        required: false,
      },
      employments: {
        type: 'array',
        itemType: 'object',
        required: false,
      },
      educations: {
        type: 'array',
        itemType: 'object',
        required: false,
      },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
  }

  async login(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true,
      },
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw('401', '用户名或密码不正确')
    }
    const { _id, name } = user
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
    ctx.body = { token }
  }

  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following')
    if  (!user) {
      ctx.throw(404)
    }
    ctx.body = user.following
  }

  async listFollowers(ctx) {
    const users = await User.find({ following: ctx.params.id })
    ctx.body = users
  }

  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    if(!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id)
      me.save()
    } 
    ctx.status = 204
  }

  async unfollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
    if(index > -1) {
      me.following.splice(index, 1)
      me.save()
    } 
    ctx.status = 204
  }
}

module.exports = new UsersCtl()
```

```
app\routes\users.js

const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const { find, findById, create, update, 
  delete:del, login, checkOwner, listFollowing, listFollowers, follow, unfollow, } = require('../controllers/users')

const { secret } = require('../config')

const auth = jwt({ secret }) 

router.get('/', find)

router.post('/', create)

router.get('/:id', findById)

router.patch('/:id', auth, checkOwner, update)

router.delete('/:id', auth, checkOwner, del)

router.post('/login', login)

router.get('/:id/following', listFollowing)

router.get('/:id/followers', listFollowers)

router.put('/following/:id', auth, follow)

router.delete('/following/:id', auth, unfollow)

module.exports = router

```

# 11-5 编写校验用户存在与否的中间件

```
app\controllers\users,js

# 加在 follow(ctx) 之前校验
...
  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    await next()
  }
  
  async follow(ctx) { ... }
```

# 12-1 话题模块需求分析

## 话题模块功能点

- 话题的增改查
- 分页、模糊搜索
- 用户属性中的话题引用

- 关注 / 取消关注话题、用户关注的话题列表

# 12-2-3 RESTful风格的话题增改查接口

- 设计话题 Schema
- 实现 RESTful 风格的增改查接口

# 12-4 RESTful-API 分页

- 实现分页逻辑
- 使用 Postman 测试

# 12-5 RESTful-API 模糊搜索

使用 正则表达式来匹配模糊字段

```
app\controller\topics.js

...
class TopicsCtl {
  async find(ctx) {
    const { per_page = 3 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    ctx.body = await Topic
    .find({ name: new RegExp(ctx.query.q) })
    .limit(perPage).skip(page * perPage)
  }
}
```

# 12-6 用户属性中的话题引用

### 使用话题引用替代部分用户属性

```
app\model\users.js

const mongoose = require('mongoose')

const {
  Schema,
  model,
} = mongoose

const userScema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar_url: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
    required: true,
  },
  headline: {
    type: String,
  },
  locations: {
    type: [{
      type: Schema.Types.ObjectId, ref: 'Topic',
    }],
    select: false,
  },
  business: {
    type: Schema.Types.ObjectId, ref: 'Topic',
    select: false,
  },
  employments: {
    type: [{
      company: {
        type: Schema.Types.ObjectId, ref: 'Topic'
      },
      job: {
        type: Schema.Types.ObjectId, ref: 'Topic'
      },
    }],
    select: false,
  },
  educations: {
    type: [{
      school: {
        type: Schema.Types.ObjectId, ref: 'Topic'
      },
      major: {
        type: Schema.Types.ObjectId, ref: 'Topic'
      },
      diploms: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
      },
      entrance_year: {
        type: Number,
      },
      graduation_year: {
        type: Number,
      }
    }],
    select: false,
  },
  following: {
    type:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false
  },
})

module.exports = model('User', userScema)
```

```
app\controllers\users.js

const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const { secret } = require('../config')


class UsersCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    ctx.body = await User
    .find({ name: new RegExp(ctx.query.q) })
    .limit(perPage).skip(page * perPage)
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    const populateStr = fields.split(';').filter(f => f).map(f => {
      if (f === 'employments') {
        return 'employments.company employments.job'
      }
      if (f === 'educations') {
        return 'employments.company employments.job'
      }
      return f
    }).join(' ')
    const user = await User.findById(ctx.params.id).select(selectFields)
    .populate('following locations business employments.company employments.job educations.school educations.major')
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }

  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true,
      },
    })
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) { ctx.throw(409, '已经存在该用户')}
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }

  async checkOwner(ctx, next) {
    if (ctx.params.id != ctx.state.user._id) {
      ctx.throw(403, '授权错误，没有权限')
    }
    await next()
  }

  async update(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: false
      },
      password: {
        type: 'string',
        required: false,
      },
      avatar_url: {
        type: 'string',
        required: false,
      },
      gender: {
        type: 'string',
        required: false,
      },
      headline: {
        type: 'string',
        required: false,
      },
      locations: {
        type: 'array',
        itemType: 'string',
        required: false,
      },
      business: {
        type: 'string',
        required: false,
      },
      employments: {
        type: 'array',
        itemType: 'object',
        required: false,
      },
      educations: {
        type: 'array',
        itemType: 'object',
        required: false,
      },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.status = 204;
  }

  async login(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true,
      },
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw('401', '用户名或密码不正确')
    }
    const { _id, name } = user
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
    ctx.body = { token }
  }

  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following')
    if  (!user) {
      ctx.throw(404)
    }
    ctx.body = user.following
  }

  async listFollowers(ctx) {
    const users = await User.find({ following: ctx.params.id })
    ctx.body = users
  }

  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    await next()
  }

  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    if(!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id)
      me.save()
    } 
    ctx.status = 204
  }

  async unfollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
    if(index > -1) {
      me.following.splice(index, 1)
      me.save()
    } 
    ctx.status = 204
  }
}

module.exports = new UsersCtl()
```

# 12-7 RESTful 风格的关注话题接口（上）

- 实现关注话题逻辑（用户-话题多对多关系）

# 13-1 问题模块需求分析

- 问题的CRUD
- 用户的问题列表（用户-问题 一对多关系）
- 话题的问题列表+问题的话题列表（话题-问题多对多关系）
- 关注 / 取消关注问题

# 13-2 用户-问题 一对多关系设计与实践

- 实现增删改查接口

- 实现用户的问题列表接口

- 使用 Postman 测试

# 13-3 话题-问题 多对多关系设计与实践

- 实现问题的话题列表接口
- 实现话题的问题列表接口
- 使用 Postman 测试

# 14-1-2 问题-答案模块耳机嵌套的增删改查接口

- 设计数据库 Schema
- 实现增删改查接口
- 使用 Postman 测试

# 14-3 互斥关系赞踩答案接口设计与实现

- 设计数据库 Schema
- 使用 Postman 测试

# 15-1-2-3 评论模块需求分析

- 评论的增删改查
- 答案-评论 / 问题-评论 / 用户-评论 一对多
- 一级评论与二级评论
- 赞 / 踩 评论

# 15-4 添加时间

# 16 在服务器运行该接口

- 在服务器安装 Git 与 Node.js
- 用 Nginx 实现端口转发
- 使用 PM2 管理进度