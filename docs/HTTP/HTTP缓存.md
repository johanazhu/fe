# 面试常客：HTTP 缓存



速度、速度，还是速度，一个网站要想体验好，就必须在第一时间以最快的速度显示出来。mysql查询慢，就加一层 redis 做缓存，网站资源加载慢，怎么做，使用 HTTP缓存 

HTTP缓存自 HTTP1.0 就开始有，为了是减少服务器压力，加快网页响应速度

## 缓存发展史

HTTP1.0 提出缓存概念，即强缓存 Expires 和协商缓存 Last-Modified。后 HTTP1.1 又有了更好的方案，即强缓存 Cache-Control（缓存控制）和协商缓存 ETag

为什么 Expires 和 Last-Modified 不适用呢？

Expires 即过期时间，但问题是这个时间点是服务器的时间，如果客户端的时间和服务器时间有差，就不准确。所以用 Cache-Control 来代替，它表示过期时长，这就没歧义了

Last-Modified 即最后修改时间，而它能感知的单位时间是秒，也就是说如果在1秒内改变多次，内容文件虽然改变了，但展示还是之前的，也有不准确的场景；所以就有了 ETag，通过内容给资源打标识来判断资源是否变化

以下表格利于对比理解

| 版本    | 强缓存        | 协商缓存      |
| ------- | ------------- | ------------- |
| HTTP1.0 | Expires       | Last-Modified |
| HTTP1.1 | Cache-Control | ETag          |



## 两大缓存类型对比

前文已经介绍不同版本下的缓存类型。当时提了有一句强缓存和协商缓存，但没具体介绍。现在来讲讲这两种缓存类型

### 强缓存

#### Cache-Control

- HTTP/1.1
- 通过过期时长控制缓存，对应的字段是 max-age
  - 例如 Cache-Control: max-age=3600，表示缓存时间为3600秒，过期失效
- max-age 的用法
  - max-age: private
    - 只能浏览器缓存，中间的代理不能缓存
  - max-age: no-cache
    - 跳过当前的强缓存，发送HTTP请求，即直接进入 **协商缓存阶段**
  - max-age: no-store
    - 不进行任何形式的缓存
  - max-age: s-maxage
    - 针对代理服务器的缓存时间
  - max-age: must-revalidate
    - 一旦缓存过期，必须回到源服务器验证

- > 更多指令参考[指令大全](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FCache-Control)

#### Expires

- HTTP/1.0

- 即过期时间，存在于服务器返回的响应头里
  - Expires: Mon, 11 Apr 2022 06:57:18 GMT
  - 表示资源在2022年4月2号3点18分 过期，过期了就会往服务端发请求
  
- 缺点：服务器时间与浏览器时间可能不一致

- > 更多指令参考[指令大全](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires)

#### Cache-Control VS Expires

- Cache-Control 较之 Expires 更为精准
- 同时存在时，Cache-Control 优先级大于 Expires
- Expires 是 HTTP/1.0 提出，其浏览器兼容性更好，Cache-Control 是 HTTP/1.1 提出，其可同时存在，当有不支持 Cache-Control 浏览器时会以 Expires 为准

### 协商缓存

协商缓存需要配合强缓存使用，使用协商缓存的前提是设置强缓存中 `Cache-Control: no-cache`或者 `pragma: no-cache` 告诉浏览器不走强缓存

> pragma 是 HTTP1.0 中禁止网页缓存的字段，其取值为 no-cache 和 Cache-Control 的 no-cache 效果一样

#### ETag

- HTTP/1.1
- 即生成文件唯一标识来判断是否过期。只要内容改变，这个值就会变
- 与 `If-None-Match` 配合，ETag是请求服务器后返回给每个资源文件的唯一标识，客户端会将此标识存在客户端（即浏览器）中，下次请求时会在请求头的 `If-Nono-Match` 中将其值带上，服务器判断 `If-None-Match` 是否与自身服务器上的 ETag 一致，如果一致则返回 304，重定向跳转使用本地缓存；不一致，则返回200，将最新资源返回给客户端，并带上 ETag
- 更多指令参考[指令大全](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)

#### Last-Modified

- HTTP/1.0
- 最后修改时间，即通过最后修改时间来判断是否过期。在浏览器第一次给服务器发送请求后，服务器会在响应头上加上这个字段
- 和`If-Modified-Since` 配合，客户端访问服务器资源时，服务器端会将 Last-Modified 放入响应头中，即这个资源在服务器上的最后修改时间，客户端缓存这个值，等下次请求这个资源时，浏览器会检测到请求头中的 Last-Modified，于是乎添加 `If-Modified-Since`，如果 `If-Modified-Since` 的值与服务器中这个资源的最后修改时间一致，则返回 304，重定向跳转使用本地缓存；不一致，则返回200，将最新资源返回给客户端，并带上 Last-Modified
- 缺点：
  - 文件虽然被修改，但最后的内容没有变化，这样文件修改时间还是会更新
  - 有些文件修改频率在秒以内，这样以秒粒度来记录就不适用了
  - 有些服务器无法精准获取文件的最后修改时间
- 更多指令参考[指令大全](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified)

那么什么时候用强缓存，什么时候用协商缓存呢？

当这些所有的字段都存在时，强缓存的权重大于协商缓存，而如果HTTP协议中带有强缓存标识，则会使用缓存（即强缓存作用）；如强缓存失效，则会进入 HTTP 请求，需要和服务器进行协商，判断是否使用缓存

