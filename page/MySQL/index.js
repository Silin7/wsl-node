var mysql = require('mysql');
 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '123456',
  port: '3306',
  database: 'test_library' 
}); 
 
connection.connect();
 
var  addSql = 'INSERT INTO login_information(id,name,password, number) VALUES(0,?,?,?)';
var  addSqlParams = ['silin4.wang', '333333', '01'];
//查
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
