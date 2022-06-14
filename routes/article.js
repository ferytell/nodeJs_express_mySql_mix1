var express = require('express');
var router = express.Router();
var db=require('../database/database');



router.get('/form',showForm1);
function showForm1(req, res, next) { 
console.log("test1");
res.render('article_form',{ title: 'Mksa Quality control' }); 
};
router.post('/createfirst', function(req, res, next) {
  // store all the user input data
  const userDetails=req.body;
  // insert user data into users table
  var sql = 'INSERT INTO articles SET ?';
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("Article is inserted successfully "); 
  });
 res.redirect('/article/forming');  // redirect to user form page after inserting the data
}); 











/*var express = require('express');
var router = express.Router();

 //GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/

//-----------------------------------------------------------------
/*
router.get('/form,', function(req, res, next) { 
  res.render('article_form', { title: 'Mksa Quality control' }); 

});
router.post('/createfirs', function(req, res, next) {
  // store all the user input data
  const userDetails=req.body;
  // insert user data into users table
  var sql = 'INSERT INTO articles SET ?';
  db.query(sql, userDetails,function (err, data) {
      if (err) throw err;
         console.log("Article is inserted successfully ");
  });
 res.redirect('/article/form'); // redirect to user form page after inserting the data
});
*/
//--------------------------------------------------------------------------



//--------------------------------------------------------------------------
router.get('/forming',showForm);
function showForm(req, res, next) { 
  console.log("test1");
  var getQuery = "SELECT article, mksa FROM articles ORDER BY articleid DESC LIMIT 1";
  let query = db.query(getQuery, (err,result) => {
    if(err){
      console.log(err);
    }
    res.render('article_form_plus',{ articleData: result });
    });
};
router.post('/create', function(req, res, next) {
  const userDetails=req.body;
  var sql = 'INSERT INTO articles SET ?';
  db.query(sql, userDetails,function (err, data) { 
      if (err) next(err);
      else{
        console.log("Article is inserted successfully ");
        res.redirect('/article/forming');  // redirect to user form page after inserting the data

      }
         
  });
 
}); 

//--------------------------------------------------------------------------


router.get('/list', function(req, res, next) {
  var sql='SELECT * FROM articles';
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
 // console.log(data);
  res.render('article_list', { title: 'Article-List', ArticleData: data});
});
});
//------------------------------------------------------------------------
router.get('/profile', function (req, res, next) {
  db.query('SELECT * FROM articles ORDER BY article_id desc', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('profile', { data: '' })
    } else {
      res.render('profile', { data: rows })
    }
  })
})

//------------------------------------------------------------------------------------------


//-------------------------------------------------

module.exports = router;