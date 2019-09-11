import netUtil from './net_util'

const LOGIN_URL = '/web/club/login/'
const LOGOUT_URL = '/web/club/logout/'

export default {
  login (context, key) {
    return netUtil.query(context, 'post', LOGIN_URL, {
      key: key
    })
  },
  logout (context) {
    return netUtil.query(context, 'get', LOGOUT_URL)
  }
}
