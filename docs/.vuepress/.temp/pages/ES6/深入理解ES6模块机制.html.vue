<template><h1 id="深入理解-es6-模块机制" tabindex="-1"><a class="header-anchor" href="#深入理解-es6-模块机制" aria-hidden="true">#</a> 深入理解 ES6 模块机制</h1>
<p>ES6 模块跟 CommonJS 模块的不同，主要有一下两个方面：</p>
<pre><code>1. ES6 模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝
2. ES6 模块编译时执行，而 CommonJS 模块总是在运行时加载
</code></pre>
<p>这个怎么理解呢？我们一步步来看：</p>
<p>CommonJS 输出值的拷贝</p>
<p>CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就是影响不到这个值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token comment">// b.js</span>
<span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    foo <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> foo
<span class="token punctuation">}</span>
<span class="token comment">// 执行： node a.js</span>
<span class="token comment">// 执行结果：</span>
<span class="token comment">// 1</span>
<span class="token comment">// 1</span>
<span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>上面代码说明， b 模块加载以后，它的内部 foo 变化就影响不到输出的 exports.foo 。这是我 foo 是一个原始类型的值，它被缓存。所有如果你想要在 CommonJS 中动态获取模块中的值，那么就需要借助函数延时执行的特性。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token comment">// b.js</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    foo <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">foo</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> foo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 执行： node a.js</span>
<span class="token comment">// 执行结果：</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>
<span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>我们总结一下：</p>
<pre><code>1. CommonJS 模块重复引入的模块并不会重复执行，再次获取模块直接获取暴露的 module.exports 对象
2. 如果你要处处获取到模块内的最新值的花，也可以你每次更新数据的时候每次都要去更新 module.exports 上的值。
3. 如果你暴露的 module.exports 的属性是个对象，那就不存在这个问题
</code></pre>
<p>所以如果你要处处获取到模块内的最新值的花，也可以你每次更新数据的时候每次都要去更新 module.exports 上的值，比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token comment">// b.js</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
<span class="token comment">// 时刻变化输出值</span>

<span class="token comment">// 执行：node a.js</span>
<span class="token comment">// 执行结果：</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>
<span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="es6-输出值的引用" tabindex="-1"><a class="header-anchor" href="#es6-输出值的引用" aria-hidden="true">#</a> ES6 输出值的引用</h4>
<p>然后在 ES6 模块中就不再是生成输出对象的拷贝，而是动态关联模块中的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./b'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> foo <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 直接 import('./b') 不行，因为静态编译</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token comment">// b.js</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    foo <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>

<span class="token comment">// 执行： babel-node a.js</span>
<span class="token comment">// 执行结果：</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>
<span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h4 id="es6-静态编译-commonjs-运行时加载" tabindex="-1"><a class="header-anchor" href="#es6-静态编译-commonjs-运行时加载" aria-hidden="true">#</a> ES6 静态编译，CommonJS 运行时加载</h4>
<p>关于第二点，ES6 模块编译时执行会导致有一下两个特点：</p>
<pre><code>1. import 命令会被 JavaScript 引擎静态分析，优先于模块内的其他内容执行
2. export 命令会有变量声明提前的效果
</code></pre>
<h5 id="import-优先执行" tabindex="-1"><a class="header-anchor" href="#import-优先执行" aria-hidden="true">#</a> import 优先执行</h5>
<p>从第一条来看，在文件中的任何位置引入 import 模块都会被提前到文件顶部</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./b'</span><span class="token punctuation">;</span>

<span class="token comment">// b.js</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'b.js 先执行'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 执行 babel-node a.js</span>
<span class="token comment">// 执行结果：</span>
<span class="token comment">// b.js 先执行</span>
<span class="token comment">// a.js</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>从执行结果我们可以很直观地看出，虽然 a 模块中 import 引入晚于 <code>console.log('a')</code> , 但是它被 JS 引擎通过静态分析，提到模块执行的最前面，优于模块中的其他部分的执行</p>
<p>由于 import 是静态执行，所以 import 具有提升效果即 import 命令在模块中的位置并不影响程序的输出</p>
<h5 id="export-变量声明提升" tabindex="-1"><a class="header-anchor" href="#export-变量声明提升" aria-hidden="true">#</a> export 变量声明提升</h5>
<p>正常的引入模块是没办法看出变量声明提升的特性，需要通过循环依赖加载才能看出。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./b'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> bar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">bar2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">bar3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar3'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// b.js</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> a <span class="token keyword">from</span> <span class="token string">'./a'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 执行结果:</span>
<span class="token comment">// { bar: undefined, bar2: undefined, bar3: [Function: bar3] }</span>
<span class="token comment">// a.js</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>从上面的例子可以很直观地看出，a 模块引用了 b 模块，b 模块也引用了 a 模块，export 声明的变量也是优于模块其他内容的执行的，但是具体对变量赋值需要等到执行到相应代码的时候。（当然函数声明和函数表达式声明不一样，这点和JS函数性质一样）</p>
<p>讲完了 ES6 模块和 CommonJS 模块的不同点之后，接下来就讲讲相同点：</p>
<h4 id="模块不会重复执行" tabindex="-1"><a class="header-anchor" href="#模块不会重复执行" aria-hidden="true">#</a> 模块不会重复执行</h4>
<p>这点很好理解，无论是 ES6 模块还是 CommonJS 模块，当你重复引用某个相同模块时，模块智慧执行一次。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">import</span> <span class="token string">'./b'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'./b'</span><span class="token punctuation">;</span>

