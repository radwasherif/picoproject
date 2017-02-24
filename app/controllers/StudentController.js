let Student = require('../models/Student');

let StudentController = {

    studentRegister: function (req, res) {
        var studentInfo = req.body;
        var img = '';

        Student.find({ username: studentInfo.username }, function (err, student) {
            if (err) {
                console.log(err)
            } else if (student[0]) {
                res.render('register', { error: "Sorry, username already in use." })
                // console.log("Sorry, username already in use.");
                // console.log(student); 
            } else {
                if (req.filename) {
                    img = "uploads/" + req.filename;
                }
                let newStudent = new Student({
                    name: studentInfo.name,
                    username: studentInfo.username,
                    password: studentInfo.password,
                    img_url: img, 
                    has_portfolio: false 
                });

                newStudent.save(function (err, student) {
                    if (err) {
                        console.log(err);
                    } else {
                        var id = student.id;
                        res.redirect('home/' + id)
                    }
                });
            }

        });
    }, // <-- NOTE THE COMMA HERE!!

    studentSignIn: function (req, res) {
        var signIn = req.body;
        Student.findOne({ username: signIn.username, password: signIn.password }, function (err, student) {
            if (err) {
                console.log(err)
            } else if (student) {
                var id = student.id;
                console.log(student);
                console.log(id);
                res.redirect('home/' + id);
            } else {
                console.log("Incorrect username-password combination.");
            }
        });
    },

    studentHome:function(req, res) {
        var id = req.params.id; 
        Student.findById(id, function(err, student) {
            if(err) {
                console.log(err); 
            } else {
                res.render('home', {student}); 
            }
        }); 
    }




}
module.exports = StudentController; 