# Mysql



## 介绍

-   web server 中最流行的关系型数据库
-   官网可免费下载，用于学习
-   轻量级，易学易用

## 安装步骤

可看这篇——[超级详细的mysql数据库安装指南](https://zhuanlan.zhihu.com/p/37152572)

## 数据库图形化工具

SQLyog、Navicat 这两个我都有用

## 常见命令行

登录mysql

```shell
mysql -u root -p
```

本地登录mysql

```shell
mysql -u root -p -h IP地址
```



## 命令行操作数据库

- `show databases;`：显示所有的数据库表
- `create database blog;`：创建数据库
- `use blog;`：使用数据库
- `show tables;`：显示数据库中所有表
- `show columns from customers;`：查看表结构
- `drop database blog;`：删除数据库
- `mysqldump -h localhost -u root -p blog > D:\blog.sql`：导出数据库 blog 的结构和数据
- `mysqldump -h localhost -u root -p blog -d> D:\blog_stru.sql`：导出数据库 blog 的结构（加-d 参数）
- `mysqldump -h localhost -u root -p blog customers > D:\customers.sql`：导出数据库 blog 中的 customers 表的结构和数据
- `mysql -h localhost -u root -p blog < D:\blog.sql`：向数据库 blog 导入数据库文件 blog.sql

> MySQL命令终止符为分号 **;** 。

## 数据库操作

简单来说，就是三个操作：建库、建表、操作表

建库：`create database blog;`

建表：`create table users;`

### 操作表

学会 增、删、改、查 即可

#### 增

```mysql
insert into users(username, `password`, realname) values('lisi', '123', '李四')
```

#### 查

查 users 表所有信息

```mysql
select * from users;
```

查 users 表中其中 id 和 username 的信息

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

查 排序 `order by id` 默认正序，如果倒序 在 id 后加 desc `order by id desc`

```mysql
select * from users where username like '%zhang%' order by id desc;
```

> ps：一般不用 \* ，耗性能
>

#### 改

更新 id 为 3 的 realname 为张三

```mysql
update users set realname='张三' where id='3'
```

#### 删

```mysql
delete from users where realname='李四'
```

但一般来说不用 delete，二是在 users 表中加一个状态，通过状态来判断他是否被删除。这种技术又称软删除

> PS：如果你的更新和删除出现 error：1175 处于安全模式，先使用以下代码解除安全模式
>

```mysql
SET SQL_SAFE_UPDATES=0;
```



## 常见问题

### 1. mysql控制台 show databases不显示结果的原因

语句少了分号'；'，`show datbases;`

### 2. 连接远程数据库

```shell
mysql -h ip <数据库名> -u 用户名 -p
```

例如：`mysql -h 47.102.152.19 -u root -p `

连接远程数据库会报错：ERROR 2003 (HY000): Can't connect to MySQL server on 'X.X.X.X' (10060)

解决方案：[ERROR 2003 (HY000): Can't connect to MySQL server on 'X.X.X.X' (10060)](https://blog.csdn.net/weixin_41287260/article/details/102802238)

> 1.阿里云服务器的安全组是否开放3306端口
>
> 2./etc/mysql/my.cnf 文件中的bind-address 设置为 0.0.0.0
>
> 3.将host设置为%表示任何ip都能连接mysql
>
> 4.防火墙问题，具体可以看这篇文章——[防火墙知一二](../Linux/防火墙知一二.md)

