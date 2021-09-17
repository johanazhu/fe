# NPM的基本知识



## NPM 是什么

NPM（node package manager），通常称为node包管理器。顾名思义，它的主要功能就是管理node包，包括：安装、卸载、更新、查看、搜索、发布等

一般伴随着 Node 一起被下载来，就是说你下载了 Node，意味着也下载了 NPM

npm 官网：[https://www.npmjs.com/](https://www.npmjs.com/)

npm 官网文档：[https://docs.npmjs.com/](https://docs.npmjs.com/)

npm 中文教程：[https://www.npmjs.cn/](https://www.npmjs.cn/)

npm 菜鸟教程：[https://www.runoob.com/nodejs/nodejs-npm.html](https://www.runoob.com/nodejs/nodejs-npm.html)



## NPM 常用命令行

| 命令                      | 说明                   |
| ------------------------- | ---------------------- |
| npm init                  | 初始化，加 -y 一键     |
| npm install npm@latest -g | 升级到最新             |
| npm cache clean -f        | npm 清除缓存           |
| npm publist               | 讲包推送到远程仓库     |
| npm update                | 升级包                 |
| npm audit fix             | 修复包的安全漏洞并升级 |



## cnpm

因为 npm 的服务器在国外，使用 npm 下载太慢，一般使用 cnpm 加速

```javascript
npm install -g cnpm --registry=https://registry.npm.taobao.org
```





## --save 与 --save-dev 的区别

只要 npm install X，就会把 X 包安装到 node_modules 中，区别在于

- 什么都不写，不会添加到 package.json
- --save（或者 -S），会在 dependencies 属性下添加 X
  - 生产环境下使用
- --save-dev（或者 -D），会在 devDependencies 属性下添加X
  - 开发环境下使用





## Package.json 属性说明

- name 包名
- version 版本
- description 描述
- homepage 官网url
- author 作者
- dependencies 生产依赖包列表
- devDependencies 开发依赖包列表
- ...

