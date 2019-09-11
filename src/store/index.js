import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clubInfo: {
      name: '',
      summary: '',
      introduction: '',
      locale: [],
      type: '',
      image: '',
      logo: '',
      tag: '',
      email: '',
      apply_url: '',
      show_type: true,
      url: ''
    }
  },
  mutations: {
    change_club_info (state, clubInfo) {
      state.clubInfo = clubInfo
    }
  },
  strict: true
})
