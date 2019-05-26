let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')

// 查询全部收货地址
router.post('/getAddress', (req, res) => {
  const sql = $sql.address.getAddress
  let params = req.body
  connection.conn.query(sql, [params.username], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})

// 根据id查询收货地址
router.post('/getAddressById', (req, res) => {
  const sql = $sql.address.getAddressById
  let params = req.body
  connection.conn.query(sql, [params.id], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})

// 增加收货地址
router.post('/addAddress', (req, res) => {
  const sql = $sql.address.addAddress
  let params = req.body
  connection.conn.query(sql, [params.username, params.cname, params.cPhone, params.shippingAddress, params.detailAddress, params.defaultAddress],
  	function(err, rows, fields) {
    if (err) {
  		console.log(err)
      res.json({message:'增加失败', status: 400})
    } else {
      res.json({message:'增加成功', status: 200})
    }
  })
})

// 删除收货地址
router.post('/delAddress', (req, res) => {
  const sql = $sql.address.delAddress
  let params = req.body
  connection.conn.query(sql, [params.id], function(err, rows, fields) {
    if (err) {
      res.json({message:'删除失败', status: 400})
    } else {
      res.json({message:'删除成功', status: 200})
    }
  })
})

// 修改收货地址
router.post('/editAddress', (req, res) => {
  const sql = $sql.address.editAddress
  let params = req.body
  connection.conn.query(sql, [params.cname, params.cPhone, params.shippingAddress, params.detailAddress, params.defaultAddress, params.id], function(err, rows, fields) {
    if (err) {
      res.json({message:'修改失败', status: 400})
    } else {
      res.json({message:'修改成功', status: 200})
    }
  })
})

// 修改收货地址的默认状态
router.post('/editDefault', (req, res) => {
  const sql = $sql.address.editAddressDefault
  let params = req.body
  connection.conn.query(sql, [params.defaultAddress, params.id], function(err, rows, fields) {
    if (err) {
      res.json({message:'修改失败', status: 400})
    } else {
      res.json({message:'修改成功', status: 200})
    }
  })
})

// 根据地区编码获取地区中文
router.post('/getDictionary', (req, res) => {
  const sql = $sql.address.getDictionary
  let params = req.body
  connection.conn.query(sql, [params.key], function(err, rows, fields) {
    if (err) {
      res.json({message:'查询失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})

// 增加地区编码和地区中文
router.post('/addDictionary', (req, res) => {
  const sql = $sql.address.addDictionary
  let params = req.body
  connection.conn.query(sql, [params.key, params.value], function(err, rows, fields) {
    if (err) {
      res.json({message:'增加失败', status: 400})
    } else {
      res.json({message:'增加成功', status: 200})
    }
  })
})
module.exports = router