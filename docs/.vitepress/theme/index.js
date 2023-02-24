

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
import { h } from 'vue'
import Theme from 'vitepress/theme'

import RegisterSW from './RegisterSW.vue'
import ReloadPrompt from './ReloadPrompt.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'layout-bottom': () => h(ReloadPrompt)
    })
  }
}
