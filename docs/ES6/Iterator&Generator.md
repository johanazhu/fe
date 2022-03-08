# 生成器与迭代器



## Iterator迭代器



String、Array、Map、Set 等原生可迭代对象，因为他们都在原型（prototype）对象重实现了Symbol.iterator 键对应的方法

for...of 是对象迭代器的遍历，而 for...in 是对象重可枚举值的遍历



我们使用的 `for in` 循环，是通过调用被循环对象的一个特殊函数 `Iterator` 来实现的，但是以前这个函数是隐藏的我们无法访问，从 Symbol 引入之后，我们就可以通过 `Symbol.iterator` 来直接读写这个特殊函数



```javascript
var students = {}
students[Symbol.iterator] = function() {
  let index = 1;
  return { next() {
    return {done: index>100, value: index++} }
  }
}

for(var i of students) { console.log(i); }
```



## Generator生成器

Generator 是一个可以暂停和继续执行的函数。简单的用法，可以当作一个 Iterator 来用，进行一些遍历操作。复杂一些的用法，他可以在内部保存一些状态，成为一个状态机

Generator 的基本语法包含两部分

- 函数名前要加一个星号
- 函数内部用 yield 关键字返回值

可以理解为协程，就是说多个函数互相配合完成任务，类似于这样：

```javascript
function generator() {
    return {
        _value: [1, 2, 3, 4],
        next() {
            return {
                value: this._value.shift(),
                done: !this._value.length
            }
        }
    }
}

const it = generator();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```





## 参考资料

- [JavaScript：生成器（Generator）](https://www.jianshu.com/p/da611c080feb)