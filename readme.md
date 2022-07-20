# 从零开始使用webpack 搭建vue项目

## 1 创建项目

1. npm init 生成 package.json
2. 创建 index.html webpack.confug.js

```diff
  project-name
  |- index.html
+ |- index.js
  |- package.json
+ |- webpack.config.js
```

``` html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack学习</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

``` javascript
// webpack.config.js
'use strict'

const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}

```
  
3. 安装Webpack npm install --save-dev webpack webpack-cli

```diff
+ webpack-cli@4.9.2
+ webpack@5.73.0
```

4. 修改 package.json

``` diff
"scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "build": "webpack --config webpack.config.js"
  },
 {
    "scripts": {
-     "build": "webpack"
+     "build": "webpack --config webpack.config.js"
    }
  }
```
## 2 启动服务

使用 webpack-dev-server 来启动本地服务
1. 安装`npm install --save-dev webpack webpack-dev-server`
2. 修改 package.json

```diff
  {
    "scripts": {
+     "dev": "webpack serve",
      "build": "webpack"
    }
  }

```
3. webpack.config.js修改端口号 
``` javascript
module.exports = {
  // ...
  devServer: {
    compress: true,
    port: 8080
  }
}
```

## 3 生成 HTML 文件

使用 html-webpack-plugin 来生成 HTML 文件

1. 执行  `npm install --save-dev html-webpack-plugin`
2. 修改 webpack.config.js

``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
}
```

## 4 安装vue

1. 执行 `npm install --save-dev vue-loader vue-template-compiler`
2. 执行 `npm install --save vue vue-router`
3. 在 webpack.config.js 中配置 vue-loader 用于引入 .vue 类型文件

```javascript
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```
4. 新建一个 app.vue 文件作为路由组件的容器 以及补充 index.js

```html
<!--  app.vue -->
<template>
<router-view></router-view>
</template>

<script>
export default {}
</script>

```
```javascript
// index.js
import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";

import { createApp } from "vue";
import App from './app.vue'


const routes =  [
  {
  path: "/",
  name: "index",
  component:  () => import('./index.vue')
}
]
const router = createRouter({
  history: createWebHashHistory(),
  mode: "hash",
  routes: routes
});
createApp(App).use(router).mount("#app");


```
5. 新建一个 index.vue 文件作为首页

```javascript
<template>
<div>
  <h1>这是首页</h1>
</div>
</template>

<script>
export default {}
</script>
```

## 5 配置 Babel

1. 执行 npm install --save-dev @babel/core @babel/preset-env babel-loader

2. 修改webpack.config.js 
``` javascript
module.exports = {
  // ...
  module: {
    //...
    rules: [
      // ...
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
```

3. 创建一个 .babelrc 文件在根目录

