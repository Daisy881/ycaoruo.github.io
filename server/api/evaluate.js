let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')

// 查询对商家的评价
router.post('/shopsEvaluate', (req, res) => {
  const sql = $sql.evaluate.shopsEvaluate
  let params = req.body
  connection.conn.query(sql, [params.shopsId], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})

// 查询对商品的评价
router.post('/goodsEvaluate', (req, res) => {
  const sql = $sql.evaluate.goodsEvaluate
  let params = req.body
  connection.conn.query(sql, [params.shopsId, params.goodsId], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})
module.exports = router