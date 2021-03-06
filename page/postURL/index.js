const http = require('http')
const app = http.createServer()
// const qs = require('querystring')
const mysql = require('mysql');
const { constants } = require('buffer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '123456',
  port: '3306',
  database: 'test_library' 
}); 

connection.connect();

app.on('request', function (request, response) {
  console.log(request.url)
  if (request.url === '/login/post') {
    response.writeHead(200, {
      // 指定了该响应的资源是否被允许与给定的origin共享 跨域
      'Access-Control-Allow-Origin': '*',
      // 明确了客户端所要访问的资源允许使用的方法或方法列表
      'Access-Control-Allow-Methods': '*',
      // 请求头中设置允许的请求方法
      'Access-Control-Allow-Headers': 'Content-Type',
      // 告诉客户端实际返回的内容的内容类型
      'Content-Type': 'application/json/text/html;charset=UTF-8',
    })
    let paramStr = ''
    // 监听data实现获取post请求的数据
    request.on('data', data => {
      paramStr += data//分批读取post请求传递过来的数据
    })
    // 监听数据读取完毕
    request.on('end', () => {
      if (paramStr != '') {
        paramStr1 = JSON.parse(paramStr)
        console.log('2', paramStr1.name, paramStr1.password)
        var length = 'SELECT COUNT(*) AS K FROM `login_information`'
        var  addSql = 'INSERT INTO login_information(id,name,password, number) VALUES(0,?,?,1)';
        var  addSqlParams = [paramStr1.name, paramStr1.password];
        connection.query(length, function (err, result) {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
            console.log(result[0].K)
          }
        })
        connection.query(addSql, addSqlParams, function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            response.end(JSON.stringify({
              msg: '注册失败',
              code: -1,
            }))
            return;
          } else {
            response.end(JSON.stringify({
              msg: 'success',
              code: 0,
            }))
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
          }
        });
        connection.end();
      } else {
        response.end(JSON.stringify({
          msg: 'options',
          code: 1,
        }))
      }
    })
    
  }
})

app.listen(8088, function () {
  console.log('服务器启动成功......')
})