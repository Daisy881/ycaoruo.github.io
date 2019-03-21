let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')
const multer = require("multer")

// 保存图片
let upload = multer({dest: 'E:\headPortrait'}).any()
router.post('/saveHeadPortrait', upload,  (req, res, next) => {
  // let newname = req.files[0].path
  // let obj = {
  // 	headPortrait: req.body.files
  // }
  // res.json(req.files)
  
  let fileName = ''
  if(req.file !== undefined) {
  	fileName = new Date().getTime() + "_" + req.file.originalname
  	fs.renameSync(req.file.path, __dirname + fileUploadPath + "" + fileName)
  }
  res.send("1")

  // const sql = $sql.headPortrait.saveHeadPortrait
  // connection.conn.query(sql, [req.files.originalname, req.files.path, req.files.mimetype], function(err, rows, fields) {
  //   if (err) {
  //     res.json({message:'保存失败失败', status: 400})
  //   } else {
  //     res.json(rows)
  //   }
  // })
})
module.exports = router
