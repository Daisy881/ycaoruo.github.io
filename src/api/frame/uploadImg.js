import request from '@/utils/frame/request'

export function getImg(params) {
	return request({
		method: 'post',
		url: '/api/uploadImg/picture-upload'
	})
}
