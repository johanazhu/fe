import{_ as s,c as a,o as n,d as p}from"./app.590c1fbf.js";const d=JSON.parse('{"title":"React SSR","description":"","frontmatter":{},"headers":[{"level":2,"title":"ssr 增量开发 难点以及解决方案","slug":"ssr-增量开发-难点以及解决方案","link":"#ssr-增量开发-难点以及解决方案","children":[]}],"relativePath":"React/生态/ReactSSR.md"}'),e={name:"React/生态/ReactSSR.md"},l=p(`<h1 id="react-ssr" tabindex="-1">React SSR <a class="header-anchor" href="#react-ssr" aria-hidden="true">#</a></h1><h2 id="ssr-增量开发-难点以及解决方案" tabindex="-1">ssr 增量开发 难点以及解决方案 <a class="header-anchor" href="#ssr-增量开发-难点以及解决方案" aria-hidden="true">#</a></h2><p>什么是 ssr</p><p>为什么要做 ssr</p><p>ssr 同构是什么？</p><p>难点在哪里？注水和脱水</p><p>如果用 hook 的话，有什么技术难点</p><p>为什么增量开发中加了后会有难度，</p><p>单页面和多页面应用的结合会有什么奇妙的化学反应</p><p>市场上有什么解决方案？</p><p>这位大哥的解决方案？</p><p>我的思考</p><p>我们现在公司出现的具体情况，</p><p>原本是 Node 模板渲染，现在像用单页面应用 React 来解决问题</p><p>一句话解释：</p><p>同构：客户端和服务端渲染的一个整合，让代码执行两次（其实就一次，通过一些算法标识如果 key 一致就不在渲染）。这句话很奇怪，为什么 key 一致就不渲染了</p><p>react 所写的单页面应用，通过 react-dom/server 中的 renderToString 把 React 组件转换成 字符串片段 A，用户访问浏览器路由 A（路由扔给客户端），浏览器返回 字符串片段 A，因为已经在服务端渲染过，所有浏览器（客户端）加载页面的时候只是渲染字符串而已，速度很快。</p><p>session 和 token</p><p>token 我直接存在客户端里，去请求接口的时候，通过 header 携带过去，因为加密过，别人无法篡改，到了服务器端，服务端端解析 token，再做判断</p><p>1.用户登录校验，校验成功后返回 token 给客户端，</p><p>2.客户端收到 token 后保存至客户端（一般用 localStorage 保存）</p><p>3.客户端每次访问 API 时携带 Token 到服务器端</p><p>4.服务器端校验 token，成功返回请求数据，失败返回错误码</p><p>Token 的优势：</p><p>无状态、可扩展</p><p>在客户端存储的 token 是无状态的，并且能够被扩展。如果用 session，负载均衡一弄你的用户信息从一个服务器到另一个服务器，你还需要在两个服务器中打个桥，如果服务器一多，你在服务器端做的时候就更多了。</p><p>而 token 本身就是无状态的，存储在客户端，一省了 session 服务器，二少了很多运维的操作，可扩展性完爆 session</p><p>安全性</p><p>请求中发送 token 而不再是发送 cookie 能够防止 CSRF（跨站请求伪造）。即使在客户端使用 cookie 存储 token，cookie 也仅仅是个存储机制而不是用于认证。不将信息存储在 Session 中，让我们少了对 session 操作</p><p>token 是有时效的，一段时间之后用户需要重新验证。我们</p><p>这个人有点牛逼 zz 小册作者</p><p><a href="https://juejin.im/post/5d7deef6e51d453bb13b66cd" target="_blank" rel="noreferrer">https://juejin.im/post/5d7deef6e51d453bb13b66cd</a></p><p>React 中同构（SSR）原理脉络梳理</p><p><a href="https://juejin.im/post/5bc7ea48e51d450e46289eab" target="_blank" rel="noreferrer">https://juejin.im/post/5bc7ea48e51d450e46289eab</a></p><p>前端同构渲染的思考与实践</p><p><a href="https://mp.weixin.qq.com/s?__biz=MzI2NjkxMjAxNQ==&amp;mid=2247487580&amp;idx=1&amp;sn=50559bd9271eb28d3d9fad7adc1187ee&amp;chksm=ea87b83cddf0312a3d7af7219b56c85a7817ced218acca835ed69ecebd5d580fbe521410d7ff&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1586519527731&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noreferrer">https://mp.weixin.qq.com/s?__biz=MzI2NjkxMjAxNQ==&amp;mid=2247487580&amp;idx=1&amp;sn=50559bd9271eb28d3d9fad7adc1187ee&amp;chksm=ea87b83cddf0312a3d7af7219b56c85a7817ced218acca835ed69ecebd5d580fbe521410d7ff&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1586519527731&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd</a></p><p>React 代码需要经过打包编译才能执行</p><p>同构：客户端渲染和服务器端渲染的一个整合。让代码执行两次（其实就一次，通过一些算法标识如果 key 一致就不用再渲染）</p><p>同构：服务器一份代码，客户端一份代码</p><p>react 在 node 中写好，用 react-dom/server 中的 renderToString 把 React 组件转换成 字符串片段 A，用户访问浏览器路由 A，浏览器返回 字符串片段 A，因为已经在服务器端渲染过，所以这个字符串不用再重新渲染。</p><p>为什么模板不能共存。因为我要先打包文件，用 webpack 打包 node （express 搭起来的）服务。打包出来的是个 js 文件，就是用 webpack 打包出一个压缩过的 node 文件，里面的模板什么的就不能用了，为什么不能用。</p><p>模板依赖</p><p>react ssr 最终产物其实就是 SPA + SSR</p><p>其中 SSR 指的是在服务端渲染组件</p><p>而组件可以在服务端渲染的根本原因就是 虚拟 DOM</p><p>我们习惯使用 jsx 来编写 react 组件，但 jsx 只是一个抽象的语法糖，看上去是写组件，其实我们写的是对象。</p><p>react.hybrate</p><p><code>hydrate</code> 是 React 中提供在初次渲染的时候，去复用原本已经存在的 DOM 节点，减少重新生成节点以及删除原本 DOM 节点的开销，来加速初次渲染的功能。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">presets</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: [</span></span>
<span class="line"><span style="color:#F07178;">      [</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@babel/preset-env</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">targets</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">browsers</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span></span>
<span class="line"><span style="color:#F07178;">                    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&gt;1%</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">last 2 versions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">                    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">not ie &lt;= 8</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">                ]</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">      ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@babel/preset-react</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">  ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>直接 webpack-dev-server</p><p>loading 的坑</p><p>react-loadable 源码分析</p><p>数据同构</p><p>componentDidMount 生命周期只会在浏览器端执行</p><p>会话保持，如果用 localStorage 的话 session 就存在客户端</p><p>每次进入页面的时候，传数据会不会太麻烦？</p><p>但是好像也就这个方法</p><p>刚开始做的数据同构时，我在前端代码中模拟请求，然后抱起来后，浏览器支持 ComponentDidMount，我不知道服务器支不支持，但是浏览器报错</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">react</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">dom</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">development</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">js:</span><span style="color:#F78C6C;">88</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Warning</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Did not expect server HTML to contain the text node </span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">div</span><span style="color:#89DDFF;">&gt;.</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>数据同构，就是将前端（客户端）的数据请求转移到服务端进行，将数据请求的行为写成一个静态方法，</p><p>等匹配对路由的情况下（例如在 list 页面），将数据写入到 html 上，用的是 react-router 中的 StaticRouter，用它的 context，但是这有个问题，服务端得到的 html 和客户端的不一致（客户端通过 react 的虚拟 dom 生成新的 dom 结构，但是因为没有数据，没有请求所以他会呈现另一个 dom 结构）。所以它会一闪之后（刚开始是有 html，后来被客户端接管），又变成了暂无数据。</p><p>我们需要让客户端的 dom 结构和服务端的一致。有很多方式，为了防止 xss，用 textarea 来注入数据。</p><p>这一过程，叫做 <code>数据脱水</code>，意思是将直出组件客户端的时候再传数据给客户端。</p><p>我们要讲数据赋值给 react 的虚拟 dom，这个过程叫做 <code>数据注水</code></p><p>但还有有一个问题，如果当你从一个有数据的页面跳转到另一个页面，再从这个页面跳回去，数据会没有，因为我们现在的数据是通过服务端传递数据，做一下兼容，在初始化（componentDidMount）的时候，判断如果 this.state.data 中没有数据，那么就去请求数据</p><p>增量开发——从模板渲染到 react ssr</p><p>成为父亲</p><p>打包上线 ok</p><p>路由切换管理 ok</p><p>从 hbs 跳到单页面路由上，再从单页面路由跳回 hbs 上</p><p>可以用 window.location 跳转但是不是一本万利的</p><p>redux</p><p>热更新</p><p>按需加载 ok</p><p>高阶组件</p><p>eslint +prettie</p><p>sever 端压缩 production ok</p><p>cookie session 传值还没好</p><p>等级用户</p><p>ts</p><p>装饰器</p><p>生成一个中间件</p><p>放入到 express 中，使用这个中间件</p><p>ssr 的坑</p><p>less 不支持</p><p>按需加载不支持（起码以我的实力看不支持，主要自己太菜）</p><p>actions 异步</p><p>函数式写法</p><p>eslint</p><p>eslint-config-airbnb</p><p>eslint-config-prettier</p><p>eslint-plugin-prettier</p><p>eslint-plugin-react</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">  &quot;husky&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;hooks&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;pre-commit&quot;: &quot;lint-staged&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>登录好了</p><p>权限问题</p><p>babel webpack 打包问题</p><p>babel 把 es6 的语言转换为 es5</p><p>如果 webpack 也想要用 需要配置 babel-loader</p><p>但是导出的文件是，你写什么导出什么</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#FFCB6B;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">app.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#FFCB6B;">path</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">resolvePath</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../dist/server</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">+</span><span style="color:#FFCB6B;">libraryTarget</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">commonjs2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 基础组件</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Group</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// “组”组件(主要是样式问题，上下划线，子组件的最后一项没有下划线)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Addon</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 前缀组件</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Suffix</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 后缀组件</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Desc</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 描述组件</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.CardSelect</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &lt;CheckBox /&gt; + &lt;List.Group /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Dashboard</span><span style="color:#89DDFF;"> /&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// &lt;List.Addon&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使用</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    	</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">item</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Group</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                   	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Row</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#FFCB6B;">List.Row</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Row</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#FFCB6B;">List.Row</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Row</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#FFCB6B;">List.Row</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">List.Radio</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#FFCB6B;">List.Radio</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">List.Group</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Group 是强关联</p><p>react-router 如果要加二级路由，记得在 webpack output 处加 publicPath: &#39;/&#39;</p><p>Scroll 做成高阶组件</p><p>出现一个问题的时候要看一看是否是因为 没引入</p><p>跨域：</p><p>没有服务器帮忙的情况下</p><p>本地开发</p><p>webpack 里加 devServer 代理</p><p><a href="https://juejin.im/post/5b972664f265da0a9624b50c" target="_blank" rel="noreferrer">https://juejin.im/post/5b972664f265da0a9624b50c</a></p><p>ssr react 组件加载</p><p>@type 类型错误</p><p><a href="https://gist.github.com/oyvindym/ebd63bfa21fa5b07a9b31b2a4a5b3655" target="_blank" rel="noreferrer">https://gist.github.com/oyvindym/ebd63bfa21fa5b07a9b31b2a4a5b3655</a></p><p>pre-render</p><p>后续添加</p><p>webpack 配置 alias 后 ts 找不到模块</p><p><a href="https://www.xiejiahe.com/blog/detail/5cb2ec342bbcb67b4a5f3ed6" target="_blank" rel="noreferrer">https://www.xiejiahe.com/blog/detail/5cb2ec342bbcb67b4a5f3ed6</a></p><p>把 session 当做一个接口来调用</p><p>星期一：将 js 文件转换为 ts 文件。页面 processful 完成</p><p>星期二：数据窃取 模板页面与 ssr 页面的数据交互，页面 address 完成一半</p>`,121),o=[l];function t(r,c,i,F,D,y){return n(),a("div",null,o)}const m=s(e,[["render",t]]);export{d as __pageData,m as default};
