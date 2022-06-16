var mysql = require('mysql');
var conn = mysql.createConnection({
  socketPath: "/cloudsql/capstone-pe4:asia-southeast1:mysql-root-bangkit",
  host: '34.142.212.30', //  Replace with your host name 34.142.172.2 	External 
  user: 'root',      // Replace with your database username 34.128.108.191
  password: 'explosion',      // Replace with your database password
  database: 'articles' // // Replace with your database Name
 // port: 5000

}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;