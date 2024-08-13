# 手写 plugin





webpack 流程图

init

run

compile 编译开始

compilation 开始编译的过程

make 编译

afterCompilation 编译结束

seal 对代码进行封装，合并，优化

codeGen 生成最终的代码，比如把多个文件合并为一个文件

emit 发射一个文件，把文件写进硬盘里面

done 结束



### imagemin-webpack-plugin

emit

![image-20240811183746700](D:\Documents\PicGo Files\image-20240811183746700.png)









### clean-webpack-plugin



![image-20240811183758201](D:\Documents\PicGo Files\image-20240811183758201.png)









### 自己写 webpack plugin

https://webpack.js.org/contribute/writing-a-plugin/

对 webpack hooks 的了解

对编译原理的了解

对 chunk、hash、module、dep、factory 等概念的理解



```javascript
class MyExampleWebpackPlugin {
  apply(compiler) {
  	// 监听 hooks
  }
}
```











## 参考资料

-   [为什么 webpack4 默认支持 ES6 语法的压缩？](https://juejin.cn/post/6844903935413583880)
-   [手把手带你入门 Webpack Plugin](https://mp.weixin.qq.com/s/8oDENjCOsXxlA2fyuIN4GA)
-   [Webpack - 手把手教你写一个 loader / plugin](https://mp.weixin.qq.com/s/T9H5HYpo-MBgZiSnaHTi0A)
