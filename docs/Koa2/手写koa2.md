# 手写Koa2



之前讲过什么是 koa2，以及源码解读

这篇文章讲解如何手写

知识储备：

promise

ES6 get set





















```javascript

function app() { }
app.middlewares = []
app.use = function (cb) {
  app.middlewares.push(cb)
}
app.use((ctx, next) => {
  console.log('mid 1-1');
  next()
  console.log('mid 1-2');
})
app.use((ctx, next) => {
  console.log('mid 2-1');
  next()
  console.log('mid 2-2');
})
app.use((ctx, next) => {
  console.log('mid 3-1');
  next()
  console.log('mid 3-2');
})

function dispatch(index) {
  if (index === app.middlewares.length) return
  let mid = app.middlewares[index]
  mid({}, () => dispatch(index + 1)) // 执行 (ctx, next) => { ... }
}

dispatch(0)
```

