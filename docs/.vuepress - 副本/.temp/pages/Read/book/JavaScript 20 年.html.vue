<template><h1 id="javascript-20-年" tabindex="-1"><a class="header-anchor" href="#javascript-20-年" aria-hidden="true">#</a> JavaScript 20 年</h1>
<p>JavaScript 最开始的名字叫 Mocha</p>
<p>编年体的时间性</p>
<p>全文分为四个部分，每部分都对应 JavaScript 演化历程中的一个主要阶段。各部分之间还有一段简短的插曲，介绍彼时的开发者们是如何看待与使用 JavaScript 的。</p>
<ol>
<li><strong><a href="https://cn.history.js.org/part-1.html" target="_blank" rel="noopener noreferrer">语言诞生<ExternalLinkIcon/></a></strong>（The Origins of JavaScript），介绍了 JavaScript 的创建与早期发展，包括语言的诞生背景、命名方式、初始特性及其设计理念等。这一节还追溯了它在 Netscape 与其他公司最初的演化，例如微软的 JScript。</li>
<li><strong><a href="https://cn.history.js.org/part-2.html" target="_blank" rel="noopener noreferrer">创立标准<ExternalLinkIcon/></a></strong>（Creating a Standard），介绍了从 JavaScript 到 ECMAScript 标准的历程。这主要涵盖 JavaScript 标准化工作的启动、规范的创建、相关贡献者以及决策方式等。</li>
<li><strong><a href="https://cn.history.js.org/part-3.html" target="_blank" rel="noopener noreferrer">改革失败<ExternalLinkIcon/></a></strong>（Failed Reformations），介绍了在 Eich 离开后，缺乏「仁慈独裁者」的 ECMAScript 委员会修改语言的失败尝试。这主要涉及委员会的分裂、对 ES4 的两轮投入，以及 Flash 与 ActionScript 在其中的渊源等。</li>
<li><strong><a href="https://cn.history.js.org/part-4.html" target="_blank" rel="noopener noreferrer">继往开来<ExternalLinkIcon/></a></strong>（Modernizing JavaScript），介绍了 2009 年 ES5 与 2015 年 ES6 这两个成功标准背后的故事，主要包括对 ES5 与 ES6 的目标、重大基础性更改与重要新特性的介绍与回顾。</li>
</ol>
<p>所有人都认可 Mocha 将会「基于对象」但没有类。因为支持类将花费很长时间，并有与 Java 竞争的风险。</p>
<p>函数一等公民对应的这套工具深受 Scheme 习惯用法的启发，方法不必被包含在类中。这包括支持顶层的子程序、将函数作为参数传递、对象上的方法，以及事件处理器（event handler）</p>
<p>事件处理器和对象方法通过向 Java（在 C++ 之后）借鉴的 <code>this</code> 关键字得以统一。在所有函数中，它都用于表示该函数在作为方法被调用时的上下文对象。</p>
<p>JavaScript 1.1 添加了 <code>delete</code>，<code>typeof</code> 和 <code>void</code> 运算符。在 JavaScript 1.1 中，<code>delete</code> 运算符仅会将其对应的变量或对象属性操作数设为 <code>null</code> 值。<code>typeof</code> 运算符会返回一个字符串，该字符串标识其操作数的原始类型。</p>
<p>《JavaScript 1.1 指南》[<a href="https://cn.history.js.org/references.html#netscape:js1.1:handbook" target="_blank" rel="noopener noreferrer">Netscape 1996e<ExternalLinkIcon/></a>] 将 <code>prototype</code> 描述为「由所有该类型对象共享的属性」。这是个模糊的描述，更好的表述可能是这样的：原型是一种特殊的对象，其自身属性与所有「由构造函数创建的对象」所共享。</p>
<p>方法仅在原型对象上挂载了一次，而不是在构造每个实例对象时重复挂载。由原型对象提供给某个对象的属性称为<em>继承属性</em><a href="https://cn.history.js.org/appendices.html#inherited-property" target="_blank" rel="noopener noreferrer">g<ExternalLinkIcon/></a>，而直接在对象上定义的属性则称为<em>自有属性</em><a href="https://cn.history.js.org/appendices.html#own-property" target="_blank" rel="noopener noreferrer">g<ExternalLinkIcon/></a>。自有属性会遮盖同名的继承属性。</p>
<p>原型对象的属性通常是方法。在这种情况下，构造函数提供的原型将通用的行为与一组对象相关联。构造函数实际上充当的是类对象（class object）的角色，其原型相当于与类实例共享方法的容器</p>
</template>
