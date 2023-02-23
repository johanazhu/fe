# 前端学 Ruby：唐诗API项目



## 前言

我想了半天，该做什么项目，基于笔者的数据库知识羸弱，怕一方面做前端一方面做后端会搞得四不像，又累时间又长。所以就想以做纯 API 为目的，只做接口会不会更快一些呢

## 正文

笔者打算做一个全唐诗的 API 项目，此项目只为学习 ruby on rails web 开发并部署至服务器，会逐步从零开始到部署上线，部署手段会有些原始，不过没事，下个项目笔者会升级部署手段

先新建一个 API 项目

```bash
rails new --api --database=postgresql --skip-test tangpoetry
```

> 意思是新建一个唐诗的 API 项目，数据库为 postgresql，跳过测试

新建后进入项目，并更新 gem 下载源

```bash
cd tangpoetry
```

```ruby
bundle config mirror.https://rubygems.org https://gems.ruby-china.com
```

重新下载依赖

```bash
bundle install --verbose # verbose：打印下载依赖过程
```

再去 `config/database.yml` 中修改开发环境时的数据库

```yml
development:
  <<: *default
  database: tangpoetry_dev
  username: tangpoetry
  password: 123456
  host: localhost
```

在此之前，需要在 pgAdmin4（postgresql图形界面） 中创建 database、username、password 等，这里不做赘述

我们在本地启动服务

```bash
rails s
```

如此， rails 应用就启动了

