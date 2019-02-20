import request from '@/utils/frame/request'

export function saveHeadPortrait(params) {
	return request({
		method: 'post',
		url: '/api/uploadImg/saveHeadPortrait',
		contentType: false,
		processData: false,
		data: params
	})
}
