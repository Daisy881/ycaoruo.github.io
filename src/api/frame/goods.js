import request from '@/utils/frame/request'

export function getList() {
	return request({
		method: 'post',
		url: '/api/goods/getGoods'
	})
}
