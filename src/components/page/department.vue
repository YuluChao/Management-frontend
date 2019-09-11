<template>
	<div id="department">
    <div class="dep-num">
      <span class="title">Department List</span>
      <span class="remark">Current Department Num：{{ departments.length }}</span>
    </div>
    <div class="list" >
      <transition-group name="up">
        <div v-for="(item,index) in departments" :key="item.id" style="position:relative">          
          <departmentitem 
            :departmentInfo="item" 
            v-on:delete="deleteDepartment" 
            v-on:addPicture="addDepartPicture">
          </departmentitem>
          <a href="javascript:void(0)">
            <img src="../../assets/images/up.png"  @click="up(departments[index].id,index)" v-show="!departments[index].show" class="up"></img>
          </a>
        </div>  
      </transition-group>
      <departmentitem 
        :departmentInfo="defaultDepartment" 
        v-on:add="addDepartment" 
        v-on:addPicture="addDepartPicture"
        :id="defaultDepartment.id">
      </departmentitem>
    </div>
    <div class="tips">
      <span>Tips:&nbsp;&nbsp;Click the title to edit the content;Click the arrow on the right to adjust the order</span>
    </div>
    <el-dialog title="Delete" v-model="dialogVisible" top="30%" :show-close="false">
      <span>Are you sure to delete “{{ deleteDepartmentName }}”?</span>
      <div slot="footer">
        <button type="button" class="cancel" @click="dialogVisible = false">Cancel</button>
        <button type="button" class="confirm" v-on:click="deleteConfirm">OK</button>
      </div>
    </el-dialog>
    <vue-core-image-upload  
      crop-ratio="9:16" 
      :crop="true" 
      crop="local"
      extensions="image/jpg,image/jpeg,image/png"
      :max-file-size="512000"
      text=""
      :cropBtn="{ok:'OK',cancel:'Cancel'}"
      @imagechanged="deptChanged"
      @errorhandle="errorHandle"
    >
    </vue-core-image-upload> 
	</div>
</template>

<script>
import departmentitem from '../common/departmentitem'
import VueCoreImageUpload from 'vue-core-image-upload'
import { Message, Loading } from 'element-ui'
import departmentAPI from '../../api/department'
import * as RES_STATUS from '../../api/util'

import deptImg from '../../assets/images/9_16.png'

