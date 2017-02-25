var Project = require('../models/Project'); 

let ProjectController = {
    createProject: function(req, res) {
        var projectInfo = req.body; 
        console.log(projectInfo); 
        let newProject = new Project({
            title: projectInfo.title,
            link: projectInfo.link,
            screenshot: projectInfo.screenshot,
            student_id: req.params.id
        }); 
        newProject.save(function(err, project) {
            if(err) {
                console.log(err); 
            } else {
                console.log("project created"); 
                console.log(project); 
                
            }
        })
    }
}

module.exports = ProjectController; 