var mysql = require('mysql');
var conn = mysql.createConnection({
  host: '34.128.108.191', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'explosion',      // Replace with your database password
  database: 'articles' // // Replace with your database Name
 // port: 5000

}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;