```javascript
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```
[参考--谈谈babel的preset-env](https://blog.csdn.net/seveneagleline/article/details/107745575)


****

 <font color="blue" size="5">以上是完成了基础的项目运行 ↑</font>

 <font color="blue" size="5">接下来进行webpack的优化 ↓</font>

 
****

## 6 添加build包大小分析 webpack-bundle-analyzer

  参考文章链接 [webpack-bundle-analyzer可视化分析包大小](https://www.jianshu.com/p/77c0b68c9f13)

1. 安装  npm install --save-dev webpack-bundle-analyzer

2. webpack.config.js 中添加配置

``` javascript
//  webpack.config.js 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = { 
  // ...
  plugins: [ 
  // 开启 BundleAnalyzerPlugin 
  new BundleAnalyzerPlugin(), 
      ], 
};   

// 默认配置项
new BundleAnalyzerPlugin({
 //  可以是`server`，`static`或`disabled`。
 //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
 //  在“静态”模式下，会生成带有报告的单个HTML文件。
 //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
 analyzerMode: 'server',
 //  将在“服务器”模式下使用的主机启动HTTP服务器。
 analyzerHost: '127.0.0.1',
 //  将在“服务器”模式下使用的端口启动HTTP服务器。
 analyzerPort: 8888, 
 //  路径捆绑，将在`static`模式下生成的报告文件。
 //  相对于捆绑输出目录。
 reportFilename: 'report.html',
 //  模块大小默认显示在报告中。
 //  应该是`stat`，`parsed`或者`gzip`中的一个。
 //  有关更多信息，请参见“定义”一节。
 defaultSizes: 'parsed',
 //  在默认浏览器中自动打开报告
 openAnalyzer: true,
 //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
 generateStatsFile: false, 
 //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
 //  相对于捆绑输出目录。
 statsFilename: 'stats.json',
 //  stats.toJson（）方法的选项。
 //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
 //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
 statsOptions: null,
 logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
})

```

3. 启动配置

```javascript
// package.json
"analyz": "NODE_ENV=production npm_config_report=true npm run build"
// 运行npm run analyz后打开 127.0.0.1:8888 可以可视化分析包大小信息
```

## 7. 项目结构调整

为了项目的完整可持续发展，对项目目录进行调整。为了方便后续调整文件路径以及路径太长，需要配置一个根目录标识

1. 修改webpack.config.js 中的alias参数

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
}
```

## 9 添加css style sass相关的loder

### 1. 执行 ` npm install --save-dev css-loader style-loader sass-loader sass

### 2. 修改 webpack.config.js 配置

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}

```

### 3. 安装postcss-loader 以及插件示例（厂商前缀添加、px转rem）

    功能：不能简单的把 PostCSS 归类成 CSS 预处理或后处理工具。
    + 1 、CSS 解析成 JavaScript 可以操作的 AST 。 
    + 2、 就是调用插件来处理 AST 并得到结果。
  
  **执行 npm install --save-dev postcss-loader postcss**

<font color="green" size="2">例如1：统一添加厂商前缀添加</font>

  `npm install --save-dev postcss-preset-env`

  ``` diff
  module.exports = {
  module: {
    rules: [
      //...
              {
              test:/\.css$/,
              use:[
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    // 这里可以指定一个 publicPath
                    // 默认使用 webpackOptions.output中的publicPath
                    // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                    // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                    publicPath: './',  
                    // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                    // hmr: devMode, // 仅dev环境启用HMR功能
                  },
                },
                "css-loader",
+                'postcss-loader' 
              ],
              
           }
        ],
      },
    ],
  },
};
  ```

  新增 postcss.config.js 配置文件

```javascript

module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        autoprefixer:{ grid: true },
        browsers: 'last 2 versions' //这里很关键，原先是在package.json里面配置browserslist，但好像无效，花了很多时间，一直不知到问题，后面添加了这个就有效了，应该是browserslist配置的有问题。暂时先不研究了。
      },
    ],
  ],
};
```

<font color="green" size="2">例如2：统一px转rem 或者可以参考 （链接[postcss-px-to-viewport](https://www.cnblogs.com/zhangnan35/p/12682925.html)）,在淘宝flexible github上说’建议大家开始使用viewport来替代此方。‘</font>



  安装$ `npm install postcss postcss-pxtorem --save-dev`

+ 配置postcss.config.js

```javascript

