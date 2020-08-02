# apply、call、bind



先说结论：

apply

call

bind

这三者都能改变this 的指向。用法即 A.call(B, ...args)。将 A中的this 指针指向 B 

```javascript
function People(name) {
    this.name = name;
    this.sayName = function(){
        console.log('My name is ' + this.name)
    }
}
const elaine = new People('elaine');
console.log(elaine.sayName()) // My name is elaine
const johan = { name: "johan" }
console.log(elaine.sayName.call(johan)) // My name is johan
```

将 









上下文的概念