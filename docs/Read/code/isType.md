# isType

```javascript
function isType(type) {
  return function (obj) {
    return {}.toString.call(obj) == '[object ' + type + ']';
  };
}
var isFunction = isType('Function');
```







```javascript
function isType(source) {
    const target = Object.prototype.toString.call(source);
    switch (target) {
        case "[object Null]":
            return "null";
        case "[object Undefined]":
            return "undefined";
        case "[object String]":
            return "string";
        case "[object Number]":
            return "number";
        case "[object Boolean]":
            return "boolean";
        case "[object Object]":
            return "object";
        case "[object Array]":
            return "array";
        case "[object Function]":
            return "function";
        case "[object Date]":
            return "date";
        case "[object RegExp]":
            return "regexp";
        case "[object Error]":
            return "error";
    }
}

function getType(target) {
    return Object.prototype.toString.call(target);
}
```

```javascript
function typeOf(obj) {
    let res = Object.prototype.toString.call(obj).split(" ")[1];
    res = res.substring(0, res.length - 1).toLowerCase();
    return res;
}
typeOf([]); // array
typeOf({}); // object
typeOf(new Date()); // date
```

