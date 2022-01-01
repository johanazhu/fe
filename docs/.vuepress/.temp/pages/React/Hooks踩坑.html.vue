<template><h1 id="hooks踩坑——capture-value" tabindex="-1"><a class="header-anchor" href="#hooks踩坑——capture-value" aria-hidden="true">#</a> Hooks踩坑——Capture Value</h1>
<h3 id="capture-value" tabindex="-1"><a class="header-anchor" href="#capture-value" aria-hidden="true">#</a> Capture Value</h3>
<p>可以理解为快照</p>
<p>函数在每次渲染时也是独立的。这就是 <strong>Capture Value</strong> 特性</p>
<p>React.Hooks的本质是利用了闭包机制</p>
<p>简易手写React Hooks</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> memorizedState <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 存放hooks</span>
<span class="token keyword">let</span> cursor <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">function</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token parameter">intialState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    memorizedState<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">=</span> memorizedState<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">||</span> initialState<span class="token punctuation">;</span>
    <span class="token keyword">const</span> currentCursor <span class="token operator">=</span> cursor<span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token parameter">newState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        memorizedState<span class="token punctuation">[</span>currentCuror<span class="token punctuation">]</span> <span class="token operator">=</span> newState
        <span class="token comment">// render 的意思就是告诉react，可以做diff了，diff之后视图更新</span>
        <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 返回 setState, setState的作用域链上有currentCursor变量，所以无法释放，形成闭包</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>memorizedState<span class="token punctuation">[</span>cursor<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">,</span> setState<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token punctuation">[</span>show<span class="token punctuation">,</span> setState<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>闭包引起了状态不能更新</p>
<h3 id="如何绕过-capture-value" tabindex="-1"><a class="header-anchor" href="#如何绕过-capture-value" aria-hidden="true">#</a> 如何绕过 Capture Value</h3>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>const [flag, setFlag] = useState(false)
function handleClick() {
    setFlag(!flag);

    timer = setTimeout(() =&gt; {
        setFlag(!flag);
    }, 2000);
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>首次点击按钮后，产生一个快照 ：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>// ...
falg = false;

function handleClick() {
    setFlag(true);

    timer = setTimeout(() =&gt; {
        setFlag(true);
    }, 2000);
}
// ...
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>所以，2s 后 flag 依然 true。</p>
<p>要解决这个问题，很容易想到把上次的状态保存起来。</p>
<h3 id="怎么理解这个快照" tabindex="-1"><a class="header-anchor" href="#怎么理解这个快照" aria-hidden="true">#</a> 怎么理解这个快照</h3>
<p>先看看这个普通函数的类似的行为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">person</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> name <span class="token operator">=</span> person<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'Hello,'</span> <span class="token operator">+</span> name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> someone <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">'Johan'</span><span class="token punctuation">}</span>
<span class="token function">sayHi</span><span class="token punctuation">(</span>someone<span class="token punctuation">)</span>

someone <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'elaine'</span><span class="token punctuation">}</span>
<span class="token function">sayHi</span><span class="token punctuation">(</span>someone<span class="token punctuation">)</span>

someone <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">'xiaowo'</span><span class="token punctuation">}</span>
<span class="token function">sayHi</span><span class="token punctuation">(</span>someone<span class="token punctuation">)</span>
<span class="token comment">// Hello, johan</span>
<span class="token comment">// Hello, elaine</span>
<span class="token comment">// Hello, xiaowo</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>这个例子种，外层的<code>someone</code> 会被赋值很多次（就像在React中，当前的状态会改变一样）</p>
<p>形成快照，2s之后的是按照2秒前的动作执行</p>
<p>所以产生 Capture Value 的原因，正是每一次 re-render 的时候，都是重新去执行函数组件了，对于之前已经执行过的函数组件，并不会做任何操作</p>
<p>利用 <code>useRef</code> 就可以绕过 Capture Value 的特性。<strong>可以认为 <code>ref</code> 在所有 Render 过程中保持着唯一引用，因此所有对 <code>ref</code> 的赋值或取值，拿到的都只有一个最终状态</strong>，而不会在每个 Render 间存在隔离。</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://mp.weixin.qq.com/s/eyFKOi3PTux6aTF0s557Rg" target="_blank" rel="noopener noreferrer">React Hooks 踩坑之-- Capture Value 特性<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/" target="_blank" rel="noopener noreferrer">useEffect 完整指南<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844903806090608647#heading-5" target="_blank" rel="noopener noreferrer">精读《useEffect 完全指南》<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
