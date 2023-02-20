# 工作中使用 Git 解决问题的场景



简单来说，就这七点：

- 使用 git rebase 让提交记录更加清晰可读

- 使用  git reflog + git reset 跳到任意 commit

- 使用 git cherry-pick 获取指定的 commit

- 使用 git commit --amend 更改提交内容

- 使用 git revert 回滚某次的提交


- 使用 git stash 来暂存文件


- 配置 git alias 提升工作效率



## 使用 git rebase 让提交记录更加清晰可读

### rebase 基本用法

rebase 翻译为变基，它的作用和 merge 相似，用于把一个分支的修改合并到当前分支

如下图所示，经过 rebase 后提交历史的变化情况

![rebase](https://s2.loli.net/2022/07/01/9qOJUarzbjAsYyN.jpg)

不明白单分支的好处，可以在看看知乎的这个问题：[Git commits历史是如何做到如此清爽的？](https://www.zhihu.com/question/61283395)

Vue 的作者尤雨溪就是说：[多用 rebase](https://www.zhihu.com/question/61283395/answer/186122300)

具体用法：

- 基于 master 分支创建 feature 分支
- 在 feature 分支上开发功能点
- master 上也提交了commit
- 在 feature 分支上执行 `git rebase master`，意为以 master 分支最后的提交作为基点，逐个应用 feature 的每个更改

### git rebase VS git merge

合并分支有两种，即 rebase 、merge

merge 翻译为合并，即 `git merge branchname`，即合并分支代码，这种方法会保存每次 commit 的，当你使用 gitk 查看时就发现好几条颜色的线

另一种是 rebase，即去除一系列的提交记录，“复制”它们，然后在另一个地方逐个放下去

所以 rebase 的优势就明了了，它能创造更清晰的提交记录

但 merge 会保留你所有的 commit 的历史时间，当开发人员一多，历史记录就会变得混乱

### rebase 的交互模式

在开发中，通常会在一个分支上产生很多无效的提交，这种情况下使用 rebase 的交互模式可以把多次 commit 压缩成一次提交，得到一个干净的提交历史

```bash
# 先看提交
git log 
# f9f6f3b commit 3
# 2feb45f commit 2
# 07a3cb6 commit 1
# 我们要修改 2 的话，rebase 到它的下一个 commit，这里是 1
git rebase 07a3cb6 -i
# 然后在打开的对话框里面修改，之后还要一个 rebase continue
git rebase -i <base-commit>
# 或者是 git rebase -i HEAD~2 对最近的两次 commit 进行合并	
```

> 也有人称之为后悔药功能，即你无论写什么 commit，最后都可以修改，无论提交什么，都可以合并，DIY性强

## 使用  git reflog + git reset 跳到任意 commit

换个说法叫时光机，即通过查找所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作），通过 reset HEAD 跳到指定 commit

```bash
git reflog
#afa2f45 HEAD@{10}: checkout: moving from 今天 to 明天
#4abcda5 HEAD@{11}: commit: 打通1800处仙窍
#de42069 HEAD@{12}: commit: 真言轮经大成
git reset HEAD@{10}
# 或者 git reset --hard afa2f45
```

如此一来，就回到了 afa2f45 commit 处，熟悉「时间法则」、「时光机」的人都知道，这是回到过去

## 使用 git cherry-pick 获取指定的 commit

意为“挑拣”提交，和 merge 合并一个分支的所有提交不同，它会获取某个分支的单个提交，并作为一个新的提交接入到当前分支上

这个需要故事背景才容易理解

张三在分支上开发功能，每个功能点提交一次commit，共六个提交六个功能点（分别是 feature1~feature6），再回到第一个提交点，即他使用 `git reset --hard feature1` 跳转第一个 commit，在此基础上开发一个新功能，即 feature7，那么如果把 feature7 合并到 feature6 上怎么做？

```bash
git reflog
# git reflog 查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）
# 找到 feature7 的 commit 4c97ff3
# 回到 feature6 的 commit cd52afc
git reset --hard cd52afc
# 使用 cherry-pick 拿到 feature7 的代码
git cherry-pick 4c97ff3
```

具体可看小蝌蚪的这篇 [小蝌蚪传记：git时光穿梭机--女神的侧颜](https://github.com/airuikun/front-core/issues/5) 来体会一二

简单来说，你的每一次 commit，就是一次记录，可以合并到任意地方。所以开发功能点或者修复bug之类，尽量做到一个功能点一个commit，方便出错时挑拣代码

## 使用 git commit --amend 更改提交内容

amend 的意思是修正

```bash
# 继续改动你的文件
git add . 
git commit --amend --no-edit
# 你这次的改动会被添加进最近一次的 commit 中
```

合并到上次的commit 中

`git commit --amend`：弹出让你修改内容

`git commit --amend --no-edit`：保持上一次的commit内容

> PS：假如你的代码已经 push 了的话，要慎用，因为会修改提交历史。

## 使用 git revert 回滚某次的提交

上文提到一个回滚操作：`git reset --hard xxx`，能回到某次的 commit，除此之外，还有一种则是能撤销某次 commit

```bash
# 先找到你想撤销的那个 commit hash值
git log
git revert <commit-id>
```

这种做法会新建一条commit 信息，来撤回之前的修改。

而 git reset 会直接提交记录退回到指定的 commit 上。

所以就个人开发或个人 feature 分支而言，可以使用 `git reset` 来回滚代码，但在多人协作的集成分支上，`git revert` 更适合。这样，提交的历史记录不会被抹去，可以安全地进行撤回

## 使用 git stash 来暂存文件

顾名思义，就是把本地的改动暂存起来

先了解下 git 的四大工作区域

### 四大工作区域

![Git工作区](https://s2.loli.net/2022/06/02/PFnpm6MtG8LEeNV.png)

- Workspace（工作区）：本地电脑所见的文件和目录

- Index/Stage（暂存区）：一般存放在 `.git` 目录下，当你 `git add 改动文件`，改动的文件就放入在「暂存区」
- Respository（本地仓库）：当你 `git clone 地址`，就将远程仓库克隆到本地仓库。它是存在本地的版本库，其中HEAD指向最新放入仓库的版本。当你执行 `git commit`，文件改动就到本地仓库
- Remote（远程仓库）：类似Github、Gitlab、码云等放在代码托管平台

常见的场景是你还在开发一个功能点的时候，突然有个线上 bug 需要你紧急修复，这次你可以git commit 提交到本地仓库，后续通过 `git commit --amend ` 继续在原 commit 上修改内容。但这里还有一种方法，即将代码存在暂存区，等 bug 修复完后，再从暂存区取出

基本命令如下：

```bash
git stash # 将本地的改动暂存
git stash save "message" # 执行存储时，添加备注
git stash pop # 应用最近一次暂存，并删除暂存记录
git stash apply #恢复最近的存储，但不会把存储从存储列表中删除，某人使用第一个存储，即 stash@{0}，如果要使用其他，git stash apply stash@{$num}
git stash list # 查看 stash 了哪些存储
git stash clear #删除所有缓存的 stash
git ls-files --stage #查看 index 暂存区
```

## 配置 git alias 提升工作效率

主要是为了简化命令，它的基本用法是 `git config --global alias.<简化的字符> 原始命令`

如下面的例子：

```bash
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
```

当然，另一种方法是在 .gitconfig 文件中设置

```bash
[alias]
st = status -sb
co = checkout
br = branch
mg = merge
ci = commit
ds = diff --staged
dt = difftool
mt = mergetool
last = log -1 HEAD
latest = for-each-ref --sort=-committerdate --format=\"%(committername)@%(refname:short) [%(committerdate:short)] %(contents)\"
ls = log --pretty=format:\"%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\" --decorate --date=short
hist = log --pretty=format:\"%C(yellow)%h %C(red)%d %C(reset)%s %C(green)[%an] %C(blue)%ad\" --topo-order --graph --date=short
type = cat-file -t
dump = cat-file -p
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

> 参考[政采云的配置](https://juejin.cn/post/6974184935804534815#heading-6)



## 除此之外

还有一些不常见却好用的命令

- `gitk`：打开git的图形化工具
- `gitjk`：撤消您刚刚在git中所做的操作
- `git help -g`：展示帮助信息
- `cat .git/HEAD`：查看分支文件
- `git fetch --all && git reset --hard origin/master`：回到远程仓库的状态
  - 抛弃本地所有的修改，回到远程仓库的状态
- `git push -f origin master`：强行获取远程最新代码





## 参考资料

-   [git 时光穿梭机](https://github.com/airuikun/blog/issues/5)
-   [我在工作中是如何使用 git 的](https://juejin.cn/post/6974184935804534815#heading-6)
-   [程序员必会的六条黄金 Git 命令，让你效率提高百分之百](https://mp.weixin.qq.com/s/DsdXGz8qb3B23Ra10ElKug)
-   [Oh Shit, Git!?!](https://ohshitgit.com/zh)
-   [我是如何使用 git 的？](https://mp.weixin.qq.com/s/S3NuW5W3x1iDDtbfHziDzQ)
