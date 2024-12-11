# Cloudflare菩萨系列：hono+d1做一个名人名言API



> Cloudflare菩萨系列：workers 使用指南
>
> Cloudflare菩萨系列：hono+d1 做一个名人名言API
>
> Cloudflare菩萨系列：workers + r2 + 爬虫小报童 + prisma集成



延续上文了解了 cloudflare workers  是什么以及知道它怎么做之后，接下来我们就用  cloudflare 中的其他免费服务来做应用，这次我们用 D1

[官网介绍](https://developers.cloudflare.com/d1/)：Create new serverless SQL databases to query from your Workers and Pages projects

创建新的无服务器 SQL 数据库，以便从您的 Workers 和 Pages 项目中查询

这里只介绍三个点，其他可以看官网详细了解

- 免费额度很大，一天五百万的读取和10万次的写入，总共有 5G
- 它的数据库类型是 SQLite
- 免费用户只能创建10个数据库

[起手式](https://developers.cloudflare.com/d1/get-started/)有可以用 cli 也可以在后台（dashboard）中直接写

这里记录下比较重要的命令行：

创建 D1 数据库

```bash
npx wrangler d1 create prod-d1-tutorial
```

Worker 上绑定到 D1 数据库

```toml
[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "prod-d1-tutorial"
database_id = "<unique-ID-for-your-database>"
```

本地创建 `schema.sql` 文件，并定义 schema

```sql
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');
```

> 以上代码很简单
>
> 如果有 Customers 表的话就丢掉
>
> 创建 Customers 表，定义表结构 CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT
>
> 往 Customers 中塞入值

往 D1 中执行本地文件 schema.sql，此时你的根目录下的 `.wrangler` 中有的 `state/v3/d1` 就会生成数据库

```bash
npx wrangler d1 execute prod-d1-tutorial --local --file=./schema.sql
```

执行以下命令就能增删改查数据库

```bash
npx wrangler d1 execute prod-d1-tutorial --local --command="SELECT * FROM Customers"
```

 执行以下命令将本地 sql 推送到远程的 `prod-d1-tutorial` 上

```bash
npx wrangler d1 execute prod-d1-tutorial --remote --file=./schema.sql
```

同样，我们可以通过命令行对远程数据库进行操作

```bash
npx wrangler d1 execute prod-d1-tutorial --remote --command="SELECT * FROM Customers"
```

通过 delopy 命令部署 worker 服务

```bash
npx wrangler deploy
```

此时，就可以通过二级网址访问 worker 服务

要想做一个 API 接口，当然可以通过在 export default 中定义并对 D1 进行增删改查，但官方推荐了四个例子： Remix、Hono、SvelteKit、Python Workers

我都不熟，相对来说，Hono 的教程最多，所以就用 Hono

> PS：当然，如果后续学 Python，我也会去用 Python 操作



## Hono

Hono - ***在日语中意为火焰🔥*** - 是一个基于 Web 标准构建的小型、简单且超快速的 Web 框架。它可以在任何 JavaScript 运行时上运行：Cloudflare Workers、Fastly Compute、Deno、Bun、Vercel、Netlify、AWS Lambda、Lambda@Edge 和 Node.js。

快速，但不仅仅是快。

先创建项目

```bash
pnpm create cloudflare@latest d1-tutorial
```

- For *What would you like to start with?*, choose `category Framework Starter`.
-  For Which development framework do you want to use? choose ` framework Hono`

接下就会下载 cloudflare + hono 的脚手架

执行 `pnpm run dev` 进行开发状态，能在 `http://localhost:8787` 中看到 `Hello Hono!`

### 定义schema

创建 `schema.sql` 

```sql
-- 创建 Quotes 表，用于存储名言
CREATE TABLE Quotes (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    content TEXT NOT NULL,
    authorId TEXT NOT NULL,  -- 外键引用 Authors 表
    length INTEGER NOT NULL,
    createdAt DATETIME,      
    updatedAt DATETIME,     
    FOREIGN KEY (authorId) REFERENCES Authors (id)  -- 添加外键约束
);

-- 创建作者表，用于存储作者信息
CREATE TABLE Authors (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    link TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    description TEXT DEFAULT '',
    quoteCount INTEGER NOT NULL DEFAULT 0,  -- 默认值设置为0
    createdAt DATETIME,      
    updatedAt DATETIME
);

-- 创建标签表，用于存储标签信息
CREATE TABLE Tags (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL,
    createdAt DATETIME,      
    updatedAt DATETIME
);

-- 创建 QuoteTags 表，用于建立名言和标签之间的多对多关系
CREATE TABLE QuoteTags (
    quoteId TEXT NOT NULL,
    tagId TEXT NOT NULL,
    PRIMARY KEY (quoteId, tagId),
    FOREIGN KEY (quoteId) REFERENCES Quotes (id),
    FOREIGN KEY (tagId) REFERENCES Tags (id)
);

-- 创建索引
CREATE INDEX nameIndex ON Authors (name);
CREATE INDEX quoteCountIndex ON Authors (quoteCount DESC);
```

作者可以做多个名言，所以作者表对名言表是一对多

一个名言可以有多个标签，一个标签可以赋予给多个名言，所以它们的关系就是多对多

所以 Quotes 表引用了 Authors 表，Quotes 表和 Tags 表有个中间表 QuoteTag 将其做互相关联

```
npx wrangler d1 execute mingyan-d1 --local --file=./schema.sql
```

> 注意：如果没按照格式加分号、减逗号，会报`✘ [ERROR] near ")": syntax error at offset 388: SQLITE_ERROR` 错误

看到命令行中显示执行成功后，我们查看本地数据库 `mingyan-d1` 中的作者数据结构

```
npx wrangler d1 execute mingyan-d1 --local --command="PRAGMA table_info(Authors);"
```

能看到清晰的数据结构说明已经是成功了

说明我们的 D1 数据结构已经完成了

我们将其推送到远程D1上

```bash
npx wrangler d1 execute mingyan-d1 --remote --file=./schema.sql
```

并且还是



## prisma or 直接操作

我们当然可以像在起手式中那样，直接执行 D1 的增删改查，例如这样：

```bash
const stmt = db.prepare("SELECT * FROM users WHERE name = ?1").bind("Joe");
const stmt = db.prepare('SELECT * FROM users WHERE name = "John Doe"');
```

但是别忘记了，笔者的这个项目是一个还没有任何数据的项目，如何添加数据呢，通过初始化的时候添加吗？

~~所以笔者使用 Prisma~~

好巧不巧，笔者的一个 side project 正在做改版，所以打算以那个为例子，做【workers + r2 + 定时爬虫小报童，更新数据 + prisma集成】

所以这个项目就制作 hono+ d1 操作

## 整理目录

将 `schema.sql` 放入 data 目录（新建）下，并新建一个文件`insert_data.sql`，这文件用来塞数据

在 src 目录下我们新建`controllers` 文件，其下再新建 `authors`、`quotes`、`tags` 文件夹以及其中的 index.ts 文件，这个文件用来做数据的增删改查操作

在 src 目录下又新建 routes 文件，用来管理路由分配

贴一下路由结构

```typescript
/**------------------------------------------------
 ** Quotes
 **-----------------------------------------------*/
api.get("/quotes/random", randomQuotes);
api.get("/random", singleRandomQuote);
api.get("/quotes", listQuotes);
api.get("/quotes/:id", getQuoteById);

/**------------------------------------------------
 ** Authors
 **-----------------------------------------------*/
api.get("/authors", listAuthors);
api.get("/authors/:id", getAuthorById);
api.get("/authors/slug/:slug", getAuthorBySlug);

/**------------------------------------------------
 ** Tags
 **-----------------------------------------------*/
api.get("/tags", listTags);
```

接下来我们就要在 `controllers` 文件做数据增删改查了



