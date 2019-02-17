// sql语句
var sqlMap = {
  // 用户
  user: {
  	  getUser: 'select * from user_ruo where username = ?',
  	  getByUsername: 'select * from user_ruo where username = ? or phoneNumber = ? and password = ?',
  	  getByPhoneNumber: 'select * from user_ruo where phoneNumber = ?',
      add: 'insert into user_ruo (username, password, phoneNumber) values (?, ?, ?)',
      edit: `update user_ruo set username = ?, headPortrait = ?, nickName = ?, birthday = ?, 
            detailAddress = ?, phoneNumber = ?, password = ? where username = ?`
  }
}
 
module.exports = sqlMap