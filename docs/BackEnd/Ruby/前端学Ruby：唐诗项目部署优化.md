# 前端学 Ruby：唐诗项目部署优化

## 前言

本篇文章和 Ruby 关系不大，只是涉及到部署问题

前文花了不少时间从零到部署唐诗项目，当时因为篇幅问题留下了不少的坑

例如可以采用 docker-compose 来代替两个容器互相访问、使用 shell 命令在本地部署，本文并未对其进行改造，因为传统部署 Ruby on Rails 的弊端很明显，需要运维经验。为快速部署 Rails 引用，笔者寻觅到了 fly.io。本文将在唐诗项目基础上将其部署到 fly.io 上



## 回顾唐诗 API

- 随机出现一首诗：/poetry/random
- 用诗的题目查询：/poetry/title/静夜思
- 列出这个诗人的所有诗：/poetry/author/李白
- 列出这个诗人的这首诗：/poetry/author/张若虚/title/春江花月夜



## 如何启动

先将项目中的 `tangpoetry.sql` 导入到 postgresql 数据库。可以使用 pgAdmin 也可以使用命令行 psql 导入数据

再 `rails s` 启动项目

检查本地启动没问题后，开始部署项目

## 部署项目

官方 [Rails 部署教程](https://fly.io/docs/rails/getting-started/) 已经写的很清楚了，可以按照上面的做一遍练练手

这里我们按照[亲身体验 Fly.io](https://fly.io/docs/hands-on/) 来手把手体验 Fly.io

### 安装 flyctl

安装方式可以参考官方文档：https://fly.io/docs/hands-on/install-flyctl/

因为笔者是 window，可运行以下命令安装

```bash
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
# 或者
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

如果执行 `flyctl version` 不报错，就说明安装成功了

```bash
flyctl version
# flyctl.exe v0.1.32 windows/amd64 
```

### 注册 fly.io

如果这是您第一次使用 Fly.io，则需要注册一个帐户

```bash
fly auth signup
```

注册完之后，登录 fly.io

### 登录 fly.io

如果您已经拥有 Fly.io 帐户，则只需使用 flyctl 登录即可

```
fly auth login
```

### 启动应用程序

先进入我们的 tangpoetry API 项目，在命令行中敲入：

```bash
fly launch # 创建我们的应用
```

命令行会提示几个问题：

```bash
Creating app in D:\workspace\ruby\tangpoetry
Scanning source code
Detected a Rails app
? Choose an app name (leave blank to generate one): 
? Choose a region for deployment: Hong Kong, Hong Kong (hkg)
? Would you like to set up a Postgresql database now? Yes
? Select configuration: Development - Single node, 1x shared CPU, 256MB RAM, 1GB disk
? Would you like to set up an Upstash Redis database now? No
? Create .dockerignore from 1 .gitignore files? No
```

这里的 app name 将来会是项目的名字，具有唯一性。后面是否创建 postgresql 数据库，笔者直接选择创建数据库，fly.io 创建完数据库后，给在界面上给出数据库的用户名密码等信息。Redis 不需要不用部署

当命令执行完毕，fly 会创建`fly.toml` 和 `Dockerfile` 等文件

![fly launch完成](https://s2.loli.net/2023/06/09/gTqBkGl8ZNIMHXJ.png)

我们不着急部署，先将数据库导入

### 数据库导入

上一步在执行的时候已经帮我们创建了数据库，文档里已经描述了[如何连接 fly postgres](https://fly.io/docs/postgres/connecting/)，这里有个坑，比如起初用`psql postgres://{username}:{password}@{hostname}:{port}/{database}?options` 这种方式连接fly 数据库时就是连接不通。因为 fly.io 做过限制，Fly Postgres 的数据库是内部网络，**默认情况下是不会公开**，所以是连接不上的。我们可以分配 ip 地址，但是这个需要钱，一个月2美元

当你想分配公共的 ip 地址时：

```bash
fly ips allocate-v4 --app <pg-app-name>
# Looks like you're accessing a paid feature. Dedicated IPv4 addresses now cost $2/mo. Are you ok with this?
```

所以用外部连接的方式行不通，笔者这里采用的是[`fly proxy`](https://fly.io/docs/flyctl/proxy/) 将服务器端口转发到本地服务上

唐诗项目的执行如下：

```bash
fly proxy 5433 -a tangpoetry-db
```

> 因为本地已经开了 5432 的端口，故用 5433 代替
>
> 转发的终端就开着，另起一个终端来进行之后的命令

再通过 psql 连接就能通了

```bash
psql "postgres://postgres:<password>@localhost:5433"
```

将根目录中的 `tangpoetry.sql` 导入到 fly postgres 数据库中，查看有数据后，我们进入 `config/database.yml` ，修改 production 的配置

```yml
production:
  <<: *default
  database: postgres
  username: postgres
  password: <%= ENV["DB_PASSWORD"] %>
  host: <%= ENV["DB_HOST"] %>
```

将数据库密码和主机写进 fly secrets 中

```bash
flyctl secrets set DB_PASSWORD=DB_PASSWORD
flyctl secrets set DB_PASSWORD=DB_HOST
```



### 部署

```bash
fly deploy # 部署
```

笔者这里没有用默认的 Dockerfile，因为就是跑不通，后来自己写了个 Dockerfile 才部署成功

访问：https://tangpoetry.fly.dev/poetry/random ，能访问成功了，我们成功了



### 别的有用的flyctl 命令

- 创建 postgresql 数据库：`fly pg create`
- 查看 postgresql 数据库列表： `fly pg list` 
- 通过 ssh 进入您的虚拟机：`fly ssh console`
- 查看应用状态: `flyctl status`
- 查看应用信息: `flyctl info`
- 查看应用列表: `flyctl apps list`
- 查看应用的IP: `flyctl ips list`
- 销毁某个应用: `flyctl apps destroy <appname>`



## 总结

正所谓：别人笑我太疯癫，我笑他人看不穿。这个项目正是无语至极之作品

项目地址：https://github.com/johanazhu/tangpoetry

预览地址：https://tangpoetry.fly.dev/





## 参考资料

- [在 Fly.io 部署 Rails 应用](https://geeknote.net/Rei/posts/387)
