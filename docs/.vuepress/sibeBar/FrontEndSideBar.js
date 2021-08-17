function FrontEndSideBar() {
  return [
    {
      title: '目录',
      path: '/Introduction/',
    },
    {
      title: 'JavaScript',
      children: [
        '/JavaScript/面试题/',
        '/JavaScript/',
        '/JavaScript/原理/',
        '/JavaScript/高阶/',
      ],
    },
    {
      title: 'React',
      children: [
        '/React/面试题/',
        '/React/',
        '/React/源码分析/手写React.md',
        '/React/状态库/Redux.md',
        '/React/实战/React代码整洁.md',
      ],
    },
    {
      title: '后端',
      children: [
        '/Node/',
        '/Koa2/',
        '/Express/',
        '/Node/PM2.md',
        '/Mongoose/mongoose-teach.md',
        '/Mysql/mysql-teach.md',
        '/Redis/redis-teach.md',
        '/Go/go.md',
      ],
    },
    {
      title: '大前端',
      children: [
        '/WebApp/',
        '/WeChat/',
        '/WxApp/',
        '/Flutter/',
        '/RN/',
      ],
    },
    {
      title: 'ES6',
      path: '/ES6/',
    },
    {
      title: '浏览器',
      path: '/Browser/',
    },
    {
      title: 'HTTP',
      path: '/HTTP/',
    },
    {
      title: 'HTML',
      path: '/HTML/',
    },
    {
      title: 'CSS',
      path: '/CSS/',
    },
    {
      title: 'Docker',
      path: '/Docker/',
    },
    {
      title: 'Git',
      path: '/Git/',
    },
    {
      title: 'Linux',
      path: '/Linux/',
    },
    {
      title: '计算机基础',
      path: '/CSBasic/',
    },
    {
      title: '设计模式',
      path: '/DesignPattern/发布订阅模式.md',
    },
    {
      title: 'Jquery',
      path: '/Jquery/高效jquery.md',
    },
    {
      title: '读书目录',
      path: '/Read/book/',
    },
    {
      title: '源码目录',
      path: '/Read/code/',
    },
    {
      title: '关于我',
      path: '/About/about.md',
    },
  ]
}

module.exports = FrontEndSideBar
