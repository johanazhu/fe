# docker 的原理

两个关键字：namespace、cgroup

- namespace：解决的问题是环境隔离问题


- cgroup：解决计算机资源使用上的隔离

![docker 的原理](https://i.loli.net/2021/09/12/POZnXMptGBL3NRr.png)



NameSpace

-   我们知道 Linux 中的 PID、IPC、网络等资源都是全局的，而 NameSpace 机制是一种资源隔离方案，在该机制下这些资源就不再是全局的了，而是数据某个特定的 NameSpace，各个 NameSpace 下的资源互不干扰，这就使得每个 NameSpace 看起来像个独立的操作系统一样，但只有 NameSpace 是不够的

Control groups

-   虽然有了 NameSpace 技术可以实现资源隔离，但进程还是可以不受控的访问系统资源，比如 CPU、内存、磁盘、网络等，为了控制容器中进程对资源的访问，Dokcer 采用 control groups（也就是 cgroup），有了 cgroup 就可以控制容器中进程对系统资源的消耗，比如你可以限制某个容器使用内存的上限、可以在哪些 CPU 上运行等等

主要靠两种技术，一种是看起来是隔离的技术，称为 **namespace**（命名空间）。在每个 namespace 中的应用看到的，都是不同的 IP 地址、用户空间、进程 ID 等。另一种是用起来是隔离的技术，称为 **cgroup**（网络资源限制），即命名这台机器有很多的 CPU、内存，但是一个用用只能用其中的一部分

