# Ruby 导航

> 人与人的区别不是”受过教育“和”没受过教育“，而是”喜欢阅读“和”不喜欢阅读“ ——《纳瓦尔宝典》



写在前面，笔者是一名前端，现在来学习 ruby，打算写一系列的文章，将自己学习 ruby on rails 的经验分享出来，于是就有了这一系列文章：「**前端学Ruby：七天笔记**」

第一天 安装 Ruby、Rails

第二天 熟悉 Ruby 语法

第三天 熟悉 Rails

第四天 唐诗API 项目

第五天 唐诗项目部署优化

第六天 论坛全栈项目（一）

第七天 论坛全栈项目（二）



## 为什么要学 Ruby

因为笔者的榜样们学习过 Ruby，而且它的学习成本低。就想着花不了多少时间就能掌握一门后端语言。何乐而不为呢？



## 官方网站

Ruby （中文）官网：https://www.ruby-lang.org

Rails 官网网站：https://rubyonrails.org/

Rails API文档：https://api.rubyonrails.org/

中文版：http://www.ruby-lang.org/zh_cn

Ruby 中国：https://ruby-china.org/

Ruby Toolbox：https://www.ruby-toolbox.com/

Gems 仓库（类似于https://www.npmjs.com/）：https://rubygems.org/

anesome-ruby：https://github.com/markets/awesome-ruby

awesome-ruby-china（已停更，老贴精华不少）：https://github.com/liukun-lk/awesome-ruby-china

railstutorial 教程网（Ruby on Rails 教程此书的母网）：https://www.railstutorial.org/

Rails 论坛：https://discuss.rubyonrails.org/

Ruby on Rails 现代学习网站：https://gorails.com/

老牌Ruby on Rails 学习网站：http://railscasts.com/



## 书籍推荐

Ruby相关的书：https://github.com/EZLippi/practical-programming-books#ruby

别人总结的书单：https://github.com/dingyi-History/learn-Ruby-rails/tree/master/docs

《Ruby on Rails Tutorial》中文版：https://zuoming.gitbooks.io/-ruby-on-rails-tutorial-/content/

Ruby on Rails 实战圣经（繁体版）：https://ihower.tw/rails/index.html

- 中文版：https://www.bookstack.cn/read/ihower-ruby-on-rails/preface.md

[《笨方法学 Ruby》](http://lrthw.github.io/)

[《应用Rails进行敏捷Web开发》](https://book.douban.com/subject/1839273/)

[免费编程图书列表](https://ebookfoundation.github.io/free-programming-books/books/free-programming-books-zh.html#ruby)



## 教程

李笑来当初五万的全栈营（已免费）⭐：https://fullstack.qzy.camp/

方应杭 Vue3+Rails 全栈项目⭐：https://www.bilibili.com/video/BV1AZ4y1r7eU

gorails 面对初学者的视频教程（英文视频）⭐： https://gorails.com/start

B站：重力不足的 Ruby 教程：https://space.bilibili.com/25990460

麦子学院 Ruby 全栈：https://space.bilibili.com/286293946

rubyonrails教程：https://guides.rubyonrails.org/

hotrails教程：https://www.hotrails.dev/turbo-rails

Rails 使用 Rails 构建 API 实践：https://ruby-china.org/topics/25822

菜鸟教程：https://www.runoob.com/ruby/ruby-intro.html



## 牛人

[DHH](https://dhh.dk/)：Rails 的创造者，丹麦人

- 赛车手，2014年二十四小时汽车耐力赛冠军
- 作家，他还是[《Rework》](https://book.douban.com/subject/3889178/)（重来）和[《Remote》](https://book.douban.com/subject/21362627/)作者
- 黑客，2005获得谷歌最佳黑客
- 他现在还在[更文](https://world.hey.com/dhh)，Rails 也收到了一些[危机](https://geeknote.net/Rei/posts/397)
- 看他简介，吓得要死，什么都会，而且都获得了很好的成就。古云生子当如孙仲谋，DHH 简直当代孙权

[TJ](https://github.com/tj)：熟悉前端的人都知道他

- 开源狂魔：开源几百个npm包
- 异于常人的勤奋：曾经1年10000多commit
- express 和 koa 的作者
- 后来创建公司去搞 Go 了，不过他的传说一直留在前端界

[方应杭](https://fangyinghang.com)：看了他的视频介绍（就是上面的 Vue3+Rails 全栈项目）才决定学 Ruby 的

[Rei](https://chloerei.com/)：[Ruby China 中文社区](https://ruby-china.org/Rei)的管理员，现阶段也在 [BiliBili](https://www.bilibili.com/video/BV1QD4y1A75x/) 上传道

[张文细](https://ihower.tw)：台湾人，[Ruby on Rails 實戰聖經](https://ihower.tw/rails) 作者，他的 [博客](https://ihower.tw/blog/) 一直在更新，老码农了

[1c7](https://1c7.me/)：著有[中国独立开发者项目列表](https://github.com/1c7/chinese-independent-developer)，也是 ruby 开发者

当然还有一些大牛，只是对其不了解，欢迎留言补充



## 如何学习

Ruby 社区有人写的[如何从零开始学会 Ruby on Rails](https://ruby-china.org/wiki/start_leaning_rails)

大致花一个月时间

**以下步骤请一步一步来，切勿心急跳过，最好连我上面的链接都不要提前点击！**

1. 看完 [https://ruby-china.github.io/rails-guides/getting_started.html](https://ruby-china.github.io/rails-guides/getting_started.html) 
2. 通过学习 Rails Guides 实现一个博客系统，包涵完整的功能（包括UI），预计两周
3. 从头到尾一字不漏的看完 《[应用Rails进行敏捷Web开发](https://book.douban.com/subject/1839273/)》
4. 回头审视之前的博客设计和《应用Rails进行敏捷Web开发》的区别，可以再重新搞个博客
5. 看完 《[Getting Real](https://web.archive.org/web/20120104065141/http://gettingreal.37signals.com/GR_chn.php)》，预计两个小时
6. 搞明白 Gem，RVM，Bundler 是什么
7. 看完 《Rework》，中译文《重来》（微信读书上有）
8. 看 [http://railscasts.com](http://railscasts.com/) 的视频教程，从第一页开始看，可以学到很多技巧，以免走弯路。



## 我的学习路径

以上推荐的书、视频多多少少看过，不过有些看完，有些没看完。当笔者完成「[如何从零开始学会 Ruby on Rails](https://ruby-china.org/wiki/start_leaning_rails)」后，想着再精进精进。找了半天，发现的教程不是太老就是全英文。笔者在某日某刻看到一篇“learn by making”的学习方法，想着以练代学的方式，把自己原先想做的项目通过 ruby 实现，慢慢地就有了这一系列文章
