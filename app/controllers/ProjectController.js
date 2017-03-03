var Project = require('../models/Project');

let ProjectController = {
    createProject: function (req, res) {
        var projectInfo = req.body;
        var img = '';
        console.log(req.files);
        if (typeof req.files != undefined && req.files.length > 0) {
            for (var i = 0; i < req.files.length; i++)
                if (req.files[i].fieldname == 'screenshot')
                    img = 'uploads/' + req.files[i].filename;

        }
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