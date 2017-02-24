var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var path = require('path'); 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/my_db');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './view');
app.engine('html', require('ejs').renderFile);


app.use(bodyParser.urlencoded({extended:false}));

var router = require('./app/routes.js'); 

app.use(router); 

app.listen(8080); 