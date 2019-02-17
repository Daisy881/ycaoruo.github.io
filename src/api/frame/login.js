import request from '@/utils/frame/request'

export function loginByUsername(params) {
	return request({
		method: 'post',
		url: '/api/user/getUserByUsername',
		data: {
			'username': params.username,
			'phoneNumber': params.phoneNumber,
			'password': params.password
		}
	})
}

export function loginByNumber(phoneNumber) {
	return request({
		method: 'post',
		url: '/api/user/getUserByPhoneNumber',
		data: {
			'phoneNumber': phoneNumber
		}
	})
}
