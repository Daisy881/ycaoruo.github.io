// 个人设置
module.exports = function (app) {
  app.get('/api/personalCenter/list', (req, res) => {
    setTimeout(() => {
      res.send(require(`./getList`)())
    }, 100)
  })
}