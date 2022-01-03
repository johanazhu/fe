<template><h1 id="docker-常见命令" tabindex="-1"><a class="header-anchor" href="#docker-常见命令" aria-hidden="true">#</a> docker 常见命令</h1>
<h2 id="常见命令" tabindex="-1"><a class="header-anchor" href="#常见命令" aria-hidden="true">#</a> 常见命令</h2>
<p><code>docker version</code>      查看 <code>Docker</code> 客户端和服务端的信息</p>
<p><code>docker --version</code>  	只查看版本</p>
<p><code>docker images</code>		查看所有的镜像（<code>image</code>）</p>
<p><code>docker images</code> === <code>docker image ls</code></p>
<p><code>docker ps -a</code> 		查看所有启动过的容器（<code>container</code>）</p>
<p><code>docker container ls</code> 	查看所有<strong>正启动</strong>的容器（<code>container</code>）</p>
<p><code>docker help</code> 帮助</p>
<p>​	<code>docker image help</code> image 的帮助</p>
<p>​	<code>docker container help</code> container 的帮助</p>
<p><code>docker commit</code> 生成一个镜像（image）</p>
<p><code>docker port 容器名</code> 查看容器</p>
<h2 id="运行容器" tabindex="-1"><a class="header-anchor" href="#运行容器" aria-hidden="true">#</a> 运行容器</h2>
<p>根据镜像生成容器：</p>
<p><code>docker run -it --name express_demo -p 3000:3000 express_server:v1.0.1 /bin/bash </code></p>
<p>参数说明：</p>
<ul>
<li>-i：以交互模式运行容器，通常与 <strong>-t</strong> 同时使用</li>
<li>-t：为容器重新分配一个伪输入终端，通常与 <strong>-i</strong> 同时使用</li>
<li>--name    给这个容器起名字</li>
<li>-p     端口映射，本机端口（启动容器的宿主机）：镜像端口</li>
<li>-d     后台运行（<code>docker run -d -p 8000:80 nginx</code>）</li>
<li>-v     数据卷(<code>docker run -d -v /home/johan/www/express_server:/www/express_server</code>)</li>
</ul>
<p>一般我会安装 -it --name -p 的写法，把根据那个镜像启动放在最后面</p>
<p><code>docker run -it --name express_demo -p 3000:3000 express_server:v1.0.1 /bin/bash </code></p>
<p>以上的代码翻译成白话文就是：</p>
<p>根据express_server:v1.0.1 版本的镜像启动一个名字叫express_demo 端口为3000的容器并进入容器内，注意本机端口对应镜像中的3000端口</p>
<h2 id="拉取" tabindex="-1"><a class="header-anchor" href="#拉取" aria-hidden="true">#</a> 拉取</h2>
<p>拉取镜像：</p>
<p><code>docker pull 发布者名字(可有可无)/镜像名:版本名</code></p>
<ul>
<li>docker pull node</li>
<li>docker pull johanbo/docker_express_server:tagname</li>
</ul>
<h2 id="构建" tabindex="-1"><a class="header-anchor" href="#构建" aria-hidden="true">#</a> 构建</h2>
<h3 id="通过-dockerfile-构建-常见" tabindex="-1"><a class="header-anchor" href="#通过-dockerfile-构建-常见" aria-hidden="true">#</a> 通过 dockerfile 构建（常见）</h3>
<p><code>docker build . -t express_server:V1.0.0 </code> 	构建容器</p>
<ul>
<li>-t：给这个包起名字</li>
<li>：之后为版本号</li>
</ul>
<p>即 docker 打包当前目录（.），当前目录下有dockerfile，才能使用</p>
<p><code>docker exec -it xxxx /bin/bash</code>	进入正在运行的容器</p>
<ul>
<li>xxxx：为容器名，id和名字都可以进入</li>
</ul>
<h3 id="通过-commit-构建" tabindex="-1"><a class="header-anchor" href="#通过-commit-构建" aria-hidden="true">#</a> 通过 commit 构建</h3>
<p><code>docker commit &lt;原修改后容器ID&gt; &lt;新容器名称&gt;</code></p>
<h2 id="生产" tabindex="-1"><a class="header-anchor" href="#生产" aria-hidden="true">#</a> 生产</h2>
<p>打包镜像：</p>
<p><code>docker save express_server:v1.0.0 &gt; express_server.tar</code></p>
<p><code>docker save –o ubuntu_node.jar ubuntu_node</code></p>
<p>导入镜像： <code>docker load &lt; express_server.tar</code></p>
<h2 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h2>
<p>删除镜像：<code>docker rmi image名</code></p>
<p>删除容器：<code>docker rm 168d445a98a3</code></p>
<h2 id="容器" tabindex="-1"><a class="header-anchor" href="#容器" aria-hidden="true">#</a> 容器</h2>
<p>停止容器：<code>docker stop xx</code></p>
<p>运行已经停止的容器：<code>docker start xx</code></p>
<p>直接关闭容器：<code>docker kill xx</code></p>
<ul>
<li>其中 xx 都为容器名</li>
</ul>
<p>进入还在运行的容器</p>
<p>安装和常用CLI：
添加阿里云镜像：sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
安装命令：sudo yum install -y  docker-ce docker-ce-cli containerd.io
启动命令：sudo systemctl start docker
添加当前用户到docker用户组：sudo usermod -aG docker $USER （需注销），newgrp docker （立即生效）
Helloworld：docker run hello-world  （本地没有镜像的话会自动从远端仓库pull）
pull nginx 镜像：docker pull nginx（等效于nginx:latest）
运行：docker run -【d】（后台运行不阻塞shell） 【-p 80:80】（指定容器端口映射，内部：外部） nginx
查看正在运行：docker ps
删除容器：docker rm -f container id(不用打全，前缀区分)
进入bash：docker exec -it container id(不用打全，前缀区分) bash
commit镜像：docker commit container id(不用打全，前缀区分)  name
查看镜像列表：docker images （刚才commit的镜像）
使用运行刚才commit的镜像：docker run -d name
使用Dockerfile构建镜像：docker build -t name 存放Dockerfile的文件夹
删除镜像：docker rmi name
保存为tar：docker save name  tar name
从tar加载：docker load  tar name</p>
<p>一些启动参数：
后台运行容器：-d
容器内外端口映射：-p 内部端口号:外部端口号
目录映射：-v dir name : dir
指定映像版本：name:ver</p>
</template>
