var mongoose = require('mongoose'); 

var projectSchema = mongoose.Schema({
    title: {
        type: String, 
        required:true
    }, 
    link: String,
    screenshot: String, 
    student_id: Number, 
    portfolio_id: Number 
    
}); 
