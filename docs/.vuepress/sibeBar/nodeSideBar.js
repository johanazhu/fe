function nodeSideBar() {
  return [
    {
      title: 'node基础',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'Node/',
        'Node/Node基础.md',
        'Node/事件触发器events模块.md',
        'Node/module模块.md',
        'Node/脚手架.md',
        'Node/npm.md',
        'Node/RESTful.md',
        'Node/session与JWT.md',
      ],
    },
    {
      title: 'Koa2',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'Koa2/',
        'Koa2/Koa2基础',
        'Koa2/实战：Koa2从零到脚手架',
        'Koa2/源码分析.md',
        'Koa2/手写Koa2.md',
        'Koa2/对比Express、Koa2、Redux',
      ],
    },
    {
      title: 'Express',
      collapsable: false,
      sidebarDepth: 0,
      children: ['Express/', 'Express/手写express.md'],
    },
    {
      title: 'PM2',
      path: 'Node/PM2.md',
    },
    {
      title: 'MongoDB',
      path: 'Node/MongoDB.md',
    },
    {
      title: 'Mysql',
      path: 'Node/Mysql.md',
    },
    {
      title: 'Redis',
      path: 'Node/Redis.md',
    },
    {
      title: 'Go',
      path: 'Node/Go.md',
    },
    {
      title: 'Python',
      path: 'Node/Python/',
    },
    {
      title: 'Nest.js',
      path: 'Node/Nest.js.md',
    },
  ]
}

module.exports = nodeSideBar
