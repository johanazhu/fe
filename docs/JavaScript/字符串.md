# 字符串

## 概要

String()构造函数用于创建字符串对象和字符串原始值

## 属性和方法

字符串对象具有以下属性和方法（不包括继承的属性和方法）

### **属性**

-   prototype

### **方法**

-   froCharCode()

## 实例属性和方法

### **实例属性**

-   constructor
-   length

### **实例方法**

-   slice()

    -   `slice()` 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串

    -   ```javascript
        const str = 'The quick brown fox jumps over the lazy dog.';

        console.log(str.slice(31)); // the lazy dog.

        console.log(str.slice(4, 19)); // quick brown fox
        ```

-   substr()

    -   `substr()` 方法返回一个字符串中从指定位置开始到指定字符串的字符

    -   ```javascript
        const str = 'abcdefghig';

        console.log('(1,2): ' + str.substr(1, 2)); // (1,2): bc
        console.log('(1): ' + str.substr(1));
        ```

        PS: 未来可能会被移除掉，如果可以的花，使用 `substring()` 代替它

-   substring()

    -   `substring()` 方法返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引知道字符串的末尾的一个子集

    -   ```javascript
        const str = (anyString = 'Mozilla');

        console.log(anyString.substring(0, 3)); // Moz
        console.log(anyString.substring(3, 0)); // Moz
        ```

-   concat()

    -   `concat()` 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回

    -   ```javascript
        const hello = 'Hello, ';
        console.log(hello.concat('Kevin', ' have a nice day')); // Hello, Kevin have a nice day
        ```

-   indexOf()

    -   `indexOf` 方法返回调用它的 `String` 对象中第一次出现的指定值的索引，从 `fromIndex` 处进行搜索。如果未找到该值，则返回 -1 。

    -   ```javascript
        const question = 'How Are You';
        console.log(question.indexOf('A')); // 4
        console.log(question.indexOf('B')); // -1
        ```

-   replace()

    -   `replace()` 方法返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。模式可以使一个字符串或者一个正则表达式，替换值可以使一个字符串或者一个每次匹配都要调用的回调函数。

    -   原字符串不会改变

    -   ```javascript
        const str = 'OK, I am fine';
        const newStr = str.replace(/I/i, 'Johan');
        console.log(newStr); //  "OK, Johan am fine"
        ```

-   toString()

    -   `toString()` 方法返回指定对象的字符串形式

    -   ```javascript
        const x = new String('Hello World');
        console.log(x.toString); // Hello World
        ```

-   valueOf()

    -   `valueOf()` 方法返回 `String` 对象的原始值

    -   ```javascript
        const stringObj = new String('foo');
        console.log(stringObj); // String { 'foo' }
        console.log(stringObj.valueOf()); // foo
        ```

-   charAt()

    -   `charAt()` 方法从一个字符串中返回指定的字符

    -   ```javascript
        var anyString = 'Brave new world';

        console.log(
            "The character at index 0   is '" + anyString.charAt(0) + "'",
        );
        //The character at index 0 is 'B'
        ```

-   charCodeAt()

-   lastIndexOf()

-   localeCompare()

-   match()

-   quote()

-   search()

-   toLocaleLowerCase()

-   toLocaleUpperCase()

-   toLowerCase()

-   toUpperCase()
