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
      'username': params.username,
      'nickName': params.nickName,
      'birthday': params.birthday,
<<<<<<< HEAD
      // 'shippingAddress': params.shippingAddress,
      'detailAddress': params.detailAddress,
=======
>>>>>>> 提交后续代码，完善信息
      'phoneNumber': params.phoneNumber,
      'password': params.password,
      'id': params.userId
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

export function editPwd(params) {
  return request({
    method: 'post',
    url: '/api/user/editUserPwd',
    data: {
      'password': params.password,
      'phoneNumber': params.phoneNumber
    }
  })
}
