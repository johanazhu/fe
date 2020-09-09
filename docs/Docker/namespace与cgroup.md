# namespace与cgroup



参考 趣谈linux

### docker的底层实现

docker基于Linux内核提供这样几项功能实现的：

- #### NameSpace

  - 我们知道Linux中的PID、IPC、网络等资源都是原句的，而NameSpace机制是一种资源隔离方案，在该机制下这些资源就不再是全局的了，而是数据某个特定的NameSpace，各个NameSpace下的资源互不干扰，这就使得每个NameSpace看起来像个独立的操作系统一样，但只有NameSpace是不够的

- #### Control groups

  - 虽然有了NameSpace技术可以实现资源隔离，但进程还是可以不受控的访问系统资源，比如CPU、内存、磁盘、网络等，为了控制容器中进程对资源的访问，Dokcer采用control groups（也就是cgroup），有了cgroup就可以控制容器中进程对系统资源的消耗，比如你可以限制某个容器使用内存的上限、可以在哪些CPU上运行等等



主要靠两种技术，一种是看起来是隔离的技术，称为 **namespace**（命名空间）。在每个 namespace 中的应用看到的，都是不同的 IP 地址、用户空间、进程 ID 等。另一种是用起来是隔离的技术，称为 **cgroup**（网络资源限制），即命名正泰机器有很多的 CPU、内存，但是一个用用只能用其中的一部分。

