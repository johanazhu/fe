# 前端学 Ruby：熟悉Rails



## 前言

一句话介绍，看 [Rails Guides](https://ruby-china.github.io/rails-guides/) 即可



## 正文

Rails 是使用 Ruby 语言编写的 Web 应用开发框架，如同 Node 中的 Express、Koa，Python 中的 Django、Flash。但相比其他，它更强大

Rails 哲学包含两大指导思想：

- 不要自我重复（DRY）
- 多约定，少配置（约定优于配置）

因为它约定优于配置的设计，从而可以使 Rails 应用几乎不需要任何配置文件。有人曾经这样比喻过，Rails 框架仿佛一台傻瓜相机，只需要简单练习就可以照出相片，但意味着摄影者完全相信相机的设定。笔者也是这么认为的，所谓数码（单反或无反）相机，大多数爱好者也只是用自动挡，还不如用手机或者傻瓜相机拍的好



## Rails 中的 MVC

Rails 能讲的东西太多了，MVC思想，严格的分层理论，ORM机制，页面模板技术，页面装饰技术……

笔者这里做笔记时摘要其中最重要 MVC 思想，MVC不用过多介绍，即模型、视图、控制器

- 模型 Model：对数据库的数据进行操作
- 视图 View：显示数据
- 控制器 Controller：调度模型，将数据展示给视图

我们曾经在 [从 url 输入到返回请求的过程 ](https://fe.azhubaby.com/Browser/%E4%BB%8Eurl%E8%BE%93%E5%85%A5%E5%88%B0%E8%BF%94%E5%9B%9E%E8%AF%B7%E6%B1%82%E7%9A%84%E8%BF%87%E7%A8%8B.html) 一文中介绍过请求的全过程，当用户请求到服务器时，Rails 是怎么做的，它通过 Routing 接受所有的请求，如果匹配到，进入相应控制器，然后再控制器中执行其中的代码，一般来说，是控制器操作 Model 数据，拿到数据后，返回给 View

整个 Rails web 应用正如下面这幅图所示：

![rails结构](https://s2.loli.net/2023/01/16/PpTzmDa1fFjk4eh.png)

当用户通过浏览器输入网站地址时，可以理解为访问了网站服务器，Rails 框架的入口会去路由处匹配 url。如果匹配正确，前往对应的控制器（Controller） 处，控制器中我们可以定义方法，方法中去操作模型（Modal），因为模型是继承 ActiveRecord 类，它能提供你对数据库进行增删改查，当控制器拿到数据后以视图形式展示，当然，也可以是以 json 形式返回。如果是以视图形式返回，视图通过特定语法（<%= %>）展示数据

例如，我们要访问一个书的列表页

```ruby
class BooksController < ApplicationController

    def index
        @books = Book.all
    end

end
```

其中，BooksController 就是我们的控制器，在类中定义 index 方法，方法中的  Book 即继承 ActiveRecord 后的 Book Model 模型，Book.all 即查询数据（Model）中所有的书，index 方法名对应的时 `views/books/index.html.erb`，而 `@books` 以通过模型查询到的数据体现在视图上

上述讲到的内容是任何Web框架中都进行的事情，不过，Rails 将其全整合了，我全都有，你用就好

## Model（模型）⭐

[相关文档](https://ruby-china.github.io/rails-guides/active_record_basics.html)

在整个MVC中，笔者觉得最难的当属 Model，Rails 的 Model 是基于 ActiveRecord，ActiveRecord 就是一个 ORM（对象关系映射） 工具。它的作用就是数据库的高级封装、简单说就是不使用 SQL 语句就可以操作数据库

数据库表就是一个类，行记录就是实例对象，字段就是对象的属性

- 数据库-ActiveRecord- 例子

- 表-类-articles

- 行-实例对象-`obj={id:1, title:'标题', desc: '描述'}`

- 字段-对象属性-`obj.title`

> 这里需要注意的是：Rails 中的模型类名是单数，查找的数据表为复数。例如模型类名为 Article，数据表是 articles

实际中的基本操作

```bash
rails generate model user userName:string email:string # 创建 user 模型，模型为 user，数据库中会以 users 展示
rails console # 进入命令行控制台
# 创建
@user = User.new(userName => 'johan', email => 'johan101@.qq.com') 
@user.save

# 还有一种是 create，创建记录，并存在数据库
@user =  User.create(userName => 'johan', email => 'johan101@.qq.com')

# 读取
# 获取所有的用户
users = User.all
# 返回第一个用户
user = User.first
# 返回第一个名为 johan 的用户
johan = User.find_by(name: 'johan')

# 更新
user = User.find_by(name: 'johan')
user.name = 'elaine'
user.save
# 或者是直接用关键字 update
user.update(name: 'elaine')

# 删除
# 删除所有用户
User.destroy_all 
# 删除名为 johan 的用户
user = User.find_by(name: 'johan')
user.destroy

# 其他
# find(*args)：根据主键查询特定记录
# find_by_sql(sql)：根据SQL语句查询
# exists?(id)：判断指定ID的记录是否存在
# create(attributes)：新增一条记录
# update(id, attributes)：根据ID来修改指定记录
# update_all(updates, conditions)：根据条件来修改一批记录
```

### 数据验证

在存入数据前，后端要对数据进行判断，如果你什么都没填就提交了，那不是乱搞吗，所以一般都要对传入的值进行判断，是否为空，字符太少，要求是手机号码、身份证、各种正则...

在 Rails 中，在 Model 就提供了相关的方法

```ruby
class User < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2 } # 不能为空，长度最少是2个字符
  validates :email, presence: true, length: { maximun: 255 }, format: {
    	with: EMAIL    
    }, uniqueness: { case_sensitive: false }, on: :create # 创建的时候该数据是唯一的
end
```

[相关文档](https://ruby-china.github.io/rails-guides/active_record_validations.html)，关键还是要看文档，内容太多了

### 回调（生命周期）

在创建、保存、更新、删除、验证或从数据库中加载 Active Record 对象时执行的代码

```ruby
class User < ApplicationRecord
  validates :login, :email, presence: true
 
  before_validation :ensure_login_has_a_value
 
  private
    def ensure_login_has_a_value
      if login.nil?
        self.login = email unless email.blank?
      end
    end
end
```

可用的回调包括：before_validation、before_create、after_create、after_save、before_save、after_update、before_destroy、after_destroy 等等

具体可看[文档](https://ruby-china.github.io/rails-guides/active_record_callbacks.html)

### 迁移

```bash
# 生成迁移文件
rails g migration CreateJoinTableCustomerProduct customer product
# 迁移
rails db:migrate
# 版本回滚
rails db:rollback step=1
```

这里在学习的时候，遇到一个东西，困惑了半天，那就是外键，外键用于两个表之间一对多关系。一个用户能写多篇文章，所以 article model belongs_to，而 user model has_many。

### 关联

关联的类型有六种：belongs_to、has_one、has_many、has_many :through、has_one :through、has_and_belongs_to_many

has_many 与 belongs_to 是什么意思？

has_many 拥有很多

belongs_to 属于

例如，一篇文章可以拥有很多评论，一则评论属于某篇文章

## View（视图）

[相关文档](https://ruby-china.github.io/rails-guides/layouts_and_rendering.html)

视图相对简单，这里提几个笔者在开发时遇到的坑定：

LInk_to 的用法

```ruby
<h1><%= @article.title %></h1>

<%= image_tag @article.cover_image.url %>

<p><%= @article.content %></p>

<%= link_to "Edit", edit_article_path(@article) if Current.user.admin? %>
```



## Controller（控制器）

[相关文档](https://ruby-china.github.io/rails-guides/action_controller_overview.html)

一般使用命令行不仅能生成控制器，也能把视图生成出来

```bash
rails g controller Calendar show
```

没啥好讲的

## Route（路由）

[相关文档](https://ruby-china.github.io/rails-guides/routing.html)

```ruby
Rails.application.routes.draw do
    resources :articles do    # /articles, /articles/1
    	resources :comments     # /articles/1/comments, /comments/1
        
        member do
        	post 'like'
            delete 'unlike'
        end
    end
    
    resouce :settings, only: [:show, :update] # 单数形式
    
    scope :profiles do
    	get ':username', to: 'profiles#show', as: :user_profile
        post ':username/follow', to: 'profiles#follow', as: :follow_user
        delete ':username/follow', to: 'profiles#unfollow', as: :unfollow_user
    end
    
    get ':welcome', to: 'welcome#show' # GET /welcome

    root to: "articles#index" # 根目录
end
```

添加资源路由扩展

```ruby
Rails.application.routes.draw do
   
    resources :post do
    	get 'recent', :on => :collection
    end
    # 或者
    resources :post do
    	collection do 
            get 'recent'
        end
    end
end
```

成员路由

```ruby
Rails.application.routes.draw do
    resources :post do
    	member do
            get 'recent'
        end
    end
end
```

##  Rails 命令行⭐

有些命令在 Rails 开发过程中经常会用到，下面按照使用频率倒序列出：

- `rails console`，简写 `rails c`
- `rails server`，简写 `rails s`
- `bin/rails`
- `rails generate`，简写 `rails g`
- `rails dbconsole`
- `rails new app_name`
- `rails destroy`，简写 `rails d`

创建一个项目

```bash
rails new myapp
rails new blog # 生成一个 blog 项目
rails new --api blog # 以 API 形式生成一 blog 项目
rails new -h # 查看所有命令行选项
rails new --api --database=postgresql --skip-test app # 创建一个数据库为 postgresql 的跳过测试的 api App项目
```

启动 puma Web 服务

```bash
rails server
bin/rails server -e production -p 4000 # -e 环境 -p 端口
```

使用模板生成

```bash
rails g model user email:string name:string # 创建 user 模型
rails g controller welcome hello # 生成 welcome 控制器，hello 函数
rails destroy controller welcome # 销毁 welcome 控制器所有配套的文件
rails g scaffold article title:string description:string body:text # 生成文章脚手架，视图、控制器、模型都生成
rails db:migrate # 同步到数据库
rails db:rollback step=1 #反悔命令 step 步骤
rails g migration AddUserGenderToUser gender:string # 修改数据库
# migration 基于的是 ActiveRecord::Migration 
```

使用命令行与 rails 交互

```bash
rails console
rails c
```



## 各个常用 gem 

以下是我收集的各种 gem 包，当然，可以去 https://www.ruby-toolbox.com/ 去找 

devise：用来做用户体系⭐

simple_form：表单提交⭐

PostgreSQL：数据库⭐

kaminari：分页⭐

Webpacker：前端资源打包

Tailwind：CSS库

Pagy：分页

jwt：jwt 

pg_search/searchkick：全文搜索

rspec-rails：测试

rspec_api_documentation： 测试生成文档

Rubocop：代码格式

Clockwork：定期作业

Sidekiq：后台作业

friendly_id：生成 URL 友好的 slug 

InfluxDB、Grafana 、 influxdb-rails：监控

Solargraph，ruby-rubocop：编辑工具

Rollbar 或 Honeybadger：异常管理

Postmark：发送电子邮件

activeadmin：管理工具







## 参考资料

- [Ruby 官网 rails 教程](https://ruby-china.github.io/rails-guides/getting_started.html)
- [Rails 风格指南](https://github.com/bbatsov/rails-style-guide)
- [Rails 风格指南中文版](https://github.com/JuanitoFatas/rails-style-guide/blob/master/README-zhCN.md)