module.exports = {
  plugins: [
  // ...
    [
      "postcss-pxtorem",
      {
        rootValue: 37.5,//表示根元素字体大小
        
        //  unitPrecision: 5,//允许REM单位增长到的十进制数字。
        propList:['*','!font*'],//类似对正则匹配的设置黑白名单
        // selectorBlackList:['body'],//设置白名单的标签或者正则匹配到的选择器
        // minPixelValue:1,//设置要替换的最小像素值。
        // mediaQuery:true,//（布尔）允许在媒体查询中转换px。
        exclude:/node_modules/i//需要忽略的文件路径

      }
    ]
  ],
};
```

[postcss-petorem使用参考链接](https://blog.csdn.net/weixin_51629637/article/details/124660450)

 <font size="2" color="green">其他例子：postcss-sprites（合并雪碧图片）...</font>

### 4. css提取单独的文件 [mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/) 

    本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载

1. 安装 `npm install --save-dev mini-css-extract-plugin`
2. 配置webpack.config.js

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    // ...配置
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

## 10. 资源模块 [官方介绍](https://webpack.js.org/guides/asset-modules/#root)

在webpack5之前对于资源加载一般都是 row-loader，url-loader file-loader
webpack5 拥有asset module type 可以替换4中新的模块类型
- asset/resource  == file-loader
- asset/inline  == url-loader
- asset/source  ==  row-loader
- asset

```javascript
// 
// ...
 module: {
        // noParse: /jquery|lodash/, //可以忽略大型的library可以提高构建性能
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)(\?[a-z0-9]+)?$/,
                type: 'asset/resource',
                parser:{
                  dataUrlCondition:{
                    maxSize: 10 * 1024,//小10KB的资源以内联base64的形式（默认）
                  }
                }
            },
            // ...
        ]
 }
```
参考[webpack5.0中打包css背景图片生成重复，不能显示的问题考究](https://blog.csdn.net/Coralpapy/article/details/119419137)

## 11. 区分开发环境和生产环境

+ 执行 `npm install --save-dev cross-env` cross-env 可以跨平台设置使用环境变量
+ 执行 `npm install --save-dev webpack-merge` webpack-merge可以便捷的合并webpack的配置

将原先的webpack.config.js 拆分到 webpack.common.js 、 webpack.config.dev.js 、 webpack.config.prod.js 
通过配置package.js中的环境变量执行不同的webpack配置，实现分环境打包

## 12. 打包速度优化

+ 1. **设置缓存cache** webpack5 可以通过cache 特性来将webpack工作缓存到硬盘中。存放的路径为node_modules/.cache/webpack

<font color="red" size="3"> 构建速度优化接近90%</font>

webpack5 其实就是内置了插件[HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin)

webpack4如果要使用可以参考文档进行配置 HardSourceWebpackPlugin

webpack3一直使用的是dll的方式进行提取第三方库代码，内置插件DllPlugin和DllReferencePlugin



```javascript
// webpack.config.js
module.exports = { 
  cache: {
    // 1. 将缓存类型设置为文件系统
    type: 'filesystem', // 默认是memory
    // 2. 将缓存文件夹命名为 .temp_cache,
    // 默认路径是 node_modules/.cache/webpack
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    
  }
}
// 没加这个配置build时间：9000ms
// 加上这个配置后首次build时间： 9700ms
// 后续重新build时间：765ms

// npm run dev 5486ms => 1312ms
```
[参考文档-深度解析webpack5持久化缓存](https://segmentfault.com/a/1190000041726881)
[参考文档-Webpack 性能系列一: 使用 Cache 提升构建性能](https://zhuanlan.zhihu.com/p/412694420)

+ 2. dll 在webpack5出来之后，基本可以不用考虑。即将过时。

+ 3.  **多进程进行构建loader**

通过 thread-loader 将耗时的 loader 放在一个独立的 worker 池中运行，加快 loader 构建速度。

执行`npm i -D thread-loader`

``` javascript
module.exports = {
  rules: [
    {
      test: /\.module\.(scss|sass)$/,
      include: paths.appSrc,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 2,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [["postcss-preset-env"]],
            },
          },
        },
        {
          loader: "thread-loader",
          options: {
            workerParallelJobs: 2,
            // webpack 官网 提到 node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs: 2。
          },
        },
        "sass-loader",
      ].filter(Boolean),//过滤掉为undefined的plugin
    },
  ],
};
```

**需要注意的是适用于项目较大的项目，小项目没必要，因为启动耗时的时间可能比节省的时间还多**

**happypack happypack 同样是用来设置多线程，但是在 webpack5 就不要再使用 happypack 了，官方也已经不再维护了，推荐使用上文介绍的 thread-loader。**



+ 4. 指定include

  为 loader 指定 include，减少 loader 应用范围，仅应用于最少数量的必要模块，。
  

```javascript
module.exports = {
  rules: [
    {
      test: /\.(js|ts|jsx|tsx)$/,
      include: paths.appSrc,
      use: [
        {
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "es2015",
          },
        },
      ],
    },
  ],
};
```

## 13. 打包后项目的加载优化

+ 按需加载
+ 浏览器缓存
+ CDN

1. 按需加载

webpack提供import()语法 动态导入功能进行代码分离，通过按需加载提升网页加载速度

```javascript
export default function App() {
  return (
    <div>
      hello react 111
      <Hello />
      <button onClick={() => import("lodash")}>加载lodash</button>
    </div>
  );
}
```

2. 浏览器缓存

webpack 支持根据资源内容，创建 hash id，当资源内容发生变化时，将会创建新的 hash id。

```javascript
// webpack.common.js
module.exports = {
  // 输出
  output: {
    // 仅在生产环境添加 hash //开发环境不配置原因:开发环境有热更新，如果有hash值的话，会刷新页面
    filename: ctx.isEnvProduction
      ? "[name].[contenthash].bundle.js"
      : "[name].bundle.js",
  },
  plugins: [
    // 提取 CSS
     new MiniCssExtractPlugin({
        // 这里的配置和webpackOptions.output中的配置相似
        // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
        filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
        chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
      }),
  ],
};


