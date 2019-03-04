// sql语句
var sqlMap = {
  // 用户
  user: {
	  getUser: 'select * from user_ruo where username = ?',
	  getByUsername: 'select * from user_ruo where username = ? or phoneNumber = ? and password = ?',
	  getByPhoneNumber: 'select * from user_ruo where phoneNumber = ?',
    add: 'insert into user_ruo (username, password, phoneNumber) values (?, ?, ?)',
    edit: `update user_ruo set username = ?, headPortrait = ?, nickName = ?, birthday = ?, 
          detailAddress = ?, phoneNumber = ?, password = ? where id = ?`
  },
  // 用户订单
  order: {
    getOrder: 'select * from order_info where user_name = ?'
  },
  // 购物车
  shoppingCar: {
    getShoppingCar: 'select * from shops_car where shops_userName = ?',
    addShoppingCar: `insert into shops_car (shops_Name, shops_userName, shops_picAddress, shops_goodsName, shops_price, shops_count) 
                    values (?, ?, ?, ?, ?, ?)`,
    editShoppingCarCount: 'update shops_car set shops_count = ? where id = ?', 
    delShoppingCar: 'delete from shops_car where id = ?'
  },
  //商品信息
  goods: {
    getGoods: 'select * from goods_info',
    searchGoods: 'select * from goods_info where goodsName like ? ' 
  },
  shops: {
    getShops: 'select * from shops_info',
    searchShops: 'select * from shops_info where shopsName like ?'
  },
  goods_shops: {
    mohu: `select goods_info.*, shops_info.* from goods_info 
          left join shops_info on goods_info.belongsShops = shops_info.shopsType 
          where goods_info.goodsName like ? or shops_info.shopsName like ?`
  },
  // 订单支付
  payOrder: {
    getPayOrder: 'select * from payOrder where username = ?'
  },
  // 头像
  headPortrait: {
    saveHeadPortrait: 'insert into head_portrait (originalname, path, mimetype) values (?, ?, ?)'
  }
}
 
module.exports = sqlMap