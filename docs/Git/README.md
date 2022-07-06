# Git 导航

## Git 是什么

- 分布式版本控制系统
- 与之对应的：集中化版本控制系统
  - 缺点，集中在中央服务器上，如果断电等原因，就找不到资源
  - 代表 SVN
  - 集中化版本控制的缺点就是分布式斑斑控制的有点
- Git 是免费、开源的分布式版本控制系统

## Git 相关知识点

四大工作区域

工作流程

四种状态

图解工作流程



### 四大工作区域

![Git工作区](https://s2.loli.net/2022/06/02/PFnpm6MtG8LEeNV.png)

- Workspace（工作区）：本地电脑所见的文件和目录

- Index/Stage（暂存区）：一般存放在 `.git` 目录下，当你 `git add 改动文件`，改动的文件就放入在「暂存区」
- Respository（本地仓库）：当你 `git clone 地址`，就将远程仓库克隆到本地仓库。它是存在本地的版本库，其中HEAD指向最新放入仓库的版本。当你执行 `git commit`，文件改动就到本地仓库
- Remote（远程仓库）：类似Github、Gitlab、码云等放在代码托管平台





### 工作流程

一图解释常规的 Git 工作流程

![image-20220602140735939](https://s2.loli.net/2022/06/02/yEnIeOKRFA1Ldct.png)

简单解释：

- 从远程仓库拉去代码，`git clone XXX`
- 在工作目录，增删改查文件，
- 将改动文件放入暂存区，`git add 需要提交的文件`
- 将暂存区的文件提交本地仓库，`git commit - "描述"`
- 获取远程仓库最新的代码，`git pull origin master`
- 将本地仓库的文件推送至远程仓库，`git push origin master`

而比较复杂的可以看这篇——[git工作流程](./git工作流程.md)

### 四种状态

### 图解工作流程



## Git学习平台

在线学习git：[learngitbranching](https://learngitbranching.js.org/?locale=zh_CN)



## 参考资料

-   [程序员必备基础：Git 命令全方位学习](https://mp.weixin.qq.com/s?__biz=Mzk0MzIyMDA1OA==&mid=2247494230&idx=4&sn=44a9a3f11382f748f6aede13ab644d7a&source=41#wechat_redirect)
-   [如何学习好 Git ？知乎讨论](https://www.zhihu.com/question/357385506)

-   [图解 Git 各种用法，简单明了，一目了然！](https://mp.weixin.qq.com/s/7eLcoFTHwMETH-Sqb4ysKg)
-   [程序员必备基础：Git 命令全方位学习](https://mp.weixin.qq.com/s?__biz=Mzk0MzIyMDA1OA==&mid=2247494230&idx=4&sn=44a9a3f11382f748f6aede13ab644d7a&source=41#wechat_redirect)
