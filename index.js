/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-07 20:46:28
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-10 11:04:28
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";

import { createApp } from "vue";
import App from './app.vue'

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
  component:  () => import('@/views/about.vue') 
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  mode: "hash",
  routes: routes
});
createApp(App).use(router).mount("#app");

