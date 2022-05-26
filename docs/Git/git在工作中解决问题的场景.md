# Git 在工作中解决问题的场景



git rebase 让你的提交记录更加清晰可读

使用 git cherry-pick 获取指定的 commit

使用 git revert 回滚某次的提交

使用 git stash 来暂存文件

配置 git alias 提升工作效率









## 时光穿梭机

查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）

```shell
git reflog
```

检支

```shell
git cherry-pick <branch-name>
```





## 参考资料

-   [git 时光穿梭机](https://github.com/airuikun/blog/issues/5)
-   [我在工作中是如何使用 git 的](https://juejin.cn/post/6974184935804534815#heading-6)
