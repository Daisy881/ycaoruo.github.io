import request from '@/utils/frame/request'

export function getOrderList(username) {
	return request({
		method: 'post',
		url: '/api/order/getOrder',
    data: {
      'username': username
    }
	})
}

export function addOrder(params) {
	return request({
		method: 'post',
		url: '/api/order/addOrder',
    data: {
      'picAddress': params.picAddress,
      'goodsName': params.goodsName,
      'count': params.count,
      'allPrice': params.allPrice
    }
	})
}

export function editOrder(params) {
	return request({
		method: 'post',
		url: '/api/order/editOrder',
    data: {
    	'state': params.state,
      'id': params.id
    }
	})
}

