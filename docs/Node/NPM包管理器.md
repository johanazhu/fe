# NPM 包管理器

## NPM 

- [pnpm](https://github.com/pnpm/pnpm) - 快速、节省磁盘空间高效的包管理器
- [npm](https://github.com/npm/cli) - JavaScript 包管理工具
- [yarn](https://github.com/yarnpkg/berry) - 现代包管理工具，拆分成多个不同的包
- [yalc](https://github.com/wclr/yalc) - 更适用的前端 link 工具
- [nrm](https://github.com/Pana/nrm) - 快速切换 npm 注册服务商，如 npm、cnpm、nj、taobao
- [cnpm](https://github.com/cnpm/cnpm) - NPM 中国区镜像客户端



### NPM 是什么

NPM（node package manager），通常称为 node 包管理器。顾名思义，它的主要功能就是管理 node 包，包括：安装、卸载、更新、查看、搜索、发布等

一般伴随着 Node 一起被下载来，就是说你下载了 Node，意味着也下载了 NPM

npm 官网：[https://www.npmjs.com/](https://www.npmjs.com/)

npm 官网文档：[https://docs.npmjs.com/](https://docs.npmjs.com/)

npm 中文教程：[https://www.npmjs.cn/](https://www.npmjs.cn/)

npm 菜鸟教程：[https://www.runoob.com/nodejs/nodejs-npm.html](https://www.runoob.com/nodejs/nodejs-npm.html)

### NPM 常用命令行

| 命令                      | 说明                   |
| ------------------------- | ---------------------- |
| npm init                  | 初始化，加 -y 一键     |
| npm install npm@latest -g | 升级到最新             |
| npm cache clean -f        | npm 清除缓存           |
| npm publist               | 讲包推送到远程仓库     |
| npm update                | 升级包                 |
| npm audit fix             | 修复包的安全漏洞并升级 |

### cnpm

快速、节省磁盘空间高效的包管理器。

因为 npm 的服务器在国外，使用 npm 下载太慢，一般使用 cnpm 加速

```javascript
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### --save 与 --save-dev 的区别

只要 npm install X，就会把 X 包安装到 node_modules 中，区别在于

-   什么都不写，不会添加到 package.json
-   --save（或者 -S），会在 dependencies 属性下添加 X
    -   生产环境下使用
-   --save-dev（或者 -D），会在 devDependencies 属性下添加 X
    -   开发环境下使用



包管理工具的演进

https://zhuanlan.zhihu.com/p/582229306





## package.json

- [read-pkg-up](https://github.com/sindresorhus/read-pkg-up) - 读取最近的 package.json 文件
- [node-pkginfo](https://github.com/indexzero/node-pkginfo) - 从 package.json 读取属性的简单方法
- [pkg-dir](https://github.com/sindresorhus/pkg-dir) - 查找 npm 包的根目录
- [read-pkg](https://github.com/sindresorhus/read-pkg) - 读取 package.json 文件
- [write-pkg](https://github.com/sindresorhus/write-pkg) - 写入 package.json 文件
- [read-package-json-fast](https://github.com/npm/read-package-json-fast) - 类似 read-package-json, 但更快





### 属性说明

-   name 包名
-   version 版本
-   description 描述
-   homepage 官网 url
-   author 作者
-   dependencies 生产依赖包列表
-   devDependencies 开发依赖包列表
-   ...

### 如何升级项目中的包

使用 `npm outdated` 查看有哪些过时的包

若要将所有软件包更新到新的主版本，则全局地安装 `npm-check-updates` 软件包：

```bash
npm install -g npm-check-updates
```

然后运行：

```bash
ncu -u
```

这会升级 `package.json` 文件的 `dependencies` 和 `devDependencies` 中的所有版本，以便 npm 可以安装新的主版本。

现在可以运行更新了：

```bash
npm update
```

如果只是下载了项目还没有 `node_modules` 依赖包，并且想先安装新的版本，则运行：

```bash
npm install
```

https://mp.weixin.qq.com/s/0mnWUd-Wvmunx7mUqJmgLQ

https://mp.weixin.qq.com/s/1YuSEez1QZeCfPjuI3NyEQ



## 参考资料

-   [nodejs 中文文档](http://nodejs.cn/website2/learn/update-all-the-nodejs-dependencies-to-their-latest-version/)
