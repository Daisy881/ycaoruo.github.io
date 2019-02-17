const Mock = require('mockjs')
const data = function() {
  return Mock.mock({
    'code': 200,
    'message': 'success',
    'data': [{
			headPortrait: '',
			nickName: 'Daisy',
			birthday: '1999-01-07',
			shippingAddress: '北京/北京市/朝阳区',
			detailAddress: '青年路265号',
      safety: '中',
      phoneNumber: '182****8503'
		}]
  })
}
module.exports = data
