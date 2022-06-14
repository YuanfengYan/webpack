<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-07 21:05:34
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-14 19:05:23
-->

<template>
<div>
  <h1>这是首页2</h1>
  <div class="divA">??{{a}}</div>
  <div class="warp">
    <img src="../views/images/ai.png" alt=""/>
    <img src="../views/images/luan.jpeg" alt=""/>
    <div class="bg1">背景1</div>
    <div class="bg2">背景132</div>
  </div>
</div>
</template>

<script>
import lodash from "lodash"
export default {
  data(){
    return {
      name:11
    }
  },
  setup(props) {
    const arr1 = [1,2,3,4]
    let a = lodash.findIndex(arr1,(item)=>{
      return item==2
    })
    console.log('a',a)
    return {
      a
    }
  }
}
</script>
 <style lang="css" src="./index.css"  scoped></style>
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