如图所示，我的[五年前端三年面试](https://fe.azhubaby.com/)放在 github 服务器上，F12进入 Network中，能看到返回头中的信息

Cache-Control、Expires、ETag、Last-Modified都存在

![五年前端三年面试](https://s2.loli.net/2022/04/11/qiVQvOkDPuBmeg3.png)

缓存优先就是HTTP1.1 的大于 HTTP1.0的，有强缓存的大于协商缓存的

Cache-Control 的优先级最高，比如 `Cache-Control：no-cache`，就直接进入到协商缓存的步骤，如果 `Cache-Control：max-age=xxx`，就会先比较当前时间和上次返回 200 时的时间差，如果没有超过缓存时长（max-age），则命中强缓存，不发请求直接从本地缓存读取该文件（这里需要注意，如果没有 cache-control，会取 expires 的值，来对比是否过期），过期的话会进入下一个阶段——协商缓存

协议缓存阶段，则向服务器发送请求头带有 If-None-Match 或 If-Modified-Since 的请求，服务器会比较 Etag，如果相同，命中协商缓存，返回 304 了如果不一致则有改动，直接返回新的资源文件带上新的 Etag 值并返回 200；同理，当 ETag不存在时，会对比 Last-Modified，如果（与If-Modified-Since）相同，则命中协商缓存，返回 304，在本地缓存中读取资源，不一致则返回最新资源并在返回头中带上Last-Modified信息

权重对比如下所示：

Cache-Control > Expires > ETag > Last-Modified



## 缓存位置

上文中常提到无论使用强缓存还是协商缓存，都会从浏览器本地中获取，那么浏览器的本地存储是存在哪里，他们又有什么分类呢？

按照缓存位置分类，分为四处，Memory Cache（内存缓存）、Disk Cache（硬盘缓存）、Service Worker、Push Cache

### Memory Cache

因为内存有限，并不是所有的资源文件都会放在内存里缓存，它主要用来缓存有 preloader 相关指令的资源，比如`<link rel="prefetch">`。preloader 可以一边解析 js/css 文件，一边网络请求下一个资源

### Disk Cache

磁盘上的缓存。在所有浏览器缓存中，disk cache 覆盖面最大，它会根据 HTTP Header 中的字段判断哪些资源需要缓存，哪些资源已经过期需要重新从服务器端请求

### Service Worker

独立线程，借鉴了 Web Worker 的思路。即让 JS 运行在主线程之外，由于它脱离浏览器窗口，因为无法直接访问DOM，但是它还是能做很多事情，如
- 离线缓存，Service Worker Cache
- 消息推送
- 网络代理

- 它是PWA的重要实现机制

### Push Cache

即推送缓存，浏览器中的最后一道防线，HTTP2中的内容

优先级：Service Worker-->Memory Cache-->Disk Cache-->Push Cache。



## 实践

说了这么多理论知识，等实战的时候却一头雾水，怎么破？

以上皆为口舌之辩，唯有实践出真章（以上皆为面试之辩，唯有实践出本事）

目前前端项目都是以 webpack 或类 webpack 工具库打包，在 webpack 中配置哈希，前端方面的缓存工作就完成了

我们要实现的效果是：

- HTML：协商缓存
- CSS、JS、图片等资源：强缓存，文件名带上hash

webpack 中的哈希有三种：hash、chunkHash、contentHash

- Hash：和整个项目的构建相关，只要项目文件有改变，整个项目构建的 hash 值就会改变


- chunkHash：和 webpack 打包的 chunk 有关，不同的入口会生成不同的 chunkHash值


- contentHash：根据文件内容来定义hash，文件内容不变，则 contentHash 不变



### 非前端工程化项目

加版本号（app-v2.min.js）或者时间戳（time=1626226...）





### 后端方案

浏览器是根据响应头的相关字段来决定缓存的方案的。所以，后端的关键就在于，根据不同的请求返回对应的缓存字段。以 NodeJS 为例，如果需要浏览器强缓存，我们可以这样设置：

```
res.setHeader(Cache-Control, public,max-age=xxx );
```

如果需要协商缓存，则可以这样设置：

```javascript
res.setHeader(Cache-Control, public, max-age=0);
res.setHeader(Last-Modified, xxx);
res.setHeader(ETag, xxx);
```



## 总结

HTTP 为什么要缓存，为了分担服务器压力，也为了放页面加载更快。

有什么手段？HTTP强缓存和协商缓存，强缓存作用与那些不怎么变化的资源（如引入的库，js，css等），协商缓存适用常更新的文件（例如 html）

强缓存是什么？在 HTTP1.0 中以 Expires 为依据，但它不准确，HTTP升级成1.1后，用新标识符 Cache-Control 来代替，但两者可以同时存在，Cache-Control 的权重更大一些

协商缓存是什么？在 HTTP1.0 中以 Last-Modified 为依据，即最后过期修改时间，它也不准确，HTTP升级成1.1后，用新标识 ETag 来代替，两者可同时存在，后者的权重更大

无论是 Expires ，还是 Last-Modified，都是以时间点来依据，理论上是不出问题，但却出问题了，所以就有了新的方案，现在浏览器为了兼容老版本，在请求头和响应头里会塞入一大堆字段指令，对其中概念有所了解即可



## 参考资料

-   [深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)
-   [彻底理解浏览器的缓存机制](https://www.cnblogs.com/duiniweixiao/p/8884274.html)
-   [前端缓存最佳实践](https://mp.weixin.qq.com/s/03OAnrJ5kM-kdITr00YR4Q)
-   [浏览器缓存的力量](https://mp.weixin.qq.com/s/CsJyKVq3IIjDv32TZ9m7fQ)
-   [node 实践彻底搞懂强缓存和协商缓存](https://juejin.cn/post/6942264171870289956)
-   [浅析 HTTP 缓存](https://juejin.cn/post/6944891188826603528)
-   [MDN web docs](https://developer.mozilla.org/zh-CN/)
