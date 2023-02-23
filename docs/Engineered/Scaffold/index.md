# 脚手架

脚手架的实现原理

-   脚手架的优点：自动化、标准化、数据化

最简单的一个脚手架

-   开发流程
-   使用流程

Lerna 模式下的脚手架

-   多 package 项目管理通电和解决方案
-   基于 Lerna 脚手架框架搭建
    -   什么是 Lerna
    -   Lerna 源码分析

azhu-cli 脚手架需求分析和架构设计，架构设计图脚手架架构设计

## Lerna

第一步：初始化 npm 项目

```bash
npm init -y
```

第二步：全局下载 lerna

```bash
cnpm i lerna -g
cnpm i lerna -D
```

第三步：lerna init 初始化项目

```bash
lerna init
```

> 初始化之后，自行执行 git init 命令，所以一般要在根目录下创建 `.gitignore`

第四步：lerna create 创建 package

```bash
lerna create core
lerna create utils
```

第五步：lerna add 安装依赖

```bash
lerna add lodash
```

![image-20220505100628452](https://s2.loli.net/2022/05/05/WM4a9JVrXjEKOIR.png)

相当于在每个 package 中下载依赖

可以指定包

```bash
lerna add underscore --scope=@azhu-cli-dev/core
// 或者
lerna add underscore packages/core
```

可以使用 `lerna add -h` 查看命令和例子，也可看[文档](https://github.com/lerna/lerna/tree/main/commands/add#readme)

第六步：lerna link 链接依赖

lerna link 将依赖软链接

在 `package.json` 中的 `dependencies` 添加依赖，如

```json
{
    "dependencies": {
        "@azhu-cli-dev/utils": "^1.0.0"
    }
}
```

执行命令行 `lerna link`，将 packages 文件下的包链接给指定包，当你修改 utils 包下的文件后，执行`lerna link` ，即能获取 utils 文件下最新的文件

其他命令

```bash
lerna clean // 清除安装包
lerna bootstrap // 重新下载依赖
lerna exec // 执行 bash 脚本
lerna run // 执行 npm 命令
```

第七步：发布

先将代码推送至远程仓库，在使用 lerna version 更新（所有）项目版本

![image-20220505104149889](https://s2.loli.net/2022/05/05/zaGbKSWReU9H1gY.png)

第八步：发布 npm 社区

```bash
lerna publish
```

先登录 npm 账号，在执行 `lerna publish`

![发布项目](https://s2.loli.net/2022/05/05/DvTMUOAFVPkgQjR.png)

注意，以上是错误的，因为我们使用的是 global 的形式发布 npm 包，默认情况下都是私有的，要想在 npm 社区中看到，需要修改 `package.json`，将其改为

```json
...
"publishConfig": {
    "access": "public"
}
```

再次提交至远程库后，执行命令`lerna publish`，就能将包发至 npm 社区

![发布成功](https://s2.loli.net/2022/05/05/AWMa3i6IOHxrYTB.png)
