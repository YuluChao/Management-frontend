<template>
	<div class="activityitem">
		<div class="act-header" :class="{ headerfocus: activityInfo.show }">
			<el-input v-model="activityInfo.name" v-show="editable" @change="changeName" @blur="editName" :autofocus="true"></el-input>

      <a href="javascript:void(0)" class="name" v-show="!editable"  @click="showContent">{{ activityInfo.name }}</a>

			<i class="el-icon-edit" @click="editName" v-show="activityInfo.show"></i>

      <span class="error" v-show="isempty && activityInfo.show">Activity Name can not be empty</span>
      <span class="error" v-show="isdefault && activityInfo.show">Please modify activity name</span>

			<a href="javascript:void(0)" class="delete" v-show="activityInfo.id!=='-1'" @click="deleteItem">Delete</a>
		</div>

    <transition name="expand">
  		<div class="act-content" v-show="activityInfo.show">
        <div class="top">
          <el-form :model="activityInfo" ref="activityInfo">
            <el-form-item>
              <forminput :formStyle="activitytag" :formInput="activityInfo.tag"></forminput>
            </el-form-item>
            <el-form-item prop="introduction.input" :rules="{required: true, message: 'Activity introduction can not be empty', trigger: 'blur'}">
              <formtextarea :formStyle="activityintro" :formInput="activityInfo.introduction" style="margin-top:-5px"></formtextarea>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom">
          <div style="float:left">
            <span class="title">Image* (16:9)</span>
            <div class="wrapper">
              <p @click="addActPicture">Change Image</p>
              <img style="width:260px;height:150px;" @click="addActPicture" :src="activityInfo.image">
              </img>
            </div> 
          </div>
          <greenbutton name="Save" v-on:submit="submitForm('activityInfo')"></greenbutton>
        </div>
  		</div>
    </transition>
	</div>
</template>

<script>
import formtextarea from '../common/formtextarea'
import greenbutton from '../common/greenbutton'
import forminput from '../common/forminput'
import { Message, Loading } from 'element-ui'
import activityAPI from '../../api/activity'
import * as RES_STATUS from '../../api/util'

export default{
  name: 'activityitem',
  components: {
    formtextarea,
    greenbutton,
    forminput
  },
  data () {
    return {
      editable: false,
      isempty: false,
      isdefault: false,
      image_file: {name: ''}
    }
  },
  props: ['activityInfo'],
  computed: {
    activityintro () {
      return {
        label: 'Introduction*',
        input: this.activityInfo.introduction.input,
        minrows: 5,
        maxrows: 9
      }
    },
    activitytag () {
      return {
        label: 'Custom Tag',
        remark: 'Displayed after the activity',
        input: this.activityInfo.tag.input
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (this.activityInfo.name === 'Add Activity') {
          this.isdefault = true
        }
        if (valid && !this.isempty && !this.isdefault) {
          if (this.activityInfo.id === '-1') {
            this.$emit('add')
          } else {
            var activityLoading = Loading.service()
            var formData = new FormData()
            formData.append('activity_id', this.activityInfo.id)
            formData.append('name', this.activityInfo.name)
            formData.append('tag', this.activityInfo.tag.input)
            formData.append('introduction', this.activityInfo.introduction.input)
            if (this.activityInfo.image.split(':')[0] === 'data') {
              formData.append('image', this.base64ToFile(this.activityInfo.image, 'image'))
            }
            activityAPI.putActivity(this, formData).then((res) => {
              activityLoading.close()
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
                      errorMsg = 'Activity name'
                      break
                    case 'image':
                      errorMsg = 'Activity image'
                      break
                    case 'introduction':
                      errorMsg = 'Activity introduction'
                      break
                    case 'tag':
                      errorMsg = 'Activity tag'
                      break
                    default: errorMsg = 'Activity information'
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
              activityLoading.close()
              Message({
                message: 'Server error',
                type: 'error',
                showClose: true
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
      this.activityInfo.show = !this.activityInfo.show
      if (this.activityInfo.name === 'Add Activity' && this.activityInfo.show === true && this.activityInfo.id === '-1') {
        this.activityInfo.name = ''
        this.editable = true
      }
    },
    changeName () {
      if (this.activityInfo.name === '') {
        this.isempty = true
      }
      if (this.activityInfo.name !== 'Add Activity') {
        this.isdefault = false
      }
      if (this.activityInfo.name !== '') {
        this.isempty = false
      }
    },
    editName () {
      if (this.activityInfo.id === '-1' && this.editable === true && this.activityInfo.name === '') {
        this.activityInfo.name = 'Add Activity'
        this.editable = false
        this.isempty = false
      } else if (this.editable === false) {
        this.editable = true
      } else if (!this.isempty) {
        this.editable = false
      }
    },
    deleteItem () {
      this.$emit('delete', this.activityInfo.id)
    },
    addActPicture () {
      this.$emit('addPicture', this.activityInfo.id)
    }
  }
}
</script>

<style>
.activityitem{
  width: 100%;
}
.activityitem .act-header{
  height: 42px;
  border-bottom: 1px solid #dddddd;
}
.activityitem .act-header .error{
  color: #ff4949;
  font-size: 12px;
  line-height: 43px;
  padding-left: 10px;
}
.headerfocus{
  background-color: #f7f7f7;
}
.activityitem .act-header a{
  font-size: 13px;
  line-height: 42px;
}
.activityitem .act-header .el-input{
  margin-top: 5px;
  width: 150px;
  margin-left: 11px;
  float: left;
}
.activityitem .act-header .el-input .el-input__inner{
  height: 30px;
  font-size: 13px;
  font-family: "微软雅黑";
}
.activityitem .act-header .el-input .el-input__inner:hover{
  border-color: #99A9BF;
}
.activityitem .act-header .el-input .el-input__inner:focus{
  border-color: #99A9BF;
}
.activityitem .name{
  float: left;
  margin-left: 21px;
  color: #353638;
}
.activityitem .name:hover{
  text-decoration: underline;
}
.activityitem i{
  float: left;
  margin-left: 11px;
  font-size: 9px;
  line-height: 42px;
  color: #cdcdcd;
}
.activityitem .delete{
  float: right;
  color: #cacaca;
  position: absolute;
  left: 88%;
}
.activityitem .act-content{
  width: 100%;
  border-bottom: 1px solid #dddddd;
}
.activityitem .act-content>div{
  width: 637px;
  margin: 0 auto;
}
.activityitem .act-content .bottom{
  margin-top: 5px;
  height: 200px;
}
.activityitem .greenbutton{
  float: right;
  margin-top: 151px;
}
.expand-enter-active {
  max-height: 500px;
  overflow: hidden;
  transition: all .5s ease;  
}
.expand-enter{
  max-height: 0;
}
.expand-leave-active {
  transition: all .5s ease;
  max-height: 0px;
  overflow: hidden;
}
.expand-leave {
  max-height: 500px;
}
.activityitem .bottom .wrapper{
  width:260px;
  height:150px;
  margin-top:9px;
}
.activityitem .bottom .wrapper p{  
  line-height: 150px; 
  font-size: 21px; 
}
</style>

