# RESTful

## RESTful API 是什么？

### 什么是 REST

REST 的全称是 Representational state transfer

-   Representational：数据的表现形式（JSON、XML...）
-   state：当前状态或者数据
-   transfer：数据传输

它描述了一个系统如何与另一个交流。比如一个产品的状态（名字，详情）表现为 XML，JSON 或者普通文本

REST 有六个约束：

-   Client—Server（客户端——服务器端）
-   Stateless（无状态）
-   Cache（缓存）
-   Uniform Interface（统一接口）
-   Layered System（分层系统）
-   Code-On-Demand（按需代码）

### 最佳实践

#### 请求设计规范

-   URI 使用名词，尽力使用复数，如 /users
-   URI 使用 嵌套 表示 关联关系，如 /users/123/repos/234
-   使用 正确的 HTTP 方式，如 GET/POST/PUT/DELETE

#### 相应设计规范

-   查询
-   分页
-   字段过滤

如果记录数量很多，服务器不可能都将它们返回给用户。API 应该提供参数，过滤返回结果。如以下代码参考：

```bash
?limit=10:指定返回记录的数量
?offest=10:指定返回记录的开始位置
?page=2&pre_page=100:指定第几页，以及每页的记录数
?sortby=name&order=asc:指定返回结果按照哪个属性排序，以及排序顺序
?animal_type_id=1:指定筛选条件
```

-   状态码
-   错误处理

就像 HTML 的错误页面向访问者展示了有用的错误消息一样，API 也应该用之前清晰易读的格式来提供有用的错误消息
