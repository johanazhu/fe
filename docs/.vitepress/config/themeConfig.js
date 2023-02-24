import nav from './nav';
import sidebar from './sidebar';

export default {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/android-chrome-96x96.png',

    nav,

    sidebar,

    editLink: {
        pattern: 'https://github.com/johanazhu/fe/edit/master/docs/:path',
        text: '在 GitHub 上编辑此页',
    },

    socialLinks: [
        {
            icon: 'github',
            link: 'https://github.com/johanazhu/fe',
        },
    ],

    footer: {
        copyright: 'Copyright © 2021-present johan',
    },

    algolia: {
        appId: 'LE7T3Q08D4',
        apiKey: 'b1b28febea61eaf77ca3c462d41cb629',
        indexName: 'azhubaby',
        locales: {
            placeholder: '搜索文档',
        },
    },
    // me: {
    //     // wechat:"https://cdn.jsdelivr.net/gh/shengxinjing/static/wechat.jpg"
    //     // wechat: "https://cdn.jsdelivr.net/gh/shengxinjing/static/jingu2.png"
    //     // wechat: '/wechat2.png',
    //     gongzhonghao: '/gongzhonghao.jpeg',
    //     // wechat:"https://cdn.jsdelivr.net/gh/shengxinjing/static/xiao3.jpg"
    // },
};
