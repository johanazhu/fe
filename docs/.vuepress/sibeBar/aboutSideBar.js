function aboutSideBar() {
  return [
    {
      title: '关于',
      collapsable: false,
      sidebarDepth: 0,
      children: ['About/about.md', 'About/book.md'],
    },
    {
      title: '关于简历',
      collapsable: false,
      sidebarDepth: 0,
      children: ['About/Resume.md', 'About/TalkHr.md'],
    },
    {
      title: '术与道',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'Others/代码和人生.md',
        'Others/学习原则.md',
        'Others/知识与技能.md',
      ],
    },
    {
      title: '留言本站',
      collapsable: false,
      sidebarDepth: 0,
      children: ['About/Question.md'],
    },
    {
      title: 'markdown语法',
      collapsable: false,
      sidebarDepth: 0,
      children: ['About/markdown语法.md'],
    },
  ]
}

module.exports = aboutSideBar
