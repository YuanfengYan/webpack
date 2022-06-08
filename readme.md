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

