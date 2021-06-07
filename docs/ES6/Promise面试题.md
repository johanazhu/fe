# Promise 面试题



```javascript
async function async1() {
  console.log(1);
  const result = await async2();
  console.log(3);
}

async function async2() {
  console.log(2);
}

Promise.resolve().then(() => {
  console.log(4);
});

setTimeout(() => {
  console.log(5);
});

async1();
console.log(6);

```





题目二

```javascript
new Promise((resolve, reject) => {
    console.log("promise1")
    resolve()
}).then(() => {
    console.log("then11")
    new Promise((resolve, reject) => {
        console.log("promise2")
        resolve()
    }).then(() => {
        console.log("then21")
    }).then(() => {
        console.log("then23")
    })
}).then(() => {
    console.log("then12")
})
```



promise1

then11

promise2

then21

then12







