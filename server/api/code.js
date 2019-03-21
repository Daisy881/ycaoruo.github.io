let express = require('express')
let router = express.Router()
let luosimaosms = require('../module/luosimaosms.js')

// 发送验证码
router.post('/sendCode', (req, res) => {
  let client = new luosimaosms()
  let params = req.body
  client.sendMessage(params.phoneNumber, params.code, function(data) {
  	res.json(data)
  })
})
module.exports = router