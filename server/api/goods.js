let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')

// 查询全部
router.post('/getGoods', (req, res) => {
  const sql = $sql.goods.getGoods
  connection.conn.query(sql, function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})

// 根据商家id查询优惠促销的商品
router.post('/getGoodsById', (req, res) => {
  const sql = $sql.goods.getGoodsById
  const params = req.body
  connection.conn.query(sql, [params.id], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})
module.exports = router