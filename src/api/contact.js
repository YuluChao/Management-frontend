import netUtil from './net_util'

const CONTACT_URL = '/web/club/contact/'

export default {
  getContact (context) {
    return netUtil.query(context, 'get', CONTACT_URL)
  },
  putContact (context, email, phone) {
    return netUtil.query(context, 'put', CONTACT_URL, {
      email: email,
      phone: phone
    })
  }
}
