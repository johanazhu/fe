# 快速入门 Flutter 开发

Dart 基础知识

什么是声明式 UI

Flutter 入门基础知识

认识视图（Views）

布局与列表

状态管理

路由与导航

线程和异步 UI

手势检测及触摸事件处理

## Dart 基础知识

### 程序入口

JavaScript 没有预定义的入口函数，但在 Dart 中，每个 app 都必须有一个顶级的 `main()` 函数作为应用程序的入口

```dart
main()
```

### 控制台输出

要在 Dart 中打印到控制台，可使用 `print`：

```dart
// JavaScript
console.log('Hello World')
// Dart
print('Hello World')
```

### 变量

Dart 是类型安全的-它使用静态类型检查和运行时的组合，可使用类型，也可以不使用类型

```dart
int a = 123; // a 的类型为整数
var b = 124; // b 的类型没设置，在运行时引擎自己推断类型
```

### 创建和分配变量

在 JavaScript 中，无法定义变量类型

在 Dart 中，变量必须是明确的类型或系统能够解析的类型

```dart
// JavaScript
var name = "JavaScript"
// Dart
String name = 'dart' // 明确 String 类型
var otherName = 'Dart' // 推断 String 类型
// 在 Dart 中两种都可以接受
```

### 默认值

在 JavaScript 中，未初始化的变量是 `undefined`

在 Dart 中，未初始化的变量的初始值为 `null`

> PS：Number 在 Dart 中也被视为对象，所以只要是带有数字类型的初始化变量的值都是“null”

```dart
// JavaScript
var name; // undefined
// Dart
var name; // null
int x; // null
```

### 检查 null 或零

在 JavaScript 中，1 或任何非 null 对象的值都被视为 true

```javascript
// JavaScript
var myNull = null;
if (!myNull) {
    console.log("null为false");
}
var zero = 0;
if (!zero) {
    console.log("0是false");
}
```

在 Dart 中，只有布尔值“true”被视为 true

```dart
// Dart
var myNull = null;
if (myNull == null) {
    print("myNull的值就是null")
}
var zero = 0
if(zero == 0) {
    print("zero的值就是0")
}
```

### Dart null 检查最佳实践

null-aware 运算符

-   `?.` 运算符在左边为 null 的情况下会阻断右边的调用
-   `??` 运算符主要作用是在左侧表达式为 null 时为其设置默认值

### Functions（函数）

Dart 和 JavaScript 函数类似，主要区别是声明：

```dart
// ES5
function fn() {
    return true;
}
// Dart
fn() {
    return true;
}
// 也可以这样写，设置返回结果
bool fn() {
    return true
}
```

### 异步编程

与 JavaScript 一样， Dart 支持单线程执行。在 JavaScript 中，Promise 对象表示异步操作的最终完成（失败）及其结果值，Dart 使用 `Future` 来表示异步操作

### async 和 await

async 函数声明定义了一个异步函数

在 JavaScript 中，async 函数返回一个 Promise。await 运算符是用来等待 Promise：

```javascript
// JavaScript
async _getIPAddress() {
    const url = "http://httpbin.org/ip";
    const response = await fetch(url)
}
```

在 Dart 中， async 函数返回一个 Future，函数的主体是稍后执行。await 运算符用于等待 Future：

```dart
// Dart
_getIPAddress() async {
    final url = "http://httpbin.org/ip";
    var request = await HttpRequest.request(url)
    ...
}
```

## 什么是声明式 UI

什么是声明式 UI

像 React 那样

## Flutter 入门基础知识

### 如何创建 Flutter 项目

-   命令行

    -   ```shell
        flutter create <projectname>
        ```

-   使用安装了 Flutter 和 Dart 插件的 IDE

### 如何运行 Flutter 项目

-   命令行

    -   ```shell
        flutter run -d 'iPhone X'
        ```

    -   -d 后面跟的是具体的设备名称

-   在 IDE 中使用“run”选项

### 如何导入 Widget？

Widget 可以理解为组件，三部分 Widget，系统默认主题（安卓风和 iOS 风）、基础组件 widget、自定义 widget

在 Flutter 中，有两种 UI 库

-   Material Design 样式，导入 `material.dart` 包
-   iOS 样式，导入 `Cupertino` 库

```dart
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/my_widgets.dart'; // 自定义 widget
```

## 认识视图（Views）

Widget 就像 React 中的 组件概念

有状态 Widget —— 有状态组件

无状态 Widget —— 无状态组件

## 布局与列表

一切皆为 Widget，布局与列表有相应的 Widget

Row：水平方向的布局

Column：垂直方向的布局

Stack Widget：分层 ，类似于 CSS 中的 position ，坐 Z 轴方向的布局

没有样式，样式也是 widget 组成

Padding 、Center、TextStyle 都是 widget

ListView：滚动组件，适用于列表滚动

-   如何更新 widget 列表，setState()

-   ListView.Builder 构建动态列表或者拥有大量数据时使用

## 状态管理

StatelessWidget：无状态组件，只做渲染，不对状态进行处理

-   例如 AboutDialog、Text、CircleAvator 等

StatefulWiget：有状态组件，通过 setState 更新状态，状态更新后，视图会重新渲染

-   例如 Checkbox、Radio、Slider、Form 等

## 路由与导航

有两个主要的 widget 用于页面之间导航：

-   Route 是一个应用程序抽象的屏幕或页面
-   Navigator 是一个管理路由的 widget

## 线城和异步 UI

async/await

Isolate 是分离的运行线程

如何进行网络请求：http package 请求插件

## 手势检测及触摸事件处理

两种方法来添加点击监听

1. 如果 widget 本身支持事件检测，直接传递给它一个函数，并在这个函数里实现响应方法。例如 RaisedButton widget 拥有一个 onPressed 参数

2. 如果 widget 本身不支持事件监测，则在外面包裹一个 GestureDetector，并给它的 onTap 属性传递一个函数

### 如何处理 widget 上的其他手势

使用 GestureDetector，可以监听多种手势，例如

-   点击
    -   onTapDown：在特定位置轻触手势接触了屏幕
    -   onTapUp：在特定位置产生了一个轻触手势，并停止接触屏幕
    -   onTap：产生了一个轻触手势
    -   onTapCancel：触发了 onTapDown 但没能触发 tap
-   双击
    -   onDoubleTap：用户在同一个位置快速点击了两下屏幕
-   长按
    -   onLongPress：用户在同一个位置长时间接触屏幕
-   垂直拖动
    -   onVerticalDragStart：接触了屏幕，并且可能会垂直移动
    -   onVerticalDragUpdate：接触了屏幕，并继续在垂直方向移动
    -   onVerticalDragEnd：之前接触了屏幕并垂直移动，并在停止接触屏幕前以某个垂直的速度移动
-   水平拖动
    -   onHorizontalDragStart：接触了屏幕，并且可能会水平移动
    -   onHorizontalDragUpdate：接触了屏幕，并继续在水平方向移动
    -   onHorizontalDragEnd：之前接触了屏幕并水平移动的触摸点与屏幕分离
