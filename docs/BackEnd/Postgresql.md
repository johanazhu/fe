# Postgresql

## 前言

> 为了跨平台操作数据库，docker必须学

## 正文

首先，从 Docker Hub 拉取官方的 PostgreSQL 镜像。可以使用以下命令：

```bash
docker pull postgres
```

为了实现数据持久化，需要在宿主机上创建一个本地数据卷，并将其挂载到容器中。可以使用以下命令创建一个数据卷：

```bash
docker volume create pgdata
```

可以通过 `docker volume ls` 查看是否创建了 volume

使用 `docker run` 命令创建并运行 PostgreSQL 容器，并将之前创建的数据卷挂载到容器中。可以使用以下命令：

```bash
docker run --name pgsql -p 5432:5432 -e POSTGRES_PASSWORD=abc123 -v pgdata:/var/lib/postgresql/data -d postgres
```

- `--name pgsql`：容器的名称
- `-p 5432:5432`：容器的端口，这里不写默认为 5432
- `-e POSTGRES_PASSWORD=abc123`：环境变量POSTGRES_PASSWORD
- `-v pgdata:/var/lib/postgresql/data`：将容器中的data 与宿主机（本机）相关联（挂载到本机上）

进入容器中

```bash
docker exec -it pgsql bash
```



```bash
# 查看 postgres 版本
psql --version
# 进入 pgsql 容器中的 postgres 数据库中
psql -U postgres -W
# 创建 blog 数据库
CREATE DATABASE blog;
# 查看已经存在的数据库
\l
# \c + 数据库名 进入数据库
\c blog
```

以上步骤ok，说明我们的初始化是ok 的，此时不要关闭终端，

用 Navicat 连接 docker 启的 postgresql，并创建表格

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255) NOT NULL, -- 使用 VARCHAR 类型存储密码，并添加 NOT NULL 约束
    realname VARCHAR(50)
);
```

回到终端使用 `\d` 查看表格是否创建成功

```bash
blog=# \d
              List of relations
 Schema |     Name     |   Type   |  Owner   
--------+--------------+----------+----------
 public | users        | table    | postgres
 public | users_id_seq | sequence | postgres
(2 rows)
```

`\d tablename` 查看表格信息：

```bash
blog=# \d users
                                     Table "public.users"
  Column  |          Type          | Collation | Nullable |              Default              
----------+------------------------+-----------+----------+-----------------------------------
 id       | integer                |           | not null | nextval('users_id_seq'::regclass)
 username | character varying(50)  |           |          | 
 password | character varying(255) |           | not null | 
 realname | character varying(50)  |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
```

为了验证数据是否持久化，可以停止并删除容器，然后重新创建并启动一个新的容器。如果数据仍然存在，则说明数据持久化成功。

```bash
docker stop pgsql
docker rm pgsql
docker run --name pgsql -p 5432:5432 -e POSTGRES_PASSWORD=abc123 -v pgdata:/var/lib/postgresql/data -d postgres
```

> PS：`docker ps` 查看容器是否启动，虽然名字都为 pgsql，但是哈希值是不同的

接下来，可以刷新 Navicat 查看数据库是否能连接，并且是否有 blog 数据库；也可以进入容器中的 postgresql，用命令行查看数据是否还存在