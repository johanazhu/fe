function csBasicSideBar() {
  return [
    {
      title: '计算机基础',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'CSBasic/',
        'CSBasic/计算机的起源.md',
        'CSBasic/计算机的组成.md',
        // "CSBasic/操作系统基础篇.md",
        'CSBasic/计算机网络传输层篇.md',
        'CSBasic/计算机网络网络层篇.md',
        'CSBasic/计算机网络应用层篇.md',
        'CSBasic/计算机的操作系统.md',
        'CSBasic/计算机中的三大件.md',
        'CSBasic/编程必备基础知识.md',
        'CSBasic/TCP的那些事儿.md',
      ],
    },
  ]
}

module.exports = csBasicSideBar
