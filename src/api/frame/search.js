import request from '@/utils/frame/request'

export function searchShops(shopsName) {
	return request({
		method: 'post',
		url: '/api/search/searchShops',
		data: {
			'shopsName': '%' + shopsName + '%'
		}
	})
}

export function searchGoods(goodsName) {
	return request({
		method: 'post',
		url: '/api/search/searchGoods',
		data: {
			'goodsName': '%' + goodsName + '%'
		}
	})
}

export function searchMhu(name) {
	return request({
		method: 'post',
		url: '/api/search/searchMhu',
		data: {
			'goodsName': '%' + name + '%',
			'shopsName': '%' + name + '%'
		}
	})
}