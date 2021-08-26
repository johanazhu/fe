# Redis

## 什么是Redis

Redis 是一个开源（BSD许可）的内存数据结构存储，用作数据库，缓存和消息代理。

它支持的数据结构：string，list，set，sorted set，hash

- Redis 是由 C 语言写的
- 数据模型为 key-value





## 特点

- 速度快，因为数据存在内存中，类似于 HashMap
  - HashMap的特点是查找和操作的时间复杂度为O(1)
- 可持久化
- 可用于缓存，消息，按 key 设置过期时间，过期后将自动删除





## 应用场景

目前的场景就是当作缓存用







## 常见命令行

| 命令名        | 描述          |
| ------------- | ------------- |
| keys *        | 查看所有的key |
| set key value | 设置key-value |
| get key       | 得到某个key   |
| del key       | 删除某个key   |
|               |               |
|               |               |





## 实战

到现在还没用到





