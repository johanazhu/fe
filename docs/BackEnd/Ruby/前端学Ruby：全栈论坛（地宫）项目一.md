# 前端学Ruby：全栈论坛（地宫）项目一

本来想做 [buddha](https://github.com/johanazhu/buddha)（菩萨）论坛的，发现自己参考的项目太难实现，猝

笔者回炉重修了一番，正好发现了 realworld，遂决定将 realworld 项目代替原先的 buddha 项目，还是要量力而行，不要一意孤行（项目规划太大，浪费太多时间学习）

先介绍一下 realworld 项目

源码：https://github.com/gothinkster/realworld

demo：https://demo.realworld.io/#/

UI：https://github.com/gothinkster/conduit-bootstrap-template

页面分析：https://www.jianshu.com/p/6014a9fefabd

从页面角度讲，只有七个页面，即

- 首页（index）
- 文章详情页（article）
- 登录页（login）
- 注册页（register）
- 写文章页（editor）
- 设置页（settings）
- 个人页（profile）

接口方面和数据结构直接看 [文档](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints) 就好，不说虚的，这个项目有19个接口，19个接口放其他语言要做多久？不知道，但 Ruby 应该花不了多少时间

介于此项目是个全栈项目，遂会前后端穿插地写，项目名我起好了：地宫（Underground Palace）



## 文章目录

搭建项目并部署

使用脚手架创建 article 

穿上 bootstrap

新增fontawesome 

device 用户体系

devise-i18n国际化

设置页

个人页

模型建立

查询功能

订阅功能

分页功能

再次部署

logo设计

后记

## 搭建项目并部署

我们先新建项目

```bash
rails new underground-palace
cd list
```

然后去 `config/routes.rb` 中修改根目录：

```ruby
Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "rails/welcome#index"
end
```

我们通过 fly.io 来部署我们的服务，对其不过多介绍，具体可看上篇文章——[前端学Ruby：唐诗项目部署优化](./前端学Ruby：唐诗项目部署优化)

```bash
fly launch # 创建
fly deploy # 部署
fly open # 打开刚刚部署的项目
```

![fly launch](https://s2.loli.net/2023/03/23/OozjlXx2UpvI4Wd.png)

此时访问 `https://underground-palace.fly.dev/` （这里我们的 underground 少写了一个字母，无伤大雅，后续已修正）就能看到刚还在本地新建的项目，是不是很快，有点意想不到的感觉

## 使用脚手架创建 article 

rails 的一个特点是一个命令就做很多事情，例如接下来我们要用 `rails generate scaffold` 完成 article 的增删改查

```bash
rails g scaffold article title:string description:string body:text 
rails db:migrate # 数据迁入
```

并且修改`config/routes.rb` ：

```ruby
Rails.application.routes.draw do
  resources :articles
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "articles#index"
  # root "rails/welcome#index"
end
```

如此，用脚手架搭建的文章的增删改查就完成了，是不是很快

![增删改查](https://s2.loli.net/2023/03/23/a7Hzw4iNLcWGtMh.gif)

## 穿上 bootstrap

realworld 项目是基于 bootstrap 的，我们需要下载 bootstrap 的 gem

这里需要做一下说明，像 [bootstrap-sass](https://www.ruby-toolbox.com/projects/bootstrap-sass) gem 是基于 bootstrap 3 的样式，[bootstrap](https://www.ruby-toolbox.com/projects/bootstrap) gem 是最新版的 boostrap，也可以理解为 bootstrap 3 及一下可使用 bootstrap-sass，反之则用 boostrap

因为 realworld 是基于 bootstrap4.0.0，所以下载时我们需要先设定好版本。按照 [readme](https://www.ruby-toolbox.com/projects/bootstrap) 的步骤，在 gemfile 文件中引入 `boostrap` 和 `jquery-rails` 包，再新增 `common/footer` 和 `common/header` 页面，将模板代码放进去

但是 readlworld 所提供的 [bootstrap](https://github.com/gothinkster/conduit-bootstrap-template) 和 [线上版本 ](https://demo.realworld.io/#/)有差异，并不是直接引用能用（后续看到文档中有现成的 [模板](https://realworld-docs.netlify.app/docs/specs/frontend-specs/templates)，但不知道有没有坑）

既然选择了做用 bootstrap 来做UI，索性用最新的 bootstrap5

我们不按照 gem 方式引入 bootstrap，用 `cssbundling-rails`、` jsbundling-rails` 来构建资源

```
bundle add cssbundling-rails jsbundling-rails 
```

查找我们与 css 相关的构建命令

```bash
rails | grep css
```

![查看css](https://s2.loli.net/2023/03/27/OiI8AeSd3LNh1Do.png)

同理查看我们与 javascript 构建相关的命令

```bash
rails | grep javascript
```

我们下载 bootstrap，基于 yarn

```bash
rails css:install:bootstrap
```

下载 esbuild，也是基于yarn下载，

```bash
rails javascript:install:esbuild
```

但是报错 `Could not resolve "app/javascript/*.*"`

![window中下载esbuild报错](https://s2.loli.net/2023/03/27/4hiOd5HpMQujIWJ.png)

不用慌，去`package.json` 修改 build 中的配置，将`esbuild app/javascript/*.* --bundle --sourcemap... ` 改成 `esbuild app/javascript/application.js --bundle --sourcemap...`

并执行 `npm run build` 执行代码，当然，有些文件需要隐藏的这里不做过多描述

当能 build 成功后，我们开发就是用`bin/dev` 命令来开发

但因为笔者使用的是 window 系统，所以会因此报错：

![unset为linux命令，报错](https://s2.loli.net/2023/03/27/4XlimQv5stJSKjr.png)

 `unset` 不是 window 的命令，所以我们要改造，前往根目录下的 `Procfile.dev` 修改：

```txt
web: set "PORT=" && rails s
css: yarn build:css --watch
js: yarn build --watch
```

此时执行 `/bin/dev` 就能启动我们的项目了，其以上代码是启动 rails 服务，css 和 js 都是通过 yarn build 打包后监听（watch）变化，所以能做到热更新

## 新增fontawesome

按照好 bootstrap 后还不够，还需要安装图标，例如我们常用的fontawesome

首先安装 Font Awesome：

```bash
yarn add @fortawesome/fontawesome-free
```

然后在 `config/initializers/assets.rb` 添加以下内容：

```bash
Rails.application.config.assets.paths << Rails.root.join('node_modules/@fortawesome/fontawesome-free/webfonts')
```

最后在 `app/assets/stylesheets/application.sass.scss` 添加以下内容：

```bash
$fa-font-path: ".";

@import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
@import "@fortawesome/fontawesome-free/scss/solid.scss";
```

接着就是把具体的 `articles`、`articles#show`、`articles#new`页面的模板样式补充好

## 用户体系

我们使用 [devise](https://www.ruby-toolbox.com/projects/devise) 来做我们的登录注册

安装  `devise` gem 包

```bash
bundle add devise
```

运行以下命令生成 Devise 文件

```bash
rails g devise:install
```

创建一个用户模型（例如`User`），并运行以下命令生成 Devise 所需要的视图和控制器：

```bash
rails g devise user
```

运行数据库迁移以创建 Devise 所需要的表

```bash
rails db:migrate
```

如此这般，登录注册忘记密码等一系列 CRUD 就做好了，我们只需要在 `header.html.erb` 中修改配置，将未登录时显示登录注册样式即可，即

```erb
...
<% if !current_user %>
        <!-- 未登录 -->
        <div class="col-md-3 text-end">
          <%= link_to '注册', new_user_registration_path, class: 'btn btn-outline-primary me-2' %>
          <%= link_to '登入', new_user_session_path, class: 'btn btn-primary' %>
        </div>
<% else %>
 <!-- 登录 -->
<% end %>
...
```

默认情况下，我们是看不到 devise 的视图和控制器的，因为我们要修改 UI，所以将视图释放出来：

```bash
rails g devise:views
```

前往视图层，修改`views/devise/registrations/new.html.erb` （注册页）和`views/devise/session/new.html.erb`（登录页）的样式

默认情况下，注册、登录的路由是`users/sign_up` 和`users/sign_in`，和传统意义上的注册、登录路由不符，这里做一下映射，前往`config/routes.rb`中修改：

```ruby
Rails.application.routes.draw do
    
  - devise_scope :user
  + devise_scope :user do
  +   get '/login' => 'devise/sessions#new'
  +   get '/register' => 'devise/registrations#new'
  + end
	...
end

```

并前往`views/common/_header.html.erb` 中修改代码：

```erb
<!-- 未登录 -->
<div class="col-md-3 text-end">
  <%= link_to '注册', register_path, class: 'btn btn-outline-primary me-2' %>
  <%= link_to '登入', login_path, class: 'btn btn-primary' %>
</div>
```

静态页面放进后，现在我们要考虑的是将其动态化，首先改造的是注册页面，我们用`form_for` 来做表单，这里需要注意的是，在 devise 默认的字段里没有 username，我们需要加上

创建一个 migration 文件，用于向 User 模型添加 username 字段

```bash
rails g migration AddUsernameToUser username:string:uniq
```

> uniq表示唯一

将这个 migration 迁移至数据库

```bash
rails db:migrate
```

在 `models/user.rb` 中新增对 username 的验证

```ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { minimum: 3, maximum: 25 }

end
```

- `presence: true` 验证：该属性必须存在（不能为 `nil` 或空白字符串）
- `uniqueness: { case_sensitive: false }` 验证：该属性的值必须是唯一的（即数据库中不存在相同的值）。此外，该验证规则将忽略大小写，因此类似的两个字符串，例如 `abc` 和 `ABC`，将被认为是相等的
- `length: { minimum: 3, maximum: 25 }` 验证：该属性的长度必须介于 3 到 25 个字符之间

修改注册页面视图，新增用户名样式

```erb
<%= form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>
  ...
  <div class="form-group mb-3">
    <%= f.text_field :username, autofocus: true, autocomplete: "username", 
    class: "form-control form-control-lg",
    placeholder: "用户名" %>
  </div>
  ...
<% end %>
```

在改造时，我们还需要生成 devise 的控制器，让表单在提交时前往正确的控制器处（因为我们定制了登录注册路径，而不是用默认的，所以还要改造）

```bash
rails g devise:constroller -c # 生成所有 devise 的控制器
```

再在 `config/routes.rb` 中修改

```ruby
 ...
 devise_for :users, path: "", path_names: {
    sign_in: "login",
    sign_out: "logout",
    sign_up: "register" 
  }, controllers: {
    registrations: "users/registrations",
    sessions: "users/sessions",
  }
  devise_scope :user do
    get '/login' => 'devise/sessions#new'
    get '/register' => 'devise/registrations#new'
  end
  ...
```

如此，注册页面就改造完了，继续改造登录页面

## devise-i18n国际化

当我们做完登录页之后，提示报错信息还都是英文的，这次需要引入 i18n 来做中文提示

老规矩，先安装 `devise-i18n` gem

```bash
bundle add devise-i18n
```

在 `config/application.rb` 文件中添加如下代码：

```ruby
config.i18n.default_locale = "zh-CN"
```

执行 devise:i18n 生成中文命令

```bash
rails generate devise:i18n:locale zh-CN
```

再去`config/locales/devise.zh-CN.yml` 中修改不满意的翻译，如此就完成了国际化

如此我们已经完成了5个页面，即首页、文章详情页、登录页、注册页、写文章页，还剩下设置页和个人页

## 设置页

如果说 article 和 user 是通过命令行来生成的，那么接下来的两个页面（设置、个人页），就是我们正常开发时的开发流程

先创建一个 Settings 控制器：

```bash
rails g controller Settings index
```

在 `config/routes.rb` 中新增一个 "seetings" （单数资源）资源路由，开放 show 和 update ：

```ruby
resource :settings, only: [:show, :update]
```

创建 `app/views/settings/index.html.erb` 页面，加上 bootstrap 样式，settings 的静态页面就能访问了

看静态页面我们就知道，users 数据中我们还缺少头像（avatar）和简介（bio），所以我们需要在 users 表中新增两个字段

生成一个迁移文件，该文件添加 avatar 和 bio 列到 users 表中

```bash
rails g migration AddAvatarAndBioToUsers avatar:string bio:string
```

运行 `rails db:migrate` 修改数据库中的表

```bash
rails db:migrate
```

接着我们前往 `settings_controller.rb`  控制器，修改为后续渲染页面

```ruby
class SettingsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_user

    def show
    end

    def update
       if @user.update(user_params)
            # 后续跳转到个人设置页面
            redirect_to root_path
            flash[:notice] = '修改成功'
        else
            render :show
        end
    end
    
    private

    def set_user
      @user = current_user
    end

    def user_params
        params.require(:user).permit(:username, :email, :avatar, :bio)  
    end
end
```

同样，视图也要修改，删除更改密码一栏，为什么呢？因为 devise 中修改密码，需要输入原密码，是很麻烦的，笔者尝试了一下，放弃了

## 个人页

我们继续做个人页，也是我们的最后一个页面，虽然还有很多细节（比如评论、点赞文章、收藏文章等逻辑），但是从页面的角度讲，这就是最后一个页面了

先建立控制器

```bash
rails g controller profile
```

在 `config/routes.rb` 处，新增一个路由映射

```ruby
get '/:name', to: 'profile#show', as: :profile
```

前往`views/common/_header.html.erb` 处，修改原来的 username 视图

```erb
 <li class="nav-item">
    <%= link_to profile_path(current_user.username), class: "nav-link px-2" do %>
      <%= image_tag current_user.avatar, alt: "avatar", class: "user-pic" %>
      <%= current_user.username %>
    <% end %>
  </li>
```

然后我们去 `view/profile/show.html.erb` 写好我们的静态页面，7个页面就此完成，但这只完成了一半。接下来，我们要对页面进行改造，加上文章评论、点赞/取消点赞、关注/取消用户等等功能

如此，已经耗尽一天功夫，休息一晚，明天再战
