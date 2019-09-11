import netUtil from './net_util'

const ADMIN_URL = '/web/club/record/'

export default {
  getRecords (context) {
    return netUtil.query(context, 'get', ADMIN_URL)
  }
}
