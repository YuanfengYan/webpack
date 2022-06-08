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

