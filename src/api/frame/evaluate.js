import request from '@/utils/frame/request'

export function getShopsEvaluate(params) {
	return request({
		method: 'post',
		url: '/api/evaluate/shopsEvaluate',
		data: {
			'shopsId': params
		}
	})
}

export function getGoodsEvaluate(params) {
	return request({
		method: 'post',
		url: '/api/evaluate/goodsEvaluate',
		data: {
			'shopsId': params.shopsId,
			'goodsId': params.goodsId
		}
	})
}