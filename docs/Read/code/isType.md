# isType



```javascript
function isType(type) {
    return function (obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
    }
}
var isFunction = isType("Function")
```

