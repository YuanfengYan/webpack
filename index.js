/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-07 20:46:28
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-08 14:10:52
 */
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
  },
  {
  path: "/about",
  name: "about",
  component:  () => import('./about.vue') 
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  mode: "hash",
  routes: routes
});
createApp(App).use(router).mount("#app");

