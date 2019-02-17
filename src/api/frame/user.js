import request from '@/utils/frame/request'

export function getList(username) {
	return request({
		method: 'post',
		url: '/api/user/getUser',
    data: {
      'username': username
    }
	})
}

export function editList(params) {
	return request({
		method: 'post',
		url: '/api/user/editUser',
    data: {
      'headPortrait': params.headPortrait,
      'username': params.username,
      'nickName': params.nickName,
      'birthday': params.birthday,
      // 'shippingAddress': params.shippingAddress,
      'detailAddress': params.detailAddress,
      'password': params.password,
      'phoneNumber': params.phoneNumber
    }
	})
}

export function addUser(params) {
	return request({
		method: 'post',
		url: '/api/user/addUser',
    data: {
    	'username': params.username,
    	'password': params.password,
    	'phoneNumber': params.phoneNumber
    }
	})
}
