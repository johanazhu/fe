<template><h1 id="代码题" tabindex="-1"><a class="header-anchor" href="#代码题" aria-hidden="true">#</a> 代码题</h1>
<p>Q：如下的代码，它的 a 的值是多少？又 render 了几次</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class C extends Component {
   this.state = {
       a: 0;
   }
   componentDidMount() {
       this.setState({ a: 1 })
       setTimeout(() =&gt; {
           	this.setState({a: 2})
       }, 0)
       new Promise((resolve) =&gt; {
           resolve(this.setState({ a: 3}))
       }).then(() =&gt; { this.setState({a:4}) })
   }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>A：</p>
<p>Q：useState中的值是个对象，改变对象中的值，demo 会渲染吗？如果用 React.memo() 包裹住呢</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>function demo() {
    const [data, setData] = useState({ foo: { bar: { baz: 1}}})
    return (
    	&lt;div onClick={() =&gt; setData(1)}&gt;改变&lt;/div&gt;	
    )
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>A：</p>
</template>
