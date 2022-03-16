# 微信网页开发之 JS-SDK

为什么要做这个？

因为需要。

在微信中分享链接，如果你想分享出来的是有缩略图和描述的，都必须要接入微信的 JS-SDK

笔者在入行第一家公司是广告公司，老板为了做此效果，费了很大劲（朋友圈请各路朋友帮忙），所以这一功能在笔者对此印象很深刻

我们这里用倒推法来推演

## 倒推步骤

我要做微信分享，即要看[文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3)，文档写了，一共四步

1. 绑定域名
2. 引入 JS 文件

3. 通过 config 接口注入权限验证配置（接口签名）

4. 通过 ready 接口处理成功验证（通过 error 接口处理失败验证）

### 第一步：绑定域名

很简单，在开发者工具中填入”JS 安全域名“。如果我们用的是测试号，可填 ip 地址，这里需要注意的是：

**域名不要加协议名和端口号**

![测试号](https://i.loli.net/2021/09/27/sId5AyF81o6WzUt.png)

### 第二步：引入 JS 文件

你可以直接引入 JS 文件，也可以引入 npm 包，一般我们开发 H5 应用，会采用 npm 包，现在都用 1.6.0 版本，问题不大

引入 `http://res.wx.qq.com/open/js/jweixin-1.6.0.js` 或者

```shell
npm i weixin-js-sdk
```

### 第三步：通过 config 接口注入权限验证配置

最重要的一步，前两步都是配置，第三步相当于请求接口，接口返回数据，你填上这些数据。第四步是验证你填的数据是否正确

```javascript
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
```

### 第三步往前推：获取 jsapi_ticket

我们需要做个接口，供 H5 调用，调用后让其获取到 appId、timestamp、nonceStr、signature

signature（签名） 是通过 noncestr、jsapi_ticket、timestamp、url 生成的。这里 noncestr、timestamp、url 都好获取，唯独这个 jsapi_ticket （票据），怎么拿到手，通过 access_token 获取

![获取jsapi_ticket](https://i.loli.net/2021/09/27/qtRglMxv4BT5rwc.png)

### 第三步再往前推推：获取 access_token

access_token 是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用 access_token。这里需要注意的是无论是我们的微信服务端开发（开发自定菜单、订阅通知等功能、素材管理等功能，可看这篇文章：[微信服务端开发](./微信服务端开发.md)）还是 JS-SDK 调用，都需要用到 access_token，按照微信的官方文档，希望开发者能做一个中控服务，定时刷新 access_token

> 建议公众号开发者使用中控服务器统一获取和刷新 access_token，其他业务逻辑服务器所使用的 access_token 均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致 access_token 覆盖而影响业务；

考虑到 jsapi_ticket 也需要缓存、所以我的理解是我们的架构中微信中控服务中需要包含两个缓存的数据：access_token 和 jsapi_ticket。

### 第三步的关键一步：签名算法

我们拿到 access_token 和 jsapi_ticket，并缓存住后，要通过一定的签名生成规则来生成 signature

具体文档上都有写：[签名算法](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62) ，这里不做详细介绍

大致流程是用户请求接口，服务器端返回 appId、timestamp、nonceStr、signature，用户拿到数据后，填入 config

### 第四步：通过 ready、error 接口验证

```javascript
wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
```

这里不做过多说明

### 总结

我们要做微信开发，无论做不做公众号服务端的开发，都需要 access_token，所以要有个中控服务，它的功能点之一是负责每 2 小时定时刷新 access_token。我们要做微信网页开发，就需要缓存 jsapi_ticket（它也有 7200 秒的限制），所以我们的中控服务需要缓存两个数据：access_token（凭据） 和 jsapi_ticket（票据），将其缓存在 redis 中

我们要开发微信网页分享功能，其中需要拿到 jsapi_ticket，并通过签名规则生成 signature，并提供一个 api 接口，用户进入页面后，请求此 api，服务器返回 appId、timestamp、nonceStr、signature 等参数，用户将其放入 config 中，并验证其是否运行

## 实战环节

### web 端

封装为方法

```javascript
import wxsdk from "weixin-js-sdk";
import { fetchSignature } from "@/services";

const initShareConfig = (detailInfo, configInfo) => {
    wxsdk.config({
        debug: false,
        appId: configInfo.appId, // 必填，公众号的唯一标识
        timestamp: configInfo.timestamp, // 必填，生成签名的时间戳
        nonceStr: configInfo.nonceStr, // 必填，生成签名的随机串
        signature: configInfo.signature, // 必填，签名
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表
    });
    wxsdk.ready(() => {
        // “分享给朋友”及“分享到QQ”按钮的分享内容
        wxsdk.updateAppMessageShareData({
            title: detailInfo.name, // 分享标题
            desc: detailInfo.desc, // 分享描述
            link: detailInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: detailInfo.imgUrl, // 分享图标
            success: function () {
                // 设置成功
            },
        });
        // “分享到朋友圈”及“分享到QQ空间”
        wxsdk.updateTimelineShareData({
            title: detailInfo.name, // 分享标题
            link: detailInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: detailInfo.imgUrl, // 分享图标
            success: function () {
                // 设置成功
            },
        });
    });
};

const initWxShare = async ({
    name = "长泽雅美",
    desc = "长泽雅美至上主义者",
    img = wxLogo,
    link = "",
}) => {
    const params = {
        url: encodeURIComponent(window.location.href.split("#")[0]),
    };
    let configInfo = await fetchSignature(params);
    const { href: realUrl } = window.location;

    let shareUrl = realUrl;

    const detailData = {
        name,
        desc,
        link: link || shareUrl,
        imgUrl: img,
    };
    if (configInfo) {
        initShareConfig(detailData, configInfo);
    }
};

export default initWxShare;
```

页面使用

```javascript
// 仅做演示
import initWxShare from "@/utils/wechat";
useEffect(() => {
    initWxShare({
        name: "好友向您推荐了长泽雅美写真集",
        desc: "长泽雅美新电影《行骗天下·英雄片》",
        img: "给个图",
        link: "这里根据需求写当前连接或者要跳转的链接",
    });
}, []);
```

### 服务器端

我们需要提供一个接口供 web 端调用，简单来说

```javascript
// 这里仅提供主要代码
router.get("/jsapi", async (ctx) => {
    const { url } = ctx.request.query;
    const config = await sign(decodeURIComponent(url));
    ctx.body = config;
});
async function sign(url) {
    const ticket = await redis.get(process.env.WX_TICKET || "wx_ticket");
    if (ticket) {
        const obj = {
            nonceStr: createNonceStr(),
            timestamp: createTimestamp(),
            jsapi_ticket: ticket,
            url,
        };
        let newString = raw(obj);
        let signature = sha1(newString);
        obj.signature = signature;
        obj.appId = APPID;
        return obj;
    } else {
        throw "ticket获取失败";
    }
}

const createNonceStr = () => {
    return Math.random().toString(36).substr(2, 15);
};

const createTimestamp = () => {
    return parseInt(new Date().getTime() / 1000) + "";
};
// 签名规则
const raw = (obj) => {
    let keys = Object.keys(obj);
    keys = keys.sort();
    let newObj = {};
    keys.forEach((key) => {
        newObj[key.toLowerCase()] = obj[key];
    });
    let string = "";
    for (let k in newObj) {
        string += "&" + k + "=" + newObj[k];
    }
    string = string.substr(1);
    return string;
};
```

一看很简单，在 [文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3) 最后微信还提供示例代码，可以说很贴心了

## 额外说明

网页授权 access_token 和普通 access_token：

![image-20201221123635929](https://i.loli.net/2021/06/03/PQCgKNv7zFHOdDT.png)
