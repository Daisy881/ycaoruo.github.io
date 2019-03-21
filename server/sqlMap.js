// sql语句
var sqlMap = {
  // 用户
  user: {
	  getUser: 'select * from user_ruo where username = ?',
	  getByUsername: 'select * from user_ruo where username = ? or phoneNumber = ? and password = ?',
	  getByPhoneNumber: 'select * from user_ruo where phoneNumber = ?',
    add: 'insert into user_ruo (username, password, phoneNumber) values (?, ?, ?)',
    edit: `update user_ruo set username = ?, nickName = ?, birthday = ?, 
          detailAddress = ?, phoneNumber = ?, password = ? where id = ?`,
    saveHeadPortrait: 'update user_ruo set headPortrait =? where id = ?'
  },
  // 用户订单
  order: {
    getOrder: 'select * from order_info where user_name = ?',
    // 增加订单
    addOrder: `insert into order_info (id, goods_id, user_name, picAddress, goodsName, count, allPrice, state, shopsName, orderNumber) 
              values (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    // 修改订单状态
    editOrder: 'update order_info set state = ? where id = ?'
  },
  // 购物车
  shoppingCar: {
    getShoppingCar: 'select * from shops_car where shops_userName = ?',
    addShoppingCar: `insert into shops_car (shops_Name, shops_userName, shops_picAddress, goods_id, shops_goodsName, 
                    shops_price, shops_count) values (?, ?, ?, ?, ?, ?, ?)`,
    editShoppingCarCount: 'update shops_car set shops_count = ? where id = ?', 
    delShoppingCarById: 'delete from shops_car where id = ?', 
    delShoppingCar: 'delete from shops_car where shops_userName = ?'
  },
  //商品信息
  goods: {
    getGoods: 'select * from goods_info',
    getGoodsById: 'select * from goods_info g, shops_goods sg where g.id = sg.goods_id and sg.shops_id = ?',
    searchGoods: 'select * from goods_info where goodsName like ? ' 
  },
  shops: {
    getShops: 'select * from shops_info',
    getIdByShopsName: 'select s.id from shops_info s where shopsName = ?',
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
  // 评价
  evaluate: {
    shopsEvaluate: `select userinfo.id, userinfo.username, eva.content from 
                      evaluate eva, user_ruo userinfo where eva.user_id = userinfo.id 
                      and eva.shops_id = ?`,
    goodsEvaluate: `select userinfo.id, userinfo.username, eva.content
                      from evaluate eva, user_ruo userinfo where eva.user_id = userinfo.id 
                      and eva.shops_id = ? and eva.goods_id = ?`,
    addEvaluate: 'insert into evaluate (id, user_id, shops_id, goods_id, content) values (null, ?, ?, ?, ?)'
  }
}
 
module.exports = sqlMap