# 面试常客：HTTP 缓存

速度、速度，还是速度，一个网站要想体验好，就必须在第一时间以最快的速度显示出来。mysql 查询慢，就加一层 redis 做缓存，网站资源加载慢，怎么做，使用 HTTP 缓存

HTTP 缓存自 HTTP/1.0 就开始有，为的是减少服务器压力，加快网页响应速度

## 缓存操作的目标

HTTP 缓存只能存储 GET 请求的响应，而对其他类型的请求无能为力

## 缓存发展史

HTTP/1.0 提出缓存概念，即强缓存 Expires 和协商缓存 Last-Modified。后 HTTP/1.1 又有了更好的方案，即强缓存 Cache-Control 和协商缓存 ETag

为什么 Expires 和 Last-Modified 不适用呢？

Expires 即过期时间，但问题是这个时间点是服务器的时间，如果客户端的时间和服务器时间有差，就不准确。所以用 Cache-Control 来代替，它表示过期时长，这就没歧义了

Last-Modified 即最后修改时间，而它能感知的单位时间是秒，也就是说如果在 1 秒内改变多次，内容文件虽然改变了，但展示还是之前的，存在不准确的场景，所以就有了 ETag，通过内容给资源打标识来判断资源是否变化

以下表格利于对比理解

| 版本     | 强缓存        | 协商缓存      |
| -------- | ------------- | ------------- |
| HTTP/1.0 | Expires       | Last-Modified |
| HTTP/1.1 | Cache-Control | ETag          |

## 两大缓存类型对比

前文已介绍不同版本下的缓存类型。当时提了有一句强缓存和协商缓存，但没具体介绍。现在来讲讲这两种缓存类型

### 强缓存

#### Cache-Control

-   HTTP/1.1

-   通过过期时长控制缓存，对应的字段有很多，例如 max-age
    -   例如 Cache-Control: max-age=3600，表示缓存时间为 3600 秒，过期失效
-   缓存请求指令：

    -   ```http
        Cache-Control: max-age=<seconds>
        Cache-Control: max-stale[=<seconds>]
        Cache-Control: min-fresh=<seconds>
        Cache-control: no-cache
        Cache-control: no-store
        Cache-control: no-transform
        Cache-control: only-if-cached
        ```

-   缓存响应指令：

    -   ```http
        Cache-control: must-revalidate
        Cache-control: no-cache
        Cache-control: no-store
        Cache-control: no-transform
        Cache-control: public
        Cache-control: private
        Cache-control: proxy-revalidate
        Cache-Control: max-age=<seconds>
        Cache-control: s-maxage=<seconds>
        ```

-   其中关键点：

    -   `Cache-control: no-cache`
        -   跳过当前的强缓存，发送 HTTP 请求（如有协商缓存标识即直接进入**协商缓存阶段**）
        -   no-cache 的含义和 `max-age=0` 一样 ，即跳过强缓存，强制刷新
    -   `Cache-control: no-store`
        -   不使用缓存（包括协商缓存）
    -   `Cache-Control: public, max-age=31536000`
        -   一般用于缓存静态资源
        -   public：响应可以被中间代理、CDN 等缓存
        -   private：专用于个人的缓存，中间代理、CDN 等能换缓存此响应
        -   max-age：单位是秒

