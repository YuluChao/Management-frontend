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
    		<span class="title">Contact us</span>
    		<span class="remark">Ms. Chao</span>
    	</div>
    	<greenbutton name="Save" style="float:right" v-on:submit="submitForm('contactinput')"></greenbutton>
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
            message: 'Please input correct phone number',
            trigger: 'blur,change'
          }, {
            required: true, message: 'Contact number can not be empty', trigger: 'blur'
          }]
        },
        email: {
          input: '',
          rule: [{
            type: 'email',
            message: 'Please input correct email address',
            trigger: 'blur,change'
          }, {
            required: true,
            message: 'Contact email can not be empty',
            trigger: 'blur'
          }]
        }
      },
      contactphone: {
        label: 'Contact Number*',
        remark: 'The number will not be made public'
      },
      contactemail: {
        label: 'Contact Email*',
        remark: 'The email will not be made public'
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
                message: 'Modify successfully',
                showClose: true
              })
            } else {
              if (res.status === RES_STATUS.SHOW_CUSTOM_MESSAGE) {
                var errorMsg = ''
                switch (res.msg.hint) {
                  case 'phone':
                    errorMsg = 'Contact number'
                    break
                  case 'email':
                    errorMsg = 'Contact email'
                    break
                  default: errorMsg = 'Contact information'
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
            contactLoading.close()
            console.error(err)
            Message({
              message: 'Server error',
              type: 'error',
              showClose: true
            })
          })
        } else {
          Message({
            message: 'Information is error, please modify and try again',
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
        } else if (res.status === RES_STATUS.LOGIN_REQUIRED) {
          window.location.href = 'https://link.xjtu.edu.cn/clubManagement'
        } else {
          Message({
            message: 'Unknown mistake',
            type: 'error',
            showClose: true
          })
        }
      }
    }).catch((res) => {
      isLoading.close()
      Message({
        message: 'Server error',
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
