---
title: Vercel 部署 Node 服务
date: 2022-05-06 12:44:01
tags:
  - 碎皮扯淡
categories:
  - [服务端开发, 部署]
author: 残天
---

## 引子

之前在写[面试常客：HTTP 缓存](https://fe.azhubaby.com/HTTP/HTTP%E7%BC%93%E5%AD%98.html)时，曾经就强缓存和协商缓存写过两个 demo，但缓存要在服务端做，只能贴上代码，不能在网页上感受（虽然我贴了 gif）

笔者的所有 demo 例子都放在 github page 上，其特点是不需要服务器即可部署静态资源，但它不具备部署服务端应用能力

最近笔者在了解 CI/CD 方面的知识点，想起了 Vercel，就想着能否将服务端应用架在 vercel 上呢？

## Vercel 是什么

Vercel 是一个开箱即用的网站托管平台，方便开发者快速部署自己的网站。它在全球都拥有 CND 节点，因此比 Github 官方自带的 github pages 更加稳定，访问速度更快

[Koala 聊开源](https://space.bilibili.com/489667127) 曾经对其有过介绍：[Vercel 与 Next.js：开源全明星团队背后的商业逻辑](https://www.bilibili.com/video/BV1gR4y1u76v)

> 文字版：[Vercel 与 Next.js：开源全明星团队背后的商业逻辑](https://juejin.cn/post/7057333396359348255)

简单的说，它能极简部署应用到服务端，且是免费不用买服务器

## 官网

[Vercel 官网](https://vercel.com/)

[Vercel 工作流官网](https://vercel.com/workflow)（网页效果炫酷）

## 常见命令行

将 Vercel 下载到全局（`npm i vercel -g`），不知道有什么命令就`-h`

![vercel帮助](https://s2.loli.net/2022/05/07/zS3fFqLtiQvp6Oc.png)

笔者对其了解有限，这里罗列下笔者知道的命令

- `vercel login`：登录 Vercel 账号
- `vercel dev`：本地开启服务
- `vercel dev --bug`：本地开启服务并打印日志
- `vercel`：部署本地资源到 Vercel 上
- `vercel --prod`：更新本地网页

> vercel 可以用 vc 来代替，vc 是 Vercel 的缩写

## 部署静态服务

我们现在已经对 vercel 有所了解，前文中说到 Vercel 能简化开发者部署服务，那它能简化到什么程度呢？

这里我们从零部署一个简易静态服务

本地安装 Vercel

```bash
npm i vercel -g
```

登录 Vercel

```bash
vercel login
```

![vercel login](https://s2.loli.net/2022/05/07/Llg3ZO8iywrqEfv.png)

选择好连接的方式后，会在网站弹出

![vercel 登录成功](https://s2.loli.net/2022/05/07/LVWO5CetKbfBHnU.png)

哟哟，man。what's your name？

创建一个 HTML 文件，后续我们要将其上传至 Vercel 服务器上

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vercel Demo</title>
  </head>

  <body>
    <h1>Vercel Demo</h1>
  </body>
</html>
```

本地测试一番，输入命令行

```bash
vercel dev
```

![vercel dev](https://s2.loli.net/2022/05/07/CTj4uopQmbJGe9H.png)

因为我们这是第一次执行，根目录下没有`.vercel`，所以要填写一些必要信息，这时你的本地和 Vercel 服务器就绑定好了

部署服务

```bash
vercel
```

![vercel部署](https://s2.loli.net/2022/05/07/eGn9HSkLqpFsC6l.png)

在 https://vercel-sample-ten.vercel.app/ 中能访问到我们的静态服务

在截图中我们也看到了这句话`Deployed to production. Run vercel --prod to overwrite later`，后续我们要更新资源，用 `vercel --prod` 即可

好了，除去必要的登录，我们就用了三个命令就把本地服务部署到 Vercel 服务器上

- `vercel dev` ：开发时使用，查看应用是否跑得起来
- `vercel`：部署服务
- `vercel --prod`：更新应用（资源）

可以登录 [Vercel 后台](https://vercel.com/dashboard)查看部署情况

![vercel 后台](https://s2.loli.net/2022/05/07/5XEJHlWz7QtxwGd.png)

## 部署 Node 服务

回归主题，最终我们想部署的是 Node 服务，是后端服务，而非前端静态资源服务，这是关键

同样建立新项目

```bash
mkdir vercel-koa2
cd vercel-koa2
npm init -y
npm i koa -S
touch index.js
```

编写 `index.js` 中的内容

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello Vercel';
});

app.listen(3008, () => {
  console.log('3008项目启动');
});
```

> PS： 3000 端口默认会被 Vercel 使用，所以 Koa 服务要换个端口

使用命令`vercel dev`

![vercel koa dev](https://s2.loli.net/2022/05/07/z2C9gAl8yEuwtGL.png)

发现给我报错了，理由是 `package.json` 的 scripts 中没有 build 快捷符，修改之

```json
...
"scripts": {
    "build": "node index.js",
},
...
```

再次使用 `vercel dev`，node 服务跑起来了

于是乎我们部署它

```bash
vercel
```

![vercel 部署失败](https://s2.loli.net/2022/05/07/NDM5q2vj8LlFTo3.png)

搞半天没部署上去，后台查看也是无果，呜呼悲哉

google 后，发现原来还有一个 [vercel.json](https://vercel.com/docs/project-configuration)，可以用 vercel.json 配置和覆盖 vercel 默认行为

下载 `@vercel/node` 包

```bash
npm i @vercel/node -S
```

填写配置：

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

执行 `vercel` 部署服务

![vercel koa](https://s2.loli.net/2022/05/07/7ErKfp5QbMLjymd.png)

访问地址：https://vercel-koa2-t511069160.vercel.app

至此，就完成了 Koa 服务的部署

与部署静态资源多了两个步骤

下载 `@vercel/node` 和配置 `vercel.json`

## 延伸思考

Vercel 当然不止笔者所说的这一功能，它还可以自定义域名、serverless、全球支持的 CDN 等等

可以毫不夸张地说，用 Vercel 来代替繁琐的云服务器，配合 Github Action 做 CI/CD，就

个人开发者或小团队而言，这或许就是神器

后续笔者也会尝试用 Vercel 部署一些小应用，实践出真理

附上项目地址：https://github.com/johanazhu/vercel-demo

## 参考资料

- [Vercel 搭建 API 服务，无需服务器](https://tangly1024.com/article/vercel-free-serverless-api)
- [Vercel 与 Next.js：开源全明星团队背后的商业逻辑：文字版](https://juejin.cn/post/7057333396359348255)
- [Vercel 与 Next.js：开源全明星团队背后的商业逻辑：视频版](https://www.bilibili.com/video/BV1gR4y1u76v)
