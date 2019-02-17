// 首页
module.exports = function (app) {
  app.get('/api/layout/list', (req, res) => {
    setTimeout(() => {
      res.send(require(`./getList`)())
    }, 100)
  })
}