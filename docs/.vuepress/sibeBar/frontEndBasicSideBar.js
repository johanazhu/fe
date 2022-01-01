function frontEndBasicSideBar() {
    return [
        {
            text: "HTML",
            collapsable: false,
            sidebarDepth: 0,
            children: ["/HTML/"],
        },
        {
            text: "/CSS",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/CSS/",
                "/CSS/BFC是什么.md",
                "/CSS/flex.md",
                "/CSS/grid.md",
                "/CSS/水平垂直居中.md",
                "/CSS/左边固定宽，右边自适应.md",
                "/CSS/左图右文布局.md",
                "/CSS/瀑布流效果.md",
                "/CSS/圣杯、双飞翼.md",
                "/CSS/动画.md",
                "/CSS/CSS渲染以及优化策略.md",
                "/CSS/CSS知多少.md",
                "/CSS/文本溢出.md",
            ],
        },
        {
            text: "/Jquery",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "/Jquery/",
                "/Jquery/高效jquery.md",
                "/Jquery/如何设计一个JS插件.md",
                "/Jquery/阅读源码.md",
            ],
        },
    ];
}

module.exports = frontEndBasicSideBar;
