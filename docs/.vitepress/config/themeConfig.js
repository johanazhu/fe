import nav from './nav';
import sidebar from './sidebar';

export default {
    outline: [2, 4],
    outlineTitle: '大纲',
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
        appId: process.env.ALGOLIA_APPID,
        apiKey: process.env.ALGOLIA_APIKEY,
        indexName: 'azhubaby',
        locales: {
            placeholder: '搜索文档',
            translations: {
                button: {
                    buttonText: '搜索文档',
                    buttonAriaLabel: '搜索文档'
                },
                modal: {
                    searchBox: {
                        resetButtonTitle: '清除查询条件',
                        resetButtonAriaLabel: '清除查询条件',
                        cancelButtonText: '取消',
                        cancelButtonAriaLabel: '取消'
                    },
                    startScreen: {
                        recentSearchesTitle: '搜索历史',
                        noRecentSearchesText: '没有搜索历史',
                        saveRecentSearchButtonTitle: '保存至搜索历史',
                        removeRecentSearchButtonTitle: '从搜索历史中移除',
                        favoriteSearchesTitle: '收藏',
                        removeFavoriteSearchButtonTitle: '从收藏中移除'
                    },
                    errorScreen: {
                        titleText: '无法获取结果',
                        helpText: '你可能需要检查你的网络连接'
                    },
                    footer: {
                        selectText: '选择',
                        navigateText: '切换',
                        closeText: '关闭',
                        searchByText: '搜索提供者'
                    },
                    noResultsScreen: {
                        noResultsText: '无法找到相关结果',
                        suggestedQueryText: '你可以尝试查询',
                        reportMissingResultsText: '你认为该查询应该有结果？',
                        reportMissingResultsLinkText: '点击反馈'
                    }
                }
            }
        },
    },
    me: {
        wechat: "https://s2.loli.net/2022/03/25/VqfD2ScLuKzjbR8.jpg"
    },
};

