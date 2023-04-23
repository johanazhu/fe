# 前端学Ruby：全栈论坛（地宫）项目二



接上文[前端学Ruby：全栈论坛（地宫）项目一](./前端学Ruby：全栈论坛（地宫）项目一.md)，休息一晚后，我们继续



## 各个模型建立

笔者是前端出身，对数据库的理解仅限于用 node + mysql （mongodb）做过微型博客。除此之外，数据库的知识点就无了，以下写的不好的，多多担待

### 文章模型与用户模型结合

文章模型与用户模型的结合，一个人必须要先登录后才能写文章，其次，一个人可以有很多文章，但当他注销后，文章就没了

先在 article model 中创建一个 user_id，将它指向 user model

```bash
rails g migration add_user_id_to_articles user_id:integer:index
```

在`app/models/article.rb` 中加上：

```ruby
class Article < ApplicationRecord
    belong_to :user
end
```

在 `app/models/user.rb` 中加上：

```ruby
class User < ApplicationRecord
  # 意为一个人有很多文章，当人不在时，文章也就没了
  + has_many :articles, dependent: :destroy

end
```

这时，在文章详情页，可以通过 `@article.user` 来获取这篇文章对应的用户信息：

```erb
<h2><%= @article.title %></h2>
<p><%= @article.content %></p>
<p>Written by <%= @article.user.name %></p>
```

当然，如果你想获取一个用户所写的所有文章，则是在个人页，找到用户后，就能展示：

```erb
<% @user.articles.each do |article| %>
    <h2><%= article.title %></h2>
    <p><%= article.body %></p>
<% end %>
```



### 转换日期

将 create_at 转换为 ”March 28, 2023“ 这种格式

用 Ruby 的 strftime 方法

```erb
<%= @article.created_at.strftime("%B %d, %Y") %>
```

- `%B`  表示月份的全名
- `%d` 表示日期（两位数）
- `%Y` 表示四位数的年份



### 建立评论model

建立 comment model

```bash
rails g model Comment body:text article:references user:references
```

迁移数据库

```bash
rails db:migrate
```

在建立 model 时，`models/comment` 就 belongs_to 文章和用户，即

```ruby
class Comment < ApplicationRecord
  belongs_to :article
  belongs_to :user
end
```

所以我们需要在文章模型和用户模型中都加一下拥有多个评论

```ruby
class User < ApplicationRecord
	...
  	has_many :articles, dependent: :destroy
  + has_many :comments, dependent: :destroy

end
```

```ruby
class Article < ApplicationRecord
    belongs_to :user

    + has_many :comments, dependent: :destroy
end
```

Comment 模型和 Article 和 User 模型已经关联好了

现在我们创建 comment 控制器

```bash
rails g controller comment
```

rails 会帮忙生成controller、view、helper 等文件，这里我们只用到`app/controllers/comments_controller`，在应用中，我们的文章页面下会有评论，所以不单独做页面

我们前往`config/routes.rb` ，在 articles 下新增 resources :comments

```ruby
  resources :articles do
    + resources :comments
  end
```

这是符合 restful 风格的，如果严格一点，再加上 `only: [:create, :destroy]`，只允许创建和删除，其他的接口不开放。回到最重要的 `comments_controller` 处，我们需要新增 create 和 destroy 方法，这里笔者尝试了一段时间不得解，还好借助 chatgpt 帮忙渡过，真乃神器

```ruby
class CommentsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_article!, only: %i[create destroy]

    def create
        @comment = @article.comments.create(comment_params)
        redirect_to article_path(@article)
    end

    def destroy
        @comment = @article.comments.find(params[:id])
        @comment.destroy
        redirect_to article_path(@article)
    end

    private

    def set_article!
        @article = Article.find(params[:article_id])
    end

    def comment_params
        params.require(:comment).permit(:body).merge(user: current_user)
    end

end
```

其中 ` @comment = @article.comments.create(comment_params)` 这行代码很有趣，读起来像英文，在文章的 comment 中创建一个评论，其中 comment_params 中有 `merge(user: current_user)` 意为当前用户



### Relationship 模型

一个用户可以关注别人，可以取关别人，别人也可以关注他，也可以去管他。用户之间的关注是多对多，笔者解释不了为什么再建一个表来关联两个用户，也许是性能，也许是结构，总之，笔者失败过，稚嫩的脸庞上多过一道泪痕

