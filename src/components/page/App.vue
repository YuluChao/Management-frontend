<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
  padding: 0;
  margin: 0;
  height: 100%;
}
body {
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: '微软雅黑';
}
p,ul,li {
  padding: 0;
  margin: 0;
}
#app {
  color: #3b3c3e;
  width: 100%;
  height: 100%;
}
span, p{
  font-family: '微软雅黑';
}
a {
  color: #37383a;
  text-decoration: none;
  font-family: '微软雅黑';
}
/* 提醒文字 */
.tips {
  color: #82898f;
  font-size: 11px;
  width: 100%;
  line-height: 20px;
  margin-bottom: 10px;
  margin-top: 13px;
}
.tips span{
  margin-right: 5px;
  margin-left: 8px;
}
.tips p{
  display: inline-block;
}
.title{
  color: #34383b;
  font-size: 13px;
  font-weight: bold;
  margin-left: 3px;
}
.remark{
  color: #8b929a;
  font-size: 10px;
  margin-left: 7px;
}
/* select样式 */
.el-select-dropdown__item.selected.hover{
  background-color: #ff710f;
}
.el-select-dropdown__item.selected {
  color: #fff;
  background-color: #ff710f;
}
.el-select-dropdown__item{
  font-size: 12px;
}
.el-form-item{
  margin-bottom: 0px;
}
.el-form-item__error{
  position: static;
  padding-left: 3px;
}
.el-message{
  min-width: 400px;
}
.wrapper{
  position:relative;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}
.wrapper p{
  position:absolute;
  width: 100%;
  color: #fff;
  text-align: center;
  visibility: hidden;
}
.wrapper:hover p{
  visibility: visible;
  background-color: rgba(0,0,0,0.3);
  cursor: default;
}
</style>
