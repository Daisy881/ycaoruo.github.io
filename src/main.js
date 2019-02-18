// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import './assets/icons/iconfont.css'

import store from './store' // 状态管理

import '@/directive/frame/filters' // 导入过滤器

// 验证码
// import cookieParase from 'cookie-parser'
// import svgCaptcha from 'svg-captcha'

Vue.use(ElementUI)
// Vue.use(cookieParase)
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
	store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
