<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-07 21:05:34
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-13 19:54:03
-->

<template>
<div>
  <h1>这是首页</h1>
  <div class="divA">123</div>
  <div class="warp">
    <img src="../views/images/ai.png" alt=""/>
    <img src="../views/images/luan.jpeg" alt=""/>
    <div class="bg1">背景1</div>
    <div class="bg2">背景132</div>
  </div>
</div>
</template>

<script>
  // import style from  './index.css';
console.log('222')
export default {
  data(){
    return {
      name:11
    }
  }
}
</script>
 <style lang="css" src="./index.css"  scoped>

 </style>
 <style lang="css"  scoped>
 .divA{
  transform: translate(100px);
  display: flex;
  display: grid;
  color: blue;
}
.bg1{
  width: 100px;
  height:100px;
  background-image: url("../views/images/bt.png");
}

</style>