import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

import tabBar from "pages/common/tabBar.vue"
Vue.component('tabBar', tabBar)

import utils from 'utils/utils.js'
Vue.prototype.$utils = utils


const app = new Vue({
	...App
})
app.$mount()
