import request from '@/utils/frame/request'

export function getShopsList() {
	return request({
		method: 'post',
		url: '/api/shops/getShops'
	})
}