<span class="token comment">// b.js</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'只会执行一次'</span><span class="token punctuation">)</span>

<span class="token comment">// 执行结果</span>
<span class="token comment">// 只会执行一次</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>结合上面说的特性，我们来看一个比较经典的例子，依赖循环，当你理解了上面所讲的特性之后，下次遇到模块循环依赖代码的执行结果就很容易理解了</p>
<h4 id="commonjs-模块循环依赖" tabindex="-1"><a class="header-anchor" href="#commonjs-模块循环依赖" aria-hidden="true">#</a> CommonJS 模块循环依赖</h4>
<p>先来看下面的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a strating'</span><span class="token punctuation">)</span>
exports<span class="token punctuation">.</span>done <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'in a, b.done ='</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span>done<span class="token punctuation">)</span>
exports<span class="token punctuation">.</span>done <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a done'</span><span class="token punctuation">)</span>

<span class="token comment">// b.js</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'b starting'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
exports<span class="token punctuation">.</span>done <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'in b, a.done ='</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>done<span class="token punctuation">)</span><span class="token punctuation">;</span>
exports<span class="token punctuation">.</span>done <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'b done'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// node a.js</span>
<span class="token comment">// 执行结果:</span>
<span class="token comment">// a starting </span>
<span class="token comment">// b starting</span>
<span class="token comment">// in b, a.done = false</span>
<span class="token comment">// b done</span>
<span class="token comment">// in a, b.done = true</span>
<span class="token comment">// a.done</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>结合之前讲的特性很好理解，当你从 b 中想引入 a 模块时，因为 node 之前已经加载过 a 模块了，所以它不会再去重复执行a 模块，而是直接去生成当年 a 模块吐出的 <code>module.exports</code> 对象，因为 a 模块引入 b 模块先于给 done 重新复制，所以当前 a 模块中输出的 module.exports 中的 done 的值仍为 false。而当 a 模块中输出 b 模块的 done 值的时候 b 模块已经执行完毕，所以 b 模块中的 done 值为 true。</p>
<p>从上面的执行过程中，我们可以看到，在 CommonJS 规范中，当遇到 require() 语句时，会执行 require 模块中的代码，<strong>并缓存执行的结果</strong>，当下次再次加载时不会重复执行，而是直接取缓存的结果。正因为此，出现循环依赖时才不会出现无限循环调用的情况。虽然这种模式加载机制可以笔名出现循环依赖时报错的情况，但稍不注意就很可能使得代码并不是像我们想象的那样去执行。因为写代码时还需要自己规划，以保证循环模块的依赖能正常工作。</p>
<p>那么有什么办法可以出现循环依赖的时候避免自己出现混乱呢？一种解决方式便是将每个模块先写 exports 语法，再写 require 语法，利用 CommonJS 的缓存机制，在 require() 其他模块之前就先把自身要导出的 内容导出，这样就能保证求他模块在使用时可以取到正确的值。比如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
exports<span class="token punctuation">.</span>done <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>done<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// b.js</span>
exports<span class="token punctuation">.</span>done <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>done<span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>这种写法简单明了，缺点是要改变每个模块的写法，而且大部分同学都习惯了在文件开头先写 require 语句。</p>
<h4 id="es6-模块循环依赖" tabindex="-1"><a class="header-anchor" href="#es6-模块循环依赖" aria-hidden="true">#</a> ES6 模块循环依赖</h4>
<p>跟 CommonJS 模块一样，ES6 不会再去执行重复加载的模块，又由于 ES6 动态输出绑定的特性，能保证 ES6 在任何时候都能获取其他模块点前的最新值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a starting'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./b'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'in b, foo:'</span><span class="token punctuation">,</span> foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> bar <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a done'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// b.js</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'b starting'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./a'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'in a, bar:'</span><span class="token punctuation">,</span> bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'in a, setTimeout bar:'</span><span class="token punctuation">,</span> bar<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'b done'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// babel-node a.js</span>
<span class="token comment">// 执行结果</span>
<span class="token comment">// b starting</span>
<span class="token comment">// in a, bar: undefined</span>
<span class="token comment">// b done</span>
<span class="token comment">// a starting</span>
<span class="token comment">// in b, foo: foo</span>
<span class="token comment">// a done</span>
<span class="token comment">// in a, setTimeout bar: 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>如果没看懂执行结果的花，那说明没理解前面说的 ES6 模块特性，麻烦请重新看一遍！</p>
<h4 id="动态-import" tabindex="-1"><a class="header-anchor" href="#动态-import" aria-hidden="true">#</a> 动态 import()</h4>
<p>ES6 模块在编译时就会静态分析，优先于模块内的其他内容执行，所以导致了我们无法写出像下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span>some codition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">import</span> a <span class="token keyword">from</span> <span class="token string">'./a'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">import</span> b <span class="token keyword">from</span> <span class="token string">'./b'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// or</span>
<span class="token keyword">import</span> a <span class="token function">from</span> <span class="token punctuation">(</span>styr <span class="token operator">+</span> <span class="token string">'b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>因为编译时静态分析，导致了我们无法在条件语句或者拼接字符串模块，因为这些都是需要在运行时才能确定的结果。在 ES6 模块是不被允许的，所以 动态引入 import() 应运而生。</p>
<p><code>import()</code> 允许你在运行时动态地引入 ES6 模块，想到这，你可能也想到了 <code>require.ensure</code> 这个语法，但是它们的用途却截然不同</p>
<p><code>require.ensure</code> 的出现时 webpack 的产物，它是因为浏览器需要一种异步的机制可以用来异步加载模块，从而减少初始的加载文件的体积，所以如果在服务端的话 <code>require.ensure</code> 就无用武之地了，因为服务端不存在异步加载模块的情况，模块同步进行加载就可以满足使用场景了。CommonJS 模块可以在运行时确认模块加载。</p>
<p>而 <code>import()</code> 则不同，它主要是为了解决 ES6 模块无法在运行时确定模块的引用关系，所以需要引入 <code>import()</code></p>
<p>我们先来看下它的用法：</p>
<ol>
<li>动态的 <code>import()</code> 提供一个基于 Promise 的 API</li>
<li>动态的 <code>import()</code> 可以在脚本的任何地方使用</li>
<li><code>import()</code> 接受字符串文字，你可以根据你的需求构造说明符</li>
</ol>
<p>举个简单的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">const</span> sty <span class="token operator">=</span> <span class="token string">'./b'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./b'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>foo<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">import</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>foo<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 

<span class="token comment">// b.js </span>
<span class="token keyword">export</span> <span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>

<span class="token comment">// babel-node a.js</span>
<span class="token comment">// 执行结果</span>
<span class="token comment">// foo</span>
<span class="token comment">// foo</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>当然，如果在浏览器端的 <code>import()</code> 的用途就会变得更广泛，比如 按需异步加载模块，那么就和 <code>require.ensure</code> 功能类似了。</p>
<p>因为都是基于 Promise 的，所以如果你想要同事加载多个模块的花，可以是 Promise.all 进行并行异步加载。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./a.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./b.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./c.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>a<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token keyword">default</span><span class="token operator">:</span> b<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>c<span class="token punctuation">}</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a.js is loaded dynamically'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'b.js is loaded dynamically'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'c.js is loaded dynamically'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>还有 Promise.race 方法，它检查哪个 Promise 被首先 resolved 或 reject。我们可以使用 import() 来检查哪个CDN 速度更快：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> CDNs <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'jQuery.com'</span><span class="token punctuation">,</span>
    url<span class="token operator">:</span> <span class="token string">'https://code.jquery.com/jquery-3.1.1.min.js'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'googleapis.com'</span><span class="token punctuation">,</span>
    url<span class="token operator">:</span> <span class="token string">'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">------</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">jQuery is: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>jQuery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Promise<span class="token punctuation">.</span><span class="token function">race</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span>CDNs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>CDNs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">'loaded'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span>CDNs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>CDNs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">'loaded'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">jQuery version: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>jQuery<span class="token punctuation">.</span>fn<span class="token punctuation">.</span>jquery<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>当然，如果你觉得这样写不够优雅，也可以结合 async/await 语法糖来使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> myModule <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./myModule.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> export1<span class="token punctuation">,</span> export2 <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./myModule.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>module1<span class="token punctuation">,</span> module2<span class="token punctuation">,</span> module3<span class="token punctuation">]</span> <span class="token operator">=</span> 
       <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
           <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module1.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
           <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module2.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
           <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module3.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>动态 <code>import()</code> 为我们提供了以异步方式使用 ES6 模块的额外功能。根据我们的需求动态或有条件地加载它们，这是我们能够更快，更好地创建更多优势应用程序</p>
<h4 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾" aria-hidden="true">#</a> 结尾</h4>
<p>ES6、CommonJS 模块加载机制到动态模块 import() 导入</p>
<p>「万字进阶」深入浅出 Commonjs 和 Es Module</p>
<p>https://mp.weixin.qq.com/s/y_uk7wXAfvq8FzcUZrR93w</p>
<h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3>
<p><a href="https://github.com/happylindz/blog/issues/10" target="_blank" rel="noopener noreferrer">深入理解ES模块机制<ExternalLinkIcon/></a></p>
</template>
