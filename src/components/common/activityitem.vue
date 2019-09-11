<template>
	<div class="activityitem">
		<div class="act-header" :class="{ headerfocus: activityInfo.show }">
			<el-input v-model="activityInfo.name" v-show="editable" @change="changeName" @blur="editName" :autofocus="true"></el-input>

      <a href="javascript:void(0)" class="name" v-show="!editable"  @click="showContent">{{ activityInfo.name }}</a>

			<i class="el-icon-edit" @click="editName" v-show="activityInfo.show"></i>

      <span class="error" v-show="isempty && activityInfo.show">活动名称不能为空</span>
      <span class="error" v-show="isdefault && activityInfo.show">请修改活动名称</span>

			<a href="javascript:void(0)" class="delete" v-show="activityInfo.id!=='-1'" @click="deleteItem">删除</a>
		</div>

    <transition name="expand">
  		<div class="act-content" v-show="activityInfo.show">
        <div class="top">
          <el-form :model="activityInfo" ref="activityInfo">
            <el-form-item>
              <forminput :formStyle="activitytag" :formInput="activityInfo.tag"></forminput>
            </el-form-item>
            <el-form-item prop="introduction.input" :rules="{required: true, message: '活动介绍不能为空', trigger: 'blur'}">
              <formtextarea :formStyle="activityintro" :formInput="activityInfo.introduction" style="margin-top:-5px"></formtextarea>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom">
          <div style="float:left">
            <span class="title">活动图片(16:9)</span>
            <div class="wrapper">
              <p @click="addActPicture">更换图片</p>
              <img style="width:260px;height:150px;" @click="addActPicture" :src="activityInfo.image">
              </img>
            </div> 
          </div>
          <greenbutton name="保 存" v-on:submit="submitForm('activityInfo')"></greenbutton>
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
        label: '活动介绍*',
        input: this.activityInfo.introduction.input,
        minrows: 5,
        maxrows: 9
      }
    },
    activitytag () {
      return {
        label: '自定义标签',
        remark: '显示在活动后面，字数不宜过多',
        input: this.activityInfo.tag.input
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (this.activityInfo.name === '添加活动') {
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
                  message: '修改成功，手动清除App缓存即可查看',
                  type: 'success',
                  showClose: true
                })
              } else {
                if (res.status === RES_STATUS.SHOW_CUSTOM_MESSAGE) {
                  var errorMsg = ''
                  switch (res.msg.hint) {
                    case 'name':
                      errorMsg = '活动名称'
                      break
                    case 'image':
                      errorMsg = '活动照片'
                      break
                    case 'introduction':
                      errorMsg = '活动介绍'
                      break
                    case 'tag':
                      errorMsg = '活动标签'
                      break
                    default: errorMsg = '活动信息'
                  }
                  Message({
                    message: errorMsg + '有误，保存失败',
                    type: 'error',
                    showClose: true
                  })
                } else if (res.status === RES_STATUS.SERVER_ERROR) {
                  Message({
                    message: '服务器错误',
                    type: 'error',
                    showClose: true
                  })
                } else if (res.status === RES_STATUS.NOT_FOUND) {
                  Message({
                    message: '页面不存在',
                    type: 'error',
                    showClose: true
                  })
                } else {
                  Message({
                    message: '未知错误',
                    type: 'error',
                    showClose: true
                  })
                }
              }
            }).catch((err) => {
              activityLoading.close()
              Message({
                message: '服务器错误',
                type: 'error',
                showClose: true
              })
              console.error(err)
            })
          }
        } else {
          Message({
            message: '信息提交失败',
            type: 'error',
            showClose: true
          })
          return false
        }
      })
    },
    showContent () {
      this.activityInfo.show = !this.activityInfo.show
      if (this.activityInfo.name === '添加活动' && this.activityInfo.show === true && this.activityInfo.id === '-1') {
        this.activityInfo.name = ''
        this.editable = true
      }
    },
    changeName () {
      if (this.activityInfo.name === '') {
        this.isempty = true
      }
      if (this.activityInfo.name !== '添加活动') {
        this.isdefault = false
      }
      if (this.activityInfo.name !== '') {
        this.isempty = false
      }
    },
    editName () {
      if (this.activityInfo.id === '-1' && this.editable === true && this.activityInfo.name === '') {
        this.activityInfo.name = '添加活动'
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

