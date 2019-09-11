<template>
	<div class="menubar">
		<p>{{ clubname }}</p>
		<div class="menu-content">	
			<ul>
				<li><router-link to="/club/basic">基本信息</router-link></li>
				<li><router-link to="/club/department">部门信息</router-link></li>
				<li><router-link to="/club/activity">活动信息</router-link></li>
        <li><router-link to="/club/contact">联系方式</router-link></li>
				<li><router-link to="/club/admin">历史记录</router-link></li>			
			</ul>	
		</div>
	</div>
</template>

<script>
import basicAPI from '../../api/basic'
import * as RES_STATUS from '../../api/util'
import { Message } from 'element-ui'

export default{
  name: 'menubar',
  data () {
    return {
      clubname: ''
    }
  },
  created () {
    basicAPI.getClubInfo(this).then((res) => {
      if (res.status === RES_STATUS.SUCCESS) {
        this.clubname = res.data.clubInfo.name
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
.menubar{
  width: 222px;
  float: left;
  margin-left: 36px;
}
.menubar p{
  line-height: 40px;
  margin-bottom: 10px;
  font-size: 18px;
  color: #000;
}
.menubar .menu-content ul{
  list-style: none;
  
  overflow: hidden;
  border-radius: 5px; 
  border-top: 1px solid #eee; 
}
.menubar .menu-content a{
  display: block;
  height: 40px; 
  width: 220px;
  background-color: #fff;
  text-decoration: none;
  text-indent: 17px;
  line-height: 40px;
  font-size: 13px;

  border: 1px solid #eee;
  margin-top: -1px;
}
.menubar .menu-content .router-link-active{
  background-color: #ff710f;
  color: #fff;
  border: 1px solid #ff710f;
}
</style>
