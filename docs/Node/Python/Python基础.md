# Python 基础



## 原始数据类型

六个标准的数据类型

- Number（数字）
- String（字符串）
- List（列表）
- Tuple（元组）
- Set（集合）
- Dictionary（字典）

其中三个可变数据，三个不可变数据

- **不可变数据（3 个）：**Number（数字）、String（字符串）、Tuple（元组）；
- **可变数据（3 个）：**List（列表）、Dictionary（字典）、Set（集合）





## 变量和集合

```python
# 在给变量赋值前不用提前声明
# 习惯上变量命名是小写，用下划线分隔单词
some_var = 5
some_var # => 5

# 访问未赋值的变量会抛出异常
# 参考流程控制一段来学习异常处理
some_unknown_var # 抛出 NameError

# if 可以用作表法式，它的作用等同于三元运算符 "? :"
"yay!" if 0 > 1 else "nay!" # => nay!

```

### 列表

```python
# 用列表（list）存储序列
li = []
other_li = [4, 5, 6]

# 用 append 在列表最后追加元素
li.append(1) # [1]
li.append(2) # [1, 2]
li.append(4) # [1, 2, 4]
li.append(3) # [1, 2, 4, 3]
# 用 pop 从列表尾部删除
li.pop() # => 3 且li现在是[1, 2, 4]
# 把 3 再返回去
li.append(3) # [1, 2, 4, 3]

# 列表存取跟数组一样
li[0] # => 1
# 取出最后一个元素
li[-1] # => 3

# 越界存取会造成 IndexError
li[4] # 抛出 IndexError

# 列表有切割语法
li[1:3] # => [2, 4]
```



### 元组

```python
# 元组类似列表，但是不允许修改
tup = (1, 2, 3)
tup[0] # => 1
tup[0] = 3 # 抛出 TypeError
```



### 字典

```python
# 字典用来存储 key 到 value 的映射关系
empty_dict = {}
# 初始化的字典
filled_dict = {"one":1, "two": 2, "three": 3}
```



### 集合

```python
# 用 set 表达集合
empty_set = set()
# 初始化一个集合，语法跟字典相似
some_set = {1, 1, 2, 2, 3, 4} # some_set现在是 {1, 2, 3, 4}
```





### 内置函数

```python
# print是内置的打印函数
print("I'm Python. Nice to meet you!")
# type() 函数可以用来查询变量所指的对象类型。
a, b, c, d = 20, 5.5, True, 4+3j
print(type(a), type(b), type(c), type(d))
#<class 'int'> <class 'float'> <class 'bool'> <class 'complex'>
```



### 关键字

```python
# del 删除项
filled_dict = {"one": 1, "two": 2, "three": 3}
del filled_dict["one"]
```



## 流程控制和迭代器

```python
# 先随便定义一个变量
some_var = 5

# 这是个if语句。注意缩进在Python里是有意义的！
# 缩进要使用 4 个空格而不是 tabs。
# 这段代码会打印 "some_var is smaller than 10"
if some_var > 10:
    print("some_var is totally bigger than 10.")
elif some_var < 10:    # elif 语句是可选的
    print("some_var is smaller than 10.")
else:                  # else 也是可选的
    print("some_var is indeed 10.")
```





## 函数

```python
# 用 def 定义新函数
def add(x, y):
    print("x is {} and y is {}".format(x, y))
    return x + y # 用 return 语句返回

# 调用函数
add(5, 6) # => 打印 "x is 5 and y s 6" 并且返回 11

# 通过关键字参数调用函数
add(y=6,x=5) # 关键字参数可以用任何顺序

# 定义一个可变参数函数
def varargs(*args)
	return args

varargs(1, 2, 3) # => (1, 2, 3)
```



### 函数作用域

```python
x = 5

def setX(num):
    # 局部作用域的 x 和全局作用域下的 x 是不同的
    x = num # => 43
    print(x) # => 43
    
def setGlobalX(num):
    global x
    print (x) # => 5
    x = num # 现在全局作用域下的 x 被赋值
    print (x) # => 6
    
setX(43)
setGlobalX(6)
```



### 函数是一等公民

```python
def create_adder(x):
    def adder(y):
        return x + y
    return adder

add_10 = create_adder(10)
add_10(3) # => 13
```



### 匿名函数

```python
(lambda x: x > 2)(3) # => True
(lambda x, y: x ** 2 + y ** 2)(2, 1) # => 5
```



## 模块

```python
# 导入模块
import math
print(math.sqrt(15)) # => 4.0

# 导入模块中具体的函数
from math import ceil, floor
print(ceil(3.7)) # => 4.0
print(floor(3.7)) # => 3.0

# 导入模块中的所有函数，但此操作不推荐
from math import *

# 简化模块名
import math as m
math.sqrt(16) === m.sqrt(16) # => True
```



