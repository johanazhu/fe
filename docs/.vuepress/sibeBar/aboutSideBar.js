function AboutSideBar() {
    return [
        {
            text: '关于',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/About/',
            ],
        },
        // {
        //     text: '关于',
        //     collapsable: false,
        //     sidebarDepth: 0,
        //     children: ['/About/', '/About/Book.md'],
        // },
        // {
        //     text: '简历面试',
        //     collapsable: false,
        //     sidebarDepth: 0,
        //     children: [
        //         '/Others/Resume.md',
        //         '/Others/TalkHr.md',
        //         '/Others/介绍项目经验.md',
        //         '/Others/面试者提问环节.md',
        //     ],
        // },
        // {
        //     text: '术与道',
        //     collapsable: false,
        //     sidebarDepth: 0,
        //     children: [
        //         '/Others/',
        //         '/Others/代码和人生.md',
        //         '/Others/个人发展.md',
        //         '/Others/学习原则.md',
        //         '/Others/知识与技能.md',
        //     ],
        // },
    ];
}

module.exports = AboutSideBar;
