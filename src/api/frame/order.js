import request from '@/utils/frame/request'

export function getList(username) {
	return request({
		method: 'post',
		url: '/api/order/getOrder',
    data: {
      'username': username
    }
	})
}

