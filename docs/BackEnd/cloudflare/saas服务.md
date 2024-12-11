# ai红包saas服务





ai红包saas服务

nextjs + paddle 的 saas 服务

paddle 的支付思路





价格列表，点击去checkout页面唤起 paddle.Checkout.open(...)，传入用户 email 以及商品详情

前端发起请求 ——> 跳转到paddle 的支付页面，支付完成后，它会发送一个回调地址到你的 api/webhook 上，此时你就要对数据进行存储，订阅用户的更新

同时，也会跳转到你的之前在支付页上定义的支付成功页面







开源例子：

https://github.com/weijunext/smart-excel-ai：比较复杂，不仅有会员体系还有加油包功能，还多了 redis 减少对数据库的读写