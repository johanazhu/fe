<template><h1 id="refs" tabindex="-1"><a class="header-anchor" href="#refs" aria-hidden="true">#</a> Refs</h1>
<p>Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建 React 元素</p>
<p>Ref 就是能获取到该元素的原始 dom</p>
<h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2>
<p>在某些情况下，我们需要在数据流之外强制修改子组件，被修改的子组件可能是一个 React 组件的实例，饿可能是一个 DOM 元素，例如：</p>
<ul>
<li>管理焦点，文本选择或媒体播放</li>
<li>触发强制动画</li>
<li>集成第三方 DOM 库</li>
</ul>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> forwardRef <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token comment">// Refs 的使用</span>
<span class="token comment">// 什么是 Refs, Refs 提供了一种方法，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素</span>
<span class="token comment">// 有什么用？可以通过Dom操作节点</span>
<span class="token comment">// 怎么说？怎么操作，具体的案例有吗</span>
<span class="token comment">// 例如在 MyComponent 里，我使用 React.createRef() 创建了一个 ref（myRef），在render时挂载到</span>
<span class="token comment">// div 元素上，这是我们可以通过DOM操作来控制这个元素，</span>
<span class="token comment">// 使用方法是 this.myRef.current ,如例2 MyComponent1，</span>
<span class="token comment">// 截图可得，我们已经取到了class为myref的div节点。当我们得到这个节点后，就可以通过Dom操作（像</span>
<span class="token comment">// Jquery那样操作）来改变组件中的值</span>
<span class="token comment">// 一种在 class 情况下使用 this.myRef = React.createRef()</span>
<span class="token comment">// 但是在 hook 中也可以使用</span>

<span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React</span><span class="token punctuation">.</span>Component <span class="token punctuation">{</span>
    myRef<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>myRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>myRef<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyComponent1</span> <span class="token keyword">extends</span> <span class="token class-name">React</span><span class="token punctuation">.</span>Component <span class="token punctuation">{</span>
    myRef<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>myRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>myRef<span class="token punctuation">.</span>current<span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'node'</span><span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myref<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>myRef<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">1111</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">TestClassButton</span> <span class="token keyword">extends</span> <span class="token class-name">React</span><span class="token punctuation">.</span>Component <span class="token punctuation">{</span>
    buttonRef<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
    textRef<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>buttonRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>textRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">111</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>buttonRef<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">点击按钮</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token punctuation">{</span><span class="token comment">/* &lt;MyFunctionComponent ref={this.textRef} /> */</span><span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 默认情况下，你不能在函数组件上使用 ref 属性，因为它们没有实例</span>
<span class="token comment">// function MyFunctionComponent() {</span>
<span class="token comment">//     return &lt;input />;</span>
<span class="token comment">// }</span>

<span class="token comment">// class Parent extends React.Component {</span>
<span class="token comment">//     constructor(props) {</span>
<span class="token comment">//         super(props);</span>
<span class="token comment">//         this.textInput = React.createRef();</span>
<span class="token comment">//     }</span>
<span class="token comment">//     render() {</span>
<span class="token comment">//         // 代码不能运行</span>
<span class="token comment">//         return (</span>
<span class="token comment">//             &lt;MyFunctionComponent ref={this.textInput} /></span>
<span class="token comment">//         );</span>
<span class="token comment">//     }</span>
<span class="token comment">// }</span>
<span class="token comment">// 如上代码所示，函数式组件没有实例</span>
<span class="token comment">// 如果要在函数组件中使用 ref ，可以使用 forwardRef（转发）</span>
<span class="token keyword">const</span> MyFunctionComponent <span class="token operator">=</span> <span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token operator">:</span> any<span class="token punctuation">,</span> ref<span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>ref<span class="token punctuation">}</span></span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>value<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token keyword">extends</span> <span class="token class-name">React</span><span class="token punctuation">.</span>Component <span class="token punctuation">{</span>
    textInput<span class="token operator">:</span> <span class="token builtin">any</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>textInput <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 代码不能运行</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">MyFunctionComponent</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>textInput<span class="token punctuation">}</span></span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">'11111'</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 也就是说如果你要在外部通过ref控制函数组件ref的话，就可以用 forwwardRef 来实现，它一般与</span>
<span class="token comment">//  useImperativeHandle 结合（ref能做的事情很多， useImperativeHandle 限制暴露的api）</span>
<span class="token comment">// 不管怎么样，在函数组件内部使用 ref 属性是都可以的 (useRef)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>Parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&amp;mid=2247484399&amp;idx=1&amp;sn=e865eb3f967639477a05262d0ddf09af&amp;chksm=9782cd66a0f544700894ede3a1b02882585a738a0b3c31a56a8b297bd4b878d6f57d8c790fea&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1572998605426&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">你想知道的关于 Refs 的知识都在这了<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="#https://mp.weixin.qq.com/s/Y6rCRrv0H92cKnvZsn1c0g">React ref 从原理到应用</a></p>
</li>
<li>
<p><a href="https://juejin.cn/book/6945998773818490884/section/6953939191776411689" target="_blank" rel="noopener noreferrer">React 进阶实践指南<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
