# Git的教程



- Git的四大工作区域
- Git的工作流程
- Git文件的四种状态
- 一张图解释Git的工作原理



## Git的四大工作区域





![工作区域](D:\code\project\elaine\fe\docs\.vuepress\public\images\Git\工作区域.jpg)

- Workspace：就是你在电脑上看到的目录
- Index/Stage：暂存区，一般存放在 .git 目录下。执行 `git add`，改动添加到这个区域
- Repository：本地仓库，git clone 到本地的仓库地址，执行 `git commit`，文件改动就到本地仓库了
- Remote：远程仓库。顾名思义



https://mp.weixin.qq.com/s?__biz=MzIyMjYyMzg3MA==&mid=2247492732&idx=4&sn=0c34f35abb5fa302a96a0042a50f2f30&chksm=e828056ddf5f8c7ba2a56e31791aa165f1fe8adcc7b5c096e3262daf9705f06e2ab4ad3de23d&mpshare=1&scene=1&srcid=0910krxgnv3Liuzb49GOBZmi&sharer_sharetime=1599738646012&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&key=872f9623724a6dd221949b7ce0d2e0aa613d54db701cb919177bc85de1a92a2ce50df621a0671ba097c51a7ea147309937784d145f0a4df684a491d7d344343ff26417e08c38151469111aef76069b476fa5c5f56d5438e08b8ad05b1dc21b291c39569a8527dabdd06280a721b2d116ca0b4564b3de93d1c149f4969a344c64&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AW3m0f70UzN%2BI4UtOYkdVKM%3D&pass_ticket=B6FNKnnbZTjKt8UKWmUWP6xoShmkcsXlRS3%2BQ43mwno9yzUlbhReyMePJTWAeYe5&wx_header=0





### 如何理解工作区与暂存区的区别？

工作区：就是你在电脑上看到的目录，比如目录下gittest里的文件（.git隐藏目录版本库除外）。或者以后需要再新建的目录文件等都属于工作区范畴

版本库（Repository）：工作区有一个隐藏目录.git，这个不属于工作区，这是版本库。其中版本库里面存了很多东西，其中最重要的就是stage（暂存区）



好代码是管出来的——Git的分支工作流与Pull Request

https://www.cnblogs.com/selimsong/p/9059964.html





手撕git，告别盲目记忆

https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651235750&idx=1&sn=bdc3d6938b34638c3868d3c69e763f8b&chksm=bd497c228a3ef53478d4c6e9cf3f266f684dc76525917674d0bfa91d50e757837e7545480492&mpshare=1&scene=1&srcid=&sharer_sharetime=1582329694574&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



git的奇技淫巧

https://github.com/521xueweihan/git-tips





程序员必备基础：Git 命令全方位学习

https://mp.weixin.qq.com/s?__biz=MzIyMjYyMzg3MA==&mid=2247492732&idx=4&sn=0c34f35abb5fa302a96a0042a50f2f30&chksm=e828056ddf5f8c7ba2a56e31791aa165f1fe8adcc7b5c096e3262daf9705f06e2ab4ad3de23d&mpshare=1&scene=1&srcid=0910krxgnv3Liuzb49GOBZmi&sharer_sharetime=1599738646012&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&key=872f9623724a6dd221949b7ce0d2e0aa613d54db701cb919177bc85de1a92a2ce50df621a0671ba097c51a7ea147309937784d145f0a4df684a491d7d344343ff26417e08c38151469111aef76069b476fa5c5f56d5438e08b8ad05b1dc21b291c39569a8527dabdd06280a721b2d116ca0b4564b3de93d1c149f4969a344c64&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AW3m0f70UzN%2BI4UtOYkdVKM%3D&pass_ticket=B6FNKnnbZTjKt8UKWmUWP6xoShmkcsXlRS3%2BQ43mwno9yzUlbhReyMePJTWAeYe5&wx_header=0



在线学习git

https://learngitbranching.js.org/?locale=zh_CN



git 官方文档

https://git-scm.com/book/zh/v2



图解git

https://my.oschina.net/xdev/blog/114383



git-flow 备忘清单

http://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html



天猪对git 的理解（知乎）

https://www.zhihu.com/question/20070065/answer/16021641?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128&utm_content=sec



一张脑图带你全面掌握 git 命令

https://mp.weixin.qq.com/s?__biz=Mzg5NDEyMzA2NQ==&mid=2247485885&idx=1&sn=fb026c79d62160e30c8a573b88292ada&chksm=c02524ebf752adfd0d5d8a779ab4935a1c3bf7c3d6c901a816c52847c4f0083ddd0576a486f4&mpshare=1&scene=1&srcid=09157qmCiBiWZ7XiqTZVoupe&sharer_sharetime=1600137668493&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&key=6614a0a10b7b6719893163c2d47988f8f6b7aba22cad0bb980c58ef9ad491d18382e59e4eca8a3980f277546c047004649a36c251ab70e6a4da0fc3258912d709dd732ea16a9ffe66140f1cdd3e234c6ced69b8c599b71a9dcc7fd3411ff83c1fb7c16f255065b8872178dee43d7c7518cd2e9c8a3290958d1932ff28baa8c4d&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AYO1EPBf4skwaROMxz490bI%3D&pass_ticket=X3VNYNXcDTVwNpUtGAVXbhnocc4It3ssOIqIC%2FA7FS4fnHhcGPBP0sZBFjnUOpnH&wx_header=0



我用四个命令概括了Git的所有套路

https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie/git-chang-yong-ming-ling



图解Git工作原理

https://mp.weixin.qq.com/s/41z7RPUXSYenhfDqmaXInA