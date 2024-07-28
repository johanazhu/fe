# JavaScript 手写面试题

笔者面试多家公司，遇到不少手写面试题，这里分享笔者遇到的手写面试题，如果你也遇到了常见的面试题，可以在底部留言分享

## 目录

[数组去重](#数组去重)

[排序](#排序)

[数组扁平化、去重、排序](#数组扁平化、去重、排序)

[进度条](#进度条)



## 数组去重

给定一个数组 ` [1,2,2,4,null,null,'3','abc',3,5,4,1,2,2,4,null,null,'3','abc',3,5,4]`， 去除重复项

> PS：面试的时候一般不会允许你使用 ES6语法和 JS API 或者即使允许你也会让你写出多个方法越多越好，这里我们都写

```javascript
const arr =  [1,2,2,4,null,null,'3','abc',3,5,4,1,2,2,4,null,null,'3','abc',3,5,4]

// Array.from + new Set 
const unique = function (arr) {
    // new Set 返回的是集合
    return Array.from(new Set(arr)) 
}

// 展开运算符 + new Set
const unique = function (arr) {
    // new Set 返回的是集合
    return [...new Set(arr)]
}

// Map 
const unique = function (arr) { 
	let map = new Map()
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (map.has(item)) {
            continue;
        }
        map.set(item, true)
        result.push(item)
    }
	return result
}
// PS：map 和 对象的区别在于 map 的 key 可以是任何值

// 双 for 循环
const unique = function (arr) {
     for (let i = 0; i < arr.length; i++) {
        for (let j=i+1; j <arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1)
                j--;
            }
        }
    }
    return arr
}

// indexOf
const unique = function (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (result.indexOf(item) < 0) {
            result.push(item)
        }
    }
    return result
}

// filter 
const unique = function (arr) {
    let res = arr.filter((item, index, array) => {
        return array.indexOf(item) === index;
    });
    return res;
}

// includes
const unique = function (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (!result.includes(item)) {
            result.push(item)
        }
    }
    return result
}

// reduce + includes
const unique = function (arr) {
    const res = arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], [])
    return res;
}
// PS: reduce callback 中的 prev 为上一次调用callback 的结果，cur 为当前值
```

衍生问题：数组对象去重

### 数组对象去重

```javascript
const arr = [
    { id: 1, name: 'John' },
    { id: 1, name: 'elaine' },
    { id: 2, name: 'johnny' },
    { id: 3, name: 'react' },
    { id: 3, name: 'vue' },
    { id: 4, name: 'javascript' },
    { id: 5, name: 'css' },
];
      
// 双循环
const unique = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i].id === arr[j].id) {
                arr.splice(j, 1);
                j--
            }
        }
    }
 	return arr
}


// new Set + JSON.stringyify
const unique = function (arr) {
    // 先把每一项转成字符串，再在数组中通过 Set 去重
    const set = new Set(arr.map(JSON.stringify))
    // Array.from 将 Set 后的对象转换成 Array
    const _arr = Array.from(set).map(JSON.parse)
    return _arr
}


// reduce
const unique = function (arr) {
    const result = arr.reduce((prev, cur) => {
        prev[cur.id] = cur
        return prev
    }, {})
    console.log(result)
    return Object.values(result)
}
// PS: Object.values() 对象转数组

// filter
const unique = function (arr) {
    return arr.filter((item, index, arr) => {
        return arr.findIndex(t => t.id === item.id) === index
    })
}

// Map + for 
const unique = function (arr) {
    let map = new Map;
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (map.has(item.id)) {
            continue;
        }
        map.set(item.id, true)
        result.push(item)
    }
    return result
}
```



## 排序

```javascript
let arr = [57, 68, 59, 52, 72, 28, 96, 33, 24, 19];

// 冒泡排序
function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let flag = false;
        for (let j = 0; j < len-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                flag = true
            }
        }
        if (flag === false) return arr
    }
    return arr
}

// 归并排序
function mergeSort(arr) {
    let len = arr.length;
    if (len <= 1) {
        return arr
    }
    const mid = Math.floor(len / 2)
    const leftArr = mergeSort(arr.slice(0, mid))
    const rightArr = mergeSort(arr.slice(mid, len))
    arr = mergeArr(leftArr, rightArr)
    return arr
}

function mergeArr(arr1, arr2) {
    let i = 0, j = 0;
    const res = []
    const len1 = arr1.length;
    const len2 = arr2.length;
    while (i < len1 && j < len2) {
        if (arr1[i] < arr2[j]) {
            res.push(arr1[i])
            i++
        } else {
            res.push(arr2[j]);
            j++
        }
    }
    if (i < len1) {
        return res.concat(arr1.slice(i))
    } else {
        return res.concat(arr2.slice(j))
    }
}

// 快排
function quickSort(arr, left = 0; right = arr.length - 1) {
    if (arr.length > 1) {
        const lineIndex = partition(arr, left, right) 
        if (left < lineIndex - 1) {
            quickSort(arr, left, lineIndex - 1)
        }
        if (lineIndex < right) {
            quickSort(arr, lineIndex, right)
        }
        return arr
    }
}

function partition(arr, left, right) {
    let pivotValue = arr[Math.floor(left + (right - left) / 2)]
    let i = left
   	let j = right
    while(i <= j) {
        while(arr[i] < pivotValue) {
            i++
        }
        while(arr[j] > pivotValue) {
            j--
        }
        if (i <= j) {
            swap(arr, i, j) 
            i++
            j--
        }
    }
    return i
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

// 插入排序
function insertSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var current = arr[i];
        for (var j = i - 1; j>=0 && arr[j] > current; j--) {
            arr[j+1] = arr[j]
        }
        arr[j+ 1] = current
    }
    return arr
}

// 选择排序
function selectSort(arr) {
    let len = arr.length;
    let minIndex;
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        }
    }
    return arr
}
```



## 数组扁平化

问：编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```javascript

let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// 扁平化
let flatArr = arr.flat(Infinity);
// 去重
let disArr = Array.from(new Set(flatArr));
// 排序
let result = disArr.sort(function (a, b) {
    return a - b;
});
console.log(result);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
// Array.from 将类数组转成数组实例
```

衍生问题：数组扁平化

### 数组扁平化

使用 `Array.prototype.flat` 就可以将多层数组拍平一层

```javascript
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]
```

#### ES5：递归

```javascript
function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
```

#### ES6

```javascript
function flatten(arr) {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```



## 进度条

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>进度条</title>
    <style>
        #progress-bar {
            width: 100%;
            height: 10px;
            background: gainsboro
        }

        #progress-slot {
            transition: all 0.5s;
            background: red;
            height:100%;
        }
    </style>
</head>
<body>
    <div id="progress-bar">
        <div id="progress-slot"></div>
    </div>
    <script>
        let timer = 0;
        function start() {
            const dom = document.getElementById('progress-slot')
            let width = 0;
            timer = setInterval(() => {
                width +=1;
                dom.style.width = width + '%'
                if (width >= 100) {
                    clearInterval(timer)
                }
            }, 150)
        }
        start()
    </script>
</body>
</html>
```


