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
