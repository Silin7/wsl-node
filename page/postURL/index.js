const http = require('http')
const server = http.createServer()
const qs = require('querystring')
const mysql = require('mysql');


server.on('request', function (request, response) {
  if (request.url !== './favicon.ico') {
    response.writeHead(200, {
      // 指定了该响应的资源是否被允许与给定的origin共享 跨域
      'Access-Control-Allow-Origin': '*',
      // 明确了客户端所要访问的资源允许使用的方法或方法列表
      // 'Access-Control-Allow-Methods': '*',
      // 请求头中设置允许的请求方法
      'Access-Control-Allow-Headers': 'Content-Type',
      // 告诉客户端实际返回的内容的内容类型
      'Content-Type': 'application/json/text/html;charset=UTF-8',
      // 'Access-Control-Allow-Credentials': 'true'
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
 
        var connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password : '1234567',
          port: '3306',
          database: 'test_library' 
        }); 

        connection.connect();

        var  addSql = 'INSERT INTO login_information(id,name,password) VALUES(0,?,?)';
        var  addSqlParams = [paramStr1.name, paramStr1.password];
        connection.query(addSql, addSqlParams, function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
          } else {
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
            
          }
        });
        connection.end();
      }
    })
    response.end(JSON.stringify({
      msg: 'success',
      code: 0,
    }))
  }
})

server.listen(8088, function () {
  console.log('服务器启动成功：')
})