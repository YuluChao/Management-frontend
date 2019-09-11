import netUtil from './net_util'

const ACTIVITY_URL = '/web/club/activity/'
const ACTIVITY_ORDER_URL = '/web/club/activity/order/'

export default {
  getActivities (context) {
    return netUtil.query(context, 'get', ACTIVITY_URL)
  },
  delActivity (context, activityId) {
    return netUtil.query(context, 'delete', ACTIVITY_URL, {
      body: {activity_id: activityId}
    })
  },
  putActivity (context, formData) {
    return netUtil.query(context, 'put', ACTIVITY_URL, formData)
  },
  postActivity (context, formData) {
    return netUtil.query(context, 'post', ACTIVITY_URL, formData)
  },
  putActivityOrder (context, activityId, prevActivityId) {
    return netUtil.query(context, 'put', ACTIVITY_ORDER_URL, {
      activity_id: activityId,
      prev_activity_id: prevActivityId
    })
  }
}
