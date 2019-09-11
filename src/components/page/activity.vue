<template>
	<div id="activity">
    <div class="act-num">
      <span class="title">活动列表</span>
      <span class="remark">当前活动数：{{ activities.length }}</span>
    </div>
    <div class="list" >
      <transition-group name="up">
        <div 
          v-for="(item,index) in activities" 
          :key="item.id" 
          style="position:relative">
          <activityitem 
            :activityInfo="item" 
            v-on:delete="deleteActivity" 
            v-on:addPicture="addActivityPicture">
          </activityitem>
          <a href="javascript:void(0)">
            <img src="../../assets/images/up.png"  
              @click="up(activities[index].id,index)" 
              v-show="!activities[index].show" 
              class="up">
            </img>
          </a>
        </div>  
      </transition-group>
      <activityitem 
        :activityInfo="defaultActivity" 
        v-on:add="addActivity" 
        v-on:addPicture="addActivityPicture">
      </activityitem> 
    </div>
    <div class="tips">
      <span>Tips:&nbsp;&nbsp;点击标题可以进行修改，点击右侧向上箭头可以调整顺序</span>
    </div>
    <el-dialog 
      title="确认删除" 
      v-model="dialogVisible" 
      top="30%" 
      :show-close="false">
      <span>确认删除活动“{{ deleteActivityName }}”吗？</span>
      <div slot="footer">
        <button type="button" class="cancel" @click="dialogVisible = false">取 消</button>
        <button type="button" class="confirm" v-on:click="deleteConfirm">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</button>
      </div>
    </el-dialog>
    <vue-core-image-upload  
      crop-ratio="16:9" 
      :crop="true" 
      text=""
      :cropBtn="{ok:'确 定',cancel:'取 消'}"
      crop="local"
      extensions="image/jpg,image/jpeg,image/png"
      :max-file-size="512000"
      @imagechanged="activityChanged"
      @errorhandle="errorHandle">
    </vue-core-image-upload>    
	</div>
</template>

<script>
import activityitem from '../common/activityitem'
import VueCoreImageUpload from 'vue-core-image-upload'
import { Message, Loading } from 'element-ui'
import activityAPI from '../../api/activity'
import * as RES_STATUS from '../../api/util'

import activityImg from '../../assets/images/16_9.png'

