import{_ as s,c as n,o as a,d as l}from"./app.590c1fbf.js";const g=JSON.parse('{"title":"Git 提交规范","description":"","frontmatter":{},"headers":[{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"Git/git提交规范.md"}'),e={name:"Git/git提交规范.md"},p=l(`<h1 id="git-提交规范" tabindex="-1">Git 提交规范 <a class="header-anchor" href="#git-提交规范" aria-hidden="true">#</a></h1><p>git commit 规范主要可以帮助开发人员在 code reivew 期间更容易理解提交的内容，现在大部分主流 commit 都是基于 Angular 团队的规范而衍生出来的，它的 message 格式如下：</p><div class="language-markdown line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;BLANK LINE&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;BLANK LINE&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;footer&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>每个提交消息都包含一个<strong>subject</strong>、一个<strong>body</strong>和一个<strong>footer</strong> (中间使用空行分割)，提交信息的任何一行不能超过 100 个字符。</p><p>👉 type主要有以下几种类型：</p><ul><li>feat：一个新特性</li><li>fix：修复bug</li><li>docs：文档修改</li><li>style：不影响代码含义的更改（空格、格式、缺少分号等）</li><li>refactor：代码重构</li><li>perf：新能优化</li><li>test：测试用例修改</li><li>chore：对构建过程或辅助工具和库的更改，例如文档生成</li></ul><p>👉 scope：可以是影响范围的任何内容。</p><p>👉 subject：包含对更改的简洁描述，规则：</p><ul><li>使用陈述语句</li><li>第一个字母不要大写</li><li>末尾没有点 (.)</li></ul><p>👉 body：commit 具体修改内容, 可以分为多行，应该包括改变的动机，并与以前的行为进行对比。</p><p>👉 footer: 一些备注, 通常是修复的 bug 的链接。</p><p>截取一张开源库的 commit，<a href="https://github.com/nrwl/nx" target="_blank" rel="noreferrer">example</a>：</p><p><img src="https://s2.loli.net/2022/06/01/DAP7EKRrHpzmvMW.webp" alt="image.png"></p><p>也可以看看：<a href="https://github.com/umijs/umi" target="_blank" rel="noreferrer">https://github.com/umijs/umi</a></p><p>有了规范后，我们需要通过工具去约束：<a href="https://github.com/conventional-changelog/commitlint" target="_blank" rel="noreferrer">commitlint</a>。它要做的就是在我们每次提交 <code>git commit</code> 的时候，都会帮我们检查 <code>commit message</code> 是否符合一定的规范，如果不符合，就让这次提交失败。</p><p>具体配置：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装 commitlint cli 和 conventional config</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@commitlint/{config-conventional,cli}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Windows:</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@commitlint/config-conventional</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@commitlint/cli</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">配置要使用的</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">commitlint</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">规则</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">module.exports = {extends: [&#39;@commitlint/config-conventional&#39;]}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">commitlint.config.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">加入到husky中：</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">husky</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.husky/commit-msg</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">npx --no -- commitlint --edit &quot;$1&quot;</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#FFCB6B;">or</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">husky</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.husky/commit-msg</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">yarn commitlint --edit $1</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>更多详情见官网：<a href="https://github.com/conventional-changelog/commitlint" target="_blank" rel="noreferrer">https://github.com/conventional-changelog/commitlint</a></p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="https://jiongks.name/blog/git-commit/" target="_blank" rel="noreferrer">如何撰写 Git 提交信息</a></li><li><a href="https://www.jianshu.com/p/c7e40dab5b05" target="_blank" rel="noreferrer">Git-Commit-Log 规范（Angular 规范）</a></li><li><a href="https://www.npmjs.com/package/commitizen" target="_blank" rel="noreferrer">commitizen</a></li><li><a href="https://wutao.work/archives/10104.html" target="_blank" rel="noreferrer">git 代码提交规范</a></li></ul>`,20),t=[p];function o(r,i,c,m,C,y){return a(),n("div",null,t)}const u=s(e,[["render",o]]);export{g as __pageData,u as default};
