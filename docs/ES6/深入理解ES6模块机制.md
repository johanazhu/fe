# 深入理解 ES6 模块机制



ES6 模块跟 CommonJS 模块的不同，主要有一下两个方面：

	1. ES6 模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝
	2. ES6 模块编译时执行，而 CommonJS 模块总是在运行时加载

这个怎么理解呢？我们一步步来看：

CommonJS 输出值的拷贝

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就是影响不到这个值。

```javascript
// a.js
var b = require('./b');
console.log(b.foo);
setTimeout(() => {
    console.log(b.foo);
    console.log(require('./b').foo)
}, 1000)

// b.js
let foo = 1;
setTimeout(() => {
    foo = 2;
}, 500)

module.exports = {
    foo: foo
}
// 执行： node a.js
// 执行结果：
// 1
// 1
// 1
```

上面代码说明， b 模块加载以后，它的内部 foo 变化就影响不到输出的 exports.foo 。这是我 foo 是一个原始类型的值，它被缓存。所有如果你想要在 CommonJS 中动态获取模块中的值，那么就需要借助函数延时执行的特性。

```javascript
// a.js
var b = require('./b');
console.log(b.foo());
setTimeout(() => {
    console.log(b.foo());
    console.log(require('./b').foo())
}, 1000)

// b.js
var foo = 1;
setTimeout(() => {
    foo = 2;
}, 500)

module.exports = {
    foo: () => {
        return foo;
    }
}
// 执行： node a.js
// 执行结果：
// 1
// 2
// 2
```

我们总结一下：

	1. CommonJS 模块重复引入的模块并不会重复执行，再次获取模块直接获取暴露的 module.exports 对象
	2. 如果你要处处获取到模块内的最新值的花，也可以你每次更新数据的时候每次都要去更新 module.exports 上的值。
	3. 如果你暴露的 module.exports 的属性是个对象，那就不存在这个问题

所以如果你要处处获取到模块内的最新值的花，也可以你每次更新数据的时候每次都要去更新 module.exports 上的值，比如：

```javascript
// a.js
var b = require('./b');
console.log(b.foo);
setTimeout(() => {
    console.log(b.foo);
    console.log(require('./b').foo);
}, 1000)

// b.js
module.exports.foo = 1;
setTimeout(() => {
    module.exports.foo = 2; 
}, 500)
// 时刻变化输出值

// 执行：node a.js
// 执行结果：
// 1
// 2
// 2
```

#### ES6 输出值的引用

然后在 ES6 模块中就不再是生成输出对象的拷贝，而是动态关联模块中的值。

```javascript
// a.js
import { foo } from './b';
console.log(foo);
setTimeout(() => {
    console.log(foo);
    import('./b').then(({ foo }) => {
        console.log(foo);
    })
    // 直接 import('./b') 不行，因为静态编译
}, 1000)

// b.js
export let foo = 1;
setTimeout(() => {
    foo = 2;
}, 500)

// 执行： babel-node a.js
// 执行结果：
// 1
// 2
// 2
```

#### ES6 静态编译，CommonJS 运行时加载

关于第二点，ES6 模块编译时执行会导致有一下两个特点：

	1. import 命令会被 JavaScript 引擎静态分析，优先于模块内的其他内容执行
	2. export 命令会有变量声明提前的效果

##### import 优先执行

从第一条来看，在文件中的任何位置引入 import 模块都会被提前到文件顶部

```javascript
// a.js
console.log('a.js');
import { foo } from './b';

// b.js
export let foo = 1;
console.log('b.js 先执行');

// 执行 babel-node a.js
// 执行结果：
// b.js 先执行
// a.js
```

从执行结果我们可以很直观地看出，虽然 a 模块中 import 引入晚于 `console.log('a')` , 但是它被 JS 引擎通过静态分析，提到模块执行的最前面，优于模块中的其他部分的执行

由于 import 是静态执行，所以 import 具有提升效果即 import 命令在模块中的位置并不影响程序的输出

##### export 变量声明提升

正常的引入模块是没办法看出变量声明提升的特性，需要通过循环依赖加载才能看出。

