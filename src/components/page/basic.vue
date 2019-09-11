<template>
	<div id='basic'>
    <el-form :model="club" ref="clubinput">
      <el-form-item prop="summary.input" :rules="rules.summary">
        <formtextarea 
          :formStyle="summarystyle" 
          :formInput="club.summary">
        </formtextarea>
      </el-form-item>
      <el-form-item 
        prop="introduction.input" 
        :rules="rules.introduction">
        <formtextarea 
          :formStyle="introductionstyle" 
          :formInput="club.introduction">
        </formtextarea>
      </el-form-item>
      <div class="tips">
        <span>Tips:</span>
        <p>1. 若需要修改社团名称，请微信联系：qushuaicheng</br>
        2. 段落前不宜添加空格</br>
        3. 段落之间添加空白行会有更好的显示效果</p>
      </div>
      <div class="basic-content">
        <div class="left">
          <p class="title" style="line-height:32px">社团类别*</p>
          <p class="title" style="line-height:80px">所在校区*</p>
          <p class="title" style="line-height:68px">社团Logo</p>
        </div>
        <div class="middle">
          <el-select  v-model="defaulttype" placeholder="请选择" @change="changeType()">
            <el-option
            v-for="item in types"
            :label="item.label"
            :value="item.value"
            :key="item.label">
            </el-option>
          </el-select>
          <div class="verticalline"></div>
          <button 
            type="button" 
            style="margin-right:13px;" 
            v-on:click="changeLocale('兴庆校区')" 
            v-bind:class="{ buttonfocus: club.locale.indexOf('兴庆校区')!==-1 }">
            兴庆校区
          </button>
          <button 
            type="button" 
            v-on:click="changeLocale('雁塔校区')"  
            v-bind:class="{ buttonfocus: club.locale.indexOf('雁塔校区')!==-1 }">
            雁塔校区
          </button>
          <div class="el-form-item__error">
            <span v-bind:class="{ show: club.locale.length !== 0 }" >请选择所在校区</span>
          </div>
          <div class="wrapper"> 
            <p @click="addLogo()">更换</p>
            <img style="width:53px;height:53px;" @click="addLogo()" :src='club.logo' id="logo">
            </img>
          </div> 
        </div>
        <div class="right">
          <span class="title">宣传图片</span>
          <span class="remark">被搜索、置顶、详情时展示的图片(比例为16:9)</span>
          <div class="wrapper">
            <p @click="addPoster()">更换图片</p>
            <img style="width:256px;height:144px;" @click="addPoster()" :src='club.poster' id="poster">
            </img>
          </div>
        </div>
      </div>        
      <el-form-item prop="email.input" :rules="rules.email">
        <forminput :formStyle="emailstyle" :formInput="club.email"></forminput>
      </el-form-item>
      <el-form-item prop="tag.input">
        <forminput :formStyle="tagstyle" :formInput="club.tag"></forminput>
      </el-form-item>
      <el-form-item prop="apply_url.input" :rules="rules.apply_url">
        <forminput :formStyle="applyurlstyle" :formInput="club.apply_url"></forminput>
      </el-form-item>
      <div class="showtype">
        <div class="left">
          <span class="title">展示方式*</span>
          <el-button-group>
            <el-button v-bind:class="{ buttonfocus:!club.show_type }" v-on:click="changeAuto">自动生成</el-button>
            <el-button v-bind:class="{ buttonfocus:club.show_type }" v-on:click="changeCustom">自定义网页</el-button>
          </el-button-group>
        </div>
        <div class="right" v-if="club.show_type">
          <el-form-item prop="url.input" :rules="rules.url">
            <el-input v-model="club.url.input"></el-input>
          </el-form-item>
        </div>
        <a target="_blank" :href="club.url.input" v-if="club.show_type">查看网页效果</a>
      </div> 
      <div class="tips">
        <span>Tips:</span>
        <p>1. 默认自动生成可以满足绝大多数社团的需求，选择自动生成即可</br>
        2. 自定义网页是提供给有能力自行开发招新页面的社团，注意自行测试，出现问题可联系我们进行联调</br>
        3. 如果选择自定义网页，当用户点击您的社团后，会直接打开该地址而不会进入我们开发的页面
        </p>
      </div>
      <div class="tips">
        <span style="color:#FF4949">重要说明：</span>
        <p style="color:#FF4949">1. 因App版本问题，新旧版本社团分类显示有所差异，但不影响使用</br>2. 请使最新版本App（iOS 2.5.1 Android 2.4.6）下载地址http://xjtu.link/（预计8月19日更新）
        </p>
      </div>
      <el-form-item>
      <greenbutton name="保 存" v-on:submit="submitForm('clubinput')"></greenbutton>  
      </el-form-item>
    </el-form>
    <vue-core-image-upload  
      crop-ratio="1:1" 
      :crop="true" 
      crop="local"
      extensions="image/jpg,image/jpeg,image/png"
      :max-file-size="512000"
      text=""
      :cropBtn="{ok:'确 定',cancel:'取 消'}"
      @imagechanged="logoChanged"
      @errorhandle="errorHandle"
    >
    </vue-core-image-upload> 
    <vue-core-image-upload  
      crop-ratio="16:9" 
      :crop="true" 
      crop="local"
      extensions="image/jpg,image/jpeg,image/png"
      :max-file-size="512000"
      text=""
      :cropBtn="{ok:'确 定',cancel:'取 消'}"
      @imagechanged="posterChanged"
      @errorhandle="errorHandle"
    >
    </vue-core-image-upload>
    <img src="" alt="" id="result">
	</div>
