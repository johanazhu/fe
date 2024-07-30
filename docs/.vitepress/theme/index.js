

// import { inBrowser } from 'vitepress'
// import Layout from './Layout.vue';

// if (inBrowser)
//   import('./pwa')


// export default {
//     // root component to wrap each page
//     Layout,

//     // this is a Vue 3 functional component
//     NotFound: () => 'custom 404',

//     enhanceApp({ app, router, siteData }) {
//         // app is the Vue 3 app instance from `createApp()`.
//         // router is VitePress' custom router. `siteData` is
//         // a `ref` of current site-level metadata.
//     },

//     setup() {
//         // this function will be executed inside VitePressApp's
//         // setup hook. all composition APIs are available here.
//     },
// };
// 切换成这种模式：https://github.com/vite-pwa/vitepress/tree/main/examples/pwa-prompt
import { h, watch } from "vue";
import { useData } from "vitepress";
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

import RegisterSW from './components/RegisterSW.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
import RoadMap from './components/RoadMap.vue'
import MAsideSponsors from "./components/MAsideSponsors.vue";

export default {
    ...DefaultTheme,
    // Layout() {
    //     // return h(DefaultTheme.Layout, null, {
    //     //     'layout-bottom': () => h(ReloadPrompt),
    //     //     "aside-bottom": () => h(MAsideSponsors),
    //     // })
    //     const props: Record<string, any> = {};
    //     // 获取 frontmatter
    //     const { frontmatter } = useData();

    //     /* 添加自定义 class */
    //     if (frontmatter.value?.layoutClass) {
    //         props.class = frontmatter.value.layoutClass;
    //     }
    //     return h(DefaultTheme.Layout, props, {
    //         'layout-bottom': () => h(ReloadPrompt),
    //         "aside-bottom": () => h(MAsideSponsors),
    //     });
    // },
    Layout: () => {
        const props = {};
        // 获取 frontmatter
        const { frontmatter } = useData();

        /* 添加自定义 class */
        if (frontmatter.value?.layoutClass) {
            props.class = frontmatter.value.layoutClass;
        }

        return h(DefaultTheme.Layout, props, {
            'layout-bottom': () => h(ReloadPrompt),
            // "aside-bottom": () => h(MAsideSponsors),
        });
    },
    enhanceApp({ app }) {
        app.component('RoadMap', RoadMap)
    }
}
