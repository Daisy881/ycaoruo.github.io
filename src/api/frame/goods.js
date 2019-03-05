import request from '@/utils/frame/request'

export function getGoodsList() {
	return request({
		method: 'post',
		url: '/api/goods/getGoods'
	})
}

export function getListById(id) {
	return request({
		method: 'post',
		url: '/api/goods/getGoodsById',
		data: {
			'id': id
		}
	})
}
