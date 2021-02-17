# git 命令



git 教程

https://missing-semester-cn.github.io/2020/version-control/



#### 设置全局git用户名和邮箱

```shell
git config --global user.name johan
git config --global user.email xxx@github.com
```

#### 查看git用户名和邮箱

```shell
git config user.name
git config user.email
```



```shell
git checkout -- readme.txt
```

丢弃工作区的修改



各种命令以及含义

https://github.com/521xueweihan/git-tips





#### git branch

```shell
git branch 查看本地所有的分支
git branch -f 查看所有远程的分支
git branch -a 查看所有远程分支和本地分支
git branch -D <分支名> 删除本地分支
```



#### git checkout

如果文件还在工作区，还没添加到暂存区，可以使用git checkout撤销

```shell
git checkout [file] 丢弃某个文件file
git checkout . 丢弃所有的文件
```

















