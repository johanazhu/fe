# 前端学 Ruby：安装Ruby、Rails



## Ruby 是什么

Ruby 是一个注重均衡的语言，它的发明者[松本行弘](https://matz.rubyist.net/)，混合了他喜欢的多门语言（Perl、Smalltalk、Eiffel、Ada 和 Lisp），创造出了一种兼具函数式编程和命令式编程特色的新语言

他“试着让 Ruby 更自然，而不是更简单”，让一切符合生活常规

除此之外，他还提到：

> Ruby 就像人的身体一样，表面上看来简单，但是内部却相当复杂



## 如何安装 ruby

笔者所用的电脑是 window，在此基础上有多种方法安装、使用 ruby，一是直接下载 window 版的 ruby；二是先安装 docker，后下载 Linux 镜像，在 Linux 环境中安装 ruby；三是安装 docker 后，直接下载 ruby 镜像

如果是在 Window 中，可以在[官网](https://rubyinstaller.org/downloads/)或者[国内镜像源](https://rubyinstaller.cn/)处下载使用

如果是在 Linux 中，可以在[官网](http://www.ruby-lang.org/zh_cn/downloads/)里下载

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

如果用 docker 

1. 拉取 ruby 镜像

```bash
docker pull ruby
```

2. 基于 ruby 镜像生产一个容器

```bash
docker run -it 
```

当然，也可以用 [vscode + dev-container](https://blog.azhubaby.com/2022/12/10/2022-12-10-%E6%8F%90%E9%AB%98%E5%BC%80%E5%8F%91%E4%BD%93%E9%AA%8C%EF%BC%9Adev-container/) 来在 vscode 中生成一个 Linux，Linux 安装 ruby 来做开发

除了直接下载 ruby 外，还可以下载 RVM，它可以管理多个版本的 Ruby，就像前端概念里的 nvm

## RVM

[RVM](http://rvm.io/) 能在系统中安装和管理多个 Ruby 版本。同时还能管理不同的 gem 集。支持 macOS、Linux 和其它类 UNIX 操作系统

```bash
gpg2 --keyserver keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
```

```bash
\curl -sSL https://get.rvm.io | sudo bash -s stable
```

```bash
# 当 rvm 安装好后，看下图的提示操作
sudo usermod -a -G rvm johan # 将当前用户添加到 rvm 组中
su root # 切换到root，相当于先注销 johan
su johan # 切换会johan，相当于登录 johan
source /etc/profile.d/rvm.sh # 让命令生效
```

![安装完rvm后的提示](https://s2.loli.net/2023/03/08/59NaFCtPhqEinXR.png)

```bash
# 设置为系统默认版本
rvm use --default 2.2.3
# 在其他版本之前切换
rvm use 2.2.1
# 卸载一个指定版本
rvm uninstall 2.2.1
```



## Gems

RubyGems 是 Ruby 项目的包管理工具。有很多有用的代码库（包括 Rails）都可以通过包（或叫做 gem）的形式获取

因为下载了 ruby，自带了 gem，就好比下载了 node，自带了 npm

```bash
gem -v 
#3.3.26
```

> 有意思的是：ruby 的英语意思是红宝石，gem 的意思是宝石

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

### 国内其他镜像源

> 在部署时，ruby-china 的源会抖动连接不上，可以通过换源或者在开发时将源下载下来，用本地源来代替（唐诗项目遇到的坑）

中科大：http://mirrors.ustc.edu.cn/help/rubygems.html 

清华：https://mirrors.tuna.tsinghua.edu.cn/help/rubygems/ 

阿里：https://mirrors.aliyun.com/rubygems/

### gem 命令

- gem list：查看所有的包
- gem install xx：下载应用包
- gem uninstall：卸载应用包
- gem sources：查看当前镜像

### 命令行

当安装完 ruby 后，打开命令行输入 irb，即可进入irb 运行环境，这就像输入 node 进入 node 运行环境，输入 python ，进入 python 运行环境

## 安装 Rails

Rails 是什么？

Rails 是使用 Ruby 语言写的 Web 应用框架。它有两大指导“思想”

- 不要自我重复（DRY）
- 多约定，少配置（约定大于配置）

因为有包管理工具，所以下载就可以

github 源码地址：https://github.com/rails/rails

```bash
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
rails new --css bootstrap blog # 以 bootstrap 作为css生成一 blog 项目
rails new --database postgresql blog # 以 postgressql 作为数据库生成项目
rails new -h # 查看所有命令行选项
rails new --api --database=postgresql --skip-test blog # 创建一个数据库为 postgresql 的跳过测试的 api 博客（blog）项目
```



## 第一个程序

使用 rails 新建项目，它就像 [express-generator](https://expressjs.com/en/starter/generator.html) 一样，所有的配置都帮你弄好，你要写代码就可以

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

下载依赖是通过 `bundle install` ，相当于前端的 `npm install`

```bash
bundle install 
```

> 可以使用 bundle --help 查看 bundle 的其他命令行，笔者会用 `bundle install --verbose` 查看下载过程

如何启动项目呢，在前端开发中，有 package.json，能在 script 中写命令。而 rails 不同，它的 `Gemfile` 没有运行文件的命令，但它自带了很多命令行，如：

```bash
rails server # 启动服务
rails s -p 8080 # s 为 server 缩写，-p 8080 表示指定8080的端口
```

如此， rails 应用就启动了

![ruby on rails运行成功](https://s2.loli.net/2022/12/27/uFNbqIgzw8PEtL5.png)



## 总结

本文的主要目的是让 Ruby on Rails 能运行，在 window 上运行确实还有坑，即使没有几年前那么多，但还是有个坑让我踩进去了，这里作记录

我们现在已经安装了 ruby、rails，并且启动项目，但到现在一行代码都不会写，下一篇，我们熟悉 ruby 的语法



## 参考资料

- [Rails 入门](https://ruby-china.github.io/rails-guides/getting_started.html)
