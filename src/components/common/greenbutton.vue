<template>
	<div class="greenbutton">
		<el-button type="primary" v-on:click="submit">{{ name }}</el-button>
	</div>
</template>

<script>
  export default{
    name: 'greenbutton',
    props: ['name'],
    methods: {
      submit: function () {
        this.$emit('submit')
      }
    }
  }
</script>

<style>
.greenbutton .el-button{
  border-color: #42af46;
  background-color: #42af46;
  color: #fff;
  width: 77px;
  height: 31px;
  font-size: 12px;
  line-height: 0px;
  border-radius: 3px;
}
.greenbutton .el-button:hover{
  background-color: #5bb85d;
}
.greenbutton .el-button:focus{
  background-color: #5bb85d;
}
</style>
