<template>
	<div id="contact">
    <el-form :model="contactinput" ref="contactinput">
      <el-form-item 
        prop="phone.input" 
        :rules="contactinput.phone.rule">
    	  <forminput 
          :formStyle="contactphone" 
          :formInput="contactinput.phone">
        </forminput>
      </el-form-item>
      <el-form-item 
        prop="email.input" 
        :rules="contactinput.email.rule">
    	  <forminput 
          :formStyle="contactemail" 
          :formInput="contactinput.email">
        </forminput>
      </el-form-item>
    	<div class="contactus">
    		<span class="title">联系我们</span>
    		<span class="remark">屈同学 微信账号：qushuaicheng</span>
    	</div>
    	<greenbutton name="保  存" style="float:right" v-on:submit="submitForm('contactinput')"></greenbutton>
    </el-form>
	</div>
</template>

<script>
import greenbutton from '../common/greenbutton'
import forminput from '../common/forminput'
import { Message, Loading } from 'element-ui'
import contactAPI from '../../api/contact'
import * as RES_STATUS from '../../api/util'

export default {
  name: 'contact',
  components: {
    greenbutton,
    forminput
  },
  data () {
    return {
      contactinput: {
        phone: {
          input: '',
          rule: [{
            type: 'string',
            pattern: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/,
            message: '请输入正确的联系电话',
            trigger: 'blur,change'
          }, {
            required: true, message: '联系电话不能为空', trigger: 'blur'
          }]
        },
        email: {
          input: '',
          rule: [{
            type: 'email',
            message: '请输入正确的联系邮箱',
            trigger: 'blur,change'
          }, {
            required: true,
            message: '联系邮箱不能为空',
            trigger: 'blur'
          }]
        }
      },
      contactphone: {
        label: '联系电话*',
        remark: '该电话不会公开，仅用于零客工作室联系你'
      },
      contactemail: {
        label: '联系邮箱*',
        remark: '该邮箱不会公开，仅用于零客工作室联系你'
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var contactLoading = Loading.service()
          contactAPI.putContact(this, this.contactinput.email.input, this.contactinput.phone.input).then((res) => {
            contactLoading.close()
            if (res.status === RES_STATUS.SUCCESS) {
              Message({
                type: 'success',
                message: '修改成功',
                showClose: true
              })
            } else {
              if (res.status === RES_STATUS.SHOW_CUSTOM_MESSAGE) {
                var errorMsg = ''
                switch (res.msg.hint) {
                  case 'phone':
                    errorMsg = '联系电话'
                    break
                  case 'email':
                    errorMsg = '联系邮箱'
                    break
                  default: errorMsg = '联系方式'
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
            contactLoading.close()
            console.error(err)
            Message({
              message: '服务器错误',
              type: 'error',
              showClose: true
            })
          })
        } else {
          Message({
            message: '信息有误，提交失败',
            type: 'error',
            showClose: true
          })
          return false
        }
      })
    }
  },
  created () {
    var isLoading = Loading.service()
    contactAPI.getContact(this).then((res) => {
      isLoading.close()
      if (res.status === RES_STATUS.SUCCESS) {
        this.contactinput.phone.input = res.data.phone
        this.contactinput.email.input = res.data.email
      } else {
        if (res.status === RES_STATUS.SERVER_ERROR) {
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
        } else if (res.status === RES_STATUS.LOGIN_REQUIRED) {
          window.location.href = 'https://link.xjtu.edu.cn/clubManagement'
        } else {
          Message({
            message: '未知错误',
            type: 'error',
            showClose: true
          })
        }
      }
    }).catch((res) => {
      isLoading.close()
      Message({
        message: '服务器错误',
        type: 'error',
        showClose: true
      })
    })
  }
}
</script>

<style>
#contact{
  width: 655px;
  float: left;
  margin-left: 40px;
  margin-top: 3px;
}
#contact .contactus .title{
  margin-left: 3px;
  line-height: 40px;
}
#contact .contactus .remark{
  margin-left: 17px;
}
</style>
