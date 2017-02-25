var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentController = require('./controllers/StudentController'); 
var projectController = require('./controllers/ProjectController'); 
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
router.get('/', function(req, res) {
    res.render('index');  
}); 

//Signin route
router.get('/signin', function(req, res) {
    res.render('signin');
});
router.post('/signin', studentController.studentSignIn); 

//Register route 
router.get('/register', function(req, res) {
    res.render('register', {error: ""}); 
}); 
router.post('/register', studentController.studentRegister); 

//User homepage
router.get('/home/:id', studentController.studentHome); 

//Create portfolio 
router.get('/create-portfolio/:id', studentController.studentHome);
//Updates portfolio info in student object 
router.post('/create-portfolio/:id', studentController.createPortfolio); 

//Uploads the student attribute 'img_url' if the student is authenticated
router.post('/create-portfolio/:id', upload.single('profile_photo'), studentController.saveProfilePhoto); 
//Create the first project of the user 
router.post('/create-portfolio/:id', upload.single('screenshot'), projectController.createProject); 
module.exports = router; 