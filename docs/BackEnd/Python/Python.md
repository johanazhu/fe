# Python



纯想手作版fastapi最小化docker

https://github.com/liseami/chunxiang-fastapi-temp





赵纯想推荐的入门课程

https://fastapi.tiangolo.com/zh/









### 4.1.3、变量

```python
x = 10
y = "hi, johnny"
z = True
x = "hello world"
```



```python
x = 10
print(id(x)) # 93968532106240
x = 20
print(id(x)) # 93968532106000
```

和 JavaScript 不同，x 复制后，就是一个新的内存地址，值不会被替换



### 4.3、基本数据类型

4.3.1、整型和浮点型

在python中整数都属于整型。python只有一种整型，即`int`类型，无论整型数字多大多小都属于`int`。

```python
x = 10
print(type(x))  # <class 'int'>
```

