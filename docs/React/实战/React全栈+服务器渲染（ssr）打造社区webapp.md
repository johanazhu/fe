## React全栈+服务器渲染（ssr）打造社区webapp



#### 多页应用

​	jQuery

​	mootools

​	YUI

#### 单页应用

​	

模块化工具

无

seajs 中文 CMD规范

requirejs	AMD规范



Backbone.js

React

Vue

Angular



##### 模块化工具

webpack

rollup

browserify



优化方法

​	合并资源文件，减少http请求

​	压缩资源文件减小请求大小

​	利用缓存机制，尽可能使用缓存减少请求



同构框架 next.js





redis基础使用

支持多种数据结构

密码登录

redis 键值对

```redis
set a 111	// 设置key
	
get a	// 得到key

KEYs * // 查看所用定义的key

DEL a	// 删除key	
```



node中使用redis

阿里工程师  	ioredis



集成antD



next不能处理css文件

改变默认配置项

创建next.config.js



如何分模块加载组件



路由

Link

Router

动态路由

只能通过query

路由衍射 as



路由的钩子

routeChangeStart

routeChangeComlete

routeChangeError

beforeHistoryChange

hashChangeStart

hashChangeComplete



数据获取方式

规范

getInitialProps 



自定义app

固定Layout

保持一些公用的状态

给页面传入一些自定义数据

自定义错误处理



自定义document

只有在服务端渲染的时候才会被调用

用来修改服务端渲染的文档内容

一般用来配合第三方css-in-js方案使用



定义样式



styled-component



lazyLoading

异步加载模块

​	moment

异步加载组件





ssr流程

开始

浏览器发起page请求

koa接受到请求，并调用nextjs

nextjs开始渲染

调用app的getInitialProps

调用页面上的getInitialProps

渲染出最终html

返回给浏览器



#### Hooks

让函数组件具有类组件的能力

state Hooks

​	useState		基于useReducer

​	useReducer

effect Hooks

​	uesEffect

​	useLayoutEffect	

context Hook

ref Hook

优化Hooks

​	memo

​	useMemo

​	useCallback

闭包陷阱





redux

reducer 纯粹的方法，不应该有任何副作用

action 就是一个对象，告诉reducer要做什么



ReduxThunk 异步解决方案

applyMiddleware(ReduxThunk)



react-redux



HOC：接受组件作为参数并返回新的组件

一层包着一层



nextjs集成redux

需要考虑的问题

服务端如何写入数据到store

如何同步服务端的数据到客户端





OAuth 介绍和接入

认证和授权

什么叫认证



需要考虑的问题

让用户设置高强度的密码

对密码存储进行加密

要保证客户端和服务端进行安全通行，防止密码被中间人获取

将密码保存在安全的数据库中

为忘记密码的用户提供恢复密码的功能

为了更进一步的安全，实施两部验证（流程较为复杂）

什么是授权

OAuth通过token授予权限



什么是OAuth

是一种行业标准的授权方式

版本

1.x

2.x

角色

客户端

服务端

授权服务器

客户端和服务端可以合并为被授权方式

多种授权方式

Authorization Code

Refresh Token

Device Code 

Password

Implicit

Client Credentials



