</template>

<script>
import greenbutton from '../common/greenbutton'
import formtextarea from '../common/formtextarea'
import forminput from '../common/forminput'
import { Message, Loading } from 'element-ui'
import VueCoreImageUpload from 'vue-core-image-upload'
import basicAPI from '../../api/basic'
import * as RES_STATUS from '../../api/util'

export default {
  name: 'basic',
  components: {
    greenbutton,
    formtextarea,
    forminput,
    VueCoreImageUpload
  },
  data () {
    return {
      types: [{
        value: '人文理论类',
        label: '人文理论类'
      }, {
        value: '科学技术类',
        label: '科学技术类'
      }, {
        value: '志愿公益类',
        label: '志愿公益类'
      }, {
        value: '文艺体育类',
        label: '文艺体育类'
      }, {
        value: '创新创业类',
        label: '创新创业类'
      }, {
        value: '自律互助类',
        label: '自律互助类'
      }, {
        value: '信息传媒类',
        label: '信息传媒类'
      }],
      defaulttype: '',
      summarystyle: {
        label: '社团简介*',
        remark: '必填项，不宜超过80个字',
        minrows: 1,
        maxrows: 2
      },
      introductionstyle: {
        label: '社团详情*',
        remark: '社团详细介绍，字数不限',
        minrows: 6,
        maxrows: 10
      },
      emailstyle: {
        label: '社团公邮',
        remark: ''
      },
      tagstyle: {
        label: '自定义标签',
        remark: '显示在社团名字后面，字数不宜过多，例如：优秀社团、甲级社团'
      },
      applyurlstyle: {
        label: '招新链接',
        remark: '点击“加入社团”后，跳转的页面，推荐使用 http://www.mikecrm.com/ 制作在线招新表单'
      },
      club: {
        name: '',
        summary: {input: ''},
        introduction: {input: ''},
        type: '',
        locale: [],
        logo: '',
        poster: '',
        email: {input: ''},
        tag: {input: ''},
        apply_url: {input: ''},
        show_type: true,
        url: {input: ''}
      },
      rules: {
        summary: {
          required: true, message: '社团简介不能为空', trigger: 'blur,change'
        },
        introduction: {
          required: true, message: '社团详情不能为空', trigger: 'blur,change'
        },
        email: {
          type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'
        },
        apply_url: {
          type: 'url', message: '请输入正确的网页链接，例如：http://www.baidu.com', trigger: 'blur,change'
        },
        url: [{
          type: 'url', message: '请输入正确的网页链接，例如：http://www.baidu.com', trigger: 'blur,change'
        }, {
          required: true, message: '网页链接不能为空', trigger: 'blur,change'
        }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.club.locale.length !== 0) {
          var basicLoading = Loading.service()
          var formData = new FormData()
          formData.append('name', this.club.name)
          formData.append('summary', this.club.summary.input)
          formData.append('introduction', this.club.introduction.input)
          for (var localeIndex = 0; localeIndex < this.club.locale.length; localeIndex++) {
            formData.append('locale', this.club.locale[localeIndex])
          }
          formData.append('type', this.club.type)
          formData.append('tag', this.club.tag.input)
          formData.append('email', this.club.email.input)
          formData.append('apply_url', this.club.apply_url.input)
          if (this.club.show_type === false) {
            formData.append('show_type', 'True')
          } else {
            formData.append('show_type', 'False')
          }
          formData.append('url', this.club.url.input)
          if (this.club.poster.split(':')[0] === 'data') {
            formData.append('image', this.base64ToFile(this.club.poster, 'image'))
          }
          if (this.club.logo.split(':')[0] === 'data') {
            formData.append('logo', this.base64ToFile(this.club.logo, 'logo'))
          }
          basicAPI.putClubInfo(this, formData).then((res) => {
            basicLoading.close()
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
                  case 'summary':
                    errorMsg = '社团简介'
                    break
                  case 'introduction':
                    errorMsg = '社团详情'
                    break
                  case 'locale':
                    errorMsg = '所在校区'
                    break
                  case 'type':
                    errorMsg = '社团类别'
                    break
                  case 'image':
                    errorMsg = '宣传图片'
                    break
                  case 'logo':
                    errorMsg = '社团Logo'
                    break
                  case 'email':
                    errorMsg = '社团公邮'
                    break
                  case 'tag':
                    errorMsg = '自定义标签'
                    break
                  case 'apply_url':
                    errorMsg = '招新链接'
                    break
                  case 'url':
                    errorMsg = '展示链接'
                    break
                  default: errorMsg = '社团信息'
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
              } else {
                Message({
                  message: '未知错误',
                  type: 'error',
                  showClose: true
                })
              }
            }
          }).catch((err) => {
            basicLoading.close()
            Message({
              message: '服务器错误',
              type: 'error',
              showClose: true
            })
            console.error(err)
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
    },
    changeLocale (LocaleName) {
      // 校区未被选中
      if (this.club.locale.indexOf(LocaleName) === -1) {
        this.club.locale.push(LocaleName)
      // 校区已被选中
      } else {
        this.club.locale.splice(this.club.locale.indexOf(LocaleName), 1)
      }
    },
    changeType (type) {
      this.club.type = this.defaulttype
    },
    changeAuto () {
      if (this.club.show_type === true) {
        this.club.show_type = !this.club.show_type
      }
    },
    changeCustom () {
      if (this.club.show_type === false) {
        this.club.show_type = !this.club.show_type
      }
    },
    addPoster () {
      document.getElementsByName('files')[1].click()
    },
    addLogo () {
      document.getElementsByName('files')[0].click()
    },
    logoChanged () {
      this.club.logo = arguments[0]
    },
    posterChanged () {
      this.club.poster = arguments[0]
    },
    errorHandle () {
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
    }
  },
  created () {
    var isLoading = Loading.service()
    basicAPI.getClubInfo(this).then((res) => {
      isLoading.close()
      if (res.status === RES_STATUS.SUCCESS) {
        this.club.name = res.data.clubInfo.name
        this.club.summary.input = res.data.clubInfo.summary
        this.club.introduction.input = res.data.clubInfo.introduction
        this.club.locale = res.data.clubInfo.locale
        this.club.type = res.data.clubInfo.type
        this.defaulttype = res.data.clubInfo.type
        this.club.logo = res.data.clubInfo.logo
        this.club.poster = res.data.clubInfo.image
        this.club.email.input = res.data.clubInfo.email
        this.club.tag.input = res.data.clubInfo.tag
        this.club.apply_url.input = res.data.clubInfo.apply_url
        this.club.show_type = !res.data.clubInfo.show_type
        this.club.url.input = res.data.clubInfo.url
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
#basic {
  width: 655px;
  float: left;
  margin-left: 40px;
  margin-top: 3px;
}
#basic .greenbutton{
  width: 77px;
  margin: 0 auto;
  margin-top: 35px;
  margin-bottom: 48px;
}
#basic .basic-content{
  width: 655px;
  height: 190px;
  margin-top: 34px;
  margin-bottom: 5px;
}
#basic .basic-content div{
  float: left;
}
#basic .basic-content .left{
  width: 63px;
}
#basic .basic-content .middle{
  width: 162px;
  position:relative;
  margin-left: 13px;
}
#basic .basic-content .middle .show{
  visibility: hidden;
  height: 22px;
}
#basic .basic-content .middle .wrapper{
  width:53px;
  height:53px;
  margin-top:8px;
}
#basic .basic-content .middle .wrapper p{  
  line-height: 53px; 
}
#basic .basic-content .right .wrapper{
  width: 256px;
  height: 144px;
  margin-top:12px;
}
#basic .basic-content .right .wrapper p{
  line-height: 147px;
  font-size: 25px; 
}
#basic .basic-content .middle .el-form-item__error{
  width: 162px;
  line-height: 20px;
  height: 20px;
}
#basic .basic-content button{
  float:left;
  margin-top: 23px;
  width: 74px;
  height: 32px;
  background-color: #fff;
  border: 1px solid #cfcfcf;
  color: #cfcfcf;
  border-radius: 3px;
  font-size: 12px;
  outline:none;
}
#basic .basic-content .buttonfocus{
  border: 1px solid #0175d8;
  color: #0175d8;
}
#basic .verticalline{
  position:absolute;
  background-color:#ccc;
  height:32px;
  width:1px;
  left:85px;
}
#basic .basic-content .el-select .el-input__inner{
  width: 120px;
  height: 32px;
  color: #38393b;
  font-size: 13px;
  border-color: #cccccc;
}
#basic .basic-content .el-select .el-input .el-input__icon{
  color: #363a3d;
}
#basic .basic-content .right{
  width: 320px;
  margin-left: 37px;
}
#basic .showtype{
  width: 655px;
  height: 36px;
  margin-bottom: 25px;
  margin-top: 20px;
}
#basic .showtype .left{
  float: left;
}
#basic .showtype .left>span{
  margin-left: 3px;
  line-height: 32px;
  margin-right: 15px;
}
#basic .showtype .el-button .el-button--default{
  border-color: #ccc;
  height: 36px;
}
#basic .showtype .el-button span{
  color: #ccc;
  font-size: 12px;
}
#basic .showtype .el-button:hover{
  border-color: #0175da;
}
#basic .showtype .buttonfocus{
  background-color: #0175da;
}
#basic .showtype .buttonfocus span{
  color: #fff;
}
#basic .showtype .right{
  float: right;
}
#basic a{
  float: right;
  margin-right: -470px;
  line-height: 36px;
  font-size: 11px;
  color: #898989;
}
.showtype .el-input__inner{
  width: 382px;
  height: 36px;
  border-color: #d9d9d9;
}
#basic .showtype .el-input__inner:hover{
  border-color: #99A9BF;
}
#basic .showtype .el-input__inner:focus{
  border-color: #99A9BF;
}
#basic .tips span{
  float: left;
}
</style>
