const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');  //npm install express-validator@5.3.0    //npm uninstall express-validator
const session = require('express-session');
//const mysql = require('mysql');
//const conn = require('./database/database');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/article');
const app = express();
const port = 8080;
const expressLayouts = require('express-ejs-layouts')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','./layout/full-width' /*path.join(__dirname, 'views')*/);

app.use(expressLayouts)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: '123@abcd',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
)

app.use(expressValidator());
app.use(flash());

app.use('/', indexRouter);
app.use('/article', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(port, function () {
  console.log(`Node server running on port : ${port}`)
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
