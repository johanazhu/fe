# Widget

### Text

```dart
const Text( this.data，// 内容
{			Key key,
			this.style//样式
			this.textAlign//对齐方式,
			this.textDirection//文本方向,
			this.softWrap//是否换行显示,
			this.overflow//超出文本的处理方式,
			this.textScaleFactor//每个逻辑像素的字体像素数，控制字体大小,
			this.maxLines//最大行数,
})
```

-   key //
-   style //样式
-   textAlign // 对齐方式
-   textDirection // 文本方向
-   softWrap // 是否换行显示
-   overflow // 超出文本的处理方式
-   textScaleFactor // 每个逻辑像素的字体像素数，控制字体大小
-   maxLines // 最大行数

### TextStyle

-   inherit // true
-   color // 颜色
-   fontFamily // 字体
-   fontSize // 大小，默认 10 像素
-   fontWeight // 字重
-   fontStyle // 字体样式
-   letterSpacing // 字间距
-   wordSpaceing // 字符间距
-   textBaseline // 基线
-   height // 高度
-   decoration // 装饰
-   decorationColor // 装饰颜色
-   decorationStyle // 装饰样式
-   debugLabel
-

```dart
body: Text("夜晚走在喧闹的小街上，反而心能更加的平静，"
        "或许这就是物极必反的缘故吧，"
        "总喜欢在最吵闹的地方去寻找那一份属于自己的宁静，"
        "可以不思考所有的困扰，也可以闭着眼睛静听来自远方的人间天堂的呼唤，"
        "然后在忽明忽暗的灯光下丢弃心中的包袱，和一脸的苦闷，"
        "再走到起点时，又翻去了一页，也尘封了以往。",
        style: new TextStyle(
          fontStyle: FontStyle.italic,
          fontWeight: FontWeight.bold,
          decoration: TextDecoration.underline,
          decorationColor: Colors.red,
          letterSpacing: 8.0
        ),
 )
```

### Icon

```dart
const Icon(this.icon, //IconDate
{
    	   Key key
           this.size // 大小
           this.color // 颜色
           this.semanticLabel //标志位
           this.textDirection // 绘制方向，一般使用不到
})
```

### Container

```dart
Container({
    	Key key
        this.alignment, // 内部widget对齐方式
    	this.padding,	// 内边距
    	Color color, 	// 背景颜色，与decoration只能存在一个
    	Decoration decoration // 背景装饰，与color只能存在一个
        this.foregroundDecoration  // 前景装饰
        double width,	// 容器的宽
    	double height 	// 容器的高
        BoxConstraints constraints
        this.margin,
 		this.transform,
    	this.child
})
```
