<template>
  <div id="admin">
    <div class="admin-num">
      <span class="title">历史记录列表</span>
    </div>
    <div class="table">
      <div class="table-header">
        <span class="name">姓名</span>
        <span class="content">操作记录</span>
        <span class="time">时间</span>
      </div>
      <div class="table-content" v-for="admin in currentadmins">
        <span class="name">{{ admin.name }}</span>
        <span class="content">{{ admin.content }}</span>
        <span class="time">{{ admin.time }}</span>
      </div>
      <div class="tips">
          <span>Tips:&nbsp;&nbsp;历史记录可以显示所有操作记录</span>
      </div>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="admins.length"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import adminAPI from '../../api/admin'
import { Message, Loading } from 'element-ui'
import * as RES_STATUS from '../../api/util'

export default {
  name: 'admin',
  components: {
  },
  data () {
    return {
      pagenum: 1,
      pagesize: 15,
      currentadmins: [],
      admins: []
    }
  },
  created: function () {
    var isLoading = Loading.service()
    adminAPI.getRecords(this).then((res) => {
      isLoading.close()
      if (res.status === RES_STATUS.SUCCESS) {
        this.admins = res.data.records
        var i = 0
        if (this.pagesize < this.admins.length) {
          for (i; i < this.pagesize; i++) {
            this.currentadmins.push(this.admins[i])
          }
        } else {
          for (i; i < this.admins.length; i++) {
            this.currentadmins.push(this.admins[i])
          }
        }
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
  },
  methods: {
    handleCurrentChange (val) {
      this.currentadmins = []
      let i = (val - 1) * this.pagesize
      if (val * this.pagesize < this.admins.length) {
        for (i; i < val * this.pagesize; i++) {
          this.currentadmins.push(this.admins[i])
        }
      } else {
        for (i; i < this.admins.length; i++) {
          this.currentadmins.push(this.admins[i])
        }
      }
    }
  }
}
</script>
<style>
#admin{
  width: 680px;
  float: left;
  margin-left: 40px;
  margin-top: 3px;
  margin-bottom: 40px;
}
#admin .admin-num{
  margin-bottom: 7px;
}
#admin .admin-num span{
  line-height: 40px;
}
#admin .table>div{
  border-top: 1px solid #eeeeee;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}
#admin .table .table-header{
  border-top: 2px solid #eeeeee;
  font-weight: bold;
}
#admin .table .table-content{
  color: #34383b;
}
#admin .table .name{
  margin-left: 10px;
  width: 220px;
  display: inline-block;
}
#admin .table .content{
  width: 240px;
  display: inline-block;
}
#admin .table .table-content .name{
  color: #5e7a88;
}
#admin .table .tips{
  margin-top: -2px;
  margin-left: 4px;
  border:none;
  font-size: 11px;
}

#admin .el-pagination{
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
}
#admin .el-pager li{
  border: none;
  font-size: 15px;
  min-width: 30px;
  height: 30px;
}
#admin .el-pagination button, .el-pagination span{
  font-size: 15px;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
}
#admin .el-pagination .btn-next, .el-pagination .btn-prev{
  border: none;
}
#admin .el-pager li.active{
  background-color: #0175d8;
}
#admin .el-pager li.active:hover{
  color: #fff;
}
#admin .el-pager li:hover{
  color: #0175d8;
}
#admin .el-pagination button:hover{
  color: #0175d8;
}
.el-loading-mask {
  background-color: rgba(255,255,255,.4);
}
</style>
