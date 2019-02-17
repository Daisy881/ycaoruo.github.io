const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

require('./mockData/layout/server.js')(app)
require('./mockData/personalCenter/server.js')(app)

let server = app.listen(9999, () => {
  let port = server.address().port
  console.log('Mock Server Running Successfully...')
  console.log(`server listening at http://localhost:${port}`)
})
