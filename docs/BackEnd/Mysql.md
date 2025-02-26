# Mysql



## 介绍

-   关系型数据库管理系统（RDBMS），它使用结构化查询语言（SQL）进行数据库的管理和操作
-   Mysql 的教程最多，最容易入门
-   学会 Mysql 后，学 Postgresql、SQLite 什么的都能很容易入门
-   数据库可以理解为 Excel，它有表和记录组成，存储在硬盘中，我们操作数据库就是对其读和写

## 安装步骤

如果是 Window 电脑的话，可以参考这篇文章——[超级详细的mysql数据库安装指南](https://zhuanlan.zhihu.com/p/37152572)

如果是 Linux/Mac 电脑的话，可以参考这篇文章——[如何使用二进制文件离线安装 Mysql](./如何使用二进制文件离线安装Mysql)

当然，还可以通过 docker 起 mysql 服务，再通过 mysql 客户端连接

## 连接数据库

安装完 mysql ，再启动 mysql-server ，就相当于在后台进程中启动了一个 mysql 服务，我们可以通过命令行连接这台 mysql 服务（就是以客户端的形式连接 mysql 服务）

登录 mysql

```bash
mysql -u root -p
```

本地登录 mysql

```bash
mysql -u root -p -h IP地址
```

修改密码（MySQL 8.0 之后）：

```bash
ALTER USER 'username'@'localhost' IDENTIFIED BY 'newpassword';
```



## 数据库操作

简单来说，就是三个操作：**操作数据库、操作数据表、操作数据记录（行）**

### 操作数据库

```sql
-- 1.创建数据库（在磁盘上创建一个对应的文件夹）
	create database [if not exists] db_name [character set xxx]

-- 2.查看数据库
	show databases; -- 查看所有数据库
	SHOW DATAASES LIKE '%test%'; -- 查看名字中包括 test 的数据库
	show create database db_name; -- 查看数据库的创建方式

-- 3.修改数据库
    alter database db_name [character set xxx] 

-- 4.删除数据库
    drop database [if exists] db_name;
    
-- 5.使用数据库
    use db_name; -- 切换数据库  注意：进入到某个数据库后没办法再退回之前状态，但可以通过use进行切换
    select database(); --  查看当前使用的数据库
```

> 使用 DROP DATABASE 命令时要非常谨慎，在执行该命令后，MySQL 不会给出任何提示确认信息。DROP DATABASE 删除数据库后，数据库中存储的所有数据表和数据也将一同被删除，而且不能恢复。因此最好在删除数据库之前先将数据库进行备份。



### 数据表操作

每个数据库都由若干个数据表组成。比如一个文件夹有若干excel文件。这里的文件夹就相当于数据库，excel文件就相当于数据表

#### 创建数据表

```sql
-- 语法
CREATE TABLE tab_name(
            field1 type [约束条件],
            field2 type,
            ...
            fieldn type    -- 一定不要加逗号，否则报错！
        )[character set utf8];
```

例如：

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) VISIBLE,
    password VARCHAR(255) NOT NULL, -- 使用 VARCHAR 类型存储密码，并添加 NOT NULL 约束
    realname VARCHAR(50) VISIBLE
);

