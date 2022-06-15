/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-07 20:46:28
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-15 19:01:27
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";

import { createApp } from "vue";
import App from './app.vue'
import About from '@/views/about.vue'
import "@/utils/rem.js"

const routes =  [
  {
  path: "/",
  name: "index",
  component:  () => import('@/views/index.vue') 
  },
  {
  path: "/about",
  name: "about",
  component:  About
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  mode: "hash",
  routes: routes
});

console.log('a',APP_ENV)
createApp(App).use(router).mount("#app");

