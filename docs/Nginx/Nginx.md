# Nginx 

> 学习一个东西之前，首先在大脑中积累充分的”疑惑感“。即弄清面临的问题到底是什么，在浏览方法本身之前，最好先使劲问问自己都想到什么方法。一个公认的事实是，你对问题的疑惑越大，在之前做的自己的思考越多，当看到解答之后印象就越深刻																											                              ——李未鹏

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

- Nginx还有那些未尝试的好用的配置，如gzip压缩
- https 和 http2 的配置是怎么样
- 如何在 Nginx 做缓存，其中 http 缓存知识请移步 http 系列文章
- 强缓存怎么配，协议缓存怎么配？最佳实践是什么？
- Nginx 的架构是怎么样的？一直说它是轻架构的服务器，那么它的源码难吗（好像是用C写的）
- 如何做到前端代码部署上去后（使用ftp形式上传到指定文件），能访问到最新代码，js、css打hash？（移步部署）
- 如果在代码部署后，在微信中打开清楚缓存，等稳定了关闭缓存



## Nginx 是什么？





nginx教程

https://github.com/jaywcjlove/nginx-tutorial