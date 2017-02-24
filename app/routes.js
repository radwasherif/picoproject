var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentController = require('./controllers/StudentController'); 

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
router.post('/register', upload.single('img_url'), studentController.studentRegister); 

//User homepage
router.get('/home/:id', studentController.studentHome); 

module.exports = router; 