# HTTP 协议原理+实践 Web 开发工程师必学！

浏览器输入 URL 后 HTTP 请求返回的完整过程

![浏览器输入URL后HTTP请求返回的完整过程](https://i.loli.net/2021/06/03/2YBUohayWfjNKIc.png)

## 网络协议分层

![网络协议分层](https://i.loli.net/2021/06/03/oD3xifJNZFpmuch.png)

物理层：定义物理设备如何传输数据

数据链路层：在通信的实体间建立数据链路连接

网络层：为数据在节点之间传输创建逻辑链路

#### 传输层

向用户提供可靠的端到端（End-to-End）服务

传输层向高层屏蔽了下层数据通信的细节

#### 应用层

为应用软件提供了很多服务

构建于 TCP 协议之上

屏蔽网络传输相关细节

### HTTP 协议发展历史

#### HTTP/0.9

只有一个命令 GET

没有 HEADER 等描述数据的信息

服务器发送完毕，关闭 TCP 连接（现在的 http1.1：在一个 TCP 中能传递多个 HTTP）

#### HTTP/1.0

增加了很多命令

增加 status code 和 header

多字符集支持、多部分发送、权限、缓存等

#### HTTP/1.1

持久连接

pipeline

增加 host 和其他一些命令

#### HTTP/2.0

所有数据以二进制传输

同一个连接里面发送多个请求不再需要按照顺序来

头信息压缩以及推送等提高效率的功能

### HTTP 三次握手

![HTTP三次握手](/images/HTTP/HTTP三次握手.png)

为什么要三次握手？

### URI、URL、URN

#### URI

Uniform Resource Identifier/统一资源标识符

用来标识互联网上的信息资源，唯一

包括 URL 和 URN

#### URL

Uniform Resource Locator/统一资源定位器

就是网站地址：http://www.baidu.com

http://user:pass@host.com:80/path?query=string#hash

此类格式的都叫做 URL,比如 ftp 协议（文件协议）

#### URN

永久统一资源定位符

在资源移动之后还能被找到

目前还没有非常成熟的使用方案

### HTTP 报文格式

![HTTP报文格式](https://i.loli.net/2021/06/03/dw5P7ODa2oTcYAm.png)

#### HTTP 的方法

用来定义对于资源的操作

常用的有 GET、POST、PUT、DELETE 等

从定义上讲有各自的语义

#### HTTP 的 CODE

定义服务器对请求的处理结果

各个区间的 CODE 有各自的语义

100：

200：

300：

400：

500：

好的 HTTP 服务可以通过 CODE 判断结果

### 第三章：HTTP 的各种特性总览

使用 curl 来模式客户端请求

```javascript
curl -v www.baidu.com
```

CORS 跨域请求的限制与解决

浏览器的同域限制

JSONP

‘Access-Control-Allow-Origin’： ‘\*’

#### CORS 预请求

允许方法：GET、HEAD、POST

允许 Content-Type：text/plain、multipart/form-data、application/x-www-form-urlencoded

其他限制：

请求头限制

XMLHttpRequestUpload 对象均没有任何事件监听器

请求中没有使用 ReadabkeStream 对象

‘Access-Control-Allow-Header’： ‘X-Test-Cors’(头的名字)

允许跨域的头

‘Access-Control-Allow-Header’： ‘POST, PUT, Delete‘

允许跨域的方法

’Access-Control-Max-Age‘: 跨域的最长时间

#### 缓存 Cache-Control

##### 特性（值）:

##### 可缓存性

​ public

​ private

​ no-cache

​ **到期**

​ max-age=`<seconds>`

​ s-maxage=`<seconds>` 代理服务器

​ max-stale=`<seconds>`

​ **重新验证**

​ must-revalidate

​ proxy-revalidate

​ **其他**

​ no-store 不能用缓存

​ no-transform 不允许改动内容

’Cache-Control‘： ’max-age=200‘ 就能缓存住，

前端构建工具（例如 webpack）在打包时会构建出 hash 值。如果 hash 值没变，就用缓存，hash 值改变（即我们写的新业务）需要用户来读取

#### 缓存验证 Last-Modified 和 Etag 的使用

![缓存验证Last-Modified和Etag的使用](https://i.loli.net/2021/06/03/W7tXPNZ5kuYoL6A.png)

验证头：Last-Modified、Etag

#### Last-Modified

上次修改时间

配合 If-Modified-Since 或者 If-Unmodified-Since 使用

对比上次修改时间以验证资源是否需要更新

##### **Etag**

数据签名

配合 If-Match 或者 If-Non-Match 使用

对比资源的签名判断是否使用缓存（webpack 里的 hash 就是用这个原理）

#### Cookie 和 Session

##### cookie

通过 Set-Cookie 设置

下次请求会自动带上

键值对，可以设置多个

##### cookie 的属性

max-age 和 expires 设置过期时间

Secure 只有 https 的时候发送

HttpOnly 无法通过 document.cookie 访问

```javascript
'Set-Cookie': ['id=123;max-age=10', 'abc=456, domain=test.com']
```

Domain：让同域名下的两个子网站之间的 cookie 通讯

### HTTP 长连接

一个 tcp 连接中能发送多个 http 请求

HTTP 的长连接是建立在 tcp 的基础上，chrome 浏览器最多支持 6 个 http 请求（公用一个 tcp 连接）

在 http header 里写

Connection：keep-Alive

### 数据协商

#### 分类

请求（request）

返回（response）

request 中的 Accept

Accept：数据类型

Accept-Encoding：编码方式

Accept-Language：语言

User-Agent：浏览器信息

response 中的 Content

Content-Type: 数据格式

Content-Encoding: 编码方式 `gzip`

Content-Language：语言

#### Redirect

```javascript
if (request.url === "/") {
    response.writeHead(302, {
        Location: "/new",
    });
    response.end("");
}
if (request.url === "/new") {
    response.writeHead(200, {
        "Content-Type": "text/html",
    });
    response.end("<div>hello,world</div>");
}
```

HTTP 状态码：

302 临时跳转

301 永久跳转 （谨慎，你使用了之后就不好控制了）

### Nginx

```nginx
server {
	listen 	80;
	server_name test.com

	location / {
		proxy_pass http://127.0.0.1:888;
		proxy_set_header Host $host;	// 修改头
	}
}
```

代理缓存

服务器中的 Cache-Control:s-maxage 给代理缓存用

no-store 永不缓存

HTTP 头 Vary http 头信息一样才缓存

### HTTPS 解析

#### 加密

私钥和公钥

在 nginx 中配置 https

![在nginx中配置https](https://i.loli.net/2021/06/03/oai5XeD2pWjNUsJ.png)

### HTTP2

#### 优势

信道复用

分帧传输

Server Push

```nginx
server {
	listen 	443 http2；
    server_name test.com;
    http2_push_preload on;
}
```

http/1.1 和 http2 对比网站

https://http2.akamai.com/demo
