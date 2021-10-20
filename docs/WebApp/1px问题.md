# 1像素问题



在解决1像素问题之前，我们需要知道为什么产生这个原因，简单来说，就是手机设备的



### 产生背景





### 解决方案

解决方案很多种，大多算曲线救国（Mobile Hack），例如把图片做成要2px，上部1px为透明，下部1px为视觉颜色，然后用过 border-image 或者 background 来定位露出的1px（background 的兼容性比border-image 好），这两者的缺点在于修改颜色麻烦，需要替换图片，因为图片是位图，像素会有模糊的风险





以上讲了7种解决1像素问题的解决方案，但是实际开发中，你会发现，事实并没有你想象中那么简单，例如你如果要对 Media Query 做兼容，应该要写在哪里，如何做到一套代码多处使用

### 开发中的解决方案







1像素问题

https://github.com/AlloyTeam/Mars/blob/master/solutions/border-1px.md







































































参考资料：

1像素问题是由于什么原因产生的

https://www.jianshu.com/p/7e63f5a32636



1像素

https://zhuanlan.zhihu.com/p/73261198



6种移动端1px解决方案（完整版）

https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247485314&idx=1&sn=0296e60f54e12951d7c5b08f8849c4a1&chksm=c0668614f7110f025c8e8897c1a14aabae09c1cf8ca37aa90ee36f451b5455008300270e8f54&mpshare=1&scene=1&srcid=&sharer_sharetime=1586389734453&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



关于移动端开发1px线的一些理解

https://zhuanlan.zhihu.com/p/73261198



7种方法解决移动端Retina 屏幕 1px 边框问题

https://www.jianshu.com/p/7e63f5a32636



0.5 像素的边框，怎么做

