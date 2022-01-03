<template><h1 id="javascript-设计模式核心原理笔记" tabindex="-1"><a class="header-anchor" href="#javascript-设计模式核心原理笔记" aria-hidden="true">#</a> JavaScript 设计模式核心原理笔记</h1>
<h3 id="核心思想" tabindex="-1"><a class="header-anchor" href="#核心思想" aria-hidden="true">#</a> 核心思想</h3>
<p>​	SOLID 设计原则</p>
<blockquote>
<p>​		“SOLID”是由罗伯特·C·马丁在 21 世纪早期引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。</p>
</blockquote>
<p>分别是：</p>
<ul>
<li>单一功能原则（Single Responsibility Principle）</li>
<li>开发封闭原则（Opened Closed Principle）</li>
<li>里市替换原则（Liskov Substitution Principle)</li>
<li>接口隔离原则（Interface Segregation Principle）</li>
<li>依赖反转原则（Dependency Inversion Principle）</li>
</ul>
<h4 id="设计模式的核心思想——封装变化" tabindex="-1"><a class="header-anchor" href="#设计模式的核心思想——封装变化" aria-hidden="true">#</a> 设计模式的核心思想——封装变化</h4>
<p>将变与不变分离，确保变化的部分灵活、不变的部分稳定</p>
<h3 id="设计模式中的-术" tabindex="-1"><a class="header-anchor" href="#设计模式中的-术" aria-hidden="true">#</a> 设计模式中的“术”</h3>
<p>二十年前，四位程序员前辈（Erich Gamma, Richard Helm, Ralph Johnson &amp; John Vlissides）通过编写《设计模式：可复用面向对象软件的基础》这本书， 阐述了设计模式领域的开创性成果。在这本书中，将23种设计模式按照“创建型”、“行为型”和“结构型”进行划分：</p>
<p><img src="https://i.loli.net/2021/06/03/Pjf1Au3QMev74ca.png" alt="23种设计模式"></p>
<p>无论是创建型、结构型还是行为型，这些具体的设计模式都是在用自己的方式去封装不同类型的变化。</p>
<p>​	创建型模式封装了创建对象过程中的变化，比如工厂模式，他做的事情就是讲创建对象的过程抽离;</p>
<p>​	结构型模式封装的是对象之间组合方式的变化，目的在于灵活地表达对象间的配合与依赖关系；</p>
<p>​	行为型模式则将是对象千变万化的行为进行抽离，确保我们能够更安全、更方便地对行为进行更改</p>
<p>设计原则</p>
<p>分类依据</p>
<p>创建型</p>
<p>工厂模式</p>
<p>抽象工厂模式</p>
<p>原型模式</p>
<p>结构型</p>
<p>装饰器模式</p>
<p>适配器模式</p>
<p>代理模式</p>
<p>行为型</p>
<p>观察者模式</p>
<p>策略模式</p>
<p>状态模式</p>
<p>迭代器模式</p>
<p>思考：</p>
<p>实例和类的关系</p>
<p>为什么要有实例</p>
<p>为什么不能用类来实现代码</p>
<p>new Function()</p>
<p>new Error()</p>
<p>new Array()</p>
<p>new Object()</p>
<p>...</p>
<p>为什么要 new 它，为什么要实例化它</p>
</template>
