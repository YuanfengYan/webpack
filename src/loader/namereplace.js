/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-06-22 17:18:34
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-06-22 18:54:46
 */
module.exports = function(source){
  var content="";
  console.log('content1',source)
  content = source.replace(/页面/g,"「页面」");
  // console.log('content2',content)
  return content; 
}
module.exports.pitch = function(remainingRequest,x,data){
  console.log('remainingRequest',remainingRequest)
  // return data
}