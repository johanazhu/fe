webpack 文件指纹

Hash：和整个项目的构建相关，只要项目文件有改变，整个项目构建的 hash 值就会改变

chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值

contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

移动端 CSS px 自动装换成 rem

rem 相对单位

px 绝对单位

使用 px2rem-loader

静态资源内敛

source map

开发环境开启，显示环境关闭

eval：使用 eval 包括模块代码

source map：产生.map 文件

cheap：不包含列信息

inline：将.map 作为 DataUrl 嵌入，不单独生成 .map 文件

module：包括 loader 的 sourecmap

基础库分离

思路：将 react、react-dom 基础包通过 cdn 引入， 不打入 bundle 中

方法：1.使用 html-webpack-externals-plugin

2.SplitChunksPlugin 进行公共脚本分离

chunks 参数说明

​ async 异步引入的库进行分离（默认）

​ initial 同步引入的库进行分离

​ all 所以引入的库进行分离（推荐）

为了速度更快，用第一种

代码分割

抽离相同代码到一个共享快

脚本懒加载，使得出是下载的代码更小

方式： CommonJS: require.ensure

ES6: 动态 import（目前还没有原生支持，需要 babel 转换）

@babel/plugin-syntax-dynamic-import

ESLint

和 CI/CD 系统集成

和 webpack 集成

本地开发阶段增加 precommit 钩子

安装 husky

和 webpack 集成

eslint-loader，构建时检查 js 规范
