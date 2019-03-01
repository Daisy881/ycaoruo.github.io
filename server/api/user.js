let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')

//根据username查询
router.post('/getUserByUsername', (req, res) => {
	const sql = $sql.user.getByUsername
  let params = req.body
	connection.conn.query(sql, [params.username, params.phoneNumber, params.password], function(err, rows, fields) {
		if (err) {
			res.json({message:'获取失败', status: 400})
			return
		} else {
      console.log(rows)
      // 返回token 如果存在 返回token 否则返回null
      if (rows.length > 0) { // 存在用户
        for (const i in rows) {
          res.json({token: rows[i].phoneNumber + rows[i].password + Math.floor(Math.random() * 10000), phoneNumber: rows[i].phoneNumber, username: rows[i].username, status: 200})
        }
      } else {
        res.json({token: '', status: 400})
      }
		}
	})
})

//根据phoneNumber查询
router.post('/getUserByPhoneNumber', (req, res) => {
  const sql = $sql.user.getByPhoneNumber
  let params = req.body
  connection.conn.query(sql, [params.phoneNumber], function(err, rows, fields) {
    if (err) {
      console.log(err)
      res.json({message:'获取失败', status: 400})
      return
    } else {
      // 返回token 如果存在 返回token 否则返回null
      if (rows.length > 0) { // 存在用户
        for (const i in rows) {
          res.json({token: rows[i].phoneNumber + rows[i].password + Math.floor(Math.random() * 10000), phoneNumber: rows[i].phoneNumber, username: rows[i].username, status: 200})
          return
        }
      } else {
        res.json({token: '', status: 400})
        return
      }
    }
  })
})

// 查询用户信息
router.post('/getUser', (req, res) => {
  const sql = $sql.user.getUser
  let params = req.body
  connection.conn.query(sql, [params.username], function(err, rows, fields) {
    if (err) {
      res.json({message:'获取失败', status: 400})
    } else {
      res.json(rows)
    }
  })
})

// 增加
router.post('/addUser', (req, res) => {
  let sql = $sql.user.add
  let params = req.body
  connection.conn.query(sql, [params.username, params.password, params.phoneNumber], function(err, result) {
    if (err) {
      console.log(err)
      res.json({message:'增加失败', status: 400})
    } else {
      console.log(result)
      res.json({message:'增加成功', status: 200})
    }
  })
})
 
// 修改
router.post('/editUser', (req, res) => {
  let sql = $sql.user.edit
  let params = req.body
  connection.conn.query(sql, [params.username, params.headPortrait, params.nickName, params.birthday, 
  					 params.detailAddress, params.phoneNumber, params.password, params.id], function(err, rows, fields) {
    if (err) {
      res.json({message:'修改失败', status: 400})
    } else {
      res.json({message:'修改成功', status: 200})
    }
  })
})

module.exports = router
