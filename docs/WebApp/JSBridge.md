# JSBridge

### 一句话解释

Native 与 H5 交互，就需要一些方法，而这些解决方案就叫 JSBridge

### JSBridge 的实现技术

#### JS 调用原生层

JS 调用 Native 的实现方式较多，主要有拦截 `url schema` 、重写 prompt、注入 API 等方式

共三种方法

-   拦截 Url Schema（假请求）

    -   native 会拦截 H5 发出的请求，当检测到协议为 jsbridge（自定义的协议） 而非普通的 http/https/file 等协议时，会拦截该请求，解析出 URL 中的 methodName、arg、cbName，执行该方法并调用 js 回调函数

    -   缺点：连续发送时消息丢失，如下代码

        ```javascript
        window.location.href = "jsbridge://callNativeNslog?{"data": "111", "cbName": ""}";
        window.location.href = "jsbridge://callNativeNslog?{"data": "222", "cbName": ""}";
        ```

-   拦截 prompt alrt confirm

-   注入 JS 上下文

#### 原生层调用 JS

Native 调用 JS 比较简单，只要 H5 将 JS 方法暴露在 Window 上给 Native 调用即可

-   Android 通过 WebView 的 loadUrl 或 evaluateJavaScript 方法

    -   loadUrl

        ```java
        mWebview.loadUrl("javascript: func()");
        // 优点：1.兼容性好
        // 缺点：1.会刷新页面 2.无法获取 js 方法执行结果
        ```

    -   evaluateJavaScript

        ```java
        mWebview.evaluateJavascript("javascript: func()", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String value) {
                return;
            }
        });
        // 优点：1.性能好 2.可获取 js 执行后的返回值
        // 缺点：1.仅在安卓 4.4 以上可用
        ```

-   iOS 通过 UIWebView 的 stringByEvaluatingJavaScriptFromString 或 WKWebview 的 evaluateJavaScript 方法

### JSBridge 的使用

#### 如何引用？

一、由 H5 引用

采用本地引用 npm 包的方式进行调用。这种方式可以确定 JSBridge 是存在的，可直接调用 Native 方法，但是如果后期 Bridge 的实现方式改变，双方需要做更多的兼容，维护成本高

二、由 Native 注入

在 Native 中注入方法来引用 JSBridge。这样有利于保持 API 与 Native 的一致性，但是缺点是在 Native 注入的方法和时机都受限， JS 调用 Native 之前需要先判断 JSBridge 是否注入成功

#### 使用规范

H5 调用 Native 方法的伪代码实例，如：

```javascript
params = {
    api_version: 'xxx', // API 版本
    title: 'xxx', // 标题
    filename: 'xxx', // 文件名称
    image: 'xxx', // 图片链接
    url: 'xxx', // 网址链接
    success: function (res) {
        xxx; // 调用成功后执行
    },
    fail: function (err) {
        if (err.code == '-2') {
            fail && fail(err); //	调用了当前客户端中不存在的 API 版本
        } else {
            const msg = err.msg; //异常信息
            Toast.fail(msg);
        }
    },
};
window.NativeApi.share(params);
```

以下简要列出通用方法的抽象，目标基本遵循以下规范进行双端通信

```javascript
window.NativeApi.xxx({
    api_version: '',
    name: 'xxx',
    path: 'xxx',
    id: 'xxx',
    success: function (res) {
        console.log(res);
    },
    fail: function (err) {
        console.log(err);
    },
});
```

由于初期版本选择了由 H5 本地引用 JSBridge，后期采用 Native 注入的方式。现有的 H5 需要对各种情况做兼容，逻辑抽象如下：

```javascript
reqNativeBridge(vm, fn) {
  if (!isApp()) {
    // 如果不在 APP 内进行调用
    vm.$dialog.alert({
      message: "此功能需要访问 APP 才能使用",
    });
  } else {
    if (!window.NativeApi) {
      // 针对初期版本
      vm.$dialog.alert({
        message: "请更新到最新 APP 使用该功能",
      });
    } else {
      // 此处只针对“调用了当前客户端中不存在的 API 版本”的报错进行处理
      // 其余种类的错误信息交由具体的业务去处理
      fn && fn((err) => {
        vm.$dialog.alert({
          message: "请更新到最新 APP 使用该功能",
        });
      });
    }
  }
}
```

### 总结

JSBridge 就字如其意，它是 Native 和 H5 交互的一种手段，可以在 Native 端做 Bridge（注入方法供 H5 调用），也可以在 H5 端做 Bridge（1.请求 schema，App 会拦截约定的 schema；2. 重写 prompt；3.全局注入 API，但是这个方法安全性较差）

### 参考资料

-   [JSBridge 实现原理](https://github.com/mcuking/JSBridge)

-   [WebView 与 APP 交互实战记录](https://segmentfault.com/a/1190000018208609)

-   [小白必看，JSBridge](https://mp.weixin.qq.com/s?__biz=Mzg3NTcwMTUzNA==&mid=2247486243&idx=1&sn=09ef07381ca8ce3f9d58dfd2b29c3b77&source=41#wechat_redirect)
