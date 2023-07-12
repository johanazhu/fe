# Nginx

> 学习一个东西之前，首先在大脑中积累充分的”疑惑感“。即弄清面临的问题到底是什么，在浏览方法本身之前，最好先使劲问问自己都想到什么方法。一个公认的事实是，你对问题的疑惑越大，在之前做的自己的思考越多，当看到解答之后印象就越深刻 ——李未鹏

在写这篇文章之前，我已经做过一些 Nginx 配置了，已经在服务器上倒腾了一些时间，知道反向代理，负载均衡

```nginx
server {
    listen 7000;
    server_name localhost;
    root /usr/share/nginx/html/dist;
    index index.html;
    try_files $uri $uri/ /index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
    location /rest {
        proxy_pass http://127.0.0.1:8000/rest;
    }
}
```

这是很简单的 Nginx 配置，

我的疑问也有很多，如

-   Nginx 还有那些未尝试的好用的配置，如 gzip 压缩
-   https 和 http2 的配置是怎么样
-   如何在 Nginx 做缓存，其中 http 缓存知识请移步 http 系列文章
-   强缓存怎么配，协议缓存怎么配？最佳实践是什么？
-   Nginx 的架构是怎么样的？一直说它是轻架构的服务器，那么它的源码难吗（好像是用 C 写的）
-   如何做到前端代码部署上去后（使用 ftp 形式上传到指定文件），能访问到最新代码，js、css 打 hash？（移步部署）
-   如果在代码部署后，在微信中打开清楚缓存，等稳定了关闭缓存

## Nginx 是什么？



nginx 教程

https://github.com/jaywcjlove/nginx-tutorial





## nginx 报错

去 `error.log` 里查看日志

```bash
tail -f -n 100 error.log
```





Nginx 是主流的、开源的、高性能的 HTTP 和反向代理 web 服务器，可以用于挂载网站、请求转发、负载均衡、网关路由等。前后端开发同学都需要学习，在后端开发的面试中有时会考到。

#### [知识](https://luxian.yupi.icu/#/roadmap/Java学习路线?id=知识-16)

- Nginx 作用
- 正向代理
- 反向代理（负载均衡）
- 常用命令
- 配置
- 动静分离（网站部署）
- 集群搭建
- 相关技术：HAProxy、Apache

#### [学习建议](https://luxian.yupi.icu/#/roadmap/Java学习路线?id=学习建议-17)

Nginx 的基本使用非常简单，甚至不需要看任何的视频，跟着一篇文章就能够用它来提供网站访问能力、实现反向代理。

但是在企业中，Nginx 的使用往往没那么简单，作为负载均衡、请求转发的重要组件，往往需要针对实际场景去写一些特定的配置。因此建议有时间的话，实践下 Nginx 的配置方法，了解 Nginx 基本的设计思想，对今后自己设计系统时也有帮助。

#### [经典面试题](https://luxian.yupi.icu/#/roadmap/Java学习路线?id=经典面试题-12)

1. Nginx 有哪些作用？
2. Nginx 为什么支持高并发？
3. Nginx 有哪些负载均衡策略？
4. 什么是 Nginx 惊群问题，如何解决它？

#### [资源](https://luxian.yupi.icu/#/roadmap/Java学习路线?id=资源-17)

- 视频
  - ⭐ 尚硅谷 - Nginx 教程由浅入深：https://www.bilibili.com/video/BV1zJ411w7SV （讲的比较全面）
  - ⭐ Nginx 鱼皮 - 手把手带你从0搭建个人网站：https://www.bilibili.com/video/BV1rU4y1J785/ （简单演示 Nginx 部署网站）
- 文档
  - Nginx 中文文档：https://www.nginx.cn/doc/index.html
- 工具
  - Nginx 配置在线生成：https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN





https://www.yuque.com/aceld/fpknid/avhs14
