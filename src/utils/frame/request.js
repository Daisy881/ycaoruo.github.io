import axios from 'axios'
import store from '@/store' // 状态管理

// 配置默认的host
const baseURL = 'http://localhost:8888/'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 使用loading设置状态
	store.dispatch('showLoading', true)
	setTimeout(function() {
		store.dispatch('hideLoading', false)
	}, 30000)

  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = sessionStorage.getItem('myToken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

//定义一个响应拦截器 使用loading设置状态
axios.interceptors.response.use(function(config){
  store.dispatch('hideLoading', false)//在这里对返回的数据进行处理
  return config
}, function(error) {
	store.dispatch('hideLoading', false)
	let str = error + ''
	if (str.search('timeout') !== -1) { // 超时error捕获
		alert('请求超时')
	} else {
		alert('系统或网络错误')
	}
})
export default axios