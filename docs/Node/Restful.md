# RESTful是个啥东西



## 一句话

用 URL 定位资源，用 HTTP 描述操作

看 URL 就知道你要什么资源

看 HTTP method 就知道你要干什么

看 status code 就知道结果是什么



## 是什么

RESTful架构风格最初由Roy T. Fielding（HTTP/1.1协议专家组负责人）在其2000年的博士学位论文中提出。

REST 即 Representational State Transfer 的缩写，可译为”表现层状态转化“

- Representational: 数据的表现形式（JSON、XML......）
- State：当前状态或者数据
- Transfer：数据传输

## 特点

REST 最大的特点为：资源、统一接口、URI和无状态

- 资源
  - 数据也好、服务也罢。都是资源
  - 以 json 为载体展示
- 统一接口
  - 增删改查（CRUD）分别对应 HTTP 方法
    - GET 查询
    - POST 增加
    - PUT 更新（PATCH也是更新，修改部分资源）
    - DELETE 删除
- URI
  -  URI（统一资源定位符）指向资源，URI 就是一个资源的地址或标识符
- 无状态
  - 所有的资源，都可以通过 URI 定位，而且这个定位与其他资源无关
  - 对每个资源的请求，都不依赖于其他资源或其他请求



## 参考资料

- [怎样用通俗的语言解释REST，以及RESTful？](https://www.zhihu.com/question/28557115)
- [RESTful 架构风格概述](https://blog.igevin.info/posts/restful-architecture-in-general/)
