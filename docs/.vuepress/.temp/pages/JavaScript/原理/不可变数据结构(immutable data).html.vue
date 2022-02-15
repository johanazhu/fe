<template><h1 id="不可变数据结构" tabindex="-1"><a class="header-anchor" href="#不可变数据结构" aria-hidden="true">#</a> 不可变数据结构</h1>
<p>JS因为设计初衷所以，可以XXX</p>
<p>基础类型可以改变</p>
<p>引用类型不可以</p>
<p>引用类型——深浅拷贝</p>
<p>浅拷贝方法</p>
<p>​	对象</p>
<p>​		Object.assign()</p>
<p>​		解构赋值</p>
<p>​	数组</p>
<p>​		slice(0)</p>
<p>​		a.concat(b)</p>
<p>引申出JavaScript中有哪些方法会改变原数组，哪些返回返回值</p>
<p>不可变数据为什么流行</p>
<p>原因和React有很大关系</p>
<p>数据不可变性是为了服务diff，因为react的底层就是i这样实现的，需要对比数据是否变化，才会更新视图</p>
<p>react火了之后，打出函数式编程的口号，目的是让它们使用react</p>
<p>如何深拷贝</p>
<p>直接操作 this.state.push({name: 'johan'})react的数据更新是采用push的方式，也就是调用 setState 告诉 react 状态更新了，不然react是不会知道的
数据不可变数组的某些操作就是 immutable（返回新数组，不去修改原数组）字符串操作总是不可变的（他会创建一个包含更改的新字符串）
react 为什么不能直接修改 state？
因为 react 的底层实现是diff，所以必须依赖数据的 immutability，破坏了 immutability 会发生各种难以注意到的问题
数据不可变性是为了服务diff，因为react的底层就是这样实现，需要对比数据是否变化，才会更新视图
像vue，mobx之类，数据与视图绑定，视图变化，数据也跟着变化，这样就不需要调用setState
那么为什么react 强制要求 plain js object 的 immutability？因为它完全没有提供任何 [ reactive ] 和 [精准追踪改变] 的机制，而是在 vdom 上无脑diff</p>
<p>总结因为react的底层是diff，所以要保持数据的不可变性，如何让数据不可变呢？基本类型直接复制，引用类型就拷贝（浅拷贝四个方法），但是嵌套对象就不好办了，这个时候就要用到immutable之类的库，无论是函数时写法，还是纯函数概念，react一直在推崇，本质是数据的不可变性</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://github.com/sunyongjian/blog/issues/33" target="_blank" rel="noopener noreferrer">不可变数据结构（immutable data）<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.zhihu.com/question/440916294/answer/1715903878" target="_blank" rel="noopener noreferrer">React 为什么不能直接修改state?<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
