# Python



一切皆对象（Object）

有自己从属的数据类型

有属性（attribute）和方法（method）/函数（function）



### Python 标准的数据类型 Data Types

- 数字（Number）
- 字符（String）
- 列表（List）
- 字典（Dictionary）
- 元组（Tuple）
- 集合（Set）



### Number

#### 整数（integer）

- 0.1

浮点数（float）





# Python

展哥视频课程：

https://www.bilibili.com/video/av23687046



书：

笨方法学python



廖雪峰的python3 教程

https://www.liaoxuefeng.com/wiki/1016959663602400/1016966022717728





### 数据类型

#### 整数

#### 浮点数

#### 字符串

#### 布尔值

布尔值可以用 `and` 、 `or` 和 `not` 运算。

#### 空值

空值是Python里一个特殊的值，用`None`表示。`None`不能理解为`0`，因为`0`是有意义的，而`None`是一个特殊的空值。



### 变量

变量不仅可以是数字，还可以是任意数据类型。

它是个动态语言

本量本身类型不固定

#### 内存

```python
a = 'ABC'
```

python 解释器干了两件事请：

1. 在内存中创建了一个`'ABC'` 的字符串；
2. 在内存中创建了一个名为 `a` 的变量，并把它指向 `'ABC'`



#### 常数

所谓常量就是不能变的变量，比如常用的数学常数π就是一个常量。

```python
PI = 3.14159265359
```



注意：Python的整数没有大小限制，而某些语言的整数根据其存储长度是有大小限制的，例如Java对32位整数的范围限制在`-2147483648`-`2147483647`。

Python的浮点数也没有大小限制，但是超出一定范围就直接表示为`inf`（无限大）

