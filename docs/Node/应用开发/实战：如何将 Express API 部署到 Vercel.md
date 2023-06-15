# 如何将 Express API 部署到 Vercel



三个项目带你了解如何将 Express API 部署到 Vercel 

## 极简项目

### 新建项目

```bash
npm init -y
```

### 安装 express

```bash
pnpm i express
```

### 新建 index.js

```bash
touch index.js
```

### 编写 express 服务

```js
const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
app.listen(3000, () => {
  console.log("3000 端口启动");
});
```

### 新建 vercel.json 文件

```bash
touch vercel.json
```

### 编写 vercel.json 代码

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ]
}
```

### 下载 vercel cli

```bash
pnpm i vercel -g
```

### 部署 Express API

```bash
vercel
```

此时，访问就能访问刚刚做的 express 服务。当你修改内容，再在命令行输入`vercel`，就能实现新的部署。但这个时候的部署的域名是一个这次提交的域名，如果要更新原域名的内容，加上 `--prod` 即可，例如

第一次 vercel 后，[easy-express-vercel.vercel.app](https://easy-express-vercel.vercel.app/) 就有能力了，

第二次 vercel 后，会生成 [easy-express-vercel-8vqs2goq1-t511069160.vercel.app](https://easy-express-vercel-8vqs2goq1-t511069160.vercel.app/)（类似这种域名），但是[easy-express-vercel.vercel.app](https://easy-express-vercel.vercel.app/) 的内容没有改变

当使用 `vercel --prod` 后，就能更新 [easy-express-vercel.vercel.app](https://easy-express-vercel.vercel.app/) 内容与第二次内容一致

这里我们使用的是通过 vercel cli 命令行来部署，相关文档可看：https://vercel.com/docs/cli

### 连接 git

我希望我们的代码能与 git 连接，当我们推送到 github 后，自动发布。这也是[Vercel 部署 Node 服务](https://juejin.cn/post/7094911994226016292)没有说到的点

先将 node_modules 加入到  .gitignore 中，再初始化项目，提交到 github，在项目中点击这块

![image-20230606112853458](https://s2.loli.net/2023/06/06/ZHBmINk8EVrahp1.png)

继续点击 github

![image-20230606113242813](https://s2.loli.net/2023/06/06/9Aj8wH3alc7udnV.png)

如此就与 github 绑定了。下次我们提交到 github 仓库后 vercel 就会自动帮我们发布

## 时间戳服务

以上的例子过于简单，之前写的[Vercel 部署 Node 服务](https://juejin.cn/post/7094911994226016292)很多朋友提问笔者，甚至有网友直接发邮件有问，笔者这里再部署两个 Node 服务，希望能给到一些参考

例子来源 freecodecamp.org 的后端开发和 API 中的[时间戳服务](https://www.freecodecamp.org/chinese/learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice)

它和极简项目的区别，不需要新建 vercel.json 文件，直接部署即可

github地址：https://github.com/johanazhu/timestamp-express-vercel



## 短网址服务

例子来源 freecodecamp.org 的后端开发和 API 中的[短链接服务](https://www.freecodecamp.org/chinese/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

它和极简项目的区别也是不需要新建 vercel.json 文件，直接部署即可

github地址：https://github.com/johanazhu/shorturl-express-vercel



## 总结

用 vercel 部署 node 服务其实很简单，个人认为它是最小实现的最佳实践



## 参考资料

- [using-express-with-vercel](https://vercel.com/guides/using-express-with-vercel)
- [vercel.json文档](https://vercel.com/docs/concepts/projects/project-configuration)