import{_ as t,c as e,o,d as i}from"./app.590c1fbf.js";const h=JSON.parse('{"title":"模拟题五","description":"","frontmatter":{},"headers":[],"relativePath":"Interview/book5.md"}'),a={name:"Interview/book5.md"},r=i('<h1 id="模拟题五" tabindex="-1">模拟题五 <a class="header-anchor" href="#模拟题五" aria-hidden="true">#</a></h1><ol><li>谈谈变量提升</li></ol><p>考察点：变量提升 变量是会提升的。var 申明的变量会提升至顶部，然后赋值时在执行 函数提升的权重大于变量提升</p><ol start="2"><li>new 操作符具体做了什么</li></ol><p>考察点：new 操作符</p><p>在内存中创建一个新对象 这个新对象的[[prototype]] 指向被赋值为构造函数的 prototype 属性 构造函数内部的 this 被赋值为这个新对象 执行构造函数内部的代码 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象</p><ol start="3"><li>介绍下盒子模型</li></ol><p>考察点：盒子模型</p><p>盒子模型由 margin、border、padding、content 组成 分两种 标准盒子模型 width= content 宽度 height= content 高度 IE 模型 width=border+content+padding height=border+content+padding 标准盒子模型：box-sizing:content-box IE 盒子模型：box-sizing:border-box</p><ol start="4"><li>有哪些方法可以使 div 居中</li></ol><p>考察点：div 居中</p><p>分三种情况，水平居中，垂直居中，水平垂直居中</p><p>单水平居中而言，居中元素不定宽高 absolute+transform flex 属性居中 flex + 子项 margin auto grid 属性居中 grid 子项 margin auto grid 子项属性居中 -webkit-box 属性居中 table-cell + text-align line-height + text-align writeing-mode table 居中元素需定宽高 须知宽高+absolute+负 margin 须知宽高+absolute+calc 须知宽高+absolute+margin auto 局限性较大的全局居中 须知宽高+fixed+transform 须知宽高+fixed+负 margin 须知宽高+fixed+calc 须知宽高+fixed+margin auto</p><ol start="5"><li>有听说过前端性能优化指标 RAIL 吗</li></ol><p>考察点：性能优化指标 RAIL</p><ol start="6"><li>进程和线程的区别</li></ol><p>考察点：进程和线程 进程是一个应用起来的实例，线城是运行在进程中的最小单位</p><ol start="7"><li>tcp 滑动窗口是什么</li></ol><p>考察点：tcp</p><ol start="8"><li>实现一个斐波那契数列</li></ol><p>考察点：斐波那契数列</p>',21),l=[r];function n(p,d,s,c,_,g){return o(),e("div",null,l)}const m=t(a,[["render",n]]);export{h as __pageData,m as default};