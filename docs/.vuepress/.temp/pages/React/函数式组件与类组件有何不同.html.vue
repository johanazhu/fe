<template><h1 id="函数式组件与类组件有何不同" tabindex="-1"><a class="header-anchor" href="#函数式组件与类组件有何不同" aria-hidden="true">#</a> 函数式组件与类组件有何不同？</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>React 中最关键的知识点就是 <strong>组件</strong>，在 React 16.8 之前（还没有 Hooks 前），我们的应用大多写成 Class 组件，因为 Class 组件有生命周期，能控制状态（state）。但函数式组件只能默默站在后面，说自己是木偶组件（也叫无状态组件），传来 props，展示UI</p>
<p>以下文字都基于有了 Hooks 后</p>
<h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2>
<p>函数式组件和类组件之间是否有什么根本上的区别？</p>
<p><strong>函数式组件捕获渲染时的值</strong></p>
<p>具体可以看这篇文章：<a href="https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/" target="_blank" rel="noopener noreferrer">函数式组件与类组件有何不同？<ExternalLinkIcon/></a></p>
<blockquote>
<p>因为在 React 中 props 是不可变（immutable）的，它们永远不会改变。然而，this 是可变（mutable）的</p>
<p>事实上，这就是类组件 this 存在的意义。React 本身会随着时间的推移而改变，以便你可以在渲染方法以及生命周期方法中得到最新的实例</p>
</blockquote>
<p>函数式组件会捕获当前状态下的值，如果你使用定时器改变当前值的状态，那函数式组件显示的还是原来的值，而不是最新值。而类组件会一直获取最新值</p>
<p>只要一渲染，函数式组件就会捕获当前的值。而类组件即使渲染了，但是它的 this 会指向最新的实例</p>
<h2 id="类组件" tabindex="-1"><a class="header-anchor" href="#类组件" aria-hidden="true">#</a> 类组件</h2>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class ProfilePage extends React.Component {
  showMessage = () =&gt; {
    alert('Followed ' + this.props.user);
  };

  handleClick = () =&gt; {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return &lt;button onClick={this.handleClick}&gt;Follow&lt;/button&gt;;
  }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>这样的结果是点击后获取到最新的值，而不是 3 秒前的值。为什么？因为 this 可变，3 秒之后执行 <code>alert('Followed ' + this.props.user)</code>。这个 this 取得是最新的值</p>
<p>如果类组件如果想保存原来的值该怎么做？</p>
<h3 id="一、调用事件之前读取this-props" tabindex="-1"><a class="header-anchor" href="#一、调用事件之前读取this-props" aria-hidden="true">#</a> 一、调用事件之前读取<code>this.props</code></h3>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>showMessage = (user) =&gt; {
    alert('Followed ' + user);
};

handleClick = () =&gt; {
    const {user} = this.props;
    setTimeout(() =&gt; this.showMessage(user), 3000);
};
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>点击时获取到当前的 user，再传递给 <code>this.showMessage</code>，这样，即使 3 秒之后也是原来的值</p>
<p>缺点：每次都要从 <code>this.props</code> 中拿值，如果数据一多，写起来不符合人性</p>
<h3 id="二、在构造函数中绑定方法" tabindex="-1"><a class="header-anchor" href="#二、在构造函数中绑定方法" aria-hidden="true">#</a> 二、在构造函数中绑定方法</h3>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>不科学，我们面对的问题时我们从 <code>this.props</code> 中读取数据太迟了—— 读取时已经不是哦我们所需要使用的上下文</p>
<h3 id="三、利用闭包" tabindex="-1"><a class="header-anchor" href="#三、利用闭包" aria-hidden="true">#</a> 三、利用闭包</h3>
<p>把方法写进 render 中，每次 render 就获取到最新的值</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>class ProfilePage extends React.Component {
  render() {
    const props = this.props;

    const showMessage = () =&gt; {
      alert('Followed ' + props.user);
    };

    const handleClick = () =&gt; {
      setTimeout(showMessage, 3000);
    };

    return &lt;button onClick={handleClick}&gt;Follow&lt;/button&gt;;
  }
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>但是这个方法很蠢，这个写法和函数式组件有什么区别呢？还不如用函数式组件呢</p>
<p>函数式组件本身每次渲染就会获取到当前的值，即使 3 秒后，获取的也是 3 秒前的状态，那如果想获取到最新的值呢？</p>
<h3 id="函数式组件如果想保存最新的值呢" tabindex="-1"><a class="header-anchor" href="#函数式组件如果想保存最新的值呢" aria-hidden="true">#</a> 函数式组件如果想保存最新的值呢</h3>
<p>使用 useRef 保存最新的值</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>function MyComponent() {
  const ref = useRef(null);
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>为什么 ref 能保存住最新的值。</p>
<p>一个 ref 与一个实例字段<a href="https://zh-hans.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables" target="_blank" rel="noopener noreferrer">扮演同样的角色<ExternalLinkIcon/></a>。「ref」对象是一个 current 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<p><a href="https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/" target="_blank" rel="noopener noreferrer">函数式组件与类组件有何不同？<ExternalLinkIcon/></a></p>
</template>