## 类

```python
# 我们使用 "class" 语句来创建类
class Human:
    
    # 一个类的字段。这个字段共享给这个类的所有实例
    species = "H. sapiens"
    
    def __init__(self, name):
        self.name = name
        
        self._age = 0
        
    def say(self, msg):
        print("{name}: {message}").format(name=self.name. message=msg)
        
    def sing(self):
        return 'yo... yo...'
    
    # 类方法，被所有此类的实例共用
    # 第一个参数是这个类对象
    @classmethod
    def get_species(cls):
        return cls.species
    
    # 静态方法。调用时没有实例或类的绑定
    @staticmehod
    def grunt():
        return '*grunt'
    
    # property 类似 getter
    # 它把方法 age() 转换为同名并且只读的属性
    # 通常情况下，可以不需要编写复杂的 getter 和 setter
    
    @property
    def age(self):
        return self._age
    
    # 允许属性被修改
    @age.setter
    def age(self, age):
        self._age = age

    # 允许属性被删除
    @age.deleter
    def age(self):
        del self._age
```

### 类的继承

继承机制允许子类可以继承父类上的方法和变量

我们可以把 Human 类作为一个基础类或者叫做父类

然后定义一个名为 Superhero 的子类继承父类上的比如 ”species“、”name“、”age“ 的属性和比如 ”sing“、”grunt“ 这样的方法，同时，也可以定义它自己独有的属性

基于 Python 文件模块化的特点，你可以把这个类放在独立的文件中，比如说，human.py

要从别的文件导入函数，需要使用以下语句：`from "filename" import "function-or-class"`

```python
from human import Human

# 指定父类作为类初始化的参数
class Superhero(Human):
    
```



### 多重继承







## Python 基础

### 变量

- 定义变量
- 关键字
- 命名规则
- 基础数据类型
- 类型转换

### 运算符和表达式

### 流程控制

- 条件分支
- 循环

### 基础数据类型

- 数字
- 字符串
- 列表
- 元组
- 集合
- 字典

### 函数

- 定义
- 参数传递
- 作用域
- lambda 表达式
- 常用内置函数

### 面向对象编程⭐ 

- 类和对象
- 三大特性
  - 封装
    - self
    - 属性
    - 方法
      - 类方法
      - 实例方法
      - 静态方法
    - 访问控制
  - 继承
    - 单继承
    - 多继承
  - 多态
    - 方法重写
- 运算符重载
- 装饰器
- 反射

### 模块

- 导入模块
- 常用模块
  - 文件处理
  - 日期时间

### 包

- 导入包
- 生成包

### 异常处理

- 捕获异常
- try ... else ... finally 结构
- 自定义异常

### 文件操作

- 文件开闭
- 文件读写



## Python 进阶

### 函数进阶

- 闭包
- 匿名函数
- 生成器函数
- 装饰器函数
- 高阶函数

### 正则表达式

### 数据库编程

- 数据库基础
- SQL 编写
- 查询
  - 聚合
  - 分组
  - 关联
  - 排序
- 事务
- 数据库设计
- 数据库调优

### 并发编程

- 同步和异步
- 阻塞和非阻塞
- 多线程
- 多进程
- 协程
- 并发类库

### 网络编程

- 网络基础（七层模型、IP）
- 网络协议（TCP、UDP、HTTP、HTTPS、FTP、DNS）
- WebSocket



## web 开发

### Diango框架

- 安装与 Demo
- MVT 分层
- 模型
  - 数据库基础
  - ORM
    - 单表查询
    - 夺标查询
    - 聚合查询
- 视图
- 模板
  - 模板语法
  - 静态资源
- 路由
- Diango Admin 管理工具
- 测试
- 会话
- 鉴权
- 文件上传
- 中间件
- 高级特性
  - 分页
  - 缓存
    - 本地缓存
    - Redis 分布式缓存
  - 序列化
  - 信号
  - celery 任务调度
- Restful API 开发
  - 概念
  - 数据序列化
  - Django Rest Framework
- 部署
- 项目实战

### Flask 框架





## 常见问题

1.导入包的形式和 JavaScript 的 ES6 模块不同

导入模块中具体的函数

`from math import ceil, floor`

`from . import admin`：什么意思



2.在 vscode 中引入 flask

https://code.visualstudio.com/docs/python/tutorial-flask



3.文件名及包名



## 参考资料

- [【Python入门课】最容易听懂的 Python 零基础入门课](https://www.bilibili.com/video/av23687046)
- [Python 教程](https://www.liaoxuefeng.com/wiki/1016959663602400/1016966022717728)
- [Y分钟速成X](https://learnxinyminutes.com/)
