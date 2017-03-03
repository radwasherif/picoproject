var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentController = require('./controllers/StudentController');
var projectController = require('./controllers/ProjectController');
var portfoliosController = require('./controllers/PortfoliosController');
var multer = require('multer');
//file filter for multer

var upload = multer({
    dest: 'public/uploads',
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
});

//Mainpage route
router.get('/', function (req, res) {
    res.render('index');
});

//Signin route
router.get('/signin', function (req, res) {
    res.render('signin', { message: req.flash('message') });
});
router.post('/signin', studentController.studentSignIn);

//Register route 
router.get('/register', function (req, res) {
    res.render('register', { error: "" });
});
router.post('/register', studentController.studentRegister);

//User homepage
router.get('/home', studentController.renderHomepage);

//Create portfolio 
router.get('/create-portfolio', studentController.renderHomepage);
//Updates portfolio info in student object 
router.post('/create-portfolio', upload.any(), studentController.createPortfolio);

//Create the first project of the user 
router.post('/create-portfolio', studentController.addProject);

//Create project
router.post('/home', upload.any(), studentController.addProject);

// Sign out 
router.get('/signout', studentController.signOut);

//View all portfolios
router.get('/portfolios', portfoliosController.renderPortfoliosPage);

//Search portfolios 
router.post('/portfolios', portfoliosController.searchPortfolios); 
module.exports = router; 