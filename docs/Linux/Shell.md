# Shell 编程

Shell 是连接用户和操作系统的应用软件，Shell 脚本

例子1：输入两个整数 m 和 n，计算从 m 到 n 的整数求和结果

```bash
#! /usr/bin/bash
printf 'm = '
read m
printf 'n = '
read n
a=$m
sum=0
while [ $a -le $n ]
do
	sum=$[ sum + a ]
    a=$[ a + 1 ]
done
echo '结果：'$sum
```



oh-my-she	ll

bash-it



日志操作，进程和网络管理，系统管理，自定义Shell命令，环境变量





脚本Script（脚本和编译、添加到Path、参数、引号、条件控制、循环、写一个小脚本、部署工具）





```shell
#!/bin/bash 

echo "which useage do you want to konw?"
echo "1 for CPU, 2 for RAM"
read choice

if [ $choice -eq 1 ]
then
   echo "CPU usage"
   grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage "%"}'
elif [ $choice -eq 2 ]
then
   echo "RAM usage"
   free -m | grep Mem | awk '{print ($3/$2)*100 "%"}'
else
   echo "WRONG INPUT"
fi
```

`#!/bin/bash`是指定此文件由/bin下面的bash这个程序来执行。



系统预定义变量 

常用系统变量 $HOME、$PWD、$SHELL、$USER 等







## Shell 编程

### Shell 是什么

Shell 是一个命令行解释器，它位用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序

脚本格式要求

1. 脚本以 `#!bin/bash` 开头
2. 脚本需要可执行权限

脚本的常用执行方式

方法1：输入脚本的绝对路径或相对路径

首先要赋予 hello.sh 脚本的 +x 权限，再执行脚本

比如 ./hello.sh 或者使用 /root/demo/hello.sh

方法2：sh + 脚本

不用赋予脚本 +x 权限，直接执行即可

比如 `sh hello.sh`

### Shell  的变量

shell 变量介绍

Linux Shell 中的变量分为，系统变量和用户自定义变量

系统变量：$HOME、$PWD、$SHELL、$USER，比如 echo $HOME 等

显示当前 shell 中所有变量：set







## Shell 脚本编程（鱼皮）

默认变量

运算符

条件

循环

执行

函数

- 系统函数
- 自定义函数

规范

调试方法

管道

I/O 重定向





## Linux Shell 脚本

bash shebang 设置脚本解释器

bash 注释

bash 函数

break continue 语句

case 语句

bash if else

for 循环

loop 循环

while 循环

until 循环

bash 字符串比较

source 运行文件命令

read 读取文件描述符

printf 格式化并打印数据



https://www.myfreax.com/bash-shebang/





