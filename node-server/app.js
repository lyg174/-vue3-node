var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const WebProductRouter = require('./routes/web/ProductRouter');
const WebNewsRouter = require('./routes/web/NewsRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//web端请求
app.use(WebNewsRouter)
app.use(WebProductRouter)

app.use((req, res, next) => {// token验证
  if (req.url === '/admin-api/user/login') {
    next()
    return;
  }

  const token = req.headers.authorization;

  if (token) {
    const tokenData = JWT.verify(token);

    if (tokenData) {
      const newToken = JWT.generate({
        id: tokenData.id,
        username: tokenData.username,
      }, '1d');

      res.header('authorization', newToken);

      next()
    } else {
      res.status(401).send({ errorInfo: 'token过期' })
    }
  }
})

app.use('/', indexRouter);

app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