我们没必要创建 Relationship model 文件，直接创建迁移文件即可：

```bash
rails g migration CreateRelationship
```

修改迁移文件

```ruby
class CreateRelationship < ActiveRecord::Migration[7.0]
  def change
    create_table :relationships do |t|
      t.integer :follower_id
      t.integer :following_id

      t.timestamps
    end

    change_column_null :relationships, :follower_id, true
    change_column_null :relationships, :following_id, true
    add_index :relationships, :follower_id
    add_index :relationships, :following_id
  end
end
```

迁移数据

```bash
rails db:migrate
```

因为关注是和用户有关，所以我们前往`models/user` 模型，加入 relationships 与 user 的关联

```ruby
  
  has_many :articles, dependent: :destroy
  has_many :comments, dependent: :destroy
 
 + has_and_belongs_to_many :following,
 + class_name: 'User',
 + join_table: 'relationships',
 + foreign_key: 'follower_id',
 + association_foreign_key: 'following_id'

 + has_and_belongs_to_many :followers,
 + class_name: 'User',
 + join_table: 'relationships',
 + foreign_key: 'following_id',
 + association_foreign_key: 'follower_id'

```

模型建好了，接着弄 `config/routes`，[文档](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/) 上写的很清楚，他是在 profiles 路由下的动作，所以我们修改：

```ruby
- get '/:name', to: 'profile#show', as: :profile

+  scope :profiles do
+    get ':username', to: 'profiles#show'
+    post ':username/follow', to: 'profiles#follow'
+    delete ':username/follow', to: 'profiles#unfollow'
+  end

```

前往视图层：

```erb
<% if current_user.following?(@article.user) %>
    <%= button_to unfollow_user_path(@article.user.username), method: :delete, remote: true,
     form_class: "d-inline-block", class: "btn btn-sm btn-outline-secondary", id: "unfollow-button" do %>
        取消关注 <%= @article.user.username %>
    <% end %>
<% else %>
    <%= button_to follow_user_path(@article.user.username), method: :post, remote: true,
    form_class: "d-inline-block", class: "btn btn-sm btn-outline-secondary", id: "follow-button" do %>
        <i class="fa-solid fa-plus"></i>&nbsp;关注 <%= @article.user.username %>
    <% end %>
<% end %>
```

在上述示例中，我们通过 `button_to` 方法创建了一个链接，当用户点击该链接时，会向 `follow_user_path` 路径发送 POST 请求，并将 `remote` 参数设置为 `true`，以便在不刷新整个页面的情况下完成请求（ajax请求）

在  profiles 控制器中定义 `follow`、`unfollow` 动作，用于处理关注和取消关注事件，同时返回 JS 视图

```ruby
class ProfilesController < ApplicationController
    before_action :authenticate_user!, except: [:show]
    before_action :set_profile

    def show
    end

    def follow
        current_user.follow @user

        respond_to do |format|
            format.js
        end
    end

    def unfollow
        current_user.unfollow @user

        respond_to do |format|
            format.js
        end
    end

    private
    
    def set_profile
        @user = User.find_by_username(params[:username])
    end

end
```

其中，视图层中的`following?` 方法和控制器层的 `follow`、`unfollow` 方法我们都去`user` 模型中定义

```ruby
...
    def following?(other_user)
        following.include?(other_user)
    end

    def follow(user)
        following << user unless following.include? user   
    end

    def unfollow(user)
        following.delete(user)
    end
...
```

> 这里，笔者没有弄出 format.js ，因为加上后也没有效果，如果机会，会补上这块，也就是当点击关注后，接口请求成功后页面弹出 `已关注`，取消关注后，页面弹出`已取消`



### like 模型

按照上述的经验，我们知道了，如果是多对多，就需要建立一个中间表来存储两者之间的关系。如果要做某个用户给某篇文章点赞呢？也属于多对多关系，

基于 articles 和 user 模型建立新模型 Like：

```bash
# 创建 migration 文件
rails g model Like article:references user:references
# 运行 migration
rails db:migrate
```

前往`config/routes`:

```ruby
resources :articles do
    resources :comments, only: [:create, :destroy]
    
    member do
      post 'like'
      delete 'unlike'
    end
end
```

再去 `app/models/article.rb` 模型中，新增方法

