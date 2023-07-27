# 试探 Go



## 安装 Go

详情可参考[官网文档](https://golang.org/doc/install)下载，也可以在[菜鸟教程](https://www.runoob.com/go/go-environment.html)中按照步骤操作

![go download](https://s2.loli.net/2023/07/23/vRij54Sm2NT6wOq.png)

笔者电脑是 Windows 系统，所以这里直接下载 Windows 版本

```bash
# 安装完成后 查看版本
go version # go version go1.20.6 windows/amd64
go env # 查看环境变量
go env GOPATH # 查看某个环境变量的值
```

默认的 GOPATH 是在 C 盘中，我们需要编辑环境变量修改我们刚刚下载 Go 语言的安装目录

如此，Goland 就安装完了

## 编辑器

笔者使用的编辑器是 Visual Studio Code，这里以 VS Code 为例说明

当新建 go 后缀文件时，会提示下载 go 插件，下载之，而后它还会提示（笔者是新建go文件时报错）

![image-20230723145757666](https://s2.loli.net/2023/07/23/NSXM53U6FyZnCsB.png)

其原因是[国内防火墙对外网有IP设置](https://github.com/microsoft/vscode-go/issues/3129)，导致下载 Go tools 失败

所以设置一下代理即可：

```bash
go env -w GOPROXY=https://proxy.golang.com.cn,direct
```

这里需要说明一下，不少教程里描述了

```bash
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.io,direct
```

但代理地址[GOPROXY.IO](https://goproxy.io/zh/) 上已经有所说明，设置的代理地址应该为 `https://proxy.golang.com.cn,direct`，所以改之即可

至于 GO111MODULE 是因为自 Go1.11 版本之后，有了模块概念，GO111MODULE=on，即为启动模块支持。笔者没有设置GO111MODULE，也能安装 Go tools，所以笔者没有设置

当设置为 GOPROXY 后，重新打开 VS Code，但右下角再次出现下载提示时，我们 「Install All」，结果就能全部安装

![image-20230723152553918](https://s2.loli.net/2023/07/23/EGutK5Z2r6p7lCn.png)



## 牛刀小试

此时，我们已经安装完 Goland 以及在 VS Code 中安装 Go 插件，直接动手写一行代码，看看能不能执行。新建一个`main.go` 文件，写入以下代码

```go
package main

import "fmt"

func main() {
   fmt.Println("Hello, World!")
}
```

打开终端，执行

```bash
go run main.go # Hello, World!
```





package ：在代码最开始写（非注释的第一行写），定义这个文件的名字

类似于前端中的 `export default xx` 

import：引入库

前端中也有类似的概念

func：表示函数

前端中的函数标识符是：function

main：表示程序执行的入口函数



https://github.com/Zhouchaowen/golang-tutorial/tree/master/1-package





## go 的命令行技巧

`go fmt main.go`：格式化go文件
