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
module.exports = router