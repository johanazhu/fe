# JavaScript 设计模式核心原理笔记



### 核心思想

​	SOLID 设计原则

> ​		“SOLID”是由罗伯特·C·马丁在 21 世纪早期引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。	

分别是：

- 单一功能原则（Single Responsibility Principle）
- 开发封闭原则（Opened Closed Principle）
- 里市替换原则（Liskov Substitution Principle)
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

#### 设计模式的核心思想——封装变化

将变与不变分离，确保变化的部分灵活、不变的部分稳定



### 设计模式中的“术”

 二十年前，四位程序员前辈（Erich Gamma, Richard Helm, Ralph Johnson & John Vlissides）通过编写《设计模式：可复用面向对象软件的基础》这本书， 阐述了设计模式领域的开创性成果。在这本书中，将23种设计模式按照“创建型”、“行为型”和“结构型”进行划分： 

![23种设计模式](https://i.loli.net/2021/06/03/Pjf1Au3QMev74ca.png)

无论是创建型、结构型还是行为型，这些具体的设计模式都是在用自己的方式去封装不同类型的变化。

​	创建型模式封装了创建对象过程中的变化，比如工厂模式，他做的事情就是讲创建对象的过程抽离;

​	结构型模式封装的是对象之间组合方式的变化，目的在于灵活地表达对象间的配合与依赖关系；

​	行为型模式则将是对象千变万化的行为进行抽离，确保我们能够更安全、更方便地对行为进行更改









设计原则

分类依据



创建型

工厂模式

抽象工厂模式

原型模式



结构型

装饰器模式

适配器模式

代理模式



行为型

观察者模式

策略模式

状态模式

迭代器模式















思考：

实例和类的关系

为什么要有实例

为什么不能用类来实现代码

new Function()

new Error()

new Array()

new Object()

...

为什么要 new 它，为什么要实例化它

















