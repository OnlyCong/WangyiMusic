import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/common.css'
import './assets/font/iconfont.css'
import api from './api/index'
import Tabs from './components/tabs'
import BackTop from './components/backtop'

import '@/styles/index.less'

Vue.use(Tabs)//挂载全局组件
Vue.use(BackTop)
Vue.prototype.$api = api;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
