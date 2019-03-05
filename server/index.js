// node 后端服务器
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const userApi = require('./api/user')
const orderApi = require('./api/order')
const shoppingCarApi = require('./api/shoppingCar')
const goodsApi = require('./api/goods')
const shopsApi = require('./api/shops')
const searchApi = require('./api/search')
const evaluateApi = require('./api/evaluate')
// const uploadImgApi = require('./api/uploadImg')

// 解决跨域问题 在起的服务中设置请求头 即允许所有的地址都可以访问后台接口即3000端口
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
 
// 后端api路由
app.use('/api/user', userApi)
app.use('/api/order', orderApi)
app.use('/api/shoppingCar', shoppingCarApi)
app.use('/api/goods', goodsApi)
app.use('/api/shops', shopsApi)
app.use('/api/search', searchApi)
app.use('/api/evaluate', evaluateApi)
// app.use('/api/uploadImg', uploadImgApi)
 
// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')