<template>
	<div class="navbar">
		<div class="nav-content">
			<p>Link Club Management</p>
			<a href="javascript:void(0)" @click="logout">Logout</a>
		</div>
	</div>
</template>

<script>
import auth from '../../api/auth'
import * as RES_STATUS from '../../api/util'
import { Message } from 'element-ui'

export default{
  name: 'navbar',
  methods: {
    logout: function () {
      auth.logout(this).then((res) => {
        if (res.status === RES_STATUS.SUCCESS) {
          window.location.href = 'https://link.xjtu.edu.cn/clubManagement'
          Message({
            message: 'Logout successfully',
            type: 'success',
            showClose: true
          })
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
          } else {
            Message({
              message: 'Unknown mistake',
              type: 'error',
              showClose: true
            })
          }
        }
      }).catch((err) => {
        Message({
          message: 'Server error',
          type: 'error',
          showClose: true
        })
        console.error(err)
      })
    }
  }
}
</script>

<style>
.navbar{
  width: 100%;
  min-width: 1170px;
  height: 87px;
  background-color: #000;
  color: #fff;
/*  font-family: "黑体";*/
}
.navbar .nav-content {
  margin-left: auto;
  margin-right: auto;
  width: 1170px;
  height: 100%;
}
.navbar .nav-content p{
  line-height: 87px;
  font-size: 23px;
  margin-left: 36px;
  float: left;
}
.navbar .nav-content a{
  color: #fff;
  text-decoration:none;
  font-size: 19px;
  line-height: 87px;
  float: right;
  margin-right: 30px;
}
</style>
