# dockerCI 最小实践——koa为例



https://www.infoq.cn/article/0sueQNsY9tLDVi79UZms



```shell
docker run --name jenkins -p 8080:8080 -p 50000:50000 -d -v /home/johan/www/jenkins:/var/jenkins_home jenkins/jenkins:lts
```

`-d`： 后台运行

/root/jenkins_node1



**PS:映射数据卷之前要先建立文件，并且提高他的文件读写权限为777**

使用`sudo chmod -R 777 /home/johan/www/jenkins`



需要等一段时间，然后下载他推荐的插件

![docker_jenkins新手](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_jenkins新手.png)

报错就重试，咔咔就是干



创建账号：





换源：

`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`

下载 ssh 插件：

Publish over SSH



系统配置：连接SSH

使用密码

test： success



下载nodejs 插件



全局配置node 





但现在我们还只是打通了一条线，即

如果让github 通知 jenkins





https://issues.jenkins-ci.org/projects/JENKINS/issues/JENKINS-63575?filter=allopenissues

版本问题，