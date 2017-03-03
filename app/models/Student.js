var mongoose = require('mongoose'); 
var Project = require('../models/Project.js'); 
var studentSchema = mongoose.Schema({
    name:{type: String},
    username:{
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {type: String, required: true}, 
    has_portfolio: Boolean,
    projects: [Project], 
    profile_photo: String,
    description: String 
}); 

var Student = mongoose.model("student", studentSchema); 

module.exports = Student; 