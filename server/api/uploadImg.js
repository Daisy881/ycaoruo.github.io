let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')
const fileUpload = require('express-fileupload')
router.use(fileUpload())
var picAddress = ''

// 保存图片
router.post('/saveHeadPortrait',  (req, res, next) => {
  let avatar = req.files.avatar
  avatar.mv('../static/headPortrait/' + req.files.avatar.name, function(err) {
    if (err) {
      res.json({message:'上传失败', status: 400})
    } else {
      picAddress = "../../../static/headPortrait/" + req.files.avatar.name
      res.json(picAddress)
    }
  })
})

//将图片地址存入数据库
router.post('/saveToSql', (req, res) => {
  const sql = $sql.user.saveHeadPortrait
  let params = req.body
  connection.conn.query(sql, [picAddress, params.id], function(err, rows, fields) {
    if (err) {
      res.json({message:'加入数据库失败', status: 400})
    } else {
      res.json({message:'加入数据库成功', status: 200})
    }
  })
})
module.exports = router