![ruby on rails运行成功](https://s2.loli.net/2022/12/27/uFNbqIgzw8PEtL5.png)

## 建立数据库

笔者要做的是全唐诗的 API 接口，要有什么功能先不说，起码不会自己做数据，在网上找了一个 [唐诗的数据库](https://github.com/hxgdzyuyi/tang_poetry)，先导入 mysql 中，能看到它有两个表

![数据库](https://s2.loli.net/2023/01/16/l19RqDhF8cwgQvX.png)

我们先根据表中的字段创建俩模型（Model）

```bash
rails g model poetry poet_id:integer content:text title:string 
rails g model poet name:string 
```

> PS：模型（Model）需要是单数。id、created_at、updated_at 会自己创建
>

此时，就有个问题了，这个项目的 sql 是以 mysql 为语法而写的，怎么将它转换为 postgresql 呢？

先不要管这个问题，来设计一下要做的 API

- 随机获取一首诗：/poetry/random
- 用诗的题目查询：/poetry/title/静夜思
- 列出这个诗人的所有诗：/poetry/author/李白
- 列出这个诗人的这首诗：/poetry/author/张若虚/title/春江花月夜
- 通过创作数量排名：/poet/list/createnum

确定好要做的 API 后，我们就去实现，先在命令行中执行以下代码来创建控制器（Controller）

```bash
rails g controller poetry random
# rails g controller 名字  动作
```

会生成这样的文件：

![生成的controller](https://s2.loli.net/2023/01/16/17eiTHRn9tdc6X5.png)

以上命令的意思是说在创建一个名为 poetry 的类，它的方法为 random。rails 会帮你创建好类和方法以及在路由处创建一个 `poetry/random` 的路由

修改 `poetry_controller.rb` 中的内容：

```ruby
class PoetryController < ApplicationController
  def random
    render json: { resource: 'hello, world'}
  end
end
```

而后访问 `http://127.0.0.1:3000/poetry/random` ，就能看到 json 格式的返回值了

> 访问 url，应用匹配 route，routes 匹配 controller，controller 操作 model，并返回对应的数据给路由

现在我们要回到最开始的疑问，怎么把全唐诗中的sql转化为 postgresql？

笔者经过一些尝试，发现可以转换，数据是有的，数据结构也一致，无非原本是用 mysql 写的，现在将其改成 postgresql。而现在我们已经有数据库的两张表了，只要插入数据即可，用 pgAdmin 也好，用其他工具也罢，用 postgresql 语法把数据插入数据库中

```postgresql
INSERT INTO poets (id,name,created_at,updated_at) VALUES (1,'李世民','2014-06-02 11:47:52','2014-06-02 11:47:52'),(...)

INSERT INTO poetries (id,poet_id,content,title, created_at, updated_at) VALUES (2,1,'塞外悲风切，交河冰已结。瀚海百重波，阴山千里雪。迥戍危烽火，层峦引高节。悠悠卷旆旌，饮马出长城。寒沙连骑迹，朔吹断边声。胡尘清玉塞，羌笛韵金钲。绝漠干戈戢，车徒振原隰。都尉反龙堆，将军旋马邑。扬麾氛雾静，纪石功名立。荒裔一戎衣，灵台凯歌入。','饮马长城窟行','2014-06-02 11:47:52','2014-06-02 11:47:52'),(...)
```

## 实现第一个接口

这个时候，数据库中已有全唐诗的数据，我们现在要做第一个接口，即获取一首随机诗

首先是获取随机数，其次是根据这个 id 找到这一项

```ruby
...
  def random
    random = Poetry.find(rand(1...43030))
    render json: { resource: random}
  end
...
```

![获取一首随机诗接口](https://s2.loli.net/2023/01/17/LYJQEMFcbOVjXsP.png)

ruby on rails 就是这么简单，这样就完成了 random 接口

## 其余API

除了 random 接口，我们还有四个接口，做好后再部署唐诗 API 项目就完成了，可谓是半小时完成一项目

- 用诗的题目查询：/poetry/title/静夜思
- 列出这个诗人的所有诗：/poetry/author/李白
- 列出这个诗人的这首诗：/poetry/author/张若虚/title/春江花月夜
- 通过创作数量排名：/poet/list/createnum

前三者都是在 poetry 路由下的访问，我们先新建 routes

```ruby
get 'poetry/random'

+get 'poetry/title/:title', to: 'poetry#title'
+get 'poetry/author/:author', to: 'poetry#author'
+get 'poetry/author/:author/title/:title', to: 'poetry#author_title'
```

意思是访问 `poetry/title/:title` 路由，就是去 `poetry_controller` 中找 title 方法，并且有个 title 变量（其余两者相同道理）。再去 `poetry_controller` 文件，新建`title`、`author`、`author_title` 方法

```ruby
class PoetryController < ApplicationController
  def random
    random = Poetry.find(rand(1...43030))
    render json: { data: random }
  end
  # /poetry/title/静夜思
  def title
    result = Poetry.find_by(title: params[:title])
    render json: { data: result }
  end
  # /poetry/author/李白
  def author
    author = Poet.find_by(name: params[:author])
    result = Poetry.where({poet_id:  author[:id]})
    render json: { data: result }
  end
  # /poetry/author/张若虚/title/春江花月夜
  def author_title
    author = Poet.find_by(name: params[:author])
    result = Poetry.where({poet_id:  author[:id], title: params[:title]})
    render json: { data: result }
  end
end

```

又搞定了三个接口，你就说快不快

其中，对 ORM 有所不了解，笔者是在 [RailsGuides](https://ruby-china.github.io/rails-guides/active_record_querying.html) 查询

```ruby
Poet.find_by(name: params[:title])
# 只能找满足条件的第一条
Poetry.where({poet_id:  @author[:id]})
# where 条件查询
# 找到满足条件的所有项
```

接着偶们做最后一个接口，即通过创作数量排名：/poet/list/createnum

```bash
 rails g controller poet list
```

或者不用命令行，直接在 `routes.rb` 上修改，并新建 `poet_controller.rb` 文件进行更新

——————————————

淦，卡住了

笔者这里搜到一个相关的[教程](https://stackoverflow.com/questions/17877725/ordering-records-by-number-of-occurrences-in-the-database)，奈何 sql 基础太差，还是不会弄。这个接口就不做了

## 部署

本地开发结束了，现部署上线

不少教程里说使用 [Heroku](https://www.heroku.com/) 能快速部署，但是我注册不了，只能曲线救国

笔者先说说部署的思路：

先使用本地 docker 部署服务，本地跑通后，再上传源码，通过 Dockerfile 构建运行环境，在运行环境中运行源代码

### 初试 tangpoetry 镜像

我们先构建 Dockerfile，下面命令很好理解，就不过都解释

```dockerfile
FROM ruby:3.1.3
WORKDIR /app
COPY . .
RUN bundle config mirror.https://rubygems.org https://gems.ruby-china.com

ENV RAILS_ENV=production
RUN bundle config set --local without 'development test'
RUN bundle install
ENTRYPOINT bundle exec puma
```

然后将它打包成镜像

```bash
docker build -t tangpoetry .
```

![tangpoetry镜像](https://s2.loli.net/2023/02/03/lweoaquM95Q7zHF.png)

基于 tangpoetry 镜像，生成容器

```bash
docker run -d --name tangpoetry_container -p 3000:3000 tangpoetry
# -d 后台启动容器
# --name 容器名
# -p 端口映射
```

![tangpoetry 容器](https://s2.loli.net/2023/02/03/3Xj7CQyd5Ylact8.png)

我们访问（`http://localhost:3000`）首页，是能看到 Hi 的

> 为了测试方便，我们新建一个根路由，返回一个 json：{ message: 'Hi' }

但是如果访问所写的任意接口，都会访问不了，原因很简单，因为 production 环境下的数据库未配置，所以我们需要再建一个容器，并将唐诗数据导入到此容器中，再通过 docker network 连接两个容器

也就是说我们的服务由两个容器组成（后续可以的话可以通过 docker-compose 改造）

现在本地环境用的数据库是本地下载了 postgreSQL，所以我们需要用 docker 启动 postgresSQL 镜像数据库

创建基于 postgres 的容器

```bash
docker run -d --name db-for-tangpoetry  -e POSTGRES_USER=tangpoetry -e POSTGRES_PASSWORD=123456  -e POSTGRES_DB=tangpoetry_production -e PGDATA=/var/lib/postgresql/data/pgdata  -v tangpoetry-data:/var/lib/postgresql/data      --network=network1      postgres:14
# -d 后台运行
# --name 容器名字叫 db-for-tangpoetry
# -e 环境命令
# -v 数据卷
# --network 使用网络
```

> 这里的数据卷和网络都要事先建好
>
> `docker volume create tangpoetry-data`：创建 tangpoetry-data 数据卷
>
> `docker volume ls` 可查看数据卷列表
>
> `docker network create network1` 创建 network1 网络
>
> `docker network ls` 可查看网络列表

进入（postgresSQL）数据库容器

```bash
docker exec -it db-for-tangpoetry bash
```

连接 tangpoetry_production 数据库

```bash
psql -h localhost -p 5432 -U tangpoetry tangpoetry_production
```

命令 `\l` 查看数据库中的表

![image-20230205141917349](https://s2.loli.net/2023/02/08/oKTACQ3WHpkqZBg.png)

说明我们的数据库创建成功，现在我们需要导出本地数据库，并导入到 docker 镜像数据库中

先将本地的数据库导出

```bash
pg_dump -U tangpoetry -d tangpoetry_dev > tangpoetry.sql
# pg_dump 导出数据
# -U 用户名
# -d 数据库
```

再导入到`db-for-tangpoetry` 容器中

```bash
docker exec -i db-for-tangpoetry pg_restore -U tangpoetry -d tangpoetry_production < tangpoetry.sql
# pg_restore 导入数据
```

笔者输入后显示的如下：

![导入数据库后的效果](https://s2.loli.net/2023/02/08/dkqPbxYXQMBl2rW.png)

### 重新编译 tangpoetry 镜像

我们需要将 tangpoetry 的源码在修改下，配置 `config/database.yml` 中的 production：

```yml
production:
  <<: *default
  database: tangpoetry_production
  username: tangpoetry
  password: <%= ENV["DB_PASSWORD"] %>
  host: <%= ENV["DB_HOST"] %>
```

再重新打包（再此之前先删除原来的容器和镜像）

```
docker build -t tangpoetry .
```

基于 tangpoetry 镜像打包 tangpoetry 容器

```bash
docker run -d --name tangpoetry_container -p 3000:3000  -e DB_HOST=db-for-tangpoetry -e DB_PASSWORD=123456 --network=network1 tangpoetry
```

在容器中创建数据库，并 migrate

```bash
docker exec -it tangpoetry_container bin/rails db:create db:migrate
```

这样再访问 3000 端口时，我们就能看到数据了

### 线上部署

以上我们已经测试成功了本地 docker 部署，先将它推到远程 git 仓库，后续我们会登录服务器，并 git pull 它，然后构建 tangpoetry 镜像，由此创建 tangpoetry_container 容器

这里遇到的坑让我白了四根头发，第三个问题困扰了我两天并白了两根为数不多的头发

#### 问题一：ruby-china 443 证书过期

bundle install 时，gems 源会 443，提示类似这样：

```bash
Retrying download gem from https://gems.ruby-china.com/ due to error (2/4): Gem::RemoteFetcher::FetchError Net::OpenTimeout: Failed to open TCP connection to gems.ruby-china.com:443 (execution expired) (https://gems.ruby-china.com/gems/racc-1.6.2.gem)
```

换成阿里源、清华源都不行，笔者第一次部署时「使用不换源」来解决，等了好久才下载好，后来看到[这篇文章](https://www.thegnar.com/blog/caching-all-native-gem-platforms)，先将本地的依赖下载好成缓存，再 bundle 时就从本地拿就好

简单来说就两步：

先在项目根目录下执行以下命令

```bash
bundle cache
bundle lock --add-platform x86_64-linux
bundle package --all-platforms 
```

![bundle cache](https://s2.loli.net/2023/02/08/bMKja4hRSrfgWlD.png)

![bundle lock](https://s2.loli.net/2023/02/08/KAeW3cBEFgqPOY8.png)

![bundle package](https://s2.loli.net/2023/02/08/IUa3AnOe72VdHuw.png)

（以上皆为部分截图）

再修改 Dockerfile 

```dockerfile
...
# 添加缓存到app中，这里其实是做了 docker 打包的优化，不做过多介绍
ADD vendor/cache /app/vendor/cache
...
# 通过本地下载依赖
RUN bundle install --local
...
```

当我们很快打包后 tangpoetry 镜像后，我们就以它为依据来构建服务，这里我们复制本地部署时的代码`docker run -d --name tangpoetry_container -p 3000:3000  -e DB_HOST=db-for-tangpoetry -e DB_PASSWORD=123456 --network=network1 tangpoetry`，先做测试

此时，我们的服务器上的 postgres 容器还没创建，我们先把 ruby on rails 服务部署成功了，再连接数据库

#### 问题二：secret_key_base 的报错

但访问服务器ip+端口，发现访问不了

通过 `docker logs tangpoetry_container` 查看报错日志

![docker logs tangpoetry_container 报错](https://s2.loli.net/2023/02/09/cxwGIauv7UT6YRW.png)

说 production 环境下的 secret_key_base 不存在

淦，又有个知识点

什么是secret_key_base？为什么需要这个？为什么本地部署时没出现这个？

Rails 在项目初始化的时候就会在根目录`config` 下生成 `master.key` 和 `credentials.yml.enc` 两个文件，前者可以理解为核心密钥，后者是通过 Rails 自带的加密方法生成的加密后的数据文件

关系为：

```markdown
master.key + keys => encrypted
encrypted + master.key => keys
```

keys 是什么，你需要加密的数据，例如 secret_key_base

我们在临时文件中的写入我们的 keys，保存关闭后会生成一个新的 `master.key` 和 `credentials.yml.enc` ，并且临时文件会自动删除，把`.enc` 存在 git 中，`master.key` 排除在 git 外，这样，别人即使拿到源码，拿不到你的 keys（缺少 `master.key` 解不了）

如何读取 keys 呢？

```bash
rails c
# 在命令行中输入 rails c 或者 rails console
# 输入代码
Rails.application.credentials.config # 查看所有的 keys
Rails.application.credentials.secret_key_base #查到 secret_key_base 
```

![查看 credentials](https://s2.loli.net/2023/02/09/wAhHJqU5NLaiOrM.png)

如何修改 keys 呢？

笔者使用的是 window，使用  window 自带的 PowerShell，它能临时写进参数

```bash
$env:EDITOR="code --wait"
rails credentials:edit
```

![编写credentials](https://s2.loli.net/2023/02/23/aFuOhvIWEZ4RMzD.png)

此时会生成一个临时文件，我们将 `demo:12345` 修改为 `demo:123456`，保存并删除临时文件，会发现文件 `credentials.yml.enc` 发生了变化

也就是说 `master.key + keys` 会生成一个新的`credentials.yml.enc`

同理，我们不能在本地和生成使用一套 keys，Rails 支持多环境密钥

```bash
$env:EDITOR="code --wait"
rails credentials:edit  --environment production
```

会得到两个文件：

```markdown
config/credentials/production.key （被加入 .gitignore）
config/credentials/production.yml.enc
```

我们只需要把  `production.key` 写进服务器环境变量中，就能解决问题二的问题了

```powershell
$env:RAILS_ENV="production"
rails c
Rails.application.credentials.secret_key_base
```

![查看production下的密钥](https://s2.loli.net/2023/02/09/CHghpamYekbI1Ls.png)

最佳实践是什么？

- 先删除 `master.key` 和 `credentials.yml.enc`，通过`rails credentials:edit`生成一个新的 key 和 enc，复制临时文件中的 `secret_key_base`
- 再 `rails credentials:edit  --environment production` 生成生产环境的临时文件，粘贴上一步的 `secret_key_base`
- 再删除  `master.key` 和 `credentials.yml.enc`，再生成一个新的 key 和 enc

![最佳实践](https://s2.loli.net/2023/02/09/Wt2sA5j9J4okRI3.png)

如此，再服务器上将RAILS_MASTER_KEY 写进环境变量中，

`vim ~/.bash_profile`

```bash
echo DB_HOST=db-for-tangpoetry
echo DB_PASSWORD=123456
echo RAILS_MASTER_KEY=f78c0868148ca3b1aa64ee9e82c66ef4
```

执行 `source ~/.bash_profile` 立即生效

再次启动容器，此时将 DB_HOST 等用变量形式写入

```bash
docker run -d --name tangpoetry_container --network network1 -p 3000:3000  -e DB_HOST=$DB_HOST -e DB_PASSWORD=$DB_PASSWORD -e RAILS_MASTER_KEY=$RAILS_MASTER_KEY tangpoetry
```

#### 问题三：应用容器连接不上数据库容器

在此之前，我们已经能在服务器ip+端口上能访问到首页，但是此时我们还没启动数据库，所以还访问不到数据库

我们先启动数据库容器

```bash
docker run -d --name $DB_HOST --network network1 -p 5432:5432 -e POSTGRES_USER=tangpoetry -e POSTGRES_PASSWORD=$DB_PASSWORD  -e POSTGRES_DB=tangpoetry_production -e PGDATA=/var/lib/postgresql/data/pgdata  -v tangpoetry-data:/var/lib/postgresql/data      postgres:14
```

并导入数据

```bash
docker exec -i db-for-tangpoetry pg_restore -U tangpoetry -d tangpoetry_production < tangpoetry.sql
```

回到应用容器，进入容器中，初始化数据库

```bash
docker exec -it tangpoetry_container bash # 进入唐诗容器
# 进入容器后
rails db:create
```

发现访问不了

![rails db:create](https://s2.loli.net/2023/02/09/HF1bxVNZAcOEy49.png)

也就是说容器之间的访问成了问题

笔者找了很多资料，找了两天还是没有解决问题，也在 [ruby china](https://ruby-china.org/topics/42860) 上提问，终于在在[这篇问答](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)中找到了灵感，我升级了 docker 版本，从 19 升级到了 23，就解决了

![rails db:create成功](https://s2.loli.net/2023/02/09/wVQWyn5lIzmboMH.png)

以上的命令用以下命令就能实现

```bash
docker exec tangpoetry_container bash db:create db:migrate
```

如此，我们的项目就算成功上线了

## 后续

如果，我是说如果，我们希望加上随机一页的效果，或者说每天更新一首诗，本地开发，成功，推到 git 仓库，并在服务器上删除原有镜像，生成新镜像，再根据新镜像打包

要是项目迭代频繁，会不会觉得，好麻烦

这样麻烦，我都不想搞了~~

下个项目，我们用 shell 命令部署服务器，重复的工作交给代码执行就好





## 参考资料

- [Active Record 基础](https://ruby-china.github.io/rails-guides/active_record_basics.html)
- [山竹记账全栈版Vue 3 + Rails 7+TSX](https://xiedaimala.com/courses/89c07499-0174-40e3-81ce-a9eca822de40/random/bc627d6f7b?#/common)
- [山竹记账免费版](https://www.bilibili.com/video/BV1AZ4y1r7eU)
- [How to run 'rails credentials:edit' on Windows 10 without installing a Linux Subsystem](https://stackoverflow.com/questions/57402435/how-to-run-rails-credentialsedit-on-windows-10-without-installing-a-linux-sub)
- [Why can't I connect to Postgres in Docker?](https://unix.stackexchange.com/questions/566456/why-cant-i-connect-to-postgres-in-docker)
- [Postgresql9.1 suddenly could not connect to server: No route to host](https://stackoverflow.com/questions/11183355/postgresql9-1-suddenly-could-not-connect-to-server-no-route-to-host)
- [Capistrano: ArgumentError: Missing `secret_key_base` for 'production' environment, set this string with `bin/rails credentials:edit`](https://railsnotes.org/28-capistrano-argumenterror-missing-secret-key-base-for-production-environment-set-this-string-with-bin-rails-credentials-edit)
- [How to get a Docker container's IP address from the host](https://stackoverflow.com/questions/17157721/how-to-get-a-docker-containers-ip-address-from-the-host)
- [Rails + PostgreSQL + Docker](https://www.knowbe4.com/careers/engineering/railspostgresqldocker)
- [caching-all-native-gem-platforms](https://www.thegnar.com/blog/caching-all-native-gem-platforms)
