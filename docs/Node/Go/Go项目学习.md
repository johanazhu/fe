# Go项目学习



跟着方应杭学习 Go



## 安装

### 下载地址

Go官网下载地址：https://golang.org/dl/ 

下载完之后双击安装

#### 查看是否安装成功

```bash
go version
```

#### 配置 Go 配置

```bash
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

#### 安装 gowatch

```bash
go get github.com/silenceper/gowatch
```

#### 在 vscode 中安装

启动`vscode`选择插件->搜`go`选择`Go for Visual Studio Code`插件点击安装即可

其次安装 go 的插件：

Windows平台按下`Ctrl+Shift+P`，Mac平台按`Command+Shift+P`，这个时候`VS Code`界面会弹出一个输入框，如下图：

![VScode安装插件](https://s2.loli.net/2022/09/10/DaNYAw3gPCEnQcZ.png)

#### 第一个 go 程序

在`src`目录下创建一个hello目录，在hello目录中创建一个`main.go`文件

```go
package main  // 声明 main 包，表明当前是一个可执行程序

import "fmt"  // 导入内置 fmt 

func main(){  // main函数，是程序执行的入口
    fmt.Println("Hello World!")  // 在终端打印 Hello World!
}
```

在hello目录下执行：`go run .`

在终端直接执行报错：`go: cannot find main module; see 'go help modules'`

原来在因为设置"GO111MODULE=on"，所以 go 的默认管理依赖就变成了 go module 模式，而 `go.mod` 文件描述的是项目依赖的包和版本

> PS：类似前端 package.json 文件

所以我们先生成 go.mod，

```bash
go mod init
```

接着就能看到「Hello World!」

![go run](https://s2.loli.net/2022/09/10/Lal1D9tCVKboH4m.png)

当然，如果要实时查看编译结果，就需要用 gowatch

```bash
gowatch run .
// 或者 gowatch
```



## 熟悉各种库

### zserge/lorca

是什么：一个制作桌面应用的库

地址：https://github.com/zserge/lorca

下载：`go get github.com/zserge/lorca`

> 注意：下载库的时候不要加 https 协议

#### demo

```go
// package main // 声明 main 包，表明当前是一个可执行程序

// import "fmt" // 导入内置 fmt

// func main(){  // main函数，是程序执行的入口
//     fmt.Println("Hello World112!")  // 在终端打印 Hello World!
// }

package main

import (
	"log"
	"net/url"

	"github.com/zserge/lorca"
)

func main() {
	// Create UI with basic HTML passed via data URI
	ui, err := lorca.New("data:text/html,"+url.PathEscape(`
	<html>
		<head><title>Hello</title></head>
		<body><h1>Hello, world!</h1></body>
	</html>
	`), "", 480, 320)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()
	// Wait until UI window is closed
	<-ui.Done()
}
```

执行命令：`go run .`

能看到一个打开的网页，说明引入库成功

### gin-gonic/gin

是什么：提供服务器接口的库

地址：https://github.com/gin-gonic/gin

下载：`go get -u github.com/gin-gonic/gin`

#### demo

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
      "message": "pong",
    })
  })
  r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```

这样就启动了一个 gin 服务器

### gorilla/websocket

是什么：实现 WebSocket 通知

地址：https://github.com/gorilla/websocket



### skip2/go-qrcode

是什么：生成二维码

地址：https://github.com/skip2/go-qrcode





## 项目开始

### 初始化项目

```bash
go mod init github.com/johanazhu/go-demo
```

一般命名为`go mod init XXX`，XXX 为项目名，如果放 github 上就写 github 地址
