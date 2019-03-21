import request from '@/utils/frame/request'

export function sendCode(params) {
	return request({
		method: 'post',
		url: '/api/code/sendCode',
		data: {
			'phoneNumber': params.phoneNumber,
			'code': params.code
		}
	})
}