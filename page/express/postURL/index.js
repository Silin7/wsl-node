const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login/post', (req, res, next) => {
  console.log(req.body)
  console.log(req.body.name)
  console.log(req.body.password)
})

app.listen(8088, () => {
  console.log('服务器启动成功......')
})