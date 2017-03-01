var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var path = require('path'); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/my_db');

//Setting up statis directory and templating engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './view');
app.engine('html', require('ejs').renderFile);

//Setting up sessions and cookies
app.use(cookieParser());
app.use(session({secret: "session_id"}));

//Allowing flash messages 
app.use(flash()); 

app.use(bodyParser.urlencoded({extended:true}));

var router = require('./app/routes.js'); 


//Setting up authentication 
// app.use(passport.initialize());
// app.use(passport.session());

app.use(router); 

app.listen(8080); 