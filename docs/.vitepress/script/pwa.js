

// from https://github.com/vitest-dev/vitest/blob/main/docs/.vitepress/meta.ts
const googleapis = 'https://fonts.googleapis.com'
const gstatic = 'https://fonts.gstatic.com'
const pwaFontsRegex = new RegExp(`^${googleapis}/.*`, 'i');
const pwaFontStylesRegex = new RegExp(`^${gstatic}/.*`, 'i');
const githubusercontentRegex = new RegExp('^https://((i.ibb.co)|((raw|user-images).githubusercontent.com))/.*', 'i');


export const pwa = {
    outDir: ".vitepress/dist",
    registerType: "autoUpdate",
    // include all static assets under public/
    manifest: {
        id: "/",
        name: "五年前端三年面试",
        short_name: "五年前端三年面试",
        description: "前端知识地图",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    },
    workbox: {
        navigateFallbackDenylist: [/^\/new$/],
        globPatterns: ["**/*.{css,js,html,png,svg,ico,txt,woff2}"],
        runtimeCaching: [
            {
                urlPattern: pwaFontsRegex,
                handler: "CacheFirst",
                options: {
                    cacheName: "google-fonts-cache",
                    expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
            {
                urlPattern: pwaFontStylesRegex,
                handler: "CacheFirst",
                options: {
                    cacheName: "gstatic-fonts-cache",
                    expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
            {
                urlPattern: githubusercontentRegex,
                handler: "CacheFirst",
                options: {
                    cacheName: "githubusercontent-images-cache",
                    expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
        ],
    },
};
