# let 和 const

https://www.cnblogs.com/zhuzhenwei918/p/6131345.html



我用了两个月的时间才理解 let

https://zhuanlan.zhihu.com/p/28140450



块级作用域和暂时性死区。

之前的var变量，会有变量提升的概念。即你在任何处用var定义变量，一开始会js引擎会将其变量置位顶部（以 `undefined` 的形式，再执行到赋值时，再赋值）

但是用let、const 声明的变量，则不会有变量提升的概念，在定义let之前，不能调用let声明的变量，不然会报错，在块级作用域的开始到let声明的前一行，这块区域被称为`暂时性死区`