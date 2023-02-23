import{_ as s,c as a,o as n,d as l}from"./app.590c1fbf.js";const b=JSON.parse('{"title":"前端学 Ruby：商城项目","description":"","frontmatter":{},"headers":[{"level":3,"title":"写页面","slug":"写页面","link":"#写页面","children":[]}],"relativePath":"BackEnd/Ruby/前端学Ruby：商城项目.md"}'),e={name:"BackEnd/Ruby/前端学Ruby：商城项目.md"},p=l(`<h1 id="前端学-ruby-商城项目" tabindex="-1">前端学 Ruby：商城项目 <a class="header-anchor" href="#前端学-ruby-商城项目" aria-hidden="true">#</a></h1><p>先建一个项目</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">rails</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">b2c_shop</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--skip-bundle</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--skip-turbolinks</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">postgresql</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>--skip-bundle：跳过直接下载依赖，因为我们要修改gem源，改成中国的会快点</li><li>--skip-turbolinks：xx</li></ul><blockquote><p>window 上弄 mysql 问题一堆，改数据库把</p></blockquote><p>修改数据库配置</p><div class="language-yml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F07178;">development</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;&lt;:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">*</span><span style="color:#A6ACCD;">default</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">database</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">b2c_shop_development</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">postgres</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">password</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">123456</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">host</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">localhost</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>添加三个 gem文件</p><div class="language-ruby line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">gem </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sassc-rails</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 使用 Sass 处理 CSS</span></span>
<span class="line"><span style="color:#A6ACCD;">gem </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">jquery-rails</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 使用 jquery</span></span>
<span class="line"><span style="color:#A6ACCD;">gem </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bootstrap-sass</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">gem </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">font-awesome-rails</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">gem </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sorcery</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># session 管理</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后再下载依赖，下载完之后会在 app assets 中 的 css 、js 中看到相关文件</p><p>把 stylesheets 文件中的 <code>application.css</code> 改成 <code>application.scss</code>，并在文件中添加</p><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">@import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bootstrap-sprockets</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bootstrap</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">@import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">font-awesome</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>基于 sorcery 创建文件</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">rails</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sorcery:install</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>它的特点是不用手动去创建代码，用命令行的方式批量创建代码</p></blockquote><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">rails</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">generate</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sorcery:install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user_activation</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rememver_me</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reset_password</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--only-submodules</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p>--only-submodules 只添加子模块</p></blockquote><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 查看 sorcery 帮助，相当于看说明书</span></span>
<span class="line"><span style="color:#FFCB6B;">rails</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sorcery:install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-h</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>接着执行数据库指令</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 同步到数据库</span></span>
<span class="line"><span style="color:#FFCB6B;">rails</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">db:migrate</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>找到 sorcery.rb，在 285 行修改文件</p><div class="language-ruby line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">user_activation_mailer </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 是否激活邮件</span></span>
<span class="line"><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">activation_mailer_disabled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 是否发送激活邮件，不发送</span></span>
<span class="line"><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prevent_non_active_users_to_login </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 用户登录的时候是否阻止</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="写页面" tabindex="-1">写页面 <a class="header-anchor" href="#写页面" aria-hidden="true">#</a></h3><p>创建首页</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">rails</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">controller</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">weclome</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">index</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,25),o=[p];function t(r,c,i,y,C,D){return n(),a("div",null,o)}const u=s(e,[["render",t]]);export{b as __pageData,u as default};