CREATE TABLE product (
    id AUTO_INCREMENT PRIMARY KEY, 				-- 作为主键，且自增长
    name VARCHAR(255) NOT NULL, 				-- name 不为空
    slug VARCHAR(255) UNIQUE NOT NULL,			-- slug 唯一且不为空
    "order" INT DEFAULT -1,						-- order 整数类型，默认为 -1
    categoryId INT REFERENCES category(id),		-- 分类ID 整数类型，引入 category 表外键
    tags INT[],  								-- 标签，数组类型，数组中的值为整数
    featured BOOLEAN DEFAULT FALSE,				-- 是否精品，布尔类型，默认不是
    visible BOOLEAN DEFAULT TRUE,				-- 是否课件，布尔类型，默认可见
    website VARCHAR(255),						-- 网站，VARCHAR类型
    github VARCHAR(255),						-- github 地址，VARCHAR类型
    priceLink VARCHAR(255),						-- 价格链接，VARCHAR类型
    price VARCHAR(255),							-- 价格
    source VARCHAR(255),						-- 来源
    submitterId INT REFERENCES "user"(id),		-- 提交者，整数类型，外键 user
    desc JSON,									-- 描述，JSON 格式，存储更多文本
    content JSON,								-- 内容，JSON 格式，存储更多文本
    logo BLOB,									-- logo,BLOB 类型，存储二进制数据
    coverImage BLOB,							-- 封面图片，BLOB 类型，存储二进制数据
    guides INT[],  								-- 假设使用数组存储多个 guide 的引用
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP	-- 日期，时间戳类型 
);
```

> 注意，Mysql 没有专门的 BOOLEAN 类型，但却可以将 BOOLEAN 作为类型，因为 BOOLEAN 是 MYSQL 中 TINYINT(1) 的别名。虽然写的是 BOOLEAN 定义列，但实际上底层存储仍然是 TINYINT(1)
>
> ```sql
> featured BOOLEAN DEFAULT FALSE -- 等价于下面写法
> featured TINYINT(1) DEFAULT FALSE -- TURE 对应 1，FALSE 对应 0
> ```

这就就要说到 Mysql 的数据类型和数据约束，详细的数据类型我们[放在单独的表](./Mysql数据类型明细表)中来查询和熟悉，这里我们挑重点来讲解

#### 重点数据类型

- 整数：INT
- 小数：DECIMAL(M,D)
- 字符串：VARCHAR(M)、TEXT
- 日期时间：TIMESTAMP
- 枚举类型：ENUM

#### 数据约束

约束是指数据在数据类型限定的基础上额外增加的要求

常见的约束如下：

- 主键：PRIMARY KEY
- 非空：NOT NULL
- 唯一：UNIQUE
- 默认：DEFAULT
- 外键：FOREIGN KEY

#### 查看数据表

```sql
desc user; -- 查看表结构，等同于 show columns from tab_name
desc product;

show tables -- 查看当前数据库中的所有表
show create table tab_name -- 查看当前数据库表
```













### 表记录操作

这点是最重要的，我们需要针对每一条记录，进行 **增、删、改、查**

#### 增（添加记录）

```sql
INSERT INTO users (id, username, password, realname)VALUES (1, 'lisi', 'password123', '李四');INSERT INTO users (id, username, password, realname)VALUES (2, 'zhangsan', 'password123', '张三');
```

#### 查（查询记录）

查 users 表所有信息

```sql
select * from users;
```

查 users 表中其中 id 和 username 的信息

```sql
select id, username from users;
```

查符合条件的项 where

```sql
select * from users where username='zhangsan'
```

查符合条件的项多个条件 `and` 和 `or`

```sql
select * from users where username='zhangsan' and realname='111'
```

模糊查询 `like`

```sql
select * from users where username like '%zhang%'
```

查 排序 `order by id` 默认正序，如果倒序 在 id 后加 desc `order by id desc`

```sql
select * from users where username like '%zhang%' order by id desc;
```

> ps：一般不用 \* ，耗性能

#### 改（更新记录）

更新 id 为 3 的 realname 为张三

```sql
update users set realname='张三' where id='3'
```

#### 删（删除记录）

```sql
delete from users where realname='李四'
```

但一般来说不用 delete，二是在 users 表中加一个状态，通过状态来判断他是否被删除。这种技术又称软删除

> PS：如果你的更新和删除出现 error：1175 处于安全模式，先使用以下代码解除安全模式

```sql
SET SQL_SAFE_UPDATES=0;
```



## 表的关联关系



## 索引设计

为了提高查询效率，可以在经常用于搜索和排序的字段上创建索引。



## 数据安全与备份

确保数据库的安全性，包括设置适当的访问权限、定期备份数据等。

- `mysqldump -h localhost -u root -p blog > D:\blog.sql`：导出数据库 blog 的结构和数据
- `mysqldump -h localhost -u root -p blog -d > D:\blog_stru.sql`：导出数据库 blog 的结构（加-d 参数）
- `mysqldump -h localhost -u root -p blog customers > D:\customers.sql`：导出数据库 blog 中的 customers 表的结构和数据
- `mysql -h localhost -u root -p blog < D:\blog.sql`：向数据库 blog 导入数据库文件 `blog.sql`



## 其他

### 数据库图形化工具

SQLyog、Navicat Lite这两个我都有用





## 参考资料

- [Mysql基础](http://www.yuan316.com/post/Mysql%E5%9F%BA%E7%A1%80/)
- [SQL 基础扫盲](https://april-cl.github.io/2024/06/08/sql-ji-chu-sao-mang/)
- [Python进阶之数据库](https://www.yuque.com/gengdiniu/vt4aq6/btdhzr#gJrVa)