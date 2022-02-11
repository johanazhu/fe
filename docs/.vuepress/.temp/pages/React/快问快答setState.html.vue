<template><h1 id="快问快答-setstate" tabindex="-1"><a class="header-anchor" href="#快问快答-setstate" aria-hidden="true">#</a> 快问快答 setState</h1>
<h2 id="基础认识" tabindex="-1"><a class="header-anchor" href="#基础认识" aria-hidden="true">#</a> 基础认识</h2>
<h3 id="setstate-是同步还是异步的" tabindex="-1"><a class="header-anchor" href="#setstate-是同步还是异步的" aria-hidden="true">#</a> setState 是同步还是异步的？</h3>
<p>分情况。合成事件、钩子函数中调用，表现为“异步”；原生事件、setTimeout/setInterval、Promise 等原生 API 调用则是同步。</p>
<h3 id="为什么这么设计" tabindex="-1"><a class="header-anchor" href="#为什么这么设计" aria-hidden="true">#</a> 为什么这么设计？</h3>
<p>为了做<strong>性能优化</strong>，React 会将多个 this.setState 产生的修改放在一个队列里，最后批量合成再去渲染，提高性能。如果每次的状态更新都去重新渲染真实 dom，会引起巨大的性能消耗</p>
<ul>
<li>为什么会引起性能的消耗？
<ul>
<li>先是每次调用 setState 都要走一遍生命钩子函数</li>
<li>再则是 render 之后形成新的虚拟 dom ，新旧虚拟 dom 做对比，diff 需要花费性能</li>
<li>然后把 diff 后的 patch 更新到真实 dom 上，也需要消耗性能</li>
</ul>
</li>
</ul>
<h3 id="setstate-引发的生命周期" tabindex="-1"><a class="header-anchor" href="#setstate-引发的生命周期" aria-hidden="true">#</a> setState 引发的生命周期</h3>
<ul>
<li>static getDerivedStateFromProps</li>
<li>shouldComponentUpdate</li>
<li>UNSAFE_componentWillUpdate</li>
<li>render</li>
<li>getSnapshotBeforeUpdate</li>
<li>componentDidUpdate</li>
</ul>
<p>当 getDerivedStateFromProps 被调用时，this.state 没有得到更新</p>
<p>当 shouldComponentUpdate 被调用时，this.state 没有得到更新</p>
<p>当 UNSAFE_componentWillUpdate 被调用时，this.state 依然没有得到更新</p>
<p>直到 render 被调用时，this.state 才得到更新</p>
<h3 id="setstate-怎么才能获取最新的-state" tabindex="-1"><a class="header-anchor" href="#setstate-怎么才能获取最新的-state" aria-hidden="true">#</a> setState 怎么才能获取最新的 state</h3>
<p>setState 的第二个参数时可选的回调函数 <code>setState(stateChange[, callback])</code> 。它将在 setState 完成合并hou重新渲染组件并执行。通常，用 componentDidUpdate 来代替此方法</p>
<p>为什么？</p>
<p><a href="https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback" target="_blank" rel="noopener noreferrer">stackoverflow<ExternalLinkIcon/></a> 有人问过，也有人回答过</p>
<ul>
<li>
<p>一致的逻辑</p>
<ul>
<li>两个不同的方法调用 this.setState，一个有第二个参数，一个没有，不一致</li>
</ul>
</li>
<li>
<p>批量更新</p>
<ul>
<li>查看 <a href="https://codesandbox.io/s/blue-moon-mj5fz?file=/src/App.js" target="_blank" rel="noopener noreferrer">demo<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>
<p>什么时候 setState 会比较好？</p>
<ul>
<li>当外部代码需要等待状态更新时，将它包装到 promise.resolve 中</li>
</ul>
</li>
</ul>
<h3 id="为什么要-setstate-而不直接修改-state-this-state-xx-oo" tabindex="-1"><a class="header-anchor" href="#为什么要-setstate-而不直接修改-state-this-state-xx-oo" aria-hidden="true">#</a> 为什么要 setState，而不直接修改 state（this.state.xx = oo）</h3>
<p>setState 做的事情不仅时修改 this.state 的值，它还会触发 React 的更新机制，进行 diff，然后将 patch 部分更新到真实 dom 里。</p>
<p>如果直接 this.state.xx = oo 的话，state 虽然修改，但不会触发 UI 重渲染</p>
<h3 id="setstate-异步的原理" tabindex="-1"><a class="header-anchor" href="#setstate-异步的原理" aria-hidden="true">#</a> setState 异步的原理</h3>
<p>setState 的函数实现中，会根据 isBatchingUpdates（默认是 false）变量判断是否直接更新 this.state 还是放到队列中稍后更新。有一个 batchedUpdate 函数，可以修改 isBatchingUpdates 为 tue，当 React 调用事件处理函数之前或者生命周期函数之前就会调用 batchedUpdate 函数，这样的话，setState 就不会同步更新 this.state，而是放到更新队列里面后续更新</p>
<p><img src="https://i.loli.net/2021/09/13/yJb7HlFMe5pAZkU.png" alt="setState原理"></p>
<p>setState执行过程</p>
<p>https://juejin.cn/post/6844903781813993486#heading-5</p>
<h2 id="面试吊打" tabindex="-1"><a class="header-anchor" href="#面试吊打" aria-hidden="true">#</a> 面试吊打</h2>
<p>一、如下的代码，它的 a 的值是多少？组件 C 又 render 了几次</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class C extends React.Component {
  state = {
    a: 0
  };
  componentDidMount() {
    this.setState({ a: 1 });
    setTimeout(() =&gt; {
      this.setState({ a: 2 });
    }, 0);
    new Promise((resolve) =&gt; {
      resolve(this.setState({ a: 3 }));
    }).then(() =&gt; {
      this.setState({ a: 4 });
    });
  }
  render() {
    return &lt;div&gt;{this.state.a}&lt;/div&gt;;
  }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>思路：</p>
<p>生命周期中 render 在 componentDidMount 前执行</p>
<p>componentDidMount钩子函数中的执行顺序：</p>
<p>先进行同步代码，</p>
<ol>
<li>this.setState({ a: 1 })</li>
<li>resolve(this.setState({ a: 3 }));</li>
</ol>
<p>再执行 Promise 的微任务</p>
<ol start="3">
<li>this.setState({ a: 4 });</li>
</ol>
<p>最后执行 setTimeout 中的宏任务</p>
<ol start="4">
<li>this.setState({ a: 2 });</li>
</ol>
<p>可以得出：</p>
<p>第一次 render，a 的值为0</p>
<p>第二次 this.setState 批处理合并 a 为 3，再一次触发 render</p>
<p>第三次 Promise 引发的 render，a 为 4</p>
<p>第四次 setTimeout  引发的 render，a 为 2</p>
<p>附上在线 <a href="https://codesandbox.io/s/exciting-brattain-1pi5m?file=/src/App.js" target="_blank" rel="noopener noreferrer">demo<ExternalLinkIcon/></a></p>
<p>二、看看这道题，console 中的值是什么？组件 App 又渲染了几次</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class App extends React.Component {
  state = {
    val: 0
  };
  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 2 });
    console.log(this.state.val);
    setTimeout(() =&gt; {
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
    }, 0);
  }
  render() {
    return &lt;div className=&quot;App&quot;&gt;{this.state.val}&lt;/div&gt;;
  }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>思路：</p>
