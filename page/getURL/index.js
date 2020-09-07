const http = require('http')
const app = http.createServer()
const url = require('url')
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '123456',
  port: '3306',
  database: 'test_library' 
}); 
 
connection.connect();

app.on('request', function (request, response) {
  let urlmsg = url.parse(request.url, true)
  if (urlmsg.pathname === '/login/get') {
    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*', // 跨域
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json/text/html;charset=UTF-8',
    })
    var addSql = 'INSERT INTO login_information(id,name,password,number) VALUES(0,?,?,1)';
    var addSqlParams = [urlmsg.query.name, urlmsg.query.password];
    connection.query(addSql, addSqlParams, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ', err.message);
        response.end(JSON.stringify({
          msg: '注册失败',
          code: -1,
        }))
        return;
      } else {
        // response.end响应： 必须写，格式必须为字符串
        response.end(JSON.stringify({
          msg: 'success',
          code: 0,
          result: result
        }))
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
      }
    });
  }
})

app.listen(8088, function () {
  console.log('服务器启动成功......')
})