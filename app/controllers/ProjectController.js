var Project = require('../models/Project');

let ProjectController = {
    createProject: function (req, res) {
        var projectInfo = req.body;
        var img = '';
        console.log(req.files);
        if (req.files.length > 0) {
            console.log("YA5TAAAAYYYYY"); 
            if (req.session.user.has_portfolio)
                img = 'uploads/' + req.files[0].filename;
            else
                img = 'uploads/' + req.files[1].filename;

        }
        console.log("THIS IS THE FRICKING USER");
        console.log(req.session.user);
        let newProject = new Project({
            title: projectInfo.title,
            link: projectInfo.link,
            screenshot: img,
            student_username: req.session.user.username
        });
        newProject.save(function (err, project) {
            if (err) {
                console.log(err);
            } else {
                console.log("PROJECT!!");
                console.log(project);
                req.flash('message', 'This project has been added to your portfolio.')
                res.redirect('/home');

            }
        })
    }
}

module.exports = ProjectController; 