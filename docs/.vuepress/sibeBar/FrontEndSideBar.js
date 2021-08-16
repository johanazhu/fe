function FrontEndSideBar() {
  return [
    // 'Introduction',
    // 'Introduction/前端基础.md',
    // 'Introduction/后端.md',
    // 'Introduction/大前端.md',
    // 'Introduction/读书.md',
    // 'Introduction/源码.md',
    {
      title: '目录',
      path: '/Introduction/',
    },
    {
      title: '前端基础',
      //   sidebarDepth: 2,
      children: [
        '/JavaScript/',
        '/ES6/',
        '/Browser/',
        '/Performance/',
        '/webpack/',
        '/HTML/',
        '/CSS/',
        '/Jquery/高效jquery.md',
      ],
    },
    {
      title: '后端',
      //   sidebarDepth: 2,
      children: [
        '/Node/',
        '/Koa2/',
        '/Express/express-teach.md',
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
        '/WeChat/Foreword.md',
        '/WxApp/Foreword.md',
        '/Flutter/',
        '/RN/Foreword.md',
      ],
    },
    {
      title: '读书目录',
      children: ['Read/book/'],
    },
    {
      title: '源码目录',
      children: ['Read/code/'],
    },
    //   {
    //     title: "后端文章目录",
    //     children: [
    //       "Introduction/后端文章目录.md",
    //     ],
    //   },
    //   {
    //     title: "大前端文章目录",
    //     children: [
    //       "Introduction/大前端文章目录.md",
    //     ],
    //   },
    //   {
    //     title: "读书目录",
    //     children: [
    //       "Introduction/读书目录.md",
    //     ],
    //   },
    //   {
    //     title: "源码目录",
    //     children: [
    //       "Introduction/源码目录.md",
    //     ],
    //   },
  ]
}

module.exports = FrontEndSideBar
