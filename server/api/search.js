let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')

// 模糊查询商家
router.post('/searchShops', (req, res) => {
  const sql = $sql.shops.searchShops
  let params = req.body
  connection.conn.query(sql, [params.shopsName], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      if (rows.length > 0) {
				res.json(rows)
			} else {
				res.json({message: '未找到商家', status: 401})
			}
    }
  })
})

// 模糊查询商品
router.post('/searchGoods', (req, res) => {
  const sql = $sql.goods.searchGoods
  let params = req.body
  connection.conn.query(sql, [params.goodsName], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
			if (rows.length > 0) {
				res.json(rows)
			} else {
				res.json({message: '未找到商品', status: 401})
			}
    }
  })
})

// 模糊查询商家和商品
router.post('/searchMhu', (req, res) => {
  const sql = $sql.goods_shops.mohu
  let params = req.body
  connection.conn.query(sql, [params.name, params.name], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      if (rows.length > 0) {
				res.json(rows)
			} else {
				res.json({message: '未找到商品或商家', status: 401})
			}
    }
  })
})
module.exports = router
