import{_ as s,c as n,o as a,d as l}from"./app.590c1fbf.js";const d=JSON.parse('{"title":"代码规范","description":"","frontmatter":{},"headers":[{"level":2,"title":"HTML 规范","slug":"html-规范","link":"#html-规范","children":[]},{"level":2,"title":"CSS 规范","slug":"css-规范","link":"#css-规范","children":[]},{"level":2,"title":"项目结构","slug":"项目结构","link":"#项目结构","children":[]},{"level":2,"title":"命名规范","slug":"命名规范","link":"#命名规范","children":[]}],"relativePath":"Engineered/StandardGuide/代码规范.md"}'),p={name:"Engineered/StandardGuide/代码规范.md"},e=l(`<h1 id="代码规范" tabindex="-1">代码规范 <a class="header-anchor" href="#代码规范" aria-hidden="true">#</a></h1><p>​</p><h2 id="html-规范" tabindex="-1">HTML 规范 <a class="header-anchor" href="#html-规范" aria-hidden="true">#</a></h2><h4 id="基础脚手架-pc" tabindex="-1">基础脚手架 PC <a class="header-anchor" href="#基础脚手架-pc" aria-hidden="true">#</a></h4><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 统一使用HTML5的DOCTYPE --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;!</span><span style="color:#F07178;">DOCTYPE</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- lang使用zh-CN，考虑设备兼容 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh-CN</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">&lt;!-- 页面编码使用UTF-8 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">charset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UTF-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">&lt;!-- 采用IE=Edge, chrome=1 浏览器兼容模式 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">http-equiv</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">X-UA-Compatible</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">IE=Edge,chrome=1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">&lt;!-- keywords,description 必须 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">keywords</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">&lt;!-- title 必须 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Document</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">&lt;!-- @author [yourname] | @design [designer name] | @pm [pm name] --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">&lt;!-- start 模块名称 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">&lt;!-- end 模块名称 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">        &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h4 id="基础脚手架-m-站" tabindex="-1">基础脚手架 M 站 <a class="header-anchor" href="#基础脚手架-m-站" aria-hidden="true">#</a></h4><div class="language-HTML line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 统一使用HTML5的DOCTYPE --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;!</span><span style="color:#F07178;">DOCTYPE</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- lang使用zh-CN，考虑设备兼容 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">zh-CN</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">&lt;!-- 页面编码使用UTF-8 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">charset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UTF-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">&lt;!-- viewport --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">viewport</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">width=device-width,initial-scale=1,user-scalable=no</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">&lt;!-- keywords,description 必须 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">keywords</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">&lt;!-- title 必须 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Document</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">&lt;!-- @author [yourname] | @design [designer name] | @pm [pm name] --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">&lt;!-- start 模块名称 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">&lt;!-- end 模块名称 --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">	&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="css-规范" tabindex="-1">CSS 规范 <a class="header-anchor" href="#css-规范" aria-hidden="true">#</a></h2><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">└── scss</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── _init</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── _init</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">scss</span><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;">// 每个scss都需要引用这个文件，这个文件引用了下面两个文件</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── _mixin</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">scss</span><span style="color:#A6ACCD;">     </span><span style="color:#676E95;font-style:italic;">// 封装的一些辅助方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   └── _variable</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">scss</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 全局用到的参数</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── global              </span><span style="color:#676E95;font-style:italic;">// 全局样式</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── _acss</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">scss</span><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;">// 原子化CSS</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── _reset</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">scss</span><span style="color:#A6ACCD;">     </span><span style="color:#676E95;font-style:italic;">// 样式重置</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── _base</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">scss</span><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;">// 基础样式</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   └── index</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">scss</span><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;">// 这个文件引用了以上所有文件</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── index</span></span>
<span class="line"><span style="color:#A6ACCD;">        └── index</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">scss</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-hidden="true">#</a></h2><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">- src</span></span>
<span class="line"><span style="color:#A6ACCD;">	- api			//	接口管理目录</span></span>
<span class="line"><span style="color:#A6ACCD;">	- assets		//	图片资源目录</span></span>
<span class="line"><span style="color:#A6ACCD;">	- common		// 	公共资源目录（函数库、请求封装）</span></span>
<span class="line"><span style="color:#A6ACCD;">	- components	// 	组件库</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="命名规范" tabindex="-1">命名规范 <a class="header-anchor" href="#命名规范" aria-hidden="true">#</a></h2><h4 id="组件命名" tabindex="-1">组件命名： <a class="header-anchor" href="#组件命名" aria-hidden="true">#</a></h4><p>​ 文件与组件命名保持一致，使用 <code>PascalCase</code>，即驼峰命名法，如 <code>Timeline.tsx</code> 为时间轴组件</p><h4 id="页面命名" tabindex="-1">页面命名： <a class="header-anchor" href="#页面命名" aria-hidden="true">#</a></h4><p>​</p><h4 id="变量命名" tabindex="-1">变量命名： <a class="header-anchor" href="#变量命名" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">常量-全大写+下划线，如：</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><a href="https://github.com/Buddhas/ele-admin-vue/blob/master/ele-admin-vue/README.md" target="_blank" rel="noreferrer">https://github.com/Buddhas/ele-admin-vue/blob/master/ele-admin-vue/README.md</a></p><p>我认为移动端没必要和 ant design pro 硬绑定到一起，理由如下</p><p>（一）移动端</p><p>最原始版本的 ant design pro 不仅有权限，有国际化，有 ant design pro 有 pro table 等，还有与 umi ui 的结合，是软绑定观点，</p><p>如果说 ant design 是开源的 UI 框架，那么 ant design pro 更以阿里脚手架为核心的聚合产品，</p><p>他更适用于做后台，</p><p>两者有什么是同通的，权限，</p><p>用 umi 开发，已经很大程度上的规避掉原生开发的一些列问题，</p><p>约定式路由，</p><table><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></tbody></table><p>现在的重构版与紫菜的项目的区别在于</p><p>重构版用 hook 来写组件，样式用的是 sass，jqb design 用的也是 sass</p><p>紫菜用 class 类写组件，样式用 css in js，</p><p>像其他的，大多数都是看的懂的</p><p>随着版本的升级，pro 现在已经有 5 了，紫菜用的是 4，那是否为了新而追求新。共赢和咨询用的是 umi2，现在重构版的用的是 umi3，是否也要统一呢？</p><p>就像我现在去写惠选宝业务一样，让我写，一天就上手了，写的无非是业务逻辑和组件拼接，这些在原有页面已经有，找起来很方便。</p><p>而命名是个大问题，正如我下面所说，我们需要的是代码规范，而非项目统一，项目是没发统一的，</p><p>umi 的特点是强约束、配置化和约定化</p><h4 id="强约束" tabindex="-1">强约束 <a class="header-anchor" href="#强约束" aria-hidden="true">#</a></h4><p>React 框架 + TypeScript + Eslint + Prettier + 固定配置 + dva</p><p>你写的代码的格式，类型，写法都被限制</p><p>如果提高代码质量，</p><p>搭建 gitlab，上传至仓库，发布前需将代码给前端同事 review，既能提高自己的 review 代码的能力，也能找到一些明显的 bug</p>`,41),o=[e];function t(r,c,i,D,y,F){return a(),n("div",null,o)}const C=s(p,[["render",t]]);export{d as __pageData,C as default};