//webpack.prod.js
module.exports = {
  optimization: {
    moduleIds: "deterministic", //
  },
};


```

+ [浅谈 hash、chunkhash 和 contenthash 的区别](https://markdowner.net/skill/215456072994000896)

3. CDN

将所有的静态资源，上传至 CDN，通过 CDN 加速来提升加载速度。


```javascript
export.modules = {
output: {
    publicPath: ctx.isEnvProduction ? 'https://xxx.com' : '', // CDN 域名
  },
}
```

## 14.减小打包后体积

+ 代码压缩 js压缩\  css压缩
+ 代码分离 css分离\ js抽离公共\ entry chunk
+ 树摇 cdn

### 1. 代码压缩

#### - js 压缩

使用 [TerserWebpackPlugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/) 来压缩 JavaScript。

webpack5 自带最新的 terser-webpack-plugin，无需手动安装。

terser-webpack-plugin 默认开启了 parallel: true 配置，并发运行的默认数量： os.cpus().length - 1 ，本文配置的 parallel 数量为 4，使用多进程并发运行压缩以提高构建速度。

如果需要自定义配置，还是需要安装 terser-webpack-plugin

` npm install terser-webpack-plugin --save-dev`

```javascript
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      //...
    })],
  },
};

// ParallelUglifyPlugin 它可以帮助我们多进程压缩 JS，webpack5 的 TerserWebpackPlugin 默认就开启了多进程和缓存，无需再引入 ParallelUglifyPlugin。

```

+ compression-webpack-plugin [compression-webpack-plugin](https://webpack.js.org/plugins/compression-webpack-plugin/#root)

   是否开启Gzip压缩。nginx上需要对Gzip进行相关配置

   [参考文档](https://blog.csdn.net/weixin_42662753/article/details/122538615s)

```javascript
const CompressionWebpackPlugin = require("compression-webpack-plugin");

