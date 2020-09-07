const express = require('express')
const app = express()

app.use('/', (req, res, next) => {
  console.log('进来了！')
  next();
})

app.use('/login', (req, res, next) => {
  console.log('登录了！')
  next();
})

app.listen(8088, function () {
  console.log('服务器启动成功......')
})