import request from '@/utils/frame/request'

export function getList(username) {
	return request({
		method: 'post',
		url: '/api/shoppingCar/getShoppingCar',
		data: {
			'username': username
		}
	})
}

export function addGoods(params) {
	return request({
		method: 'post',
		url: '/api/shoppingCar/addShoppingCar',
		data: {
			'shopName': params.shopName,
			'username': params.username,
			'picAddress': params.picAddress,
			'goodsName': params.goodsName,
			'price': params.price,
			'count': params.count
		}
	})
}

export function editGoodsCount(params) {
	return request({
		method: 'post',
		url: '/api/shoppingCar/editShoppingCarCount',
		data: {
			'count': params.count,
			'id': params.id
		}
	})
}

export function delGoods(id) {
	return request({
		method: 'post',
		url: '/api/shoppingCar/delShoppingCar',
		data: {
			'id': id
		}
	})
}