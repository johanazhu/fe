# 前端学Ruby：论坛全栈项目



## 前言

我们上个项目做了一个 API 项目，只用到了 ruby on rails 中的一部分能力。这篇文章，笔者将做一个论坛类的全栈项目

因为笔者是前端的缘故，对数据库设计方面较薄弱，所以本次开发的UI和API都是模仿，严格意义来说，这是一次基于别人的 API、UI 模仿做的论坛项目

API 方面考察了 [cnodejs](https://cnodejs.org/api)、[ruby-china](https://api.ruby-china.org/) 以及 [v2ex](https://www.v2ex.com/help/api) 三个论坛的 API，最后打算采用ruby-china 的 API 作为本项目的参考对象，v2ex 公开的 API 数量太少，cnode 相较 ruby-china 的 API 简单，笔者想弄个稍微复杂点的，能对自己能力有所提高的项目，以及 ruby-china 是用 [ruby on rails](https://github.com/ruby-china/homeland) 写的，多多少少可以参考一下，所以 API 这块就参考 ruby-china

UI 方面，笔者从 [ruby on rails 论坛](https://discuss.rubyonrails.org/) 以及 [小众软件论坛](https://meta.appinn.net/) 得知了 [discourse](https://www.discourse.org/)，它是用 ruby on rails 写的开源论坛 sass 应用，项目地址：https://github.com/discourse/discourse。

UI 和 API 设计以及数据库（同 API 一样参考 ruby-china）有了参考对象后，论坛项目就能正式开始了

笔者将此论坛称为菩萨（Buddha），有人会问项目名这么大阿？其实，笔者一项有乱起名字的爱好，所以这次项目也延续以往的传统

## 知识点总结

rails 最佳实践

注册登录

jwt

数据库的连接

单元测试

接口文档

持续集成

持续部署







## 初始化项目

```bash
rails new --database postgresql --skip-test buddha
```

> 上个项目没有做单元测试，这个项目中会使用

项目建好后，命令行`rails s`，报错：

![报错信息](https://s2.loli.net/2023/02/23/Sh3HK8JRGjLE2wa.png)

说明我们数据库没连上，创建 postgresql 的用户名和数据库名

![创建postgresql](https://s2.loli.net/2023/02/23/gStElfdCm6DLIOk.png)

再去 `config/database.yml` 中修改开发环境时的数据库

```yml
development:
  <<: *default
  database: buddha_development
  username: buddha
  password: 123456
  host: localhost
```

重启启动项目 `rails s`，项目就正常运行了

我们先搞话题（topics）部分的 API，按照 ruby-china 中的

先建立话题模型（model），然后根据模型

```bash
rails g model topic
```

![建模](https://s2.loli.net/2023/02/23/Oy7ziYSfwAo4ZGT.png)

修改` db/migrate/20230219025936_create_topics.rb` 的内容

```ruby
class CreateTopics < ActiveRecord::Migration[7.0]
  def change
    create_table :topics do |t|
      t.integer :id, null: false # 话题编号
      t.string :title, null: false # 标题
      t.string :node_name, null: false # 节点名字
      t.integer :node_id, null: false # 节点 ID 
      t.boolean :excellent # 是否精华
      t.boolean :deleted # 是否已删除
      t.integer :replies_count, default: 0, null: false # 回帖数量
      t.integer :likes_count,  default: 0 # 赞数量
      t.integer :last_reply_user_id # 最后回复人用户编号
      t.string :last_reply_user_login # 最后回复者 login
      t.datetime :replied_at # 最后回帖时间
      t.timestamps
      # 关联 user 数据，user 先不加上去
      # t.references user #  最后回复者用户对象
    end
  end
end

```

命令 `rails db:migrate`，将修改同步到数据库中





GET /api/v3/hello 简单的 API 测试接口

![测试接口](https://s2.loli.net/2023/02/23/fIjgH9oC6AxVUtb.png)

（图中的rils是cmder显示不正确，应该是rails）



先做 话题

先在 `routes.rb` 中写入以下内容，它的意思

```ruby
Rails.application.routes.draw do

  root 'hello#index'

  namespace :api do
    namespace :v1 do
      resources :topics

    end
  end
end
```



![image-20230307170536412](D:\Documents\PicGo Files\image-20230307170536412.png)

先生成控制器

```shell
rails generate controller api/v1/topics
```





先添加视图





GET /api/v3/topics 获取话题列表

GET /api/v3/topics/:id 话题详情

POST /api/v3/topics 创建新话题

PUT /api/v3/topics/:id 修改话题

DELETE /api/v3/topics/:id 删除话题

POST /api/v3/topics/:id/replies 创建回帖

GET /api/v3/topics/:id/replies 话题的回帖列表

POST /api/v3/topics/:id/follow 关注话题

POST /api/v3/topics/:id/unfollow 取消关注话题

POST /api/v3/topics/:id/favorite 收藏话题

POST /api/v3/topics/:id/unfavorite 取消收藏话题

POST /api/v3/topics/:id/action?type=:type 话题动作接口

















## 附录

### ruby-china api 接口

GET /api/v3/hello 简单的 API 测试接口

账号

GET /api/v3/users 获取热门用户

GET /api/v3/users/:id 获取某个用户的详细信息

GET /api/v3/users/me 获取当前用户的完整信息

GET /api/v3/users/:id/replies 用户回帖列表

GET /api/v3/users/:id/topics 用户的话题列表

POST /api/v3/users/:id/block 屏蔽用户

POST /api/v3/users/:id/unblock 取消屏蔽用户

GET /api/v3/users/:id/blocked 获取当前用户的屏蔽列表

POST /api/v3/users/:id/follow 关注用户

POST /api/v3/users/:id/unfollow 取消关注

GET /api/v3/users/:id/following 获取用户的关注列表

GET /api/v3/users/:id/followers 获取用户的关注者列表

GET /api/v3/users/:id/favorites 获取某个用户的收藏列表

节点

GET /api/v3/nodes 获取节点列表

GET /api/v3/nodes/:id 节点详情

话题

GET /api/v3/topics 获取话题列表

GET /api/v3/topics/:id 话题详情

POST /api/v3/topics 创建新话题

PUT /api/v3/topics/:id 修改话题

DELETE /api/v3/topics/:id 删除话题

POST /api/v3/topics/:id/replies 创建回帖

GET /api/v3/topics/:id/replies 话题的回帖列表

POST /api/v3/topics/:id/follow 关注话题

POST /api/v3/topics/:id/unfollow 取消关注话题

POST /api/v3/topics/:id/favorite 收藏话题

POST /api/v3/topics/:id/unfavorite 取消收藏话题

POST /api/v3/topics/:id/action?type=:type 话题动作接口

回帖

GET /api/v3/replies/:id  获取回帖的详细内容

POST /api/v3/replies/:id 修改回帖

DELETE /api/v3/replies/:id 删除回帖

图片上传

POST /api/v3/photos 上传附件

点赞

POST /api/v3/likes 点赞

DELETE /api/v3/likes 取消赞

通知

GET /api/v3/notifications 获取用户的通知列表

POST /api/v3/notifications/read 批量将通知设成已读状态

GET /api/v3/notifications/unread_count 获取未读通知数量

DELETE /api/v3/notifications/:id  删除某个通知

DELETE /api/v3/notifications/all 清空通知



GET 获取指定主题 topics/:topic_id/replies







