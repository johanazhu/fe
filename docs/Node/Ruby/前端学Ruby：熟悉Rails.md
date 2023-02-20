# 前端学Ruby：熟悉 Rails





Rails 是使用 Ruby 语言编写的 Web 应用开发框架，目的是通过解决快速开发中的共通问题，简化 Web 应用的开发。

一框架，就如同 Node 中的 Express、Koa，Python 中的 Django、Flash





ruby 是一门编程语言，ruby on rails 是 ruby 的一个 web 框架，简称 rails。



gemfile：就如果 package.json



它基于一种“约定优于配置”的设计哲学，从而可以使得Rails应用几乎不需要任何配置文件。



Rails 哲学包含两大指导思想：

- 不要自我重复（DRY）
- 多约定，少配置



用户访问，先去 controller 中，controller——model，返回数据，再到view

Rails框架选择Rails作为名字确实是非常恰如其分。Rails的作者想传递给开发者一个信息：只要你选择Rails框架，就仿佛上了一条铁轨（rail是铁轨的意思）



| 完整形式       | 简写形式 |
| -------------- | -------- |
| rails server   | rails s  |
| rails console  | rails c  |
| rails generate | rails g  |
| bundle install | bundle   |
| rails test     | rails    |



## 创建及定制 Rails 生成器和模板

创建一个项目

```bash
rails new myapp
rails new blog # 生成一个 blog 项目
rails new --api blog # 以 API 形式生成一 blog 项目
rails new -h # 查看所有命令行选项
rails new --api --database=postgresql --skip-test app # 创建一个数据库为 postgresql 的跳过测试的 api App项目


rails g model user email:string name:string # 建模工具
ActiveRecord::Migration # 数据库操作工具
rails db:migrate # 同步到数据库
rails db:rollback step=1 #反悔命令
```







## 目录结构

 Rails应用的目录结构 ❑ app：该文件夹下存放的是Rails应用的核心部分，Rails应用的Model，Controller和View部分都放在该路径下。

 views路径下的文件结构 views除了为controllers下每个Controller类提供一个对应的视图文件夹外，还提供了一个layouts文件夹，该文件夹下包含了所有控制器对应的整体布局装饰（类似于SiteMesh的页面装饰器）。通过把整个模块下的页面效果定义在layouts下，可以更好地控制整体风格。







## MVC 与 路由



