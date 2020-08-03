var mysql = require('mysql');
 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '123456',
  port: '3306',
  database: 'test_library' 
}); 
 
connection.connect();
 
var sql = 'SELECT * FROM login_information';
//查
connection.query(sql,function (err, result) {
   if(err){
     console.log('[SELECT ERROR] - ',err.message);
     return;
   } else {
    console.log('--------------------------SELECT----------------------------');
     console.log(result);
     for (key in result) {
       console.log(result[key].id, result[key].name, result[key].password )
     }
    console.log('------------------------------------------------------------\n\n');
   }
});
 
connection.end();
