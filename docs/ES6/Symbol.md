# Symbol



我们了解一个新东西时，首先要问三个问题，再关联已有知识，再结合得出结论

三个问题：这是什么？有什么用？什么场景下使用。

### Symbol是什么？

Symbol的作用非常的专一，换句话说其设计出来就只有一个目的——**作为对象属性的唯一标识符**，防止对象属性冲突发生





我们在React会看到这样的代码

```javascript
{
    $$typeof: Symbol(react.element),
    key: null,
    props: {},
    ref: null,
    type: ClickCounter
}
```





https://www.zhangxinxu.com/wordpress/2018/04/known-es6-symbol-function/



http://caibaojian.com/es6/symbol.html