```ruby
class Article < ApplicationRecord
    belongs_to :user

    has_many :comments, dependent: :destroy
    + has_many :likes, dependent: :destroy
    
    + def liked_by?(user)
    +    likes.where(user_id: user.id).exists?
    + end
end
```

再去控制器新增 like 和 unlike 方法

```ruby
 before_action :set_article, only: %i[ show edit update destroy like unlike ]

 def like
    unless @article.liked_by?(current_user)
      @like = @article.likes.create(user_id: current_user.id)
    end
    respond_to do |format|
        format.js
    end
  end

  def unlike
    if @article.liked_by?(current_user)
      @like = @article.likes.find_by(user_id: current_user.id)
      @like.destroy
    end
    respond_to do |format|
        format.js
    end
  end

```

其实，这个和 follow 很像，都是多对多的



### 标签模型

创建标签模型，它属于文章模型

建立一个多对多关系，一篇文章有多个标签，一个标签下有多篇文章

```bash
# 创建 Tag model
rails g model Tag name:string
# 修改 Article 模型文件。在 app/models/article.rb 文件中，添加以下代码
class Article < ApplicationRecord
  has_and_belongs_to_many :tags
end
# 修改 Tag 模型文件。在 app/models/tag.rb 文件中，添加以下代码
class Tag < ApplicationRecord
  has_and_belongs_to_many :articles
end
# 创建 articles_tags 关系表
rails g migration CreateJoinTableArticlesTags articles tags
# 运行 migration
rails db:migrate
```

如此，我们就建立起了多对多的关系

代码方面笔者踩了一下坑，首先要在` models/article `层注入：

```ruby
# 用于 view 层
def tag_list
    tags.map(&:name).join(",")
end
# 用于 controller 层
def sync_tags(tag_list)
    tagArr = JSON.parse(tag_list)
    tagArr.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name)

        tags << tag
    end
end
```

前往 `controllers/articles_controller.rb` 注入：

```ruby
def create
  @article = current_user.articles.new(article_params.except(:tag_list))

    respond_to do |format|
      if @article.save
        @article.sync_tags(article_params[:tag_list])
        ...
      else
        ...
      end
    end
end

def article_params
    # 新增 tag_list 变量
	params.require(:article).permit(:title, :description, :body, :tag_list)
end
```

再回到`views/articles` 层，在 body 下加入相关 tag 代码

```ruby
...
<div class="form-group mt-3">
    <%= f.hidden_field :tag_list, id: 'tag-input' %>
    <input 
      id="tag-field"
      class="form-control" 
      type="text"
      placeholder="输入标签" 
      onkeydown="addToList(event)"
      >

    <div class="tag-list mt-1" id="tag-list">
    </div>
</div>
```

当然，还有 js 代码，就不贴了，逻辑是，输入标签后回车，生成一个标签

受欢迎的标签，我们要通过查询来找到前十的

```ruby
# 获取最受欢迎的十大标签
tag_counts = Tag.joins(:articles_tags).group(:tag_id).order('count_all desc').limit(10).count
popular_tag_ids = tag_counts.keys
@popular_tags = Tag.where(id: popular_tag_ids).sort_by { |t| popular_tag_ids.index(t.id) }
```



## 查询功能

> 既然喜欢刺激，那就进行到底

既然做到这个份上了，那就把剩下的功能给补齐，这也是笔者最菜的地方——ORM

先补上`slug`，在文章详情中，我们是通过 id 来查询文章，这样不安全。我们可以用随机字符串，这里我们使用标题来作为我们查询点，专业术语叫“slug”，指「字符串转换成合法的URL路径的过程」

先在 `artilce model ` 中增加字段，然后再迁移数据

```bash
# 创建 migration 文件
rails g migration addSlugToArticle slug:string
# 修改 migration 文件，添加搜索索引
class AddSlugToArticle < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :slug, :string
  end

  + add_index :articles, :slug
end
# 运行 migration
rails db:migrate
```

前往`conf/routes`，在`resources :articles` 后加上` param: :slug`

```ruby
+ resources :articles, param: :slug do
    resources :comments, only: [:create, :destroy]

    member do
      post 'like'
      delete 'unlike'
    end
    
  end
```

将类似`<%= link_to article ...%>` 的地方改成 ` <%= link_to article_path(article.slug)` ，至于 sync_tags，我们因为有修改标签的操作，所以有标签时，更新原来的标签列表，但是笔者说过，操作数据库或者说 rails 相关的 api 接触的太少，所以笔者先把标签清空，再将新的标签放进去，也许会影响性能，但又有什么办法

