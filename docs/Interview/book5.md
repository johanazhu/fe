# 模拟题五

1. 谈谈变量提升

考察点：变量提升
变量是会提升的。var 申明的变量会提升至顶部，然后赋值时在执行
函数提升的权重大于变量提升

2. new 操作符具体做了什么

考察点：new 操作符

在内存中创建一个新对象
这个新对象的[[prototype]] 指向被赋值为构造函数的 prototype 属性
构造函数内部的 this 被赋值为这个新对象
执行构造函数内部的代码
如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

3. 介绍下盒子模型

考察点：盒子模型

盒子模型由 margin、border、padding、content 组成
分两种
标准盒子模型
width= content 宽度
height= content 高度
IE 模型
width=border+content+padding
height=border+content+padding
标准盒子模型：box-sizing:content-box
IE 盒子模型：box-sizing:border-box

4. 有哪些方法可以使 div 居中

考察点：div 居中

分三种情况，水平居中，垂直居中，水平垂直居中

单水平居中而言，居中元素不定宽高
absolute+transform
flex 属性居中
flex + 子项 margin auto
grid 属性居中
grid 子项 margin auto
grid 子项属性居中
-webkit-box 属性居中
table-cell + text-align
line-height + text-align
writeing-mode
table
居中元素需定宽高
须知宽高+absolute+负 margin
须知宽高+absolute+calc
须知宽高+absolute+margin auto
局限性较大的全局居中
须知宽高+fixed+transform
须知宽高+fixed+负 margin
须知宽高+fixed+calc
须知宽高+fixed+margin auto

5. 有听说过前端性能优化指标 RAIL 吗

考察点：性能优化指标 RAIL

6. 进程和线程的区别

考察点：进程和线程
进程是一个应用起来的实例，线城是运行在进程中的最小单位

7. tcp 滑动窗口是什么

考察点：tcp

8. 实现一个斐波那契数列

考察点：斐波那契数列
