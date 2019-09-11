<template>
  <div id="login">
      <div class="login-header">
          <div>
            <p>西交Link社团管理页面</p>
          </div>
        </div>
      <div class="login-content">
        <div class="left">
            <img src="../../assets/images/link_page.png" alt="">
        </div>
        <div class="right">
          <p>社团管理员登录</p>
        <el-form :model="password" ref="password">
            <el-form-item prop="input" :rules="{required: true, message: '社团邀请码不能为空', trigger: 'blur,change'}">
                <forminput :formStyle="{label: '邀请码*',remark: '请使用非IE浏览器登录'}" :formInput="password"></forminput>
              </el-form-item>
          </el-form>  
          
          <button v-on:click="submitForm('password')">登&nbsp;&nbsp;&nbsp;&nbsp;录</button><div class="tips">
            <span>Tips:&nbsp;&nbsp;若邀请码未知，请微信联系：qushuaicheng</span>
        </div>
          </div>
      </div> 
      <div class="login-footer">
        <p>Copyright © 2017 IC·LINK<a href="http://link.xjtu.edu.cn/join.html">Join</a></p>  
      </div>  
  </div>
</template>

<script>
import forminput from '../common/forminput'
import { Message } from 'element-ui'
import auth from '../../api/auth'
import * as RES_STATUS from '../../api/util'
var CryptoJS = require('crypto')

export default{
  name: 'login',
  components: {
    forminput
  },
  data () {
    return {
      password: {
        input: ''
      },
      isLoginLoading: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoginLoading = true
          var sha256 = CryptoJS.createHash('sha256')
          sha256.update(this.password.input)
          auth.login(
            this,
            sha256.digest('hex')
          ).then((res) => {
            this.isLoginLoading = false
            if (res.status === RES_STATUS.SUCCESS) {
              this.$router.replace('/club/basic/')
              Message({
                message: '登录成功',
                type: 'success',
                showClose: true
              })
            } else {
              if (res.status === RES_STATUS.SHOW_CUSTOM_MESSAGE) {
                Message({
                  message: res.message.hint,
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
          }).catch((res) => {
            console.log(res)
            this.isLoginLoading = false
            Message({
              message: '服务器错误',
              type: 'error'
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
  }
}
</script>

<style>
#login{
  width: 100%;
  min-width: 1170px;
}
#login .login-header{
  height: 87px;
  background-color: #000;
  color: #fff;
  font-family: "黑体";
}
#login .login-header div {
  margin-left: auto;
  margin-right: auto;
  width: 1170px;
  height: 100%;
}
#login .login-header p{
  line-height: 87px;
  font-size: 23px;
  margin-left: 36px;
  float: left;
}

#login .login-content{
  width: 1100px;
  margin: 0 auto;
  height: 500px;
  border-bottom: 1px solid #e5e5e5;
  margin-top: 15px;
}
#login .login-content .left{
  margin-top: 10px;
  float: left;
  padding-left: 106px;
}
#login .login-content .right{
  float: left;
  width: 380px;
  margin-top: 120px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  height: 250px;
  margin-left: 120px;
}
#login .login-content .right p{
  border-bottom: 1px solid #e5e5e5;
  height: 45px;
  line-height: 45px;
  padding-left: 30px;
}
#login .el-form{
  padding-top: 20px;
  width: 310px;
  margin: 0 auto; 
  height: 100px;
}
#login .tips{
  width: 320px;
  margin: 0 auto;
}
#login .tips span{
  text-align: right;
  display: block;
  line-height: 40px;
}
#login .login-footer{
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #ccc;
}
#login .login-footer a{
  color: #ccc;
  margin-left: 10px;
}
#login .login-content button{
  color: #fff;
  display: block;
  line-height: 29px;
  font-size: 14px;
  margin-left: 242px;
  height: 32px;
  width: 104px;
  border-radius: 3px;
  background-color: #0175d8;
  text-align: center;
  border: none;
}
#login .remark{
  color: #FF4949;
}
</style>
