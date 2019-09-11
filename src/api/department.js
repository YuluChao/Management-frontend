import netUtil from './net_util'

const DEPARTMENT_URL = '/web/club/dept/'
const DEPARTMENT_ORDER_URL = '/web/club/dept/order/'

export default {
  getDepts (context) {
    return netUtil.query(context, 'get', DEPARTMENT_URL)
  },
  delDept (context, deptId) {
    return netUtil.query(context, 'delete', DEPARTMENT_URL, {
      body: {dept_id: deptId}
    })
  },
  putDept (context, formData) {
    return netUtil.query(context, 'put', DEPARTMENT_URL, formData)
  },
  postDept (context, formData) {
    return netUtil.query(context, 'post', DEPARTMENT_URL, formData)
  },
  putDeptOrder (context, deptId, prevDeptId) {
    return netUtil.query(context, 'put', DEPARTMENT_ORDER_URL, {
      dept_id: deptId,
      prev_dept_id: prevDeptId
    })
  }
}
