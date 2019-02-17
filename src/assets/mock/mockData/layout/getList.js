const Mock = require('mockjs')
const data = function() {
  return Mock.mock({
    'code': 200,
    'message': 'success',
    'data': [{
          id: '1',
          src: require('@/icons/img/轮播1.png'),
          value: '1'
        },{
          id: '2',
          src: require('@/icons/img/轮播2.png'),
          value: '2'
        },{
          id: '3',
          src: require('@/icons/img/轮播3.png'),
          value: '3'
        },{
          id: '4',
          src: require('@/icons/img/轮播4.png'),
          value: '4'
        }]
  })
}
module.exports = data
