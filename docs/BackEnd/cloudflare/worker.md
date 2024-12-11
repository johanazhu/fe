# Cloudflare菩萨系列：workers 使用指南





讲 Workers 之前，需要了解 Wrangler



## 通过 Wrangler 部署

尽管 Cloudflare Workers 可以直接在网页端编辑部署，Workers Site 还是需要本地通过 [Wrangler CLI](https://github.com/cloudflare/wrangler) 配置。你可以阅读 [Cloudflare 文档](https://developers.cloudflare.com/workers/cli-wrangler/install-update) 了解 Wrangler 多种安装方式。

### 安装 Wrangler

可以通过 npm 或 cargo 安装 Wrangler。由于我已经配置了 Node.js 环境，就直接通过 npm 安装了。

```shell
npm i @cloudflare/wrangler -g
```



### 本地初始化

在你需要部署的项目下执行初始化命令：

```
wrangler init --site my-static-site
```

最后的 `my-static-site` 是项目名称，可以自行填写。

随后 Cloudflare 会在项目中生成 `workers-site` 文件夹和 `wrangler.toml` 配置文件。

配置文件还是要多注意下，先是一些基本配置：

```
name = "blog"
type = "webpack"
account_id = ""
workers_dev = false
route = "blog.ichr.me/*"
zone_id = ""
```

`account_id` 与 `zone_id` 在 Cloudflare 面板可以找到。`route ` 是自定义域名，留空则默认使用 Cloudflare 提供的三级域名。







## 创建 Workers 项目

如果你还没有创建，你可以使用下面的指令来创建一个。

```sh
npm create cloudflare@latest project-name
```

接着回答问题进行配置即可。

## 创建一个数据库

使用下面的指令创建新的 Cloudflare D1 数据库。

```sh
npx wrangler d1 create my-database
```

这将会在控制台中输出如下的内容，你应该将这些配置文件粘贴进 `wrangler.toml` 中。

```toml
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "<xxxxxxxx-xxxx-xxxx-xxxxxxxxxxx>"
```

## 初始化数据库

编写你的数据库 schema 文件，例如保存为 `schema.sql`。

```sql
-- 创建学生表
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

-- 添加默认数据
INSERT INTO students (id, name) VALUES
(114514, "田所浩二"),
(1919810, "田所浩三");
```

使用下面的指令写入到本地开发数据库中，并执行查询语句验证数据。

```sh
npx wrangler d1 execute my-database --local --file=./schema.sql
npx wrangler d1 execute my-database --local --command='SELECT * FROM students'
```

如果你确认这在本地没有问题，可以使用下面的指令在生产环境中部署和验证。

```sh
npx wrangler d1 execute my-database --remote --file=./schema.sql
npx wrangler d1 execute my-database --remote --command='SELECT * FROM students'
```



创建文件 wrangler.toml

```toml
name = "d1-prisma" ## 指向我们的worker项目名称
main = "src/index.ts" ## 指定启动入口文件
compatibility_date = "2024-07-01"


[[d1_databases]]
binding = "DB"  
database_name = "prisma_d1"
database_id = "你自己的D1的id"
```









## 在线文档

https://developers.cloudflare.com/workers/





https://github.com/zhuima/awesome-cloudflare

https://github.com/yestool/analytics_with_cloudflare

https://webviso.yestool.org/



本文介绍了如何使用 Prisma 与 Cloudflare D1 数据库进行交互。首先介绍了 Prisma 的基本概念和架构，然后详细介绍了如何连接和查询 Cloudflare D1 数据库。最后，提供了一些使用 Prisma 与 Cloudflare D1 数据库的实用技巧和最佳实践。

https://cleanclip.cc/zh/developer/cloudflare-worker-gmail-resend-enterprise-email/



Improving Cloudflare Workers and D1 developer experience with Prisma ORM

https://blog.cloudflare.com/prisma-orm-and-d1/







