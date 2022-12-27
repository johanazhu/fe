# 前端学 Ruby：安装Ruby、Rails



## Ruby 是什么

Ruby 是一个注重均衡的语言，它的发明者[松本行弘](https://matz.rubyist.net/)，混合了他喜欢的多门语言（Perl、Smalltalk、Eiffel、Ada 和 Lisp），创造出了一种兼具函数式编程和命令式编程特色的新语言

他是“试着让 Ruby 更自然，而不是更简单”，让一切符合生活常规

除此之外，他还提到：

> Ruby 就像人的身体一样，表面上看来简单，但是内部却相当复杂



## 如何安装 ruby

笔者所用的电脑是 window，在此基础上有多种方法安装、使用 ruby，一是直接下载 window 版的 ruby；二是先安装 docker，后下载 linux 镜像，在 linux 环境中安装 ruby；三是安装 docker 后，直接下载 ruby 镜像

如果是在 window 中，先在[下载地址](https://rubyinstaller.org/downloads/)里下载自己想要的版本

如果是在 linux （docker 中或者服务器）中

1. 下载最新版的 Ruby 压缩文件

```bash
wget https://cache.ruby-lang.org/pub/ruby/3.1/ruby-3.1.3.tar.xz
# curl https://cache.ruby-lang.org/pub/ruby/3.1/ruby-3.1.3.tar.xz
```

2. 下载 Ruby 之后，使用下面的命令解压：

```bash
tar -xvzf ruby-3.1.3.tgz    
cd ruby-3.1.3
```

3. 配置并编译源代码

```bash
./configure
make
sudo make install
```

4. 安装后，通过在命令行中输入以下命令来确保一切工作正常

```bash
ruby -v
ruby 3.1.3
```

如果是下载 ruby 镜像

1. 拉取 ruby 镜像

```shell
docker pull ruby
```

2. 基于 ruby 镜像生产一个容器

```shell
docker run -it 
```

当然，也可以用 [vscode + dev-container](https://blog.azhubaby.com/2022/12/10/2022-12-10-%E6%8F%90%E9%AB%98%E5%BC%80%E5%8F%91%E4%BD%93%E9%AA%8C%EF%BC%9Adev-container/) 来在 vscode 中生成一个 linux，linux 安装 ruby 来做开发

## RubyGems

RubyGems 是 Ruby 项目的包管理工具。有很多有用的代码库（包括 Rails）都可以通过包（或叫做 gem）的形式获取

因为下载了 ruby，自带了 gem，就好比下载了 node，自带了 npm

```bash
gem -v 
#3.3.26
```

> 很有意思：ruby 的英语意思是红宝石，gem 的意思是宝石

### Ruby镜像源替换

添加镜像的目的是为了下载依赖包的时候速度更快，就好比 npm 的国内镜像 cnpm

查看当前镜像

```bash
gem source l # 或者 gem source
# 结果
# *** CURRENT SOURCES ***

# https://rubygems.org/
```

添加国内镜像：

```bash
gem sources --add https://gems.ruby-china.com/
```

再次查看镜像：

```bash
gem sources -l
# *** CURRENT SOURCES ***

# https://rubygems.org/
# https://gems.ruby-china.com/
```

用 --add 添加地址，--remove 删除地址

```bash
 gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
```

### gem 命令

- gem list：查看所有的包
- gem install xx：下载应用包
- gem uninstall：卸载应用包
- gem sources：查看当前镜像

## 安装 Rails

Rails 是什么？

Rails 是使用 Ruby 语言写的 Web 应用框架。它有两大指导“思想”

- 不要自我重复（DRY）
- 多约定，少配置

因为有包管理工具，所以下载就可以

github 源码地址：https://github.com/rails/rails

```shell
gem install rails
```

安装完毕后，执行 `rails -v` 检查是否安装成功

```bash
rails -v
# Rails 7.0.4
```

当然， rails 还有很多命令，如 

```bash
rails new blog # 生成一个 blog 项目
rails new --api blog # 以 API 形式生成一 blog 项目
rails new -h # 查看所有命令行选项
rails new --api --database=postgresql --skip-test blog # 创建一个数据库为 postgresql 的跳过测试的 api 博客（blog）项目
```



## 第一个程序

使用 rails 新建项目，它就像 express-generator 一样，所有的配置都帮你弄好，你要写东西就很方便

```bash
rails new first_app
```

目录结构

| 文件/文件夹               | 作用                                                         |
| ------------------------- | ------------------------------------------------------------ |
| `app/`                    | 包含应用的控制器、模型、视图、辅助方法、邮件程序、频道、作业和静态资源文件。这个文件夹是本文剩余内容关注的重点。 |
| `bin/`                    | 包含用于启动应用的 rails 脚本，以及用于安装、更新、部署或运行应用的其他脚本。 |
| `config/`                 | 配置应用的路由、数据库等。详情请参阅[配置 Rails 应用](https://ruby-china.github.io/rails-guides/configuring.html)。 |
| `config.ru`               | 基于 Rack 的服务器所需的 Rack 配置，用于启动应用。           |
| `db/`                     | 包含当前数据库的模式，以及数据库迁移文件。                   |
| `Gemfile`, `Gemfile.lock` | 这两个文件用于指定 Rails 应用所需的 gem 依赖。Bundler gem 需要用到这两个文件。关于 Bundler 的更多介绍，请访问 [Bundler 官网](http://bundler.io/)。 |
| `lib/`                    | 应用的扩展模块。                                             |
| `log/`                    | 应用日志文件。                                               |
| `public/`                 | 仅有的可以直接从外部访问的文件夹，包含静态文件和编译后的静态资源文件。 |
| `Rakefile`                | 定位并加载可在命令行中执行的任务。这些任务在 Rails 的各个组件中定义。如果要添加自定义任务，请不要修改 Rakefile，直接把自定义任务保存在 `lib/tasks` 文件夹中即可。 |
| `README.md`               | 应用的自述文件，说明应用的用途、安装方法等。                 |
| `test/`                   | 单元测试、固件和其他测试装置。详情请参阅[Rails 应用测试指南](https://ruby-china.github.io/rails-guides/testing.html)。 |
| `tmp/`                    | 临时文件（如缓存和 PID 文件）。                              |
| `vendor/`                 | 包含第三方代码，如第三方 gem。                               |
| `.gitignore`              | 告诉 Git 要忽略的文件（或模式）。详情参见 [GitHub 帮助文档](https://help.github.com/articles/ignoring-files)。 |

其中 `Gemfile` 相当于前端中的 `package.json`，`Gemfile.lock`相当于`package.lock`

但当你使用初始化项目时，会报错：

![初始化项目报错](https://s2.loli.net/2022/12/27/x1WtoDhczqUaAYT.png)

[其原因](https://stackoverflow.com/questions/74685832/command-rails-server-doesnt-work-cmd-throws-error-with-bootsnap)是在路径中使用了中文，所以换个路径就好

也有些人因为没有FQ技术，所以下载依赖的速度很慢，可以把`Gemfile` 中顶部的 `source "https://rubygems.org"` 换成国内镜像`source "https://gems.ruby-china.com/"`，并且删掉 `Gemfile.lock`，重新下载依赖

下载依赖是通过 `bundle install` ，相当于前端的 `npm install`

```bash
bundle install 
```

如何启动项目呢，在前端开发中，有 package.json，能在 script 中写命令。而 rails 不同，它的 `Gemfile` 没有运行文件的命令，但是它自身的命令行就带有启动文件的快捷键：

```bash
rails server # 启动服务
rails s -p 8080 # s 为 server 缩写，-p 8080 表示指定8080的端口
```

如此， rails 应用就启动了

![ruby on rails运行成功](https://s2.loli.net/2022/12/27/uFNbqIgzw8PEtL5.png)



## 官方官网

ruby （中文）官网：https://www.ruby-lang.org

rails 官网网站：https://rubyonrails.org/

中文版：http://www.ruby-lang.org/zh_cn

Ruby 中国：https://ruby-china.org/

anesome-ruby：https://github.com/markets/awesome-ruby

awesome-ruby-china（停更3年）：https://github.com/liukun-lk/awesome-ruby-china



## 总结

本文的主要目的是让 ruby on rails 能在 window 上运行起来，在 window 上运行确实还有坑，即使没有4、5年前那么多，但还是有个坑让我踩进去了，这里仅作记录

我们现在已经安装了 ruby、rails，并且启动项目，但到现在一行代码都不会写，下一篇，我们熟悉 ruby 的语法——智人取火



## 参考资料

- [Rails 入门](https://ruby-china.github.io/rails-guides/getting_started.html)

