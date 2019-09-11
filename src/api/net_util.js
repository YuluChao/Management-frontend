import * as RES_STATUS from './util'
import Vue from 'vue'

export default {
  query (context, method, url, parameter) {
    return new Promise(function (resolve, reject) {
      if (!context) {
        Vue.http[method.toLowerCase()](url, parameter).then((res) => {
          if (res.status !== RES_STATUS.SUCCESS) {
            reject()
          } else {
            resolve(res.body)
          }
        }, (res) => {
          reject()
        })
      } else {
        context.$http[method.toLowerCase()](url, parameter).then((res) => {
          if (res.status !== RES_STATUS.SUCCESS) {
            reject()
          } else {
            resolve(res.body)
          }
        }, (res) => {
          reject()
        })
      }
    })
  }
}
