<template>
  <div class="formtextarea">
    <span class="title">{{ formStyle.label }}</span>
    <span class="remark">{{ formStyle.remark }}</span>
    <el-input type="textarea" :autosize="{ minRows: formStyle.minrows, maxRows: formStyle.maxrows}" v-model="formInput.input"></el-input>
  </div>
</template>

<script>
  export default{
    name: 'formtextarea',
    props: ['formStyle', 'formInput']
  }
</script>
<style>
.formtextarea{
  width: 100%;
  margin-bottom: 7px;
}
.formtextarea .title{
  line-height: 40px;
}
.formtextarea .el-textarea__inner{
  border-color: #d9d9d9;
  resize:none;
  font-family: "黑体";
  font-size: 14px;
  line-height: 20px;
}
.formtextarea .el-textarea__inner:hover{
  border-color: #99A9BF;
}
.formtextarea .el-textarea__inner:focus{
  border-color: #99A9BF;
}
.formtextarea .el-textarea{
  display: block;
}
</style>
