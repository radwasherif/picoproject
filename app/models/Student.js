var mongoose = require('mongoose'); 

var studentSchema = mongoose.Schema({
    name:{type: String},
    username:{
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {type: String, required: true}, 
    has_portfolio: Boolean,
    number_of_projects: Number, 
    img_url: String
}); 

var Student = mongoose.model("student", studentSchema); 

module.exports = Student; 