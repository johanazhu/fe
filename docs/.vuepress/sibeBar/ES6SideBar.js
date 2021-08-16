function ES6SideBar() {
  return [
    {
      title: 'ES6',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'ES6/',
        'ES6/模块化历程.md',
        'ES6/深入理解ES6模块机制.md',
        'ES6/Promise.md',
        'ES6/Async.md',
        'ES6/Class.md',
        'ES6/Proxy.md',
        'ES6/Generator.md',
        'ES6/Let&Const.md',
        'ES6/Map.md',
        'ES6/Set.md',
      ],
    },
  ]
}

module.exports = ES6SideBar
