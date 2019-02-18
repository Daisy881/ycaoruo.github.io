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
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
 
// 后端api路由
app.use('/api/user', userApi)
app.use('/api/order', orderApi)
app.use('/api/shoppingCar', shoppingCarApi)
app.use('/api/goods', goodsApi)
 
// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')