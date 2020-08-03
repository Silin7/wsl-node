const http = require("http")
var mysql = require('mysql');


const app = http.createServer(function (req, res) {
  if (req.url !== "./favicon.ico") {
    res.writeHead(200,{
      "Content-Type": "text/html;charset=UTF-8"
    })
    // 
    console.log('start')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password : '123456',
      port: '8088',
      database: 'test_library' 
    }); 
    connection.connect();
    var sql = 'SELECT * FROM `login_information` WHERE 1';
    //查
    connection.query(sql, function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      console.log(result);
      connection.end();
    });
    console.log('end')
    // 
    res.end(JSON.stringify({
      msg: 'success',
      code: 0,
    }))
  }
})

app.listen(8088)