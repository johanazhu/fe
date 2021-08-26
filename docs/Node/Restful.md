# Restful



### 什么是Restful

概念是什么

#### REST是什么？

- 万维网软件架构风格
- 来用创建网路服务

#### 为何叫 REST？

- Representational State Transfer
- Representational: 数据的表现形式（JSON、XML......）
- State：当前状态或者数据
- Transfer：数据传输



#### Restful 请求设计规范

- URI 使用名词，尽量用复数，如 /users
- URI 使用嵌套表示关联关系，如 /users/12/repos/5
- 使用正确的 HTTP 方法，如 GET/POST/PUT/DELETE
- 不符合 CRUD 的情况： POST/action/子资源
- 
