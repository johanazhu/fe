## Dart

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

```dar
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

```shel
Name is null sex is 男 address is null
```

#### 函数参数的默认值

##### 可选参数

```dar
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

































