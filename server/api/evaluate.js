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

// 增加评价
router.post('/addEvaluate', (req, res) => {
  const sql = $sql.evaluate.addEvaluate
  let params = req.body
  connection.conn.query(sql, [params.userId, params.shopsId, params.goodsId, params.content], function(err, rows, fields) {
    if (err) {
      res.json({message:'增加失败', status: 400})
    } else {
      res.json({message:'增加成功', status: 200})
    }
  })
})
module.exports = router