-   > 更多指令参考[指令大全](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

#### Expires

-   HTTP/1.0

-   语法：

    -   ```http
        Expires: <http-date>
        ```

-   即过期时间，存在于服务器返回的响应头里

    -   Expires: Mon, 11 Apr 2022 06:57:18 GMT
    -   表示资源在 2022 年 4 月 11 号 6 点 57 分过期，过期了就会往服务端发请求

-   如果在`Cache-Control`响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 `Expires` 头会被忽略

-   缺点：服务器时间与浏览器时间可能不一致

-   > 更多指令参考[指令大全](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires)

#### Cache-Control VS Expires

-   Cache-Control 较之 Expires 更为精准
-   同时存在时，Cache-Control 优先级大于 Expires
-   Expires 是 HTTP/1.0 提出，其浏览器兼容性更好，Cache-Control 是 HTTP/1.1 提出，可同时存在，当有不支持 Cache-Control 的浏览器时会以 Expires 为准

### 协商缓存

协商缓存需要配合强缓存使用，使用协商缓存的前提是设置强缓存设置 `Cache-Control: no-cache`或者 `pragma: no-cache`或者 `max-age=0` 告诉浏览器不走强缓存

> pragma 是 HTTP/1.0 中禁止网页缓存的字段，其取值为 no-cache 和 Cache-Control 的 no-cache 效果一样

#### ETag/If-None-Match

-   HTTP/1.1
-   即生成文件唯一标识来判断是否过期。只要内容改变，这个值就会变
-   与 `If-None-Match` 配合，ETag 是请求服务器后返回给每个资源文件的唯一标识，客户端会将此标识存在客户端（即浏览器）中，下次请求时会在请求头的 `If-Nono-Match` 中将其值带上，服务器判断 `If-None-Match` 是否与自身服务器上的 ETag 一致，如果一致则返回 304，重定向跳转使用本地缓存；不一致，则返回 200，将最新资源返回给客户端，并带上 ETag
-   更多指令参考[指令大全](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)

#### Last-Modified/If-Modified-Since

-   HTTP/1.0
-   最后修改时间，即通过最后修改时间来判断是否过期。在浏览器第一次给服务器发送请求后，服务器会在响应头上加上这个字段
-   与 `If-Modified-Since` 配合，客户端访问服务器资源时，服务器端会将 Last-Modified 放入响应头中，即这个资源在服务器上的最后修改时间，客户端缓存这个值，等下次请求这个资源时，浏览器会检测到请求头中的 Last-Modified，于是乎添加 `If-Modified-Since`，如果 `If-Modified-Since` 的值与服务器中这个资源的最后修改时间一致，则返回 304，重定向跳转使用本地缓存；不一致，则返回 200，将最新资源返回给客户端，并带上 Last-Modified
-   缺点：
    -   文件虽然被修改，但最后的内容没有变化，这样文件修改时间还是会更新
    -   有些文件修改频率在秒以内，这样以秒粒度来记录就不适用了
    -   有些服务器无法精准获取文件的最后修改时间
-   更多指令参考[指令大全](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified)

#### ETag VS Last-Modified

-   精确度
    -   ETag > Last-Modified。ETag 是通过内容给资源打标识来判断资源是否变化，而 Last-Modified 不一样，在某些场景下准确度会失效。例如编辑文件，但是文件内容未变，缓存会失效；或者在 1 秒内改变多次，Last-Modified 能感知的单位时间是秒
-   性能
    -   Last-Modified > ETag。Last-Modified 仅仅记录一个时间点，而 ETag 需要根据文件的具体内容生成哈希值
-   如果两个都支持的话，服务器会优先选择 ETag

### 协商缓存的条件请求

前文说到协商缓存是在请求头添加 `If-None-Match` 或 `If-Modified-Since`，这些请求头是什么，添加有什么用？

强缓存是通过具体时间到期或过期时长来控制缓存，这就有个问题了，如果其中的一些文件修改了，因为强缓存，浏览器展示的还是原来的数据，所以对那种常变化的数据不能使用强缓存做缓存策略，于是乎，就有了协商缓存，通过文件变化告诉浏览器缓存失效，使用前需去服务器验证是否是最新版？

这样，浏览器就要连续发送两个请求来验证：

1. 先是 HEAD 请求，获取资源的修改时间、hash 值等元信息，然后与缓存数据比较，如果没有改动就使用缓存
2. 否则就再发一个 GET 请求，获取最新的版本

但这样的两个请求的网络成本太高，所以 HTTP 协议就定义了一系列 If 开头的条件请求字段，专门用来检查验证资源是否过期，把两个请求合并在一个请求中做。而且验证的责任也交给服务器

-   If-Modified-Since：和 Last-modified 比较，是否已经修改了
-   If-None-Match：和 ETag 比较，唯一标识是否一致
-   If-Unmodified-Since：和 Last-modified 对比，是否修改
-   If-Match：和 ETag 比较是否匹配
-   If-Range

其中，最常见的当属是 If-Modified-Since 和 If-None-Match。它们分别对应 Last-Modified 和 ETag。需要第一次的响应报文预先提供 Last-Modified 和 ETag，然后第二次请求时就可以带上缓存里的原址，验证资源是否是最新的

如果资源没有变，服务器就回应一个 304 Not Modified ，表示缓存依然有效，浏览器就可以更新一个有效期，然后使用缓存了

![缓存流程](https://s2.loli.net/2022/04/25/7KxHO64YUJWsqnr.png)

### 什么时候用强缓存，什么时候用协商缓存？

首先强缓存的权重大于协商缓存，当强缓存存在时，协商缓存只能看着；其次 HTTP/1.1 中的缓存标识符大于 HTTP/1；所以当 Cache-Control 存在时，看它的，如果它不存在，则看 Expires，如果将强缓存设置为 `Cache-Control：no-cache`、`Cache-Control：max-age=0`、`pragma: no-cache`，即告诉浏览器不走强缓存，则进入协商缓存。

判断上次响应中是否有 ETag，如果有，则发起请求，请求头中带有条件请求 `If-None-Match`，如果没有，则再判断上次响应中是否有 Last-Modified，如果有，则发起请求头中带`If-Modified-Since` 的条件请求，如果没有，则说明没有协商缓存，发起 HTTP 请求即可。无论是带`If-None-Match`的请求还是 `If-Modified-Since` 的请求，都会返回状态（由服务器端判读资源是否变化），如果是 304，说明缓存资源未变，使用本地缓存；如果是 200，则说明资源改变，发起 HTTP 请求，并记住响应头中的 ETag/Last-Modified

大致流程图如下所示：

![缓存判断流程图](https://s2.loli.net/2022/04/26/4Q2LaJynO6wRxdb.png)

那么哪些资源要采用强缓存，哪些资源采用协商缓存呢？

像静态资源这类我们长期不会去变动的资源应该用强缓存，不难理解；而像我们常修改的文件应该采用协商缓存，如果资源没变，那么当用户第二次进去还是用该资源，如果资源修改，用户进入发起 HTTP 请求获取最新资源

我们在访问网站时，如果留心都能在 F12 中观察到一二。如图所示，我的[五年前端三年面试](https://fe.azhubaby.com/)放在 github 服务器上，F12 进入 Network 中，能看到返回头中的信息。Cache-Control、Expires、ETag、Last-Modified 都存在

![五年前端三年面试](https://s2.loli.net/2022/04/11/qiVQvOkDPuBmeg3.png)

## 缓存位置

上文中常提到无论使用强缓存还是协商缓存，都会从浏览器本地中获取，那么浏览器的本地存储是存在哪里，他们又有什么分类呢？

按照缓存位置分类，分为四处，Memory Cache（内存缓存）、Disk Cache（硬盘缓存）、Service Worker、Push Cache

### Memory Cache

因为内存有限，并不是所有的资源文件都会放在内存里缓存，它主要用来缓存有 preloader 相关指令的资源，比如`<link rel="prefetch">`。preloader 可以一边解析 js/css 文件，一边网络请求下一个资源

### Disk Cache

磁盘上的缓存。在所有浏览器缓存中，disk cache 覆盖面最大，它会根据 HTTP Header 中的字段判断哪些资源需要缓存，哪些资源已经过期需要重新从服务器端请求

### Service Worker

独立线程，借鉴了 Web Worker 的思路。即让 JS 运行在主线程之外，由于它脱离浏览器窗口，因为无法直接访问 DOM，但是它还是能做很多事情，如

-   离线缓存，Service Worker Cache
-   消息推送
-   网络代理

-   它是 PWA 的重要实现机制

### Push Cache

即推送缓存，浏览器中的最后一道防线，HTTP2 中的内容

优先级：Service Worker-->Memory Cache-->Disk Cache-->Push Cache。

## 实践

说了这么多理论知识，等实战的时候却一头雾水，怎么破？

以上皆为口舌之辩，唯有实践出真章（以上皆为面试之辩，唯有实践出本事）

目前前端项目都是以 webpack 或类 webpack 工具库打包，在 webpack 中配置哈希，前端方面的缓存工作就完成了

我们要实现的效果是：

-   HTML：协商缓存
-   CSS、JS、图片等资源：强缓存，文件名带上 hash

webpack 中的哈希有三种：hash、chunkHash、contentHash

-   Hash：和整个项目的构建相关，只要项目文件有改变，整个项目构建的 hash 值就会改变

-   chunkHash：和 webpack 打包的 chunk 有关，不同的入口会生成不同的 chunkHash 值

-   contentHash：根据文件内容来定义 hash，文件内容不变，则 contentHash 不变

这边需要把 CSS 用 contentHash 处理，其他资源用 chunkHash 做处理

### 非前端工程化项目

即传统的前端页面，一般放在静态服务器中，那么就要对修改的文件做版本控制，例如在入口文件 index.js 上加版本号（index-v2.min.js）或者加时间戳（time=1626226），以此做缓存策略

### 后端缓存实践

真正起到缓存作用的是在后端，后端来设置缓存策略，告诉浏览器能否做缓存。这里我们对强缓存和协商缓存做个 demo 来实验下

#### 强缓存方案

代码如下：

```javascript
const express = require('express');
const app = express();
var options = {
    etag: false, // 禁用协商缓存
    lastModified: false, // 禁用协商缓存
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'max-age=10'); // 强缓存超时时间为10秒
    },
};
app.use(express.static(__dirname + '/public', options));
app.listen(3008);
```

> PS：代码来源自：[图解 HTTP 缓存](https://juejin.cn/post/6844904153043435533)，在做测试时，需要注意，强缓存下，刷新页面是测不出来，点击后返回方能有效

![强缓存效果](https://s2.loli.net/2022/04/26/sdXPHy7ljLeBCTN.gif)

#### 协商缓存方案

代码如下：

```javascript
const express = require('express');
const app = express();
var options = {
    etag: true, // 开启协商缓存
    lastModified: true, // 开启协商缓存
    setHeaders: (res, path, stat) => {
        res.set({
            'Cache-Control': 'max-age=00', // 浏览器不走强缓存
            Pragma: 'no-cache', // 浏览器不走强缓存
        });
    },
};
app.use(express.static(__dirname + '/public', options));
app.listen(3001);
```

效果如下：

![协商缓存效果](https://s2.loli.net/2022/04/26/jw1bythDvuJcq94.gif)

附上两个 demo 地址供君参考

-   [强缓存](https://strong-cache.vercel.app/)

-   [协商缓存](https://negotiate-cache.vercel.app/)

## 总结

HTTP 为什么要缓存，为了分担服务器压力，也为了让页面加载更快

有什么手段？HTTP 的强缓存和协商缓存，强缓存作用于那些不怎么变化的资源（如引入的库，js，css 等），协商缓存适用常更新的文件（例如 html）

强缓存是什么？在 HTTP/1.0 中以 Expires 为依据，但它不准确，HTTP 协议升级成 1.1 后，用新标识符 Cache-Control 来代替，但两者可以同时存在，Cache-Control 的权重更大一些

协商缓存是什么？在 HTTP/1.0 中以 Last-Modified 为依据，即最后过期修改时间，它也不准确，HTTP 升级成 1.1 后，用新标识符 ETag 来代替，两者可同时存在，后者的权重更大

无论是 Expires ，还是 Last-Modified，都是以时间点来依据，理论上是不出问题，但却出问题了，所以就有了新的方案

其中强缓存存在时，浏览器会采用强缓存标识符来缓存，当将强缓存设置为失效时，浏览器则会采用协商缓存来做缓存策略

以上，即使笔者所理解的 HTTP 缓存

## 参考资料

-   [深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)
-   [彻底理解浏览器的缓存机制](https://www.cnblogs.com/duiniweixiao/p/8884274.html)
-   [前端缓存最佳实践](https://mp.weixin.qq.com/s/03OAnrJ5kM-kdITr00YR4Q)
-   [浏览器缓存的力量](https://mp.weixin.qq.com/s/CsJyKVq3IIjDv32TZ9m7fQ)
-   [node 实践彻底搞懂强缓存和协商缓存](https://juejin.cn/post/6942264171870289956)
-   [浅析 HTTP 缓存](https://juejin.cn/post/6944891188826603528)
-   [MDN web docs](https://developer.mozilla.org/zh-CN/)
-   [图解 HTTP 缓存](https://juejin.cn/post/6844904153043435533)
