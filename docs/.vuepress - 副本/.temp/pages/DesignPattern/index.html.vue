<template><h1 id="设计模式导航" tabindex="-1"><a class="header-anchor" href="#设计模式导航" aria-hidden="true">#</a> 设计模式导航</h1>
<h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h1>
<p>写在前面</p>
<p>因为写代码也有写的好坏</p>
<p>javascript即使面向对象语言又是函数式语言，那么你在代码中用函数式的写法来写代码，你会发现，代码是如何的简洁（以及别人看不懂时的装逼）</p>
<p>好的设计模型能让你对一些框架有更深层次的了解，例如Vue的MVVM模式，Koa的洋葱模型，更甚者 JS 语言中的原型也是一种模式（原型模式），再比如我们面向对象继承时最简单的工厂模式，new一个实例时的单例模式，再写Mobx作为状态管理时用到的装饰器模式等等等等</p>
<p>好的模式在生活中也无处不在，细心的你有发现吗？</p>
<p>这一章我们将模式，每一节介绍一样模式</p>
<h3 id="solid设计原则" tabindex="-1"><a class="header-anchor" href="#solid设计原则" aria-hidden="true">#</a> SOLID设计原则</h3>
<blockquote>
<p>“SOLID”是由罗伯特·C·马丁在21世纪早期引入的记忆术手写字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则</p>
</blockquote>
<p>设计原型是设计模式的指导理论，它可以帮助我们规避不良的软件设计。SOLID指代的五个基本原则分别是：</p>
<ul>
<li>单一功能原则（Single Responsibility Principle）</li>
<li>开放封闭原则（Opened Closed Principle）</li>
<li>里式替换原则（Liskov Substitution Principle)</li>
<li>接口隔离原则（Interface Segregation Principle）</li>
<li>依赖反转原则（Dependency Inversion Principle）</li>
</ul>
<h3 id="设计模式的核心思想——封装变化" tabindex="-1"><a class="header-anchor" href="#设计模式的核心思想——封装变化" aria-hidden="true">#</a> 设计模式的核心思想——封装变化</h3>
<p>我们要做到是将变化造成的影响最小化——将变与不变分离，确保变化的部分灵活，不变的部分稳定</p>
<h3 id="设计模式的-术" tabindex="-1"><a class="header-anchor" href="#设计模式的-术" aria-hidden="true">#</a> 设计模式的“术”</h3>
<p>所谓“术”，其实就是指二十年前GOF提出的最经典的23种设计模式。二十年前，四位程序员前辈通过《设计模式：可复用面向对象软件的基础》这本书，阐述了设计模式领域的开创性成果。</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s/dQE7-945x_2rieyBXV46rQ" target="_blank" rel="noopener noreferrer">【速学速记】《设计模式》这样学就对了！<ExternalLinkIcon/></a></li>
</ul>
</template>