export default {
  name: 'department',
  components: {
    departmentitem,
    VueCoreImageUpload
  },
  data () {
    return {
      departments: [],
      defaultDepartment: {
        name: 'Add Department',
        introduction: {input: ''},
        image: deptImg,
        show: false,
        id: '-1'
      },
      dialogVisible: false,
      deleteDepartmentId: '-1',
      deleteDepartmentName: '',
      currentDepartmentId: '-2'
    }
  },
  methods: {
    addDepartment () {
      if (this.defaultDepartment.image.split(':')[0] === 'data') {
        var deptLoading = Loading.service()
        var formData = new FormData()
        formData.append('name', this.defaultDepartment.name)
        formData.append('introduction', this.defaultDepartment.introduction.input)
        formData.append('image', this.base64ToFile(this.defaultDepartment.image, 'image'))
        formData.append('index', this.departments.length)
        departmentAPI.postDept(this, formData).then((res) => {
          deptLoading.close()
          if (res.status === RES_STATUS.SUCCESS) {
            this.departments.push({
              name: this.defaultDepartment.name,
              introduction: {input: this.defaultDepartment.introduction.input},
              image: this.defaultDepartment.image,
              show: false,
              id: res.data.dept_id
            })
            this.defaultDepartment.name = 'Add Department'
            this.defaultDepartment.introduction.input = ''
            this.defaultDepartment.image = deptImg
            this.defaultDepartment.show = false
            this.defaultDepartment.id = '-1'
            Message({
              message: 'Add successfully',
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
                message: errorMsg + 'is error，pleas modify and try again',
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
        }).catch((res) => {
          deptLoading.close()
          Message({
            message: 'Server error',
            type: 'error',
            showClose: true
          })
        })
      } else {
        Message({
          message: 'Image can not be empty',
          type: 'error',
          showClose: true
        })
      }
    },
    deleteDepartment (departmentId) {
      this.dialogVisible = true
      this.deleteDepartmentId = departmentId
      for (var i in this.departments) {
        if (this.departments[i].id === departmentId) {
          this.deleteDepartmentName = this.departments[i].name
        }
      }
    },
    deleteConfirm () {
      var delLoading = Loading.service()
      departmentAPI.delDept(this, this.deleteDepartmentId).then((res) => {
        delLoading.close()
        if (res.status === RES_STATUS.SUCCESS) {
          this.dialogVisible = false
          for (var i in this.departments) {
            if (this.departments[i].id === this.deleteDepartmentId) {
              this.departments.splice(i, 1)
            }
          }
          Message({
            message: 'Delete successfully',
            type: 'success'
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
      }).catch((res) => {
        delLoading.close()
        Message({
          message: 'Server error',
          type: 'error',
          showClose: true
        })
      })
    },
    addDepartPicture (departmentId) {
      document.getElementsByName('files')[0].click()
      this.currentDepartmentId = departmentId
    },
    deptChanged () {
      if (this.currentDepartmentId === '-1') {
        this.defaultDepartment.image = arguments[0]
      } else {
        for (var i in this.departments) {
          if (this.departments[i].id === this.currentDepartmentId) {
            this.departments[i].image = arguments[0]
          }
        }
      }
    },
    up (id, index) {
      var toIndex = index - 1
      if (toIndex >= 0) {
        var upLoading = Loading.service()
        departmentAPI.putDeptOrder(this, id, this.departments[toIndex].id).then((res) => {
          upLoading.close()
          if (res.status === RES_STATUS.SUCCESS) {
            Message({
              type: 'success',
              message: 'Adjust order successfully',
              showClose: true
            })
            this.departments[index] = this.departments.splice(index - 1, 1, this.departments[index])[0]
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
          upLoading.close()
          console.error(err)
          Message({
            message: 'Server error',
            type: 'error',
            showClose: true
          })
        })
      }
    },
    errorHandle () {
      if (arguments[0] === 'TYPE ERROR') {
        Message({
          message: 'Image format must be png, jpeg or jpg',
          type: 'error',
          showClose: true
        })
      } else if (arguments[0] === 'FILE IS TOO LARGER MAX FILE IS 500.00kB') {
        Message({
          message: 'Image size can not exceed 500KB',
          type: 'error',
          showClose: true
        })
      }
    }
  },
  created () {
    var isLoading = Loading.service()
    departmentAPI.getDepts(this).then((res) => {
      isLoading.close()
      if (res.status === RES_STATUS.SUCCESS) {
        for (var i = 0; i < res.data.depts.length; i++) {
          this.departments.push({
            name: res.data.depts[i].name,
            introduction: {input: res.data.depts[i].introduction},
            image: res.data.depts[i].image,
            show: false,
            id: res.data.depts[i].dept_id
          })
        }
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
#department{
  width: 680px;
  float: left;
  margin-left: 40px;
  margin-top: 3px;
  margin-bottom: 40px;
}
#department .dep-num{
  margin-bottom: 7px;
}
#department .dep-num span{
  line-height: 40px;
}
#department .list{
  border: 1px solid #ddd;
  border-radius: 5px;
  border-bottom: 1px solid #fff;
}
#department .tips{
  margin-top: 5px;
}

.el-dialog--small{
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 3px; 
}
.el-dialog__header{
  border-bottom: 1px solid #ccc;
  height: 50px;
  padding: 0;
  padding-left: 19px;
}
.el-dialog__header .el-dialog__title{
  font-size: 15px;
  font-weight: bold;
  line-height: 50px;
}
.el-dialog__body{
  padding-top: 24px;
  padding-bottom: 10px;
}
.el-dialog__footer{
  padding: 13px 20px 15px;
  height: 60px;
}
.el-dialog__footer button{
  width: 60px;
  height: 32px;
  border-radius: 3px;
  font-size: 12px;
  color: #393a3c;
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
  cursor:pointer;
}
.el-dialog__footer .cancel{
  margin-right: 4px;
}
.el-dialog__footer .cancel:hover{
  color: #42af46;
  border-color: #42af46;
}
.el-dialog__footer .confirm{
  width: 104px;
  color: #fff;
  border-color: #42af46;
  background-color: #42af46;
}
.el-dialog__footer .confirm:hover{
  background-color: #5bb85d;
}
#department .list .up{
  position: absolute;
  top: 14px;
  left: 95%;
}
</style>
