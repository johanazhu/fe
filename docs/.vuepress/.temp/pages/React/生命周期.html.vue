<template><h1 id="react-生命周期管理" tabindex="-1"><a class="header-anchor" href="#react-生命周期管理" aria-hidden="true">#</a> React 生命周期管理</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>生命周期已经很久没有考过了</p>
<p>但是在我刚接触 React 的时候，这是个必学的知识点</p>
<p>相对应的 Vue ，小程序也有生命周期</p>
<p>你是否遇到过这样的问题：</p>
<ul>
<li>组件的生命周期有哪些？为什么要有生命周期函数？</li>
<li>我应该生命时候去获取后台数据？为什么很多教程都推荐用componentDidMount？用componentWillMount有什么问题？</li>
<li>为什么 setState 卸载这里造成了重复渲染多次？</li>
<li>setState在这里写合适吗</li>
</ul>
<p>组件是有周期</p>
<p>componentWillMount 当要挂载</p>
<p>componentDidMount 挂载上时</p>
<p>componentWillUnmount 摧毁时</p>
<p>componentWillReceiveProps 当传来的props变化时</p>
<p>shouldComponentUpdate 返回boolean</p>
<p>componentWillUpdate 当组件要更新前</p>
<p>componentDidUpdate 当组件更新完</p>
<p>现在生命周期都没人考了，为什么？大家都用 函数式组件来写，状态的话由hook来管理</p>
<p>为什么？写起来简单，不用写不必要的生命周期</p>
<p>组件渲染：</p>
<p>constructor-componentWillMount-render-componentDidMount</p>
<p>组件卸载：</p>
<p>componentDidUnmount</p>
<p>调用this.setState</p>
<p>shouldComponentUpdate-componentWillUpdate-render-componentDidUpdate</p>
<p>props变化</p>
<p>componentWillReceiveProps-shouldComponentUpdate-componentWillUpdate-render-componentDidUpdate(比调用this.setState多了componentWillReceiveProps)</p>
<p><img src="https://i.loli.net/2021/06/03/ZpyL2VFdatu7rc1.png" alt="image-20210429143319567"></p>
<p>这些场景，我们同样需要在React Hook中予以解决。React为<code>Class component</code>设计了一大堆生命周期函数：</p>
<ul>
<li>在实际的项目开发中用的比较频繁的，譬如渲染后期的：<code>componentDidMount</code>、<code>componentDidUpdate</code>、<code>componentWillUnmount</code>；</li>
<li>很少被使用的渲染前期钩子<code>componentWillMount</code>、<code>componentWillUpdate</code>；</li>
<li>一直以来被滥用且有争议的<code>componentWillReceiveProps</code>和最新的<code>getDerivedStateFromProps</code>；</li>
<li>用于性能优化的<code>shouldComponentUpdate</code>；</li>
</ul>
<p>React 16.3版本已经明确了将在17版本中废弃<code>componentWillMount</code>、<code>componentWillUpdate</code>和<code>componentWillReceiveProps</code>这三个生命周期函数。设计用来取代<code>componentWillReceiveProps</code>的<code>getDerivedStateFromProps</code>也并不被推荐使用</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://www.yuque.com/fe9/select/fon761" target="_blank" rel="noopener noreferrer">React生命周期管理<ExternalLinkIcon/></a></li>
<li><a href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" target="_blank" rel="noopener noreferrer">react-lifecycle-methods-diagram<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903655372488712" target="_blank" rel="noopener noreferrer">我对 React v16.4 生命周期的理解<ExternalLinkIcon/></a></li>
</ul>
</template>
