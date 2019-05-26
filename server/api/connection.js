var models = require('../db')
var mysql = require('mysql')
 
// 连接数据库
var conn = mysql.createConnection(models.mysql)
 
conn.connect()
<<<<<<< HEAD
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else {
        res.json(ret)
    }
}

module.exports = { jsonWrite, conn }
=======

module.exports = { conn }
>>>>>>> 提交后续代码，完善信息
