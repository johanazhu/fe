# Redis

## 什么是 Redis

Redis 是一个开源（BSD 许可）的内存数据结构存储，用作数据库，缓存和消息代理。

它支持的数据结构：string，list，set，sorted set，hash

-   Redis 是由 C 语言写的
-   数据模型为 key-value

## 特点

-   速度快，因为数据存在内存中，类似于 HashMap
    -   HashMap 的特点是查找和操作的时间复杂度为 O(1)
-   可持久化
-   可用于缓存，消息，按 key 设置过期时间，过期后将自动删除

## 应用场景

目前的场景就是当作缓存用



`redis.cli -v`：查看 redis 版本





启动 reids

```bash
redis-server
```

查看 reids 是否启动

重新开个窗口

```bash
redis-cli
```

以上命令将打开以下终端：

```bash
redis 127.0.0.1:6379>
```

127.0.0.1 是本机 IP ，6379 是 redis 服务端口。现在我们输入 PING 命令。

```bash
redis 127.0.0.1:6379> ping
PONG
```

退出 redis 终端

CTRL+C 或者 exit

![redis命令](https://s2.loli.net/2022/09/26/UzI9sCcKW3ERO1p.png)

### 如何后台启动 redis

修改 redis.conf 文件中的 daemonize 

开启 `daemonize  yes` 报错退出

如何找到 redis.conf

```bash
find / -name redis.conf
```

使用 redis-server 启动 redis.conf 配置文件

```bash
redis-server ./redis.conf
```

> PS：redis-server 为 bin 命令，在 redis.conf 目录下

![redis.conf](https://s2.loli.net/2022/09/26/8gFKCVcT3UqG5H4.png)



## 常见命令行

| 命令名        | 描述           |
| ------------- | -------------- |
| keys \*       | 查看所有的 key |
| set key value | 设置 key-value |
| get key       | 得到某个 key   |
| del key       | 删除某个 key   |

## 实战

到现在还没用到
