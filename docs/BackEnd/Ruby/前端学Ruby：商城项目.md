# 前端学 Ruby：商城项目





先建一个项目

```bash
rails new b2c_shop --skip-bundle --skip-turbolinks -d postgresql
```

- --skip-bundle：跳过直接下载依赖，因为我们要修改gem源，改成中国的会快点
- --skip-turbolinks：xx

> window 上弄 mysql 问题一堆，改数据库把

修改数据库配置

```yml
development:
  <<: *default
  database: b2c_shop_development
  username: postgres 
  password: 123456
  host: localhost
```

添加三个 gem文件

```ruby

gem "sassc-rails" # 使用 Sass 处理 CSS
gem 'jquery-rails' # 使用 jquery
gem "bootstrap-sass"
gem "font-awesome-rails"
gem "sorcery" # session 管理
```

然后再下载依赖，下载完之后会在 app assets 中 的 css 、js 中看到相关文件

把 stylesheets 文件中的 `application.css` 改成 `application.scss`，并在文件中添加

```scss
@import "bootstrap-sprockets";
@import "bootstrap";
@import "font-awesome";
```

基于 sorcery 创建文件

```bash
rails -g sorcery:install
```

> 它的特点是不用手动去创建代码，用命令行的方式批量创建代码

```bash
rails generate sorcery:install user_activation rememver_me reset_password --only-submodules
```

> --only-submodules 只添加子模块

```bash
# 查看 sorcery 帮助，相当于看说明书
rails g sorcery:install -h
```

接着执行数据库指令

```bash
# 同步到数据库
rails db:migrate
```

找到 sorcery.rb，在 285 行修改文件

```ruby
user.user_activation_mailer = nil # 是否激活邮件
user.activation_mailer_disabled = true # 是否发送激活邮件，不发送
user.prevent_non_active_users_to_login = false # 用户登录的时候是否阻止
```



### 写页面

创建首页

```bash
rails g controller weclome index
```





