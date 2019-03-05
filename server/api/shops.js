let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')

// 查询全部
router.post('/getShops', (req, res) => {
  const sql = $sql.shops.getShops
  let params = req.body
  connection.conn.query(sql, function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})

// 查询id
router.post('/getIdByShopsName', (req, res) => {
  const sql = $sql.shops.getIdByShopsName
  let params = req.body
  connection.conn.query(sql, [params.shopsName], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})
module.exports = router
