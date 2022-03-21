# webpack 如何做优化

开发环境：

1.  值得去配置的：

    1.  优化开发体验

        1.  自动刷新 -> 模块热更新

            1.  实时预览反应更快，等待时间更短

            2.  不刷新浏览器能保留当前网页的运行状态

                需要在入口文件进行配置：

                ```javascript
                // 入口文件
                if (module.hot) {
                    module.hot.accept(['./App'], () => {
                        render(<App />, document.getElementById('app'));
                    });
                }
                ```

                PS: 模块热更新机制

                    1. 当子模块发生更新时，更新事件会一层层往上传递，也就是从 App.js 文件传递到 main.js 文件，直到有某层的文件接受了当前变化的模块，也就是 main.js 文件中定义的 module.hot.appept(['./App', callback])，这时就会调用 callback 函数去执行自定义逻辑
                    2. 如果事件一直往上抛到最外层都没有文件接受它，就会直接刷新网页

                webpack 方面也有相应的开启热跟新的处理

                ​

                ```javascript
                const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
                module.exports = webpackMerge(baseConfig, {
                    plugins: [new HotModuleReplacementPlugin()],
                    devServer: {
                        // 每次构建时候自动打开浏览器并访问网址
                        open: true,
                        // 开启热更新
                        hot: true,
                        // 设置静态资源地址如：/public，从这获取你想要的一些外链资源，图片。
                        contentBase: DIST_PATH,
                        // 设置端口号
                        port: 9000,
                        // 将热更新代码注入到模块中
                        inline: true,
                        // 如果你希望服务器外部可访问
                        host: '0.0.0.0',
                        // 设置 proxy 代理
                        proxy: {
                            context: ['/api'],
                            target: '//www.proxy.com',
                            pathRewrite: { '^/api': '' },
                        },
                        // 设置 https
                        https: true,
                    },
                });
                ```

                2. 配置 sourcemap，方便调试

            ```javascript
            module.exports = {
                devtool: 'source-map',
            };
            ```

            PS: devtool 有各种选择，不同的选项构建速度不同

    2.  尽可能减少构建时间

        1.  减少模块朝招范围，缩小 Babel 的编译范围，并使用 webpack cache 缓存模块

            ```javascript
            module.exports = {
                // 减小模块的查找范围
                resolve: {
                    modules: [path.resolve(__dirname, 'node_modules')],
                },
                module: {
                    rules: [
                        {
                            test: /\.js?$/,
                            use: [
                                {
                                    loader: 'babel-loader',
                                    query: {
                                        // 将 babel 编译过的模块缓存在 webpack_cache 目录下，下次优先复用
                                        cacheDirectory: './webpack_cache/',
                                    },
                                },
                            ],
                            // 减少 babel 编译范围，忘记设置会让 webpack 编译慢上好几倍
                            include: path.resolve(__dirname, 'src'),
                        },
                    ],
                },
            };
            ```

            2.  使用 DllPlugin 预先打包好第三方库

                      	1. ```javascript
                     // dll.config.js
                     const webpack = require('webpack');
                     const path = require('path');
                     const DllPlugin = require('webpack/lib/DllPlugin')
                     const vendors = [
                       'react',
                       'react-dom',
                       'react-router',
                       'redux',
                       'react-redux',
                       'jquery',
                       'antd',
                       'lodash',
                     ]
                     module.exports = {
                       entry: {
                         'dll': vendors,
                       },
                       output: {
                         filename: '[name].js',
                         path: path.resolve(__dirname, 'public'),
                         library: '__[name]__lib',
                       },
                       plugins: [
                         new DllPlugin({
                           name: '__[name]__lib',
                           path: path.join(__dirname, 'build', '[name].manifest.json'),
                         }),
                       ]
                     }

                ```

                具体配置

                3. 使用 Happypack 多线程加快构建
                ```

            ​ webpack 构建慢是因为要解析和处理大量的文件，它需要一件件去做。 Happypack 的核心原理就是把这部分任务分解到多个进程去并行处理，从而减少总的构建时间

            ​ 需要配置哪些 loader 使用 Happypack 就要改写那些配置，比如你想要修改 babel 为多核编译:

            ```javascript
            module.exports = {
                module: {
                    rules: [
                        {
                            test: /\.js?$/,
                            use: ['happypack/loader?id=babel'],
                            include: path.resolve(__dirname, 'src'),
                        },
                    ],
                },
                plugins: [
                    new HappyPack({
                        id: 'babel',
                        loaders: [
                            {
                                loader: 'babel-loader',
                                query: {
                                    cacheDirectory: './webpack_cache/',
                                },
                            },
                        ],
                    }),
                ],
            };
            ```

            4. 不使用 webpack css 模块方案

                css in js 会增加机器的编译时间，所以不使用

    3.  不值得去配置的

            1. 代码丑化
            	2. 模块拆包，持久化缓存
                	3. 减少打包文件大小

生存环境：

1. 值得去配置的
    1. 模块拆包
    2. 尽可能减少打包文件大小
    3. 代码丑化压缩
    4. 尽可能减少构建时间
2. 不值得去配置 1. 优化开发体验 2. 开发环境才需要的配置

## 参考资料

-   [webpack 大型应用优化实践](https://zhuanlan.zhihu.com/p/33377189)
-   [前端性能优化——webpack 篇](https://mp.weixin.qq.com/s/O5GYyd70Toe010f18SOkWA)
-   [玩转 webpack，使你的打包速度提升 90%](https://mp.weixin.qq.com/s?__biz=MjM5NTk4MDA1MA==&mid=2458073274&idx=1&sn=c9b763bf04624a39d06c8ef620f29983&chksm=b187aec786f027d19a1fa53885e86f87fd2968655715f0f600c2389ad5e419c28e0809cfdba6&mpshare=1&scene=1&srcid=&sharer_sharetime=1583157673155&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [webpack 优化笔记](https://github.com/twinkle77/Knowledge-sharing/issues/81)
-   [腾讯 IMWeb 团队的前端构建秘籍](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247487301&idx=1&sn=66f1ffad37081f1da2755102637c10bb&chksm=ea0d45bfdd7acca9096a8664b8ab1dd3ffd0f14fa4a59a6467a20faf18178458a6ed8c1a72c6&mpshare=1&scene=1&srcid=&sharer_sharetime=1582717204519&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [Webpack 打包太慢怎么办? 试试 Dllplugin](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484435&idx=1&sn=8b6fa24209f18864c26023e9171bd6cf&source=41#wechat_redirect)
-   [Webpack 优化技巧，构建效率提升 50%](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247484358&idx=1&sn=cbccc1bb47ef230816d770b5741691c5&chksm=c0668250f7110b4646833f93072bacadee06edf3e43e760244689a0436523b3d3ac2d93cb2ef&mpshare=1&scene=1&srcid=&sharer_sharetime=1567384391143&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [Webpack 优化——将你的构建效率提速翻倍](https://juejin.cn/post/6844903924806189070)
-   [webpack 大型应用优化实践](https://zhuanlan.zhihu.com/p/33377189)
