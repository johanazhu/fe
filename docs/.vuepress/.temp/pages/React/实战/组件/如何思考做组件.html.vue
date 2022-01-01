<template><h1 id="如何思考做组件" tabindex="-1"><a class="header-anchor" href="#如何思考做组件" aria-hidden="true">#</a> 如何思考做组件</h1>
<p>在面试时，面试官常会问你一个问题，你是如何设计组件的？假设让你做过一个 Modal 组件，你会怎么做？假设让你做一个非常复杂的组件，你会如何思考？这里谈谈我的看法</p>
<p>通常来说，要做一个组件，我们的思考思路是这样，</p>
<p>一个常见的组件通用，我们将共同的地方提取，提取多了，自然而然有了更细微了基础组件，即类似Button、Icon、Layout 等，同理，Input 组件也在其中</p>
<p>通常意义上，使用一个组件时，会在属性中加参数来表示使用了此功能，例如</p>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Input</span></span> <span class="token attr-name">model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>value<span class="token punctuation">"</span></span> <span class="token attr-name">center</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>短信验证码<span class="token punctuation">"</span></span> <span class="token attr-name">clearable</span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入短信验证码<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>	
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>截图</p>
<p>这个组件起码包含XX组件，</p>
<p>我会把组件分为基础组件，</p>
<p>两层思考，一个是组件及可用，即Button、Icon等，你拿来可以直接用</p>
<p>但是功能点与业务捆绑比较重的组件，我会将其拆分为模块子组件，演示一下</p>
<p>一般使用方法：</p>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Input</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>文本<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>业务方面的使用方法：</p>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Input.captcha</span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>短信验证码<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这个组件表示短信验证码组件</p>
</template>