```javascript
// a.js
import { foo } from './b';
console.log('a.js');
export const bar = 1;
export const bar2 = () => {
    console.log('bar2')
};
export function bar3() {
    console.log('bar3')
}

// b.js
export let foo = 1;
import * as a from './a';
console.log(a);

// 执行结果:
// { bar: undefined, bar2: undefined, bar3: [Function: bar3] }
// a.js
```

从上面的例子可以很直观地看出，a 模块引用了 b 模块，b 模块也引用了 a 模块，export 声明的变量也是优于模块其他内容的执行的，但是具体对变量赋值需要等到执行到相应代码的时候。（当然函数声明和函数表达式声明不一样，这点和JS函数性质一样）

讲完了 ES6 模块和 CommonJS 模块的不同点之后，接下来就讲讲相同点：

#### 模块不会重复执行

这点很好理解，无论是 ES6 模块还是 CommonJS 模块，当你重复引用某个相同模块时，模块智慧执行一次。

```javascript
// a.js
import './b';
import './b';

// b.js
console.log('只会执行一次')

// 执行结果
// 只会执行一次
```

结合上面说的特性，我们来看一个比较经典的例子，依赖循环，当你理解了上面所讲的特性之后，下次遇到模块循环依赖代码的执行结果就很容易理解了

#### CommonJS 模块循环依赖

先来看下面的例子：

```javascript
// a.js
console.log('a strating')
exports.done = false;
const b = require('./b');
console.log('in a, b.done =', b.done)
exports.done = true;
console.log('a done')

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a');
console.log('in b, a.done =', a.done);
exports.done = true;
console.log('b done');

// node a.js
// 执行结果:
// a starting 
// b starting
// in b, a.done = false
// b done
// in a, b.done = true
// a.done
```

结合之前讲的特性很好理解，当你从 b 中想引入 a 模块时，因为 node 之前已经加载过 a 模块了，所以它不会再去重复执行a 模块，而是直接去生成当年 a 模块吐出的 `module.exports` 对象，因为 a 模块引入 b 模块先于给 done 重新复制，所以当前 a 模块中输出的 module.exports 中的 done 的值仍为 false。而当 a 模块中输出 b 模块的 done 值的时候 b 模块已经执行完毕，所以 b 模块中的 done 值为 true。

从上面的执行过程中，我们可以看到，在 CommonJS 规范中，当遇到 require() 语句时，会执行 require 模块中的代码，**并缓存执行的结果**，当下次再次加载时不会重复执行，而是直接取缓存的结果。正因为此，出现循环依赖时才不会出现无限循环调用的情况。虽然这种模式加载机制可以笔名出现循环依赖时报错的情况，但稍不注意就很可能使得代码并不是像我们想象的那样去执行。因为写代码时还需要自己规划，以保证循环模块的依赖能正常工作。

那么有什么办法可以出现循环依赖的时候避免自己出现混乱呢？一种解决方式便是将每个模块先写 exports 语法，再写 require 语法，利用 CommonJS 的缓存机制，在 require() 其他模块之前就先把自身要导出的 内容导出，这样就能保证求他模块在使用时可以取到正确的值。比如：

```javascript
// a.js
exports.done = true;
let b = require('./b');
console.log(b.done);

// b.js
exports.done = true;
let a = require('./a');
console.log(a.done)

```

这种写法简单明了，缺点是要改变每个模块的写法，而且大部分同学都习惯了在文件开头先写 require 语句。

#### ES6 模块循环依赖

跟 CommonJS 模块一样，ES6 不会再去执行重复加载的模块，又由于 ES6 动态输出绑定的特性，能保证 ES6 在任何时候都能获取其他模块点前的最新值。

```javascript
// a.js
console.log('a starting');
import { foo } from './b';
console.log('in b, foo:', foo);
export const bar = 2;
console.log('a done');

// b.js
console.log('b starting');
import { bar } from './a';
export const foo = 'foo';
console.log('in a, bar:', bar);
setTimeout(() => {
    console.log('in a, setTimeout bar:', bar);
})
console.log('b done');

// babel-node a.js
// 执行结果
// b starting
// in a, bar: undefined
// b done
// a starting
// in b, foo: foo
// a done
// in a, setTimeout bar: 2
```

