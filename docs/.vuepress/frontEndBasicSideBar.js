function frontEndBasicSideBar() {
    return [
      {
        title: "HTML",
        collapsable: false,
        sidebarDepth: 0,
        children: ["HTML/HTML.md"],
      },
      {
        title: "CSS",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "CSS/Foreword.md",
          "CSS/垂直居中.md",
          "CSS/Flex.md",
          "CSS/布局.md",
          "CSS/BFC是什么.md",
          "CSS/动画.md",
          "CSS/CSS渲染以及优化策略.md",
          "CSS/其他知识点.md",
        ],
      },
      {
        title: "Jquery",
        collapsable: false,
        sidebarDepth: 0,
        children: ["Jquery/高效jquery.md"],
      },
    ];
}
  
module.exports = frontEndBasicSideBar;