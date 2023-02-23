# Dart 语法



要学习 Flutter，就必须先学会 dart。这就好比你要先会 JavaScript 才能写 React/Vue。因为 Flutter 是基于 dart 来写的

这里可以看看：

[中文 dart 网站](https://dart.cn/)







可以在 DartPad 上练习

> DartPad 是 Dart 的一个线上 playground



### 程序入口

JavaScript 没有预定义的入口函数，但是在 Dart 中，每个 app 都必须有一个顶级的 `main()` 函数作为应用程序的入口点

```dart
main() {}
```



### 控制台输出

想打印到控制台，使用关键字 `print`：

```dart
print('Hello world')
```

> PS：javascript 是 console.log；python 是 print。语法不同罢了



### 变量

Dart 的变量必须是明确的，像 TS 那样，需要给一个变量加类型

```dart
String name = 'dart';
int number = 1;
```







#### 常量

`final`

`const`

#### 内置类型

- numbers
- strings
- booleans
- lists(和数组一个概念)
- maps 字典
- runes(Unicode字符串)
- symbols 符号

```dart
vord main(){
    String str1 = "str1";
    int num1 = 1;
    double double1 = 10.2;
    bool flag1 = false;
    lists list1 = [1, 3, 5, 7, 9];
    maps map1 = {"name": "hello", "age": 12};
}
```

#### 方法（函数）

```dart
bool isEvenNumber(int num) {
    return num % 2 === 0;
}
void main() {
    print(isEvenNumber(11))
}
```

#### 可选参数

```dart
void printStr1([String name, int age]) {
    print("Name is $name age is $age")
}
```

如果形参不写，那个值就会被赋为null

#### 可选择名称的函数（具名函数）

```dart
void printStr3({String name, int age}) {
    print3("Name is $name age is $age")
}
```

```dart
void printStr3({String name, String sex, String address}) {
    print("Name is $name sex is $sex address is $address")
}
```

printStr3(sex: "男")

输出：

```shell
Name is null sex is 男 address is null
```

#### 函数参数的默认值

##### 可选参数

```dart
void printStr1([String name, int age=25]) {
    print("Name is $name age is $age")
}
printStr1("男")
输出：
Name is 男 age is 25
```

##### 具名函数

```dart
void printStr3({String name, int age=25}) {
    print3("Name is $name age is $age");
}
printStr3("男")；
输出：
Name is 男 age is 25
```




