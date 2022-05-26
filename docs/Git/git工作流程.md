# Git工作流程

至目前为止，笔者使用过三种工作流

- Feature Branching
- GitFlow 工作流
- Fork 工作流



目前公司用的是Feature Branching。顾名思义，就是创建分支，在分支上开发需求，等开发好了，测试环境也用此分支来发布，测试通过。发预生产时，merge 到 master 分支上，再在预生产如此做。同理，发生产时也是如此

## Feature Branching

### 特点

适合小团队，一两个人开发，多人协作就是问题

任何新的功能（feature）或 bug 修复全都新建一个 branch 来写；

branch 写好后，合并到 master，然后删掉这个 branch

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

- 开发者 fork 仓库到自己的仓库

- `git clone` 到自己的本地仓库

- 并停驾一个 upstream 更新主仓库的代码

  - 自己远程仓库一般别名为 origin，upstream（上游）意味主仓库
  - `git remote add upstream git@...`

- 在本地仓库上做开发，commit，push

- 同步主仓库代码

  - `git pull upstream dev`

  - 因为考虑到 commit 的整洁性，会使用 rebase 来合并 commit

  - ```shell
    git fetch upstream dev
    git rebase upstream/dev
    git commit
    git push origin develop
    // 或者
    git pull upstream develop --rebase
    ```

    

- 通过 pull request（pr）提交到主仓库



## GitFlow流程









## 参考资料

-   [目前使用的 Fork 工作流](https://github.com/sunyongjian/blog/issues/29)
-   [字节研发设施下的 Git 工作流](https://mp.weixin.qq.com/s?__biz=Mzg5NjAzMjI0NQ==&mid=2247487589&idx=1&sn=88490987ce377baad08dc8b9350721f7&chksm=c0061cfff77195e94d87534024529365a0e58604f6229768678fb366def383a77ffac1ac919f&mpshare=1&scene=1&srcid=0925MZ47hzqmCd61AY9mGz9b&sharer_sharetime=1600992766610&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&key=240d40e83da786d09da4496c05e0b91df38906258030d1ce47118d9b50b21aee10ad3106a14af992d17c98c5fb6e5bd782fd5c4b2c467e874a1d8569a9e1b7ce8f832c5997f166f27fb08bb68d514412a1455e37048bbf6ef1fd0517fecc4b060eebb33ca7b63d08ead49b938228961861eea1cc51b12ed7e3ec6ffc18f78b53&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=ARE5w%2FKzT4H6mS3wj%2BqiuUU%3D&pass_ticket=IAAAZXPG6kGgyAWoBydfn7Rbr0g%2BoLDkGTN4w7Dz6PJyi1ELnVaDf%2FNhBdahb9W8&wx_header=0)
