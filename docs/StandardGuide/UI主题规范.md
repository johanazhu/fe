### 标准蓝

------

#### 基础标准色	![1591926539345](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591926539345.png)

  产品主色调，品牌色，标签背景色，详情页标准字

#### 基本文字色	  

####  ![1591926915959](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591926915959.png)

用于一级文字标题，如页面标题	应用名称	应用集名称

#### ![1591927017531](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591927017531.png)

用于二级文字标题，如消息文字等

#### ![1591927081244](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591927081244.png)

用于三级文字标题

#### ![1591927186808](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591927186808.png)

用于次要文字标题

### 全局标准色

#### ![1591927254453](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591927254453.png)

列表分割线颜色

#### ![1591927289470](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591927289470.png)

页面背景色



### 页面边距





主题颜色

用https://www.zhangxinxu.com/wordpress/2019/02/link-rel-alternate-website-skin/

link rel = alternate 的方法来



最好是把所有主题给做出来，但是最后的css以

```css
<link href="green.css" rel="alternate stylesheet" type="text/css" title="绿色">
```

的形式导入

因为这些文件基本上不会大改动，所以在兼容性，性能上，还有代码可维护上都是可以的



切换的时候用

localStorage.get()的方法获取到css

https://uglyduck.ca/quick-dirty-theme-switcher/





方案一：

写多套css一起打包，切换的时候（用js）改变css，浪费宽带，因为一开始会加载很多css



