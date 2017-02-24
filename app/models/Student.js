var mongoose = require('mongoose'); 

var studentSchema = mongoose.Schema({
    name:{type: String, required: true},
    username:{
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {type: String, required: true}, 
    has_portfolio: Boolean, 
    img_url: String
}); 

var Student = mongoose.model("student", studentSchema); 

module.exports = Student; 