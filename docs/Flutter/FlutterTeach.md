# Flutter 

## Flutter

#### 什么是Flutter？

谷歌出品的一款开源的跨平台移动UI框架

#### 有哪些人在用

http://flutter.dev/showcase

#### 对比

- Cordova
- RN（React Native）
- Flutter -Dart 120fps 性能高







安装开发环境

https://flutter.cn/docs/get-started/install/windows





### Flutter学习

#### Text Widget

```dart
textAlign:  TextAlign.left
maxLines: 1,
overflow: TextOverflow.ellipsis
style: TextStyle(
	fontSize: 25.0,
    color: Color.fromARRB(255, 255, 125, 125),
    decoration: TextDecoration.underline,
    decorationStyle: TextDecorationStyle.solid,
)
```

#### Container

```dart
child: Container(
	child: new Text('hello, johanbo', style: TextStyle(fontSize: 40.0)),
    alignment: Alignment.center,
    width: 500.0,
    height: 400.0,
    color: Colors.lightBlue,
    padding: const EdgeInsets.fromLTRB(10.0, 100.0, 0.0, 0.0),
    margin: const EdgeInsets.all(10.0),
    decoration: new BoxDecoration(
    	gradient: const LinearGradient(
        	colors: [Colors.lightBlue, Colors.greenAccent, Colors.purple]
        ),
        border: Border.all(width: 5.0, color: Colors.red)
    )
)
```

#### Image

```dart
Image 有四种模式
    asset(...) 项目中引入图片
    file(...) 本地引入图片(本地路径）
    memory(...) 可以理解为内存形式的图片
    network(...) 引入网络图片
```

```dart
new Image.network(	'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1483767998.76.webp',
 fit:BoxFit.contain // 是否填充图片至容器
 color: Color.greenAccent,
 colorBlendMode: BlendMode.modulate // 图片混合模式，也就是滤镜
 repeat: ImageRepeat.repeat // 是否重复
)
```

#### ListView

自上到下排列

```dar
ListView(
	children: <Widget>[
        new ListTile(
        	leading: new Icons.perm_camera_mic,
        	title: new Text('perm_camera_mic')
        ),
         new ListTile(
        	leading: new Icons.add_call,
        	title: new Text('add_call')
        ),
	]
)
```

```dart
ListView(
    children: <Widget>[
        Image.network('http://t.cn/EM5Y4RF'),
        Image.network('http://t.cn/EM5Y4RF'),
        Image.network('http://t.cn/EM5Y4RF'),
        Image.network('http://t.cn/EM5Y4RF'),
    ]
)
```

横向列表

```dart
ListView(
	scrollDirection: Axis.horizontal, // 横向
    children: <Widget>[
        new Container(
        	width: 180.0,
            color: Colors.lightBlue
        ),
        new Container(
        	width: 180.0,
            color: Colors.lightBlue
        ),
        new Container(
        	width: 180.0,
            color: Colors.lightBlue
        )
    ]
)
```

