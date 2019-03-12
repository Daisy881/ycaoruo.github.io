let express = require('express')
let router = express.Router()
let connection = require('./connection.js')
let $sql = require('../sqlMap')

// 查询
router.post('/getShoppingCar', (req, res) => {
	const sql = $sql.shoppingCar.getShoppingCar
	let params = req.body
	connection.conn.query(sql, [params.username], function(err, rows, fields) {
		if (err) {
			res.json({message: '查询失败', status: 400})
		} else {
			res.json(rows)
		}
	})
})

// 增加
router.post('/addShoppingCar', (req, res) => {
	const sql = $sql.shoppingCar.addShoppingCar
	let params = req.body
	connection.conn.query(sql, [params.shopName, params.username, params.picAddress, params.goodsId, params.goodsName, params.price, params.count], function(err, rows, fields) {
		if (err) {
			res.json({message: '添加失败', status: 400})
		} else {
			res.json({message: '添加成功', status: 200})
		}
	})
})

// 修改商品数量
router.post('/editShoppingCarCount', (req, res) => {
	const sql = $sql.shoppingCar.editShoppingCarCount
	let params = req.body
	connection.conn.query(sql, [params.count, params.id], function(err, rows, fields) {
		if (err) {
			console.log(err)
			res.json({message: '修改失败', status: 400})
		} else {
			res.json({message: '修改成功', status: 200})
		}
	})
})

// 删除单个
router.post('/delShoppingCar', (req, res) => {
	const sql = $sql.shoppingCar.delShoppingCarById
	let params = req.body
	connection.conn.query(sql, [params.id], function(err, rows, fields) {
		if (err) {
			console.log(err)
			res.json({message: '删除失败', status: 400})
		} else {
			res.json({message: '删除成功', status: 200})
		}
	})
})

// 删除所有
router.post('/delAllGoods', (req, res) => {
	const sql = $sql.shoppingCar.delShoppingCar
	let params = req.body
	connection.conn.query(sql, [params.username], function(err, rows, fields) {
		if (err) {
			console.log(err)
			res.json({message: '删除失败', status: 400})
		} else {
			res.json({message: '删除成功', status: 200})
		}
	})
})
module.exports = router
