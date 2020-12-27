# 微信网页授权以及JSSDK



首先，我们必须知道一个东西，access_token 。



中控服务需要

网页授权的 access_token 和中控服务的 access_token 是两码事，网页授权的 access_token 是通过 oAuth2 来实现的授权，前后端去调都可以调通，但是中控服务中的 access_token 是...



- 网页授权access_token和普通access_token

![image-20201221123635929](C:\Users\hanbo\AppData\Roaming\Typora\typora-user-images\image-20201221123635929.png)





OAuth2.0网页授权

授权回调页面域名：本地路径



### 微信授权流程

- 用户同意授权，获取code

- 通过code换取网页授权access_token

- 拉取用户信息（需scope为 snsapi——userinfo）



### JSSDK调用流程

- 绑定域名

- 引入JS文件

- 通过config接口注入权限验证配置（接口签名）

- 通过ready接口处理成功验证





网页授权域名，让用户同意授权 

同意授权









