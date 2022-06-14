/*
 * @Description:
 * @Author: yanyuanfeng
 * @Date: 2022-06-10 10:56:17
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-14 19:48:02
 */
const webpack = require('webpack');
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'
 const PurgeCSSPlugin = require('purgecss-webpack-plugin')//css树摇插件
 const glob = require("glob")
 // 获取文件夹绝对路径方法
const getDirPath=function(dirName){
  return path.join(__dirname, dirName)
}
 const purgeFiles = glob.sync(`${getDirPath("../src")}/**/*`, { nodir: true })
 purgeFiles.push(path.resolve(__dirname, "../public/index.html"))
console.log('purgeFilesList',purgeFiles)

module.exports = {
    stats: 'normal', //标准日志打印
    target: 'web', //默认
    // 输出配置
    output: {
        filename: devMode? '[name].bundle.js':'[name].[contenthash].bundle.js', //'index.js',
        path: path.resolve(__dirname, '../dist'), //本地磁盘目录，用于存储所有输出文件（绝对路径）。
        // publicPath: '/',//'https://staticn.ahaschool.com.cn/', //上载捆绑文件的位置。（相对于服务器根目录）例如 /assets ;或者可以配置cdn地址。
        // hotUpdateChunkFilename: 'assets/js/[id].[chunkhash:8].min.js',// 自定义热更新 chunk 的文件名。
        // asyncChunks: false,
        chunkFilename: 'js/[id].js',
    },
    //页面入口文件配置
    entry: './index.js',
    cache: {
      // 1. 将缓存类型设置为文件系统
      type: 'filesystem', // 默认是memory
      // 2. 将缓存文件夹命名为 .temp_cache,
      // 默认路径是 node_modules/.cache/webpack
      cacheDirectory: path.resolve(__dirname, '.temp_cache'),
      
    },

    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    resolve: {
        modules: ['node_modules'],
        alias: {
            '@': path.join(__dirname, '../src'),
        },
        extensions: ['.js', '.json'], //自动解析确定的扩展。默认值为
    },

    // 关于模块配置
    module: {
        noParse: /jquery|lodash/, //可以忽略大型的library可以提高构建性能
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)(\?[a-z0-9]+)?$/,
                type: 'asset/resource',
                parser:{
                  dataUrlCondition:{
                    maxSize: 10 * 1024,//小10KB的资源以内联base64的形式（默认）
                  }
                },
                // 
                generator: {
                  // The same as output.assetModuleFilename but for specific rule. Overrides output.assetModuleFilename and works only with asset and asset/resource module types.
                  filename: 'images/[hash][ext]',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // 'style-loader',
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          // 这里可以指定一个 publicPath
                          // 默认使用 webpackOptions.output中的publicPath
                          // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                          // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                          publicPath: '../',
                          // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                          // hmr: devMode, // 仅dev环境启用HMR功能
                      },
                  },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                            publicPath: '../',
                            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                            // hmr: devMode, // 仅dev环境启用HMR功能
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },

    // 插件
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html'
      }),
      
      new MiniCssExtractPlugin({
        // 这里的配置和webpackOptions.output中的配置相似
        // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
        filename: devMode ? 'css/[name].css' : 'css/[name].[chunkhash].css',
        // chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[chunkhash].css',
      }),
      new PurgeCSSPlugin({
        paths: purgeFiles,
        content: [ `../public/**/*.html`, `../src/**/*.vue` ],
        defaultExtractor (content) {
          const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
          return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
        },
         safelist: [ /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/ ],
      })
      // 开启 BundleAnalyzerPlugin 
      // new BundleAnalyzerPlugin(), 
    ],
// 优化选项
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 2000,////当导入的模块最小是多少字节才会进行代码分割
        // minRemainingSize: 0,
        minChunks: 1,////当一个模块被导入(引用)至少多少次才对该模块进行代码分割
        maxAsyncRequests: 30,//按需加载时的最大并行请求数
        maxInitialRequests: 30,//入口点的最大并行请求数
        // enforceSizeThreshold: 50000,

        cacheGroups: {//缓存组，这里是我们表演的舞台，抽取公共模块什么的，都在这个地方
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            // name: "defaultVendors",
            //Webpack 优化分包之 name https://zhuanlan.zhihu.com/p/103729115
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            // name: "vendors",
          },
        },
      },
    },

   

};
