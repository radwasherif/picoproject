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
                    name: '',
                    username: studentInfo.username,
                    password: studentInfo.password,
                    has_portfolio: false,
                    number_of_projects: 0,
                    profile_photo: ''
                });

                newStudent.save(function (err, student) {
                    if (err) {
                        console.log(err);
                    } else {
                        req.session.user = student;
                        req.flash('message', 'You have successfully registered to Pico!');
                        res.redirect('home');
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
                // var newStudent = { id: student.id, username: student.username, student: signIn.password, has_portfolio: student.has_portfolio };
                // req.session.user = newStudent;
                console.log("Login");
                    req.session.user = student;
                console.log(req.session.user);
                req.flash('message', 'You have successfully signed in.');
                res.redirect('/home');
            } else {
                req.flash('message', 'Incorrect username-password combination.');
                res.redirect('/signin');
            }
        });
    },

    renderHomepage: function (req, res) {
        var studentInfo = req.session.user;
        console.log(req.session.user);
        if (req.session.user.has_portfolio) {
            Project.find({ student_username: studentInfo.username }, function (err, projects) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('home', { message: req.flash('message'), student: studentInfo, projects: projects });

                }
            });
        } else {
            res.render('create-portfolio', { message: req.flash('message'), student: req.session.user });
        }
    },
    createPortfolio: function (req, res, next) {
        console.log("create portfolio");
        console.log(req.session.user);
        var id = req.session.user._id;
        var form = req.body;
        // console.log(req.files); 
        var img = "uploads/" + req.files[0].filename;
        if (!form.link && !form.screenshot) {
            req.flash('message', 'You must attach a link or a screenshot for your work');
            res.redirect('/create-portfolio');
        } else {
            Student.findByIdAndUpdate(id, {
                name: form.name,
                has_portfolio: true,
                number_of_project: 1,
                profile_photo: img
            }, { new: true }, function (err, student) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("updated");
                    console.log(student);
                    req.session.user = student;
                    req.flash('message', 'Your profile has been successfully created.');
                    next();
                    // res.redirect('/home');
                }
            }
            );
        }
    },
    signOut: function (req, res) {
        req.session.destroy(function() {
            console.log("Signed out"); 
        })
        res.redirect('/'); 
    }   
    ,
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