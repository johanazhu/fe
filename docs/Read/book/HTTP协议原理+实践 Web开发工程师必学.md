# HTTP协议原理+实践 Web开发工程师必学！



浏览器输入URL后HTTP请求返回的完整过程

![浏览器输入URL后HTTP请求返回的完整过程](../.vuepress/public/images/HTTP/浏览器输入URL后HTTP请求返回的完整过程.png)


## 网络协议分层





![网络协议分层](../.vuepress/public/images/HTTP/网络协议分层.png)



物理层：定义物理设备如何传输数据

数据链路层：在通信的实体间建立数据链路连接

网络层：为数据在节点之间传输创建逻辑链路



#### 传输层

向用户提供可靠的端到端（End-to-End）服务

传输层向高层屏蔽了下层数据通信的细节



#### 应用层

为应用软件提供了很多服务

构建于TCP协议之上

屏蔽网络传输相关细节



### HTTP协议发展历史

#### HTTP/0.9

只有一个命令GET

没有HEADER等描述数据的信息

服务器发送完毕，关闭TCP连接（现在的http1.1：在一个TCP中能传递多个HTTP）

#### HTTP/1.0

增加了很多命令

增加status code 和header

多字符集支持、多部分发送、权限、缓存等

#### HTTP/1.1

持久连接

pipeline

增加host和其他一些命令

#### HTTP/2.0

所有数据以二进制传输

同一个连接里面发送多个请求不再需要按照顺序来

头信息压缩以及推送等提高效率的功能



### HTTP三次握手

![HTTP三次握手](/images/HTTP/HTTP三次握手.png)

为什么要三次握手？





### URI、URL、URN

#### URI 

Uniform Resource Identifier/统一资源标识符

用来标识互联网上的信息资源，唯一

包括URL和URN

#### URL

Uniform Resource Locator/统一资源定位器

就是网站地址：http://www.baidu.com

http://user:pass@host.com:80/path?query=string#hash

此类格式的都叫做URL,比如ftp协议（文件协议）

#### URN

永久统一资源定位符

在资源移动之后还能被找到

目前还没有非常成熟的使用方案



### HTTP报文格式


![HTTP报文格式](../.vuepress/public/images/HTTP/HTTP报文格式.png)

#### HTTP的方法

用来定义对于资源的操作

常用的有GET、POST、PUT、DELETE等

从定义上讲有各自的语义



#### HTTP的CODE

定义服务器对请求的处理结果

各个区间的CODE有各自的语义

100：

200：

300：

400：

500：

好的HTTP服务可以通过CODE判断结果



### 第三章：HTTP的各种特性总览

使用curl来模式客户端请求

```javascript
curl -v www.baidu.com
```



CORS跨域请求的限制与解决



浏览器的同域限制

JSONP

‘Access-Control-Allow-Origin’： ‘*’



#### CORS预请求

允许方法：GET、HEAD、POST

允许Content-Type：text/plain、multipart/form-data、application/x-www-form-urlencoded

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

##### 	可缓存性

​		public

​		private

​		no-cache

​	**到期**

​		max-age=`<seconds>`

​		s-maxage=`<seconds>` 代理服务器

​		max-stale=`<seconds>` 

​	**重新验证**

​		must-revalidate

​		proxy-revalidate

​	**其他**

​		no-store 不能用缓存

​		no-transform	不允许改动内容



’Cache-Control‘： ’max-age=200‘ 就能缓存住，

前端构建工具（例如webpack）在打包时会构建出hash值。如果hash值没变，就用缓存，hash值改变（即我们写的新业务）需要用户来读取



#### 缓存验证Last-Modified和Etag的使用


![缓存验证Last-Modified和Etag的使用](../.vuepress/public/images/HTTP/缓存验证Last-Modified和Etag的使用.png)

验证头：Last-Modified、Etag

#### Last-Modified

上次修改时间

配合If-Modified-Since或者If-Unmodified-Since使用

对比上次修改时间以验证资源是否需要更新

##### **Etag**

数据签名

配合If-Match或者If-Non-Match使用

对比资源的签名判断是否使用缓存（webpack里的hash就是用这个原理）



#### Cookie和Session

##### cookie

通过Set-Cookie设置

下次请求会自动带上

键值对，可以设置多个

##### cookie的属性

max-age和expires设置过期时间

Secure只有https的时候发送

HttpOnly无法通过document.cookie访问



```javascript
'Set-Cookie': ['id=123;max-age=10', 'abc=456, domain=test.com']
```



Domain：让同域名下的两个子网站之间的cookie通讯



### HTTP长连接

一个tcp连接中能发送多个http请求

HTTP的长连接是建立在tcp的基础上，chrome浏览器最多支持6个http请求（公用一个tcp连接）

在http header里写 

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
if(request.url === '/') {
    response.writeHead(302, {
        'Location': '/new'
    })
    response.end('')
}
if(request.url === '/new') {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    response.end('<div>hello,world</div>')
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

服务器中的Cache-Control:s-maxage 给代理缓存用

no-store 永不缓存

HTTP 头 Vary	http头信息一样才缓存





### HTTPS解析

#### 加密

私钥和公钥



在nginx中配置https


![在nginx中配置https](../.vuepress/public/images/HTTP/在nginx中配置https.png)


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