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
                // console.log("Sorry, username already in use.");
                // console.log(student); 
            } else {
                let newStudent = new Student({
                    name: '',
                    username: studentInfo.username,
                    password: studentInfo.password,
                    has_portfolio: false,
                    projects: [],
                    profile_photo: '',
                    description: ''
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
    /**
     * Checks the validity of the sign in credentials 
     * Then it either redirects the user to the homepage 
     * Or it displays a message saying that credentials are invalid 
     */
    studentSignIn: function (req, res) {
        var signIn = req.body;
        Student.findOne({ username: signIn.username, password: signIn.password }, function (err, student) {
            if (err) {
                console.log(err)
            } else if (student) {
                var id = student.id;
                // console.log(student);
                // console.log(id);
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
    /**
     * Chooses which view to render when the user hits his/her their homepage 
     * The create-portfolio view for users who haven't created a portfolio yet
     * The home view for users who have created a portfolio 
     */
    renderHomepage: function (req, res) {
        var studentInfo = req.session.user;
        console.log(req.session.user);
        if (!studentInfo)
            res.render('index');
        if (req.session.user.has_portfolio) {
            res.render('home', {
                message: req.flash('message'),
                submit_message: req.flash('submit_message'),
                student: req.session.user,
                projects: req.session.user.projects
            });
        } else {
            res.render('create-portfolio', { message: req.flash('message'), student: req.session.user, projects: req.session.user.projects });
        }
    },
    /**
     * Creates the portfolio of the user by: 
     * 1- Updating the name, profile photo and description of the user 
     * 2- Then calling the next() function to go next function which creates the user's first 
     */
    createPortfolio: function (req, res, next) {
        console.log("create portfolio");
        // console.log(req.session.user);
        console.log(req.files);
        var id = req.session.user._id;
        var form = req.body;
        var screenshot = '';
        var img = 'buddy.png';
        if (typeof req.files != undefined && req.files.length > 0) {
            for (var i = 0; i < req.files.length; i++)
                if (req.files[i].fieldname === 'profile_photo')
                    img = 'uploads/' + req.files[i].filename;
                else if (req.files[i].fieldname === 'screenshot')
                    screenshot = 'uploads/' + req.files[i].filename;

        }
        if (form.link === '' && screenshot === '') {
            console.log("Link: " + form.link);
            console.log(img);
            req.flash('message', 'You must attach a link or a screenshot for your work');
            res.redirect('/create-portfolio');
            next(); 
        } else {
            Student.findByIdAndUpdate(id, {
                name: form.name,
                has_portfolio: true,
                profile_photo: img,
                description: form.description
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
    /**
     * Destroys the session of the current user
     */
    signOut: function (req, res) {
        req.session.destroy(function () {
            console.log("Signed out");
        })
        res.redirect('/');
    }
    ,
    /*
        Finds the student who's the current req.session.user 
        Updates the projects array with the project retrieved from the form 
    */
    addProject: function (req, res) {
        var projectInfo = req.body;
        var img = '';
        console.log(req.files);
        if (typeof req.files != undefined && req.files.length > 0) {
            for (var i = 0; i < req.files.length; i++)
                if (req.files[i].fieldname == 'screenshot')
                    img = 'uploads/' + req.files[i].filename;

        }
        if (projectInfo.link.length == 0 && img.length == 0) {
            console.log('YO')
            req.flash('submit_message', 'You must submit a link or screenshot of your project.');
            res.redirect('/home');
            next(); 
        }
        Student.findById(req.session.user._id, function (err, student) {
            console.log("Student at add Project");
            console.log(student);
            student.projects.push({
                title: projectInfo.title,
                link: projectInfo.link,
                screenshot: img

            });
            student.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.session.user = student;
                    req.flash('submit_message', 'This project has been added to your portfolio.')
                    res.redirect('/home');
                }
            });
        })
    }


}



module.exports = StudentController; 