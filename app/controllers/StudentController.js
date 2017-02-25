let Student = require('../models/Student');
let Project = require('../models/Project');
let StudentController = {

    studentRegister: function (req, res) {
        var studentInfo = req.body;
        console.log(studentInfo);
        Student.find({ username: studentInfo.username }, function (err, student) {
            
            if (err) {
                console.log(err)
            } else if (student[0]) {
                res.render('register', { error: "Sorry, username already in use." })
                console.log("Sorry, username already in use.");
                // console.log(student); 
            } else {
                let newStudent = new Student({
                    username: studentInfo.username,
                    password: studentInfo.password,
                    has_portfolio: false
                });

                newStudent.save(function (err, student) {
                    if (err) {
                        console.log(err);
                    } else {
                        var id = student.id;
                        res.redirect('create-portfolio/' + id, {student}); 
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
                // res.redirect('home/' + id);
            } else {
                console.log("Incorrect username-password combination.");
            }
        });
    },

    studentHome: function (req, res) {
        var id = req.params.id;
        Student.findById(id, function (err, student) {
            if (err) {
                console.log(err);
            } else {
                if (student.has_portfolio)
                    res.render('home', {student});
                else 
                res.render('create-portfolio', {student}); 
            }
        });
    },
    createPortfolio: function (req, res, next) {
        console.log("create portfolio"); 
        var id = req.params.id;
        var form = req.body;
        console.log(req.body); 
        if (!form.link && !form.screenshot) {
            console.log(form.link); 
            console.log(form.screenshot); 
        } else {
            Student.findByIdAndUpdate(id, { name: form.name, has_portfolio: true, number_of_project: 1 }, function (err, student) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("createPortfolio");
                    next();
                }
            }
            );
        }
    },

    saveProfilePhoto: function (req, res, next) {

        if (req.file) {
            var id = req.params.id;
            console.log(id);
            var img = "uploads/" + req.filename;
            Student.findByIdAndUpdate(id, { img_url: img }, function (err, student) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("profile photo added el mafrood");
                    console.log(student);
                }
            });
        }
        next();
    }
}



module.exports = StudentController; 