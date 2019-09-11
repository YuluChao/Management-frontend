import netUtil from './net_util'

const BASIC_URL = '/web/club/'

export default {
  getClubInfo (context) {
    return netUtil.query(context, 'get', BASIC_URL)
  },
  putClubInfo (context, formData) {
    return netUtil.query(context, 'put', BASIC_URL, formData)
  }
}