<ul>
<li>
<p>setState 有同步执行的代码，也有异步的。合成事件、生命周期钩子函数为异步执行，原生事件、setTimeout、promise 等原生 API 为同步代码</p>
</li>
<li>
<p>setState 又会被批处理，即在合成事件、生命周期钩子函数中多次调用 setState 函数产生的效果会合并</p>
</li>
</ul>
<p>componentDidMount 中的代码是同步执行，但是表现为异步（因为批处理）。按顺序执行，第一个 val 为 0，第二个 val 也为 0。接着进行批处理，合并 <code>Object.assign(val, {val: this.state.val + 1}, {val: this.state.val + 2})</code>。所以当同步代码执行完后 val 的值为 2</p>
<p>接着执行 setTimeout 中的代码，setTimeout 中的第一个，也就是第三个 val 为 2。接下来执行 setState，同步执行，render 一次，第四个 val 为 3。最后执行 setState，也是同步执行，render 一次，第五个 val 为 4。</p>
<p>所以 <code>console.log()</code> 中的值为 0、0、2、3、4。render 的次数为4次</p>
<p>可以在这里查看 <a href="https://codesandbox.io/s/setstate-216l6?file=/src/App.js" target="_blank" rel="noopener noreferrer">demo<ExternalLinkIcon/></a></p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/25954470" target="_blank" rel="noopener noreferrer">setState：这个API设计到底怎么样<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/25990883" target="_blank" rel="noopener noreferrer">setState为什么不会同步更新组件状态<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/26069727" target="_blank" rel="noopener noreferrer">setState何时同步更新状态<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000015615057" target="_blank" rel="noopener noreferrer">浅入深出setState（上篇）<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000015821018" target="_blank" rel="noopener noreferrer">浅入深出setState（下篇）<ExternalLinkIcon/></a></li>
<li><a href="https://keqingrong.cn/blog/2019-04-01-react-setstate" target="_blank" rel="noopener noreferrer">重新认识 React 的 setState<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/39512941" target="_blank" rel="noopener noreferrer">你真的理解setState吗？<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/my2Jx7pcbVYnaCWklAzKXA" target="_blank" rel="noopener noreferrer">setState 到底是同步的，还是异步的<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000040445026" target="_blank" rel="noopener noreferrer">React 中 setState 是一个宏任务还是微任务？<ExternalLinkIcon/></a></li>
<li><a href="https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback" target="_blank" rel="noopener noreferrer">What is the advantage of using componentDidUpdate over the setState callback?<ExternalLinkIcon/></a></li>
</ul>
</template>
