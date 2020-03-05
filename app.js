var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require("hbs");
var session = require("express-session");

var index = require('./routes/index');
var login = require("./routes/login");
var error = require("./routes/error");
var registe = require("./routes/registe");
var wechat = require("./routes/wechat");
var mp = require("./routes/mp");

var app = express();

//extend layout.hbs
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name, context) {
  var len = (blocks[name] || []).length;
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return len ? val : context.fn(this);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(".html", hbs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app session
app.use(session({
  secret: "hello world",
  resave: false,
  rolling: false,
  name: 'H5Session',
  saveUninitialized: true,
  cookie: {user: "default", maxAge: 30*60*1000}
}));

app.use(function(req,res,next){
  next();
  // if (!req.session.user) {
  //   if (req.url === '/login' || req.url === '/error' || req.url === '/registe') {
  //     next();请求为登陆或者注册则不需要校验session
  //   } else{
  //     res.redirect("/login");
  //   }
  // } else if (req.session.user) {
  //   next();
  // }
});

app.use('/', index);
app.use("/login", login);
app.use("/error", error);
app.use("/registe", registe);
app.use("/api/wechat", wechat);
app.use("/api/mp", mp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
