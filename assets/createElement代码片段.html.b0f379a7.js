import{_ as n,e as s}from"./app.873f0dc8.js";const a={},p=s(`<h1 id="react-createelement-\u4EE3\u7801\u7247\u6BB5" tabindex="-1"><a class="header-anchor" href="#react-createelement-\u4EE3\u7801\u7247\u6BB5" aria-hidden="true">#</a> React.createElement \u4EE3\u7801\u7247\u6BB5</h1><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createElement</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> config<span class="token punctuation">,</span> children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> propName<span class="token punctuation">;</span>

    <span class="token comment">// Reserved names are extracted</span>
    <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> key <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> ref <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> self <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> source <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>config <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasValidRef</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ref <span class="token operator">=</span> config<span class="token punctuation">.</span>ref<span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">warnIfStringRefCannotBeAutoConverted</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasValidKey</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            key <span class="token operator">=</span> <span class="token string">&#39;&#39;</span> <span class="token operator">+</span> config<span class="token punctuation">.</span>key<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        self <span class="token operator">=</span> config<span class="token punctuation">.</span>__self <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> config<span class="token punctuation">.</span>__self<span class="token punctuation">;</span>
        source <span class="token operator">=</span> config<span class="token punctuation">.</span>__source <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> config<span class="token punctuation">.</span>__source<span class="token punctuation">;</span>
        <span class="token comment">// Remaining properties are added to a new props object</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>propName <span class="token keyword">in</span> config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>
                <span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>config<span class="token punctuation">,</span> propName<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
                <span class="token operator">!</span><span class="token constant">RESERVED_PROPS</span><span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>propName<span class="token punctuation">)</span>
            <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                props<span class="token punctuation">[</span>propName<span class="token punctuation">]</span> <span class="token operator">=</span> config<span class="token punctuation">[</span>propName<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Children can be more than one argument, and those are transferred onto</span>
    <span class="token comment">// the newly allocated props object.</span>
    <span class="token keyword">const</span> childrenLength <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>childrenLength <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        props<span class="token punctuation">.</span>children <span class="token operator">=</span> children<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>childrenLength <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> childArray <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span>childrenLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> childrenLength<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            childArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arguments<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Object<span class="token punctuation">.</span>freeze<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>childArray<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        props<span class="token punctuation">.</span>children <span class="token operator">=</span> childArray<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Resolve default props</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">&amp;&amp;</span> type<span class="token punctuation">.</span>defaultProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> defaultProps <span class="token operator">=</span> type<span class="token punctuation">.</span>defaultProps<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>propName <span class="token keyword">in</span> defaultProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>props<span class="token punctuation">[</span>propName<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                props<span class="token punctuation">[</span>propName<span class="token punctuation">]</span> <span class="token operator">=</span> defaultProps<span class="token punctuation">[</span>propName<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">||</span> ref<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> displayName <span class="token operator">=</span>
                <span class="token keyword">typeof</span> type <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
                    <span class="token operator">?</span> type<span class="token punctuation">.</span>displayName <span class="token operator">||</span> type<span class="token punctuation">.</span>name <span class="token operator">||</span> <span class="token string">&#39;Unknown&#39;</span>
                    <span class="token operator">:</span> type<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">defineKeyPropWarningGetter</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> displayName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ref<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">defineRefPropWarningGetter</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> displayName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// \u8F93\u51FA</span>
    <span class="token comment">// type \u6807\u7B7E\u7C7B\u578B \u4F8B\u5982 div,p,span</span>
    <span class="token comment">// key(diff\u65F6\u4F7F\u7528)</span>
    <span class="token comment">// ref(\u4E3A\u4E86\u64CD\u4F5C\u771F\u5B9Edom)</span>
    <span class="token comment">// self \u81EA\u8EAB</span>
    <span class="token keyword">return</span> <span class="token function">ReactElement</span><span class="token punctuation">(</span>
        type<span class="token punctuation">,</span>
        key<span class="token punctuation">,</span>
        ref<span class="token punctuation">,</span>
        self<span class="token punctuation">,</span>
        source<span class="token punctuation">,</span>
        ReactCurrentOwner<span class="token punctuation">.</span>current<span class="token punctuation">,</span>
        props<span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div>`,2);function t(e,o){return p}var l=n(a,[["render",t],["__file","createElement\u4EE3\u7801\u7247\u6BB5.html.vue"]]);export{l as default};
