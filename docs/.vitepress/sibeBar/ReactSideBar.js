export default function reactSideBar() {
    return [
        {
            text: '常见面试题',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '面试题',
                    link: '/React/面试题/',
                },
                {
                    text: '代码题',
                    link: '/React/面试题/代码题',
                },
                {
                    text: '渲染十万条数据解决方案',
                    link: '/React/面试题/渲染十万条数据解决方案',
                },
            ],
        },
        {
            text: 'React基础',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '基础知识汇总',
                    link: '/React/',
                },
                {
                    text: 'React快速了解',
                    link: '/React/React快速了解',
                },
                {
                    text: 'Fiber',
                    link: '/React/Fiber',
                },
                {
                    text: 'VirtualDOM',
                    link: '/React/VirtualDOM',
                },
                {
                    text: 'Diff',
                    link: '/React/Diff',
                },
                {
                    text: 'Hooks',
                    link: '/React/Hooks',
                },
                {
                    text: 'useCallback和useMemo',
                    link: '/React/useCallback和useMemo',
                },
                {
                    text: 'Ref以及useRef',
                    link: '/React/Ref以及useRef',
                },
                {
                    text: 'Hooks踩坑',
                    link: '/React/Hooks踩坑',
                },
                {
                    text: 'Hooks实现原理',
                    link: '/React/Hooks实现原理',
                },
                {
                    text: '手写自定义Hooks',
                    link: '/React/手写自定义Hooks',
                },
                {
                    text: '快问快答setState',
                    link: '/React/快问快答setState',
                },
                {
                    text: 'setState 异步的原理',
                    link: '/React/setState',
                },
                {
                    text: '函数式组件与类组件有何不同',
                    link: '/React/函数式组件与类组件有何不同',
                },
                {
                    text: '性能优化',
                    link: '/React/性能优化',
                },
                {
                    text: '事件机制',
                    link: '/React/事件机制',
                },
                {
                    text: '里程碑',
                    link: '/React/里程碑',
                },
                {
                    text: 'React版本更新',
                    link: '/React/React版本更新',
                },
                {
                    text: '生命周期',
                    link: '/React/生命周期',
                },
            ],
        },
        {
            text: 'React生态',
            collapsable: false,
            sidebarDepth: 0,
            items: [
                {
                    text: '生态',
                    link: '/React/生态/',
                },
                {
                    text: '从Redux说起，到手写，再到状态管理',
                    link: '/React/生态/从Redux说起，到手写，再到状态管理',
                },
                // {
                //     text: 'ReactRedux',
                //     link: '/React/生态/ReactRedux',
                // },
                {
                    text: 'ReactRouter',
                    link: '/React/生态/ReactRouter',
                },
                // {
                //     text: 'Redux-Sage',
                //     link: '/React/生态/Redux-Sage',
                // },
                // {
                //     text: 'Redux-thunk',
                //     link: '/React/生态/Redux-thunk',
                // },
                // {
                //     text: 'Dva',
                //     link: '/React/生态/Dva',
                // },
                // {
                //     text: 'Mobx',
                //     link: '/React/生态/Mobx',
                // },
                // {
                //     text: '状态管理',
                //     link: '/React/生态/状态管理',
                // },
                // {
                //     text: 'Immutable',
                //     link: '/React/生态/Immutable',
                // },
            ],
        }
    ];
}
