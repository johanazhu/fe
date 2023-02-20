# Git 工作流程

至目前为止，笔者使用过三种工作流

- Feature Branching 工作流
- Fork 工作流
- GitFlow 工作流



目前公司用的是Feature Branching。顾名思义，就是创建分支，在分支上开发需求，等开发好了，测试环境也用此分支来发布，测试通过。发预生产时，merge 到 master 分支上，再在预生产如此做。同理，发生产时也是如此

## Feature Branching

### 特点

适合小团队，一两个人开发，多人协作就有问题

任何新的功能点（feature）通过新建分支（branch），再在分支上完成开发

### 工作流程

- 需求发布日期是20220526
  - 以发布日期为分支建立：`git checkout -b 20220526`
- 在20220526分支上开发需求，本地开发完后，推到远程分支
  - `git push origin 20220526`（远程分支没有该分支为视为创建此分支）
- 测试-提bug-修复bug，都在 20220526 分支
- 测试完毕，需发布到预生产，上服务器
  - `git checkout master`
  - `git merge 20220526`
- 继续预生产测试，后续的生产如上操作

## Fork 工作流

### 特点

开源项目多以此为流程，开发者提交 pr，主仓库管理员合并其代码

操作繁琐，每个人一个仓库，更适合十几个人以上项目

### 工作流程

- 开发者 fork 项目到自己的仓库

- `git clone` 到自己的本地仓库

- 并获取原项目（upstream）跟踪原项目代码情况

  - 自己远程仓库一般别名为 origin，upstream（上游）意味主仓库
  - `git remote add upstream git@...`

- 在本地仓库上做开发，commit，push

- 同步主仓库代码

  - `git pull upstream master`

  - 因为考虑到 commit 的整洁性，会使用 rebase 来合并 commit

  - ```bash
    git fetch upstream dev
    git rebase upstream/dev
    git commit
    git push origin develop
    //或者
    git pull upstream develop --rebase
    ```

  - 这里还要考虑的是合并修改（见下文）

- 通过 pull request（pr）提交到主仓库



### 合并修改

简单来说，就是远程仓库有代码更新，从而会导致我们提交的 Pull Request 时会导致冲突，因此我们可以在提交前获取到原仓库（upstream）最新的代码

- 切换到 master 分支

  ```bash
  git checkout master
  ```

- 以 master 分支为铆点拉去 upstream 远程分支最新的代码

  ```bash
  git pull upstream master
  ```

- 切换回 branch1（自己的开发分支）

  ```bash
  git checkout branch1
  ```

- 把 master 的 commit 合并到 branch1：

  ```bash
  git merge master
  // 或
  git rebase master
  ```

- 把更新的代码提交到自己的远程仓库：

  ```bash
  git push origin branch1
  ```

> PS：merge 和 rebase 的区别在于，merge 只是做合并提交作用， rebase 会整理分支，让分支更加清晰（rebase 让分支更加清晰优雅）

## GitFlow流程

### 特点

- 分支各司其职，覆盖大部分开发场景
- 预期 master 分支中任何 commit 都时可部署的
- 严格按照流程执行，出现重大事故的情形会大大降低

缺点是

- 过于繁琐，无法要求所有团队成员按照这个流程严格执行
- 违反 git 提倡的 short-lived 分支原则
- master 分支历史记录并不干净，只能通过打  Tag 标记哪些是 master 真正要部署的
- 对持续部署和 monorepo 仓库不友好



### 工作流程

![640](https://s2.loli.net/2022/06/25/RvTwKV8WOcCx2fN.png)





## 参考资料

-   [目前使用的 Fork 工作流](https://github.com/sunyongjian/blog/issues/29)
-   [字节研发设施下的 Git 工作流](https://mp.weixin.qq.com/s?__biz=Mzg5NjAzMjI0NQ==&mid=2247487589&idx=1&sn=88490987ce377baad08dc8b9350721f7&chksm=c0061cfff77195e94d87534024529365a0e58604f6229768678fb366def383a77ffac1ac919f&mpshare=1&scene=1&srcid=0925MZ47hzqmCd61AY9mGz9b&sharer_sharetime=1600992766610&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&key=240d40e83da786d09da4496c05e0b91df38906258030d1ce47118d9b50b21aee10ad3106a14af992d17c98c5fb6e5bd782fd5c4b2c467e874a1d8569a9e1b7ce8f832c5997f166f27fb08bb68d514412a1455e37048bbf6ef1fd0517fecc4b060eebb33ca7b63d08ead49b938228961861eea1cc51b12ed7e3ec6ffc18f78b53&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=ARE5w%2FKzT4H6mS3wj%2BqiuUU%3D&pass_ticket=IAAAZXPG6kGgyAWoBydfn7Rbr0g%2BoLDkGTN4w7Dz6PJyi1ELnVaDf%2FNhBdahb9W8&wx_header=0)
-   [如何优雅地在github上贡献代码](https://segmentfault.com/a/1190000000736629)
-   [第一次参与开源](https://github.com/firstcontributions/first-contributions/blob/master/translations/README.chs.md)
