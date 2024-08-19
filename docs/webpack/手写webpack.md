# 手写 webpack



webpack 做了两个问题

- 把 import、export 转译为普通代码
- 把所有文件打包成一个文件





## 怎么把 import/ export 转移成函数

@babel/core 已经帮我们做了



import 关键字会变成 require 函数

export 关键字会变成 exports 对象

本质：ESModule 语法变成了 CommonJs 规则

但目前我们不知道 require 函数怎么写，先不管，假设 require 已经写好了





## 把多个文件打包成一个

打包成一个什么样的文件

肯定包含了所有模块，然后能执行所有模块



```javascript
var depRelation = [
    {key: 'index.js', deps:['a.js','b.js'], code: function... },
    {key: 'a.js', deps: ['b.js'], code: function...},
 	{key: 'b.js', deps: ['a.js'], code: function... }
]
execute(depRelation[0].key) // 执行入口文件
function execute(key) {
    var item = depRelation.find(i => i.key === key)
    item.code()
}
```

### 待解决

1.depRelation 是对象，需要变成一个数组

2.code 是字符串，需要变成一个函数

3.execute 函数待完善





### 如何创建最终文件

打包

把 ES6 代码转译为 ES5 版本

所有代码合并到一个文件中







## 参考资料

-   [实现一个简单的 Webpack](https://juejin.cn/post/6844903858179670030)
-   [90 行代码的 webpack，你确定不学吗？](https://mp.weixin.qq.com/s/vpQq3FcJuQkKXvxsq8c9Bw)
-   [微医前端带你从头建立构建体系【开篇】](https://mp.weixin.qq.com/s/-8rsHyu2nys_37nVlWiyCg)
