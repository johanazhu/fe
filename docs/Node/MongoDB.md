# MongoDB

## 什么是 MongoDB

-   MongoDB 是一个基于分布式文件存储的开源数据库系统

-   MongoDB 将数据存储为一个文档，数据结构由键值（key=>value）对组成。MongoDB 文档类似于 JSON 兑现。字段值可以包含其他文档，数组及文档数组

## MongoDB 基本概念

-   **数据库** MongoDB 的单个实例可以容纳多个独立的数据库，比如一个学生管理系统就可以对应一个数据库实例
-   **集合** 数据库是由集合组成，一个集合用来表示一个实体，如学生集合
-   **文档** 集合是由文档组成，一个文档表示一条**记录**，比如一位同学

MongoDB 与 Mysql 的区别

| Mongodb                              | Mysql              |
| ------------------------------------ | ------------------ |
| 文档（document）（单个文档最大 16M） | 记录（row）        |
| 集合（collection）                   | 表（table）        |
| 数据库（database）                   | 数据库（database） |

### 数据库操作

#### 使用数据库

```shell
use database_name
```

-   database_name 代表数据库的名字
-   注：如果此数据库存在，则切换到此数据库下，如果此数据库不存在也可以切过来，但是并不能立刻创建数据库

切换到 scholl 数据库下

```shell
use scholl 
```

#### 查看所有数据库

```shell
show dbs
```

-   备注：我们刚创建的数据库 `school` 如果不在列表内，要显示它，我们需要向 `school` 数据库插入一些数据

```shell
db.students.insert({name: 'johan', age: 18})
```

#### 查看当前使用的数据库

```shell
db
```

-   注：db 代表的是当前数据库 也就是 school 数据库

#### 删除数据库

```shell
db.dropDatabase()
```

### 集合操作

#### 查找集合帮助

```shell
db.students.help()
```

### 插入文档

#### insert

```shell
db.student.insert({name: "elaine", age: 20})
```

#### save

保存

```shell
db.student.save({name: "elaine", age: 20})
```

### 什么是 Mongoose

-   Mongoose 是 MongoDB 的一个对象模型工具

-   同时它也是针对 MongoDB 操作的一个对象模型库，封装了 MongoDB 对文档的一些增删改查等常用方法

## 使用 monggose

### 安装 mongoose

```shell
cnpm i mongoose -S
```

### 使用 mongoose

```javascript
const mongoose = require('mongoose');
// const db = mongoose.connect("mongodb://user:pass@ip:port/database")

mongoose.connect('mongodb://localhost:27017/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connection.on('open', () => {
    console.log('Mongoose连接成功');
});
```

### Schema

Schema 是数据库集合的模型骨架 定义了集合中的字段的名称和类型以及默认值信息

#### Schema.Type

NodeJS 中的基本数据类型都属于 Schema.Type 另外 Mongoose 还定义了自己的类型

基本属性类型有：

-   String
-   Number
-   Date
-   Boolean
-   数组
-   nul
-   内嵌文档

#### 定义 Schema

```javascript
const personSchema = new Schema({
    name: { Type: String },
    binary: { Type: Buffer },
    living: { Type: Boolean },
    birthday: { Type: Date },
    age: { Type: Number },
    _id: Schema.Types.ObjectId, // 主键
    _fk: Schema.Types.ObjectId, // 外键
    array: { Type: [] }, // 不确定
});
```

#### Model

Model 是由通过 Schema 构造而成 除了具有 Schema 定义的数据库骨架以外，还可以操作数据库。如何通过 Schema 来创建 Modal，如下：

```javascript
let User = mongoose.model('User', schema);
```

### 数据库图形化工具

[Robo 3T（推荐）](https://robomongo.org/download)（免费）

[Studio 3T](https://robomongo.org/)（付费）

NoSQLBooster for MongoDB
