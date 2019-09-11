<template>
	<div class="departmentitem">
		<div class="dep-header" :class="{ headerfocus: departmentInfo.show }">
      <el-input v-model="departmentInfo.name" v-show="editable" @change="changeName" @blur="editName" :autofocus="true"></el-input>

			<a href="javascript:void(0)" class="name" v-show="!editable" @click="showContent">{{ departmentInfo.name }}</a>
      <a href="javascript:void(0)"><i class="el-icon-edit" @click="editName" v-show="departmentInfo.show"></i></a>
      <span class="error" v-show="isempty && departmentInfo.show">Department name can not be empty</span>
      <span class="error" v-show="isdefault && departmentInfo.show">Please modify department name</span>
			<a href="javascript:void(0)" class="delete" v-show="departmentInfo.id!=='-1'" v-on:click="deleteItem">Delete</a>
		</div>
    <transition name="expand">
  		<div class="dep-content" v-show="departmentInfo.show">
  			<div>
          <el-form :model="departmentInfo" ref="intro">
            <el-form-item prop="introduction.input" :rules="{required: true, message: 'Department introduction can not be empty', trigger: 'blur'}">
  				    <formtextarea :formStyle="departmentintro" :formInput="departmentInfo.introduction"></formtextarea>
            </el-form-item>
          </el-form>
  				<div class="tips">
  	      	<span>Tips:&nbsp;&nbsp;No more than 15 lines</span>
  	    	</div>
  			</div>
      	<div style="margin-left:13px;margin-top:7px">
          <span class="title">Image* (9:16)</span>
          <div class="wrapper">
            <p @click="addDepartPicture">Change Image</p>
            <img style="width:114px;height:190px;" @click="addDepartPicture" :src="departmentInfo.image">
            </img>
          </div>
      		<greenbutton name="Save" v-on:submit="submitForm('intro')"></greenbutton>
      	</div>
  		</div>
    </transition>
	</div>
</template>

<script>
import formtextarea from '../common/formtextarea'
import greenbutton from '../common/greenbutton'
import { Message, Loading } from 'element-ui'
import departmentAPI from '../../api/department'
import * as RES_STATUS from '../../api/util'

export default{
  name: 'departmentitem',
  components: {
    formtextarea,
    greenbutton
  },
  data () {
    return {
      editable: false,
      isempty: false,
      isdefault: false,
      image_file: {name: ''}
    }
  },
  props: ['departmentInfo'],
  computed: {
    departmentintro () {
      return {
        label: 'Introduction*',
        input: this.departmentInfo.introduction.input,
        minrows: 9,
        maxrows: 9
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (this.departmentInfo.name === 'Add Department') {
          this.isdefault = true
        }
        if (valid && !this.isempty && !this.isdefault) {
          if (this.departmentInfo.id === '-1') {
            this.$emit('add')
          } else {
            var deptLoading = Loading.service()
            var formData = new FormData()
            formData.append('dept_id', this.departmentInfo.id)
            formData.append('name', this.departmentInfo.name)
            formData.append('introduction', this.departmentInfo.introduction.input)
            if (this.departmentInfo.image.split(':')[0] === 'data') {
              formData.append('image', this.base64ToFile(this.departmentInfo.image, 'image'))
            }
            departmentAPI.putDept(this, formData).then((res) => {
              deptLoading.close()
              if (res.status === RES_STATUS.SUCCESS) {
                Message({
                  message: 'Modify successfully',
                  type: 'success',
                  showClose: true
                })
              } else {
                if (res.status === RES_STATUS.SHOW_CUSTOM_MESSAGE) {
                  var errorMsg = ''
                  switch (res.msg.hint) {
                    case 'name':
                      errorMsg = 'Department name'
                      break
                    case 'image':
                      errorMsg = 'Department image'
                      break
                    case 'introduction':
                      errorMsg = 'Department introduction'
                      break
                    default: errorMsg = 'Department information'
                  }
                  Message({
                    message: errorMsg + 'is error, please modify and try again',
                    type: 'error',
                    showClose: true
                  })
                } else if (res.status === RES_STATUS.SERVER_ERROR) {
                  Message({
                    message: 'Server error',
                    type: 'error',
                    showClose: true
                  })
                } else if (res.status === RES_STATUS.NOT_FOUND) {
                  Message({
                    message: 'Page does not exist',
                    type: 'error',
                    showClose: true
                  })
                } else {
                  Message({
                    message: 'Unknown mistake',
                    type: 'error',
                    showClose: true
                  })
                }
              }
            }).catch((err) => {
              deptLoading.close()
              Message({
                message: 'Server error',
                type: 'error'
              })
              console.error(err)
            })
          }
        } else {
          Message({
            message: 'Information is error, please modify and try again',
            type: 'error',
            showClose: true
          })
          return false
        }
      })
    },
    showContent () {
      this.departmentInfo.show = !this.departmentInfo.show
      if (this.departmentInfo.name === 'Add Department' && this.departmentInfo.show === true && this.departmentInfo.id === '-1') {
        this.departmentInfo.name = ''
        this.editable = true
      }
    },
    changeName () {
      if (this.departmentInfo.name === '') {
        this.isempty = true
      }
      if (this.departmentInfo.name !== 'Add Department') {
        this.isdefault = false
      }
      if (this.departmentInfo.name !== '') {
        this.isempty = false
      }
    },
    editName () {
      if (this.departmentInfo.id === '-1' && this.editable === true && this.departmentInfo.name === '') {
        this.departmentInfo.name = 'Add Department'
        this.editable = false
        this.isempty = false
      } else if (this.editable === false) {
        this.editable = true
      } else if (!this.isempty) {
        this.editable = false
      }
    },
    deleteItem () {
      this.$emit('delete', this.departmentInfo.id)
    },
    addDepartPicture () {
      this.$emit('addPicture', this.departmentInfo.id)
    }
  }
}
</script>

