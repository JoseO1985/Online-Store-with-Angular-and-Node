var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');
var helpers = require('./public/admin/assets/js/helpers.js');


var passport = require('passport');

var app = express();

var routes = require('./controllers/index');
var apiproducts = require('./controllers/products');
var apiauth = require('./controllers/auth');
var apishipping = require('./controllers/shipping');
var apibilling = require('./controllers/billing');
var apiorder = require('./controllers/order');

var products = require('./controllers/admin/products');
var orders = require('./controllers/admin/orders');
var users = require('./controllers/admin/admin_users');
var admin = require('./controllers/admin/index');


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    extname: 'hbs',
    helpers: helpers
}));


app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// passport config backend
var models = require('./models/store_model.js');
passport.use(models.Administrator.createStrategy());

passport.serializeUser(models.Administrator.serializeUser());
passport.deserializeUser(models.Administrator.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/apiproducts/', apiproducts);
app.use('/apiauth/', apiauth);
app.use('/apishipping/', apishipping);
app.use('/apibilling/', apibilling);
app.use('/apiorder/', apiorder);

app.use('/', routes);
app.use('/admin/products/', products);
app.use('/admin/orders/', orders);
app.use('/admin/users/', users);
app.use('/admin/', admin);


app.all('/*', function (req, res) { res.render('index'); }); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;