export default {
  name: 'activity',
  components: {
    activityitem,
    VueCoreImageUpload
  },
  data () {
    return {
      activities: [],
      defaultActivity: {
        name: '添加活动',
        tag: {input: ''},
        introduction: {input: ''},
        image: activityImg,
        show: false,
        id: '-1'
      },
      dialogVisible: false,
      deleteActivityId: '-1',
      deleteActivityName: '',
      currentActivityId: '-2'
    }
  },
  methods: {
    addActivity () {
      var activityLoading = Loading.service()
      var formData = new FormData()
      formData.append('name', this.defaultActivity.name)
      formData.append('introduction', this.defaultActivity.introduction.input)
      formData.append('tag', this.defaultActivity.tag.input)
      if (this.defaultActivity.image.split(':')[0] === 'data') {
        formData.append('image', this.base64ToFile(this.defaultActivity.image, 'image'))
      }
      formData.append('index', this.activities.length)
      activityAPI.postActivity(this, formData).then((res) => {
        activityLoading.close()
        if (res.status === RES_STATUS.SUCCESS) {
          this.activities.push({
            name: this.defaultActivity.name,
            introduction: {input: this.defaultActivity.introduction.input},
            tag: {input: this.defaultActivity.tag.input},
            image: this.defaultActivity.image,
            show: false,
            id: res.data.activity_id
          })
          this.defaultActivity.name = '添加活动'
          this.defaultActivity.introduction.input = ''
          this.defaultActivity.tag.input = ''
          this.defaultActivity.image = activityImg
          this.defaultActivity.show = false
          this.defaultActivity.id = '-1'
          Message({
            message: '添加成功，手动清除App缓存即可查看',
            type: 'success'
          })
        } else {
          if (res.status === RES_STATUS.SHOW_CUSTOM_MESSAGE) {
            var errorMsg = ''
            switch (res.msg.hint) {
              case 'name':
                errorMsg = '活动名称'
                break
              case 'image':
                errorMsg = '活动图片'
                break
              case 'introduction':
                errorMsg = '活动介绍'
                break
              case 'tag':
                errorMsg = '自定义标签'
                break
              default: errorMsg = '活动信息'
            }
            Message({
              message: errorMsg + '有误，添加失败',
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
        activityLoading.close()
        Message({
          message: '服务器错误',
          type: 'error',
          showClose: true
        })
      })
    },
    deleteActivity (activityId) {
      this.dialogVisible = true
      this.deleteActivityId = activityId
      for (var i in this.activities) {
        if (this.activities[i].id === activityId) {
          this.deleteActivityName = this.activities[i].name
        }
      }
    },
    deleteConfirm () {
      var delLoading = Loading.service()
      activityAPI.delActivity(this, this.deleteActivityId).then((res) => {
        delLoading.close()
        if (res.status === RES_STATUS.SUCCESS) {
          this.dialogVisible = false
          for (var i in this.activities) {
            if (this.activities[i].id === this.deleteActivityId) {
              this.activities.splice(i, 1)
            }
          }
          Message({
            message: '删除成功',
            type: 'success'
          })
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
          } else {
            Message({
              message: '未知错误',
              type: 'error',
              showClose: true
            })
          }
        }
      }).catch((res) => {
        delLoading.close()
        Message({
          message: '服务器错误',
          type: 'error'
        })
      })
    },
    addActivityPicture (activityId) {
      document.getElementsByName('files')[0].click()
      this.currentActivityId = activityId
    },
    errorHandle () {
      console.log(arguments[0])
      if (arguments[0] === 'TYPE ERROR') {
        Message({
          message: '图片格式必须为png，jpeg或jpg',
          type: 'error',
          showClose: true
        })
      } else if (arguments[0] === 'FILE IS TOO LARGER MAX FILE IS 500.00kB') {
        Message({
          message: '图片大小不能超过500KB',
          type: 'error',
          showClose: true
        })
      }
    },
    activityChanged () {
      if (this.currentActivityId === '-1') {
        this.defaultActivity.image = arguments[0]
      } else {
        for (var i in this.activities) {
          if (this.activities[i].id === this.currentActivityId) {
            this.activities[i].image = arguments[0]
          }
        }
      }
    },
    up (id, index) {
      var toIndex = index - 1
      if (toIndex >= 0) {
        var upLoading = Loading.service()
        activityAPI.putActivityOrder(this, id, this.activities[toIndex].id).then((res) => {
          upLoading.close()
          if (res.status === RES_STATUS.SUCCESS) {
            Message({
              type: 'success',
              message: '调整顺序成功',
              showClose: true
            })
            this.activities[index] = this.activities.splice(index - 1, 1, this.activities[index])[0]
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
            } else {
              Message({
                message: '未知错误',
                type: 'error',
                showClose: true
              })
            }
          }
        }).catch((err) => {
          upLoading.close()
          console.error(err)
          Message({
            message: '服务器错误',
            type: 'error',
            showClose: true
          })
        })
      }
    }
  },
  created () {
    var isLoading = Loading.service()
    activityAPI.getActivities(this).then((res) => {
      isLoading.close()
      if (res.status === RES_STATUS.SUCCESS) {
        for (var i = 0; i < res.data.activities.length; i++) {
          this.activities.push({
            name: res.data.activities[i].name,
            tag: {input: res.data.activities[i].tag},
            introduction: {input: res.data.activities[i].introduction},
            image: res.data.activities[i].image,
            show: false,
            id: res.data.activities[i].activity_id
          })
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
  }
}
</script>

<style>
#activity{
  width: 680px;
  float: left;
  margin-left: 40px;
  margin-top: 3px;
  margin-bottom: 40px;
}
#activity .act-num{
  margin-bottom: 7px;
}
#activity .act-num span{
  line-height: 40px;
}
#activity .list{
  border: 1px solid #ddd;
  border-radius: 5px;
  border-bottom: 1px solid #fff;
}
#activity .tips{
  margin-top: 5px;
}
#activity .list .up{
  position: absolute;
  top: 14px;
  left: 95%;
}
.g-rotate-bar{
  display: none;
}
.crop-box .g-resize{
  display: none;
}

.up-move {
  transition: transform .5s;
  box-shadow:0 0 10px #eaeaea;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
}
</style>
