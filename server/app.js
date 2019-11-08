var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose =require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var configDb = require('./ConfigDb/db');
var cors = require('cors');
var bodyParser = require('body-parser')
var passport = require('passport');
// var exphbs  = require('express-handlebars');
var multer = require('multer');

// var favicon = require('serve-favicon');
var app = express();
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

require('./routes/config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(passport.initialize());
//  app.use(express.static(path.join("/")))
app.use(express.static(__dirname + '/'));
mongoose.connect(configDb.DB,{ useNewUrlParser: true }).then(
  () => {console.log("Database is connected")})
  .catch((err)=>{console.log(err)})
  //err => {console.log('can not conect to db'+ err)}



  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });






  app.use((err, req, res) => {
    res.status(err.status || 500);
  
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });











// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    errors:{
      message: err,message,
      error: err,
    }
  })
  res.render('error');
});

module.exports = app;
