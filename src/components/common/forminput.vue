<template>
	<div class="forminput">
		<span class="title">{{ formStyle.label }}</span>
		<span class="remark">{{ formStyle.remark }}</span>
    <el-input v-model="formInput.input"></el-input>
	</div>
</template>

<script>
  export default{
    name: 'forminput',
    props: ['formStyle', 'formInput']
  }
</script>

<style>
.forminput{
  width: 100%;
  margin-bottom: 5px;
}
.forminput .title{
  line-height: 40px;
}
.forminput .el-input__inner{
  height: 36px;
  border-color: #d9d9d9;
}
.forminput .el-input__inner:hover{
  border-color: #99A9BF;
}
.forminput .el-input__inner:focus{
  border-color: #99A9BF;
}
.forminput .el-input{
  display: block;
}
</style>