![rails结构](https://s2.loli.net/2023/01/16/PpTzmDa1fFjk4eh.png)



当用书通过浏览器输入网站地址时，可以理解为访问了网站服务器，Rails 框架的入口会去路由处匹配 url。如果匹配正确，前往对应的控制器（Controller） 处，在控制器中我们可以定义方法，方法中去操作模型（Modal），因为模型是继承 ActiveRecord 类，它能提供你对数据库进行增删改查，当你拿到数据后可以以视图形式返回，也可以以 json 形式返回。如果是以视图形式返回，视图通过特定语法展示数据

例如，我们要访问一个书的列表页

```ruby
class BooksController < ApplicationController

    def index
        @books = Book.all
    end

end
```

其中，BooksController 就是我们的控制器，在类中定义 index 方法，方法中的  Book 即模块，Book.all 即查询数据中所有的书，index 方法名对应的时 `views/books/index.html.erb`，而 `@books` 即通过模型查询到的数据会体现在视图中，可以通过语法展示数据







## 模型model

MVC



每个模型代表一个数据库表。该模型对象豁得了从数据库表中检索、保存、编辑和删除数据的能力（继承自 ActiveRecord - Rails 类）



### 命令行

```bash
rails g model user email:string name:string # 建模工具
# rails g model  表名  列名：类型
# rails g model //generate 数据建模
# user： //model的名字
# email:string  //email的类型是 string
# name:string // name的类似是 string
ActiveRecord::Migration # 数据库操作工具
rails db:migrate # 同步到数据库
rails db:rollback step=1 #反悔命令
```



M（模型）继承自 Active Record

```ruby
class Article < ApplicationRecord
  belongs_to :author, default: -> { Current.user }
  has_many   :comments

  has_one_attached :cover_image
  has_rich_text :content, encrypted: true
  enum status: %i[ drafted published ]

  scope :recent, -> { order(created_at: :desc).limit(25) }

  after_save_commit :deliver_later, if: :published?

  def byline
    "Written by #{author.name} on #{created_at.to_s(:short)}"
  end

  def deliver_later
    Article::DeliveryJob.perform_later(self)
  end
end
```



##### has_many 与 belongs_to 是什么意思？

has_many 拥有很多
belongs_to 属于
就是这么直观！记得你一定要帮他们加上关联！



## 控制controller



```bash
rails g controller Calendar show
```



```ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.recent
  end

  def show
    @article = Article.find(params[:id])
    fresh_when etag: @article
  end

  def create
    article = Article.create!(article_params)
    redirect_to article
  end

  private
    def article_params
      params.require(:article).permit(:title, :content)
    end
end
```



### 创建：

```ruby
user = User.create(name: 'Johan', occupation: 'Code Artist')
```

### 读取

```ruby
# 返回所有用户组成的集合
users = User.all

# 返回第一个用户
user = User.first

# 返回指定用户
user = User.find(params[:id])
```

### 更新

```ruby
user = User.find_by(name: 'Johan')
user.name = 'Johnny'
user.save
```

散列写法

```ruby
user = User.find_by(name: 'Johan')
user.update(name: 'Johnny')
```

### 删除

```ruby
user = User.find_by(name: 'Johan')
user.destroy
```



## 视图view

```ruby
<h1><%= @article.title %></h1>

<%= image_tag @article.cover_image.url %>

<p><%= @article.content %></p>

<%= link_to "Edit", edit_article_path(@article) if Current.user.admin? %>
```



## 路由

```ruby
Rails.application.routes.draw do
  resources :articles do    # /articles, /articles/1
    resources :comments     # /articles/1/comments, /comments/1
  end

  root to: "articles#index" # /
end
```



`rake routes`查看路由



## 数据验证

在模型中，对数据进行验证，再反馈到控制中





除此之外，我们还可以直接将可执行性代码放在类定义中。 # 第一条可执行代码作为程序入口 puts "Hello World" class A     # 类定义中的可执行代码，将顺序执行     puts "Hello Ruby" end 上面的代码的执行效果如下： Hello World Hello Ruby

















rails appName 它生成一个Rails Web应用的框架。其中appName是Rails应用的名字。 基本上，我们不会采用完全手动的方式来创建一个Rails应用——这相当烦琐，而且很难利用Rails提供的敏捷开发工具。因此，为了很好地利用Rails提供的敏捷开发工具以及Rails平台，我们推荐总是利用rails appName命令来生成一个Rails应用，该命令会生成一个空Rails应用，然后我们再在该空应用的基础上进行扩展。



Rails会检查该应用对应的数据库里是否包含该Model对应的数据表。 ❑ ruby script/generate web_service serviceName：生成一个WebService模块的代码框架。 借助于这些代码生成器，可以从一定程度上降低我们的代码编写量，从而提高开发效率。 11.2 Rails的配置和约定 Rails应用需要配置的地方很少，大部分时候它都采用约定优于配置的哲学，这种处理哲学简化了Rails应用的开发，从而大大简化了Rails应用的开发难度。



❑ routes.rb：该文件配置了Rails应用默认的路由规则。 大部分时候，开发者只需要修改上面3个配置文件，通过这3个配置文件就可以很好地控制Rails应用的运行。其中database.yml用于配置Rails应用的数据库连接信息，而routes.rb用于配置Rails应用默认的路由规则。这两个文件会在模型和控制器部分有更详细的介绍，此处不再赘述。 environment.rb文件主要用于配置Rails应用的运行环境。打开该文件，找到该文件内包含如下一行：



11.3.1 ORM的概念和优势 在Java EE领域有一类非常实用的框架：ORM框架。ORM的全称是Object/Relational Mapping，对象/关系映射。ORM也可理解为一种规范，具体的ORM框架可作为应用程序和数据库的桥梁。ORM并不是一种具体的产品，而是一类框架的总称，它概述了这类框架的基本特征：完成面向对象的程序设计语言到关系数据库的映射。基于ORM框架完成映射后，既可利用面向对象程序设计语言的简单易用性，又可利用关系数据库的技术优势。



Rails提供了一个非常优秀的ORM工具，它就是ActiveRecord，也就是活动记录集。 11.3.2 活动记录集的概念和优势 Rails采用了活动记录集的哲学来处理Rails应用的持久层访问。活动记录集的思想是使用一个对象来包装数据表或视图里的一条记录，当程序员在应用中操作这个对象时，系统自动将这种操作转换成对这条记录的操作。 采用活动记录集处理持久层访问方案，意味着持久化类将会包含系列类方法，这些类方法可以实现各种查询方法。



这是基于Rails的约定优于配置的策略。 Rails对持久化类的类名与数据表表名之间存在如下约定。 ❑ 类和对应的数据表同名。 ❑ 类名是英文单数形式。 ❑ 首字母大写。 ❑ 如果类名由多个单词组成，连着写这些单词，并且每个单词的首字母大写。 Rails对表名也做了一些约定。 ❑ 表名是英文复数形式。



提示 因为持久化类继承了ActiveRecord::Base类，因此可以直接调用该类的方法，其中find_all方法用于获取该持久化类的所有实例，也就是取得User类对应的users表中的所有记录。 为了显示输出控制器的处理结果，我们为该Action提供一个与之对应的视图页面，我们在table_class\app\views\user路径提供一个list.rhtml视图页面。该视图代码如下：





## Rails 上的查询

我们可以使用 ActiveRecord 方法进行查询：

- all：从特定模型中获取所有对象

此时，ActiveRecord 会帮你执行：`SELECT * FROM posts` 查询

- find：使用 find 我们可以通过 id（主键）获取对象

此时，ActiveRecord 会执行 `SELECT * FROM posts WHERE id = 1` 查询

- where：获取满足条件的对象

此时，ActiveRecord 会执行 `SELECT * FROM posts WHERE title = 'Database' & Rails` 查询

- order：根据列对所有对象进行排序

此时，ActiveRecord 会执行 `SELECT * FROM posts ORDER BY created_at DESC ` 查询





## 参考资料

- [Ruby 官网 rails 教程](https://ruby-china.github.io/rails-guides/getting_started.html)
- [Ruby on Rails 风格指南](https://github.com/bbatsov/rails-style-guide)
