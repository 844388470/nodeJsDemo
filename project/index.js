var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : '47.100.228.122',       
  user     : 'admin',              
  password : 'admin123456',       
  port: '3306',                   
  database: 'reactdemo',
}); 
 
connection.connect();
//查
connection.query('SELECT * FROM user',function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();