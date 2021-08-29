# Mysql



## [mysql安装步骤](https://zhuanlan.zhihu.com/p/37152572)



## mysql介绍

- web server 中最流行的关系型数据库
- 官网可免费下载，用于学习
- 轻量级，易学易用



## 命令行

| 命令                                                         | 说明                                          |
| ------------------------------------------------------------ | --------------------------------------------- |
| show databases                                               | 显示所有的数据库表                            |
| create database blog                                         | 创建数据库                                    |
| use blog                                                     | 使用数据库                                    |
| show tables                                                  | 显示数据库中所有表                            |
| show columns from customers                                  | 查看表结构                                    |
| drop database blog                                           | 删除数据库                                    |
| mysqldump -h localhost -u root -p blog > D:\blog.sql         | 导出数据库 blog 的结构和数据                  |
| mysqldump -h localhost -u root -p blog -d> D:\blog_stru.sql  | 导出数据库 blog 的结构（加-d参数）            |
| mysqldump -h localhost -u root -p blog customers > D:\customers.sql | 导出数据库 blog 中的 customers 表的结构和数据 |
| mysql -h localhost -u root -p blog < D:\blog.sql             | 向数据库 blog 导入数据库文件 blog.sql         |



## 操作数据库

- 建库

- 建表

- 表操作

### 操作表

**增、删、改、查**

使用sql语句（入门简单，一学就会）



#### 增

```mysql
insert into users(username, `password`, realname) values('lisi', '123', '李四')
```

#### 查

查users表所有信息

```mysql
select * from users;
```

查users表中其中id和username的信息

```mysql
select id, username from users;
```

查符合条件的项 where

```mysql
select * from users where username='zhangsan'
```

查符合条件的项多个条件 `and` 和 `or`

```mysql
select * from users where username='zhangsan' and realname='111'
```

模糊查询 `like`

```mysql
select * from users where username like '%zhang%'
```

查 排序 `order by id` 默认正序，如果倒序 在id后加 desc `order by id desc`

```mysql
select * from users where username like '%zhang%' order by id desc;
```

ps：一般不用 * ，耗性能

#### 改

更新 id为3的realname为张三

```mysql
update users set realname='张三' where id='3'
```

#### 删

```mysql
delete from users where realname='李四'
```

但一般来说不用delete，二是在users表中加一个状态，通过状态来判断他是否被删除。这种技术又称软删除



PS:如果你的更新和删除出现 error：1175处于安全模式，先使用以下代码解除安全模式

```mysql
SET SQL_SAFE_UPDATES=0;
```









