import request from '@/utils/frame/request'

export function getAddress(username) {
	return request({
		method: 'post',
		url: '/api/address/getAddress',
		data: {
			'username': username
		}
	})
}

export function getAddressById(id) {
	return request({
		method: 'post',
		url: '/api/address/getAddressById',
		data: {
			'id': id
		}
	})
}

export function addAddress(params) {
	return request({
		method: 'post',
		url: '/api/address/addAddress',
		data: {
			'username': params.username,
			'cname': params.cname,
			'cPhone': params.cPhone,
			'shippingAddress': params.shippingAddress,
			'detailAddress': params.detailAddress,
			'defaultAddress': params.defaultAddress
		}
	})
}

export function editAddress(params) {
	return request({
		method: 'post',
		url: '/api/address/editAddress',
		data: {
			'cname': params.cname,
			'cPhone': params.cPhone,
			'shippingAddress': params.shippingAddress,
			'detailAddress': params.detailAddress,
			'defaultAddress': params.defaultAddress,
			'id': params.id
		}
	})
}

export function editDefault(params) {
	return request({
		method: 'post',
		url: '/api/address/editDefault',
		data: {
			'defaultAddress': params.defaultAddress,
			'id': params.id
		}
	})
}

export function delAddress(id) {
	return request({
		method: 'post',
		url: '/api/address/delAddress',
		data: {
			'id': id
		}
	})
}

export function getDictionary(key) {
	return request({
		method: 'post',
		url: '/api/address/getDictionary',
		data: {
			'key': key
		}
	})
}


export function addDictionary(params) {
	return request({
		method: 'post',
		url: '/api/address/addDictionary',
		data: {
			'key': params.key,
			'value': params.value
		}
	})
}

