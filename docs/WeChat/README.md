## 介绍

此库名为：微信 openid 调用以及微信分享功能 服务，英文名：jingqb-web-wxsdk，简称 wxwebsdk



## 作用

此库有两个作用，

一、微信网页授权，获取 `openid`

二、供web端页面调用微信分享



## 微信授权

### 授权流程：

先请求 `/auth` ，获取 code ，拿到此 code 请求 `/getUserInfo`，获取授权信息

### 第一步：

需先调用 `/auth` 接口，传入必传参数 `url` 以及 `scope`（此为参数名）

请求方式：GET

- url 为回调地址


- scope 有两个可选参数
  - snsapi_base 只能获取进入页面用户的 openid，用户无感知
  - snsapi_userinfo 能获取用户的基本信息，但需要用户接受，如下图

![1599707513545](https://i.loli.net/2021/05/21/gKzl6PTUmQYos4L.png)

具体区别可前往 [微信文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html) 查看

### 第二步：

获取到微信的 code 后，再请求 `/getUserInfo`

请求方式： GET

请求参数：code，需请求 `/auth` 获取到 `code` 先，如果你在请求 `/auth` 时传入的 `scope` 为 `snsapi_userinfo` , 那么返回微信个人信息，包括微信名，性别，所在地区，国籍，头像等等，如下

```javascript
{   
  "openid":" OPENID",
  "nickname": NICKNAME,
  "sex":"1",
  "province":"PROVINCE",
  "city":"CITY",
  "country":"COUNTRY",
  "headimgurl":"https://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
  "privilege":[ "PRIVILEGE1" "PRIVILEGE2"     ],
  "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
}
```

但如果 `scope` 为 `snsapi_base ` ，请求成功时只返回用户的 `openid`

PS: 请求 `/getUserInfo` 成功时会返回 `access_token`，但此 `access_token`  和 微信票据服务中的 `access_token` 不同，一个是微信与服务器打交道（微信票据服务），另一个是微信与网页的 oauth2 服务



### DEMO

先调用 `/auth` 接口，传入参数 url 和 scope

请求接口：`http://192.168.230.209/auth?url=http://192.168.230.209/home&scope=snsapi_userinfo`

请求成功，跳转到微信授权页面，

![1599707513545](https://i.loli.net/2021/05/21/gKzl6PTUmQYos4L.png)

点击”同意“会跳转至页面

http://192.168.230.209/home?code=081UcAFa1s1OAz0o7wGa1wb8vG1UcAFX&state=123

再在此页面拿到相应的 code，储存起来

再需要请求用户信息时，请求接口：

`http://192.168.230.209/getUserInfo?code=081UcAFa1s1OAz0o7wGa1wb8vG1UcAFX&state=123`

接受到所需 openid 或者 用户信息



## 微信分享 SDK

### 介绍

封装微信网页开发 sdk，方便前端同事使用微信的JSSDK

### 作用

供微信网页开发提供 **分享朋友圈**，**分享给朋友** 等功能的签名服务

请求地址：/jsapi

请求方式： GET

请求参数：url

-    当前网页的 URL，不包含#及其后面部分，为签名做服务

因为在同一域名下，直接调用 /jsapi 即可调用服务



### DEMO

web端调用

```javascript
import wx from 'weixin-js-sdk'; // 版本1.6
import { fetchSignature } from '@/services';

export const setWx = async () => {
    const params = {
        url: window.location.href.split('#')[0],
    };
    let res = await fetchSignature(params);
    let { timestamp, nonceStr, appId, signature } = res;
    wx.config({
        debug: true, // 开启调试模式,
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填，需要使用的JS接口列表
    });
    wx.ready(() => {
        wx.onMenuShareTimeline({
            title: '测试分享', // 分享标题
            link: window.location.href, // 分享链接，
            imgUrl: 'XXX', // 分享图标
            success: function () {
                // 用户点击了分享后执行的回调函数
            },
        });
        wx.onMenuShareAppMessage({
            title: '测试分享', // 分享标题
            desc: '一个测试的分享!!!', // 分享描述
            link: window.location.href, // 分享链接，
            imgUrl: 'XXX', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
            },
        });
    });
};

```





### 常见问题

Q：40048,invalid url domain

https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#66

附录5

![image-20210630135627631](https://i.loli.net/2021/06/30/lrAxdMK1Ic48smh.png)

用测试号调试，有几点要注意：

1. 本地调式时，自己需要弄个测试号，要注意ip一致化，本地需要开启wxCentralControl，以及wxsdk服务，其中的appid和appsecret写成自己的测试号
2. 本地调用服务器上的wxsdk是调不通的
3. JS接口安全域名、授权回调页面域名需要一致，才能调通
   1. 为什么，JS接口安全域名是服务于JSSDK，JSSDK中有分享、发朋友圈等功能，它和你的域名一致才能成功
   2. 授权回调域名，主要是通过Oauth2.0来实现，就是你一个网页要获取我App（微信）的资料，有两种模式，一是snsapi_base，用户无感知，二是snsapi_userinfo ，如上面写的授权的图

**总而言之，如果你要调通，必须三者一致**
