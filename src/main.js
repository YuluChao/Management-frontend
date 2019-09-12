import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/page/App'
import { Input, Select, Option, Button, ButtonGroup, Dialog, Form, FormItem, Pagination } from 'element-ui'
import VueRouter from 'vue-router'
import router from './router'
import transform from './api/transform'
import store from './store'
import './mock/mock'

Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Pagination.name, Pagination)

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(transform)

/* app entry file */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
