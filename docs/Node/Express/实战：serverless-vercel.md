# 实战：serverless-vercel



这里我们讲一下 serverless 的极简服务

## 新建项目

```bash
npm init -y
```

## 新建 api/index

```javascript
export default function handler(request, response) {
  const { name = "world" } = request.query;
  return response.end(`Hello ${name}!`);
}
```

## 使用命令行 vercel

```bash
vercel
```

跟着提示一路执行下来

此时，访问 https://serverless-vercel-lac.vercel.app/api ，就能直接访问到，在 url后加上`?name=johan`，即 https://serverless-vercel-lac.vercel.app/api?name=johan ，就能看到应用显示`Hello, johan`

但访问根目录，即 https://serverless-vercel-lac.vercel.app，报404

我们编写 vercel.json 解决这个问题

### 新建 vercel.json 并编写

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/",
      "destination": "/api/index"
    }
  ]
}
```

## 本地调试

```bash
vercel dev
```

发现访问根目录能直接跳转至`api/index` 文件，成功

## 第二个serveless

在 api 文件夹中，文件即服务

## 新建 date.js 并编写

```javascript
export default function handler(request, response) {
  return response.send(`当前时间 ${new Date().toISOString()}`);
}
```

文件目录

![文件目录](https://s2.loli.net/2023/06/07/j7FS1xkneGdiEaD.png)



## 连接 git

与 [实战：如何将 Express API 部署到 Vercel](https://fe.azhubaby.com/node/express/%E5%AE%9E%E6%88%98%EF%BC%9A%E5%A6%82%E4%BD%95%E5%B0%86%20Express%20API%20%E9%83%A8%E7%BD%B2%E5%88%B0%20Vercel.html) 流程一致

## 再次部署

vercel 重新部署到新的预览页面

vercel --prod：部署生产环境

## 项目地址

源码：https://github.com/johanazhu/serverless-vercel

网站：https://serverless-vercel-lac.vercel.app/



## 总结

实现 vercel 上部署 serverless 的小 demo，后续会有大一点的实战



## 参考资料

- [using-express-with-vercel](https://vercel.com/guides/using-express-with-vercel)
- [vercel.json文档](https://vercel.com/docs/concepts/projects/project-configuration)