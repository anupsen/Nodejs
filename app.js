var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator'); //Declare Express-Validator
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var mysql = require("mysql");

var cons = require('consolidate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webIndexRouter = require('./routes/api/users');





var app = express();


// view engine setup
//app.engine('html', cons.swig);

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash()); // use connect-flash for flash messages stored in session

// middleware for error validation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*---------Call Web Services route----------------------*/

var webIndexRouter = require('./routes/api/users');

/*--------------------------------------------------*/



/*---------------Web Services Middleware---------------*/ 
app.use('/api', webIndexRouter);


/*----------------CORS Middleware----------------------*/
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

/*---------------Initiallising connection string--------*/
global.dbConfig = mysql.createConnection({
	host: "localhost",
    user: "root",
    password:"",
    database:"webservicesdata"
});

/*----------Function to connect to database and execute query------------*/


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
 // res.render('error');
  
  var response = {success:'false', 'message': err.message};
						res.contentType('application/json');
						res.status(500).send(JSON.stringify(response));	
  
});


module.exports = app;
