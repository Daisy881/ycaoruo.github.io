import axios from 'axios'

// 配置默认的host
const baseURL = 'http://localhost:8888/'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = localStorage.getItem('myToken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

export default axios