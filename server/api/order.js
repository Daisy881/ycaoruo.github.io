let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')

// 查询全部
router.post('/getOrder', (req, res) => {
  const sql = $sql.order.getOrder
  let params = req.body
  connection.conn.query(sql, [params.username], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})

// 增加去付款订单
router.post('/addOrder', (req, res) => {
  const sql = $sql.order.addOrder
  let params = req.body
  connection.conn.query(sql, [params.picAddress, params.goodsName, params.count, params.allPrice], function(err, rows, fields) {
    if (err) {
      res.json({message:'增加失败', status: 400})
    } else {
      res.json({message:'增加成功', status: 200})
    }
  })
})

// 修改评价订单
router.post('/editOrder', (req, res) => {
  const sql = $sql.order.editOrder
  let params = req.body
  connection.conn.query(sql, [params.state, params.id], function(err, rows, fields) {
    if (err) {
      res.json({message:'修改失败', status: 400})
    } else {
    	console.log(rows)
      res.json({message:'修改成功', status: 200})
    }
  })
})
module.exports = router
