const express = require('express')
const app = express()

app.get('/login/get', (req, res, next) => {
  console.log(req.query)
  console.log(req.query.name)
  console.log(req.query.password)
})

app.listen(8088, () => {
  console.log('服务器启动成功......')
})