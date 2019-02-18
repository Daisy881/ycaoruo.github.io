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
module.exports = router