plugins: [
  new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
```

#### 2. css压缩

+ [CssMinimizerWebpackPlugin](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/#root)

   执行 `npm install css-minimizer-webpack-plugin --save-dev`

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```


### 2. 代码分离

#### 1 抽离重复代码

  代码分离能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，可以缩短页面加载时间。

+ 抽离重复代码 开箱即用[SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin)

将公共的模块单独打包，不再重复引入，效果如下：

```javascript
// webpack.prod.js 配置方式如下：
module.exports = {
  // ...
   optimization: {
      splitChunks: {
        chunks: 'all',//all,async,initial 三个参数区别参考https://blog.csdn.net/qq_41887214/article/details/124527169
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
}

```

**官方建议name值选择不填，默认是true**


#### 2 css文件分离

  MiniCssExtractPlugin 插件将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

前面已经有提到过改插件的使用

**注意：MiniCssExtractPlugin.loader 要放在 style-loader 后面。**

#### 3 最小化entry chunk

  通过配置 optimization.runtimeChunk = true，为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。

```javascript

module.exports = {
    optimization: {
        runtimeChunk: true,
      },
    };
}
```

### 3. Three Shaking (树摇) ---将没有用到的Dead Code 代码不进行打包


#### 1. js

  Dead Code 一般具有以下几个特征：

- 代码不会被执行，不可到达；
- 代码执行的结果不会被用到；
- 代码只会影响死变量（只写不读）

##### 1 配置package.js "sideEffects"

开启production环境就会自动启动tree shaking即 sideEffects:false(代表所有文件无副作用)

需要注意的是当sideEffect:false时 **这可能会把css / @babel/polyfill （副作用）等文件干掉**

所以一般需要配置一些有副作用的文件，或者后缀

```javascript
// ...
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
// ...

```

 ##### 2. 对组件库引用的优化

  webpack5 sideEffects 只能清除无副作用的引用，而有副作用的引用则只能通过优化引用方式来进行 Tree Shaking。

+ **lodash**

类似 import { throttle } from 'lodash' 就属于有副作用的引用，会将整个 lodash 文件进行打包。

优化方式是使用 import { throttle } from 'lodash-es' 代替 import { throttle } from 'lodash'

lodash-es 将 Lodash 库导出为 ES 模块，支持基于 ES modules 的 tree shaking，实现按需引入。

+  **ant-design**

ant-design 默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 import { Button } from 'antd' 就会有按需加载的效果。

假如项目中仅引入少部分组件，import { Button } from 'antd' 也属于有副作用，webpack 不能把其他组件进行 tree-shaking。这时可以缩小引用范围，将引入方式修改为 import { Button } from 'antd/lib/button' 来进一步优化。


#### 2. CSS

使用 [purgecss-webpack-plugin](https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin) 对 CSS Tree Shaking。

[相关配置介绍官网](https://purgecss.com/configuration.html)

[purgeCSS中文文档地址](https://www.purgecss.cn/)

  执行 `npm i purgecss-webpack-plugin -D`

因为打包时 CSS 默认放在 JS 文件内，因此要结合 webpack 分离 CSS 文件插件 mini-css-extract-plugin 一起使用，先将 CSS 文件分离，再进行 CSS Tree Shaking。

``` javascript
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
  plugins:[
    // ...
      new PurgeCSSPlugin({
        paths: purgeFiles,
        content: [ `../public/**/*.html`, `../src/**/*.vue` ],
        defaultExtractor (content) {
          const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
          return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
        },
         safelist: [ /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/ ],
      })
  ]
}

```

**需要注意的是**：
 + <font size="4" color="red">1、对应的vue、react在官网有对应的插件配置，不然会树摇掉有用的css.</font>
 + <font size="4" color="red">2、插件需要配合MiniCssExtractPlugin</font>



#### 3. CDN

这里单纯为了减小包体积，进行将大的图片、字体等资源压缩上传至CDN来减小服务器压力

另外一种为了加快加载速度的CDN方式在前面已经提到过了


## 15. 环境变量获取，全局变量设置等webpack工具

+ [dotenv](https://www.npmjs.com/package/dotenv)

安装： `npm install dotenv --save`

介绍： 环境变量加载工具

使用：

```javascript
// .env
// VUE_APP_BINGMAP_KEYS=ApGt6MdeC3ZVLFu3jwf6vOax4gk4iatUgPeiQuodLXu_PPeWsXRp672eWPMpUpaL
// VUE_APP_TASERVERURL=199f9f62e86a9048bace6a5eee63a995


const dotenv = require('dotenv').config({path:'.env'})
console.log('process',process) //process.env 对象中会混合.env中定义的变量VUE_APP_BINGMAP_KEYS,VUE_APP_TASERVERURL
console.log('dotenv',dotenv)//
// dotenv {
//   parsed: {
//     VUE_APP_BINGMAP_KEYS: 'ApGt6MdeC3ZVLFu3jwf6vOax4gk4iatUgPeiQuodLXu_PPeWsXRp672eWPMpUpaL',
//     VUE_APP_TASERVERURL: '199f9f62e86a9048bace6a5eee63a995'
//   }
// }
```

+ [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)

执行：Webpack5自带

介绍： DefinePlugin 允许创建一个在编译时可以配置的全局常量

使用： 

``` javascript
// 原先记得在项目js中直接可以访问到process.env。但貌似webpack5搭建的项目直接访问是undefined。
// 原因 webpack5 相较 wp4 取消了内置的 polyfill （如 process 等）
    new webpack.DefinePlugin({
        // Definitions...
        APP_ENV: JSON.stringify(process.env),
        APP_CUSTON:"我是全局变量"
      }),
```
[浅谈webpack5自动注入环境polyfill的策略](https://blog.csdn.net/qq_21567385/article/details/122672476)文章中介绍了另一种方法，实现项目js中可以访问process, 感觉可行，暂时没试


+ [ProvidePlugin](https://webpack.docschina.org/plugins/provide-plugin/#root)

执行: Webpack5自带

介绍：webpack配置ProvidePlugin后，在使⽤时将不再需要import和require进⾏引⼊，直接使⽤即可

使用：

```javascript
// webpack.config.js
module.export = {
  // ...
  plugins: [
    // ...
    // 相当于自动require，并且在项目全局可以用别名identifier，进行使用
    new webpack.ProvidePlugin({
            api: [path.join(__dirname, '../src/assets/js/utils.js'), 'default'],
            // identifier: 'module1',
            // identifier: ['module1', 'property1'],
    })
  ]
}

// xxx.js
api()//...可以直接使用
```

+ alias  DefinePlugin ProvidePlugin 三者区别

- alias: 只是单纯的别名，可以理解 ：为文件目录配置一个别名

- DefinePlugin： 定义全局变量，应用场景主要是配置不同的环境区别（生产、测试、debug等）

- ProvidePlugin: 提供全局的变量，在模块中使用无需用require引入




## 16. 手写Plugins

## 17. 手写Loader(加载器)

参考文档 --- [揭秘webpack loader](https://zhuanlan.zhihu.com/p/104205895)

Loader概述：
  webpack 只能直接处理 javascript 格式的代码。任何非 js 文件都必须被预先处理转换为 js 代码，才可以参与打包。loader（加载器）就是这样一个代码转换器。它由 webpack 的 `loader runner` 执行调用，接收原始资源数据作为参数（当多个加载器联合使用时，上一个loader的结果会传入下一个loader），最终输出 javascript 代码（和可选的 source map）给 webpack 做进一步编译。

  个人通俗理解就是加载源文件 字符串，转化为需要的字符串

+ 如何创建自定义loader

  - 1. 全局替换字符串 

loader 是一个导出一个函数的 node 模块。
```javascript
// webpack.config.js
module.exports = {
  // ...
  module:{
    rules:[
       {
                test: /\.vue$/,
                use: [
                  {
                    loader: 'vue-loader',
                  },
                  {
                    loader:path.resolve(__dirname, "../src/loader/namereplace") // 使用 path 模块找到 hxkj-loader 的路径
                  },
                ],
            },
    ]
  }
}
// namereplace.js
module.exports = function(source){
  var content="";
  console.log('content1',source)
  content = source.replace(/页面/g,"「页面」");
  // console.log('content2',content)
  return content; 
}

```

  - 2. 实现style-loader




## 参考文档

+ [学习 Webpack5 之路（优化篇）](https://zhuanlan.zhihu.com/p/406222865)
+ [🔥【万字】透过分析 webpack 面试题，构建 webpack5.x 知识体系](https://juejin.cn/post/7023242274876162084)