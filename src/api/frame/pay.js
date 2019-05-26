import request from '@/utils/frame/request'

export function doPay(username) {
	return request({
		method: 'post',
		url: '/api/pay/doPay'
	})
}
