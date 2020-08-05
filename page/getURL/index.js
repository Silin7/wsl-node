const http = require('http')
const url = require('url')
const qs = require('querystring')
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '123456',
  port: '3306',
  database: 'test_library' 
}); 
 
connection.connect();

const app = http.createServer(function (req, res) {
  if (req.url !== './favicon.ico') {
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=UTF-8',// 字码
      'Access-Control-Allow-Origin': '*', // 跨域
    })
    let urlmsg = url.parse(req.url, true)
    var  addSql = 'INSERT INTO login_information(id,name,password) VALUES(0,?,?)';
    var  addSqlParams = [urlmsg.query.name, urlmsg.query.password];
    connection.query(addSql, addSqlParams, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ', err.message);
        res.end(JSON.stringify({
          msg: '注册失败',
          code: -1,
        }))
        return;
      } else {
      // res.end响应： 必须写，格式必须为字符串
      res.end(JSON.stringify({
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

app.listen(8088)