```ruby
def sync_tags(tag_list)
    tagArr = JSON.parse(tag_list)
    # 如果已经有标签，删除原有标签
    if tags.any?
        tags.destroy_all
    end
    tagArr.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name)

        tags << tag
    end
end
```



## 订阅功能

到现在，我们已经完成了一个小论坛的基本雏形，现在，补上论坛中最重要的一点，订阅



```ruby
def feed
    user =  User.find(current_user.following_ids)
    @articles = Article.order(created_at: :desc).where(user:user).includes(:user)
end
```



## 分页功能

分页应该有很多 gem 库，从[Rails 谈谈 Rails 中的分页 - 简易版](https://ruby-china.org/topics/41094) 知道两个库，[kaminari](https://www.ruby-toolbox.com/projects/kaminari) 和  [pagy](https://www.ruby-toolbox.com/projects/pagy) 。两者相比， kaminari 更简单，pagy 复杂一点但性能更好，这里我以 kaminari 为例继续我的论坛项目

先加上 gem

```ruby
gem 'kaminari'
```

再安装它

```bash
bundle
```

生成默认配置

```
rails g kaminari:config
```

此时会生成 `config/initializers/kaminari_config.rb` ,我们修改配置

```ruby
# frozen_string_literal: true

Kaminari.configure do |config|
  config.default_per_page = 5 # 修改它,默认为25,将其修改为5做测试用
  # config.max_per_page = nil
  # config.window = 4
  # config.outer_window = 0
  # config.left = 0
  # config.right = 0
  # config.page_method_name = :page
  # config.param_name = :page
  # config.max_pages = nil
  # config.params_on_first_page = false
end
```

在 controller 层修改

```ruby
def index
- @articles = Article.order(created_at: :desc).includes(:user)
+ @articles = Article.page(params[:page]).order(created_at: :desc).includes(:user)
end
```

在 view 层加入

```erb
<% @articles.each do |article| %>
  <%= render article %>
<% end %>
+<div class="text-center">
+  <%= paginate @articles %>
+</div>
```

如下所示：

![使用kaminari](https://s2.loli.net/2023/04/08/WNCc3O1RaViygmZ.png)



但是样式还是默认样式，我们用 bootstrap5，所以尽量也用相关的UI，于是在 [RubyToolbox](https://www.ruby-toolbox.com/) 上找到了 [bootstrap5-kaminari-views](https://www.ruby-toolbox.com/projects/bootstrap5-kaminari-views) ，按照 demo 使用

```erb
<div class="text-center">
  +<%= paginate @articles, theme: 'bootstrap-5',
  +pagination_class: "flex-wrap justify-content-center" %>
</div>
```

样式是好了，但还是是英文的，所以还需要按照 i18n，所以还要安装 [kaminari-i18n](https://www.ruby-toolbox.com/projects/kaminari-i18n)，安装好 kaminari-i18n，UI 就成了我们想要的样子了

![加上i18n以及bootstrap5之后的kaminari](D:\Documents\PicGo Files\image-20230408074857093.png)

## 再次部署

我们还是在 fly.io 中部署，分两步，一是将项目重新部署下，二是迁入数据

```bash
# 实例化应用
fly launch
# 部署应用
fly deploy
# 打开应用
fly open
```

如此，我们能看到页面，但是因为创建的数据库没导入，所以会报错，我们需要迁入数据

```bash
# 进入控制台
flyctl ssh console
# 进入项目
cd rails
# 迁入数据
bin/rails db:migrate
```

这时， [https://underground-palace.fly.dev](https://underground-palace.fly.dev) 就能正常访问



## Logo设计

在项目初期阶段，完全不用担心 logo 的事情，没人会在意你，你要做的就是做个可以看的logo贴上去，如果在 logo 上花费太多时间，得不偿失

笔者习惯在 [favicon.io](https://favicon.io/) 中找 emoji 来做logo，这次也是，看到合适的，下载，然后把文件拉到 `public` 中即可



## 后记

我当然知道，如果要做一个完整的项目，以上这些是不够的，还要有更考究的UI、交互，还要加上搜索，静态资源的中文化、错误提示的中文化等等。但，那又怎么样呢
