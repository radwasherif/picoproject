var mongoose = require('mongoose'); 

var projectSchema = mongoose.Schema({
    title: {
        type: String, 
        required:true
    }, 
    link: String,
    screenshot: String, 
    student_username: String 
    
});
var Project = mongoose.model("project", projectSchema); 
module.exports = Project; 
