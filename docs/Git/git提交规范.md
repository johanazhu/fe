# Git 提交规范

git commit 规范主要可以帮助开发人员在 code reivew 期间更容易理解提交的内容，现在大部分主流 commit 都是基于 Angular 团队的规范而衍生出来的，它的 message 格式如下：

```markdown
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

每个提交消息都包含一个**subject**、一个**body**和一个**footer** (中间使用空行分割)，提交信息的任何一行不能超过 100 个字符。

👉 type主要有以下几种类型：

- feat：一个新特性
- fix：修复bug
- docs：文档修改
- style：不影响代码含义的更改（空格、格式、缺少分号等）
- refactor：代码重构
- perf：新能优化
- test：测试用例修改
- chore：对构建过程或辅助工具和库的更改，例如文档生成

👉 scope：可以是影响范围的任何内容。

👉 subject：包含对更改的简洁描述，规则：

- 使用陈述语句
- 第一个字母不要大写
- 末尾没有点 (.)

👉 body：commit 具体修改内容, 可以分为多行，应该包括改变的动机，并与以前的行为进行对比。

👉 footer: 一些备注, 通常是修复的 bug 的链接。

截取一张开源库的 commit，[example](https://github.com/nrwl/nx)：

![image.png](https://s2.loli.net/2022/06/01/DAP7EKRrHpzmvMW.webp)

也可以看看：https://github.com/umijs/umi

有了规范后，我们需要通过工具去约束：[commitlint](https://github.com/conventional-changelog/commitlint)。它要做的就是在我们每次提交 `git commit` 的时候，都会帮我们检查 `commit message` 是否符合一定的规范，如果不符合，就让这次提交失败。

具体配置：

```bash
# 安装 commitlint cli 和 conventional config
npm install --save-dev @commitlint/{config-conventional,cli}
# Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli

配置要使用的 commitlint 规则
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

加入到husky中：
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
or
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'

```

更多详情见官网：[https://github.com/conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint)





## 参考资料

-   [如何撰写 Git 提交信息](https://jiongks.name/blog/git-commit/)
-   [Git-Commit-Log 规范（Angular 规范）](https://www.jianshu.com/p/c7e40dab5b05)
-   [commitizen](https://www.npmjs.com/package/commitizen)
-   [git 代码提交规范](https://wutao.work/archives/10104.html)
