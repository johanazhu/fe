# package.json



## 属性说明

- name 包名
- version 版本
- description 描述
- homepage 官网url
- author 作者
- dependencies 生产依赖包列表
- devDependencies 开发依赖包列表
- ...

## 如何升级项目中的包

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



## 参考资料

- [nodejs中文文档](http://nodejs.cn/website2/learn/update-all-the-nodejs-dependencies-to-their-latest-version/)