<style>
.departmentitem{
  width: 100%;
}
.departmentitem .dep-header{
  height: 42px;
  border-bottom: 1px solid #dddddd;
}
.departmentitem .dep-header .error{
  color: #ff4949;
  font-size: 12px;
  line-height: 43px;
  padding-left: 10px;
}
.departmentitem .dep-header a{
  font-size: 13px;
  line-height: 42px;
}
.departmentitem .dep-header .el-input{
  margin-top: 5px;
  width: 150px;
  margin-left: 11px;
  float: left;
}
.departmentitem .dep-header .el-input .el-input__inner{
  height: 30px;
  font-size: 13px;
  font-family: "微软雅黑";
}
.departmentitem .dep-header .el-input .el-input__inner:hover{
  border-color: #99A9BF;
}
.departmentitem .dep-header .el-input .el-input__inner:focus{
  border-color: #99A9BF;
}
.headerfocus{
  background-color: #f7f7f7;
}
.departmentitem .dep-content{
  height: 298px;
  border-bottom: 1px solid #dddddd;
  margin-top: -1px;
}
.departmentitem .dep-content>div{
  float: left;
}
.departmentitem .tips{
  margin-left: 13px;
}
.departmentitem .greenbutton{
  margin-top: 14px;
  float: right;
}
.departmentitem .dep-header a{
  font-size: 13px;
  line-height: 42px;
}
.departmentitem .name{
  margin-left: 21px;
  color: #353638;
}
.departmentitem .name:hover{
  text-decoration: underline;
}
.departmentitem i{
  margin-left: 11px;
  font-size: 9px;
  line-height: 42px;
  color: #cdcdcd;
}
.departmentitem .delete{
  float: right;
  color: #cacaca;
  position: absolute;
  left: 88%;
}
.departmentitem .title{
  line-height: 40px;
  margin-left: 0px;
}
.departmentitem .formtextarea{
  width:510px;
  float:left;
  margin-left:18px;
  margin-top:7px;
}
.departmentitem .el-form-item__error{
  padding-left: 20px;
  line-height: 15px;
}
.departmentitem .dep-content .wrapper{
  width:114px;
  height:190px;
}
.departmentitem .dep-content .wrapper p{  
  line-height: 190px; 
  font-size: 20px; 
}
</style>