如果没看懂执行结果的花，那说明没理解前面说的 ES6 模块特性，麻烦请重新看一遍！

#### 动态 import()

ES6 模块在编译时就会静态分析，优先于模块内的其他内容执行，所以导致了我们无法写出像下面的代码：

```javascript
if(some codition) {
    import a from './a';
} else {
    import b from './b';
}
// or
import a from (styr + 'b'); 
```

因为编译时静态分析，导致了我们无法在条件语句或者拼接字符串模块，因为这些都是需要在运行时才能确定的结果。在 ES6 模块是不被允许的，所以 动态引入 import() 应运而生。

`import()` 允许你在运行时动态地引入 ES6 模块，想到这，你可能也想到了 `require.ensure` 这个语法，但是它们的用途却截然不同

`require.ensure` 的出现时 webpack 的产物，它是因为浏览器需要一种异步的机制可以用来异步加载模块，从而减少初始的加载文件的体积，所以如果在服务端的话 `require.ensure` 就无用武之地了，因为服务端不存在异步加载模块的情况，模块同步进行加载就可以满足使用场景了。CommonJS 模块可以在运行时确认模块加载。

而 `import()` 则不同，它主要是为了解决 ES6 模块无法在运行时确定模块的引用关系，所以需要引入 `import()`

我们先来看下它的用法：

1. 动态的 `import()` 提供一个基于 Promise 的 API
2. 动态的 `import()` 可以在脚本的任何地方使用
3. `import()` 接受字符串文字，你可以根据你的需求构造说明符

举个简单的例子：

```javascript
// a.js
const sty = './b';
const flag = true;
if(flag) {
    import('./b').then({foo}) => {
        console.log(foo)
    }
}
import(str).then(({foo}) => {
    console.log(foo);
}) 

// b.js 
export const foo = 'foo';

// babel-node a.js
// 执行结果
// foo
// foo
```

当然，如果在浏览器端的 `import()` 的用途就会变得更广泛，比如 按需异步加载模块，那么就和 `require.ensure` 功能类似了。

因为都是基于 Promise 的，所以如果你想要同事加载多个模块的花，可以是 Promise.all 进行并行异步加载。

```javascript
Promise.all([
    import('./a.js'),
    import('./b.js'),
    import('./c.js'),
]).then(([a, {default: b}, {c}]) => {
    console.log('a.js is loaded dynamically');
    console.log('b.js is loaded dynamically');
    console.log('c.js is loaded dynamically');
})
```

还有 Promise.race 方法，它检查哪个 Promise 被首先 resolved 或 reject。我们可以使用 import() 来检查哪个CDN 速度更快：

```javascript
const CDNs = [
  {
    name: 'jQuery.com',
    url: 'https://code.jquery.com/jquery-3.1.1.min.js'
  },
  {
    name: 'googleapis.com',
    url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'
  }
];

console.log(`------`);
console.log(`jQuery is: ${window.jQuery}`);

Promise.race([
  import(CDNs[0].url).then(()=>console.log(CDNs[0].name, 'loaded')),
  import(CDNs[1].url).then(()=>console.log(CDNs[1].name, 'loaded'))
]).then(()=> {
  console.log(`jQuery version: ${window.jQuery.fn.jquery}`);
});
```

当然，如果你觉得这样写不够优雅，也可以结合 async/await 语法糖来使用

```javascript
async function main() {
    const myModule = await import('./myModule.js');
    const { export1, export2 } = await import('./myModule.js');
    const [module1, module2, module3] = 
       await Promise.all([
           import('./module1.js'),
           import('./module2.js'),
           import('./module3.js'),
       ])
}
```

动态 `import()` 为我们提供了以异步方式使用 ES6 模块的额外功能。根据我们的需求动态或有条件地加载它们，这是我们能够更快，更好地创建更多优势应用程序

#### 结尾

ES6、CommonJS 模块加载机制到动态模块 import() 导入









## 参考资料

- [深入理解ES模块机制](https://github.com/happylindz/blog/issues/10)
- [「万字进阶」深入浅出 Commonjs 和 Es Module](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490880&idx=1&sn=82b29a739e8befefff6196024add7691&source=41#wechat_redirect)