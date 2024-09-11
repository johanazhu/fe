export default function AboutSideBar() {
    return [
        {
            text: '关于',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '关于本网站',
                    link: '/About/',
                },
                {
                    text: '赞助本网站',
                    link: '/About/sponsor',
                },
            ],
        },
        // {
        //     text: '术与道',
        //     collapsable: false,
        //     sidebarDepth: 0,
        //     items: [
        //         {
        //             text: '软实力',
        //             link: '/Others/',
        //         },
        //         {
        //             text: '代码和人生',
        //             link: '/Others/代码和人生',
        //         },
        //         {
        //             text: '个人发展',
        //             link: '/Others/个人发展',
        //         },
        //         {
        //             text: '学习原则',
        //             link: '/Others/学习原则',
        //         },
        //         {
        //             text: '知识与技能',
        //             link: '/Others/知识与技能',
        //         },
        //     ],
        // },
    ];
}
